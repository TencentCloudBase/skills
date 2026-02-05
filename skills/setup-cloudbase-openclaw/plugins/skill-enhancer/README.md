# Skill Enhancer Plugin

A lightweight OpenClaw plugin that enforces proper skill usage by instructing the model to list available skills and justify their usage before responding.

## Purpose

This plugin addresses a common issue where AI models skip reading relevant skills and write code directly. By injecting instructions before each agent turn, it ensures:

1. **Skills are considered first** - The model must list available skills for each request
2. **Usage is justified** - The model must explain why each skill is relevant
3. **No skipping** - Prevents writing code without reading relevant skills first

## Installation

### Via Setup Script

```bash
npx @cloudbase/setup-openclaw install-plugin
```

### Manual Installation

1. **Copy plugin files** to `~/.openclaw/extensions/skill-enhancer/`:
   ```bash
   mkdir -p ~/.openclaw/extensions/skill-enhancer
   cp plugins/skill-enhancer/* ~/.openclaw/extensions/skill-enhancer/
   ```

2. **Enable plugin** in `~/.openclaw/openclaw.json`:
   ```json
   {
     "plugins": {
       "entries": {
         "skill-enhancer": { "enabled": true }
       }
     }
   }
   ```

3. **Restart gateway**:
   ```bash
   openclaw gateway restart
   ```

## How It Works

The plugin hooks into the `before_agent_start` event and prepends instructions to the model's context:

```
## Skill Usage Rules
Before responding, you MUST:
1. List the available Skills you can use for this request.
2. State the reason for calling each Skill.
3. NEVER skip reading a Skill and write code directly. Example: "You MUST read the cloudbase-guidelines skill FIRST when working with CloudBase projects."

---
```

The model receives these instructions along with the list of available skills (injected by OpenClaw's system prompt), ensuring skills are properly considered.

## Configuration

### Enable/Disable

Edit `~/.openclaw/openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "skill-enhancer": { "enabled": true }  // or false to disable
    }
  }
}
```

### Per-Agent Configuration

To enable only for specific agents, modify `index.ts`:

```typescript
api.on('before_agent_start', async (event, ctx) => {
  // Only enable for specific agents
  const enabledAgents = ['agent-1', 'agent-2'];
  if (!enabledAgents.includes(ctx.agentId)) {
    return;
  }
  
  // ... rest of the code
});
```

## Example Behavior

**Without plugin:**
```
User: "Create a CloudBase web app"
Model: [Writes code directly without reading cloudbase-guidelines]
```

**With plugin:**
```
User: "Create a CloudBase web app"
Model: 
"Available Skills:
- cloudbase-guidelines: Essential CloudBase development guidelines
- web-development: Web app development with static hosting
- cloud-functions: Cloud function development

I MUST read cloudbase-guidelines FIRST to understand CloudBase best practices, then web-development for web app structure..."

[Reads skills, then writes code]
```

## Technical Details

- **Plugin Type**: Context injection plugin
- **Hook**: `before_agent_start`
- **Context Impact**: Minimal (adds ~200 characters)
- **Performance**: Negligible overhead
- **Dependencies**: None (uses OpenClaw plugin SDK)

## Files

- `openclaw.plugin.json` - Plugin manifest
- `index.ts` - Plugin implementation
- `README.md` - This file

## Notes

- Plugins run **in-process** with the Gateway, so treat them as trusted code
- The plugin only injects instructions; it doesn't modify skill loading or execution
- If no skills are available, the model will still follow the instruction (listing "no available skills")
- The instruction is in English to match OpenClaw's system prompt language

## Troubleshooting

### Plugin not working

1. Check plugin is enabled in `openclaw.json`
2. Verify files are in `~/.openclaw/extensions/skill-enhancer/`
3. Restart gateway after changes
4. Check gateway logs for plugin loading errors

### Instructions not appearing

- Ensure gateway was restarted after installation
- Check that `before_agent_start` hook is supported in your OpenClaw version
- Verify plugin manifest syntax is correct

## License

MIT
