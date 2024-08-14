import { defaultTheme } from "@vuepress/theme-default";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default (options) => {
  return {
    name: "vuepress-theme-child",
    extends: defaultTheme(options),

    // 在子主题的客户端配置文件中覆盖布局
    // 注意，你在发布到 NPM 之前会将 TS 构建为 JS ，因此这里需要设置为 JS 文件的路径
    // clientConfigFile: path.resolve(__dirname, "./client.js"),

    // 覆盖组件别名
    alias: {
      "@theme/VPHome.vue": path.resolve(__dirname, "./layouts/VPHome.vue"),
    },
  };
};
