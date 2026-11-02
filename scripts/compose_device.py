"""Composite an app screen into a device frame PNG, then bake a 3D tilt.

Usage: python3 -I compose_device.py FRAME SCREEN OUT_BASENAME
         [--css-width 210] [--rot-y 25] [--rotate-frame 90] [--fit cover|contain]

Writes OUT_BASENAME.webp (flat) and OUT_BASENAME-tilt.webp (tilted), both sized
for 3x displays at the given CSS width. Tilt: perspective 1100px, rotateY(rot-y)
rotateX(4deg), origin at element center. Positive rot-y turns the screen to face
right (left edge nearer), toward text placed to the right of the device.
--rotate-frame turns a portrait frame to landscape before compositing.
--hole X0,Y0,X1,Y1 sets the screen box when auto-detection can't find it (e.g. an island sits in the hole).
--fit contain keeps the whole screen and fills any gap by stretching the screen's
own edge rows/columns, instead of cropping (cover, the default).
"""
import math
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter

DPX = 3  # device pixels per CSS pixel to target
PERSPECTIVE = 1100.0
ROT_Y = math.radians(25)
ROT_X = math.radians(4)


def arg(name, default):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


def find_hole(frame):
    """Bounding box of the transparent screen hole, walking out from the center."""
    a = frame.getchannel('A').load()
    w, h = frame.size
    cx, cy = w // 2, h // 2
    assert a[cx, cy] < 10, 'frame center is not transparent; no screen hole'
    def walk(dx, dy):
        x, y = cx, cy
        while 0 <= x + dx < w and 0 <= y + dy < h and a[x + dx, y + dy] < 10:
            x += dx
            y += dy
        return x, y
    return walk(-1, 0)[0], walk(0, -1)[1], walk(1, 0)[0], walk(0, 1)[1]


def contain_fill(screen, hw, hh):
    """Fit the whole screen inside hw x hh; extend its edge rows/columns into the gap."""
    sc = min(hw / screen.width, hh / screen.height)
    if sc > 1:
        print(f'warning: screen upscaled x{sc:.2f}; export the screen at a higher scale')
    rs = screen.resize((round(screen.width * sc), round(screen.height * sc)), Image.LANCZOS)
    out = Image.new('RGBA', (hw, hh))
    ox, oy = (hw - rs.width) // 2, (hh - rs.height) // 2
    if oy > 0:
        out.paste(rs.crop((0, 0, rs.width, 1)).resize((rs.width, oy)), (ox, 0))
        out.paste(rs.crop((0, rs.height - 1, rs.width, rs.height)).resize((rs.width, hh - oy - rs.height)), (ox, oy + rs.height))
    if ox > 0:
        out.paste(rs.crop((0, 0, 1, rs.height)).resize((ox, rs.height)), (0, oy))
        out.paste(rs.crop((rs.width - 1, 0, rs.width, rs.height)).resize((hw - ox - rs.width, rs.height)), (ox + rs.width, oy))
    out.paste(rs, (ox, oy))
    return out


def composite(frame, screen, fit='cover', hole_box=None):
    x0, y0, x1, y1 = hole_box or find_hole(frame)
    hw, hh = x1 - x0 + 1, y1 - y0 + 1
    if fit == 'contain':
        rs = contain_fill(screen, hw, hh)
    else:
        sc = max(hw / screen.width, hh / screen.height)
        if sc > 1:
            print(f'warning: screen upscaled x{sc:.2f}; export the screen at a higher scale')
        rs = screen.resize((round(screen.width * sc), round(screen.height * sc)), Image.LANCZOS)
        ox, oy = (rs.width - hw) // 2, (rs.height - hh) // 2
        rs = rs.crop((ox, oy, ox + hw, oy + hh))
    hole = ImageChops.invert(frame.getchannel('A')).crop((x0, y0, x1 + 1, y1 + 1))
    # Keep only the transparent area connected to the screen's centre. The box's corners can reach past
    # a rounded device body, where the outside is transparent too; without this the screen spills out there.
    solid = hole.point(lambda v: 255 if v >= 128 else 0)
    ImageDraw.floodfill(solid, (hole.width // 2, hole.height // 2), 128, thresh=0)
    inside = solid.point(lambda v: 255 if v == 128 else 0).filter(ImageFilter.MaxFilter(5))
    hole = ImageChops.multiply(hole, inside)
    out = Image.new('RGBA', frame.size, (0, 0, 0, 0))
    out.paste(rs, (x0, y0), hole)
    out.alpha_composite(frame)
    return out.crop(out.getchannel('A').getbbox())


def project(x, y, d=PERSPECTIVE):
    # CSS applies rotateX first, then rotateY (transform list is right-to-left on points).
    y1 = y * math.cos(ROT_X)
    z1 = y * math.sin(ROT_X)
    x2 = x * math.cos(ROT_Y) + z1 * math.sin(ROT_Y)
    z2 = -x * math.sin(ROT_Y) + z1 * math.cos(ROT_Y)
    k = d / (d - z2)
    return x2 * k, y1 * k


def solve(a, b):
    n = len(b)
    m = [row[:] + [b[i]] for i, row in enumerate(a)]
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(m[r][c]))
        m[c], m[p] = m[p], m[c]
        for r in range(n):
            if r != c:
                f = m[r][c] / m[c][c]
                m[r] = [m[r][i] - f * m[c][i] for i in range(n + 1)]
    return [m[i][n] / m[i][i] for i in range(n)]


def perspective_coeffs(dst, src):
    """Coefficients mapping output (dst) points back to input (src) points for Image.PERSPECTIVE."""
    a, b = [], []
    for (x, y), (u, v) in zip(dst, src):
        a.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        a.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return solve(a, b)


def tilt(img, css_w):
    css_h = css_w * img.height / img.width
    corners = [(-css_w / 2, -css_h / 2), (css_w / 2, -css_h / 2), (css_w / 2, css_h / 2), (-css_w / 2, css_h / 2)]
    proj = [project(x, y) for x, y in corners]
    minx = min(p[0] for p in proj); miny = min(p[1] for p in proj)
    maxx = max(p[0] for p in proj); maxy = max(p[1] for p in proj)
    # Render at 2x the target, then LANCZOS down, so the warp never aliases.
    s = DPX * 2
    out_w, out_h = math.ceil((maxx - minx) * s), math.ceil((maxy - miny) * s)
    dst = [((px - minx) * s, (py - miny) * s) for px, py in proj]
    src = [(0, 0), (img.width, 0), (img.width, img.height), (0, img.height)]
    big = img.resize((round(css_w * s), round(css_h * s)), Image.LANCZOS)
    src = [(u * big.width / img.width, v * big.height / img.height) for u, v in src]
    warped = big.transform((out_w, out_h), Image.PERSPECTIVE, perspective_coeffs(dst, src), Image.BICUBIC)
    final = warped.resize((math.ceil(out_w / 2), math.ceil(out_h / 2)), Image.LANCZOS)
    return final, (maxx - minx)


def save(img, path):
    img.save(path, 'WEBP', quality=95, alpha_quality=100, method=6)


def main():
    global ROT_Y
    frame_p, screen_p, out_base = sys.argv[1:4]
    css_w = float(arg('--css-width', 210))
    ROT_Y = math.radians(float(arg('--rot-y', 25)))
    frame = Image.open(frame_p).convert('RGBA')
    rot = int(arg('--rotate-frame', 0))
    if rot:
        frame = frame.rotate(rot, expand=True, resample=Image.BICUBIC)
    screen = Image.open(screen_p).convert('RGBA')
    hole_box = [int(n) for n in arg('--hole', None).split(',')] if arg('--hole', None) else None
    flat = composite(frame, screen, arg('--fit', 'cover'), hole_box)
    flat_out = flat.resize((round(css_w * DPX), round(flat.height * css_w * DPX / flat.width)), Image.LANCZOS)
    save(flat_out, out_base + '.webp')
    tilted, tilt_css_w = tilt(flat, css_w)
    save(tilted, out_base + '-tilt.webp')
    print(f'flat {flat_out.size}  tilt {tilted.size}  tilt css width {tilt_css_w:.1f}px')


if __name__ == '__main__':
    main()
