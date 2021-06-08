// head
module.exports = [
  // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  ["link", { rel: "icon", href: "/img/favicon.ico" }], //favicons，资源放在public文件夹
  [
    "meta",
    {
      name: "keywords",
      content:
        "前端博客,个人技术博客,前端,前端开发,前端框架,web前端,前端面试题,技术文档,学习,面试,JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github,markdown",
    },
  ],
  ["meta", { name: "baidu-site-verification", content: "code-yywEP2q5jK" }], // 百度统计的站长验证
  ["meta", { name: "theme-color", content: "#11a8cd" }], // 移动浏览器主题颜色
  // PWA start
  // [
  //   "link",
  //   {
  //     rel: "icon",
  //     type: "image/png",
  //     sizes: "16x16",
  //     href: `/images/icons/favicon-16x16.png`,
  //   },
  // ],
  // [
  //   "link",
  //   {
  //     rel: "icon",
  //     type: "image/png",
  //     sizes: "32x32",
  //     href: `/images/icons/favicon-32x32.png`,
  //   },
  // ],
  // ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
  // ["meta", { name: "application-name", content: "VuePress" }],
  // ["meta", { name: "apple-mobile-web-app-title", content: "VuePress" }],
  // ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
  // [
  //   "link",
  //   { rel: "apple-touch-icon", href: `/images/icons/apple-touch-icon.png` },
  // ],
  // [
  //   "link",
  //   {
  //     rel: "mask-icon",
  //     href: "/images/icons/safari-pinned-tab.svg",
  //     color: "#3eaf7c",
  //   },
  // ],
  // ["meta", { name: "msapplication-TileColor", content: "#3eaf7c" }],
  // ["meta", { name: "theme-color", content: "#3eaf7c" }],

  // ['link', { rel: 'icon', href: '/logo.png' }],
  // ['link', { rel: 'manifest', href: '/manifest.json' }],
  // ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  // ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  // ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  // ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
  // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
  // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
  // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  // PWA end
  // [
  //   'script',
  //   {
  //     'data-ad-client': 'ca-pub-7828333725993554',
  //     async: 'async',
  //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  //   },
  // ], // 网站关联Google AdSense 与 html格式广告支持
];
