import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { blogPlugin } from "@vuepress/plugin-blog";
import Theme from "./theme/index";

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
  theme: Theme({
    logo: "https://blog.shenzjd.com/img/logo.png",
    hostname: "https://blog.shenzjd.com",
    navbar: [
      {
        text: "首页",
        link: "/",
      },
    ],
  }),

  plugins: [
    blogPlugin({
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith("posts/") : false,
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || "",
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt: data?.excerpt || "",
      }),
      type: [
        {
          key: "blog",
          filter: (page) => page.frontmatter.date instanceof Date,
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
        },
      ],
      hotReload: true,
    }),
  ],

  bundler: viteBundler(),
});
