const fs = require("fs");
const path = require("path");


export const generateMenu =  (path = '/docs', link = '', index = 0) => {
  const docsPath = path.dirname(__dirname, path); // docs 目录路径
  const sidebarConfig = {};
  const files = fs.readdirSync(docsPath);
  console.log(files)

  files.forEach((filename) => {
    if (filename.startsWith(".")) return;
    const filepath = path.join(docsPath, filename);
    const stat = fs.statSync(filepath);
    // 如果是文件夹，则递归生成子级 sidebar 配置
    if (stat.isDirectory()) {
      if (index === 0) {
        const config = generateSidebarConfig(filepath, `/${filename}/`, index + 1);
        if (!sidebarConfig[`/${filename}/`]) {
          sidebarConfig[`/${filename}/`] = [config];
        }
      } else {
        if (!sidebarConfig.items) {
          sidebarConfig.items = [];
        }
        sidebarConfig.items.push(generateSidebarConfig(filepath, `${link}${filename}/`, index + 1))
      }
    } else {
      const extname = path.extname(filepath);
      const basename = path.basename(filepath, extname);
      if (filename === 'index.md' && index > 0) {
        const menuPath = path.dirname(filepath);
        const menuName = path.basename(menuPath) 
        sidebarConfig.text = menuName;
        sidebarConfig.link = link;
      }
      if (extname === ".md" && filename !== "index.md") {
        if (!sidebarConfig.items) {
          sidebarConfig.items = [];
        }
        sidebarConfig.items.push({
          text: basename,
          link: `${link}${basename}`,
        });
      }
    }
  });

  return sidebarConfig;
}
