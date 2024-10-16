(window.webpackJsonp=window.webpackJsonp||[]).push([[142],{477:function(_,v,t){"use strict";t.r(v);var e=t(4),r=Object(e.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"浏览器"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器"}},[_._v("#")]),_._v(" 浏览器")]),_._v(" "),v("h3",{attrs:{id:"从输入-url-到页面加载的全过程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#从输入-url-到页面加载的全过程"}},[_._v("#")]),_._v(" 从输入 URL 到页面加载的全过程")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e44aa8a92602405db3c12161b71e2094~tplv-k3u1fbpfcp-zoom-1.image",alt:"从输入URL到页面加载的主干流程"}})]),_._v(" "),v("ol",[v("li",[v("p",[_._v("首先在浏览器中输入 URL")])]),_._v(" "),v("li",[v("p",[_._v("查找缓存：浏览器先查看浏览器缓存-系统缓存-路由缓存中是否有该地址页面，如果有则显示页面内容。如果没有则进行下一步。")]),_._v(" "),v("ul",[v("li",[_._v("浏览器缓存：浏览器会记录 DNS 一段时间，因此，只是第一个地方解析 DNS 请求；")]),_._v(" "),v("li",[_._v("操作系统缓存:如果在浏览器缓存中不包含这个记录，则会使系统调用操作系统， 获取操作系统的记录(保存最近的 DNS 查询缓存)；")]),_._v(" "),v("li",[_._v("路由器缓存：如果上述两个步骤均不能成功获取 DNS 记录，继续搜索路由器缓存；")]),_._v(" "),v("li",[_._v("ISP 缓存：若上述均失败，继续向 ISP 搜索。")])])]),_._v(" "),v("li",[v("p",[_._v("DNS 域名解析：浏览器向 DNS 服务器发起请求，解析该 URL 中的域名对应的 IP 地址。"),v("code",[_._v("DNS服务器是基于UDP的，因此会用到UDP协议")]),_._v("。")])]),_._v(" "),v("li",[v("p",[_._v("建立 TCP 连接：解析出 IP 地址后，根据 IP 地址和默认 80 端口，和服务器建立 TCP 连接")])]),_._v(" "),v("li",[v("p",[_._v("发起 HTTP 请求：浏览器发起读取文件的 HTTP 请求，，该请求报文作为 TCP 三次握手的第三次数据发送给服务器")])]),_._v(" "),v("li",[v("p",[_._v("服务器响应请求并返回结果：服务器对浏览器请求做出响应，并把对应的 html 文件发送给浏览器")])]),_._v(" "),v("li",[v("p",[_._v("关闭 TCP 连接：通过四次挥手释放 TCP 连接")])]),_._v(" "),v("li",[v("p",[_._v("浏览器渲染：客户端（浏览器）解析 HTML 内容并渲染出来，浏览器接收到数据包后的解析流程为：")]),_._v(" "),v("ul",[v("li",[_._v("构建 DOM 树：词法分析然后解析成 DOM 树（dom tree），是由 dom 元素及属性节点组成，树的根是 document 对象")]),_._v(" "),v("li",[_._v("构建 CSS 规则树：生成 CSS 规则树（CSS Rule Tree）")]),_._v(" "),v("li",[_._v("构建 render 树：Web 浏览器将 DOM 和 CSSOM 结合，并构建出渲染树（render tree）")]),_._v(" "),v("li",[_._v("布局（Layout）：计算出每个节点在屏幕中的位置")]),_._v(" "),v("li",[_._v("绘制（Painting）：即遍历 render 树，并使用 UI 后端层绘制每个节点。")])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a90660027f0d4c559732519bad4c6323~tplv-k3u1fbpfcp-zoom-1.image",alt:"浏览器渲染流程图"}})])]),_._v(" "),v("li",[v("p",[_._v("JS 引擎解析过程：调用 JS 引擎执行 JS 代码（JS 的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）")]),_._v(" "),v("ul",[v("li",[_._v("创建 window 对象：window 对象也叫全局执行环境，当页面产生时就被创建，所有的全局变量和函数都属于 window 的属性和方法，而 DOM Tree 也会映射在 window 的 doucment 对象上。当关闭网页或者关闭浏览器时，全局执行环境会被销毁。")]),_._v(" "),v("li",[_._v("加载文件：完成 js 引擎分析它的语法与词法是否合法，如果合法进入预编译")]),_._v(" "),v("li",[_._v("预编译：在预编译的过程中，浏览器会寻找全局变量声明，把它作为 window 的属性加入到 window 对象中，并给变量赋值为'undefined'；寻找全局函数声明，把它作为 window 的方法加入到 window 对象中，并将函数体赋值给他（匿名函数是不参与预编译的，因为它是变量）。而变量提升作为不合理的地方在 ES6 中已经解决了，函数提升还存在。")]),_._v(" "),v("li",[_._v("解释执行：执行到变量就赋值，如果变量没有被定义，也就没有被预编译直接赋值，在 ES5 非严格模式下这个变量会成为 window 的一个属性，也就是成为全局变量。string、int 这样的值就是直接把值放在变量的存储空间里，object 对象就是把指针指向变量的存储空间。函数执行，就将函数的环境推入一个环境的栈中，执行完成后再弹出，控制权交还给之前的环境。JS 作用域其实就是这样的执行流机制实现的。")])])])]),_._v(" "),v("p",[_._v("传送门 ☞ "),v("a",{attrs:{href:"https://juejin.cn/post/7005468491067162655",target:"_blank",rel:"noopener noreferrer"}},[_._v("# DNS 域名解析过程"),v("OutboundLink")],1),_._v(" ☞"),v("a",{attrs:{href:"https://juejin.cn/post/6992597760935460901",target:"_blank",rel:"noopener noreferrer"}},[_._v("# 浏览器的工作原理"),v("OutboundLink")],1)]),_._v(" "),v("h3",{attrs:{id:"在浏览器中输入-url-到显示页面经历哪些过程-涉及到哪些协议"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#在浏览器中输入-url-到显示页面经历哪些过程-涉及到哪些协议"}},[_._v("#")]),_._v(" 在浏览器中输入 URL 到显示页面经历哪些过程，涉及到哪些协议？")]),_._v(" "),v("p",[_._v("浏览器要将 URL 解析为 IP 地址，解析域名就要用到 DNS 协议，首先主机会查询 DNS 的缓存，如果没有就给本地 DNS 发送查询请求。DNS 查询分为两种方式，一种是递归查询，一种是迭代查询。如果是迭代查询，本地的 DNS 服务器，向根域名服务器发送查询请求，根域名服务器告知该域名的一级域名服务器，然后本地服务器给该一级域名服务器发送查询请求，然后依次类推直到查询到该域名的 IP 地址。"),v("code",[_._v("DNS服务器是基于UDP的，因此会用到UDP协议。")])]),_._v(" "),v("p",[_._v("得到 IP 地址后，浏览器就要与服务器建立一个 http 连接。因此要用到 http 协议。http 生成一个 get 请求报文，将该报文传给 TCP 层处理，所以还会用到 TCP 协议。如果采用 https 还会使用 https 协议先对 http 数据进行加密。TCP 层如果有需要先将 HTTP 数据包分片，分片依据路径 MTU 和 MSS。TCP 的数据包然后会发送给 IP 层，用到 IP 协议。IP 层通过路由选路，一跳一跳发送到目的地址。当然在一个网段内的寻址是通过以太网协议实现(也可以是其他物理层协议，比如 PPP，SLIP)，以太网协议需要直到目的 IP 地址的物理地址，有需要 ARP 协议。")]),_._v(" "),v("p",[_._v("其中：")]),_._v(" "),v("p",[_._v("1、"),v("code",[_._v("DNS协议，http协议，https协议属于应用层")])]),_._v(" "),v("p",[_._v("应用层是体系结构中的最高层。应用层确定进程之间通信的性质以满足用户的需要。这里的进程就是指正在运行的程序。应用层不仅要提供应用进程所需要的信息交换和远地操作，而且还要作为互相作用的应用进程的用户代理，来完成一些为进行语义上有意义的信息交换所必须的功能。应用层直接为用户的应用进程提供服务。")]),_._v(" "),v("p",[_._v("2、"),v("code",[_._v("TCP/UDP属于传输层")])]),_._v(" "),v("p",[_._v("传输层的任务就是负责主机中两个进程之间的通信。因特网的传输层可使用两种不同协议：即面向连接的传输控制协议 TCP，和无连接的用户数据报协议 UDP。面向连接的服务能够提供可靠的交付，但无连接服务则不保证提供可靠的交付，它只是“尽最大努力交付”。这两种服务方式都很有用，备有其优缺点。在分组交换网内的各个交换结点机都没有传输层。")]),_._v(" "),v("p",[_._v("3、"),v("code",[_._v("IP协议，ARP协议属于网络层")])]),_._v(" "),v("p",[_._v("网络层负责为分组交换网上的不同主机提供通信。在发送数据时，网络层将运输层产生的报文段或用户数据报封装成分组或包进行传送。在 TCP/IP 体系中，分组也叫作 IP 数据报，或简称为数据报。网络层的另一个任务就是要选择合适的路由，使源主机运输层所传下来的分组能够交付到目的主机。")]),_._v(" "),v("p",[_._v("4、数据链路层")]),_._v(" "),v("p",[_._v("当发送数据时，数据链路层的任务是将在网络层交下来的 IP 数据报组装成帧，在两个相邻结点间的链路上传送以帧为单位的数据。每一帧包括数据和必要的控制信息（如同步信息、地址信息、差错控制、以及流量控制信息等）。控制信息使接收端能够知道—个帧从哪个比特开始和到哪个比特结束。控制信息还使接收端能够检测到所收到的帧中有无差错。")]),_._v(" "),v("p",[_._v("5、物理层")]),_._v(" "),v("p",[_._v("物理层的任务就是透明地传送比特流。在物理层上所传数据的单位是比特。传递信息所利用的一些物理媒体，如双绞线、同轴电缆、光缆等，并不在物理层之内而是在物理层的下面。因此也有人把物理媒体当做第 0 层。")]),_._v(" "),v("h3",{attrs:{id:"浏览器的主要功能"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的主要功能"}},[_._v("#")]),_._v(" 浏览器的主要功能")]),_._v(" "),v("p",[_._v("浏览器的主要功能就是向服务器发出请求，在浏览器窗口中展示您选择的网络资源。这里所说的资源一般是指 HTML 文档，也可以是 PDF、图片或其他的类型。资源的位置由用户使用 URI（统一资源标示符）指定。")]),_._v(" "),v("h3",{attrs:{id:"浏览器的工作原理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的工作原理"}},[_._v("#")]),_._v(" 浏览器的工作原理")]),_._v(" "),v("p",[_._v("渲染引擎一开始会从网络层获取请求文档的内容，内容的大小一般限制在 8000 个块以内。")]),_._v(" "),v("p",[_._v("然后进行如下所示的基本流程：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ef6cb226b374e89914a2315e4ca9ba9~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),_._v(" "),v("p",[_._v("图：渲染引擎的基本流程。")]),_._v(" "),v("p",[_._v("渲染引擎将开始"),v("code",[_._v("解析 HTML 文档")]),_._v("，并将各标记逐个转化成“内容树”上的  "),v("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.html5rocks.com%2Fzh%2Ftutorials%2Finternals%2Fhowbrowserswork%2F%23DOM",title:"https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#DOM",target:"_blank",rel:"noopener noreferrer"}},[_._v("DOM"),v("OutboundLink")],1),_._v("  节点。同时也会"),v("code",[_._v("解析外部 CSS 文件以及样式元素中的样式数据")]),_._v("。HTML 中这些带有视觉指令的样式信息将用于创建另一个树结构："),v("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.html5rocks.com%2Fzh%2Ftutorials%2Finternals%2Fhowbrowserswork%2F%23Render_tree_construction",title:"https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Render_tree_construction",target:"_blank",rel:"noopener noreferrer"}},[v("code",[_._v("渲染树")]),v("OutboundLink")],1),_._v("。")]),_._v(" "),v("p",[_._v("渲染树包含多个带有视觉属性（如颜色和尺寸）的矩形。这些矩形的排列顺序就是它们将在屏幕上显示的顺序。")]),_._v(" "),v("p",[_._v("渲染树构建完毕之后，进入“"),v("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.html5rocks.com%2Fzh%2Ftutorials%2Finternals%2Fhowbrowserswork%2F%23layout",title:"https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#layout",target:"_blank",rel:"noopener noreferrer"}},[_._v("布局"),v("OutboundLink")],1),_._v("”处理阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标。下一个阶段是"),v("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.html5rocks.com%2Fzh%2Ftutorials%2Finternals%2Fhowbrowserswork%2F%23Painting",title:"https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Painting",target:"_blank",rel:"noopener noreferrer"}},[_._v("绘制"),v("OutboundLink")],1),_._v(" - 渲染引擎会遍历渲染树，由用户界面后端层将每个节点绘制出来。")]),_._v(" "),v("p",[_._v("需要着重指出的是，这是一个渐进的过程。为达到更好的用户体验，渲染引擎会力求尽快将内容显示在屏幕上。它不必等到整个 HTML 文档解析完毕之后，就会开始构建呈现树和设置布局。在不断接收和处理来自网络的其余内容的同时，渲染引擎会将部分内容解析并显示出来。")]),_._v(" "),v("h3",{attrs:{id:"浏览器的主要组成部分是什么"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的主要组成部分是什么"}},[_._v("#")]),_._v(" 浏览器的主要组成部分是什么？")]),_._v(" "),v("ol",[v("li",[v("strong",[_._v("用户界面")]),_._v(" - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。")]),_._v(" "),v("li",[v("strong",[_._v("浏览器引擎")]),_._v(" - 在用户界面和呈现引擎之间传送指令。")]),_._v(" "),v("li",[v("strong",[_._v("呈现引擎")]),_._v(" - 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。")]),_._v(" "),v("li",[v("strong",[_._v("网络")]),_._v(" - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。")]),_._v(" "),v("li",[v("strong",[_._v("用户界面后端")]),_._v(" - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。")]),_._v(" "),v("li",[v("strong",[_._v("JavaScript 解释器")]),_._v("。用于解析和执行 JavaScript 代码。")]),_._v(" "),v("li",[v("strong",[_._v("数据存储")]),_._v("。这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。\n"),v("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f83cb61cb9de4a65abeb95e50608af48~tplv-k3u1fbpfcp-watermark.awebp",alt:""}})])]),_._v(" "),v("p",[_._v("图：浏览器的主要组件。")]),_._v(" "),v("p",[_._v("值得注意的是，和大多数浏览器不同，Chrome 浏览器的每个标签页都分别对应一个呈现引擎实例。每个标签页都是一个独立的进程。")]),_._v(" "),v("h3",{attrs:{id:"浏览器是如何渲染-ui-的"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器是如何渲染-ui-的"}},[_._v("#")]),_._v(" 浏览器是如何渲染 UI 的？")]),_._v(" "),v("ol",[v("li",[_._v("浏览器获取 HTML 文件，然后对文件进行解析，形成 DOM Tree")]),_._v(" "),v("li",[_._v("与此同时，进行 CSS 解析，生成 Style Rules")]),_._v(" "),v("li",[_._v("接着将 DOM Tree 与 Style Rules 合成为 Render Tree")]),_._v(" "),v("li",[_._v("接着进入布局（Layout）阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标")]),_._v(" "),v("li",[_._v("随后调用 GPU 进行绘制（Paint），遍历 Render Tree 的节点，并将元素呈现出来")])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67b1336692f540c9a81756f93e82c2f5~tplv-k3u1fbpfcp-watermark.image",alt:"image.png"}})]),_._v(" "),v("h3",{attrs:{id:"dom-tree-是如何构建的"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#dom-tree-是如何构建的"}},[_._v("#")]),_._v(" DOM Tree 是如何构建的？")]),_._v(" "),v("ol",[v("li",[_._v("转码: 浏览器将接收到的二进制数据按照指定编码格式转化为 HTML 字符串")]),_._v(" "),v("li",[_._v("生成 Tokens: 之后开始 parser，浏览器会将 HTML 字符串解析成 Tokens")]),_._v(" "),v("li",[_._v("构建 Nodes: 对 Node 添加特定的属性，通过指针确定 Node 的父、子、兄弟关系和所属 treeScope")]),_._v(" "),v("li",[_._v("生成 DOM Tree: 通过 node 包含的指针确定的关系构建出 DOM"),v("br"),_._v("\nTree")])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1dc0f577836c4705bb582b2ac15bc5d1~tplv-k3u1fbpfcp-zoom-1.image",alt:"2019-06-22-11-48-00"}})]),_._v(" "),v("h3",{attrs:{id:"浏览器重绘与重排的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器重绘与重排的区别"}},[_._v("#")]),_._v(" 浏览器重绘与重排的区别？")]),_._v(" "),v("ul",[v("li",[v("code",[_._v("重排/回流（Reflow）")]),_._v("：当"),v("code",[_._v("DOM")]),_._v("的变化影响了元素的几何信息，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。表现为重新生成布局，重新排列元素。")]),_._v(" "),v("li",[v("code",[_._v("重绘(Repaint)")]),_._v(": 当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。表现为某些元素的外观被改变")])]),_._v(" "),v("p",[_._v("单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分")]),_._v(" "),v("p",[_._v("重排和重绘代价是高昂的，它们会破坏用户体验，并且让 UI 展示非常迟缓，而相比之下重排的性能影响更大，在两者无法避免的情况下，一般我们宁可选择代价更小的重绘。")]),_._v(" "),v("p",[_._v("『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』。")]),_._v(" "),v("h3",{attrs:{id:"如何触发重排和重绘"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#如何触发重排和重绘"}},[_._v("#")]),_._v(" 如何触发重排和重绘？")]),_._v(" "),v("p",[_._v("任何改变用来构建渲染树的信息都会导致一次重排或重绘：")]),_._v(" "),v("ul",[v("li",[_._v("添加、删除、更新 DOM 节点")]),_._v(" "),v("li",[_._v("通过 display: none 隐藏一个 DOM 节点-触发重排和重绘")]),_._v(" "),v("li",[_._v("通过 visibility: hidden 隐藏一个 DOM 节点-只触发重绘，因为没有几何变化")]),_._v(" "),v("li",[_._v("移动或者给页面中的 DOM 节点添加动画")]),_._v(" "),v("li",[_._v("添加一个样式表，调整样式属性")]),_._v(" "),v("li",[_._v("用户行为，例如调整窗口大小，改变字号，或者滚动。")])]),_._v(" "),v("h3",{attrs:{id:"如何避免重绘或者重排"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#如何避免重绘或者重排"}},[_._v("#")]),_._v(" 如何避免重绘或者重排？")]),_._v(" "),v("ol",[v("li",[v("p",[v("code",[_._v("集中改变样式")]),_._v("，不要一条一条地修改 DOM 的样式。")])]),_._v(" "),v("li",[v("p",[_._v("不要把 DOM 结点的属性值放在循环里当成循环里的变量。")])]),_._v(" "),v("li",[v("p",[_._v("为动画的 HTML 元件使用 "),v("code",[_._v("fixed")]),_._v(" 或 "),v("code",[_._v("absoult")]),_._v(" 的 "),v("code",[_._v("position")]),_._v("，那么修改他们的 CSS 是不会 reflow 的。")])]),_._v(" "),v("li",[v("p",[_._v("不使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局。")])]),_._v(" "),v("li",[v("p",[_._v("尽量只修改"),v("code",[_._v("position：absolute")]),_._v("或"),v("code",[_._v("fixed")]),_._v("元素，对其他元素影响不大")])]),_._v(" "),v("li",[v("p",[_._v("动画开始"),v("code",[_._v("GPU")]),_._v("加速，"),v("code",[_._v("translate")]),_._v("使用"),v("code",[_._v("3D")]),_._v("变化")])]),_._v(" "),v("li",[v("p",[_._v("提升为合成层")]),_._v(" "),v("p",[_._v("将元素提升为合成层有以下优点：")]),_._v(" "),v("ul",[v("li",[_._v("合成层的位图，会交由 GPU 合成，比 CPU 处理要快")]),_._v(" "),v("li",[_._v("当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层")]),_._v(" "),v("li",[_._v("对于 transform 和 opacity 效果，不会触发 layout 和 paint")])]),_._v(" "),v("p",[_._v("提升合成层的最好方式是使用 CSS 的 will-change 属性：")]),_._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[_._v("#target {\n  will-change: transform;\n}\n")])])]),v("blockquote",[v("p",[_._v("关于合成层的详解请移步"),v("a",{attrs:{href:"https://link.juejin.cn?target=http%3A%2F%2Ftaobaofed.org%2Fblog%2F2016%2F04%2F25%2Fperformance-composite%2F",title:"http://taobaofed.org/blog/2016/04/25/performance-composite/",target:"_blank",rel:"noopener noreferrer"}},[_._v("无线性能优化：Composite"),v("OutboundLink")],1)])])])]),_._v(" "),v("h3",{attrs:{id:"介绍下-304-过程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#介绍下-304-过程"}},[_._v("#")]),_._v(" 介绍下 304 过程")]),_._v(" "),v("ul",[v("li",[_._v("a. 浏览器请求资源时首先命中资源的 Expires 和 Cache-Control，Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效，可以通过 Cache-control: max-age 指定最大生命周期，状态仍然返回 200，但不会请求数据，在浏览器中能明显看到 from cache 字样。")]),_._v(" "),v("li",[_._v("b. 强缓存失效，进入协商缓存阶段，首先验证 ETagETag 可以保证每一个资源是唯一的，资源变化都会导致 ETag 变化。服务器根据客户端上送的 If-None-Match 值来判断是否命中缓存。")]),_._v(" "),v("li",[_._v("c. 协商缓存 Last-Modify/If-Modify-Since 阶段，客户端第一次请求资源时，服务服返回的 header 中会加上 Last-Modify，Last-modify 是一个时间标识该资源的最后修改时间。再次请求该资源时，request 的请求头中会包含 If-Modify-Since，该值为缓存之前返回的 Last-Modify。服务器收到 If-Modify-Since 后，根据资源的最后修改时间判断是否命中缓存。")])]),_._v(" "),v("h3",{attrs:{id:"浏览器的缓存机制-强制缓存-协商缓存"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的缓存机制-强制缓存-协商缓存"}},[_._v("#")]),_._v(" 浏览器的缓存机制 强制缓存 && 协商缓存")]),_._v(" "),v("p",[_._v("浏览器与服务器通信的方式为应答模式，即是：浏览器发起 HTTP 请求 – 服务器响应该请求。那么浏览器第一次向服务器发起该请求后拿到请求结果，会根据响应报文中 HTTP 头的缓存标识，决定是否缓存结果，是则将请求结果和缓存标识存入浏览器缓存中，简单的过程如下图：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/487144abaada4b9a8b34bc9375191ec7~tplv-k3u1fbpfcp-zoom-1.image",alt:"图片"}})]),_._v(" "),v("p",[_._v("由上图我们可以知道：")]),_._v(" "),v("ul",[v("li",[_._v("浏览器每次发起请求，都会"),v("code",[_._v("先在浏览器缓存中查找该请求的结果以及缓存标识")])]),_._v(" "),v("li",[_._v("浏览器每次拿到返回的请求结果都会"),v("code",[_._v("将该结果和缓存标识存入浏览器缓存中")])])]),_._v(" "),v("p",[_._v("以上两点结论就是浏览器缓存机制的关键，他确保了每个请求的缓存存入与读取，只要我们再理解浏览器缓存的使用规则，那么所有的问题就迎刃而解了。为了方便理解，这里根据是否需要向服务器重新发起 HTTP 请求将缓存过程分为两个部分，分别是"),v("code",[_._v("强制缓存")]),_._v("和"),v("code",[_._v("协商缓存")]),_._v("。")]),_._v(" "),v("ul",[v("li",[v("p",[v("strong",[_._v("强制缓存")])]),_._v(" "),v("p",[v("code",[_._v("强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程。")]),_._v("当浏览器向服务器发起请求时，服务器会将缓存规则放入 HTTP 响应报文的 HTTP 头中和请求结果一起返回给浏览器，控制强制缓存的字段分别是 "),v("code",[_._v("Expires")]),_._v(" 和 "),v("code",[_._v("Cache-Control")]),_._v("，其中 Cache-Control 优先级比 Expires 高。")]),_._v(" "),v("p",[_._v("强制缓存的情况主要有三种(暂不分析协商缓存过程)，如下：")]),_._v(" "),v("ol",[v("li",[_._v("不存在该缓存结果和缓存标识，强制缓存失效，则直接向服务器发起请求（跟第一次发起请求一致）。")]),_._v(" "),v("li",[_._v("存在该缓存结果和缓存标识，但该结果已失效，强制缓存失效，则使用协商缓存。")]),_._v(" "),v("li",[_._v("存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效，直接返回该结果")])])]),_._v(" "),v("li",[v("p",[v("strong",[_._v("协商缓存")])]),_._v(" "),v("p",[v("code",[_._v("协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程")]),_._v("，同样，协商缓存的标识也是在响应报文的 HTTP 头中和请求结果一起返回给浏览器的，控制协商缓存的字段分别有："),v("code",[_._v("Last-Modified / If-Modified-Since")]),_._v(" 和 "),v("code",[_._v("Etag / If-None-Match")]),_._v("，其中 Etag / If-None-Match 的优先级比 Last-Modified / If-Modified-Since 高。协商缓存主要有以下两种情况：")]),_._v(" "),v("ol",[v("li",[_._v("协商缓存生效，返回 304")]),_._v(" "),v("li",[_._v("协商缓存失效，返回 200 和请求结果结果")])])])]),_._v(" "),v("p",[_._v("传送门 ☞ "),v("a",{attrs:{href:"https://juejin.cn/post/6992843117963509791",target:"_blank",rel:"noopener noreferrer"}},[_._v("# 彻底理解浏览器的缓存机制"),v("OutboundLink")],1)]),_._v(" "),v("h3",{attrs:{id:"cookie、sessionstorage、localstorage-的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#cookie、sessionstorage、localstorage-的区别"}},[_._v("#")]),_._v(" Cookie、sessionStorage、localStorage 的区别")]),_._v(" "),v("p",[v("strong",[_._v("相同点")]),_._v("：")]),_._v(" "),v("ul",[v("li",[_._v("存储在客户端")])]),_._v(" "),v("p",[v("strong",[_._v("不同点")]),_._v("：")]),_._v(" "),v("ul",[v("li",[_._v("cookie 数据大小不能超过 4k；sessionStorage 和 localStorage 的存储比 cookie 大得多，可以达到 5M+")]),_._v(" "),v("li",[_._v("cookie 设置的过期时间之前一直有效；localStorage 永久存储，浏览器关闭后数据不丢失除非主动删除数据；sessionStorage 数据在当前浏览器窗口关闭后自动删除")]),_._v(" "),v("li",[_._v("cookie 的数据会自动的传递到服务器；sessionStorage 和 localStorage 数据保存在本地")])]),_._v(" "),v("h3",{attrs:{id:"说下进程、线程和协程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#说下进程、线程和协程"}},[_._v("#")]),_._v(" 说下进程、线程和协程")]),_._v(" "),v("p",[v("strong",[_._v("进程")]),_._v("是一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程，"),v("code",[_._v("是操作系统进行资源分配和调度的一个独立单位")]),_._v("，是应用程序运行的载体。进程是一种抽象的概念，从来没有统一的标准定义。")]),_._v(" "),v("p",[v("strong",[_._v("线程")]),_._v("是程序执行中一个单一的顺序控制流程，是"),v("code",[_._v("程序执行流的最小单元")]),_._v("，是处理器调度和分派的基本单位。一个进程可以有一个或多个线程，各个线程之间共享程序的内存空间(也就是所在进程的内存空间)。一个标准的线程由线程 ID、当前指令指针(PC)、寄存器和堆栈组成。而进程由内存空间(代码、数据、进程空间、打开的文件)和一个或多个线程组成。")]),_._v(" "),v("p",[v("strong",[_._v("协程")]),_._v("，英文 Coroutines，是一种"),v("code",[_._v("基于线程之上，但又比线程更加轻量级的存在")]),_._v("，这种由程序员自己写程序来管理的轻量级线程叫做『用户空间线程』，具有对内核来说不可见的特性。")]),_._v(" "),v("p",[v("strong",[_._v("进程和线程的区别与联系")])]),_._v(" "),v("p",[_._v("【区别】：")]),_._v(" "),v("p",[_._v("调度：线程作为调度和分配的基本单位，进程作为拥有资源的基本单位；")]),_._v(" "),v("p",[_._v("并发性：不仅进程之间可以并发执行，同一个进程的多个线程之间也可并发执行；")]),_._v(" "),v("p",[_._v("拥有资源：进程是拥有资源的一个独立单位，线程不拥有系统资源，但可以访问隶属于进程的资源。")]),_._v(" "),v("p",[_._v("系统开销：在创建或撤消进程时，由于系统都要为之分配和回收资源，导致系统的开销明显大于创建或撤消线程时的开销。但是进程有独立的地址空间，一个进程崩溃后，在保护模式下不会对其它进程产生影响，而线程只是一个进程中的不同执行路径。线程有自己的堆栈和局部变量，但线程之间没有单独的地址空间，一个进程死掉就等于所有的线程死掉，所以多进程的程序要比多线程的程序健壮，但在进程切换时，耗费资源较大，效率要差一些。")]),_._v(" "),v("p",[_._v("【联系】：")]),_._v(" "),v("p",[_._v("一个线程只能属于一个进程，而一个进程可以有多个线程，但至少有一个线程；")]),_._v(" "),v("p",[_._v("资源分配给进程，同一进程的所有线程共享该进程的所有资源；")]),_._v(" "),v("p",[_._v("处理机分给线程，即真正在处理机上运行的是线程；")]),_._v(" "),v("p",[_._v("线程在执行过程中，需要协作同步。不同进程的线程间要利用消息通信的办法实现同步。")]),_._v(" "),v("p",[_._v("传送门 ☞ "),v("a",{attrs:{href:"https://juejin.cn/post/7005465381791875109",target:"_blank",rel:"noopener noreferrer"}},[_._v("# 一文搞懂进程、线程、协程及 JS 协程的发展"),v("OutboundLink")],1),_._v(" "),v("a",{attrs:{href:"http://www.360doc.com/content/20/0417/14/32196507_906628857.shtml",target:"_blank",rel:"noopener noreferrer"}},[_._v("☞ 了解更多"),v("OutboundLink")],1)]),_._v(" "),v("p",[_._v("关于浏览器传送门 ☞"),v("a",{attrs:{href:"https://juejin.cn/post/6993095345576083486",target:"_blank",rel:"noopener noreferrer"}},[_._v("# 深入了解现代 Web 浏览器"),v("OutboundLink")],1)]),_._v(" "),v("h3",{attrs:{id:"进程间的通信方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#进程间的通信方式"}},[_._v("#")]),_._v(" 进程间的通信方式")]),_._v(" "),v("p",[v("code",[_._v("进程通信")]),_._v("：\n每个进程各自有不同的用户地址空间,任何一个进程的全局变量在另一个进程中都看不到，所以进程之间要交换数据必须通过内核,在内核中开辟一块缓冲区,进程 A 把数据从用户空间拷到内核缓冲区,进程 B 再从内核缓冲区把数据读走,内核提供的这种机制称为进程间通信。")]),_._v(" "),v("p",[_._v("进程间的通信方式：管道、有名管道、信号、消息队列、共享内存、信号量、socket")]),_._v(" "),v("p",[v("code",[_._v("匿名管道( pipe )")]),_._v("： 管道是一种半双工的通信方式，数据只能"),v("strong",[_._v("单向流动")]),_._v("，而且只能在具有亲缘关系的进程间使用。进程的亲缘关系通常是指"),v("strong",[_._v("父子进程关系")]),_._v("。")]),_._v(" "),v("p",[v("code",[_._v("高级管道(popen)")]),_._v("：将另一个程序当做一个新的进程在当前程序进程中启动，则它算是当前程序的子进程，这种方式我们成为高级管道方式。")]),_._v(" "),v("p",[v("code",[_._v("有名管道 (named pipe)")]),_._v("： 有名管道也是半双工的通信方式，但是它允许无亲缘关系进程间的通信。")]),_._v(" "),v("p",[v("code",[_._v("消息队列( message queue )")]),_._v(" ： 消息队列是由消息的链表，存放在内核中并由消息队列标识符标识。消息队列克服了信号传递信息少、管道只能承载无格式字节流以及缓冲区大小受限等缺点。")]),_._v(" "),v("p",[v("code",[_._v("信号量( semophore )")]),_._v(" ： 信号量是一个计数器，可以用来控制多个进程对共享资源的访问。它常作为一种锁机制，防止某进程正在访问共享资源时，其他进程也访问该资源。因此，主要作为进程间以及同一进程内不同线程之间的同步手段。")]),_._v(" "),v("p",[v("code",[_._v("信号 ( sinal )")]),_._v(" ： 信号是一种比较复杂的通信方式，用于通知接收进程某个事件已经发生。")]),_._v(" "),v("p",[v("code",[_._v("共享内存( shared memory )")]),_._v(" ：共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。共享内存是最快的 IPC 方式，它是针对其他进程间通信方式运行效率低而专门设计的。它往往与其他通信机制，如信号两，配合使用，来实现进程间的同步和通信。")]),_._v(" "),v("p",[v("code",[_._v("套接字( socket ) 通信")]),_._v("： 套接口也是一种进程间通信机制，与其他通信机制不同的是，它可用于不同机器间的进程通信")]),_._v(" "),v("h3",{attrs:{id:"浏览器样式兼容"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器样式兼容"}},[_._v("#")]),_._v(" 浏览器样式兼容")]),_._v(" "),v("h4",{attrs:{id:"一、css-初始化"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#一、css-初始化"}},[_._v("#")]),_._v(" 一、CSS 初始化")]),_._v(" "),v("p",[_._v("每个浏览器的 css 默认样式不尽相同，所以最简单有效的方式就是对其进行初始化（覆盖默认样式）")]),_._v(" "),v("blockquote",[v("p",[_._v("常见 :  *{ margin: 0; padding: 0;}")]),_._v(" "),v("p",[_._v("库：normalize.css")])]),_._v(" "),v("h4",{attrs:{id:"二、浏览器私有属性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#二、浏览器私有属性"}},[_._v("#")]),_._v(" 二、"),v("strong",[_._v("浏览器私有属性")])]),_._v(" "),v("blockquote",[v("p",[_._v("常用的前缀有：")]),_._v(" "),v("p",[_._v("firefox 浏览器 ：-moz-")]),_._v(" "),v("p",[_._v("chrome、safari ：-webkit-")]),_._v(" "),v("p",[_._v("opera ：-o- / -xv-")]),_._v(" "),v("p",[_._v("IE 浏览器 ：-ms-（目前只有 IE 8+支持）")])]),_._v(" "),v("h4",{attrs:{id:"三、css-hack-条件-hack、属性级-hack、选择符级-hack"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#三、css-hack-条件-hack、属性级-hack、选择符级-hack"}},[_._v("#")]),_._v(" "),v("strong",[_._v("三、CSS hack（条件 hack、属性级 hack、选择符级 hack）")])]),_._v(" "),v("h3",{attrs:{id:"js-垃圾回收机制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#js-垃圾回收机制"}},[_._v("#")]),_._v(" JS 垃圾回收机制")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("项目中，如果存在大量不被释放的内存（堆/栈/上下文），页面性能会变得很慢。当某些代码操作不能被合理释放，就会造成内存泄漏。我们尽可能减少使用闭包，因为它会消耗内存。")])]),_._v(" "),v("li",[v("p",[_._v("浏览器垃圾回收机制/内存回收机制:")]),_._v(" "),v("blockquote",[v("p",[_._v("浏览器的"),v("code",[_._v("Javascript")]),_._v("具有自动垃圾回收机制("),v("code",[_._v("GC:Garbage Collecation")]),_._v(")，垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存。")])]),_._v(" "),v("p",[v("strong",[_._v("标记清除")]),_._v(":在"),v("code",[_._v("js")]),_._v("中，最常用的垃圾回收机制是标记清除：当变量进入执行环境时，被标记为“进入环境”，当变量离开执行环境时，会被标记为“离开环境”。垃圾回收器会销毁那些带标记的值并回收它们所占用的内存空间。"),v("br"),_._v(" "),v("strong",[_._v("谷歌浏览器")]),_._v("：“查找引用”，浏览器不定时去查找当前内存的引用，如果没有被占用了，浏览器会回收它；如果被占用，就不能回收。"),v("br"),_._v(" "),v("strong",[_._v("IE 浏览器")]),_._v("：“引用计数法”，当前内存被占用一次，计数累加 1 次，移除占用就减 1，减到 0 时，浏览器就回收它。")])]),_._v(" "),v("li",[v("p",[_._v("优化手段：内存优化 ; 手动释放：取消内存的占用即可。")]),_._v(" "),v("p",[_._v("（1）堆内存：fn = null 【null：空指针对象】")]),_._v(" "),v("p",[_._v("（2）栈内存：把上下文中，被外部占用的堆的占用取消即可。")])]),_._v(" "),v("li",[v("p",[_._v("内存泄漏")]),_._v(" "),v("p",[_._v("在 JS 中，常见的内存泄露主要有 4 种,全局变量、闭包、DOM 元素的引用、定时器")])])])])}),[],!1,null,null,null);v.default=r.exports}}]);