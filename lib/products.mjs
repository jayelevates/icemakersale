import { ANCHORS } from './anchors.mjs';
import { amz, safe } from './site.mjs';
import { MORE, MORE_KINDS } from './more.mjs';

// lbs: maker-rated daily output. bin: storage in pounds. ice: shape. kind: nugget | bullet | undercounter | cleaner
export const P = {
  opalultra: { name: 'GE Profile Opal 2.0 Ultra', brand: 'GE Profile', kind: 'nugget', ice: 'Nugget', lbs: 38, bin: 3, tier: '$400 to $550', q: 'GE Profile Opal 2.0 Ultra nugget ice maker',
    specs: { Size: '16.5 x 13.43 x 17.5 in with side tank (H x W x D)', Extras: 'WiFi, side tank, scale-inhibiting filter', 'First batch': 'About 10 minutes' },
    good: ['Fastest Opal: rated 1.6 lb of nugget ice per hour', 'Side tank triples the water between refills', 'Quiet, polished and app-connected'],
    watch: ['Costs about twice a budget nugget maker', 'Needs weekly cleaning, per GE'] },
  opal2: { name: 'GE Profile Opal 2.0', brand: 'GE Profile', kind: 'nugget', ice: 'Nugget', lbs: 24, bin: 3, tier: '$350 to $500', q: 'GE Profile Opal 2.0 nugget ice maker XPIO13',
    specs: { Size: '16.5 x 13.43 x 17.5 in with side tank (H x W x D)', Extras: 'WiFi, side tank on most versions', 'First batch': 'About 20 minutes' },
    good: ['The original "good ice" machine, with a huge owner base', 'Refills its bin automatically', 'Self-cleaning design recirculates melt water'],
    watch: ['Slower than the Ultra at 24 lb a day', 'Often priced close to the Ultra; compare before buying'] },
  opalmini: { name: 'GE Profile Opal Mini', brand: 'GE Profile', kind: 'nugget', ice: 'Nugget', lbs: 36, bin: 2, tier: '$300 to $450', q: 'GE Profile Opal Mini nugget ice maker',
    specs: { Size: '14.6 x 8.6 x 15.6 in (H x W x D)', Extras: 'WiFi, filter compatible', 'First batch': 'Fast; 1.5 lb per hour rated' },
    good: ['Opal ice in a body under 9 inches wide', 'Rated up to 36 lb a day', 'Fits under most cabinets'],
    watch: ['Smaller bin than the full-size Opal', 'Newer model with less long-term history'] },
  euhomynugget: { name: 'Euhomy Nugget Ice Maker (34 lb)', brand: 'Euhomy', kind: 'nugget', ice: 'Nugget', lbs: 34, bin: 1.8, tier: '$130 to $200', q: 'EUHOMY nugget ice maker countertop 34 lbs',
    specs: { Size: 'Compact countertop', Extras: 'Self-cleaning, carry handle on some versions', 'First batch': 'About 6 to 8 minutes' },
    good: ['Nugget ice at about a third of Opal prices', 'Quick first batch', 'Small enough for apartments and RVs'],
    watch: ['Smaller basket', 'Louder and less refined than an Opal'] },
  frigidairegallery: { name: 'Frigidaire Gallery Nugget Ice Maker (33 lb)', brand: 'Frigidaire', kind: 'nugget', ice: 'Nugget', lbs: 33, bin: 2, tier: '$170 to $250', q: 'Frigidaire Gallery nugget ice maker EFIC220',
    specs: { Size: 'Countertop', Extras: 'Touchscreen controls, self-clean', 'First batch': 'Fast' },
    good: ['Big-brand nugget maker for less than an Opal', 'Touch controls and a clear window', 'Easy to find in stores'],
    watch: ['Bin size is modest', 'Plain styling'] },
  frigidaire44: { name: 'Frigidaire 44 lb Nugget Ice Maker', brand: 'Frigidaire', kind: 'nugget', ice: 'Nugget', lbs: 44, bin: 2.5, tier: '$230 to $320', q: 'Frigidaire 44 lb nugget ice maker EFIC256',
    specs: { Size: 'Countertop', Extras: 'Touchscreen, self-clean, transparent window', 'First batch': 'Fast' },
    good: ['Highest rated output among big-brand countertop nugget makers', 'Good for families and parties', 'Self-clean mode'],
    watch: ['Larger footprint', 'Costs more than the 33 lb Gallery'] },
  simzlife: { name: 'Simzlife Nugget Ice Maker', brand: 'Simzlife', kind: 'nugget', ice: 'Nugget', lbs: 44.9, bin: 2, tier: '$150 to $220', q: 'Simzlife nugget ice maker countertop',
    specs: { Size: 'Countertop', Extras: 'Touch screen, self-cleaning', 'First batch': 'Fast' },
    good: ['Very high rated output for the price', 'Touch controls', 'Often discounted'],
    watch: ['Lesser-known brand with thinner support', 'Rated output assumes cool room and water'] },
  kismile: { name: 'Kismile Nugget Ice Maker (35 lb)', brand: 'Kismile', kind: 'nugget', ice: 'Nugget', lbs: 35, bin: 2.65, tier: '$120 to $180', q: 'Kismile nugget ice maker Z5815',
    specs: { Size: 'About 9 in wide', Extras: 'Self-cleaning', 'First batch': 'Fast' },
    good: ['Narrow body for tight counters', 'Low price for nugget ice', 'Simple controls'],
    watch: ['Basic build', 'Small water tank means frequent refills'] },
  frigidaire26: { name: 'Frigidaire 26 lb Countertop Ice Maker', brand: 'Frigidaire', kind: 'bullet', ice: 'Bullet', lbs: 26, bin: 1.5, tier: 'Under $100', q: 'Frigidaire 26 lb countertop ice maker EFIC117',
    specs: { Size: 'About 12 x 11 x 9 in', Extras: 'Two cube sizes on most versions', 'First batch': 'About 7 to 9 minutes' },
    good: ['Cheap, quick and widely sold', 'Batches of bullet ice in minutes', 'Stainless versions look good on a counter'],
    watch: ['Does not keep ice frozen; move it to the freezer', 'Bullet ice melts faster than cubes'] },
  igloo26: { name: 'Igloo 26 lb Automatic Ice Maker', brand: 'Igloo', kind: 'bullet', ice: 'Bullet', lbs: 26, bin: 1.5, tier: 'Under $100', q: 'Igloo automatic ice maker 26 pounds self cleaning',
    specs: { Size: 'Countertop, with handle on some versions', Extras: 'Self-cleaning, two cube sizes', 'First batch': '9 cubes in about 7 minutes' },
    good: ['Self-clean mode at a budget price', 'Carry handle for patios and RVs', 'Retro color options'],
    watch: ['Does not keep ice frozen', 'Bullet ice only'] },
  euhomybullet: { name: 'Euhomy Countertop Ice Maker (26.5 lb)', brand: 'Euhomy', kind: 'bullet', ice: 'Bullet', lbs: 26.5, bin: 1.3, tier: 'Under $100', q: 'EUHOMY countertop ice maker bullet 26 lbs',
    specs: { Size: 'Compact, about 13 lb', Extras: 'Self-cleaning, handle', 'First batch': 'About 6 to 8 minutes' },
    good: ['Light and easy to move', 'Very low price', 'Two cube sizes'],
    watch: ['Small basket', 'Not built for all-day use'] },
  euhomy100: { name: 'Euhomy 100 lb Undercounter Ice Maker', brand: 'Euhomy', kind: 'undercounter', ice: 'Clear cubes', lbs: 100, bin: 33, tier: '$400 to $700', q: 'EUHOMY 100lbs under counter commercial ice maker',
    specs: { Size: 'About 15 in wide', Extras: 'Freestanding or built-in, ETL listed', Drain: 'Gravity drain (pump versions available)' },
    good: ['Huge output for parties and home bars', 'Big 33 lb bin', 'Works built in or freestanding'],
    watch: ['Needs a floor drain or a pump version', 'Louder than residential brands'] },
  cotlin: { name: 'COTLIN 15 in Drainless Ice Maker', brand: 'COTLIN', kind: 'undercounter', ice: 'Crescent', lbs: 42, bin: 22, tier: '$500 to $800', q: 'COTLIN 15 inch drainless undercounter ice maker',
    specs: { Size: '15 in wide', Extras: 'Drainless design', Drain: 'None needed' },
    good: ['No drain line to install', 'Big bin for a drainless unit', 'Fits a standard 15 in opening'],
    watch: ['Melt water must be emptied', 'Crescent ice, not nugget'] },
  whynter155: { name: 'Whynter UIM-155 Built-In Ice Maker', brand: 'Whynter', kind: 'undercounter', ice: 'Crescent', lbs: 12, bin: 6, tier: '$500 to $750', q: 'Whynter UIM-155 built in ice maker',
    specs: { Size: '15 in wide', Extras: 'Stainless door, reversible', Drain: 'None needed' },
    good: ['No drain needed', 'Compact built-in option', 'Reversible door'],
    watch: ['Low output at 12 lb a day', 'Small 6 lb bin'] },
  edgestar: { name: 'EdgeStar 15 in Built-In Ice Maker', brand: 'EdgeStar', kind: 'undercounter', ice: 'Crescent', lbs: 25, bin: 20, tier: '$700 to $1,000', q: 'EdgeStar 15 inch built in ice maker',
    specs: { Size: '15 in wide', Extras: 'Built-in or freestanding', Drain: 'Depends on model; pump versions exist' },
    good: ['Large bin for its output', 'Established appliance brand', 'Outdoor-rated versions exist'],
    watch: ['Pricier than Euhomy-type units', 'Moderate output'] },
  kitchenaid15: { name: 'KitchenAid 15 in Automatic Ice Maker', brand: 'KitchenAid', kind: 'undercounter', ice: 'Cubes', lbs: 50, bin: 25, tier: '$2,000 and up', q: 'KitchenAid 15 inch automatic ice maker',
    specs: { Size: '15 in wide', Extras: 'Panel-ready and stainless options', Drain: 'Drain or pump version' },
    good: ['Premium build and quiet operation', 'Clear, slow-melting cubes', 'Matches high-end kitchens'],
    watch: ['Expensive', 'Professional install recommended'] },
  scotsman: { name: 'Scotsman CU50GA', brand: 'Scotsman', kind: 'undercounter', ice: 'Gourmet cubes', lbs: 65, bin: 26, tier: '$2,000 and up', q: 'Scotsman CU50GA undercounter ice maker',
    specs: { Size: '20 in wide', Extras: 'Commercial-grade build', Drain: 'Gravity drain (pump version available)' },
    good: ['Crystal-clear gourmet cubes', 'Commercial reliability', 'Strong output'],
    watch: ['Very expensive', 'Needs a drain or pump'] },
  // Cleaners
  affresh: { name: 'Affresh Ice Machine Cleaner', brand: 'Affresh', kind: 'cleaner', tier: 'Under $25', q: 'Affresh ice machine cleaner',
    specs: { Type: 'Liquid descaler', 'Works on': 'Countertop and built-in ice makers', Use: 'Per label directions' },
    good: ['Made for home ice makers', 'Widely sold', 'Clear instructions'], watch: ['Costs more per use than citric acid'] },
  nucalgon: { name: 'Nu-Calgon Nickel-Safe Ice Machine Cleaner', brand: 'Nu-Calgon', kind: 'cleaner', tier: 'Under $25', q: 'Nu-Calgon nickel safe ice machine cleaner',
    specs: { Type: 'Liquid descaler', 'Works on': 'Commercial and undercounter machines', Use: 'Per label directions' },
    good: ['Safe for nickel-plated evaporators', 'Commercial standard', 'Concentrated'], watch: ['Check your manual before using on a countertop unit'] },
  opalkit: { name: 'GE Profile Opal Cleaning Kit', brand: 'GE Profile', kind: 'cleaner', tier: 'Under $30', q: 'GE Profile Opal nugget ice maker cleaning kit',
    specs: { Type: 'Descaler and sanitizer kit', 'Works on': 'Opal nugget ice makers', Use: 'Follow Opal clean cycle' },
    good: ['Made by GE for the Opal', 'Includes what the clean cycle calls for', 'No guesswork on dilution'], watch: ['Only for Opal machines'] },
  impresa: { name: 'Impresa Ice Machine Cleaner', brand: 'Impresa', kind: 'cleaner', tier: 'Under $25', q: 'Impresa ice machine cleaner nickel safe',
    specs: { Type: 'Liquid descaler', 'Works on': 'Most ice makers', Use: 'Per label directions' },
    good: ['Nickel-safe formula', 'Good value', 'Works on many brands'], watch: ['Smaller brand'] },
};

export const kindLabel = { nugget: 'Nugget ice', bullet: 'Bullet ice', undercounter: 'Undercounter', cleaner: 'Cleaner', ...MORE_KINDS };
Object.assign(P, MORE);

export const buy = (id, label = 'Check price on Amazon') => `<a class="buy" href="${amz(P[id].q)}" rel="sponsored nofollow noopener" target="_blank">${label}</a>`;
export const nameLink = (id) => `<a href="${amz(P[id].q)}" rel="sponsored nofollow noopener" target="_blank">${safe(P[id].name)}</a>`;

// Output bar: width scaled to 100 lb a day, the most any machine here makes.
const bar = (p) => p.lbs ? `<div class="out" aria-label="Rated output ${p.lbs} pounds per day"><span class="out-n">${p.lbs}<small>lb/day</small></span><span class="out-track"><span style="width:${Math.min(100, p.lbs)}%"></span></span><span class="out-bin">${p.bin} lb bin</span></div>` : '';

const reviewOf = (name) => { const n = name.toLowerCase(); for (const [ph, path] of ANCHORS) if (path.endsWith('-review') && n.includes(ph.toLowerCase())) return path; return null; };
const rev = (p) => { const r = reviewOf(p.name); return r ? `<a class="rev" href="/${r}/">Read the full review</a>` : ''; };
export const pick = (id, award, why) => {
  const p = P[id];
  return `<article class="pick" id="pick-${id}"><div class="pick-side">${bar(p)}<p class="chips"><span class="tier">${safe(p.tier)}</span>${p.ice ? `<span>${safe(p.ice)}</span>` : ''}</p></div><div class="pick-main"><p class="award">${safe(award)}</p><h3>${safe(p.name)}</h3><p>${why}</p><dl class="specs">${Object.entries(p.specs).map(([k, v]) => `<div><dt>${safe(k)}</dt><dd>${safe(v)}</dd></div>`).join('')}</dl><div class="gw"><div><h4>Good</h4><ul>${p.good.map((g) => `<li>${safe(g)}</li>`).join('')}</ul></div><div><h4>Watch for</h4><ul>${p.watch.map((g) => `<li>${safe(g)}</li>`).join('')}</ul></div></div><div class="acts">${buy(id)}${rev(p)}</div></div></article>`;
};

const cell = (id, c) => { const p = P[id]; if (c === 'Daily output') return p.lbs ? `${p.lbs} lb` : 'Not listed'; if (c === 'Bin') return p.bin ? `${p.bin} lb` : 'Not listed'; if (c === 'Ice') return p.ice || 'Not listed'; if (c === 'Price band') return p.tier; return p.specs[c] || 'Not listed'; };
export const compare = (caption, ids, cols) => `<figure class="tbl"><figcaption>${safe(caption)}</figcaption><div class="tbl-x"><table><thead><tr><th scope="col">Model</th>${cols.map((c) => `<th scope="col">${safe(c)}</th>`).join('')}<th scope="col"><span class="vh">Price</span></th></tr></thead><tbody>${ids.map((id) => `<tr><th scope="row">${nameLink(id)}</th>${cols.map((c) => `<td>${safe(cell(id, c))}</td>`).join('')}<td>${buy(id, 'Check price')}</td></tr>`).join('')}</tbody></table></div></figure>`;
