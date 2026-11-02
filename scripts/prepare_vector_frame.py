"""Turn a flat Figma device export (phone on a solid background, placeholder on the screen)
into a frame PNG that compose_device.py can use: transparent outside, transparent screen hole,
with an optional overlay (Dynamic Island) pasted back on top.

Usage:
  python3 -I prepare_vector_frame.py EXPORT OUT --screen X,Y,W,H --radius R
         [--overlay ISLAND.png --overlay-at X,Y]

Coordinates are in EXPORT pixels. Prints the --hole box to pass to compose_device.py.
"""
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter


def arg(name, default=None):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


def ints(v):
    return [int(round(float(n))) for n in v.split(',')]


def remove_background(img, tol=10, band=3):
    """Flood-fill the outer background to transparent, then unmix the anti-aliased edge."""
    w, h = img.size
    rgb = img.convert('RGB')
    bg = rgb.getpixel((2, 2))
    marker = (255, 0, 255)
    probe = rgb.copy()
    for xy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        if probe.getpixel(xy) != marker:
            ImageDraw.floodfill(probe, xy, marker, thresh=tol)
    r, g, b = probe.split()
    outside = Image.eval(
        ImageChops.multiply(ImageChops.multiply(r.point(lambda v: 255 if v == 255 else 0),
                                                g.point(lambda v: 255 if v == 0 else 0)),
                            b.point(lambda v: 255 if v == 255 else 0)),
        lambda v: 255 if v else 0)
    edge = ImageChops.subtract(outside.filter(ImageFilter.MaxFilter(band * 2 + 1)), outside)

    out = img.convert('RGBA')
    o, e, p = outside.load(), edge.load(), out.load()
    lbg = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2]
    lref = 70.0  # luminance of the device edge (steel/black)
    for y in range(h):
        for x in range(w):
            if o[x, y]:
                p[x, y] = (0, 0, 0, 0)
            elif e[x, y]:
                cr, cg, cb, _ = p[x, y]
                lum = 0.299 * cr + 0.587 * cg + 0.114 * cb
                a = max(0.0, min(1.0, (lbg - lum) / (lbg - lref)))
                if a < 0.02:
                    p[x, y] = (0, 0, 0, 0)
                else:
                    un = [max(0, min(255, round((c - (1 - a) * bc) / a))) for c, bc in zip((cr, cg, cb), bg)]
                    p[x, y] = (*un, round(a * 255))
    return out


def main():
    src, out_path = sys.argv[1:3]
    x, y, w, h = ints(arg('--screen'))
    radius = int(arg('--radius'))
    img = remove_background(Image.open(src))
    # Screen hole: rounded rect, grown 2px so no placeholder pixels survive at the edge.
    hole = Image.new('L', img.size, 0)
    ImageDraw.Draw(hole).rounded_rectangle((x - 2, y - 2, x + w + 1, y + h + 1), radius=radius + 2, fill=255)
    img.putalpha(ImageChops.subtract(img.getchannel('A'), hole))
    if arg('--overlay'):
        ov = Image.open(arg('--overlay')).convert('RGBA')
        ox, oy = ints(arg('--overlay-at'))
        img.alpha_composite(ov, (ox, oy))
    img.save(out_path)
    print(f'--hole {x - 2},{y - 2},{x + w + 1},{y + h + 1}')


if __name__ == '__main__':
    main()
