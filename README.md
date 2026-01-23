# CloudBase AI Agent Skills

This repository contains agent skills for CloudBase development, extracted from the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit).

## Source

These skills are sourced from: `config/.claude/skills/` in the CloudBase AI ToolKit repository.

**Repository**: [TencentCloudBase/CloudBase-AI-ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit)

**Last Updated**: 2026-01-23

## Usage

### Use `add-skills`
```
npx skills add tencentcloudbase/skills
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
cp -r skills/auth-tool ~/.config/claude/skills/

# For Cursor
cp -r skills/auth-tool .cursor/skills/
```

## Available Skills

This repository contains 22 skills:

- **ai-model-nodejs** (ai-model-nodejs)
  Use this skill when developing Node.js backend services or CloudBase cloud functions (Express/Koa/NestJS, serverless, backend APIs) that need AI capabilities. Features text generation (generateText), streaming (streamText), AND image generation (generateImage) via @cloudbase/node-sdk ≥3.16.0. Built-in models include Hunyuan (hunyuan-2.0-instruct-20251111 recommended), DeepSeek (deepseek-v3.2 recommended), and hunyuan-image for images. This is the ONLY SDK that supports image generation. NOT for browser/Web apps (use ai-model-web) or WeChat Mini Program (use ai-model-wechat).

- **ai-model-web** (ai-model-web)
  Use this skill when developing browser/Web applications (React/Vue/Angular, static websites, SPAs) that need AI capabilities. Features text generation (generateText) and streaming (streamText) via @cloudbase/js-sdk. Built-in models include Hunyuan (hunyuan-2.0-instruct-20251111 recommended) and DeepSeek (deepseek-v3.2 recommended). NOT for Node.js backend (use ai-model-nodejs), WeChat Mini Program (use ai-model-wechat), or image generation (Node SDK only).

- **ai-model-wechat** (ai-model-wechat)
  Use this skill when developing WeChat Mini Programs (小程序, 企业微信小程序, wx.cloud-based apps) that need AI capabilities. Features text generation (generateText) and streaming (streamText) with callback support (onText, onEvent, onFinish) via wx.cloud.extend.AI. Built-in models include Hunyuan (hunyuan-2.0-instruct-20251111 recommended) and DeepSeek (deepseek-v3.2 recommended). API differs from JS/Node SDK - streamText requires data wrapper, generateText returns raw response. NOT for browser/Web apps (use ai-model-web), Node.js backend (use ai-model-nodejs), or image generation (not supported).

- **auth-nodejs** (auth-nodejs-cloudbase)
  Complete guide for CloudBase Auth using the CloudBase Node SDK – caller identity, user lookup, custom login tickets, and server-side best practices.

- **auth-tool** (auth-tool-cloudbase)
  Use CloudBase Auth tool to configure and manage authentication providers for web applications - enable/disable login methods (SMS, Email, WeChat Open Platform, Google, Anonymous, Username/password, OAuth, SAML, CAS, Dingding, etc.) and configure provider settings via MCP tools `callCloudApi`.

- **auth-web** (auth-web-cloudbase)
  CloudBase Auth v3 Web SDK - Quick Reference Guide

- **auth-wechat** (auth-wechat-miniprogram)
  Complete guide for WeChat Mini Program authentication with CloudBase - native login, user identity, and cloud function integration.

- **cloud-functions** (cloud-functions)
  Complete guide for CloudBase cloud functions development - runtime selection, deployment, logging, invocation, and HTTP access configuration.

- **cloud-storage-web** (cloud-storage-web)
  Complete guide for CloudBase cloud storage using Web SDK (@cloudbase/js-sdk) - upload, download, temporary URLs, file management, and best practices.

- **cloudbase-platform** (cloudbase-platform)
  CloudBase platform knowledge and best practices. Use this skill for general CloudBase platform understanding, including storage, hosting, authentication, cloud functions, database permissions, and data models.

- **cloudrun-development** (cloudrun-development)
  CloudBase Run backend development rules (Function mode/Container mode). Use this skill when deploying backend services that require long connections, multi-language support, custom environments, or AI agent development.

- **data-model-creation** (data-model-creation)
  Optional advanced tool for complex data modeling. For simple table creation, use relational-database-tool directly with SQL statements.

- **http-api** (http-api-cloudbase)
  Use CloudBase HTTP API to access CloudBase platform features (database, authentication, cloud functions, cloud hosting, cloud storage, AI) via HTTP protocol from backends or scripts that are not using SDKs.

- **miniprogram-development** (miniprogram-development)
  WeChat Mini Program development rules. Use this skill when developing WeChat mini programs, integrating CloudBase capabilities, and deploying mini program projects.

- **no-sql-web-sdk** (cloudbase-document-database-web-sdk)
  Use CloudBase document database Web SDK to query, create, update, and delete data. Supports complex queries, pagination, aggregation, and geolocation queries.

- **no-sql-wx-mp-sdk** (cloudbase-document-database-in-wechat-miniprogram)
  Use CloudBase document database WeChat MiniProgram SDK to query, create, update, and delete data. Supports complex queries, pagination, aggregation, and geolocation queries.

- **relational-database-tool** (relational-database-mcp-cloudbase)
  This is the required documentation for agents operating on the CloudBase Relational Database. It lists the only four supported tools for running SQL and managing security rules. Read the full content to understand why you must NOT use standard Application SDKs and how to safely execute INSERT, UPDATE, or DELETE operations without corrupting production data.

- **relational-database-web** (relational-database-web-cloudbase)
  Use when building frontend Web apps that talk to CloudBase Relational Database via @cloudbase/js-sdk – provides the canonical init pattern so you can then use Supabase-style queries from the browser.

- **spec-workflow** (spec-workflow)
  Standard software engineering workflow for requirement analysis, technical design, and task planning. Use this skill when developing new features, complex architecture designs, multi-module integrations, or projects involving database/UI design.

- **ui-design** (ui-design)
  Professional UI design and frontend interface guidelines. Use this skill when creating web pages, mini-program interfaces, prototypes, or any frontend UI components that require distinctive, production-grade design with exceptional aesthetic quality.

- **web-development** (web-development)
  Web frontend project development rules. Use this skill when developing web frontend pages, deploying static hosting, and integrating CloudBase Web SDK.

- **cloudbase-guidelines** (cloudbase-guidelines)
  Essential CloudBase (TCB, Tencent CloudBase, 云开发, 微信云开发) development guidelines. MUST read when working with CloudBase projects, developing web apps, mini programs, or backend services using CloudBase platform.

## Contributing

These skills are maintained in the main [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository. To contribute:

1. Fork the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) repository
2. Make your changes in `config/.claude/skills/`
3. Submit a pull request

## License

Same as the [CloudBase AI ToolKit](https://github.com/TencentCloudBase/CloudBase-AI-ToolKit) project.
