(window.webpackJsonp=window.webpackJsonp||[]).push([[184],{519:function(t,a,d){"use strict";d.r(a);var r=d(4),v=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",{attrs:{"data-nodeid":"681"}},[t._v("在西班牙语中，有一个很特别的的词语叫“Sobremesa”，它专指“吃完饭后，大家在饭桌上意犹未尽交谈的那段短暂而美好时光”。现在，我们的专栏也已经全部更新完毕，历经“枯燥的程序知识”，我希望在最后的内容中，大家能够放松心情，畅所欲言。今天，我将会从“现代项目库的编写”谈基建和架构，从“如何保持竞争力”谈个人价值和方向。就让这些非技术内容作为全部专栏内容的结束语吧。")]),t._v(" "),a("h3",{attrs:{"data-nodeid":"682"}},[t._v("库，不仅是能有")]),t._v(" "),a("p",{attrs:{"data-nodeid":"683"}},[t._v("此刻，2021 新年已过，前端技术和解决方案无时无刻不在确立着新的格局。“如何写好一个现代化的开源库”这个话题始终值得讨论。当然，这对于初级开发者也许并不简单。比如，我们要思考：")]),t._v(" "),a("ul",{attrs:{"data-nodeid":"684"}},[a("li",{attrs:{"data-nodeid":"685"}},[a("p",{attrs:{"data-nodeid":"686"}},[t._v("开源证书如何选择；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"687"}},[a("p",{attrs:{"data-nodeid":"688"}},[t._v("库文档如何编写，才能做到让使用者快速上手；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"689"}},[a("p",{attrs:{"data-nodeid":"690"}},[t._v("TODO 和 CHANGELOG 需要遵循哪些规范，有什么讲究；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"691"}},[a("p",{attrs:{"data-nodeid":"692"}},[t._v("如何完成一个流畅 0 error, 0 warning 的构建流程；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"693"}},[a("p",{attrs:{"data-nodeid":"694"}},[t._v("如何确定编译范围和实施流程；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"695"}},[a("p",{attrs:{"data-nodeid":"696"}},[t._v("如何设计合理的模块化方案；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"697"}},[a("p",{attrs:{"data-nodeid":"698"}},[t._v("如何打包输出结果，以适配多种环境；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"699"}},[a("p",{attrs:{"data-nodeid":"700"}},[t._v("如何设计自动规范化链路；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"701"}},[a("p",{attrs:{"data-nodeid":"702"}},[t._v("如何保证版本规范和 commit 规范；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"703"}},[a("p",{attrs:{"data-nodeid":"704"}},[t._v("如何进行测试；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"705"}},[a("p",{attrs:{"data-nodeid":"706"}},[t._v("如何引入可持续集成；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"707"}},[a("p",{attrs:{"data-nodeid":"708"}},[t._v("如何引入工具使用和配置的最佳实践；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"709"}},[a("p",{attrs:{"data-nodeid":"710"}},[t._v("如何设计 APIs 等。")])])]),t._v(" "),a("p",{attrs:{"data-nodeid":"711"}},[t._v("其中的任何一个点都能牵引出前端语言规范和设计、工程化基建等相关知识。比如，让我们来思考构建和打包过程，如果我是一个库开发者，我的预期将会是：")]),t._v(" "),a("ul",{attrs:{"data-nodeid":"712"}},[a("li",{attrs:{"data-nodeid":"713"}},[a("p",{attrs:{"data-nodeid":"714"}},[t._v("我要用 ES Next 优雅地写库代码，因此要通过 Babel 或者 Bublé 进行转义；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"715"}},[a("p",{attrs:{"data-nodeid":"716"}},[t._v("我的库产出结果要能够运行在浏览器和 Node 环境中，我会有自定义的兼容性要求；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"717"}},[a("p",{attrs:{"data-nodeid":"718"}},[t._v("我的库产出结果要支持 AMD 或者 CMD 等模块化方案，因此对于不同环境，采用的模块化方案也不同；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"719"}},[a("p",{attrs:{"data-nodeid":"720"}},[t._v("我的库产出结果要能够和 Webpack、Rollup、Gulp 等工具无缝配合。")])])]),t._v(" "),a("p",{attrs:{"data-nodeid":"721"}},[t._v("根据这些预期，我就要纠结："),a("strong",{attrs:{"data-nodeid":"790"}},[t._v("“到底用 Rollup 对库进行打包还是用 Webpack 进行打包”“如何真正意义上实现 Tree shaking”“如何选择并比较不同的工具”“如何合理地使用 Babel，如何使用插件”等话题")]),t._v("。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"722"}},[t._v("把这些问题想通，我们距离项目的基建和架构就能更进一步。因此，如果在项目中遇到了公共库使用问题，就让我们花些时间，追根刨底，研究个明白。同时，你要大胆地设计公共库，站在使用者的角度想问题，不断打磨公共库的设计理念和使用体验，很快就会有成长。最后，对社区开源知识保持学习，相信你一定会有所收获。")]),t._v(" "),a("h3",{attrs:{"data-nodeid":"723"}},[t._v("如何保持竞争力")]),t._v(" "),a("p",{attrs:{"data-nodeid":"724"}},[t._v("提到竞争力，我想先说一个“程序员”的修养，这个话题非常开放。我们会想到很多关键词，比如：")]),t._v(" "),a("ul",{attrs:{"data-nodeid":"725"}},[a("li",{attrs:{"data-nodeid":"726"}},[a("p",{attrs:{"data-nodeid":"727"}},[t._v("保持热情")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"728"}},[a("p",{attrs:{"data-nodeid":"729"}},[t._v("谦虚谨慎")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"730"}},[a("p",{attrs:{"data-nodeid":"731"}},[t._v("学会阅读")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"732"}},[a("p",{attrs:{"data-nodeid":"733"}},[t._v("学会提问")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"734"}},[a("p",{attrs:{"data-nodeid":"735"}},[t._v("善用搜索")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"736"}},[a("p",{attrs:{"data-nodeid":"737"}},[t._v("学会写作（文档/博客等）")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"738"}},[a("p",{attrs:{"data-nodeid":"739"}},[t._v("“科学上网”")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"740"}},[a("p",{attrs:{"data-nodeid":"741"}},[t._v("时间管理")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"742"}},[a("p",{attrs:{"data-nodeid":"743"}},[t._v("知识管理")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"744"}},[a("p",{attrs:{"data-nodeid":"745"}},[t._v("英语学习")])])]),t._v(" "),a("p",{attrs:{"data-nodeid":"746"}},[t._v("我个人很不喜欢所谓的成功学和方法论，更讨厌制造焦虑、兜售鸡汤。免入俗套，我打算从两种动物谈起，来说一些“废话”。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"747"}},[t._v("不管是学习进阶之路，还是工作中的项目，我们能够遇到的真正问题只有两类：第一种是"),a("strong",{attrs:{"data-nodeid":"814"}},[t._v("看不见的")]),t._v("，我把它比作为“黑天鹅”，总会在你意想不到的时间和地点出现，并彻底颠覆一切；第二种是被我们"),a("strong",{attrs:{"data-nodeid":"815"}},[t._v("视而不见的")]),t._v("，我把它比喻成“灰犀牛”，你知道且习惯于它的存在，但是它会在某个时刻突然爆发，一旦爆发就会席卷一切，令人无从抵抗。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"748"}},[t._v("而项目开发和个人成长都有“黑天鹅”和“灰犀牛”的危机。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"749"}},[a("strong",{attrs:{"data-nodeid":"820"}},[t._v("黑天鹅")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"750"}},[t._v("“新技术的爆发，技术的更新换代”就是职业生涯的黑天鹅。但我们需要辩证地来认识它：对于菜鸟来说，新技术和未知领域让年轻人有机会弯道超车，减少因为欠缺经验和阅历而带来的劣势；对于有一定工作经验和阅历的程序员来说，“颠覆”和“变革”这样的词语似乎不那么友好。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"751"}},[t._v("但是新技术说到底也只是工具，"),a("strong",{attrs:{"data-nodeid":"827"}},[t._v("真正资深程序员的核心价值在于：逻辑、分析、数据、算法等抽象能力")]),t._v("。技术工具只是这些抽象能力的表现形式。从汇编语言转到 C 语言，其实更能发挥 C 的强大控制能力；从 C 转到 Java，只需要理解面向对象和虚拟机就能很快适应并脱颖而出；从 Java 转到 Python 的程序员，甚至都会感叹写代码“太简单了”！")]),t._v(" "),a("p",{attrs:{"data-nodeid":"752"}},[t._v("总之，黑天鹅既是危机，也是机会。新技术作为新工具，总能带来新的价值蓝海。如果能把黑天鹅当作机会，保持敏感、好奇和进取的心态，扩展技能树，就能驯服来势汹汹的新技术。希望我们所有人一起共勉。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"753"}},[a("strong",{attrs:{"data-nodeid":"832"}},[t._v("灰犀牛")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"754"}},[t._v("社会中，很多职业是“越老越值钱”：老警察、老医生、老艺术家，说起来就让人觉得技术高超，令人信赖。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"755"}},[t._v("职业进阶就是一只灰犀牛。在悄然溜走的时间中，我们可能习惯了日复一日的重复劳动。"),a("strong",{attrs:{"data-nodeid":"839"}},[t._v("程序员怕的不是变老，而是变老的同时没有变强")]),t._v("。如何击退这只灰犀牛，就需要我们从天天接触的工作代码入手，从熟悉的事物出发，找到突破口。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"756"}},[t._v("比如，在这个专栏的《现代化前端开发和架构生态篇》中，我重点突出了：如何增强程序的健硕性、如何提升我们的开发效率、如何持续不断地完善项目、如何从零开始打磨基础构建体系。仔细思考，里面的内容也许就能接入你的项目当中。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"757"}},[t._v("从机械的工作抽象出更完美的工程化流程，这样的话题似乎永远说不完。我也总有新的心得和体会想和大家一起分享、交流。专栏已完结，但是衷心希望我们的技术探险之旅，仅仅是拉开帷幕。")]),t._v(" "),a("h3",{attrs:{"data-nodeid":"758"}},[t._v("写在最后的话")]),t._v(" "),a("p",{attrs:{"data-nodeid":"759"}},[t._v("站在跑道的起点，你不知道跑到哪里肌肉会开始发痛，呼吸急促，想要停下来休息；在二三十岁的年纪，我们无从得知学习了一门课程，能对自己的水平提高和职业发展起多大作用。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"760"}},[t._v("也许无论是跑步还是写代码，都是在探索生命的种种可能。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"761"}},[t._v("——不去跑，永远不知道能跑多远；不去做，永远不知道能做多好。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"762"}},[t._v("最后，我想邀请你参与对本专栏的评价，你的每一个观点对我们来说都是最重要的。"),a("a",{attrs:{href:"https://wj.qq.com/s2/8143682/4a70?fileGuid=xxQTRXtVcqtHK6j8","data-nodeid":"849"}},[t._v("点击链接，即可参与评价，还有机会获得惊喜奖品！")])]),t._v(" "),a("p",{staticClass:"te-preview-highlight",attrs:{"data-nodeid":"763"}},[t._v("本专栏到此结束，衷心希望各位读者一切顺利。")]),t._v(" "),a("hr"),t._v(" "),a("h3",{attrs:{id:"精选评论"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#精选评论"}},[t._v("#")]),t._v(" 精选评论")]),t._v(" "),a("h5",{attrs:{id:"浩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浩"}},[t._v("#")]),t._v(" *浩：")]),t._v(" "),a("blockquote",[a("p",[t._v("最后的结语写的真棒！！给老师点赞！！")])]),t._v(" "),a("h5",{attrs:{id:"先森"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#先森"}},[t._v("#")]),t._v(" **先森：")]),t._v(" "),a("blockquote",[a("p",[t._v("很棒的专栏，这个专栏我至少会看5遍，并对其中涉及的思路以及知识进行探究，感谢作者好文。😄")])]),t._v(" "),a("h5",{attrs:{id:"平"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#平"}},[t._v("#")]),t._v(" **平：")]),t._v(" "),a("blockquote",[a("p",[t._v("很实在，很接地气的专栏，解决了自己的很多疑惑")])]),t._v(" "),a("h5",{attrs:{id:"训"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#训"}},[t._v("#")]),t._v(" **训：")]),t._v(" "),a("blockquote",[a("p",[t._v("完结")])]),t._v(" "),a("h5",{attrs:{id:"darcy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#darcy"}},[t._v("#")]),t._v(" Darcy：")]),t._v(" "),a("blockquote",[a("p",[t._v("完结，撒花。希望还可以看到老师其他的作品")])]),t._v(" "),a("h5",{attrs:{id:"祁"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#祁"}},[t._v("#")]),t._v(" *祁：")]),t._v(" "),a("blockquote",[a("p",[t._v("喜欢最后的总结👍")])])])}),[],!1,null,null,null);a.default=v.exports}}]);