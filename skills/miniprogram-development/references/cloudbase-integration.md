# CloudBase Mini Program References

This document supplements `SKILL.md` with practical **WeChat Mini Program + CloudBase** integration guidance.

## 1. Environment Initialization

Mini programs using CloudBase should initialize `wx.cloud` once during app startup.

```js
App({
  onLaunch() {
    wx.cloud.init({
      env: "your-env-id",
      traceUser: true,
    });
  },
});
```

### Rules

- Always obtain the environment ID via `envQuery` when available.
- Prefer a single app-level initialization instead of repeated page-level initialization.
- Use `traceUser: true` unless there is a clear reason not to, so CloudBase can associate requests with the current WeChat user.

## 2. Authentication Model

Mini program CloudBase is **naturally login-free**.

### Required behavior

- Do **not** generate login pages or login flows.
- Do **not** port Web authentication patterns into mini programs.
- In cloud functions, retrieve user identity with `cloud.getWXContext().OPENID`.

```js
const cloud = require("wx-server-sdk");
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async () => {
  const wxContext = cloud.getWXContext();
  return {
    openid: wxContext.OPENID,
  };
};
```

### Recommended usage

- Use `OPENID` as the stable user identity for per-user records.
- Perform user bootstrapping inside cloud functions when first needed.
- Keep user profile writes and privileged updates in cloud functions when business rules matter.

## 3. Client vs Cloud Function Boundaries

Use the right CloudBase capability for the right job.

### Use `wx.cloud.database()` for:

- Client-safe reads
- User-scoped writes with appropriate security rules
- Simple collection CRUD where server orchestration is unnecessary

```js
const db = wx.cloud.database();
const todos = db.collection("todos");

await todos.add({
  data: {
    title: "Buy milk",
    done: false,
    createdAt: Date.now(),
  },
});
```

### Use `wx.cloud.callFunction()` for:

- Cross-collection operations
- Privileged or admin-only writes
- Multi-step transactions / orchestration
- Operations requiring `OPENID`-based trust on the server side
- Calls to third-party APIs or secret-bearing logic

```js
await wx.cloud.callFunction({
  name: "createOrder",
  data: {
    cartIds: ["a", "b"],
  },
});
```

### Use Cloud Storage APIs for:

- User-uploaded images and attachments
- Files that need access control or lifecycle management
- Temporary file access through CloudBase file APIs

```js
await wx.cloud.uploadFile({
  cloudPath: `avatars/${Date.now()}.png`,
  filePath: localTempPath,
});
```

## 4. Database Permission Guidance

CloudBase database access is permission-controlled. Configure permissions **before** relying on client writes.

### Practical rules for mini programs

- For user-owned content, prefer rules that only allow users to operate on their own documents.
- For system-managed data, prefer server-side writes via cloud functions.
- For cross-collection operations, prefer cloud functions by default.
- If security rules are complex, move write logic to cloud functions rather than over-expanding client privileges.

### Recommended workflow

1. Create collection
2. Configure security rules
3. Write mini program code
4. Test from real device / developer tools

## 5. Cloud Functions for Mini Programs

### Initialization

Use dynamic current environment in mini program cloud functions:

```js
const cloud = require("wx-server-sdk");
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
```

### Recommendations

- Keep function directories under `cloudfunctions`
- Include `package.json` for dependencies
- Prefer cloud-side dependency installation
- For permission-sensitive capabilities, redeploy once in WeChat Developer Tools if needed

### Typical function responsibilities

- User profile bootstrap
- Order creation / submission
- Cross-collection consistency updates
- Secure decryption workflows such as WeRun processing
- Admin or moderation workflows

## 6. Mini Program Cloud Storage and Static Resources

### Static resources inside project

- If a page or tabbar references local assets, ensure the files are downloaded into the project
- Prefer Icons8 for tabbar and common icons when suitable
- Keep file paths stable to avoid compile errors

### Cloud storage usage

- Store user-generated or private files in Cloud Storage
- Use Cloud Storage instead of bundling large dynamic files into the mini program project
- Use temporary URLs or CloudBase file APIs as needed for controlled access

## 7. AI Model Usage in Mini Programs

When mini program base library supports it, use `wx.cloud.extend.AI` directly for AI features.

### Guidance

- Keep prompts and model selection close to the business scenario
- Prefer streaming APIs for chat or long-form generation
- Put privileged orchestration or multi-model workflows into cloud functions if needed

## 8. WeChat Developer Tools and Deployment Notes

### Before opening the project

- Confirm `project.config.json` includes `appid`
- Ensure `miniprogramRoot` points to the mini program source directory
- Ensure referenced assets and cloud function directories exist

### Deployment / debugging notes

- Real-device preview is important for storage, permissions, and WeRun behavior
- Some cloud function permissions may require manual cloud installation / redeployment in WeChat Developer Tools
- If cloud invocation or special permission features fail, verify service authorization and related API permissions

## 9. Console References

After creating resources, provide console links using the actual `envId`.

### Common console pages

- Overview: `https://tcb.cloud.tencent.com/dev?envId=${envId}#/overview`
- Document Database: `https://tcb.cloud.tencent.com/dev?envId=${envId}#/db/doc`
- MySQL Database: `https://tcb.cloud.tencent.com/dev?envId=${envId}#/db/mysql`
- Cloud Functions: `https://tcb.cloud.tencent.com/dev?envId=${envId}#/scf`
- Cloud Storage: `https://tcb.cloud.tencent.com/dev?envId=${envId}#/storage`
- Identity Authentication: `https://tcb.cloud.tencent.com/dev?envId=${envId}#/identity`
- Logs & Monitoring: `https://tcb.cloud.tencent.com/dev?envId=${envId}#/logs`
- Environment Settings: `https://tcb.cloud.tencent.com/dev?envId=${envId}#/settings`

## 10. Anti-Patterns

Avoid these mistakes in mini program + CloudBase projects:

- Generating login pages for CloudBase mini programs
- Copying Web SDK auth flows into mini programs
- Putting privileged writes directly in client code without rule review
- Using cross-collection client logic when a cloud function should own it
- Referencing local icons or assets without actually downloading them
- Forgetting page config files such as `index.json`
