// Builds the static site into ./out. Run: node generate.mjs
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ORIGIN, SITE, WRITER, ISO, AS_OF, safe } from './lib/site.mjs';
import pages from './content/pages.mjs';
import { autolink } from './lib/links.mjs';
import { ANCHORS } from './lib/anchors.mjs';
import legal from './content/legal.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'out');
const docs = [...pages, ...legal];
const find = (p) => docs.find((d) => d.path === p);
const href = (p) => (p ? `/${p}/` : '/');
const abs = (p) => ORIGIN + href(p);
const idOf = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const style = readFileSync(join(root, 'lib/theme.css'), 'utf8').replace(/\s+/g, ' ').replace(/\s*([{};:,>])\s*/g, '$1');

const MENU = [['Deals', ''], ['Black Friday', 'ice-maker-black-friday-deals'], ['Nugget', 'best-nugget-ice-maker'], ['Countertop', 'best-countertop-ice-maker'], ['Portable', 'best-portable-ice-maker'], ['Undercounter', 'best-undercounter-ice-maker'], ['Cleaning', 'how-to-clean-portable-ice-maker'], ['All guides', 'guides']];
const SHELF = [
  ['Deals', ['', 'ice-maker-black-friday-deals', 'nugget-ice-maker-sale', 'opal-nugget-ice-maker-sale']],
  ['Best ice makers', ['best-ice-maker', 'best-nugget-ice-maker', 'best-cheap-nugget-ice-maker', 'best-countertop-ice-maker', 'best-portable-ice-maker', 'best-small-ice-maker', 'best-crushed-ice-maker', 'best-clear-ice-maker', 'countertop-ice-maker-with-dispenser', 'ice-maker-for-camping-and-rv', 'countertop-ice-maker-that-keeps-ice-frozen']],
  ['Built-in and undercounter', ['best-undercounter-ice-maker', 'best-undercounter-nugget-ice-maker']],
  ['Commercial', ['best-commercial-ice-maker', 'best-commercial-nugget-ice-maker', 'best-commercial-ice-maker-with-dispenser', 'manitowoc-ice-machine-review', 'hoshizaki-ice-machine-review']],
  ['Reviews', ['ge-profile-opal-2-review', 'ge-opal-2-xl-review', 'frigidaire-countertop-ice-maker-review', 'frigidaire-gallery-nugget-ice-maker-review', 'euhomy-nugget-ice-maker-review', 'euhomy-countertop-ice-maker-review', 'brio-740i-review', 'kismile-nugget-ice-maker-review', 'cowsar-nugget-ice-maker-review', 'igloo-countertop-ice-maker-review', 'goveelife-smart-ice-maker-review']],
  ['Shaved ice and refrigerators', ['best-shaved-ice-machine', 'best-refrigerator-with-nugget-ice', 'best-refrigerator-with-ice-maker']],
  ['Cleaning and care', ['best-ice-maker-cleaning-solution', 'how-to-clean-portable-ice-maker', 'how-to-clean-ge-opal-ice-maker', 'how-to-descale-ge-opal', 'ge-opal-not-making-ice', 'how-to-clean-euhomy-ice-maker', 'how-to-clean-frigidaire-countertop-ice-maker', 'how-to-clean-commercial-ice-maker']],
  ['Guides', ['what-is-nugget-ice']],
];
for (const d of pages) if (!d.plain && !SHELF.some(([, l]) => l.includes(d.path))) throw new Error('Missing from guides page: ' + d.path);
const shelved = SHELF.flatMap(([, l]) => l).length;
docs.push({
  path: 'guides', short: 'All guides', tab: `All Ice Maker Guides and Reviews | ${SITE}`,
  summary: `Every ice maker guide on ${SITE}: deals, best nugget, countertop, portable and undercounter picks, reviews and cleaning guides.`,
  heading: 'All ice maker guides', lede: `${shelved} guides, grouped by what you are trying to decide.`, plain: false, nostamp: true,
  parts: SHELF.map(([h, l]) => [h, `<ul class="tiles">${l.map((p) => { const x = find(p); return `<li><a href="${href(p)}"><b>${safe(x.short || x.heading)}</b><span>${safe(x.blurb || x.summary)}</span></a></li>`; }).join('')}</ul>`]),
});

function graph(d) {
  const g = [{ '@type': 'WebSite', '@id': ORIGIN + '/#site', url: ORIGIN + '/', name: SITE, inLanguage: 'en-US' }, { '@type': 'Organization', '@id': ORIGIN + '/#org', name: SITE, url: ORIGIN + '/', logo: ORIGIN + '/icon-512.png' }];
  const trail = [{ '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' }];
  if (d.path && !d.legal && d.path !== 'guides') trail.push({ '@type': 'ListItem', position: 2, name: 'Guides', item: abs('guides') });
  if (d.path) trail.push({ '@type': 'ListItem', position: trail.length + 1, name: d.short || d.heading, item: abs(d.path) });
  if (d.path) g.push({ '@type': 'BreadcrumbList', itemListElement: trail });
  if (!d.legal) g.push({ '@type': d.review ? 'Review' : 'Article', headline: d.heading, description: d.summary, url: abs(d.path), datePublished: d.iso || ISO, dateModified: d.iso || ISO, image: `${ORIGIN}/share/${d.path || 'index'}.png`, author: { '@type': 'Person', name: WRITER }, publisher: { '@id': ORIGIN + '/#org' }, isPartOf: { '@id': ORIGIN + '/#site' }, mainEntityOfPage: abs(d.path), ...(d.review ? { itemReviewed: { '@type': 'Product', name: d.review.name, brand: { '@type': 'Brand', name: d.review.brand } }, reviewRating: { '@type': 'Rating', ratingValue: d.review.score, bestRating: 10, worstRating: 1 } } : {}) });
  if (d.list?.length) g.push({ '@type': 'ItemList', name: d.heading, numberOfItems: d.list.length, itemListElement: d.list.map((n, i) => ({ '@type': 'ListItem', position: i + 1, name: n })) });
  if (d.howto) g.push({ '@type': 'HowTo', name: d.heading, description: d.summary, step: d.howto.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s[0], text: s[1] })) });
  if (d.asked?.length) g.push({ '@type': 'FAQPage', mainEntity: d.asked.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) });
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': g }).replace(/</g, '\\u003c')}</script>`;
}

const cup = `<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path d="M4 11h18v5a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8z" fill="#2343B8"/><path d="M22 13h2.5a3 3 0 0 1 0 6H21" fill="none" stroke="#2343B8" stroke-width="2.4"/><path d="M2 26h24" stroke="#161A2E" stroke-width="2.4" stroke-linecap="round"/><path d="M10 3c-1.5 2 1.5 3 0 5M15 3c-1.5 2 1.5 3 0 5" stroke="#B8792E" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;

const cube = `<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><rect x="3" y="9" width="12" height="12" rx="5" fill="#EAF4F6"/><rect x="15" y="13" width="12" height="12" rx="5" fill="#9CC3CC"/><rect x="10" y="3" width="11" height="11" rx="5" fill="#fff"/></svg>`;
const fmapCols = [['Deals', (p) => /sale|deals|black-friday/.test(p)], ['Best picks', (p) => /^best-/.test(p)], ['Reviews', (p) => /-review$/.test(p)], ['Guides and comparisons', (p) => true]];
const fmap = (() => { const seen = new Set(); const cols = fmapCols.map(([t, f]) => { const items = pages.filter((x) => x.path && !x.legal && x.path !== 'guides' && !seen.has(x.path) && f(x.path)); items.forEach((x) => seen.add(x.path)); return [t, items.slice(0, 8)]; }); return `<div class="fmap">${cols.map(([t, items]) => `<div><b>${t}</b>${items.map((x) => `<a href="/${x.path}/">${safe(x.short || x.heading)}</a>`).join('')}</div>`).join('')}</div>`; })();
function render(d) {
  const unself = (h) => h.split(`<a class="rev" href="/${d.path}/">Read the full review</a>`).join('');
  const parts = d.parts || [];
  const chips = parts.length > 2 ? `<ul class="chipnav" aria-label="On this page">${parts.map((s) => `<li><a href="#${idOf(s[0])}">${safe(s[0])}</a></li>`).join('')}${d.asked?.length ? '<li><a href="#questions">Questions</a></li>' : ''}</ul>` : '';
  const main0 = d.legal || d.path === 'guides' ? parts.map(([h, html]) => `<section class="${/class="(pick|tbl)/.test(html) ? 'wide' : ''}"><h2 id="${idOf(h)}">${safe(h)}</h2>${html}</section>`).join('') : autolink(parts.map(([h, html]) => `<section class="${/class="(pick|tbl)/.test(html) ? 'wide' : ''}"><h2 id="${idOf(h)}">${safe(h)}</h2>${html}</section>`).join(''), d.path, ANCHORS);
  const main = unself(main0);
  const qa = d.asked?.length ? `<section class="qa"><h2 id="questions">Questions people ask</h2>${d.asked.map(([q, a]) => `<details><summary>${safe(q)}</summary><p>${a}</p></details>`).join('')}</section>` : '';
  const refs = d.refs?.length ? `<section class="refs"><h2 id="sources">Sources</h2><ol>${d.refs.map(([t, u]) => `<li><a href="${u}" rel="nofollow noopener">${safe(t)}</a></li>`).join('')}</ol></section>` : '';
  const next0 = (d.next || []).map(find).filter(Boolean);
  const grp = (p) => fmapCols.findIndex(([, f]) => f(p || ''));
  const next = d.legal || !d.path || d.path === 'guides' ? next0 : [...next0, ...pages.filter((x) => x.path && !x.legal && x.path !== 'guides' && x.path !== d.path && !next0.includes(x) && grp(x.path) === grp(d.path))].slice(0, 6);
  const more = next.length ? `<section class="more"><h2>Read next</h2><ul class="tiles">${next.map((n) => `<li><a href="${href(n.path)}"><b>${safe(n.short || n.heading)}</b><span>${safe(n.blurb || n.summary)}</span></a></li>`).join('')}</ul></section>` : '';
  const stamp = d.legal || d.nostamp ? '' : `<p class="stamp">By ${WRITER}. Updated <time datetime="${d.iso || ISO}">${d.asOf || AS_OF}</time>.</p>`;
  const answer = d.quick ? `<div class="answer"><b>Quick answer</b><p>${d.quick}</p></div>` : '';
  const intro = d.path ? `<div class="intro"><p class="trail"><a href="/">Home</a> &rsaquo; ${!d.legal && d.path !== 'guides' ? '<a href="/guides/">Guides</a> &rsaquo; ' : ''}${safe(d.short || d.heading)}</p><h1>${safe(d.heading)}</h1>${d.lede ? `<p class="lede">${d.lede}</p>` : ''}${stamp}</div>` : '';
  const hero = d.path ? '' : `<div class="hero"><div class="shell"><div><h1>${safe(d.heading)}</h1><p>${d.lede}</p><small>By ${WRITER}. Updated <time datetime="${ISO}">${AS_OF}</time>.</small></div>${d.hero || ''}</div></div>`;
  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safe(d.tab)}</title>
<meta name="description" content="${safe(d.summary)}">
<link rel="canonical" href="${abs(d.path)}">
${d.noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta property="og:title" content="${safe(d.tab)}">
<meta property="og:description" content="${safe(d.summary)}">
<meta property="og:type" content="${d.path ? 'article' : 'website'}">
<meta property="og:url" content="${abs(d.path)}">
<meta property="og:image" content="${ORIGIN}/share/${d.path || 'index'}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="${SITE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B3440">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/unbounded-700.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/figtree.woff2" as="font" type="font/woff2" crossorigin>
<style>${style}</style>
${graph(d)}
</head>
<body>
<a class="jump" href="#content">Skip to content</a>
<header class="bar"><div class="shell"><a class="mark" href="/">${cube}<span>icemakersale</span></a><nav class="menu" aria-label="Primary">${MENU.map(([t, p]) => `<a href="${href(p)}"${p === d.path ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav></div></header>
${hero}
<main class="shell page" id="content">${intro}${answer}${chips}<div class="flow">${main}</div>${qa}${refs}${more}</main>
<footer class="base"><div class="shell">${fmap}<strong>${SITE}</strong><nav aria-label="Footer"><a href="/guides/">All guides</a><a href="/how-we-choose/">How we choose</a><a href="/affiliate-disclosure/">Affiliate disclosure</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/contact/">Contact</a></nav><p>We may earn a commission when you buy through links on this site, at no cost to you. Output figures are maker ratings, usually measured with cool room and water temperatures. Check the seller's page for current prices.</p></div></footer>
</body>
</html>`;
}

rmSync(out, { recursive: true, force: true });
for (const d of docs) {
  const dir = d.path ? join(out, d.path) : out;
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), render(d));
}
writeFileSync(join(out, '404.html'), render({ path: '404', legal: true, noindex: true, tab: `Page not found | ${SITE}`, summary: 'Page not found.', heading: 'That page is not here', parts: [['Try one of these', '<p>Start with the <a href="/">ice maker deals guide</a>, the <a href="/best-nugget-ice-maker/">best nugget ice makers</a>, or <a href="/guides/">every guide</a>.</p>']] }));
const listed = docs.filter((d) => !d.noindex);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${listed.map((d) => `  <url><loc>${abs(d.path)}</loc><lastmod>${d.iso || ISO}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
writeFileSync(join(out, 'llms.txt'), `# ${SITE}\n\n> Buying guides, reviews, sale timing and cleaning guides for nugget, countertop, portable and undercounter ice makers.\n\n${listed.filter((d) => !d.legal).map((d) => `- [${d.heading}](${abs(d.path)}): ${d.summary}`).join('\n')}\n`);
cpSync(join(root, 'static'), out, { recursive: true });
writeFileSync(join(root, 'scripts/share-list.json'), JSON.stringify(docs.map((d) => ({ slug: d.path || 'index', title: d.heading }))));
console.log(`${docs.length} pages written to out/`);
