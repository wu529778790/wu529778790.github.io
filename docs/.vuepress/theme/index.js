import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export const Theme = () => {
  return {
    name: "vuepress-theme-blog",
    extends: "@vuepress/theme-default",
    layouts: {
      Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    },
    // 主题的客户端配置文件的路径
    // clientConfigFile: path.resolve(__dirname, "client.js"),
    // 如果没有指定模板，将会使用默认模板
    templateBuild: path.resolve(__dirname, "templates/build.html"),
    templateDev: path.resolve(__dirname, "templates/build.html"),
  };
};
