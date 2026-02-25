# Setup CloudBase for OpenClaw/Moltbot

This skill helps you configure your OpenClaw/Moltbot installation for CloudBase full-stack development, including copying app templates to start new projects.

## Quick Start

### Option 1: Run the Setup Script

```bash
npx @cloudbase/setup-openclaw detect
```

### Option 2: Copy App Template

```bash
npx @cloudbase/setup-openclaw copy-template --dest /path/to/my-project
```

### Option 3: Install Skill Enhancer Plugin

```bash
# Install the skill-enhancer plugin (optional but recommended)
npx @cloudbase/setup-openclaw install-plugin
```

This plugin automatically instructs the model to list available skills and justify their usage before responding.

### Option 4: Manual Setup

Follow these steps:

1. **Find your workspace** - Check your config file for the workspace path
2. **Configure MCP** - Add CloudBase MCP to `<workspace>/config/mcporter.json`
3. **Update AGENTS.md** - Add CloudBase development rules
4. **Install skill-enhancer plugin (optional)** - `npx @cloudbase/setup-openclaw install-plugin`
5. **Install skills** - `npx skills add tencentcloudbase/skills -y`
6. **Copy app template (optional)** - `cp -r <workspace>/app <workspace>/my-new-project`
7. **Restart gateway** - `moltbot gateway restart`

See [SKILL.md](./SKILL.md) for detailed instructions.

## What This Skill Does

- ✅ Detects your OpenClaw/Moltbot installation directory
- ✅ Finds your workspace configuration
- ✅ Checks for existing CloudBase MCP setup
- ✅ Verifies CloudBase skills are installed
- ✅ Installs skill-enhancer plugin (optional) to enforce proper skill usage
- ✅ Copies CloudBase React template for new projects
- ✅ Provides step-by-step guidance for configuration

## App Template

The workspace includes a **CloudBase + React template** that can be copied as a starting point:

**Features:**
- React 19 + Vite 6 + TypeScript
- Tailwind CSS + DaisyUI
- CloudBase Web SDK integration
- Example project (Swimming Tracker)
- Build configuration and deployment scripts

**To copy:**
```bash
# Using the script
bash scripts/detect-setup.sh copy-template --dest ../my-new-project

# Or manually
cp -r app/ my-new-project/
```

**After copying:**
1. Update `cloudbaserc.json` with your Environment ID
2. Run `npm install`
3. Run `npm run dev` for development
4. Run `npm run build` for production

## Requirements

- OpenClaw or Moltbot installation
- Tencent Cloud account with CloudBase enabled
- Node.js 18+ (for Node.js setup script)

## Getting CloudBase Credentials

You'll need three values:

1. **Environment ID** - From [CloudBase Console](https://tcb.cloud.tencent.com)
2. **SecretId** - From [CAM API Key Management](https://console.cloud.tencent.com/cam/capi)
3. **SecretKey** - From [CAM API Key Management](https://console.cloud.tencent.com/cam/capi)

## MCP Configuration Example

```json
{
  "mcpServers": {
    "cloudbase-mcp": {
      "command": "npx",
      "args": ["@cloudbase/cloudbase-mcp@latest"],
      "env": {
        "TENCENTCLOUD_SECRETID": "your_secret_id_here",
        "TENCENTCLOUD_SECRETKEY": "your_secret_key_here",
        "CLOUDBASE_ENV_ID": "your_env_id_here"
      }
    }
  }
}
```

## Verification

To verify everything is working:

```
Ask the agent: "List available MCP tools"
Should see CloudBase-related tools
```

## Troubleshooting

### MCP not showing up

1. Verify mcporter.json syntax is valid JSON
2. Check credentials are correct (no extra spaces)
3. Restart the gateway after config changes
4. Run `npx mcporter list` to verify MCP servers

### Skills not loading

1. Check skills are in the correct directory
2. Verify SYMLINKS are created correctly
3. Restart the gateway after installing skills

## Publishing (maintainers)

Publish to the **official npm registry** (not npmmirror). From this directory:

```bash
# Log in to npm (only once)
npm login --registry https://registry.npmjs.org

# Bump version if needed, then publish
npm version patch   # or minor/major
npm publish --registry https://registry.npmjs.org
```

If your shell uses npmmirror by default, `npm publish` without `--registry` will fail with `ENEEDAUTH`; always pass `--registry https://registry.npmjs.org` for publish.

## Links

- [CloudBase MCP](https://github.com/TencentCloudBase/cloudbase-mcp)
- [CloudBase Console](https://tcb.cloud.tencent.com)
- [Skills Hub](https://skills.sh/)

## License

MIT
