// 插件配置
module.exports = [
  'vuepress-plugin-baidu-autopush', // 百度自动推送

  // 可以添加第三方搜索链接的搜索框（原官方搜索框的参数仍可用）
  [
    'thirdparty-search',
    {
      thirdparty: [
        // 可选，默认 []
        {
          title: '在Bing中搜索',
          frontUrl: 'https://cn.bing.com/search?q=',
        },
        {
          title: '在MDN中搜索',
          frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', // 搜索链接的前面部分
          behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
        },
        {
          title: '在Runoob中搜索',
          frontUrl: 'https://www.runoob.com/?s=',
        },
        {
          title: '在Vue API中搜索',
          frontUrl: 'https://cn.vuejs.org/v2/api/#',
        },
        {
          title: '通过百度搜索本站的',
          frontUrl: 'https://www.baidu.com/s?ie=UTF-8&wd=site%3Ablog.shenzjd.com',
        },
      ],
    },
  ],

  [
    'one-click-copy',
    {
      // 代码块复制按钮
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false, // whether to display on the mobile side, default: false.
    },
  ],
  [
    'demo-block',
    {
      // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false, // 是否展示为横向样式
      },
    },
  ],
  [
    'vuepress-plugin-zooming', // 放大图片
    {
      selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除class是no-zoom的图片
      options: {
        bgColor: 'rgba(0,0,0,0.6)',
      },
    },
  ],
  [
    'vuepress-plugin-baidu-tongji', // 百度统计
    {
      hm: '8ec38a366284caaba41f3ead2b7c93f3',
    },
  ],
  [
    'vuepress-plugin-comment', // 评论
    {
      choosen: 'gitalk',
      options: {
        clientID: 'd1ed030f2a671802799f',
        clientSecret: '3a73125f3fd398cc6c27ed999b490af67343e970',
        repo: 'wu529778790.github.io', // GitHub 仓库
        owner: 'wu529778790', // GitHub仓库所有者
        admin: ['wu529778790'], // 对仓库有写权限的人
        // distractionFreeMode: true,
        pagerDirection: 'last', // 'first'正序 | 'last'倒序
        id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>', //  页面的唯一标识,长度不能超过50
        title: '「评论」<%- frontmatter.title %>', // GitHub issue 的标题
        labels: ['Gitalk', 'Comment'], // GitHub issue 的标签
        body:
          '页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>', // GitHub issue 的内容
      },
    },
  ],
  [
    '@vuepress/last-updated', // "上次更新"时间格式
    {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs') // https://day.js.org/
        return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
      },
    },
  ],
  //一个基于 html5 canvas 绘制的网页背景效果
  ['nest',{
    color: '0,0,0', // color of lines, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
    pointColor: '0,0,0', // color of points, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
    opacity: 0.5, // the opacity of line (0~1), default: 0.5.
    count: 99, // the number of lines, default: 99.
    zIndex: -1, // z-index property of the background, default: -1.
    showInMobile: false // whether to display on the mobile side, default: false.
  }],
  [
    //看板娘
    "@vuepress-reco/vuepress-plugin-kan-ban-niang",
    {
      theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
      clean: false,
      messages: {
        welcome: '欢迎光临神族九帝博客',
        home: '心里的花，我想要带你回家。',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '再见哦'
      },
      width: 240,
      height: 352
    }
  ],
  // 为博客文章自动随机添加名人名言或其他，可自定义样式和内容
  ["vuepress-plugin-boxx"],
  // 鼠标点击
  ['@ikangxu/vuepress-plugin-mouse-effects', {
    type: 'click-word', // 暂时只内置了一个特效   内置的特效有 particle|click-word
    words: ["富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善"], // click-word效果需要用到的文字提示
    style: {
      // cursor: '', // 支持自定义cursor，没有则为默认样式
      // borderRadius: '50%', // 形状 particle效果需要用到
      zIndex: 2,
      colors: ["#FF0000", "#FF7D00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF"], // 颜色
      fontSize: 14, // click-word效果需要用到的文字显示大小
      r: {
        min: 5, // 半径最小值
        max: 15 // 半径最大值
      },
      dx: {
        min: -10, // 横向偏移量最小值
        max: 10 // 横向偏移量最大值
      },
      dy: {
        min: -10, // 纵向偏移量最小值
        max: 10  // 纵向偏移量最大值
      }
    }
  }]
]
