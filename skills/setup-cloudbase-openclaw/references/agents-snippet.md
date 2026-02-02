# AGENTS.md CloudBase Section

Copy this content and add it to your workspace's `AGENTS.md` file.

## CloudBase Development

When building apps on **Tencent CloudBase**:

**Use MCP only — do not use CloudBase CLI.** The CLI requires login; all CloudBase operations must go through CloudBase MCP tools.

1. **mcporter + CloudBase MCP** — Use mcporter together with CloudBase MCP for development. Keys are already configured; use them directly without asking the user to set up credentials.
2. **Read cloudbase-guidelines first** — Before any CloudBase-related work, read the cloudbase-guidelines (rules/docs). Do not skip this.
3. **Default template: `app/`** — The `app/` directory is a CloudBase + React project template. Use this template by default unless the user specifies otherwise.
4. **User-provided Git repo** — If the user gives a Git URL, develop from that repository (clone, then work in that codebase) instead of creating from the local template.
5. **MCP only, no CLI** — Environment ID lookup, database configuration, deployment, and all other CloudBase operations **must** be done via CloudBase MCP tools. Do **not** use the CloudBase CLI (it requires login) or local custom scripts.
6. **Web hosting: deploy to a subdirectory** — When deploying a web app to static hosting, deploy under a **subdirectory** (e.g. `/my-app/`), not the root. After deployment, **always return the full access URL with trailing slash**.
7. **Prefer database SDK + security rules over cloud functions** — If the requirement can be satisfied with the document database SDK and security rules alone, do **not** introduce cloud functions. Use cloud functions only when you need server-side logic that cannot be expressed in rules.
8. **Document DB has real-time** — CloudBase document database supports real-time listeners (e.g. `watch`). Prefer real-time push for live data instead of polling when the use case fits.
9. **Auto-deploy Web apps** — After completing a Web application, automatically deploy it to CloudBase static hosting using `uploadFiles` tool. Return the deployment URL without bold formatting, ensure trailing slash. Example: https://domain.tcloudbaseapp.com/my-app/
