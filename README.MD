# 神族九帝's Blog

个人技术博客，专注**前端与 AI 实战**，沉淀面试题、学习笔记、AI 探索与工程实践。

🔗 在线访问：<https://blog.shenzjd.com>

## ✨ 特性

- **VitePress 构建**，170+ 篇文章，按主题分目录（AI / 面试题 / 笔记 / 服务器）
- **卡片式首页**，自定义主题渲染文章列表，支持置顶与按日期倒序
- **自动导航 & 侧边栏**，构建时根据目录结构自动生成，无需手工维护
- **本地全文搜索**，无需外部服务
- **SEO 友好**，自动为每篇文章生成 OG / Twitter Card，从正文首段提取描述
- **Sitemap + RSS**，构建后自动生成 `sitemap.xml` 与 `feed.xml`
- **旧链接 301 重定向**，兼容历史 permalink（`/pages/xxx/`）自动跳转到新地址
- **评论系统**，基于 giscus（GitHub Discussions）
- **PWA 支持**，包含 manifest 与 Service Worker
- **双部署方案**，GitHub Pages 与 Docker（Nginx）均可一键发布

## 🛠 技术栈

| 模块 | 选型 |
| --- | --- |
| 框架 | VitePress 1.6 |
| 运行时 | Node.js 22 |
| 评论 | giscus（GitHub Discussions） |
| 部署 A | GitHub Pages（Actions 自动构建发布） |
| 部署 B | Docker + Nginx（镜像自动推送 ghcr.io） |

## 📁 目录结构

```
├── docs/                          # 站点源码（Markdown + 主题）
│   ├── 09.AI/                     # AI 相关文章
│   ├── 10.面试题/                  # 前端面试题
│   ├── 20.笔记/                    # 学习笔记
│   ├── 31.服务器/                  # 服务器实践
│   ├── index.md                   # 首页（layout: page，由主题组件渲染）
│   ├── public/                    # 静态资源（favicon / sw.js / pages 重定向）
│   └── .vitepress/
│       ├── config.mts             # 站点配置（导航/侧边栏/SEO/PWA）
│       ├── sidebar.mjs            # 自动生成导航与侧边栏
│       ├── sitemap.mjs            # 生成 sitemap.xml
│       ├── rss.mjs                # 生成 feed.xml
│       └── theme/                 # 自定义主题与首页组件
├── scripts/
│   └── generate-posts.mjs         # 扫描文章 → posts.ts + /pages/ 重定向页
├── .github/workflows/             # CI：GitHub Pages 发布 / Docker 镜像推送
├── Dockerfile                     # Node 构建 + Nginx 运行
├── nginx.conf                     # Nginx 安全加固与静态资源缓存
└── package.json
```

## 🚀 快速开始

```bash
npm install        # 安装依赖（需要 Node.js 22+）

npm run dev        # 本地开发，自动生成数据后启动热更新
npm run build      # 生产构建（自动生成文章数据 / 重定向 / sitemap / RSS）
npm run preview    # 本地预览构建产物
```

## ✍️ 写作指南

### 新增文章

在 `docs/` 对应分类目录下新建 Markdown 文件，**文件名用数字前缀控制排序**（如 `10.xxx.md`），构建时会自动纳入站点：

```markdown
---
title: 文章标题
date: 2026-08-06 12:00:00
permalink: /pages/your-slug/
categories:
  - AI
tags:
  - Claude Code
---

# 文章标题（正文第一个标题用 H1，与 title 保持一致）

正文内容…
```

### 规范要点

- **front matter 必填**：`title`、`date`、`permalink`、`categories`、`tags`
- **categories 使用受控词表**，请从以下取值，不要自造同义词：`面试题 / 学习笔记 / JavaScript / CSS / Vue / Agent学习笔记 / Webpack / 思维导图 / 服务器 / 前端优化 / 项目 / 浏览器 / 手写系列 / Http / AI / 前端工程化 / 算法 / React / 设计模式 / HTML / Web3 / webGl / 重学node`
- **正文首行建议为 `# 一级标题`**（与 `title` 一致），保证文章页有醒目的主标题
- `permalink` 用于旧链接兼容，构建时会自动生成对应的 301 重定向页
- 代码块尽量标注语言（` ```js ` 等），以获得语法高亮

### 构建时自动完成的事

1. 扫描全部文章 → 生成 `posts.ts`（首页卡片数据，含摘要/标签/置顶）
2. 按 `permalink` 生成 `/pages/xxx/` 301 重定向页
3. 生成 `sitemap.xml` 与 `feed.xml`
4. 为每页注入 OG / Twitter 卡片（无 `description` 字段时自动取正文首段）

## 🚢 部署

### GitHub Pages（推荐）

推送 `master` 分支即触发 GitHub Actions，自动构建并发布到 `gh-pages`，绑定自定义域名 `blog.shenzjd.com`。

### Docker

```bash
docker build -t blog .
docker run -d -p 8080:80 blog
# 或使用 CI 自动推送到 ghcr.io 的镜像
```

Nginx 配置已内置安全加固（拦截扫描器探测、静态资源长缓存、安全响应头等）。

## 📊 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wu529778790/wu529778790.github.io&type=Date)](https://star-history.com/#wu529778790/wu529778790.github.io&Date)

## 📄 License

MIT License — 文章版权归作者所有，转载请注明出处。
