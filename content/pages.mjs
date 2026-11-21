import a from './pages1.mjs';
import b from './pages2.mjs';
import c from './wave2a.mjs';
import d from './wave2b.mjs';
import DEPTH from './depth/index.mjs';
const ALL = [...a, ...b, ...c, ...d];
for (const p of ALL) {
  const d = DEPTH[p.path === '' ? '/' : '/' + String(p.path).replace(/^\/|\/$/g, '')];
  if (!d) continue;
  if (d.parts.length) p.parts = [...(p.parts || []), ...d.parts];
  if (d.asked.length) p.asked = [...(p.asked || []), ...d.asked];
}
export default ALL;
