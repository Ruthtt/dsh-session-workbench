# dsh-session-workbench

[English](README.md) | 中文

DeepSeek Harness Web GUI 的替换式工作区侧栏。它保留标准 Workspace 浏览器，并增加明确的 Session 整理、导出和删除控制。

## 能力

- 在一个 Workspace 内拖动 Session，持久保存手动顺序。
- 把空闲 Session 拖到另一个 Workspace，以继承子会话方式迁移；Host 提交新 Session 之前保留源 Session。
- 把 Session 拖到兼容的输入框，插入结构化 Session 引用而不移动源 Session。
- 通过 Host ZIP 端点导出一个 Session 及其后代。
- 通过带确认步骤的对话框永久删除一个 Session，同时保留“归档”作为非破坏性操作。
- 保留标准 Workspace 选择、搜索、分组、折叠、重命名、分叉、归档和 Workspace 管理行为。

## 安装

把 GitHub 版本安装到 Web Profile，然后重启该 Profile：

```sh
dsh plugin --profile web add github:Ruthtt/dsh-session-workbench
```

由于 `sidebar.workspaces` 只能有一个 owner，Bundle 会停用原生 `ui-workspace` 行，再在原位置挂载 `dsh-session-workbench`。

## 兼容性

`0.1.0` 基于 DeepSeek Harness `0.1.1-rc.2` 构建和测试。浏览器 Bundle 自包含，类型和共享运行时模块只使用官方 npm SDK。

永久删除和跨 Workspace 迁移要求 Host 提供 `session.delete` 与 `session.migrate` 能力。2026-08-24 对应的 DeepseekHarness 部署已经包含这些能力。没有这些扩展的原版 Host 仍能加载侧栏，但这两个操作会报告兼容性错误，不会修改存储。

Session 导出使用标准 `/api/session.export` 路由。拖到输入框复制上下文要求输入框监听共享的 `dsh:session-pointer-drag` 契约。

## 配置

插件没有设置项。每个 Profile 只安装在一个 Bundle 层中；它的 patch 会自动替换原生 Workspace 浏览器。

## 安全模型

删除是破坏性操作，只有显式确认后才会删除一个持久 Session。它不会递归删除后代，也不会删除内容寻址的附件 blob。迁移只接受空闲的源 Session，并且只在继承子会话完成持久化、挂接到目标 Workspace 后才归档源 Session。

拖动载荷只包含版本和 Session 身份。标题、历史、引用和 Workspace 权限由 Host 解析，不信任浏览器拖动数据。

## 开发

先克隆本仓库，再运行开发检查：

```sh
git clone https://github.com/Ruthtt/dsh-session-workbench.git
cd dsh-session-workbench
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm pack:check
```

## 来源

Workspace 浏览器派生自 MIT 许可的 [`@deepseek-ai/dsh-client-ui-workspace`](https://github.com/deepseek-ai/DeepSeek-Harness) 包。署名信息见 [NOTICE](NOTICE)。

## 已知限制

- 首个版本面向 `0.1.1-rc.2` 客户端契约；预发布 SDK 契约可能变化。
- 跨 Workspace 迁移会创建新的子身份并归档源 Session，不会修改源 Session 不可变的工作目录。
- 永久删除按单个 Session 执行，不会递归删除后代。

## 许可证

MIT。
