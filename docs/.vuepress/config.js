import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
// import { blogPlugin } from "@vuepress/plugin-blog";
import { Theme } from "./theme/index";

export default defineUserConfig({
  lang: "zh-CN",
  title: "神族九帝's Blog",
  description: "神族九帝，永不言弃",
  base: "/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://blog.shenzjd.com/img/logo.png",
      },
    ],
  ],
  // 使用自定义主题
  theme: Theme({}),

  plugins: [
    // blogPlugin({
    //   // Only files under posts are articles
    //   filter: ({ filePathRelative }) =>
    //     filePathRelative ? filePathRelative.startsWith("posts/") : false,
    //   // Getting article info
    //   getInfo: ({ frontmatter, title, data }) => ({
    //     title,
    //     author: frontmatter.author || "",
    //     date: frontmatter.date || null,
    //     category: frontmatter.category || [],
    //     tag: frontmatter.tag || [],
    //     excerpt:
    //       // Support manually set excerpt through frontmatter
    //       typeof frontmatter.excerpt === "string"
    //         ? frontmatter.excerpt
    //         : data?.excerpt || "",
    //   }),
    //   // Generate excerpt for all pages excerpt those users choose to disable
    //   excerptFilter: ({ frontmatter }) =>
    //     !frontmatter.home &&
    //     frontmatter.excerpt !== false &&
    //     typeof frontmatter.excerpt !== "string",
    //   category: [
    //     {
    //       key: "category",
    //       getter: (page) => page.frontmatter.category || [],
    //       layout: "Category",
    //       itemLayout: "Category",
    //       frontmatter: () => ({
    //         title: "Categories",
    //         sidebar: false,
    //       }),
    //       itemFrontmatter: (name) => ({
    //         title: `Category ${name}`,
    //         sidebar: false,
    //       }),
    //     },
    //     {
    //       key: "tag",
    //       getter: (page) => page.frontmatter.tag || [],
    //       layout: "Tag",
    //       itemLayout: "Tag",
    //       frontmatter: () => ({
    //         title: "Tags",
    //         sidebar: false,
    //       }),
    //       itemFrontmatter: (name) => ({
    //         title: `Tag ${name}`,
    //         sidebar: false,
    //       }),
    //     },
    //   ],
    //   type: [
    //     {
    //       key: "article",
    //       // Remove archive articles
    //       filter: (page) => !page.frontmatter.archive,
    //       layout: "Article",
    //       frontmatter: () => ({
    //         title: "Articles",
    //         sidebar: false,
    //       }),
    //       // Sort pages with time and sticky
    //       sorter: (pageA, pageB) => {
    //         if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
    //           return pageB.frontmatter.sticky - pageA.frontmatter.sticky;
    //         if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
    //           return -1;
    //         if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;
    //         if (!pageB.frontmatter.date) return 1;
    //         if (!pageA.frontmatter.date) return -1;
    //         return (
    //           new Date(pageB.frontmatter.date).getTime() -
    //           new Date(pageA.frontmatter.date).getTime()
    //         );
    //       },
    //     },
    //     {
    //       key: "timeline",
    //       filter: (page) => page.frontmatter.date instanceof Date,
    //       // Sort pages with time
    //       sorter: (pageA, pageB) =>
    //         new Date(pageB.frontmatter.date).getTime() -
    //         new Date(pageA.frontmatter.date).getTime(),
    //       layout: "Timeline",
    //       frontmatter: () => ({
    //         title: "时间轴",
    //         sidebar: false,
    //       }),
    //     },
    //     {
    //       key: "blog",
    //       filter: (page) => page.frontmatter.date instanceof Date,
    //       // Sort pages with time
    //       sorter: (pageA, pageB) =>
    //         new Date(pageB.frontmatter.date).getTime() -
    //         new Date(pageA.frontmatter.date).getTime(),
    //       layout: "Blog",
    //       frontmatter: () => ({
    //         title: "博客",
    //         sidebar: false,
    //       }),
    //     },
    //   ],
    //   hotReload: true,
    // }),
  ],

  bundler: viteBundler(),
});
