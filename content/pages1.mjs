import { pick, compare, buy, nameLink } from '../lib/products.mjs';

// Nugget pile for the home hero: rounded pellets that drop in once.
const pos = [[40, 250], [96, 262], [152, 256], [208, 262], [264, 254], [320, 262], [376, 252], [68, 214], [124, 222], [180, 216], [236, 222], [292, 214], [348, 220], [96, 176], [152, 182], [208, 176], [264, 184], [320, 178], [124, 140], [180, 144], [236, 138], [292, 146], [152, 104], [208, 108], [264, 102], [208, 68]];
const pile = `<svg class="pile" viewBox="0 0 440 300" role="img" aria-label="A pile of nugget ice">${pos.map(([x, y], i) => `<rect class="n" x="${x}" y="${y}" width="${46 + (i % 3) * 4}" height="${34 + (i % 2) * 4}" rx="16" fill="${['#FFFFFF', '#EAF4F6', '#D3E8EC', '#B9DCE3'][i % 4]}" style="animation-delay:${(0.04 * (pos.length - i)).toFixed(2)}s"/>`).join('')}</svg>`;

const shape = (k) => ({
  nugget: '<svg width="56" height="40" viewBox="0 0 56 40" aria-hidden="true"><rect x="4" y="14" width="18" height="14" rx="7" fill="#9CC3CC"/><rect x="20" y="8" width="18" height="14" rx="7" fill="#1F6E7E"/><rect x="32" y="18" width="18" height="14" rx="7" fill="#9CC3CC"/></svg>',
  bullet: '<svg width="56" height="40" viewBox="0 0 56 40" aria-hidden="true"><path d="M8 26a10 10 0 0 1 20 0v4H8z" fill="#1F6E7E"/><path d="M28 22a10 10 0 0 1 20 0v4H28z" fill="#9CC3CC"/></svg>',
  crescent: '<svg width="56" height="40" viewBox="0 0 56 40" aria-hidden="true"><path d="M10 12h36a18 18 0 0 1-36 0z" fill="#1F6E7E"/></svg>',
  cube: '<svg width="56" height="40" viewBox="0 0 56 40" aria-hidden="true"><rect x="8" y="8" width="20" height="20" rx="3" fill="#1F6E7E"/><rect x="30" y="12" width="20" height="20" rx="3" fill="#9CC3CC"/></svg>',
})[k];
const types = `<div class="types">${[['nugget', 'Nugget', 'Soft, chewable pellets. Soaks up flavor.'], ['bullet', 'Bullet', 'Hollow-ish domes made in minutes. Melts fast.'], ['crescent', 'Crescent', 'Half-moon cubes from built-in machines.'], ['cube', 'Clear cube', 'Hard, slow-melting cubes for cocktails.']].map(([k, b, s]) => `<div>${shape(k)}<b>${b}</b><span>${s}</span></div>`).join('')}</div>`;

export default [
  {
    path: '', short: 'Ice maker deals', blurb: 'When ice makers go on sale and which ones are worth buying.',
    tab: 'Ice Maker Sale Guide 2026: Best Deals, When to Buy and What to Get',
    summary: 'When countertop, nugget and undercounter ice makers go on sale, how to spot a real deal, and the best ice makers to buy at every budget.',
    heading: 'Ice maker sale: the best deals and when to buy',
    lede: 'Which ice makers are worth buying, when they actually get cheaper, and how to tell a real discount from a padded one.',
    hero: pile,
    quick: 'Ice maker discounts are biggest around Prime Day in July and Black Friday through Cyber Monday in November, with spring sales ahead of summer too. The GE Profile Opal is the nugget ice maker most worth waiting for, because its discounts are large. Budget bullet ice makers under $100 are cheap all year, so buy one when you need it.',
    list: ['GE Profile Opal 2.0 Ultra', 'Euhomy Nugget Ice Maker', 'Frigidaire 26 lb Countertop Ice Maker', 'Euhomy 100 lb Undercounter Ice Maker'],
    parts: [
      ['The ice makers worth buying', `${pick('opalultra', 'Best nugget ice maker to catch on sale', 'The Opal is the benchmark for chewable nugget ice. The newer Ultra version is rated at 38 pounds a day, and Opal prices swing a lot during sales, so timing pays off here more than anywhere else.')}${pick('euhomynugget', 'Best budget nugget ice maker', 'Real nugget ice for a fraction of the Opal price. It is a little louder and less polished, but it makes the same soft, chewable ice.')}${pick('frigidaire26', 'Best cheap countertop ice maker', 'Batches of bullet ice in minutes for well under $100. It does not keep ice frozen, so move it to a freezer bag as it fills.')}${pick('euhomy100', 'Best for home bars and parties', 'Rated at 100 pounds a day with a 33-pound bin. Plan for a drain, or buy a version with a pump.')}`],
      ['Which kind of ice do you want?', `<p>The type of ice decides the type of machine. Pick the ice first.</p>${types}<ul><li><b>Nugget ice</b> (also called pebble or Sonic ice) comes from nugget makers like the GE Opal. See the <a href="/best-nugget-ice-maker/">best nugget ice makers</a>.</li><li><b>Bullet ice</b> comes from budget countertop makers. See the <a href="/best-countertop-ice-maker/">best countertop ice makers</a>.</li><li><b>Crescent and clear cubes</b> come from built-in machines. See the <a href="/best-undercounter-ice-maker/">best undercounter ice makers</a>.</li></ul>`],
      ['When ice makers go on sale', `<ul><li><b>Prime Day (July)</b> and <b>Black Friday through Cyber Monday (November)</b> bring the deepest discounts on GE Opal, Frigidaire and Euhomy machines.</li><li><b>Spring and early summer</b> sales arrive as demand rises for patio and pool season.</li><li><b>Memorial Day and Labor Day</b> appliance sales often include undercounter ice makers.</li></ul><p>Budget bullet ice makers are cheap all year and drop only a little in sales, so there is rarely a reason to wait for one.</p>`],
      ['How to tell if a deal is real', `<ul><li><b>Check the price history</b> with a tracker such as Keepa or CamelCamelCamel, rather than trusting a "was" price.</li><li><b>Compare the exact model.</b> GE sells several Opal versions (2.0, 2.0 Ultra, Mini, with and without side tanks). A "deal" on the slower 24-pound Opal 2.0 can cost nearly as much as the 38-pound Ultra.</li><li><b>Check who sells it.</b> On Amazon, buy from listings shipped and sold by Amazon or the brand so warranty claims are simple.</li><li><b>Read the output fine print.</b> Daily output is measured in a cool room with cool water. In a hot kitchen or garage, expect less.</li></ul>`],
      ['Compare our picks', compare('Ice makers worth watching', ['opalultra', 'euhomynugget', 'frigidaire26', 'euhomy100'], ['Ice', 'Daily output', 'Bin', 'Price band'])],
    ],
    asked: [
      ['When is the best time to buy an ice maker?', 'Black Friday through Cyber Monday and Prime Day in July bring the deepest discounts, especially on GE Opal nugget ice makers.'],
      ['Does the GE Opal ever go on sale?', 'Yes. Opal models are discounted at major retailers several times a year, most heavily around Black Friday and Prime Day. See our <a href="/nugget-ice-maker-sale/">nugget ice maker sale guide</a>.'],
      ['Are cheap ice makers worth it?', 'For occasional use, yes. A sub-$100 bullet ice maker makes ice fast, but it does not keep ice frozen and the ice melts quickly.'],
      ['How much ice does a countertop ice maker make?', 'Most budget countertop machines are rated at about 26 pounds a day. Nugget makers are rated from about 24 to 45 pounds, depending on the model.'],
    ],
    next: ['best-nugget-ice-maker', 'nugget-ice-maker-sale', 'best-countertop-ice-maker'],
  },
  {
    path: 'nugget-ice-maker-sale', short: 'Nugget ice maker sale', blurb: 'Which nugget ice maker to buy on sale and what to pay.',
    tab: 'Nugget Ice Maker Sale: Best Deals on GE Opal and Budget Nugget Makers',
    summary: 'Nugget ice maker deals explained: which GE Opal version to buy on sale, the best budget alternatives, and what counts as a good price.',
    heading: 'Nugget ice maker sale guide',
    lede: 'Nugget ice makers range from about $120 to over $500. Here is which one to buy on sale, and which "deals" are not.',
    quick: 'On sale, the GE Profile Opal 2.0 Ultra is the nugget ice maker to buy: it is rated at 38 pounds a day versus 24 for the older Opal 2.0, and the price gap is often small. If you do not want to pay Opal prices, budget nugget makers from Euhomy, Frigidaire and Kismile make similar ice for well under $250 and go on sale often.',
    list: ['GE Profile Opal 2.0 Ultra', 'GE Profile Opal Mini', 'GE Profile Opal 2.0', 'Frigidaire 44 lb Nugget Ice Maker', 'Euhomy Nugget Ice Maker', 'Kismile Nugget Ice Maker'],
    parts: [
      ['Which Opal to buy', `${compare('GE Profile Opal models compared', ['opalultra', 'opalmini', 'opal2'], ['Daily output', 'Bin', 'Size', 'Price band'])}<p>GE rates the Opal 2.0 Ultra at up to 38 pounds a day and 1.6 pounds an hour, and the Opal Mini at up to 36 pounds a day in a body under 9 inches wide. Current GE listings rate the Opal 2.0 at up to 38 pounds a day too (some older listings say 24). The Ultra adds a scale-inhibiting filter, so if the two are within about $50 of each other, buy the Ultra.</p>`],
      ['Our picks to buy on sale', `${pick('opalultra', 'Best overall', 'The fastest, most refined Opal, with the side tank and a filter that slows scale buildup.')}${pick('opalmini', 'Best for small kitchens', 'Nearly the Ultra\'s output in a much narrower body. Good under cabinets.')}${pick('frigidaire44', 'Best big-brand alternative', 'A 44-pound rating, touch controls and a self-clean mode, usually for much less than an Opal.')}${pick('euhomynugget', 'Best under $200', 'The same chewable ice in a compact, budget machine.')}${pick('kismile', 'Best narrow budget machine', 'About 9 inches wide and often on sale.')}`],
      ['What a good nugget ice maker price looks like', `<ul><li><b>GE Opal:</b> list prices sit in the $400 to $600 range depending on version; sales during Prime Day and Black Friday are the moments to buy.</li><li><b>Big-brand budget nugget makers</b> (Frigidaire): usually $170 to $320.</li><li><b>Value brands</b> (Euhomy, Kismile, Simzlife): often $120 to $220, with frequent coupon discounts on Amazon.</li></ul><p>Check the current price on the seller page, and use a price tracker to confirm a sale is real.</p>`],
    ],
    asked: [
      ['What is the best nugget ice maker to buy on sale?', 'The GE Profile Opal 2.0 Ultra, because sale prices often bring it close to the older, slower Opal 2.0.'],
      ['Is the GE Opal worth it?', 'If you drink a lot of nugget ice and want a quiet, connected machine, yes, especially on sale. Budget models make similar ice for less but are louder and less refined.'],
      ['Are cheap nugget ice makers any good?', 'Yes. Euhomy, Frigidaire and Kismile nugget makers make real chewable ice. Expect smaller bins, more noise and shorter warranties.'],
    ],
    refs: [['GE Appliances, Opal nugget ice makers (model specifications)', 'https://www.geappliances.com/ge/icemakers/opal-nugget-icemaker.htm'], ['GE Appliances, Opal 2.0 Ultra comparison sheet', 'https://products.geappliances.com/appliance/gea-compare/%26sku%3DXPIO13SWBB']],
    next: ['best-nugget-ice-maker', 'ge-profile-opal-2-review', 'euhomy-nugget-ice-maker-review'],
  },
  {
    path: 'best-nugget-ice-maker', short: 'Best nugget ice makers', blurb: 'Machines that make soft, chewable Sonic-style ice.',
    tab: 'Best Nugget Ice Maker (2026): Opal and Budget Picks for Chewable Ice',
    summary: 'The best nugget ice makers for soft, chewable Sonic-style ice, from the GE Profile Opal to budget machines under $200, compared by output and size.',
    heading: 'The best nugget ice makers',
    lede: 'Nugget ice is soft, chewable and soaks up the flavor of your drink. These are the machines that make it best at home.',
    quick: 'The best nugget ice maker is the GE Profile Opal 2.0 Ultra, rated at 38 pounds a day with a side tank and app control. The Opal Mini packs similar output into a much narrower body. On a budget, the Euhomy 34 lb nugget maker and the Frigidaire Gallery make the same kind of ice for far less money.',
    list: ['GE Profile Opal 2.0 Ultra', 'GE Profile Opal Mini', 'Frigidaire 44 lb Nugget Ice Maker', 'Euhomy Nugget Ice Maker', 'Frigidaire Gallery Nugget Ice Maker', 'Kismile Nugget Ice Maker', 'Simzlife Nugget Ice Maker'],
    parts: [
      ['Our picks', `${pick('opalultra', 'Best overall', 'The quietest, most polished nugget ice maker for a countertop. GE rates the Ultra at 1.6 pounds an hour, and the side tank means far fewer refills.')}${pick('opalmini', 'Best compact nugget maker', 'Under 9 inches wide and rated at up to 36 pounds a day. The smart choice if counter space is tight.')}${pick('frigidaire44', 'Best high-output budget pick', 'The highest rated output from a big-brand budget nugget maker, with a self-clean mode.')}${pick('euhomynugget', 'Best value', 'Real nugget ice for about a third of the Opal\'s price.')}${pick('frigidairegallery', 'Best from a big brand under $250', 'Touch controls, a clear window and easy in-store returns.')}${pick('kismile', 'Best narrow budget machine', 'About 9 inches wide and inexpensive.')}${pick('simzlife', 'Most output per dollar', 'Rated at almost 45 pounds a day for a budget price, though support is thinner than big brands.')}`],
      ['Compare nugget ice makers', compare('Nugget ice makers compared', ['opalultra', 'opalmini', 'frigidaire44', 'euhomynugget', 'frigidairegallery', 'kismile', 'simzlife'], ['Daily output', 'Bin', 'Price band', 'Extras'])],
      ['What makes nugget ice different', `<p>Nugget ice is made by scraping thin flakes of ice from a chilled cylinder and pressing them together. The result is airy, soft pellets that you can chew easily and that soak up the drink around them. It is the ice served at Sonic and in many hospitals, which is why people also call it Sonic ice or pellet ice. Learn more in our guide to <a href="/best-crushed-ice-maker/">crushed and chewable ice makers</a>.</p>`],
      ['How to choose', `<ul><li><b>Output:</b> 24 to 45 pounds a day covers most households. Output ratings assume cool room and water temperatures.</li><li><b>Bin size:</b> most countertop nugget makers hold 2 to 3 pounds. They do not freeze stored ice, so it slowly melts back into the reservoir and gets remade.</li><li><b>Water supply:</b> a side tank or larger reservoir means fewer refills.</li><li><b>Cleaning:</b> nugget makers need regular cleaning and descaling. GE recommends cleaning the Opal weekly. See <a href="/how-to-clean-ge-opal-ice-maker/">how to clean a GE Opal</a>.</li><li><b>Noise:</b> premium machines like the Opal are quieter than budget brands.</li></ul>`],
    ],
    asked: [
      ['What is the best nugget ice maker?', 'The GE Profile Opal 2.0 Ultra for most people. On a budget, the Euhomy 34 lb nugget maker or the Frigidaire Gallery.'],
      ['Is nugget ice the same as Sonic ice?', 'Yes. Sonic serves nugget ice, so nugget ice makers are often sold as Sonic ice makers.'],
      ['Do nugget ice makers keep ice frozen?', 'No. Countertop nugget makers have insulated bins but no freezer. Melted ice drains back and is remade into fresh ice.'],
      ['How long do nugget ice makers last?', 'Many last several years with regular cleaning and descaling. Hard water and skipped descaling are the most common causes of failure.'],
    ],
    refs: [['GE Appliances, Opal nugget ice makers', 'https://www.geappliances.com/ge/icemakers/opal-nugget-icemaker.htm']],
    next: ['ge-profile-opal-2-review', 'euhomy-nugget-ice-maker-review', 'nugget-ice-maker-sale'],
  },
  {
    path: 'best-countertop-ice-maker', short: 'Best countertop ice makers', blurb: 'Countertop machines for every budget, nugget and bullet.',
    tab: 'Best Countertop Ice Maker (2026): Nugget and Bullet Picks Compared',
    summary: 'The best countertop ice makers, from sub-$100 bullet ice machines to GE Profile Opal nugget makers, compared by output, bin size and price.',
    heading: 'The best countertop ice makers',
    lede: 'A countertop ice maker plugs into any outlet and makes ice in minutes. The best one depends on what kind of ice you want.',
    quick: 'For nugget ice, the best countertop ice maker is the GE Profile Opal 2.0 Ultra. For cheap, fast bullet ice, the Frigidaire 26 lb countertop ice maker is the pick, with the Igloo 26 lb as a self-cleaning alternative. The Euhomy nugget maker is the best middle ground: chewable ice for under $200.',
    list: ['GE Profile Opal 2.0 Ultra', 'Frigidaire 26 lb Countertop Ice Maker', 'Euhomy Nugget Ice Maker', 'Igloo 26 lb Automatic Ice Maker', 'Frigidaire Gallery Nugget Ice Maker', 'Euhomy Countertop Ice Maker'],
    parts: [
      ['Our picks', `${pick('opalultra', 'Best overall', 'The best ice from any countertop machine, with the quietest operation and the most refined build.')}${pick('frigidaire26', 'Best budget bullet ice maker', 'Fast batches, a big-brand warranty and a price well under $100.')}${pick('euhomynugget', 'Best value nugget maker', 'Nugget ice without Opal prices.')}${pick('igloo26', 'Best self-cleaning budget pick', 'A self-clean mode and a carry handle at a budget price.')}${pick('frigidairegallery', 'Best mid-price nugget maker', 'Touchscreen controls and a big-brand name for less than an Opal.')}${pick('euhomybullet', 'Lightest and most portable', 'About 13 pounds, with a handle. Easy to move to the patio or RV.')}`],
      ['Compare countertop ice makers', compare('Countertop ice makers compared', ['opalultra', 'frigidaire26', 'euhomynugget', 'igloo26', 'frigidairegallery', 'euhomybullet'], ['Ice', 'Daily output', 'Bin', 'Price band'])],
      ['Nugget or bullet?', `<p><b>Bullet ice makers</b> are cheap and fast, making a batch of nine bullet-shaped pieces in minutes. The ice is partly hollow and melts quickly. They are great for parties and occasional use.</p><p><b>Nugget ice makers</b> cost more and are a bit slower to start, but make soft, chewable ice that people love in sodas and iced drinks. They suit daily use.</p>`],
      ['Know this before you buy', `<ul><li><b>Countertop ice makers do not freeze ice.</b> The basket is insulated but not cold, so ice slowly melts back into the water reservoir. Move ice to the freezer if you want to keep it.</li><li><b>Output ratings are best-case.</b> Makers measure in cool conditions; warm kitchens make less.</li><li><b>Clean them regularly.</b> Standing water grows slime and mold. See <a href="/how-to-clean-portable-ice-maker/">how to clean a portable ice maker</a>.</li><li><b>Leave breathing room.</b> Most need a few inches of clearance around the vents.</li></ul>`],
    ],
    asked: [
      ['What is the best countertop ice maker?', 'The GE Profile Opal 2.0 Ultra for nugget ice. The Frigidaire 26 lb countertop ice maker for cheap, fast bullet ice.'],
      ['Do countertop ice makers keep ice frozen?', 'No. They have insulated baskets but no freezer, so ice slowly melts and is recycled into new ice.'],
      ['How much electricity does a countertop ice maker use?', 'Budget bullet ice makers draw roughly the power of a small appliance while running. Check the wattage on the model\'s label for exact figures.'],
    ],
    next: ['best-portable-ice-maker', 'best-nugget-ice-maker', 'frigidaire-countertop-ice-maker-review'],
  },
  {
    path: 'best-portable-ice-maker', short: 'Best portable ice makers', blurb: 'Light machines for kitchens, RVs, dorms and patios.',
    tab: 'Best Portable Ice Maker (2026): Light, Fast Machines for Home and RV',
    summary: 'The best portable ice makers for kitchens, RVs, dorms and patios, compared by weight, speed, output and price.',
    heading: 'The best portable ice makers',
    lede: 'Portable ice makers plug into any outlet and move from kitchen to patio to RV. These are the ones worth carrying around.',
    quick: 'The best portable ice maker is the Igloo 26 lb automatic ice maker: self-cleaning, with a carry handle, and makes a batch in about seven minutes. The Euhomy 26.5 lb bullet maker is the lightest. For chewable ice you can still move around, the Euhomy 34 lb nugget maker is the pick.',
    list: ['Igloo 26 lb Automatic Ice Maker', 'Euhomy Countertop Ice Maker', 'Frigidaire 26 lb Countertop Ice Maker', 'Euhomy Nugget Ice Maker', 'Kismile Nugget Ice Maker'],
    parts: [
      ['Our picks', `${pick('igloo26', 'Best overall', 'Self-cleaning, with a handle, and quick: nine cubes in about seven minutes.')}${pick('euhomybullet', 'Lightest portable ice maker', 'About 13 pounds and easy to carry, with two cube sizes.')}${pick('frigidaire26', 'Best big-brand portable', 'Reliable and widely sold, with a large 2.1-quart tank on some versions.')}${pick('euhomynugget', 'Best portable nugget ice maker', 'Chewable nugget ice in a machine small enough to move.')}${pick('kismile', 'Best narrow nugget maker', 'About 9 inches wide; fits small RV and dorm counters.')}`],
      ['Compare portable ice makers', compare('Portable ice makers compared', ['igloo26', 'euhomybullet', 'frigidaire26', 'euhomynugget', 'kismile'], ['Ice', 'Daily output', 'Bin', 'Price band'])],
      ['Using a portable ice maker in an RV or outdoors', `<ul><li><b>Power:</b> portable ice makers run on standard household current. In an RV, run one from shore power or a generator; on an inverter, check that it can supply the startup draw.</li><li><b>Keep it level:</b> tilting while running can spill the reservoir. Drain it before moving.</li><li><b>Shade:</b> direct sun and hot air cut output sharply.</li><li><b>Outdoor use:</b> most countertop models are made for indoor use. Keep them out of rain and splashes.</li></ul>`],
      ['Care', `<p>Drain the reservoir if the machine will sit unused for more than a day, and clean it every couple of weeks. Our <a href="/how-to-clean-portable-ice-maker/">cleaning guide</a> walks through it step by step.</p>`],
    ],
    asked: [
      ['Are portable ice makers worth it?', 'Yes for parties, RVs, dorms and homes without a fridge ice maker. They make ice fast but do not store it frozen.'],
      ['Can you use a portable ice maker in an RV?', 'Yes, on shore power or a generator. Check your inverter\'s capacity before running one off batteries.'],
      ['What is the difference between a portable and a countertop ice maker?', 'They are usually the same machines. "Portable" refers to models light enough to carry, often with a handle.'],
    ],
    next: ['best-countertop-ice-maker', 'best-small-ice-maker', 'how-to-clean-portable-ice-maker'],
  },
];
