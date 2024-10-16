(window.webpackJsonp=window.webpackJsonp||[]).push([[234],{569:function(v,e,_){"use strict";_.r(e);var t=_(4),s=Object(t.a)({},(function(){var v=this,e=v._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("p",[v._v("模块化的演进过程")]),v._v(" "),e("ol",[e("li",[e("p",[v._v("Stage 1 - 文件划分方式")]),v._v(" "),e("p",[v._v("最早我们会基于文件划分的方式实现模块化，也就是 Web 最原始的模块系统。具体做法是将每个功能及其相关状态数据各自单独放到不同的 JS 文件中，约定每个文件是一个独立的模块。使用某个模块将这个模块引入到页面中，一个 script 标签对应一个模块，然后直接调用模块中的成员（变量 / 函数）。")])])]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/1636444597(1).png",alt:"1636444597(1)"}})]),v._v(" "),e("p",[v._v("缺点：")]),v._v(" "),e("ul",[e("li",[v._v("模块直接在全局工作，大量模块成员污染全局作用域；")]),v._v(" "),e("li",[v._v("没有私有空间，所有模块内的成员都可以在模块外部被访问或者修改；")]),v._v(" "),e("li",[v._v("一旦模块增多，容易产生命名冲突；")]),v._v(" "),e("li",[v._v("无法管理模块与模块之间的依赖关系；")]),v._v(" "),e("li",[v._v("在维护的过程中也很难分辨每个成员所属的模块。")])]),v._v(" "),e("p",[v._v("总之，这种原始“模块化”的实现方式完全依靠约定实现，一旦项目规模变大，这种约定就会暴露出种种问题，非常不可靠，所以我们需要尽可能解决这个过程中暴露出来的问题。")]),v._v(" "),e("h4",[v._v("2. Stage 2 – 命名空间方式")]),v._v(" "),e("p",[v._v("后来，我们约定每个模块只暴露一个全局对象，所有模块成员都挂载到这个全局对象中，具体做法是在第一阶段的基础上，通过将每个模块“包裹”为一个全局对象的形式实现，这种方式就好像是为模块内的成员添加了“命名空间”，所以我们又称之为命名空间方式。\n")]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/1636444772(1).png",alt:"1636444772(1)"}})]),v._v(" "),e("p",[v._v("这种命名空间的方式只是解决了命名冲突的问题，但是其它问题依旧存在。")]),v._v(" "),e("h4",[v._v("3. Stage 3 – IIFE")]),v._v(" "),e("p",[v._v("使用立即执行函数表达式（IIFE，Immediately-Invoked Function Expression）为模块提供私有空间。具体做法是将每个模块成员都放在一个立即执行函数所形成的私有作用域中，对于需要暴露给外部的成员，通过挂到全局对象上的方式实现。")]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/1636444853(1).png",alt:"1636444853(1)"}})]),v._v(" "),e("p",[v._v("这种方式带来了私有成员的概念，私有成员只能在模块成员内通过闭包的形式访问，这就解决了前面所提到的全局作用域污染和命名冲突的问题。")]),v._v(" "),e("h4",[v._v("4. Stage 4 - IIFE 依赖参数")]),v._v(" "),e("p",[v._v("在 IIFE 的基础之上，我们还可以利用 IIFE 参数作为依赖声明使用，这使得每一个模块之间的依赖关系变得更加明显。")]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/1636444917(1).png",alt:"1636444917(1)"}})]),v._v(" "),e("h4",[v._v("模块加载的问题")]),v._v(" "),e("p",[v._v("以上 4 个阶段是早期的开发者在没有工具和规范的情况下对模块化的落地方式，这些方式确实解决了很多在前端领域实现模块化的问题，但是仍然存在一些没有解决的问题。")]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/1636444943(1).png",alt:"1636444943(1)"}})]),v._v(" "),e("p",[v._v("最明显的问题就是：模块的加载。在这几种方式中虽然都解决了模块代码的组织问题，但模块加载的问题却被忽略了，我们都是通过 script 标签的方式直接在页面中引入的这些模块，这意味着模块的加载并不受代码的控制，时间久了维护起来会十分麻烦。试想一下，如果你的代码需要用到某个模块，如果 HTML 中忘记引入这个模块，又或是代码中移除了某个模块的使用，而 HTML 还忘记删除该模块的引用，都会引起很多问题和不必要的麻烦。")]),v._v(" "),e("p",[v._v("更为理想的方式应该是在页面中引入一个 JS 入口文件，其余用到的模块可以通过代码控制，按需加载进来。")]),v._v(" "),e("h4",[v._v("模块化规范的出现")]),v._v(" "),e("p",[v._v("除了模块加载的问题以外，目前这几种通过约定实现模块化的方式，不同的开发者在实施的过程中会出现一些细微的差别，因此，为了统一不同开发者、不同项目之间的差异，我们就需要制定一个行业标准去规范模块化的实现方式。")]),v._v(" "),e("p",[v._v("再接合我们刚刚提到的模块加载的问题，我们现在的需求就是两点：")]),v._v(" "),e("ul",[e("li",[v._v("一个统一的模块化标准规范")]),v._v(" "),e("li",[v._v("一个可以自动加载模块的基础库")])]),v._v(" "),e("p",[v._v("提到模块化规范，你可能会想到 `CommonJS` 规范，它是 Node.js 中所遵循的模块规范，该规范约定，一个文件就是一个模块，每个模块都有单独的作用域，通过 module.exports 导出成员，再通过 require 函数载入模块。现如今的前端开发者应该对其有所了解，但是如果我们想要在浏览器端直接使用这个规范，那就会出现一些新的问题。")]),v._v(" "),e("p",[v._v("如果你对 Node.js 的模块加载机制有所了解，那么你应该知道，CommonJS 约定的是以同步的方式加载模块，因为 Node.js 执行机制是在启动时加载模块，执行过程中只是使用模块，所以这种方式不会有问题。但是如果要在浏览器端使用同步的加载模式，就会引起大量的同步模式请求，导致应用运行效率低下。")]),v._v(" "),e("p",[v._v("所以在早期制定前端模块化标准时，并没有直接选择 CommonJS 规范，而是专门为浏览器端重新设计了一个规范，叫做 AMD （ Asynchronous Module Definition） 规范，即异步模块定义规范。同期还推出了一个非常出名的库，叫做 Require.js，它除了实现了 AMD 模块化规范，本身也是一个非常强大的模块加载器。")]),v._v(" "),e("p",[v._v("在 AMD 规范中约定每个模块通过 define() 函数定义，这个函数默认可以接收两个参数，第一个参数是一个数组，用于声明此模块的依赖项；第二个参数是一个函数，参数与前面的依赖项一一对应，每一项分别对应依赖项模块的导出成员，这个函数的作用就是为当前模块提供一个私有空间。如果在当前模块中需要向外部导出成员，可以通过 return 的方式实现。")]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/1636445123(1).png",alt:"1636445123(1)"}})]),v._v(" "),e("p",[v._v("除此之外，Require.js 还提供了一个 require() 函数用于自动加载模块，用法与 define() 函数类似，区别在于 require() 只能用来载入模块，而  define() 还可以定义模块。当 Require.js 需要加载一个模块时，内部就会自动创建 script 标签去请求并执行相应模块的代码。")]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211109160948.png",alt:"20211109160948"}})]),v._v(" "),e("p",[v._v("目前绝大多数第三方库都支持 AMD 规范，但是它使用起来相对复杂，而且当项目中模块划分过于细致时，就会出现同一个页面对 js 文件的请求次数过多的情况，从而导致效率降低。在当时的环境背景下，AMD 规范为前端模块化提供了一个标准，但这只是一种妥协的实现方式，并不能成为最终的解决方案。")]),v._v(" "),e("p",[v._v("同期出现的规范还有淘宝的 Sea.js，只不过它实现的是另外一个标准，叫作 CMD，这个标准类似于 CommonJS，在使用上基本和 Require.js 相同，可以算上是重复的轮子。但随着前端技术的发展，Sea.js 后来也被 Require.js 兼容了。如果你感兴趣可以课后了解一下 "),e("a",{attrs:{href:"https://seajs.github.io/seajs/docs/"}},[v._v("Seajs官网")]),v._v("。")]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211109161100.png",alt:"20211109161100"}})]),v._v(" "),e("h4",[v._v("模块化的标准规范")]),v._v(" "),e("p",[v._v("尽管上面介绍的这些方式和标准都已经实现了模块化，但是都仍然存在一些让开发者难以接受的问题。")]),v._v(" "),e("p",[v._v("随着技术的发展，JavaScript 的标准逐渐走向完善，可以说，如今的前端模块化已经发展得非常成熟了，而且对前端模块化规范的最佳实践方式也基本实现了统一。")]),v._v(" "),e("ul",[e("li",[v._v("在 Node.js 环境中，我们遵循 CommonJS 规范来组织模块。")]),v._v(" "),e("li",[v._v("在浏览器环境中，我们遵循 ES Modules 规范。")])]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/1636445499(1).png",alt:"1636445499(1)"}})]),v._v(" "),e("p",[v._v("而且在最新的 Node.js 提案中表示，Node 环境也会逐渐趋向于 ES Modules 规范，也就是说作为现阶段的前端开发者，应该重点掌握 ES Modules 规范。")]),v._v(" "),e("p",[v._v("因为 CommonJS 属于内置模块系统，所以在 Node.js 环境中使用时不存在环境支持问题，只需要直接遵循标准使用 require 和 module 即可。")]),v._v(" "),e("p",[v._v("但是对于 ES Modules 规范来说，情况会相对复杂一些。我们知道 ES Modules 是 ECMAScript 2015（ES6）中才定义的模块系统，也就是说它是近几年才制定的标准，所以肯定会存在环境兼容的问题。在这个标准刚推出的时候，几乎所有主流的浏览器都不支持。但是随着 Webpack 等一系列打包工具的流行，这一规范才开始逐渐被普及。")]),v._v(" "),e("p",[v._v("经过 5 年的迭代， ES Modules 已发展成为现今最主流的前端模块化标准。相比于 AMD 这种社区提出的开发规范，ES Modules 是在语言层面实现的模块化，因此它的标准更为完善也更为合理。而且目前绝大多数浏览器都已经开始能够原生支持 ES Modules 这个特性了，所以说在未来几年，它还会有更好的发展，短期内应该不会有新的轮子出现了。")]),v._v(" "),e("p",[v._v("综上所述，如何在不同的环境中去更好的使用 ES Modules 将是你重点考虑的问题。")]),v._v(" "),e("h3",[v._v("ES Modules 特性")]),v._v(" "),e("p",[v._v("那对于 ES Modules 的学习，可以从两个维度入手。首先，你需要了解它作为一个规范或者说标准，到底约定了哪些特性和语法；其次，你需要学习如何通过一些工具和方案去解决运行环境兼容带来的问题。")]),v._v(" "),e("p",[v._v("针对 ES Modules 本身的一些特性本课时不做赘述，你可以参考：")]),v._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules"}},[v._v("MDN 官方的详细资料")])]),v._v(" "),e("li",[e("a",{attrs:{href:"http://www.ecma-international.org/ecma-262/6.0/#sec-modules"}},[v._v("ECMAScript 官方详细资料")])])]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/1636445607(1).png",alt:"1636445607(1)"}})]),v._v(" "),e("h3",[v._v("模块打包工具的出现")]),v._v(" "),e("p",[v._v("模块化可以帮助我们更好地解决复杂应用开发过程中的代码组织问题，但是随着模块化思想的引入，我们的前端应用又会产生了一些新的问题，比如：")]),v._v(" "),e("ul",[e("li",[v._v("首先，我们所使用的 ES Modules 模块系统本身就存在环境兼容问题。尽管现如今主流浏览器的最新版本都支持这一特性，但是目前还无法保证用户的浏览器使用情况。所以我们还需要解决兼容问题。")]),v._v(" "),e("li",[v._v("其次，模块化的方式划分出来的模块文件过多，而前端应用又运行在浏览器中，每一个文件都需要单独从服务器请求回来。零散的模块文件必然会导致浏览器的频繁发送网络请求，影响应用的工作效率。")]),v._v(" "),e("li",[v._v("最后，谈一下在实现 JS 模块化的基础上的发散。随着应用日益复杂，在前端应用开发过程中不仅仅只有 JavaScript 代码需要模块化，HTML 和 CSS 这些资源文件也会面临需要被模块化的问题。而且从宏观角度来看，这些文件也都应该看作前端应用中的一个模块，只不过这些模块的种类和用途跟 JavaScript 不同。")])]),v._v(" "),e("p",[v._v("对于开发过程而言，模块化肯定是必要的，所以我们需要在前面所说的模块化实现的基础之上引入更好的方案或者工具，去解决上面提出的 3 个问题，让我们的应用在开发阶段继续享受模块化带来的优势，又不必担心模块化对生产环境所产生的影响。")]),v._v(" "),e("p",[v._v("接下来我们先对这个更好的方案或者工具提出一些设想：")]),v._v(" "),e("ul",[e("li",[v._v("第一，它需要具备编译代码的能力，也就是将我们开发阶段编写的那些包含新特性的代码转换为能够兼容大多数环境的代码，解决我们所面临的环境兼容问题。")])]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/1636445685(1).png",alt:"1636445685(1)"}})]),v._v(" "),e("ul",[e("li",[v._v("第二，能够将散落的模块再打包到一起，这样就解决了浏览器频繁请求模块文件的问题。这里需要注意，只是在开发阶段才需要模块化的文件划分，因为它能够帮我们更好地组织代码，到了实际运行阶段，这种划分就没有必要了。")])]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211109161534.png",alt:"20211109161534"}})]),v._v(" "),e("ul",[e("li",[v._v("第三，它需要支持不同种类的前端模块类型，也就是说可以将开发过程中涉及的样式、图片、字体等所有资源文件都作为模块使用，这样我们就拥有了一个统一的模块化方案，所有资源文件的加载都可以通过代码控制，与业务代码统一维护，更为合理。")])]),v._v(" "),e("p",[e("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211109161602.png",alt:"20211109161602"}})]),v._v(" "),e("p",[v._v("针对上面第一、第二个设想，我们可以借助 Gulp 之类的构建系统配合一些编译工具和插件去实现，但是对于第三个可以对不同种类资源进行模块化的设想，就很难通过这种方式去解决了，所以就有了我们接下来要介绍的主题：前端模块打包工具。")]),v._v(" "),e("h3",[v._v("写在最后")]),v._v(" "),e("p",[v._v("本课时重点介绍了前端模块化的发展过程和最终的统一的 ES Modules 标准，这些都是我们深入学习 Webpack 前必须要掌握的内容，同时也是现代前端开发者必不可少的基础储备，请你务必要掌握。")]),v._v(" "),e("p",[v._v("学到这里，你可能会有这样的疑问，本课时的内容是否偏离了主题？但其实我想传达的思想是，虽然 Webpack 发展到今天，它的功能已经非常强大了，但依然改变不了它是一个模块化解决方案的初衷。你可以看到， Webpack 官方的 Slogan 仍然是："),e("em",[v._v("A bundler for javascript and friends（一个 JavaScript 和周边的打包工具）")]),v._v("。")]),v._v(" "),e("p",[v._v("从另外一个角度来看，Webpack 从一个“打包工具”，发展成现在开发者眼中对整个前端项目的“构建系统”，表面上似乎只是称呼发生了变化，但是这背后却透露出来一个信号：模块化思想是非常伟大的，伟大到可以帮你“统治”前端整个项目。这也足以见得模块化思想背后还有很多值得我们思考的内容。")]),v._v(" "),e("p",[v._v("总的来说，我们可以把 Webpack 看作现代化前端应用的“管家”，这个“管家”所践行的核心理论就是“模块化”，也就是说 "),e("strong",[v._v("Webpack 以模块化思想为核心，帮助开发者更好的管理整个前端工程。")])]),v._v(" "),e("hr"),v._v(" "),e("h3",{attrs:{id:"精选评论"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#精选评论"}},[v._v("#")]),v._v(" 精选评论")]),v._v(" "),e("h5",{attrs:{id:"诚"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#诚"}},[v._v("#")]),v._v(" **诚")]),v._v(" "),e("blockquote",[e("p",[v._v("老师，请问下，import 或者 require 是怎么加载文件的，比如我 A 文件中 import/require 了一个 B.js 文件，那么这个 A 文件是将 B.js 代码复制了一份，还是以“引用”的形式引入进来的？如果是“引用”的形式，那会不会产生我在 A 中修改了 B.js 中的某个变量数据，导致 C 文件引用的 B.js 也发生变化？")])]),v._v(" "),e("h6",{attrs:{id:"讲师回复"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#讲师回复"}},[v._v("#")]),v._v("     讲师回复")]),v._v(" "),e("blockquote",[e("p",[v._v("    不同的文件得到的是不同的实例对象，内存地址不同")])])])}),[],!1,null,null,null);e.default=s.exports}}]);