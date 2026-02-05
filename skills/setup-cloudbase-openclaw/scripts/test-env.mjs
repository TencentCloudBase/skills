#!/usr/bin/env node
/**
 * Test setup scripts against a simulated OpenClaw environment in /tmp.
 * Usage: node scripts/test-env.mjs
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.join(__dirname, '..');
const TEST_HOME = path.join(os.tmpdir(), 'openclaw-env-test');

function run(cmd, args, env = {}) {
  const result = spawnSync(cmd, args, {
    cwd: SKILL_ROOT,
    env: { ...process.env, HOME: TEST_HOME, ...env },
    encoding: 'utf-8',
  });
  return result;
}

function setupTestEnv() {
  const openclawDir = path.join(TEST_HOME, '.openclaw');
  const workspaceDir = path.join(TEST_HOME, 'clawd');
  fs.mkdirSync(openclawDir, { recursive: true });
  fs.mkdirSync(path.join(workspaceDir, 'config'), { recursive: true });
  fs.mkdirSync(path.join(workspaceDir, 'skills'), { recursive: true });
  fs.writeFileSync(
    path.join(openclawDir, 'moltbot.json'),
    JSON.stringify({ workspace: workspaceDir }, null, 2)
  );
  console.log(`Created test env at ${TEST_HOME}`);
}

function teardownTestEnv() {
  if (fs.existsSync(TEST_HOME)) {
    fs.rmSync(TEST_HOME, { recursive: true });
    console.log(`Removed test env ${TEST_HOME}`);
  }
}

function main() {
  const keep = process.argv.includes('--keep');
  teardownTestEnv();
  setupTestEnv();

  console.log('\n--- Running detect ---\n');
  const r1 = run(process.execPath, ['scripts/setup.mjs', 'detect']);
  console.log(r1.stdout || r1.stderr);
  if (r1.status !== 0) {
    console.error('detect failed');
    process.exit(1);
  }

  console.log('\n--- Running install-plugin ---\n');
  const r2 = run(process.execPath, ['scripts/setup.mjs', 'install-plugin']);
  console.log(r2.stdout || r2.stderr);
  if (r2.status !== 0) {
    console.error('install-plugin failed');
    process.exit(1);
  }

  const openclawJson = path.join(TEST_HOME, '.openclaw', 'openclaw.json');
  const pluginDir = path.join(TEST_HOME, '.openclaw', 'extensions', 'skill-enhancer');
  if (!fs.existsSync(openclawJson) || !fs.existsSync(path.join(pluginDir, 'index.ts'))) {
    console.error('Verification failed: openclaw.json or plugin files missing');
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(openclawJson, 'utf-8'));
  if (!config?.plugins?.entries?.['skill-enhancer']?.enabled) {
    console.error('Verification failed: plugin not enabled in openclaw.json');
    process.exit(1);
  }

  console.log('\n--- All tests passed ---\n');
  if (!keep) {
    teardownTestEnv();
  } else {
    console.log(`Test env kept at ${TEST_HOME} (--keep)`);
  }
}

main();
