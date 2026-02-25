When working with CloudBase projects, the agent MUST:

1. **Read skills first** - Before writing any code, read the relevant CloudBase skills:
   - `cloudbase-guidelines` - Essential development guidelines
   - `web-development` - For web apps with static hosting
   - `miniprogram-development` - For WeChat mini programs
   - `cloud-functions` - For cloud function development
   - `auth-web-cloudbase` - For web authentication
   - `cloudbase-document-database-web-sdk` - For document database operations

2. **Use MCP, not CLI** - All CloudBase operations must go through CloudBase MCP tools:
   - Environment queries via MCP
   - Database configuration via MCP
   - Cloud function deployment via MCP
   - Do NOT use the CloudBase CLI (it requires interactive login)

3. **Prefer SDK + security rules** - If the requirement can be satisfied with the document database SDK and security rules alone, do NOT introduce cloud functions.

4. The workspace includes a **CloudBase + React template** (`app/` directory) that you can copy as a starting point for new projects.



5. **Deploy to subdirectory (mandatory)** - When deploying web apps to static hosting, you MUST use a subdirectory path (e.g., `/my-app/`), not the root, unless the user explicitly asks otherwise.

6. **Auto-deploy web apps** - After completing a web application, automatically deploy it to CloudBase static hosting using MCP tools.