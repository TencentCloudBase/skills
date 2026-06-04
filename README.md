# CloudBase AI Agent Skills

This repository contains agent skills for CloudBase development, extracted from the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit).

## Source

These skills are sourced from: `config/source/skills/` in the CloudBase AI ToolKit repository.

**Repository**: [TencentCloudBase/CloudBase-AI-ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit)

**Last Updated**: 2026-06-04

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

This repository contains 26 skills:

- **ai-model-nodejs** (ai-model-nodejs)
  "Use this skill for Node.js backend AI via @cloudbase/node-sdk (>=3.16.0) — cloud functions, CloudRun, Express, Koa, NestJS, serverless APIs, scheduled jobs, LLM proxies. Only SDK supporting image generation (ai.createImageModel + generateImage). Text models via ai.createModel with groups cloudbase, hunyuan-exp, or custom-*. Model IDs (deepseek-v4-flash, deepseek-v3.2, hunyuan-2.0-instruct-20251111, glm-5, kimi-k2.6) go in the model field of generateText/streamText. MUST run two-step preflight before code — see body. Keywords: backend, 云函数, 云托管, serverless, LLM proxy, agent orchestration, generateText, streamText, generateImage, createModel, hunyuan-image, Token Credits, TokenHub, Hunyuan, DeepSeek, GLM, Kimi, MiniMax. NOT for browser/Web (use ai-model-web) or Mini Program (use ai-model-wechat)."

- **ai-model-web** (ai-model-web)
  "Use this skill when a browser/Web app (React, Vue, Angular, Next, Nuxt, static sites, SPAs, dashboards, AI chat UI) needs AI models via @cloudbase/js-sdk. Default routing for page/页面/Web/前端/frontend/网页/H5 AI — call directly from browser, do NOT propose a Node.js proxy. Covers generateText and streamText. Models via ai.createModel with groups cloudbase, hunyuan-exp, or custom-*. Model IDs (deepseek-v4-flash, deepseek-v3.2, hunyuan-2.0-instruct-20251111, glm-5, kimi-k2.6) go in the model field. MUST run two-step preflight before code — see body. Keywords: 页面, Web, 前端, React, Vue, Next, Nuxt, SPA, AI chat UI, generateText, streamText, createModel, hunyuan-exp, Token Credits, TokenHub, Hunyuan, DeepSeek, GLM, Kimi, MiniMax. NOT for Node.js backend (use ai-model-nodejs), Mini Program (use ai-model-wechat), or image generation (Node SDK only)."

- **ai-model-wechat** (ai-model-wechat)
  "Use this skill for WeChat Mini Program AI via wx.cloud.extend.AI (小程序, 企业微信小程序, wx.cloud apps). Features generateText and streamText with callbacks (onText, onEvent, onFinish). Models via wx.cloud.extend.AI.createModel with groups hunyuan-exp (小程序成长计划), cloudbase (main managed), or custom-*. Model IDs (deepseek-v4-flash, deepseek-v3.2, hunyuan-2.0-instruct-20251111, glm-5, kimi-k2.6) go in the data wrapper model field. API differs from JS/Node SDK — streamText needs data wrapper, generateText returns raw response. MUST run two-step preflight before code — see body. Keywords: Mini Program AI, wx.cloud.extend.AI, 小程序成长计划, ai_miniprogram_inspire_plan, Token Credits 资源包, generateText, streamText, createModel, hunyuan-exp, TokenHub, Hunyuan, DeepSeek, GLM, Kimi, MiniMax. NOT for browser/Web (use ai-model-web), Node.js backend (use ai-model-nodejs), or image generation (use ai-model-nodejs)."

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

- **cloudbase-wechat-integration** (cloudbase-wechat-integration)
  CloudBase WeChat integration guide for Mini Program WeChat Pay, Official Account JSAPI Pay, Native QR-code Pay, Official Account OAuth, openid handling, payment callbacks, and CloudBase Integration Center generated functions. This skill should be used when users ask to add, debug, or extend WeChat payment or official-account flows on CloudBase.

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
  "Use this skill when you develop, design, build, deploy, debug, migrate, or troubleshoot CloudBase (腾讯云开发, 云开发, TCB, 微信云开发) projects. Covers Web apps (React, Vue, Vite, Next, Nuxt, 网站, dashboards, 管理后台), 微信小程序, 小程序, uni-app, native/mobile (iOS, Android, Flutter, React Native) via HTTP API. Includes UI (页面, 界面, 登录页, 表单, form, dashboard, 仪表盘, prototype, 原型), auth (登录, 注册, OAuth, 微信登录, publishable key), databases (NoSQL 文档数据库, MySQL 关系型数据库, CRUD, security rules), 云函数 (serverless, scf_bootstrap, HTTP Functions), CloudRun (云托管, Dockerfile), 云存储 (file upload, hosting, 静态托管). Built-in AI (内置大模型, streaming, 流式输出, image generation, 图片生成, 图像生成, generateText, streamText, createModel, generateImage, TokenHub, Hunyuan, hunyuan-exp, DeepSeek, deepseek, GLM, Kimi, MiniMax, Token Credits 资源包, 小程序成长计划), 第三方大模型, 大模型接入, 大模型调用, LLM API, chatbot, AI 助手, AI agent, 智能体, AG-UI, LangGraph, LangChain. Ops (巡检, 诊断, health check, 日志, troubleshooting, 排查). Spec workflow (需求文档, 技术方案, 架构设计, requirements, tasks.md)."

## Contributing

These skills are maintained in the main [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository. To contribute:

1. Fork the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository
2. Make your changes in `config/source/skills/`
3. Submit a pull request

## License

Same as the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) project.
