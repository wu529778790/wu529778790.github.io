/**
 * 生成百度链接推送文件
 */
(async () => {
  const fs = require("fs");
  const path = require("path");
  const { default: chalk } = await import("chalk"); // 使用动态导入
  const matter = require("gray-matter");
  const readFileList = require("./modules/readFileList");
  const urlsRoot = path.join(__dirname, "..", "urls.txt");
  const DOMAIN = process.argv.splice(2)[0];

  if (!DOMAIN) {
    console.log(
      chalk.red(
        "请在运行此文件时指定一个你要进行百度推送的域名参数，例：node utils/baiduPush.js https://blog.shenzjd.com"
      )
    );
    return;
  }

  main();

  function main() {
    fs.writeFileSync(urlsRoot, DOMAIN);
    const files = readFileList();

    files.forEach((file) => {
      const { data } = matter(fs.readFileSync(file.filePath, "utf8"));

      if (data.permalink) {
        const link = `\r\n${DOMAIN}${data.permalink}`;
        fs.appendFileSync(urlsRoot, link);
      }
    });
  }
})();
