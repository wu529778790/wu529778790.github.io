(window.webpackJsonp=window.webpackJsonp||[]).push([[216],{554:function(s,a,t){"use strict";t.r(a);var n=t(4),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("记得那是 2014 年我刚入职 58，负责整个集团前端团队，有一天公司老板突然发话，希望从整体上优化一下 M 站性能。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"806"}},[s._v("根据过往经验，我先是和资深前端工程师 F 同学说了下我的想法，然后让他来给出具体方案。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"807"}},[s._v("半个小时后，F 同学就找到我说：“老大，我感觉你想多了，我们只要把首屏慢的问题给解决就行了，还需要做啥首屏指标采集，本质上还是要解决问题嘛。”")]),s._v(" "),a("p",{attrs:{"data-nodeid":"808"}},[s._v("我说：“你如果能解决当然更好了。”很快 F 同学又给了我一个结论：我们列表页的首屏时间没问题。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"809"}},[s._v("为什么会得出这个结论呢？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"810"}},[s._v("原来，F 同学是在内网通过 Chrome DevTools 观察首屏时间的，这样内外网络环境就不同，首屏时间也会受到影响；还有，他使用的是调试工具，而用户是直接访问的，访问方式不同；最后，他观察首屏时间的手机只有几种，而真实用户人不同，手机型号也有很大不同。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"811"}},[s._v("如此复杂的环境，我们到底该如何了解用户的首屏时间？大量用户的首屏时间分布又是怎样的？性能差的用户首屏时间是多少？想要了解这些并对首屏时间进行优化，我们首先要做的就是首屏指标采集。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"812"}},[s._v("那么，具体都有哪些采集方式呢？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"813"}},[s._v("在实际当中，首屏指标采集有手动采集和自动化采集两种，接下来我就来为你分别介绍下。")]),s._v(" "),a("h3",{attrs:{"data-nodeid":"814"}},[s._v("手动采集办法及优缺点")]),s._v(" "),a("p",{attrs:{"data-nodeid":"815"}},[a("strong",{attrs:{"data-nodeid":"910"}},[s._v("所谓手动采集，一般是通过埋点的方式进行，")]),s._v(" 比如在页面开始位置打上 FMP.Start()，在首屏结束位置打上 FMP.End()，利用 FMP.End()-FMP.Start() 获取到首屏时间。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"816"}},[s._v("以电商平台为例，如果是电商类商品详情页，首屏包括头图、购买、商品信息、下单按钮等，就在这些内容加载完毕的位置打上首屏结束的点。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"817"}},[s._v("如果是电商列表页，瀑布流型的页面，需要根据各个机型下的首屏位置，估算一个平均的首屏位置，然后打上点。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"818"}},[s._v("如果是直播型的页面，页面核心是一个直播框，就需要在直播框的结束位置，打上点。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"819"}},[s._v("手动采集都有哪些优点和缺点呢？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"820"}},[s._v("首先是它兼容性强，业务同学知道在这个业务场景下首屏结束点在哪里，可以随情况变动。其次是去中心化，各个业务负责自己的打点代码，有问题时业务同学去排查即可，假如一条业务出现问题，并不会影响其他业务。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"821"}},[s._v("缺点方面，手动采集会和业务代码严重耦合，如果首屏采集逻辑调整，业务代码也需要修改；还有，它的覆盖率不足，因为要手动采集，业务一旦忙起来，性能优化方案就会延迟排后。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"822"}},[s._v("最后，手动采集的统计结果并不精确，因为依赖于人，每个人对首屏的理解有偏差，经常打错或者忘记打点。")]),s._v(" "),a("h3",{attrs:{"data-nodeid":"823"}},[s._v("自动化采集优势及办法")]),s._v(" "),a("p",{attrs:{"data-nodeid":"824"}},[s._v("接下来我们看自动化采集。获取首屏时间，目前业界还是以自动化采集为主。"),a("strong",{attrs:{"data-nodeid":"924"}},[s._v("所谓自动化采集，即引入一段通用的代码来做首屏时间自动化采集，引入过程中，除了必要的配置不需要做其他事情")]),s._v("。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"825"}},[s._v("自动化采集的好处是独立性更强，接入过程更自动化。具体的自动化采集代码，可以由一个公共团队来开发，试点后，推广到各个业务团队。而且统计结果更标准化，同一段统计代码，标准更统一，业务侧同学也更认可这个统计结果。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"826"}},[s._v("当然，它也有缺点，最明显的是，有些个性化需求无法满足，毕竟在工作中，总会有一些特殊业务场景。所以，采用自动化采集方案必须做一些取舍。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"827"}},[s._v("既然是自动化采集，具体怎么采集呢？都有哪些办法？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"828"}},[s._v("首屏指标自动化采集，需要考虑是服务端模板业务，还是单页面（SPA）应用开发业务，业务场景不同，对应的采集方法也不同。下面我来分别介绍下。")]),s._v(" "),a("h4",{attrs:{"data-nodeid":"829"}},[s._v("服务端模板业务下的采集办法")]),s._v(" "),a("p",{attrs:{"data-nodeid":"830"}},[s._v("提到服务端模板业务，很多人可能会问，现在不都是 Vue 和 React 这些单页面应用的天下了吗？其实在一些 B 端业务的公司用的还是服务端模板，如 Velocity、Smarty 等。另外大名鼎鼎的 SSR 用的也是服务端模板。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"831"}},[s._v("这些业务后端比较重，前端偏配合，出于效率方面的考虑，前后端并没有解耦。因此，公司内部研发同学既做前端又做后端，这时候如果使用现在流行的 Vue/React，无疑会增加学习成本。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"832"}},[s._v("那服务端模板项目的加载流程是怎样的呢？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"833"}},[s._v("大致流程是这样的：HTTP 请求 → HTML 文档加载解析完成 → 加载样式和脚本文件 → 完成页面渲染。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"834"}},[s._v("其中，HTML 文档加载解析完成的时间点，就是首屏时间点，而要采集这个首屏时间，可以用浏览器提供的 DOMContentLoaded 接口来实现。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"835"}},[s._v("我们来直观看一下什么是 DOMContentLoaded。打开 Chrome 浏览器调试工具，进入 Network 选项，重新加载网页，我们就会得到这么一张图。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"836"}},[a("img",{attrs:{src:"https://s0.lgstatic.com/i/image6/M01/0F/EB/Cgp9HWA-BM6AF77NAAHEtECWVO0860.png",alt:"Drawing 0.png","data-nodeid":"938"}})]),s._v(" "),a("div",{attrs:{"data-nodeid":"837"}},[a("p",{staticStyle:{"text-align":"center"}},[s._v("DOMContentLoaded 示意图")])]),s._v(" "),a("p",{attrs:{"data-nodeid":"838"}},[s._v("右侧中间竖向的一条蓝线，代表了 DOMContentLoaded 这个事件触发的时间，而下面的蓝色文字（DOMContentLoaded 1.02s），代表 HTML 元素加载解析完成用了 1.02 秒。根据服务端模板项目加载流程，我们就知道这个时间就是首屏时间。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"839"}},[s._v("那么，DOMContentLoaded 时间具体的采集思路是怎样的呢？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"840"}},[s._v("当页面中的 HTML 元素被加载和解析完成（不需要等待样式表、图片和一些脚本的加载过程），DOMContentLoaded 事件触发。此时我们记录下当前时间 domContentLoadedEventEnd，再减去页面初始进入的时间 fetchStart，就是 DOMContentLoaded 的时间，也就是我们要采集的首屏时间。"),a("br"),s._v("\n即首屏时间=DOMContentLoaded 时间=domContentLoadedEventEnd-fetchStart。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"841"}},[s._v("那么，这种采集方法可以照搬到单页面应用下吗？答案是不可以。")]),s._v(" "),a("h4",{attrs:{"data-nodeid":"842"}},[s._v("单页面（SPA）应用业务下的采集办法")]),s._v(" "),a("p",{attrs:{"data-nodeid":"843"}},[s._v("SPA 页面首屏时间采集会有什么不同？如果也使用 Performance API 会有什么问题？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"844"}},[s._v("我举个例子，在 2018 年 6 月的 GMTC 大会上，阿里云曾分享了他们的一个首屏指标采集结果：")]),s._v(" "),a("blockquote",{attrs:{"data-nodeid":"845"}},[a("p",{attrs:{"data-nodeid":"846"}},[s._v("使用 Performance API 接口采集的首屏时间是 1106ms"),a("br"),s._v("\n实际的首屏时间是 1976ms")])]),s._v(" "),a("p",{attrs:{"data-nodeid":"847"}},[s._v("为什么偏差如此大呢？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"848"}},[s._v("原来在 Vue 页面中，整体加载流程是这样的。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"849"}},[s._v("用户请求一个页面时，页面会先加载 index.html，加载完成后，就会触发 DOMContentLoaded 和 load。而这个时候，页面展示的只是个空白页。此时根本不算真正意义的首屏。接下来，页面会加载相关脚本资源并通过 axios 异步请求数据，使用数据渲染页面主题部分，这个时候首屏才渲染完成。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"850"}},[s._v("正是这个原因造成了用 Performance 接口取得的时间是 1106ms，实际时间则是 1976ms，差距如此之大。可以说，SPA 的流行让 Performance 接口失去了原来的意义。那么，这种情况下怎么采集首屏指标呢？可以使用 MutationObserver 采集首屏时间。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"851"}},[s._v("SPA 页面因为无法基于 DOMContentLoaded 做首屏指标采集，最初我们想过使用技术栈的生命周期来解决这个问题。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"852"}},[s._v("比如，我们以 Vue 为例，记录首屏各个组件 mounted 的时间，最终在 onload 时，统计出最后一个组件 mounted 的时间，做为首屏时间。但很快，我就发现这个方案存在以下问题。")]),s._v(" "),a("ol",{attrs:{"data-nodeid":"853"}},[a("li",{attrs:{"data-nodeid":"854"}},[a("p",{attrs:{"data-nodeid":"855"}},[s._v("如果一个首屏页面的内容没有被组件化，那么首屏时间无法被统计到，除非各个业务都定一套组件标准，首屏内容必须封装成组件。")])]),s._v(" "),a("li",{attrs:{"data-nodeid":"856"}},[a("p",{attrs:{"data-nodeid":"857"}},[s._v("前面也提过 onload 的时间并非最终时间，可能 onload 时，首屏还没加载完。")])]),s._v(" "),a("li",{attrs:{"data-nodeid":"858"}},[a("p",{attrs:{"data-nodeid":"859"}},[s._v("没有考虑首屏是张图片的情况，在这种情况，首屏虽然加载完成了，可是图片是异步的，图片并没有加载，试想你会在看不到商品图片的情况下，直接下单吗？")])])]),s._v(" "),a("p",{attrs:{"data-nodeid":"860"}},[s._v("当时我们就想，如果能在首屏渲染过程中，把各个资源的加载时间记录到日志中，后续再通过分析，确定某一个资源加载完的时间，就是首屏时间。而 MutationObserver 恰恰可以做到这些。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"861"}},[s._v("MutationObserver 是什么意思呢？请看 MDN 上关于它的定义：")]),s._v(" "),a("blockquote",{attrs:{"data-nodeid":"862"}},[a("p",{attrs:{"data-nodeid":"863"}},[s._v("MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。")])]),s._v(" "),a("p",{attrs:{"data-nodeid":"864"}},[s._v("简单来说， 使用 MutationObserver 能监控页面信息的变化，当页面 body 变化最剧烈的时候，我们拿到的时间数据，就是首屏时间。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"865"}},[s._v("但具体怎么做呢？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"866"}},[s._v("首先，在用户进入页面时，我们可以使用 MutationObserver 监控 DOM 元素 （Document Object Model，文档对象模型）。当 DOM 元素发生变化时，程序会标记变化的元素，记录时间点和分数，存储到数组中。数据的格式类似于 [200ms,18.5] 。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"867"}},[s._v("为了提升计算的效率，我们认为首屏指标采集到某些条件时，首屏渲染已经结束，我们需要考虑首屏采集终止的条件，即计算时间超过 30 秒还没有结束；计算了 4 轮且 1 秒内分数不再变化；计算了 9 次且分数不再变化。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"868"}},[s._v("接下来，设定元素权重计算分数。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"869"}},[s._v("递归遍历 DOM 元素及其子元素，根据子元素所在层数设定元素权重，比如第一层元素权重是 1，当它被渲染时得 1 分，每增加一层权重增加 0.5，比如第五层元素权重是 3.5，渲染时给出对应分数。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"870"}},[s._v("为什么需要权重呢？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"871"}},[s._v("因为页面中每个 DOM 元素对于首屏的意义是不同的，越往内层越接近真实的首屏内容，如图片和文字，越往外层越接近 body 等框架层。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"872"}},[s._v("最后，根据前面的得分，计算元素的分数变化率，获取变化率最大点对应的分数。然后找到该分数对应的时间，即为首屏时间。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"873"}},[s._v("分数部分核心计算逻辑是递归遍历元素，将一些无用的标签排除，如果元素超过可视范围返回 0 分，每一层增加 0.5 的权重，具体请看下面代码示例。")]),s._v(" "),a("pre",{staticClass:"lang-javascript",attrs:{"data-nodeid":"874"}},[a("code",{attrs:{"data-language":"javascript"}},[a("span",{staticClass:"hljs-function"},[a("span",{staticClass:"hljs-keyword"},[s._v("function")]),s._v(" "),a("span",{staticClass:"hljs-title"},[s._v("CScor")]),s._v("("),a("span",{staticClass:"hljs-params"},[s._v("el, tiers, parentScore")]),s._v(") ")]),s._v("{\n  "),a("span",{staticClass:"hljs-keyword"},[s._v("let")]),s._v(" score = "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(";\n  "),a("span",{staticClass:"hljs-keyword"},[s._v("const")]),s._v(" tagName = el.tagName;\n  "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" ("),a("span",{staticClass:"hljs-string"},[s._v('"SCRIPT"')]),s._v(" !== tagName && "),a("span",{staticClass:"hljs-string"},[s._v('"STYLE"')]),s._v(" !== tagName && "),a("span",{staticClass:"hljs-string"},[s._v('"META"')]),s._v(" !== tagName && "),a("span",{staticClass:"hljs-string"},[s._v('"HEAD"')]),s._v(" !== tagName) {\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("const")]),s._v(" childrenLen = el.children ? el.children.length : "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(";\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (childrenLen > "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(") "),a("span",{staticClass:"hljs-keyword"},[s._v("for")]),s._v(" ("),a("span",{staticClass:"hljs-keyword"},[s._v("let")]),s._v(" childs = el.children, len = childrenLen - "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v("; len >= "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v("; len--) {\n    score += calculateScore(childs[len], tiers + "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v(", score > "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(");\n   }\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (score <= "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(" && !parentScore) {\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (!(el.getBoundingClientRect && el.getBoundingClientRect().top < WH)) "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(";\n   }\n   score += "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v(" + "),a("span",{staticClass:"hljs-number"},[s._v(".5")]),s._v(" *tiers;\n  }\n  "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" score;\n }\n")])]),s._v(" "),a("p",{attrs:{"data-nodeid":"875"}},[s._v("变化率部分核心计算逻辑是获取 DOM 变化最大时对应的时间，代码如下所示。")]),s._v(" "),a("pre",{staticClass:"lang-javascript",attrs:{"data-nodeid":"876"}},[a("code",{attrs:{"data-language":"javascript"}},[s._v("calFinallScore() {\n  "),a("span",{staticClass:"hljs-keyword"},[s._v("try")]),s._v(" {\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" ("),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".sendMark) "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(";\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("const")]),s._v(" time = "),a("span",{staticClass:"hljs-built_in"},[s._v("Date")]),s._v(".now() - performance.timing.fetchStart;\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" isCheckFmp = time > "),a("span",{staticClass:"hljs-number"},[s._v("30000")]),s._v(" || SCORE_ITEMS && SCORE_ITEMS.length > "),a("span",{staticClass:"hljs-number"},[s._v("4")]),s._v(" && time - (SCORE_ITEMS && SCORE_ITEMS.length && SCORE_ITEMS[SCORE_ITEMS.length - "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v("].t || "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(") > "),a("span",{staticClass:"hljs-number"},[s._v("2")]),s._v("* CHECK_INTERVAL || (SCORE_ITEMS.length > "),a("span",{staticClass:"hljs-number"},[s._v("10")]),s._v(" && "),a("span",{staticClass:"hljs-built_in"},[s._v("window")]),s._v(".performance.timing.loadEventEnd !== "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(" && SCORE_ITEMS[SCORE_ITEMS.length - "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v("].score === SCORE_ITEMS[SCORE_ITEMS.length - "),a("span",{staticClass:"hljs-number"},[s._v("9")]),s._v("].score);\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" ("),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".observer && isCheckFmp) {\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".observer.disconnect();\n    "),a("span",{staticClass:"hljs-built_in"},[s._v("window")]),s._v(".SCORE_ITEMS_CHART = "),a("span",{staticClass:"hljs-built_in"},[s._v("JSON")]),s._v(".parse("),a("span",{staticClass:"hljs-built_in"},[s._v("JSON")]),s._v(".stringify(SCORE_ITEMS));\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("let")]),s._v(" fmps = getFmp(SCORE_ITEMS);\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("let")]),s._v(" record = "),a("span",{staticClass:"hljs-literal"},[s._v("null")]),s._v("\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("for")]),s._v(" ("),a("span",{staticClass:"hljs-keyword"},[s._v("let")]),s._v(" o = "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v("; o < fmps.length; o++) {\n     "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (fmps[o].t >= fmps[o - "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v("].t) {\n      "),a("span",{staticClass:"hljs-keyword"},[s._v("let")]),s._v(" l = fmps[o].score - fmps[o - "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v("].score;\n      (!record || record.rate <= l) && (record = {\n       "),a("span",{staticClass:"hljs-attr"},[s._v("t")]),s._v(": fmps[o].t,\n       "),a("span",{staticClass:"hljs-attr"},[s._v("rate")]),s._v(": l\n      });\n     }\n    }\n    "),a("span",{staticClass:"hljs-comment"},[s._v("//")]),s._v("\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".fmp = record && record.t || "),a("span",{staticClass:"hljs-number"},[s._v("30001")]),s._v(";\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("try")]),s._v(" {\n     "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".checkImgs("),a("span",{staticClass:"hljs-built_in"},[s._v("document")]),s._v(".body)\n     "),a("span",{staticClass:"hljs-keyword"},[s._v("let")]),s._v(" max = "),a("span",{staticClass:"hljs-built_in"},[s._v("Math")]),s._v(".max(...this.imgs.map("),a("span",{staticClass:"hljs-function"},[a("span",{staticClass:"hljs-params"},[s._v("element")]),s._v(" =>")]),s._v(" {\n      "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v("("),a("span",{staticClass:"hljs-regexp"},[s._v("/^(\\/\\/)/")]),s._v(".test(element)) element = "),a("span",{staticClass:"hljs-string"},[s._v("'https:'")]),s._v(" + element;\n      "),a("span",{staticClass:"hljs-keyword"},[s._v("try")]),s._v(" {\n       "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" performance.getEntriesByName[element]("),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(").responseEnd || "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v("\n      } "),a("span",{staticClass:"hljs-keyword"},[s._v("catch")]),s._v(" (error) {\n       "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v("\n      }\n     }))\n     record && record.t > "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(" && record.t < "),a("span",{staticClass:"hljs-number"},[s._v("36e5")]),s._v(" ? "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".setPerformance({\n      "),a("span",{staticClass:"hljs-attr"},[s._v("fmpImg")]),s._v(": "),a("span",{staticClass:"hljs-built_in"},[s._v("parseInt")]),s._v("("),a("span",{staticClass:"hljs-built_in"},[s._v("Math")]),s._v(".max(record.t , max))\n     }) : "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".setPerformance({});\n    } "),a("span",{staticClass:"hljs-keyword"},[s._v("catch")]),s._v(" (error) {\n     "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".setPerformance({});\n     "),a("span",{staticClass:"hljs-comment"},[s._v("// console.error(error)")]),s._v("\n    }\n   } "),a("span",{staticClass:"hljs-keyword"},[s._v("else")]),s._v(" {\n    setTimeout("),a("span",{staticClass:"hljs-function"},[a("span",{staticClass:"hljs-params"},[s._v("()")]),s._v(" =>")]),s._v(" {\n     "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".calFinallScore();\n    }, CHECK_INTERVAL);\n   }\n  } "),a("span",{staticClass:"hljs-keyword"},[s._v("catch")]),s._v(" (error) {\n"),a("p"),s._v("\n}\n}\n")])]),s._v(" "),a("p",{attrs:{"data-nodeid":"877"}},[s._v("这个就是首屏计算的部分流程。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"878"}},[s._v("看完前面的流程，不知道你有没有这样的疑问：如果页面里包含图片，使用上面的首屏指标采集方案，结果准确吗？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"879"}},[s._v("结论是：不准确。上述计算逻辑主要是针对 DOM 元素来做的，图片加载过程是异步，图片容器（图片的 DOM 元素）和内容的加载是分开的，当容器加载出来时，内容还没出来，一定要确保内容加载出来，才算首屏。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"880"}},[s._v("这就需要增加一些策略了，以下是包含图片页面的首屏计算 demo。")]),s._v(" "),a("pre",{staticClass:"lang-xml",attrs:{"data-nodeid":"881"}},[a("code",{attrs:{"data-language":"xml"}},[a("span",{staticClass:"hljs-meta"},[s._v("<!doctype "),a("span",{staticClass:"hljs-meta-keyword"},[s._v("html")]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("body")]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("img")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("id")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"imgTest"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("src")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"https://www.baidu.com/img/bd_logo1.png?where=super"')]),s._v(">")]),s._v("\n "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("img")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("id")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"imgTest"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("src")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"https://www.baidu.com/img/bd_logo1.png?where=super"')]),s._v(">")]),s._v("\n "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("style")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("type")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v("text/css")]),s._v(">")]),s._v("\n  background-image:url('https://www.baidu.com/img/dong_8f1d47bcb77d74a1e029d8cbb3b33854.gif);\n "),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("style")]),s._v(">")]),s._v("\n "),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("body")]),s._v(">")]),s._v("\n "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("html")]),s._v(">")]),s._v("\n"),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("script")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("type")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text/javascript"')]),s._v(">")]),a("span",{staticClass:"javascript"},[s._v("\n("),a("span",{staticClass:"hljs-function"},[a("span",{staticClass:"hljs-params"},[s._v("()")]),s._v(" =>")]),s._v(" {\n "),a("span",{staticClass:"hljs-keyword"},[s._v("const")]),s._v(" imgs = []\n "),a("span",{staticClass:"hljs-keyword"},[s._v("const")]),s._v(" getImageDomSrc = {\n  "),a("span",{staticClass:"hljs-attr"},[s._v("_getImgSrcFromBgImg")]),s._v(": "),a("span",{staticClass:"hljs-function"},[a("span",{staticClass:"hljs-keyword"},[s._v("function")]),s._v(" ("),a("span",{staticClass:"hljs-params"},[s._v("bgImg")]),s._v(") ")]),s._v("{\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" imgSrc;\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" matches = bgImg.match("),a("span",{staticClass:"hljs-regexp"},[s._v("/url\\(.*?\\)/g")]),s._v(");\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (matches && matches.length) {\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" urlStr = matches[matches.length - "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v("];\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" innerUrl = urlStr.replace("),a("span",{staticClass:"hljs-regexp"},[s._v("/^url\\([\\'\\\"]?/")]),s._v(", "),a("span",{staticClass:"hljs-string"},[s._v("''")]),s._v(").replace("),a("span",{staticClass:"hljs-regexp"},[s._v("/[\\'\\\"]?\\)$/")]),s._v(", "),a("span",{staticClass:"hljs-string"},[s._v("''")]),s._v(");\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" ((("),a("span",{staticClass:"hljs-regexp"},[s._v("/^http/")]),s._v(".test(innerUrl) || "),a("span",{staticClass:"hljs-regexp"},[s._v("/^\\/\\//")]),s._v(".test(innerUrl)))) {\n     imgSrc = innerUrl;\n    }\n   }\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" imgSrc;\n  },\n  "),a("span",{staticClass:"hljs-attr"},[s._v("getImgSrcFromDom")]),s._v(": "),a("span",{staticClass:"hljs-function"},[a("span",{staticClass:"hljs-keyword"},[s._v("function")]),s._v(" ("),a("span",{staticClass:"hljs-params"},[s._v("dom, imgFilter")]),s._v(") ")]),s._v("{\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (!(dom.getBoundingClientRect && dom.getBoundingClientRect().top < "),a("span",{staticClass:"hljs-built_in"},[s._v("window")]),s._v(".innerHeight))\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" "),a("span",{staticClass:"hljs-literal"},[s._v("false")]),s._v(";\n   imgFilter = ["),a("span",{staticClass:"hljs-regexp"},[s._v("/(\\.)(png|jpg|jpeg|gif|webp|ico|bmp|tiff|svg)/i")]),s._v("]\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" src;\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (dom.nodeName.toUpperCase() == "),a("span",{staticClass:"hljs-string"},[s._v("'IMG'")]),s._v(") {\n    src = dom.getAttribute("),a("span",{staticClass:"hljs-string"},[s._v("'src'")]),s._v(");\n   } "),a("span",{staticClass:"hljs-keyword"},[s._v("else")]),s._v(" {\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" computedStyle = "),a("span",{staticClass:"hljs-built_in"},[s._v("window")]),s._v(".getComputedStyle(dom);\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" bgImg = computedStyle.getPropertyValue("),a("span",{staticClass:"hljs-string"},[s._v("'background-image'")]),s._v(") || computedStyle.getPropertyValue("),a("span",{staticClass:"hljs-string"},[s._v("'background'")]),s._v(");\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" tempSrc = "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v("._getImgSrcFromBgImg(bgImg, imgFilter);\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (tempSrc && "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v("._isImg(tempSrc, imgFilter)) {\n     src = tempSrc;\n    }\n   }\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" src;\n  },\n  "),a("span",{staticClass:"hljs-attr"},[s._v("_isImg")]),s._v(": "),a("span",{staticClass:"hljs-function"},[a("span",{staticClass:"hljs-keyword"},[s._v("function")]),s._v(" ("),a("span",{staticClass:"hljs-params"},[s._v("src, imgFilter")]),s._v(") ")]),s._v("{\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("for")]),s._v(" ("),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" i = "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(", len = imgFilter.length; i < len; i++) {\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (imgFilter[i].test(src)) {\n     "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" "),a("span",{staticClass:"hljs-literal"},[s._v("true")]),s._v(";\n    }\n   }\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" "),a("span",{staticClass:"hljs-literal"},[s._v("false")]),s._v(";\n  },\n  traverse(e) {\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" _this = "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v("\n    , tName = e.tagName;\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" ("),a("span",{staticClass:"hljs-string"},[s._v('"SCRIPT"')]),s._v(" !== tName && "),a("span",{staticClass:"hljs-string"},[s._v('"STYLE"')]),s._v(" !== tName && "),a("span",{staticClass:"hljs-string"},[s._v('"META"')]),s._v(" !== tName && "),a("span",{staticClass:"hljs-string"},[s._v('"HEAD"')]),s._v(" !== tName) {\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" el = "),a("span",{staticClass:"hljs-keyword"},[s._v("this")]),s._v(".getImgSrcFromDom(e)\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (el && !imgs.includes(el))\n     imgs.push(el)\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" len = e.children ? e.children.length : "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(";\n    "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" (len > "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(")\n     "),a("span",{staticClass:"hljs-keyword"},[s._v("for")]),s._v(" ("),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" child = e.children, _len = len - "),a("span",{staticClass:"hljs-number"},[s._v("1")]),s._v("; _len >= "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v("; _len--)\n      _this.traverse(child[_len]);\n   }\n  }\n }\n getImageDomSrc.traverse("),a("span",{staticClass:"hljs-built_in"},[s._v("document")]),s._v(".body);\n "),a("span",{staticClass:"hljs-built_in"},[s._v("window")]),s._v(".onload="),a("span",{staticClass:"hljs-function"},[a("span",{staticClass:"hljs-keyword"},[s._v("function")]),s._v("("),a("span",{staticClass:"hljs-params"}),s._v(")")]),s._v("{\n "),a("span",{staticClass:"hljs-keyword"},[s._v("var")]),s._v(" max = "),a("span",{staticClass:"hljs-built_in"},[s._v("Math")]),s._v(".max(...imgs.map("),a("span",{staticClass:"hljs-function"},[a("span",{staticClass:"hljs-params"},[s._v("element")]),s._v(" =>")]),s._v(" {\n  "),a("span",{staticClass:"hljs-keyword"},[s._v("if")]),s._v(" ("),a("span",{staticClass:"hljs-regexp"},[s._v("/^(\\/\\/)/")]),s._v(".test(element))\n   element = "),a("span",{staticClass:"hljs-string"},[s._v("'https:'")]),s._v(" + element;\n  "),a("span",{staticClass:"hljs-keyword"},[s._v("try")]),s._v(" {\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" performance.getEntriesByName[element]("),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(").responseEnd || "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v("\n  } "),a("span",{staticClass:"hljs-keyword"},[s._v("catch")]),s._v(" (error) {\n   "),a("span",{staticClass:"hljs-keyword"},[s._v("return")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("0")]),s._v("\n  }\n }\n ))\n "),a("span",{staticClass:"hljs-built_in"},[s._v("console")]),s._v(".log(max);\n }\n}\n)()\n")]),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("script")]),s._v(">")]),s._v("\n")])]),s._v(" "),a("p",{attrs:{"data-nodeid":"882"}},[s._v("它的计算逻辑是这样的。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"883"}},[s._v("首先，获取页面所有的图片路径。在这里，图片类型分两种，一种是带 IMG 标签的，一种是带 DIV 标签的。前者可以直接通过 src 值得到图片路径，后者可以使用 window.getComputedStyle(dom) 方式获取它的样式集合。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"884"}},[s._v("接下来，通过正则获取图片的路径即可。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"885"}},[s._v("然后通过 performance.getEntriesByName[element](0).responseEnd 的方式获取到对应图片路径的下载时间，最后与使用 MutationObserver 获得的 DOM 首屏时间相比较，哪个更长，哪个就是最终的首屏时间。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"886"}},[s._v("以上就是首屏采集的完整流程。")]),s._v(" "),a("h3",{attrs:{"data-nodeid":"1397"}},[s._v("小结")]),s._v(" "),a("p",{staticClass:"te-preview-highlight",attrs:{"data-nodeid":"1398"}},[a("img",{attrs:{src:"https://s0.lgstatic.com/i/image6/M00/13/4C/CioPOWBB_OyAW8ipAAFZ1B6bNmQ490.png",alt:"溪风的思维导图04.png","data-nodeid":"1402"}})]),s._v(" "),a("p",{attrs:{"data-nodeid":"889"}},[s._v("这一讲我主要介绍了首屏指标采集相关的内容。不知道你看完后有没有这样的疑惑：这种性能采集方案靠谱吗？目前一线大厂有谁在使用这种采集方案？采集过程中会不会有什么坑？")]),s._v(" "),a("p",{attrs:{"data-nodeid":"890"}},[s._v("先说靠不靠谱，目前来说，这是市面中最好的首屏指标采集方案，它兼容了单页面应用和服务端模板的页面。我们反复做了几个月的数据实验，并借助它完成了一个全公司的性能优化项目，用实验和实践结果证明这种方案的靠谱程度。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"891"}},[s._v("第二个问题，一线大厂里，阿里云、淘宝、阿里飞猪、得到 App、微店等公司都广泛在使用这个方案。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"892"}},[s._v("最后一个问题，首屏指标采集中会不会有坑。实践中确实有不少的坑。比如，一个单页面应用，我们需要采集它的首屏时间，当我们采集首页的首屏指标时，用户恰好输入了一些东西导致页面跳转到了搜索结果页。此时首屏采集脚本继续在执行，那最终统计的就是搜索结果页的首屏数据而不是首页的")]),s._v(" "),a("p",{attrs:{"data-nodeid":"893"}},[s._v("类似这种问题，你想过怎么解决吗？欢迎在评论区和我留言进行交流。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"894"}},[s._v("上面就是首屏指标采集和优化手段相关的内容，接下来看看其他的指标如何采集。")]),s._v(" "),a("p",{attrs:{"data-nodeid":"895"}},[s._v("源码地址："),a("a",{attrs:{href:"https://github.com/lagoueduCol/WebPerformanceOptimization-xifeng","data-nodeid":"1004"}},[s._v("https://github.com/lagoueduCol/WebPerformanceOptimization-xifeng")])]),s._v(" "),a("hr"),s._v(" "),a("h3",{attrs:{id:"精选评论"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#精选评论"}},[s._v("#")]),s._v(" 精选评论")]),s._v(" "),a("h5",{attrs:{id:"谦"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#谦"}},[s._v("#")]),s._v(" **谦")]),s._v(" "),a("blockquote",[a("p",[s._v("为啥 domcontentload 加载完就是首屏时间？难道那时候图片都出来了？")])]),s._v(" "),a("h6",{attrs:{id:"讲师回复"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#讲师回复"}},[s._v("#")]),s._v(" 讲师回复")]),s._v(" "),a("blockquote",[a("p",[s._v("赞认真思考，对于首屏即是图片的情形确实是个问题，这时候如果严格的话，会求出首屏最长图片的展示时间。")])]),s._v(" "),a("h5",{attrs:{id:"奇"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#奇"}},[s._v("#")]),s._v(" *奇")]),s._v(" "),a("blockquote",[a("p",[s._v("感觉这边 SPA 的采集和谷歌提出的 Largest Contentful Paint(LCP) 有一些相似之处")])]),s._v(" "),a("h5",{attrs:{id:"轩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#轩"}},[s._v("#")]),s._v(" **轩")]),s._v(" "),a("blockquote",[a("p",[s._v("计算首屏时间用到的 getBoundingClientRect 和 getComputedStyle 会引起强制回流，这样得到的时间准确吗？")])]),s._v(" "),a("h6",{attrs:{id:"讲师回复-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#讲师回复-2"}},[s._v("#")]),s._v(" 讲师回复")]),s._v(" "),a("blockquote",[a("p",[s._v("这个确实会，赞严谨，这里确实没想到好的办法。")])]),s._v(" "),a("h5",{attrs:{id:"东"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#东"}},[s._v("#")]),s._v(" **东")]),s._v(" "),a("blockquote",[a("p",[s._v("github 源码不是完整代码？老师能提供完整的 demo 吗")])]),s._v(" "),a("h6",{attrs:{id:"讲师回复-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#讲师回复-3"}},[s._v("#")]),s._v(" 讲师回复")]),s._v(" "),a("blockquote",[a("p",[s._v("这个和一些基础库有关，如埋点库等，后续剥离后才能对外。")])]),s._v(" "),a("h5",{attrs:{id:"华"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#华"}},[s._v("#")]),s._v(" **华")]),s._v(" "),a("blockquote",[a("p",[s._v("老师讲得精彩，学到了首屏指标采集相关知识")])]),s._v(" "),a("h5",{attrs:{id:"志"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#志"}},[s._v("#")]),s._v(" **志")]),s._v(" "),a("blockquote",[a("p",[s._v("我们需要考虑首屏采集终止的条件，即计算时间超过 30 秒还没有结束；计算了 4 轮且 1 秒内分数不再变化；计算了 9 次且分数不再变化。-------请问这种判断方法是否准确呢？另外，计算四轮是怎么计算呢？计算 9 次，这个数字为啥是 9 呢？看了下贴出来的代码，完全不能跑啊。很多参数缺失。")])]),s._v(" "),a("h6",{attrs:{id:"讲师回复-4"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#讲师回复-4"}},[s._v("#")]),s._v(" 讲师回复")]),s._v(" "),a("blockquote",[a("p",[s._v("这个是业务过程中的实验总结，也参考了行业内的的技术实现。四轮和 9 次都是指首屏采集的时间指标连续 4 次和 9 次的值。执行的时侯，需要自己补充一些 PerFormance 兼容性相关代码，然后再运行即可。")])]),s._v(" "),a("h5",{attrs:{id:"_6460"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6460"}},[s._v("#")]),s._v(" **6460")]),s._v(" "),a("blockquote",[a("p",[s._v("这个方案，是有什么参考吗，不然怎么写出这么多的，感觉挺复杂，而且代码里面还有安卓的代码，不是单纯的 webapp 而是 webview 里面加载的 webapp?")])]),s._v(" "),a("h6",{attrs:{id:"讲师回复-5"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#讲师回复-5"}},[s._v("#")]),s._v(" 讲师回复")]),s._v(" "),a("blockquote",[a("p",[s._v("这个方案参考了淘宝首屏统计方案；首屏时间的采集都是前端的代码，在卡顿指标采集时用到了 Native 的代码实现；是 webview 里面加载的 webapp。")])]),s._v(" "),a("h5",{attrs:{id:"志-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#志-2"}},[s._v("#")]),s._v(" **志")]),s._v(" "),a("blockquote",[a("p",[s._v("强烈要求剥离完整代码出来，最近在做骨架屏加载，有个问题是什么时候清除骨架屏。首屏渲染，不包含计算图片渲染时间的那一段，刚好适合骨架屏。dom 结构加载稳定就可以销毁骨架屏了，这种场景不需要等图片渲染出来。")])]),s._v(" "),a("h6",{attrs:{id:"讲师回复-6"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#讲师回复-6"}},[s._v("#")]),s._v(" 讲师回复")]),s._v(" "),a("blockquote",[a("p",[s._v("这个思路不错，点赞，期待实验后给大家分享一下")])]),s._v(" "),a("h5",{attrs:{id:"行舟"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#行舟"}},[s._v("#")]),s._v(" **行舟")]),s._v(" "),a("blockquote",[a("p",[s._v("老师，我们通过统计能发现首屏时间超过 30s 的人很多，但是这种情况应该是不可能的，如果出现这种情况是否可质疑监控的平台的准确性？")])]),s._v(" "),a("h6",{attrs:{id:"讲师回复-7"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#讲师回复-7"}},[s._v("#")]),s._v(" 讲师回复")]),s._v(" "),a("blockquote",[a("p",[s._v("要看一下你们业务情况，只要在 webview 超时范围内的首屏数据，按道理都是合适的，我们是结合了一下业务情况，超过 30s 在我们业务是不正常的，你提到很多应该很容易复现，看一下用户出现问题时的日志（ userAgent 等），用这个条件去试着复现。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);