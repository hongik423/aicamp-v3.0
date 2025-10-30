/*
  Hotfix: Guard undefined generateBuildId in Next build
  Replaces call in node_modules/next/dist/build/index.js to provide a fallback
*/
const fs = require('fs');
const path = require('path');

function applyFix() {
  const target = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'build', 'index.js');
  if (!fs.existsSync(target)) return;
  const src = fs.readFileSync(target, 'utf8');
  const needle = '(0, _generatebuildid.generateBuildId)(config.generateBuildId, _indexcjs.nanoid)';
  const patched = '(0, _generatebuildid.generateBuildId)(config.generateBuildId || (async ()=> null), _indexcjs.nanoid)';
  if (src.includes(patched)) return; // already patched
  if (!src.includes(needle)) return; // unexpected version, skip
  const out = src.replace(needle, patched);
  fs.writeFileSync(target, out, 'utf8');
}

try { applyFix(); } catch (e) { /* no-op */ }


