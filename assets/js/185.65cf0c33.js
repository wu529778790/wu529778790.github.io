(window.webpackJsonp=window.webpackJsonp||[]).push([[185],{522:function(t,n,e){"use strict";e.r(n);var s=e(4),a=Object(s.a)({},(function(){var t=this,n=t._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("p",[t._v("数据劫持--\x3e模板解析--\x3e模板渲染--\x3e数据变化视图自动更新整个流程")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211104233248.png",alt:"20211104233248"}})]),t._v(" "),n("ul",[n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6935344605424517128",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（一）-响应式数据原理"),n("OutboundLink")],1),t._v(" "),n("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211103154041.png",alt:"20211103154041"}})])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6936024530016010276",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（二）-模板编译原理"),n("OutboundLink")],1),t._v(" "),n("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211103170707.png",alt:"20211103170707"}})]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// src/compiler/index.js")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" parse "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./parse"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" generate "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./codegen"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("compileToFunctions")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("template")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 我们需要把html字符串变成render函数")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1.把html代码转成ast语法树  ast用来描述代码本身形成树结构 不仅可以描述html 也能描述css以及js语法")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 很多库都运用到了ast 比如 webpack babel eslint等等")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" ast "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("template"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2.优化静态节点")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这个有兴趣的可以去看源码  不影响核心功能就不实现了")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   if (options.optimize !== false) {")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//     optimize(ast, options);")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   }")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3.通过ast 重新生成代码")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 我们最后生成的代码需要和render函数一样")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 类似_c('div',{id:\"app\"},_c('div',undefined,_v(\"hello\"+_s(name)),_c('span',undefined,_v(\"world\"))))")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// _c代表创建元素 _v代表创建文本 _s代表文Json.stringify--把对象解析成文本")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" code "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("generate")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ast"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" renderFn "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("with(this){return ")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("code"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" renderFn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6937120983765483528",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（三）-初始渲染原理"),n("OutboundLink")],1)]),t._v(" "),n("p",[n("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211103172427.png",alt:"20211103172427"}})]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// src/lifecycle.js")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("mountComponent")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("vm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" el")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 上一步模板编译解析生成了render函数")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 下一步就是执行vm._render()方法 调用生成的render函数 生成虚拟dom")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 最后使用vm._update()方法把虚拟dom渲染到页面")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 真实的el选项赋值给实例的$el属性 为之后虚拟dom产生的新的dom替换老的dom做铺垫")]),t._v("\n  vm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$el "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" el"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   _update和._render方法都是挂载在Vue原型的方法  类似_init")]),t._v("\n  vm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("_update")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("vm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("_render")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6938221715281575973",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（四）-渲染更新原理"),n("OutboundLink")],1),t._v("\nwatcher 是观察者，dep 是被观察者，subs 里面收集 watcher 当数据变动的时候通知自身 subs 所有的 watcher 更新\n"),n("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211104232805.png",alt:"20211104232805"}})])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6939704519668432910",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（五）-异步更新原理"),n("OutboundLink")],1),t._v(" "),n("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211104233834.png",alt:"20211104233834"}})])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6953433215218483236",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（六）-diff 算法原理"),n("OutboundLink")],1),t._v(" "),n("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211104234144.png",alt:"20211104234144"}})])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6951671158198501383",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（七）-Mixin 混入原理"),n("OutboundLink")],1),t._v(" "),n("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211104234523.png",alt:"20211104234523"}})])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6954173708344770591",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（八）-组件原理"),n("OutboundLink")],1)])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6954925963226382367",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（九）-侦听属性原理"),n("OutboundLink")],1)])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6956407362085191717",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（十）-计算属性原理"),n("OutboundLink")],1)])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6959016804349902884",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 Vue2.0 源码（十一）-全局 api 原理"),n("OutboundLink")],1)])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6961222829979697165",target:"_blank",rel:"noopener noreferrer"}},[t._v("最全的 Vue 面试题+详解答案"),n("OutboundLink")],1)])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6935344605424517128#heading-7",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 vue-router 源码"),n("OutboundLink")],1)])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6935344605424517128#heading-7",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 vuex 源码"),n("OutboundLink")],1)])]),t._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6935344605424517128#heading-7",target:"_blank",rel:"noopener noreferrer"}},[t._v("手写 vue3.0 源码"),n("OutboundLink")],1)])])])])}),[],!1,null,null,null);n.default=a.exports}}]);