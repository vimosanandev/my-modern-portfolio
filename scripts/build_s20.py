"""Render a device around an app screenshot, matching the Design canvas mockups (extruded metal
edge, side keys), and bake its 3D turn. Two models:
  s20    Galaxy S20 style: thin bezel, punch-hole camera, keys on the right edge.
  iphone iPhone 17 Pro style: Dynamic Island, titanium rim, Action and volume keys on the left,
         Side button and Camera Control on the right.
  tab    Android tablet, Galaxy Tab style, landscape: thin bezel, top camera, keys on the top edge.
  ipad   iPad Pro 11 style, landscape: even black bezel, camera on the left bezel, buttons on the
         top and left edges, optional Apple Pencil on the top edge (--pencil on|off).
  tabp   The same tablet held in portrait: camera on the right bezel, keys on the right edge.
  kds    Kitchen display terminal: thick bezel, deep body, status light. Use --fit contain to keep
         the whole board visible when its aspect differs from the 16:9 screen.

Usage: python3 -I build_s20.py SCREEN OUT_BASENAME [--model s20|iphone|tab|tabp|ipad|kds] [--css-width 210]
                                [--tilt 25] [--pitch 5] [--depth 16] [--finish NAME]
                                [--fit cover|contain] [--anchor center|top]
  s20 finishes:    cosmic-gray, cloud-blue, cloud-pink, cloud-white
  iphone finishes: deep-blue, cosmic-orange, silver
  tab/tabp finishes: graphite, silver, mint
  ipad finishes:   silver, space-black
  kds finishes:    graphite, white
--anchor top keeps the top of a screenshot that is taller than the screen (cover fit).

Writes OUT_BASENAME.webp (flat front) and OUT_BASENAME-tilt.webp (turned), sized for 3x screens
at the given CSS width. Positive tilt turns the screen to face right (left edge visible).
"""
import math
import sys
from PIL import Image, ImageDraw

PERSPECTIVE, ROT_X = 1500.0, 5.0
MARGIN = 8.0  # room around the body for the keys

# Devices in design units (same numbers as the canvas artboards). Keys: (side, top, height, protrusion).
MODELS = {
    's20': dict(W=320.0, H=709.0, R=36.0, RIM=1.6, BEZEL_R=34.5,
                SCREEN=(1.6 + 5.8, 1.6 + 10.8, 1.6 + 5.8, 1.6 + 15.8), SCREEN_R=27.0,
                BEZEL=(10, 11, 13), CAMERA='punch',
                KEYS=[('right', 129.0, 88.0, 3.0), ('right', 265.0, 46.0, 3.0)], KEY_SPAN=(0.3, 0.7)),
    'iphone': dict(W=320.0, H=668.0, R=54.0, RIM=2.4, BEZEL_R=51.6,
                   SCREEN=(2.4 + 8, 2.4 + 8, 2.4 + 8, 2.4 + 8), SCREEN_R=44.0,
                   BEZEL=(5, 5, 6), CAMERA='island',
                   KEYS=[('left', 134.0, 30.0, 3.0), ('left', 190.0, 58.0, 3.0), ('left', 262.0, 58.0, 3.0),
                         ('right', 206.0, 92.0, 3.0), ('right', 410.0, 50.0, 1.5)], KEY_SPAN=(0.28, 0.72)),
    'tab': dict(W=620.0, H=400.0, R=22.0, RIM=1.6, BEZEL_R=20.5,
                SCREEN=(1.6 + 12, 1.6 + 12, 1.6 + 12, 1.6 + 12), SCREEN_R=11.0,
                BEZEL=(11, 12, 14), CAMERA='dot',
                KEYS=[('top', 470.0, 26.0, 2.5), ('top', 506.0, 54.0, 2.5)], KEY_SPAN=(0.25, 0.75), PERSP=1800.0),
    'ipad': dict(W=600.0, H=445.0, R=25.0, RIM=2.0, BEZEL_R=23.0,
                 SCREEN=(2 + 19, 2 + 19, 2 + 19, 2 + 19), SCREEN_R=10.0,
                 BEZEL=(17, 18, 20), CAMERA='dot-left',
                 KEYS=[('top', 47.0, 21.0, 2.5), ('top', 76.0, 24.0, 2.5), ('left', 31.0, 24.0, 2.5)],
                 KEY_SPAN=(0.3, 0.7), PERSP=1800.0, MARGIN=20.0),
    'tabp': dict(W=400.0, H=620.0, R=22.0, RIM=1.6, BEZEL_R=20.5,
                 SCREEN=(1.6 + 12, 1.6 + 12, 1.6 + 12, 1.6 + 12), SCREEN_R=11.0,
                 BEZEL=(11, 12, 14), CAMERA='dot-right',
                 KEYS=[('right', 470.0, 26.0, 2.5), ('right', 506.0, 54.0, 2.5)], KEY_SPAN=(0.25, 0.75), PERSP=1800.0),
    'kds': dict(W=600.0, H=360.0, R=16.0, RIM=2.0, BEZEL_R=14.0,
                SCREEN=(2 + 20, 2 + 20, 2 + 20, 2 + 26), SCREEN_R=4.0,
                BEZEL=(20, 21, 24), CAMERA='led', KEYS=[], KEY_SPAN=(0.3, 0.7), PERSP=1900.0),
}
IPAD_FINISHES = {
    'silver': dict(front=(236, 238, 241), back=(163, 168, 176), key=(247, 248, 250),
                   rim=[(255, 255, 255), (198, 202, 209), (229, 231, 235)]),
    'space-black': dict(front=(107, 110, 116), back=(26, 27, 30), key=(127, 131, 138),
                        rim=[(140, 144, 151), (42, 44, 48), (80, 83, 90)]),
}
TAB_FINISHES = {
    'graphite': dict(front=(100, 103, 110), back=(24, 25, 28), key=(128, 132, 140),
                     rim=[(139, 143, 151), (43, 45, 49), (82, 85, 92)]),
    'silver': dict(front=(230, 232, 235), back=(157, 161, 169), key=(245, 246, 248),
                   rim=[(255, 255, 255), (195, 199, 206), (225, 227, 231)]),
    'mint': dict(front=(207, 233, 220), back=(106, 158, 132), key=(228, 244, 236),
                 rim=[(234, 247, 240), (147, 196, 170), (194, 227, 210)]),
}
KDS_FINISHES = {
    'graphite': dict(front=(74, 77, 84), back=(22, 23, 26), key=(74, 77, 84),
                     rim=[(93, 96, 104), (31, 32, 36), (58, 60, 66)]),
    'white': dict(front=(241, 242, 244), back=(180, 184, 191), key=(241, 242, 244),
                  rim=[(255, 255, 255), (207, 210, 216), (236, 238, 241)]),
}
FIT = 'cover'
ANCHOR = 'center'
PENCIL = False
LED = (47, 210, 122)
PERSP = PERSPECTIVE
IPHONE_FINISHES = {
    'deep-blue': dict(front=(107, 122, 150), back=(28, 36, 51), key=(141, 155, 182),
                      rim=[(154, 168, 194), (44, 54, 72), (85, 97, 122)]),
    'cosmic-orange': dict(front=(240, 160, 106), back=(156, 77, 30), key=(247, 189, 147),
                          rim=[(255, 210, 176), (199, 106, 50), (235, 154, 98)]),
    'silver': dict(front=(238, 240, 243), back=(158, 163, 171), key=(255, 255, 255),
                   rim=[(255, 255, 255), (196, 200, 207), (230, 232, 236)]),
}
# Set by main() from the chosen model.
W = H = R = RIM = BEZEL_R = SCREEN_R = 0.0
SCREEN, BEZEL, CAMERA, KEYS, KEY_SPAN = (), (), '', [], (0.3, 0.7)
FINISHES = {
    'cosmic-gray': dict(front=(106, 110, 118), back=(20, 22, 26), key=(139, 144, 153),
                        rim=[(138, 143, 152), (38, 41, 46), (74, 78, 85)]),
    'cloud-blue': dict(front=(199, 220, 240), back=(95, 128, 166), key=(226, 238, 250),
                       rim=[(230, 240, 250), (147, 178, 211), (188, 211, 234)]),
    'cloud-pink': dict(front=(245, 217, 223), back=(169, 118, 131), key=(251, 233, 237),
                       rim=[(253, 238, 241), (215, 169, 180), (239, 205, 213)]),
    'cloud-white': dict(front=(243, 244, 246), back=(154, 158, 166), key=(255, 255, 255),
                        rim=[(255, 255, 255), (201, 204, 210), (232, 234, 238)]),
}


def arg(name, default):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


def mix(a, b, k):
    return tuple(round(x + (y - x) * k) for x, y in zip(a, b))


def diagonal(size, stops, angle_deg):
    """Linear gradient across `size`, CSS-style angle, `stops` = [(t, rgba), ...]."""
    gw, gh = 96, 96
    g = Image.new('RGBA', (gw, gh))
    px = g.load()
    a = math.radians(angle_deg)
    dx, dy = math.sin(a), -math.cos(a)
    for y in range(gh):
        for x in range(gw):
            u, v = x / (gw - 1) - 0.5, y / (gh - 1) - 0.5
            t = (u * dx + v * dy) / (abs(dx) * 0.5 + abs(dy) * 0.5) * 0.5 + 0.5
            t = max(0.0, min(1.0, t))
            for (t0, c0), (t1, c1) in zip(stops, stops[1:]):
                if t <= t1:
                    k = 0 if t1 == t0 else (t - t0) / (t1 - t0)
                    px[x, y] = tuple(round(c0[i] + (c1[i] - c0[i]) * k) for i in range(4))
                    break
            else:
                px[x, y] = stops[-1][1]
    return g.resize(size, Image.BICUBIC)


def rounded_mask(size, box, radius, s):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).rounded_rectangle([round(c * s) for c in box], radius=round(radius * s), fill=255)
    return m


def front_face(screen, s, fin):
    """The glass side: rim, black bezel, screenshot, punch hole, shine. Canvas includes MARGIN."""
    cw, ch = round((W + 2 * MARGIN) * s), round((H + 2 * MARGIN) * s)
    o = MARGIN
    img = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    rim_c = fin['rim']
    rim = diagonal((cw, ch), [(0, (*rim_c[0], 255)), (0.5, (*rim_c[1], 255)), (1, (*rim_c[2], 255))], 135)
    img.paste(rim, (0, 0), rounded_mask((cw, ch), (o, o, o + W, o + H), R, s))
    bez = (o + RIM, o + RIM, o + W - RIM, o + H - RIM)
    img.paste((*BEZEL, 255), (0, 0, cw, ch), rounded_mask((cw, ch), bez, BEZEL_R, s))
    l, t, r, b = SCREEN
    sx0, sy0, sx1, sy1 = o + l, o + t, o + W - r, o + H - b
    sw, sh = round((sx1 - sx0) * s), round((sy1 - sy0) * s)
    if FIT == 'contain':
        # Whole screenshot visible; any gap is filled by stretching its own edge rows/columns.
        sc = min(sw / screen.width, sh / screen.height)
        fit = screen.resize((round(screen.width * sc), round(screen.height * sc)), Image.LANCZOS)
        shot = Image.new('RGBA', (sw, sh))
        ox, oy = (sw - fit.width) // 2, (sh - fit.height) // 2
        if ox > 0:
            shot.paste(fit.crop((0, 0, 1, fit.height)).resize((ox, fit.height)), (0, oy))
            shot.paste(fit.crop((fit.width - 1, 0, fit.width, fit.height)).resize((sw - ox - fit.width, fit.height)), (ox + fit.width, oy))
        if oy > 0:
            shot.paste(fit.crop((0, 0, fit.width, 1)).resize((fit.width, oy)), (ox, 0))
            shot.paste(fit.crop((0, fit.height - 1, fit.width, fit.height)).resize((fit.width, sh - oy - fit.height)), (ox, oy + fit.height))
        shot.paste(fit, (ox, oy))
    else:
        sc = max(sw / screen.width, sh / screen.height)
        shot = screen.resize((round(screen.width * sc), round(screen.height * sc)), Image.LANCZOS)
        ox = (shot.width - sw) // 2
        oy = 0 if ANCHOR == 'top' else (shot.height - sh) // 2
        shot = shot.crop((ox, oy, ox + sw, oy + sh))
    shine = diagonal((sw, sh), [(0, (255, 255, 255, 31)), (0.38, (255, 255, 255, 8)), (0.39, (255, 255, 255, 0)), (1, (255, 255, 255, 0))], 118)
    shot.alpha_composite(shine)
    smask = rounded_mask((sw, sh), (0, 0, sx1 - sx0, sy1 - sy0), SCREEN_R, s)
    img.paste(shot, (round(sx0 * s), round(sy0 * s)), smask)
    d = ImageDraw.Draw(img)
    if CAMERA == 'dot-left':
        cx, cy, cr = (o + RIM + 10) * s, (o + H / 2) * s, 3 * s
        d.ellipse((cx - cr, cy - cr, cx + cr, cy + cr), fill=(10, 11, 13, 255))
        d.ellipse((cx - cr + 1.5 * s, cy - cr + 1.5 * s, cx + cr - 1.5 * s, cy + cr - 1.5 * s), fill=(27, 34, 51, 255))
    elif CAMERA == 'dot-right':
        cx, cy, cr = (o + W - RIM - 6.5) * s, (o + H / 2) * s, 2.6 * s
        d.ellipse((cx - cr, cy - cr, cx + cr, cy + cr), fill=(7, 8, 10, 255))
        d.ellipse((cx - cr + 1.2 * s, cy - cr + 1.2 * s, cx + cr - 1.2 * s, cy + cr - 1.2 * s), fill=(26, 32, 48, 255))
    elif CAMERA == 'dot':
        cx, cy, cr = (o + W / 2) * s, (o + RIM + 6.5) * s, 2.6 * s
        d.ellipse((cx - cr, cy - cr, cx + cr, cy + cr), fill=(7, 8, 10, 255))
        d.ellipse((cx - cr + 1.2 * s, cy - cr + 1.2 * s, cx + cr - 1.2 * s, cy + cr - 1.2 * s), fill=(26, 32, 48, 255))
    elif CAMERA == 'led':
        lx, ly, lr = (o + W - 21) * s, (o + H - 12) * s, 3 * s
        d.ellipse((lx - lr, ly - lr, lx + lr, ly + lr), fill=(*LED, 255))
    elif CAMERA == 'island':
        iw, ih, top = 100, 29, 11
        ix0, iy0 = o + W / 2 - iw / 2, sy0 + top
        d.rounded_rectangle([round(c * s) for c in (ix0, iy0, ix0 + iw, iy0 + ih)], radius=round(ih / 2 * s), fill=(0, 0, 0, 255))
        lx, ly, lr = (ix0 + iw - 16.5) * s, (iy0 + ih / 2) * s, 5.5 * s
        d.ellipse((lx - lr, ly - lr, lx + lr, ly + lr), fill=(23, 27, 38, 255))
        d.ellipse((lx - lr + 2 * s, ly - lr + 2 * s, lx + lr - 2 * s, ly + lr - 2 * s), fill=(13, 16, 24, 255))
    else:
        cx, cy, cr = (o + W / 2) * s, (sy0 + 16) * s, 8 * s
        d.ellipse((cx - cr, cy - cr, cx + cr, cy + cr), fill=(22, 24, 28, 255))
        ir = cr - 2.5 * s
        d.ellipse((cx - ir, cy - ir, cx + ir, cy + ir), fill=(5, 6, 8, 255))
    return img


def edge_layer(s, color, key_color=None):
    cw, ch = round((W + 2 * MARGIN) * s), round((H + 2 * MARGIN) * s)
    img = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    o = MARGIN
    d.rounded_rectangle([round(c * s) for c in (o, o, o + W, o + H)], radius=round(R * s), fill=(*color, 255))
    if key_color:
        for side, top, kh, out in KEYS:
            if side == 'top':  # `top` is the x position along the top edge, `kh` its length
                box = (o + top, o - out, o + top + kh, o + 2)
            else:
                x0 = o - out if side == 'left' else o + W - 2
                box = (x0, o + top, x0 + out + 2, o + top + kh)
            d.rounded_rectangle([round(c * s) for c in box], radius=round(min(out + 2, kh) / 2 * s), fill=(*key_color, 255))
    return img


def pencil_slices(s, depth):
    """Apple Pencil resting on the top edge: a cylinder as slices across its depth, (z, image) pairs."""
    cw, ch = round((W + 2 * MARGIN) * s), round((H + 2 * MARGIN) * s)
    o, rad, zc, x0, x1 = MARGIN, 7.5, -depth / 2, 104.0, 504.0
    white, shade, tip = (250, 250, 251), (196, 199, 205), (150, 154, 160)
    out, n = [], 12
    for k in range(n + 1):
        dz = -rad + 2 * rad * k / n
        half = math.sqrt(max(0.0, rad * rad - dz * dz))
        if half < 0.6:
            continue
        lit = 1 - abs(dz) / rad
        col = mix(shade, white, lit)
        img = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        y0 = -rad - half
        d.rounded_rectangle([round(c * s) for c in (o + x0, o + y0, o + x1, o + y0 + 2 * half)], radius=round(half * s), fill=(*col, 255))
        d.rounded_rectangle([round(c * s) for c in (o + x0 - 26, o + y0 + half * 0.55, o + x0 + 4, o + y0 + half * 1.45)],
                            radius=round(half * 0.45 * s), fill=(*mix(tip, col, 0.5), 255))
        out.append((zc + dz, img))
    return out


def project(x, y, z, tilt):
    ax, ay = math.radians(ROT_X), math.radians(tilt)
    PERSPECTIVE = PERSP
    y1 = y * math.cos(ax) - z * math.sin(ax)
    z1 = y * math.sin(ax) + z * math.cos(ax)
    x2 = x * math.cos(ay) + z1 * math.sin(ay)
    z2 = -x * math.sin(ay) + z1 * math.cos(ay)
    k = PERSPECTIVE / (PERSPECTIVE - z2)
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


def coeffs(dst, src):
    a, b = [], []
    for (x, y), (u, v) in zip(dst, src):
        a.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        a.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return solve(a, b)


def main():
    screen_p, out_base = sys.argv[1:3]
    css_w = float(arg('--css-width', 210))
    tilt = float(arg('--tilt', 25))
    depth = int(arg('--depth', 16))
    global ROT_X, FIT, PERSP, ANCHOR, PENCIL, MARGIN
    model = arg('--model', 's20')
    PERSP = PERSPECTIVE
    MARGIN = 8.0
    globals().update(MODELS[model])
    PENCIL = model == 'ipad' and arg('--pencil', 'on') == 'on'
    ROT_X = float(arg('--pitch', 5))
    FIT = arg('--fit', 'cover')
    ANCHOR = arg('--anchor', 'center')
    fin = (IPHONE_FINISHES[arg('--finish', 'silver')] if model == 'iphone'
           else KDS_FINISHES[arg('--finish', 'graphite')] if model == 'kds'
           else TAB_FINISHES[arg('--finish', 'graphite')] if model in ('tab', 'tabp')
           else IPAD_FINISHES[arg('--finish', 'silver')] if model == 'ipad'
           else FINISHES[arg('--finish', 'cosmic-gray')])
    s = css_w / W * 3 * 2  # render at 2x the 3x target, then halve
    screen = Image.open(screen_p).convert('RGBA')

    face = front_face(screen, s, fin)

    # Flat: the front face alone, trimmed.
    flat = face.crop(face.getchannel('A').getbbox())
    flat.resize((flat.width // 2, flat.height // 2), Image.LANCZOS).save(out_base + '.webp', 'WEBP', quality=95, alpha_quality=100, method=6)

    # Turned: edge layers back to front, then the face, each warped with the canvas's perspective.
    k_from, k_to = round(depth * KEY_SPAN[0]), round(depth * KEY_SPAN[1])
    layers = []
    for i in range(depth, -1, -1):
        k = i / depth
        key = mix(fin['key'], fin['back'], k * 0.8) if k_from <= i <= k_to else None
        layers.append((-float(i), edge_layer(s, mix(fin['front'], fin['back'], k), key)))
    layers.append((1.0, face))
    if PENCIL:
        layers += pencil_slices(s, depth)
        layers.sort(key=lambda zl: zl[0])

    hw, hh = W / 2 + MARGIN, H / 2 + MARGIN
    corners = [(-hw, -hh), (hw, -hh), (hw, hh), (-hw, hh)]
    pts = [[project(x, y, z, tilt) for x, y in corners] for z, _ in layers]
    flat_pts = [p for ps in pts for p in ps]
    minx, miny = min(p[0] for p in flat_pts), min(p[1] for p in flat_pts)
    maxx, maxy = max(p[0] for p in flat_pts), max(p[1] for p in flat_pts)
    out = Image.new('RGBA', (math.ceil((maxx - minx) * s) + 2, math.ceil((maxy - miny) * s) + 2), (0, 0, 0, 0))
    for (z, img), ps in zip(layers, pts):
        dst = [((x - minx) * s, (y - miny) * s) for x, y in ps]
        src = [(0, 0), (img.width, 0), (img.width, img.height), (0, img.height)]
        out.alpha_composite(img.transform(out.size, Image.PERSPECTIVE, coeffs(dst, src), Image.BICUBIC))
    out = out.crop(out.getchannel('A').getbbox())
    out = out.resize((out.width // 2, out.height // 2), Image.LANCZOS)
    out.save(out_base + '-tilt.webp', 'WEBP', quality=95, alpha_quality=100, method=6)
    print(f'flat {flat.width // 2}x{flat.height // 2}  tilt {out.size[0]}x{out.size[1]}  tilt css width {out.size[0] / 3:.1f}px')


if __name__ == '__main__':
    main()
