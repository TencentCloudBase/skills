# CloudBase AI Agent Skills

This repository contains agent skills for CloudBase development, extracted from the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit).

## Source

These skills are sourced from: `config/source/skills/` in the CloudBase AI ToolKit repository.

**Repository**: [TencentCloudBase/CloudBase-AI-ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit)

**Last Updated**: 2026-09-04

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

To use the `auth-tool-cloudbase` skill:

```bash
# For Claude Desktop
cp -r config/source/skills/auth-tool ~/.config/claude/skills/

# For Cursor
cp -r config/source/skills/auth-tool .cursor/skills/
```

## Available Skills

This repository contains 29 skills:

- **ai-model-nodejs** (ai-model-nodejs)
  "Use this skill for Node.js backend AI via @cloudbase/node-sdk (>=3.16.0) — cloud functions, CloudRun, Express/Koa/NestJS, serverless APIs, scheduled jobs, LLM proxies, agent orchestration. The only SDK supporting image generation (ai.createImageModel + generateImage). Text via ai.createModel with groups cloudbase, hunyuan-exp, or custom-*; model ids (e.g. deepseek-v4-flash, glm-5, kimi-k2.6) go in the `model` field of generateText/streamText. MUST run two-step preflight before code — see body. NOT for browser/Web (use ai-model-web) or Mini Program (use ai-model-wechat)."

- **ai-model-web** (ai-model-web)
  "Use this skill when a browser/Web app (React, Vue, Next, Nuxt, static sites, SPAs, dashboards, AI chat UI, 页面, 前端, 网页) needs AI models via @cloudbase/js-sdk. Default routing for Web/frontend AI — call directly from the browser, do NOT propose a Node.js proxy. Covers generateText and streamText; models via ai.createModel with groups cloudbase, hunyuan-exp, or custom-*, model id in the `model` field. MUST run two-step preflight before code — see body. NOT for Node.js backend (use ai-model-nodejs), Mini Program (use ai-model-wechat), or image generation (Node SDK only)."

- **ai-model-wechat** (ai-model-wechat)
  "Use this skill for WeChat Mini Program AI via wx.cloud.extend.AI (小程序, wx.cloud apps). Covers generateText and streamText with callbacks (onText, onEvent, onFinish); streamText needs a data wrapper, generateText returns the raw response. Models via wx.cloud.extend.AI.createModel with groups hunyuan-exp (小程序成长计划), cloudbase (main managed), or custom-*; model id goes in the data wrapper `model` field. MUST run two-step preflight before code — see body. NOT for browser/Web (use ai-model-web), Node.js backend (use ai-model-nodejs), or image generation (use ai-model-nodejs)."

- **auth-nodejs-cloudbase** (auth-nodejs-cloudbase)
  CloudBase Node SDK auth guide for server-side identity, user lookup, and custom login tickets. This skill should be used when Node.js code must read caller identity, inspect end users, or bridge an existing user system into CloudBase; not when configuring providers or building client login UI.

- **auth-tool-cloudbase** (auth-tool-cloudbase)
  CloudBase auth provider configuration and login-readiness guide. This skill should be used when users need to inspect, enable, disable, or configure auth providers, publishable-key prerequisites, login methods, SMS/email sender setup, or other provider-side readiness before implementing a client or backend auth flow.

- **auth-web-cloudbase** (auth-web-cloudbase)
  CloudBase Web Authentication Quick Guide for frontend integration after auth-tool has already been checked. Provides concise and practical Web authentication solutions with multiple login methods and complete user management.

- **auth-wechat-miniprogram** (auth-wechat-miniprogram)
  CloudBase WeChat Mini Program native authentication guide. This skill should be used when users need mini program identity handling, OPENID/UNIONID access, or `wx.cloud` auth behavior in projects where login is native and automatic.

- **cloud-functions** (cloud-functions)
  CloudBase function runtime guide for building, deploying, and debugging your own Event Functions or HTTP Functions. This skill should be used when users need application runtime code on CloudBase, not when they are merely calling CloudBase official platform APIs.

- **cloud-storage-web** (cloud-storage-web)
  Complete guide for CloudBase cloud storage using Web SDK (@cloudbase/js-sdk) - upload, download, temporary URLs, file management, and best practices.

- **cloudbase-agent** (cloudbase-agent)
  Build and deploy AI agents with CloudBase Agent SDK (TypeScript & Python). Implements the AG-UI protocol for streaming agent-UI communication. Use when deploying agent servers, using LangGraph/LangChain/CrewAI adapters, building custom adapters, understanding AG-UI protocol events, or building web/mini-program UI clients. Supports both TypeScript (@cloudbase/agent-server) and Python (cloudbase-agent-server via FastAPI).

- **cloudbase-cli** (cloudbase-cli)
  CloudBase CLI (tcb, 云开发CLI, Tencent CloudBase命令行) resource management skill. Use when deploying cloud functions, CloudRun, storage, NoSQL/MySQL, static hosting, permissions, CORS/domains via tcb; for CI/CD and batch ops; when the user prefers CLI; or as the first-session fallback when CloudBase MCP tools are not loaded yet (after install/config, before IDE restart). Covers tcb login (device code for Tencent Cloud accounts; --cloudbase-api-key -e for environment API Key without an account; --apiKeyId/--apiKey for CI) and domain commands (fn/hosting/cloudrun/…) as MCP auth/manage parity — do not default to tcb deploy.

- **cloudbase-code-review** (cloudbase-code-review)
  "Code review and validation for CloudBase projects. After writing code for Web / miniprogram / CloudRun / cloud-function projects, call this skill to check for known pitfalls — auth guard misuse, missing database tables, RLS misconfiguration, storage domain setup, and SDK API misuse. Supports automated lint scripts (regex-based) + LLM semantic review."

- **cloudbase-document-database-in-wechat-miniprogram** (cloudbase-document-database-in-wechat-miniprogram)
  Use CloudBase document database WeChat MiniProgram SDK to query, create, update, and delete data. Supports complex queries, pagination, aggregation, and geolocation queries.

- **cloudbase-document-database-web-sdk** (cloudbase-document-database-web-sdk)
  Use CloudBase document database Web SDK only for confirmed NoSQL collection work. Query, create, update, and delete document data; if the task mentions PostgreSQL / CloudBase PG / app.rdb(), route to postgresql-development instead.

- **cloudbase-platform** (cloudbase-platform)
  CloudBase platform overview and routing guide. This skill should be used when users need high-level capability selection, platform concepts, console navigation, or cross-platform best practices before choosing a more specific implementation skill.

- **cloudbase-wechat-integration** (cloudbase-wechat-integration)
  CloudBase WeChat integration guide for Mini Program WeChat Pay, Mini Program virtual payment (虚拟支付, wx.requestVirtualPayment), Official Account JSAPI Pay, Native QR-code Pay, Official Account OAuth, openid handling, payment callbacks, and CloudBase Integration Center generated functions. This skill should be used when users ask to add, debug, or extend WeChat payment, virtual payment, or official-account flows on CloudBase.

- **cloudrun-development** (cloudrun-development)
  CloudBase Run backend development rules (Function mode/Container mode). Use this skill when deploying backend services that require long connections, multi-language support, custom environments, AI agent development, or migrating existing/GitHub apps that need VPC access to MySQL/PostgreSQL/Redis. Also use when diagnosing CloudRun container deploy failures (deploy_failed, readiness/probe failed, image won't start, docker.io pull loops). For stateless HTTP services, prefer HTTP cloud functions.

- **data-model-creation** (data-model-creation)
  "[Deprecated] Optional advanced tool for complex data modeling. For simple MySQL table creation, use relational-database-tool directly; for PostgreSQL / CloudBase PG schema work, use postgresql-development. New environments should use PostgreSQL DDL via queryPgDatabase/managePgDatabase — see postgresql-development skill instead."

- **http-api-cloudbase** (http-api-cloudbase)
  CloudBase official HTTP API client guide. This skill should be used when backends, scripts, or non-SDK clients must call CloudBase platform APIs over raw HTTP instead of using a platform SDK or MCP management tool.

- **minimal-web-baas-demo** (minimal-web-baas-demo)
  "Fast path for a minimal CloudBase Web + database demo (最小前后端 / 最小可用 fullstack / Lovable-like BaaS). Defaults to @cloudbase/js-sdk client CRUD (NoSQL app.database / PG app.rdb), MCP-only schema, preview-first, and forbids cloud functions unless secrets, cron/background jobs, or logic that security rules/RLS cannot express. Use for 搭一套 demo、留言板、Todo、Notes、Kanban, or when users say 带云函数+云数据库 but only need CRUD. NOT for production multi-service backends, CloudRun, WeChat Mini Programs, or tasks that truly need server secrets."

- **miniprogram-development** (miniprogram-development)
  WeChat Mini Program development skill for building, debugging, previewing, testing, publishing, and optimizing mini program projects (小程序开发、调试、预览、发布). Covers project structure and config (`project.config.json`, `appid`, `miniprogramRoot`, `tabBar`, routing/navigation, icon assets), WeChat Developer Tools Nightly workflows (`wechatide` CLI, WeChat IDE Skills/MCP), `miniprogram-ci` preview/upload, console/network debugging, message push (消息推送) and customer-service auto-reply (客服消息), mini program SEO / search indexing (小程序搜索优化、页面收录、搜索推广、mpcrawler), and CloudBase integration (`wx.cloud`, 腾讯云开发, 云开发) when explicitly used. Use when users create, develop, modify, debug, preview, deploy, publish, or promote WeChat Mini Programs. NOT for Web frontend (use web-development), pure backend services (use cloudrun-development / cloud-functions), or UI-design-only tasks (use ui-design).

- **ops-inspector** (ops-inspector)
  AIOps-style CloudBase inspection skill (v3). Use when users need health checks, log diagnosis, alarm interpretation (CPU alert normal?, peak QPS), metrics via queryEnv(action=metrics), or fault playbooks for 429 / function 404 / ACCESS_TOKEN_INVALID / zero invocations. Triggers on 巡检, 诊断, 告警, 峰值 QPS, 限频, 调用量为 0, troubleshooting.

- **postgresql-development-cloudbase** (postgresql-development-cloudbase)
  "Use when building, debugging, or evaluating CloudBase PostgreSQL / CloudBase PG / PG mode apps, including Postgres schema setup, queryPgDatabase/managePgDatabase, JS SDK v3 app.rdb() CRUD/RPC, PG HTTP API fallback, RLS-style permissions, username-password auth, and Web CMS/admin CRUD flows backed by CloudBase PG."

- **relational-database-mcp-cloudbase** (relational-database-mcp-cloudbase)
  "[Deprecated] This is the required documentation for agents operating on the CloudBase Relational Database through MCP. It defines the canonical SQL management flow with `queryMysqlDatabase`, `manageMysqlDatabase`, `queryPermissions`, and `managePermissions`, including MySQL provisioning, destroy flow, async status checks, safe query execution, schema initialization, and permission updates. New environments should use PostgreSQL — see postgresql-development skill instead."

- **relational-database-web-cloudbase** (relational-database-web-cloudbase)
  "[Deprecated] Use when building frontend Web apps that talk to CloudBase Relational Database via @cloudbase/js-sdk – provides the canonical init pattern so you can then use Supabase-style queries from the browser. New environments should use PostgreSQL with app.rdb() — see postgresql-development skill instead."

- **spec-workflow** (spec-workflow)
  Use when medium-to-large changes need explicit requirements, technical design, and task planning before implementation, especially for multi-module work, unclear acceptance criteria, or architecture-heavy requests.

- **ui-design** (ui-design)
  Use when users need visual direction, interface hierarchy, layout decisions, design specifications, or prototypes before implementing a Web or mini program UI.

- **web-development** (web-development)
  Use when users need to implement, integrate, debug, build, deploy, or validate a Web frontend after the product direction is already clear, especially for React, Vue, Vite, browser flows, or CloudBase Web integration.

- **cloudbase** (cloudbase)
  "Use this skill when you develop, design, build, deploy, debug, migrate, or troubleshoot CloudBase (腾讯云开发, 云开发, TCB, 微信云开发) projects — Web, 微信小程序, 小程序, uni-app, mobile (iOS, Android, Flutter, React Native). Covers UI (页面, 界面, 表单, dashboard, prototype, 原型); auth (登录, 注册, OAuth, publishable key); databases (NoSQL 文档数据库, MySQL 关系型数据库, PostgreSQL/CloudBase PG, app.rdb(), queryPgDatabase/managePgDatabase, CRUD, security rules); 云函数/cloud functions (serverless, scf_bootstrap); CloudRun (云托管, Dockerfile); 云存储; built-in AI (内置大模型, AI 对话, streaming, 流式输出, 图片生成, generateText, streamText, createModel, generateImage, TokenHub, Hunyuan, DeepSeek, GLM, Kimi, Token Credits 资源包, 小程序成长计划); third-party/custom model onboarding (第三方大模型接入, 大模型调用, LLM API); AI agent (智能体, AG-UI, LangGraph); ops troubleshooting (巡检, 诊断, 日志); spec workflow (需求文档, 技术方案, requirements, tasks.md). Do NOT use for non-CloudBase projects, pure frontend without CloudBase, or self-hosted backends without CloudBase."

## Contributing

These skills are maintained in the main [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository. To contribute:

1. Fork the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository
2. Make your changes in `config/source/skills/`
3. Submit a pull request

## License

Same as the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) project.
