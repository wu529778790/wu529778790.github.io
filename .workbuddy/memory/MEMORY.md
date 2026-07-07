# 项目长期笔记

## 内容整理约定（PDF / 外部文章 → 项目笔记）
- 从外部 PDF 或文章整理进本项目 markdown 时，**不要保留来源归属、公众号名称、原文章标题、"整理自…" 等转载式说明**。
- 用**我们自己的口吻**重写正文，像原创发布（第一人称 / 中性原创语气），去掉公众号运营、募捐、上一篇/下一篇等无关内容。
- 保留全部技术要点与可复用提示词、代码块、链接。
- 排版沿用本项目 VuePress 笔记风格：`---` front matter（title/date/permalink/categories/tags）+ Markdown 正文。AI 类文章放 `docs/09.AI/`，通用笔记放 `docs/20.笔记/`。
- **笔名替换**：改写外部内容时，原文里的作者名 / 品牌名（如「袋鼠帝 KangarooKing」等）一律替换为「神族九帝」。

## 项目结构
- 静态博客（GitHub Pages，前端/AI 笔记方向），docs 下按主题分目录：09.AI、20.笔记、10.面试题、31.服务器 等。
- 每篇笔记带 front matter：title、date、permalink（/pages/xxx/）、categories、tags。
- **分类受控词表**（已归一化，2026-07-07）：面试题 / 学习笔记 / JavaScript / CSS / Vue / Agent学习笔记 / Webpack / 思维导图 / 服务器 / 前端优化 / 项目 / 浏览器 / 手写系列 / Http / AI / 前端工程化 / 算法 / React / 设计模式 / HTML / Web3 / webGl / 重学node。新增文章 categories 请从该表取，勿造同义词。
- **OG 描述**：config.mts `transformHead` 已自动从正文首段提取 og:description（缺 description 字段时），无需手填 description；空壳/纯链接文章回退站点描述。

## 主动放弃的优化项（用户 2026-07-07 决策，勿再提议）
以下均为之前识别出的产品级问题，但用户明确决定**不做**，后续会话不要再当成待修项提出：
- **permalink 路由改造**：保持现状。permalink 字段仍是装饰字段，VitePress 按文件路径路由（中文深层 URL），不引入 rewrites 改路由（避免断旧链）。
- **标签点击化**：不做 tag 归档页，卡片上的 tag 保持展示但不可点击。
- **ignoreDeadLinks 关闭**：保持 `config.mts` 中 `ignoreDeadLinks: true`（继续静默吞死链），不改为暴露。
- **analytics 埋点**：暂不接入（GA/Umami/Plausible 等都不加）。
- **12 篇 Agent 空壳文章**（`09.AI/100.Agent学习笔记/` 下只有 front matter、无正文）：暂不补内容、暂不删除，列表照常显示、点进去空白维持现状。

## 已知隐患（用户已知但决定接受）
- `09.AI/100.Agent学习笔记/` 下 12 篇空壳文章：用户已知，决定暂留。
- permalink 字段全站都有但实际未生效（URL 仍是中文深层路径）：用户已知，决定暂不改。
- 标签（tags）在卡片展示但无归档页、点击无反应：用户已知，决定暂不改。
