// nav
module.exports = [
  { text: '首页', link: '/' },
  {
    text: '面试题',
    link: '/interview/', //目录页链接，主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
    items: [
      // 说明：以下所有link的值只是在相应md文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的
      {
        // text: '前端文章',
        items: [
          { text: 'HTML', link: '/pages/1.113e8ee6e7987/' },
          { text: 'CSS', link: '/pages/0.8d5fe2ded26da/' },
          { text: 'JavaScript', link: '/pages/2f4905/' },
          { text: 'Vue', link: '/pages/c80d2751cf1f4268' },
          { text: '面试真题', link: '/pages/05fe26/' },
          { text: '学习笔记', link: '/note/javascript/' },
        ],
      },
      // {
      //   text: '学习笔记',
      //   items: [
      //     { text: '《JavaScript教程》笔记', link: '/note/javascript/' },
      //     { text: '《JavaScript高级程序设计》笔记', link: '/note/js/' },
      //     { text: '《ES6 教程》笔记', link: '/note/es6/' },
      //     { text: '《Vue》笔记', link: '/note/vue/' },
      //     {
      //       text: '《TypeScript 从零实现 axios》',
      //       link: '/note/typescript-axios/',
      //     },
      //     {
      //       text: '《Git》学习笔记',
      //       link: '/note/git/',
      //     },
      //     {
      //       text: 'TypeScript笔记',
      //       link: '/pages/51afd6/',
      //     },
      //     {
      //       text: 'JS设计模式总结笔记',
      //       link: '/pages/4643cd/',
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   text: '页面',
  //   link: '/ui/',
  //   items: [
  //   ],
  // },
  {
    text: '索引',
    link: '/archives/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
    ],
  },
  {
    text: '收藏',
    link: '/pages/beb6c0bd8a66cea6/',
    items: [
      { text: '网站', link: '/pages/beb6c0bd8a66cea6/' },
      { text: '资源', link: '/pages/eee83a9211a70f9d/' },
      { text: 'Vue资源', link: '/pages/12df8ace52d493f6/' },
    ],
  },
  {
    text: '更多',
    link: '/more/',
    items: [
      { text: '友情链接', link: '/friends/' },
      { text: '关于', link: '/about/' },
    ],
  },
]
