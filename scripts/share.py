# Makes the social share images (static/share/*.png) and site icons.
# Run after `node generate.mjs`: python3 scripts/share.py /path/to/display-font.ttf
import json, sys, os, textwrap
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = sys.argv[1]
BG, INK, BLUE, CREMA, WHITE = '#EAF4F6', '#0B3440', '#1F6E7E', '#C81E3A', '#FFFFFF'

def font(size, wght=800):
    f = ImageFont.truetype(FONT, size)
    try: f.set_variation_by_axes([wght] + ([] if len(f.get_variation_axes()) == 1 else [100]))
    except Exception: pass
    return f

def cup(d, x, y, s):
    for dx, dy, c in [(0, .35, BLUE), (.45, .5, INK), (.25, 0, '#9CC3CC')]:
        d.rounded_rectangle([x + dx * s, y + dy * s, x + (dx + .5) * s, y + (dy + .45) * s], radius=int(.2 * s), fill=c)

def share(slug, title):
    im = Image.new('RGB', (1200, 630), WHITE); d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 1200, 22], fill=BLUE)
    d.rectangle([0, 560, 1200, 630], fill=INK)
    cup(d, 80, 70, 70)
    d.text((170, 92), 'icemakersale.com', font=font(34, 700), fill=INK)
    lines = textwrap.wrap(title, 22)[:3]
    y = 210
    for ln in lines:
        d.text((80, y), ln, font=font(58), fill=INK); y += 78
    d.text((80, 577), 'Ice maker buying guides, reviews and sale timing', font=font(28, 500), fill='#C9CDDA')
    os.makedirs(os.path.join(ROOT, 'static/share'), exist_ok=True)
    im.save(os.path.join(ROOT, 'static/share', slug + '.png'), optimize=True)

for p in json.load(open(os.path.join(ROOT, 'scripts/share-list.json'))):
    share(p['slug'], p['title'])

# Icons: drawn from static/icon.svg (the source of truth)
import cairosvg, io
st = os.path.join(ROOT, 'static')
_svg = open(os.path.join(st, 'icon.svg')).read()
_big = Image.open(io.BytesIO(cairosvg.svg2png(bytestring=_svg.encode(), output_width=1024, output_height=1024))).convert('RGBA')
_big.resize((512, 512), Image.LANCZOS).save(os.path.join(st, 'icon-512.png'))
_big.resize((192, 192), Image.LANCZOS).save(os.path.join(st, 'icon-192.png'))
Image.open(io.BytesIO(cairosvg.svg2png(bytestring=_svg.replace('rx="104" ', '').encode(), output_width=180, output_height=180))).save(os.path.join(st, 'apple-touch-icon.png'))
_big.resize((48, 48), Image.LANCZOS).save(os.path.join(st, 'favicon.ico'), sizes=[(48, 48), (32, 32), (16, 16)])
json.dump({'name': 'Ice Maker Sale', 'short_name': 'Ice Maker Sale', 'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png'}], 'theme_color': BLUE, 'background_color': BG, 'display': 'browser'}, open(os.path.join(st, 'site.webmanifest'), 'w'))
print('share images and icons written')
