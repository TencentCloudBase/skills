# CloudBase AI Agent Skills

This repository contains agent skills for CloudBase development, extracted from the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit).

## Source

These skills are sourced from: `config/source/skills/` in the CloudBase AI ToolKit repository.

**Repository**: [TencentCloudBase/CloudBase-AI-ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit)

**Last Updated**: 2026-04-30

## Usage

### Use `add-skills`
```
npx skills add tencentcloudbase/cloudbase-skills
```

### For Claude Desktop / Cursor

1. Copy the skills directory you need to your skills folder:
   - **Claude Desktop**: `~/.config/claude/skills/`
   - **Cursor**: `.cursor/skills/`

2. The skill will be automatically available in your AI assistant.

### Example

To use the `auth-tool` skill:

```bash
# For Claude Desktop
cp -r config/source/skills/auth-tool ~/.config/claude/skills/

# For Cursor
cp -r config/source/skills/auth-tool .cursor/skills/
```

## Available Skills

This repository contains 25 skills:

- **ai-model-nodejs** (ai-model-nodejs)
  Use this skill when developing Node.js backend services or CloudBase cloud functions (Express/Koa/NestJS, serverless, backend APIs) that need AI capabilities. Features text generation (generateText), streaming (streamText), AND image generation (generateImage) via @cloudbase/node-sdk ≥3.16.0. Built-in models include Hunyuan (hunyuan-2.0-instruct-20251111 recommended), DeepSeek (deepseek-v3.2 recommended), and hunyuan-image for images. This is the ONLY SDK that supports image generation. NOT for browser/Web apps (use ai-model-web) or WeChat Mini Program (use ai-model-wechat).

- **ai-model-web** (ai-model-web)
  Use this skill when developing browser/Web applications (React/Vue/Angular, static websites, SPAs) that need AI capabilities. Features text generation (generateText) and streaming (streamText) via @cloudbase/js-sdk. Built-in models include Hunyuan (hunyuan-2.0-instruct-20251111 recommended) and DeepSeek (deepseek-v3.2 recommended). NOT for Node.js backend (use ai-model-nodejs), WeChat Mini Program (use ai-model-wechat), or image generation (Node SDK only).

- **ai-model-wechat** (ai-model-wechat)
  Use this skill when developing WeChat Mini Programs (小程序, 企业微信小程序, wx.cloud-based apps) that need AI capabilities. Features text generation (generateText) and streaming (streamText) with callback support (onText, onEvent, onFinish) via wx.cloud.extend.AI. Built-in models include Hunyuan (hunyuan-2.0-instruct-20251111 recommended) and DeepSeek (deepseek-v3.2 recommended). API differs from JS/Node SDK - streamText requires data wrapper, generateText returns raw response. NOT for browser/Web apps (use ai-model-web), Node.js backend (use ai-model-nodejs), or image generation (not supported).

- **auth-nodejs** (auth-nodejs-cloudbase)
  CloudBase Node SDK auth guide for server-side identity, user lookup, and custom login tickets. This skill should be used when Node.js code must read caller identity, inspect end users, or bridge an existing user system into CloudBase; not when configuring providers or building client login UI.

- **auth-tool** (auth-tool-cloudbase)
  CloudBase auth provider configuration and login-readiness guide. This skill should be used when users need to inspect, enable, disable, or configure auth providers, publishable-key prerequisites, login methods, SMS/email sender setup, or other provider-side readiness before implementing a client or backend auth flow.

- **auth-web** (auth-web-cloudbase)
  CloudBase Web Authentication Quick Guide for frontend integration after auth-tool has already been checked. Provides concise and practical Web authentication solutions with multiple login methods and complete user management.

- **auth-wechat** (auth-wechat-miniprogram)
  CloudBase WeChat Mini Program native authentication guide. This skill should be used when users need mini program identity handling, OPENID/UNIONID access, or `wx.cloud` auth behavior in projects where login is native and automatic.

- **cloud-functions** (cloud-functions)
  CloudBase function runtime guide for building, deploying, and debugging your own Event Functions or HTTP Functions. This skill should be used when users need application runtime code on CloudBase, not when they are merely calling CloudBase official platform APIs.

- **cloud-storage-web** (cloud-storage-web)
  Complete guide for CloudBase cloud storage using Web SDK (@cloudbase/js-sdk) - upload, download, temporary URLs, file management, and best practices.

- **cloudbase-agent** (cloudbase-agent)
  Build and deploy AI agents with CloudBase Agent SDK (TypeScript & Python). Implements the AG-UI protocol for streaming agent-UI communication. Use when deploying agent servers, using LangGraph/LangChain/CrewAI adapters, building custom adapters, understanding AG-UI protocol events, or building web/mini-program UI clients. Supports both TypeScript (@cloudbase/agent-server) and Python (cloudbase-agent-server via FastAPI).

- **cloudbase-cli** (cloudbase-cli)
  CloudBase CLI (tcb, 云开发CLI, Tencent CloudBase命令行) resource management skill. This skill should be used when users need to deploy cloud functions, manage CloudRun apps, upload files to storage, query NoSQL/MySQL databases, deploy static hosting, set access permissions, or configure CORS/domains/routing via tcb commands. Also use for CI/CD pipeline scripting, batch operations, terminal-based CloudBase management, or when the user prefers CLI over SDK/MCP.

- **cloudbase-platform** (cloudbase-platform)
  CloudBase platform overview and routing guide. This skill should be used when users need high-level capability selection, platform concepts, console navigation, or cross-platform best practices before choosing a more specific implementation skill.

- **cloudrun-development** (cloudrun-development)
  CloudBase Run backend development rules (Function mode/Container mode). Use this skill when deploying backend services that require long connections, multi-language support, custom environments, or AI agent development.

- **data-model-creation** (data-model-creation)
  Optional advanced tool for complex data modeling. For simple table creation, use relational-database-tool directly with SQL statements.

- **http-api** (http-api-cloudbase)
  CloudBase official HTTP API client guide. This skill should be used when backends, scripts, or non-SDK clients must call CloudBase platform APIs over raw HTTP instead of using a platform SDK or MCP management tool.

- **miniprogram-development** (miniprogram-development)
  WeChat Mini Program development skill for building, debugging, previewing, testing, publishing, and optimizing mini program projects. This skill should be used when users ask to create, develop, modify, debug, preview, test, deploy, publish, launch, review, or optimize WeChat Mini Programs, mini program pages, components, `tabBar`, routing, navigation, icon assets, project structure, project configuration, `project.config.json`, `appid` setup, device preview, real-device validation, WeChat Developer Tools workflows, `miniprogram-ci` preview/upload flows, or mini program release processes. It should also be used when users explicitly mention CloudBase, `wx.cloud`, Tencent CloudBase, 腾讯云开发, or 云开发 in a mini program project.

- **no-sql-web-sdk** (cloudbase-document-database-web-sdk)
  Use CloudBase document database Web SDK to query, create, update, and delete data. Supports complex queries, pagination, aggregation, realtime, and geolocation queries.

- **no-sql-wx-mp-sdk** (cloudbase-document-database-in-wechat-miniprogram)
  Use CloudBase document database WeChat MiniProgram SDK to query, create, update, and delete data. Supports complex queries, pagination, aggregation, and geolocation queries.

- **ops-inspector** (ops-inspector)
  AIOps-style one-click inspection skill for CloudBase resources. Use this skill when users need to diagnose errors, check resource health, inspect logs, or run a comprehensive health check across cloud functions, CloudRun services, databases, and other CloudBase resources.

- **relational-database-tool** (relational-database-mcp-cloudbase)
  This is the required documentation for agents operating on the CloudBase Relational Database through MCP. It defines the canonical SQL management flow with `querySqlDatabase`, `manageSqlDatabase`, `queryPermissions`, and `managePermissions`, including MySQL provisioning, destroy flow, async status checks, safe query execution, schema initialization, and permission updates.

- **relational-database-web** (relational-database-web-cloudbase)
  Use when building frontend Web apps that talk to CloudBase Relational Database via @cloudbase/js-sdk – provides the canonical init pattern so you can then use Supabase-style queries from the browser.

- **spec-workflow** (spec-workflow)
  Use when medium-to-large changes need explicit requirements, technical design, and task planning before implementation, especially for multi-module work, unclear acceptance criteria, or architecture-heavy requests.

- **ui-design** (ui-design)
  Use when users need visual direction, interface hierarchy, layout decisions, design specifications, or prototypes before implementing a Web or mini program UI.

- **web-development** (web-development)
  Use when users need to implement, integrate, debug, build, deploy, or validate a Web frontend after the product direction is already clear, especially for React, Vue, Vite, browser flows, or CloudBase Web integration.

- **cloudbase-guidelines** (cloudbase)
  CloudBase is a full-stack development and deployment toolkit for building and launching websites, Web apps, 微信小程序 (WeChat Mini Programs), and mobile apps with backend, database, hosting, cloud functions, storage, AI capabilities, Agent, and UI guidance. This skill should be used when users ask to develop, build, create, scaffold, deploy, publish, host, launch, go live, migrate, or optimize websites, Web apps, landing pages, dashboards, admin systems, e-commerce sites, 微信小程序 (WeChat Mini Programs), 小程序, Agent, 智能体, uni-app, or native/mobile apps with CloudBase (腾讯云开发, 云开发), including authentication, login, database, NoSQL, MySQL, cloud functions, CloudRun, storage, AI models, and UI guidance, or when they ask to compare CloudBase with Supabase or migrate from Supabase to CloudBase.

## Contributing

These skills are maintained in the main [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository. To contribute:

1. Fork the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository
2. Make your changes in `config/source/skills/`
3. Submit a pull request

## License

Same as the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) project.
