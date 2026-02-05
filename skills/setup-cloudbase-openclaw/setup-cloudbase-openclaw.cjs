#!/usr/bin/env node
/**
 * Bin wrapper for setup-cloudbase-openclaw (CommonJS so it works with "type": "module").
 * Delegates to ESM script scripts/setup.mjs.
 */
const path = require('path');
const { spawnSync } = require('child_process');

const script = path.join(__dirname, 'scripts', 'setup.mjs');
const result = spawnSync(process.execPath, [script, ...process.argv.slice(2)], {
  stdio: 'inherit',
  cwd: process.cwd(),
});
process.exitCode = result.status != null ? result.status : 1;
