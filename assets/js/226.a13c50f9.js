(window.webpackJsonp=window.webpackJsonp||[]).push([[226],{563:function(t,a,d){"use strict";d.r(a);var e=d(4),v=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",{attrs:{"data-nodeid":"593"}},[t._v("前面我已经提到过，骨架屏和 SSR 在首屏优化方面有较好的效果，骨架屏可以使用户预期到接下来要展示的内容和结构，让用户觉得页面加载快了，而 SSR 则可以白屏时间大幅缩短。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"594"}},[t._v("那么具体该怎么实现骨架屏和 SSR 呢？在实际工作当中如何落地操作呢？这一讲我们就来详细介绍下。")]),t._v(" "),a("h3",{attrs:{"data-nodeid":"595"}},[t._v("使用骨架屏方案优化页面性能")]),t._v(" "),a("p",{attrs:{"data-nodeid":"596"}},[t._v("为了让骨架屏内容和页面结构更类似，提升用户体验，我们一般采用的是"),a("strong",{attrs:{"data-nodeid":"667"}},[t._v("图片骨架屏")]),t._v("。")]),t._v(" "),a("h4",{attrs:{"data-nodeid":"597"}},[t._v("图片骨架屏的实现")]),t._v(" "),a("p",{attrs:{"data-nodeid":"598"}},[t._v("想要了解如何实现，我们先来看一下图片骨架屏的加载流程。在 App 业务功能设计时，设计师会针对这个页面制作一张离线包的图片，在 WebView 启动时，客户端把这张图片覆盖在页面上，页面开始进入请求资源的流程。当页面 WebView 加载完成或者前端页面通知客户端加载完成时，客户端通过渐变动画隐藏这张图片，将准备好的页面展现给用户。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"599"}},[t._v("所以，如果想要实现骨架屏，大致有这么几步。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"600"}},[t._v("第一步：先让 UI 设计师设计一张当前页面对应离线包的图，作为骨架屏展示图片。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"601"}},[t._v("第二步，在业务需求开发过程中，前端工程师拿到图后，把这张图片上传到 CDN 上面。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"602"}},[t._v("第三步，在客户端代码，增加启动时读取图片骨架屏的配置文件。如下面代码所示。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"604"}},[t._v("首先是传入设备分辨率，比如 400 *500，然后设置状态码 code。code 是 0 代表成功，-1 代表关闭图片骨架屏功能。 data 对象是具体的数据，m.58.com/enjoy-given/eg/index.html 是对应的页面 URL，骨架屏那个图片的地址是https://m.58.com/pic.png?400*500。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"605"}},[t._v("当用户打开 WebView 时，客户端对 URL 进行解析，取得该 URL 对应的 host 和pathname，然后将这两个数据分别与 data 和 routes 中的数据做比较。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"606"}},[t._v("如果都匹配上，说明要展示骨架屏，此时可根据 routes下面的 id 和 imgName 获取到对应的图片文件。当三个字符串拼起来，即zzSkeleton + id +imgName，就可获得最终的图片名字。其中 zzSkeleton 就是一个字符串， ID 我设置成 10001，imgName 表示具体的图片名称，比如代码中的 pic.png，最终图片名称为 “zzSkeleton10001pic.pn”。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"607"}},[t._v("在实现过程中要注意以下三点。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"608"}},[t._v("第一，注意区分首次使用和二次使用。首次使用的话，客户端遍历上述配置文件，下载数据中对应图片即可；二次使用时，需要拿当前的配置文件对比之前的配置文件，如果图片名称不同，需要下载新的图片。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"609"}},[t._v("第二，需要客户端在内存中建立图片，以加快图片骨架屏的加载速度。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"610"}},[t._v("第三，图片骨架屏展示过程中会出现拉伸问题。这是因为分辨率不同造成的，我们可以让 App")]),t._v(" "),a("p",{attrs:{"data-nodeid":"611"}},[t._v("在获取配置文件时，加上当前页面的分辨率，这样接口会根据分辨率返回最合适的图片。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"612"}},[t._v("以上是具体的实现方案，在实际当中，我们该如何借助它来进行性能优化呢？")]),t._v(" "),a("h4",{attrs:{"data-nodeid":"613"}},[t._v("使用及注意事项")]),t._v(" "),a("p",{attrs:{"data-nodeid":"614"}},[t._v("首先"),a("strong",{attrs:{"data-nodeid":"693"}},[t._v("骨架屏方案，非常适合资源加载时间长的页面")]),t._v("，比如列表页的首屏内容有很多个数据接口、筛选项、精选数据、列表数据等，这时候一定要用骨架屏。而对于一些 SSR 页面，因为白屏阶段比较短，可用可不用。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"615"}},[t._v("骨架屏使用起来比较简单，前端工程师只要在开发项目时，让 UI 对应出一个骨架图的图片，然后上传到 CDN，并给出页面路径和文件路径，生成配置文件给客户端，客户端根据配置加载骨架屏即可。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"616"}},[t._v("不过在实操时需要注意两点：")]),t._v(" "),a("ul",{attrs:{"data-nodeid":"617"}},[a("li",{attrs:{"data-nodeid":"618"}},[a("p",{attrs:{"data-nodeid":"619"}},[t._v("骨架屏中的内容结构，应该只是首屏的内容结构，不是整个页面的内容结构，反之会造成骨架图体积过大，加载骨架屏图片时间过长的问题；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"620"}},[a("p",{attrs:{"data-nodeid":"621"}},[t._v("骨架屏的问题，比如骨架屏代码异常加载时没有展示，或者展示时间过长，因为它不会影响白屏时间，我们很难发现。所以骨架屏什么时候展示和什么时候销毁，客户端要"),a("strong",{attrs:{"data-nodeid":"702"}},[t._v("以日志形式记录")]),t._v("下来，上传到性能监控平台，这样定期去看一下日志，则可以发现问题。")])])]),t._v(" "),a("h3",{attrs:{"data-nodeid":"622"}},[t._v("使用 SSR 方案优化页面性能")]),t._v(" "),a("p",{attrs:{"data-nodeid":"623"}},[t._v("一般来说，一个 Web 页面的渲染主要由客户端或者浏览器端来完成，大致过程是：客户端先从服务端请求到 index.html，然后加载脚本文件，Web 应用通过 ajax 请求到页面数据，并把相应的数据填充到模板，最终形成完整的页面来呈现给用户。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"624"}},[t._v("SSR（Server Side Rende，服务端渲染） 则把数据请求（也就是前面提到 ajax 请求）放在了服务端，服务端收到返回结果时，把数据填充到模板形成完整的页面，由服务器端把渲染完成的完整页面返回给客户端。这样减少了一些客户端到服务器端的数据接口请求，加快了首屏展现速度。")]),t._v(" "),a("h4",{attrs:{"data-nodeid":"625"}},[t._v("SSR 的实现及使用")]),t._v(" "),a("p",{attrs:{"data-nodeid":"626"}},[t._v("如何实现 SSR 呢？我们选用了 nuxt.js 方案。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"627"}},[t._v("为什么选择它？因为手机业务迭代开发速度比较快，我们希望将 SSR 开发的一些配置都能够封装起来，让前端工程师介入成本降低。由于目前业界移动端使用 Vue 的比较多，所以寻找能和它配套的方案可以大大降低接入成本。而 Nuxt.js 正是这种方案，它是一款基于 Vue 的 SSR 开源框架，使用 Webpack 和 Node.js 进行封装，其中预设了开发服务端渲染应用所需要的各种配置。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"628"}},[t._v("具体到开发方面，官网文档介绍得比较详细，通过脚手架 npx 即可创建一个项目，然后进入 service-life目录，运行npm run dev，即可看到页面效果。")]),t._v(" "),a("pre",{staticClass:"lang-java",attrs:{"data-nodeid":"629"}},[a("code",{attrs:{"data-language":"java"}},[t._v("npx create-nuxt-app service-life\ncd service-life\nnpm run dev\n")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"630"}},[t._v("接下来我们来看如何在项目中接入 SSR 方案。因为移动端我们经常使用 Vue CSR ，和 Vue CSR 一致的地方（如 client 的 webpack 配置，项目基础结构等），在这里我就不过多介绍了，重点放在不同点上。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"631"}},[t._v("首先，一些基础要求要满足。一是如果没引入 Vuerouter、Vuex 和 axios，则需要引入，确保客户端拿到的数据和客户端一致。二是由于服务端也需要接收 URL，然后传递给 vue 程序进行处理，所以要做好跨平台的路由配置，具体可使用 Vuerouter。三是数据端也需要跨平台库，对应的技术是 axios + vuex。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"632"}},[t._v("其次，我们需要为 webpack 提供两个打包入口文件， client 端和 server 端各一份。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"633"}},[t._v("由于用户在客户端每次访问 vue 时，都是一个新的上下文，但在用户访问服务端时，用于服务端渲染的 Node.js 启动后就一直在运行。也就是说，每一个用户请求处理都在同一个应用上下文中进行。为了确保不串数据，需要为每次 SSR 请求，创建全新的 app、store 和 router。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"634"}},[t._v("然后，我们重构组件的数据获取方式，在页面开发渲染之前，利用服务端进程，做好数据获取和解析工作，然后把状态和数据存存储于 store 中。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"635"}},[t._v("这里面需要注意的是，SSR 应用在挂载（mount）到客户端应用程序之前，需要获取到与服务器端应用程序完全相同的数据。否则，客户端应用程序会因为使用与服务器端应用程序不同的状态，导致混合失败。")]),t._v(" "),a("h4",{attrs:{"data-nodeid":"636"}},[t._v("白屏时间 100ms 的 SSR 优化")]),t._v(" "),a("p",{attrs:{"data-nodeid":"637"}},[t._v("做好上述工作后，我们白屏时间基本可以达到 200ms（标准是 300ms）。之后，我们还可以做一些升级优化，确保白屏时间达到 100ms 以内。具体来说，可以实施以下两个方面的工作：")]),t._v(" "),a("ul",{attrs:{"data-nodeid":"638"}},[a("li",{attrs:{"data-nodeid":"639"}},[a("p",{attrs:{"data-nodeid":"640"}},[a("strong",{attrs:{"data-nodeid":"721"}},[t._v("利用服务端的性能优势，尽量在服务端完成资源加载、首屏切分等工作")])])]),t._v(" "),a("li",{attrs:{"data-nodeid":"641"}},[a("p",{attrs:{"data-nodeid":"642"}},[a("strong",{attrs:{"data-nodeid":"725"}},[t._v("利用服务端统一缓存机制，对数据接口、页面和组件做缓存")])])])]),t._v(" "),a("p",{attrs:{"data-nodeid":"643"}},[t._v("怎么理解呢？")]),t._v(" "),a("p",{attrs:{"data-nodeid":"644"}},[t._v("第一，服务端渲染的最大优势，就是后端服务性能要远高于手机，所以请求数据接口和渲染时，耗时会更短。以我们手机业务列表页为例，CSR 下面渲染需要 600ms，到了 SSR下，渲染只需要 300ms。为此，我们可以把很多原本客户端做到的事情挪到了服务端，比如模块文件加载，首屏切分等。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"645"}},[t._v("第二，服务器端缓存与客户端最大不同是，服务端属于统一公用，也就是说，只要某一个用户访问过一次，后续所有用的访问都可以使用这份缓存。我们可以利用这一特点，采用 LRU（Least Recently Used，最近最少使用缓存机制）和 Redis 做好缓存功能，降低白屏时间。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"646"}},[t._v("具体来说，LRU 属于页面级缓存，对于数据统一性页面（有别于千人千面数据的页面），利用 LRU-Cache 可以缓存当前请求的数据资源。为了降低缓存的颗粒度，提高缓存的服用行，我们还可以用它来对渲染后的 vue 组件进行缓存。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"647"}},[t._v("而使用 Redis 可以对跨页面的数据接口进行缓存，将整体渲染时间再减少 100ms。为什么呢？因为 SSR 应用程序部署在多服务、多进程下，该进程下的缓存并不是共享的，这就造成缓存命中效率低下，而使用 Redis 可以解决这个问题，进而更好实现跨页面数据缓存（关联上跨云接口缓存这里，呼应主题）。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"648"}},[t._v("在实施过程中，还要注意以下几点：")]),t._v(" "),a("p",{attrs:{"data-nodeid":"649"}},[t._v("第一，前端工程师因为对后端服务了解不多，在实际开发中可能会出现一些问题，例如我们之前遇到的，在服务端取后端数据接口时，取到的订单信息直接展示在页面源码中，导致乌云系统爆出了一个安全漏洞。所以建议你系统学习一些服务端安全知识，避免类似问题出现。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"650"}},[t._v("第二，在 SSR 服务出现高并发问题后，服务扩容是一种解决方案，但前端工程师对这方面并不擅长（如估算服务 QPS），容易出现问题。怎么办呢？一方面可以让运维和后端工程师一起协助，另外一方面也要做好 CSR 的降级，一旦遇到问题，可以快速降级。")]),t._v(" "),a("h3",{attrs:{"data-nodeid":"893"}},[t._v("小结")]),t._v(" "),a("p",{attrs:{"data-nodeid":"1205"}},[a("img",{attrs:{src:"https://s0.lgstatic.com/i/image6/M00/32/C2/Cgp9HWBuXziAAA4DAAI6QH-dulY404.png",alt:"溪风的思维导图14.png","data-nodeid":"1209"}})]),t._v(" "),a("p",{attrs:{"data-nodeid":"1206"}},[t._v("好了，以上就是骨架屏和 SSR 性能优化方案。在实际当中，你可能会问了：SSR 说了这么多优点，为什么没全量普及，替代掉 CSR？")]),t._v(" "),a("p",{attrs:{"data-nodeid":"653"}},[t._v("这是因为， SSR 需要你对后端知识，尤其是 Node.js 知识有很好地把握，且具备一定的数据接口设计规划和设计能力，但许多前端工程师很容易忽视这方面的学习。还有，SSR 渲染进行的页面，一些事件还在绑定中，有可能会出现操作没反应的情形；一些环境变量（如 window、document ）获取不到，稍不注意也会遇到内存泄漏的问题。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"654"}},[t._v("当然，这些对于白屏 100ms 的效果实现，都是非常值得的，而且前者可以通过提前安排Node.js 服务端开发相关培训来解决，后者可以通过整理一份 SSR 开发规范，将一步步蹚过的坑和宝贵经验沉淀下来。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"655"}},[t._v("下面给你留一个思考题：")]),t._v(" "),a("blockquote",{attrs:{"data-nodeid":"656"}},[a("p",{attrs:{"data-nodeid":"657"}},[t._v("SSR 方案和前面提到离线化方案有什么区别？")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"658"}},[t._v("可以写到下面的留言区哦。接下来我们将进入下一讲 —— WebView 层及代码架构层面优化。")]),t._v(" "),a("hr"),t._v(" "),a("h3",{attrs:{id:"精选评论"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#精选评论"}},[t._v("#")]),t._v(" 精选评论")])])}),[],!1,null,null,null);a.default=v.exports}}]);