#!/usr/bin/env node
/**
 * CloudBase OpenClaw/Moltbot Setup Script (Node.js)
 * Detects installation and helps configure CloudBase support
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkDir(dir) {
  if (fs.existsSync(dir)) {
    log(`✓ Found: ${dir}`, 'green');
    return true;
  } else {
    log(`✗ Not found: ${dir}`, 'red');
    return false;
  }
}

function findInstallDir() {
  const homeDir = os.homedir();
  const possibleDirs = [
    path.join(homeDir, '.openclaw'),
    path.join(homeDir, '.clawdbot'),
    path.join(homeDir, '.moltbot'),
  ];

  for (const dir of possibleDirs) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }
  return null;
}

function findConfigFile(installDir) {
  const homeDir = os.homedir();
  const possibleConfigs = [
    path.join(installDir, 'moltbot.json'),
    path.join(installDir, 'config.json'),
    path.join(installDir, 'openclaw.json'),
    path.join(homeDir, '.moltbot', 'moltbot.json'),
  ];

  for (const config of possibleConfigs) {
    if (fs.existsSync(config)) {
      return config;
    }
  }
  return null;
}

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Support JSON5 comments
    const cleaned = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    return JSON.parse(cleaned);
  } catch (err) {
    return null;
  }
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function extractWorkspace(configFile) {
  try {
    const content = fs.readFileSync(configFile, 'utf-8');
    const match = content.match(/"workspace"\s*:\s*"([^"]+)"/);
    if (match && match[1]) {
      return match[1];
    }
  } catch (err) {
    // Ignore read errors
  }
  return path.join(os.homedir(), 'clawd');
}

function detect() {
  log('=== CloudBase OpenClaw/Moltbot Setup Detection ===\n', 'blue');

  // Step 1: Detect installation directory
  log('[Step 1] Detecting installation directory...', 'yellow');
  const installDir = findInstallDir();
  let configFile = null;

  if (!installDir) {
    log('Could not find OpenClaw/Moltbot installation directory.', 'red');
    log('Please check your installation and try again.', 'red');
    process.exit(1);
  }

  if (fs.existsSync(path.join(installDir, 'moltbot.json'))) {
    configFile = path.join(installDir, 'moltbot.json');
  } else if (fs.existsSync(path.join(installDir, 'config.json'))) {
    configFile = path.join(installDir, 'config.json');
  }

  if (!configFile) {
    configFile = findConfigFile(installDir);
  }

  log(`Installation directory: ${installDir}`, 'green');
  log(`Configuration file: ${configFile || 'Not found'}`, 'green');
  console.log('');

  // Step 2: Extract workspace path
  log('[Step 2] Finding workspace directory...', 'yellow');
  let workspace = path.join(os.homedir(), 'clawd');

  if (configFile) {
    workspace = extractWorkspace(configFile);
    log(`Workspace directory: ${workspace}`, 'green');
  } else {
    log(`Using default workspace: ${workspace}`, 'blue');
  }
  console.log('');

  // Step 3: Check workspace structure
  log('[Step 3] Checking workspace structure...', 'yellow');

  if (fs.existsSync(workspace)) {
    log('✓ Workspace exists', 'green');

    // Check AGENTS.md
    if (fs.existsSync(path.join(workspace, 'AGENTS.md'))) {
      log('✓ AGENTS.md found', 'green');
    } else {
      log('⚠ AGENTS.md not found (will be created)', 'yellow');
    }

    // Check skills directory
    const skillsDir = path.join(workspace, 'skills');
    try {
      if (fs.existsSync(skillsDir) || (fs.lstatSync(skillsDir).isSymbolicLink())) {
        log('✓ Skills directory found', 'green');
      } else {
        log('⚠ Skills directory not found', 'yellow');
      }
    } catch {
      log('⚠ Skills directory not found', 'yellow');
    }

    // Check config directory
    const configDir = path.join(workspace, 'config');
    if (fs.existsSync(configDir)) {
      log('✓ Config directory found', 'green');

      const mcporterJson = path.join(configDir, 'mcporter.json');
      if (fs.existsSync(mcporterJson)) {
        log('✓ mcporter.json found', 'green');
      } else {
        log('⚠ mcporter.json not found (needs to be created)', 'yellow');
      }
    } else {
      log('⚠ Config directory not found', 'yellow');
    }

    // Check app template
    const appDir = path.join(workspace, 'app');
    if (fs.existsSync(appDir)) {
      log('✓ App template found (can be copied for new projects)', 'green');
    } else {
      log('⚠ App template not found', 'yellow');
    }
  } else {
    log(`✗ Workspace directory does not exist: ${workspace}`, 'red');
  }
  console.log('');

  // Step 4: Check for CloudBase MCP
  log('[Step 4] Checking mcporter configuration...', 'yellow');
  const mcporterJson = path.join(workspace, 'config', 'mcporter.json');

  if (fs.existsSync(mcporterJson)) {
    try {
      const mcporterContent = fs.readFileSync(mcporterJson, 'utf-8');
      if (mcporterContent.includes('cloudbase-mcp')) {
        log('✓ CloudBase MCP configured in mcporter.json', 'green');
      } else {
        log('⚠ CloudBase MCP not configured in mcporter.json', 'yellow');
      }
    } catch (err) {
      log('⚠ Could not read mcporter.json', 'yellow');
    }
  } else {
    log('⚠ mcporter.json not found', 'yellow');
  }
  console.log('');

  // Step 5: Check for CloudBase skills
  log('[Step 5] Checking for CloudBase skills...', 'yellow');
  const skillsDir = path.join(workspace, 'skills');
  let cloudbaseSkillsCount = 0;

  const skillsToCheck = [
    'cloudbase-guidelines',
    'web-development',
    'miniprogram-development',
    'cloud-functions',
  ];

  if (fs.existsSync(skillsDir)) {
    for (const skill of skillsToCheck) {
      const skillPath = path.join(skillsDir, skill);
      try {
        if (fs.existsSync(skillPath) && (fs.statSync(skillPath).isDirectory() || fs.lstatSync(skillPath).isSymbolicLink())) {
          log(`✓ Found skill: ${skill}`, 'green');
          cloudbaseSkillsCount++;
        }
      } catch {
        // Skip missing or inaccessible skill path
      }
    }
  }

  if (cloudbaseSkillsCount === 0) {
    log('⚠ No CloudBase skills found', 'yellow');
  }
  console.log('');

  // Summary
  log('=== Summary ===', 'blue');
  log(`Installation: ${installDir}`, 'green');
  log(`Workspace: ${workspace}`, 'green');
  log(`Config: ${configFile || 'Not found'}`, 'green');
  console.log('');

  // Next steps
  log('=== Next Steps ===', 'blue');

  const needsMcp = !fs.existsSync(mcporterJson) ||
    !fs.readFileSync(mcporterJson, 'utf-8').includes('cloudbase-mcp');

  if (needsMcp) {
    log('1. Configure CloudBase MCP:', 'yellow');
    log('   - Get your Environment ID from https://tcb.cloud.tencent.com', 'reset');
    log('   - Get SecretId/SecretKey from https://console.cloud.tencent.com/cam/capi', 'reset');
    log(`   - Create or update ${path.join(workspace, 'config/mcporter.json')}`, 'reset');
    console.log('');
  }

  if (cloudbaseSkillsCount === 0) {
    log('2. Install CloudBase skills:', 'yellow');
    log(`   cd ${workspace}`, 'reset');
    log('   npx skills add tencentcloudbase/skills -y', 'reset');
    console.log('');
  }

  if (!fs.existsSync(path.join(workspace, 'AGENTS.md'))) {
    log('3. Create AGENTS.md with CloudBase rules', 'yellow');
    console.log('');
  }

  const appDir = path.join(workspace, 'app');
  if (fs.existsSync(appDir)) {
    log('4. (Optional) Copy app template for a new project:', 'yellow');
    log(`   cp -r ${appDir} ${workspace}/my-new-project`, 'reset');
    console.log('');
  }

  log('5. Restart the gateway:', 'yellow');
  try {
    execSync('which moltbot', { stdio: 'ignore' });
    log('   moltbot gateway restart', 'reset');
  } catch {
    try {
      execSync('which clawdbot', { stdio: 'ignore' });
      log('   clawdbot restart', 'reset');
    } catch {
      log('   systemctl --user restart moltbot  # or clawdbot', 'reset');
    }
  }
  console.log('');

  log('Setup detection complete!', 'green');
  log('Follow the steps above to complete your CloudBase setup.', 'reset');
}

function copyTemplate(destDir) {
  // Find workspace by detecting from config (same logic as detect function)
  const installDir = findInstallDir();
  const configFile = findConfigFile(installDir);
  const workspace = extractWorkspace(configFile);
  
  const appDir = path.join(workspace, 'app');
  const targetDir = destDir || path.join(workspace, 'my-new-project');

  log('=== Copying CloudBase App Template ===\n', 'blue');

  // Check if app template exists
  if (!fs.existsSync(appDir)) {
    log(`App template not found at: ${appDir}`, 'red');
    log('Please ensure the template exists in your workspace.', 'red');
    process.exit(1);
  }

  // Check if target already exists
  if (fs.existsSync(targetDir)) {
    log(`Target directory already exists: ${targetDir}`, 'yellow');
    log('Please choose a different destination or remove the existing directory.', 'yellow');
    process.exit(1);
  }

  log(`Copying from: ${appDir}`, 'cyan');
  log(`Copying to: ${targetDir}`, 'cyan');
  console.log('');

  // Create target directory
  fs.mkdirSync(targetDir, { recursive: true });

  // Copy directory recursively
  function copyDir(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  copyDir(appDir, targetDir);

  log('✓ Template copied successfully!', 'green');
  console.log('');

  log('=== Next Steps ===', 'blue');
  log('1. Update cloudbaserc.json with your Environment ID:', 'yellow');
  log(`   ${path.join(targetDir, 'cloudbaserc.json')}`, 'reset');
  console.log('');
  log('2. Install dependencies:', 'yellow');
  log(`   cd ${targetDir}`, 'reset');
  log('   npm install', 'reset');
  console.log('');
  log('3. Run development server:', 'yellow');
  log('   npm run dev', 'reset');
  console.log('');
  log('4. Build for production:', 'yellow');
  log('   npm run build', 'reset');
}

function installPlugin() {
  log('=== Installing skill-enhancer Plugin ===\n', 'blue');

  // Step 1: Find installation directory
  const installDir = findInstallDir();
  if (!installDir) {
    log('✗ Could not find OpenClaw/Moltbot installation directory.', 'red');
    log('Please check your installation and try again.', 'red');
    process.exit(1);
  }

  log(`✓ Found installation directory: ${installDir}`, 'green');

  // Step 2: Create extensions directory
  const extensionsDir = path.join(installDir, 'extensions');
  if (!fs.existsSync(extensionsDir)) {
    fs.mkdirSync(extensionsDir, { recursive: true });
    log(`✓ Created extensions directory: ${extensionsDir}`, 'green');
  } else {
    log(`✓ Extensions directory exists: ${extensionsDir}`, 'green');
  }

  // Step 3: Copy plugin files
  const pluginSourceDir = path.join(__dirname, '..', 'plugins', 'skill-enhancer');
  const pluginDestDir = path.join(extensionsDir, 'skill-enhancer');

  if (!fs.existsSync(pluginSourceDir)) {
    log(`✗ Plugin source directory not found: ${pluginSourceDir}`, 'red');
    process.exit(1);
  }

  // Create plugin directory
  if (!fs.existsSync(pluginDestDir)) {
    fs.mkdirSync(pluginDestDir, { recursive: true });
  }

  // Copy plugin files
  const filesToCopy = ['openclaw.plugin.json', 'index.ts'];
  for (const file of filesToCopy) {
    const srcPath = path.join(pluginSourceDir, file);
    const destPath = path.join(pluginDestDir, file);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      log(`✓ Copied ${file}`, 'green');
    } else {
      log(`⚠ File not found: ${file}`, 'yellow');
    }
  }

  // Step 4: Update openclaw.json config
  const configFile = findConfigFile(installDir);
  let configPath = path.join(installDir, 'openclaw.json');
  
  // If config file exists but is not openclaw.json, we still need to update openclaw.json
  if (configFile && !configFile.endsWith('openclaw.json')) {
    // Check if openclaw.json exists separately
    const openclawJsonPath = path.join(installDir, 'openclaw.json');
    if (!fs.existsSync(openclawJsonPath)) {
      // Create new openclaw.json
      writeJsonFile(openclawJsonPath, {
        plugins: {
          entries: {
            'skill-enhancer': { enabled: true }
          }
        }
      });
      log(`✓ Created ${openclawJsonPath}`, 'green');
      configPath = openclawJsonPath;
    } else {
      configPath = openclawJsonPath;
    }
  }

  // Read existing config or create new
  let config = readJsonFile(configPath);
  if (!config) {
    config = {};
  }

  // Initialize plugins structure if needed
  if (!config.plugins) {
    config.plugins = {};
  }
  if (!config.plugins.entries) {
    config.plugins.entries = {};
  }

  // Enable the plugin
  config.plugins.entries['skill-enhancer'] = { enabled: true };

  // Write config
  writeJsonFile(configPath, config);
  log(`✓ Updated ${configPath}`, 'green');

  console.log('');
  log('=== Installation Complete ===', 'blue');
  log('Plugin installed successfully!', 'green');
  console.log('');
  log('=== Next Steps ===', 'blue');
  log('1. Restart the gateway to load the plugin:', 'yellow');
  
  try {
    execSync('which moltbot', { stdio: 'ignore' });
    log('   moltbot gateway restart', 'reset');
  } catch {
    try {
      execSync('which clawdbot', { stdio: 'ignore' });
      log('   clawdbot restart', 'reset');
    } catch {
      log('   openclaw gateway restart', 'reset');
    }
  }
  
  console.log('');
  log('2. The plugin will automatically inject instructions to the model', 'reset');
  log('   to list available skills and justify their usage.', 'reset');
  console.log('');
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

if (command === 'detect') {
  detect();
} else if (command === 'copy-template') {
  const destIndex = args.indexOf('--dest');
  const destDir = destIndex >= 0 ? args[destIndex + 1] : null;
  copyTemplate(destDir);
} else if (command === 'install-plugin') {
  installPlugin();
} else {
  // Default: run detect
  detect();
}
