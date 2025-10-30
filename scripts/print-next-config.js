#!/usr/bin/env node
const path = require('path');
async function main() {
  const loadConfig = require('next/dist/server/config').default;
  const { PHASE_PRODUCTION_BUILD } = require('next/constants');
  const dir = path.resolve(__dirname, '..');
  const cfg = await loadConfig(PHASE_PRODUCTION_BUILD, dir, { silent: false });
  const t = typeof cfg.generateBuildId;
  console.log('generateBuildId type:', t);
  if (t !== 'function') {
    console.log('value:', cfg.generateBuildId);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });


