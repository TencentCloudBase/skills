# CloudBase AI Agent Skills

This repository contains agent skills for CloudBase development, extracted from the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit).

## Source

These skills are sourced from: `config/source/skills/` in the CloudBase AI ToolKit repository.

**Repository**: [TencentCloudBase/CloudBase-AI-ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit)

**Last Updated**: 2026-05-09

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
  Use this skill when developing Node.js backend services, CloudBase cloud functions, or CloudRun services (Express / Koa / NestJS, serverless, backend APIs, scheduled jobs, LLM proxies) that need AI capabilities through `@cloudbase/node-sdk` (>= 3.16.0). Also use it for any AI **image generation** — the Node SDK is the only one that supports `ai.createImageModel("hunyuan-image")` + `generateImage`. **Routing note:** for Web/page-facing AI chat UIs, prefer `ai-model-web` instead of wrapping this SDK behind a backend proxy; use the Node SDK when the call truly belongs on the server (private keys, long-running agent jobs, orchestration, image generation). Text models are invoked via `ai.createModel("<GroupName>")` where the only legal GroupName values are `"cloudbase"` (the main managed group; **no model is enabled by default** — always check `DescribeAIModels` first, then `DescribeManagedAIModelList` for the authoritative supported-model catalog, then `UpdateAIModel` with `Status: 1` to enable the target model), `"hunyuan-exp"` (legacy builtin group, only if `DescribeAIModels` returns it), or a user-defined GroupName created via `CreateAIModel` (must start with `custom-`). The concrete model id (`deepseek-v4-flash`, `deepseek-v3.2`, `hunyuan-2.0-instruct-20251111`, `glm-5`, `kimi-k2.6`, …) goes into the **`model` field** of `generateText` / `streamText`. Image generation uses `ai.createImageModel("hunyuan-image")`. Before emitting any SDK code the agent MUST run the two-step preflight: (1) eligibility — call `DescribeEnvPostpayPackage` to confirm a Token Credits resource pack is active (text and image share the same pack); (2) group readiness — `DescribeAIModels` → `DescribeManagedAIModelList` → `UpdateAIModel` to enable the target model. **Never assume a model is already enabled**, and never invent SDK method names — this skill is the authoritative reference for `@cloudbase/node-sdk` AI methods; look them up here, do not guess. Non-managed / self-hosted OpenAI-compatible models must be onboarded through `CreateAIModel` as a custom group. Keywords: backend, server-side, 云函数, 云托管, serverless, Express, Koa, NestJS, LLM proxy, agent orchestration, call large language model, AI model, generateText, streamText, generateImage, createModel, cloudbase group, hunyuan-exp, hunyuan-image, eligibility check, group readiness, Token Credits resource pack, deepseek-v4-flash, UpdateAIModel, DescribeAIModels, DescribeManagedAIModelList, CreateAIModel, custom model onboarding, callCloudApi, DescribeEnvPostpayPackage, TokenHub, Hunyuan, DeepSeek, GLM, Zhipu GLM, Kimi, MiniMax, third-party managed model. Do NOT use for browser/Web apps (use `ai-model-web`) or WeChat Mini Program (use `ai-model-wechat`).

- **ai-model-web** (ai-model-web)
  Use this skill whenever a browser/Web application (React/Vue/Angular, Next/Nuxt, static sites, SPAs, admin dashboards, AI chat UI on the page) needs to call an AI model. **This is the default routing target for any AI request framed around a page / 页面 / Web / 前端 / frontend / 网页 / H5 — do NOT first propose a Node.js / cloud-function / CloudRun proxy; call the model directly from the browser via `@cloudbase/js-sdk`.** Covers text generation (`generateText`) and streaming (`streamText`). Managed models are invoked via `ai.createModel("<GroupName>")` — the only legal GroupName values are `"cloudbase"` (the main managed, TokenHub-backed pool; **no model is enabled by default** — the agent MUST first call `DescribeAIModels` to see what is already enabled and, if the target model is missing, call `DescribeManagedAIModelList` to read the platform-supported catalog, then `UpdateAIModel` with `Status: 1` to enable it), `"hunyuan-exp"` (legacy builtin group, only if `DescribeAIModels` returns it — mainly Mini Program Growth Plan), or a user-defined GroupName created through `CreateAIModel` (must start with `custom-`). The concrete model id (`deepseek-v4-flash`, `deepseek-v3.2`, `hunyuan-2.0-instruct-20251111`, `glm-5`, `kimi-k2.6`, …) goes into the **`model` field** of `generateText` / `streamText`, never into `createModel(...)`. Before emitting any SDK code the agent MUST run the two-step preflight: (1) eligibility — call `DescribeEnvPostpayPackage` to confirm a Token Credits resource pack is active; (2) group readiness — `DescribeAIModels` → `DescribeManagedAIModelList` → `UpdateAIModel` to enable the target model. **Never assume a model is already enabled** and never invent SDK method names — this skill is the authoritative reference for `@cloudbase/js-sdk` AI methods; look them up here, do not guess. Non-managed or self-hosted OpenAI-compatible models must be onboarded through `CreateAIModel` as a custom group. Keywords: 页面, Web, 前端, frontend, React, Vue, Next, Nuxt, SPA, admin dashboard, AI chat UI, call large language model, AI model, generateText, streamText, createModel, cloudbase group, hunyuan-exp, eligibility check, group readiness, Token Credits resource pack, deepseek-v4-flash, UpdateAIModel, DescribeAIModels, DescribeManagedAIModelList, CreateAIModel, custom model onboarding, callCloudApi, DescribeEnvPostpayPackage, TokenHub, Hunyuan, DeepSeek, GLM, Zhipu GLM, Kimi, MiniMax, third-party managed model. Do NOT use for Node.js backend work (use `ai-model-nodejs`), WeChat Mini Program (use `ai-model-wechat`), or image generation (Node SDK only).

- **ai-model-wechat** (ai-model-wechat)
  Use this skill when developing WeChat Mini Programs (小程序, 企业微信小程序, wx.cloud-based apps) that need AI capabilities. Features text generation (generateText) and streaming (streamText) with callback support (onText, onEvent, onFinish) via wx.cloud.extend.AI. Managed AI models are called via wx.cloud.extend.AI.createModel("<GroupName>") — the only legal GroupName values are "hunyuan-exp" (小程序成长计划 exclusive builtin group; `hunyuan-2.0-instruct-20251111` is the plan-default, other hunyuan SKUs must still be verified via DescribeAIModels and enabled via UpdateAIModel if missing), "cloudbase" (main managed group used when 成长计划 is not enrolled; **no model is enabled by default** — the agent MUST first call DescribeAIModels to see what is enabled and, if the target model is missing, call DescribeManagedAIModelList for the authoritative supported-model catalog and then UpdateAIModel with Status:1 to enable it), or a user-defined GroupName created via CreateAIModel (must start with `custom-`). The concrete model id (`deepseek-v4-flash`, `deepseek-v3.2`, `hunyuan-2.0-instruct-20251111`, `glm-5`, `kimi-k2.6`, …) goes into the `model` field of the generateText / streamText `data` wrapper, never into `createModel(...)`. Before generating any code you MUST run the two-step preflight — eligibility (first DescribeActivityInfo for 小程序成长计划 ai_miniprogram_inspire_plan; enrolled users go hunyuan-exp billed via pkg_hunyuan_token_la_inspire_100m; else DescribeEnvPostpayPackage for Token Credits → "cloudbase") and group readiness (DescribeAIModels for env config, DescribeManagedAIModelList for the authoritative supported-model catalog + pricing, UpdateAIModel with Status:1 to enable the target model). **Never assume a model is already enabled**, and never invent SDK method names — this skill is the authoritative reference for `wx.cloud.extend.AI`; look them up here, do not guess. Non-managed / self-hosted OpenAI-compatible models go through CreateAIModel custom-group integration. API differs from JS/Node SDK — streamText requires data wrapper, generateText returns raw response; image generation is NOT available here. Keywords: Mini Program AI, wx.cloud.extend.AI, generateText, streamText, createModel, cloudbase group, hunyuan-exp, eligibility check, group readiness, 小程序成长计划, ai_miniprogram_inspire_plan, hunyuan-2.0-instruct-20251111, Token Credits 资源包, deepseek-v4-flash, UpdateAIModel, DescribeAIModels, DescribeManagedAIModelList, CreateAIModel, custom model onboarding, callCloudApi, DescribeActivityInfo, DescribeEnvPostpayPackage, TokenHub, Hunyuan, DeepSeek, GLM, Zhipu GLM, Kimi, MiniMax, third-party managed model. NOT for browser/Web apps (use ai-model-web), Node.js backend (use ai-model-nodejs), or image generation (use ai-model-nodejs).

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
  Use this skill whenever users ask to develop, design, build, deploy, debug, migrate, or troubleshoot anything on CloudBase (腾讯云开发 / 云开发 / TCB / 微信云开发) — across (a) full-stack Web apps, 网站, landing pages, dashboards, admin systems, 管理后台, e-commerce sites, React / Vue / Vite / Next / Nuxt projects; (b) 微信小程序 / 小程序 / WeChat Mini Programs and uni-app; (c) native / mobile / 移动端 / iOS / Android / Flutter / React Native apps via HTTP API; (d) UI / UX / 页面 / 界面 / 登录页 / 注册页 / 表单 / 仪表盘 / login page / signup page / form / dashboard / screen / prototype / mockup / 原型 / 高保真 / visual design specs before writing interface code; (e) authentication — 登录 / 注册 / signin / signup / OAuth / SSO / SMS / 短信验证码 / email / 微信登录 / anonymous login / publishable key / provider configuration; (f) databases — NoSQL 文档数据库, MySQL 关系型数据库, CRUD, 查询, pagination, security rules, data modeling; (g) cloud functions / 云函数 / serverless API / 接口 / HTTP Functions / Event Functions / scf_bootstrap / SCF; (h) CloudRun / 云托管 / container backend / Dockerfile / long-running services; (i) 云存储 / cloud storage / object storage / 文件上传 / file upload / hosting / 静态托管; (j) built-in AI models, 内置大模型, AI 能力, AI 对话, streaming, 流式输出, image generation, 图片生成, 图像生成, TokenHub 托管模型池, Hunyuan, hunyuan-exp, DeepSeek, deepseek-v4-flash, Zhipu GLM, Kimi, MiniMax via @cloudbase/js-sdk / @cloudbase/node-sdk / wx.cloud.extend.AI — generateText, streamText, createModel, generateImage, managed AI model groups, Token Credits 资源包, 小程序成长计划, ai_miniprogram_inspire_plan, 资源包购买, pre-flight eligibility check via envQuery / callCloudApi (DescribeActivityInfo, DescribeEnvPostpayPackage, DescribeAIModels, DescribeManagedAIModelList, UpdateAIModel, CreateAIModel); (k) integrating third-party LLMs / 第三方大模型 / 大模型接入 / 大模型调用 / 接入外部大模型 / LLM API — chatbot, AI 助手, AI agent backends, API key 管理, streaming responses, tool calling; (l) AI Agent / 智能体 / 智能体开发 / AG-UI protocol / LangGraph / LangChain / CrewAI / streaming agent UI; (m) CloudBase CLI (tcb) operations, CI/CD deploys, 批量部署; (n) ops — 巡检 / 诊断 / health check / 日志排查 / error inspection / troubleshooting / 故障排查 / CLS 日志; (o) spec workflow / 需求文档 / 技术方案 / 架构设计 / requirements / design doc / tasks.md; (p) comparing CloudBase with Supabase or 从 Supabase 迁移到 CloudBase. Covers backend, database, hosting, cloud functions, CloudRun, storage, AI, Agent, UI design, and ops inspection in one bundled skill with reference sub-skills.

## Contributing

These skills are maintained in the main [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository. To contribute:

1. Fork the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository
2. Make your changes in `config/source/skills/`
3. Submit a pull request

## License

Same as the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) project.
