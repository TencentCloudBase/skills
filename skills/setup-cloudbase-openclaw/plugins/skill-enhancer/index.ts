import type { OpenClawPluginApi } from 'openclaw/plugin-sdk';

export default function register(api: OpenClawPluginApi) {
  api.on('before_agent_start', async (event, ctx) => {
    const prepend = `## Skill Usage Rules\nBefore responding, you MUST:\n1. List the available Skills you can use for this request.\n2. State the reason for calling each Skill.\n3. NEVER skip reading a Skill and write code directly. Example: "You MUST read the cloudbase-guidelines skill FIRST when working with CloudBase projects."\n\n---\n\n`;

    // Prepend the instruction to the user prompt
    return { prependContext: prepend };
  });
}
