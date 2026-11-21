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

# Icons
icon = Image.new('RGBA', (512, 512), INK); d = ImageDraw.Draw(icon)
for x0, y0, c in [(80, 230, '#9CC3CC'), (250, 270, WHITE), (165, 110, '#EAF4F6')]:
    d.rounded_rectangle([x0, y0, x0 + 190, y0 + 150], radius=70, fill=c)
st = os.path.join(ROOT, 'static')
icon.save(os.path.join(st, 'icon-512.png'))
icon.resize((192, 192)).save(os.path.join(st, 'icon-192.png'))
icon.resize((180, 180)).save(os.path.join(st, 'apple-touch-icon.png'))
icon.save(os.path.join(st, 'favicon.ico'), sizes=[(48, 48), (32, 32), (16, 16)])
open(os.path.join(st, 'icon.svg'), 'w').write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#0B3440"/><rect x="80" y="230" width="190" height="150" rx="70" fill="#9CC3CC"/><rect x="250" y="270" width="190" height="150" rx="70" fill="#fff"/><rect x="165" y="110" width="190" height="150" rx="70" fill="#EAF4F6"/></svg>')
json.dump({'name': 'Ice Maker Sale', 'short_name': 'Ice Maker Sale', 'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png'}], 'theme_color': BLUE, 'background_color': BG, 'display': 'browser'}, open(os.path.join(st, 'site.webmanifest'), 'w'))
print('share images and icons written')
