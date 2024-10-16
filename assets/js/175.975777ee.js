(window.webpackJsonp=window.webpackJsonp||[]).push([[175],{511:function(t,a,s){"use strict";s.r(a);var n=s(4),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",{attrs:{"data-nodeid":"4608"}},[t._v("上一讲我们使用 JavaScript 实现了几种常见的数据结构。事实上，前端领域到处体现着数据结构的应用，尤其随着需求的复杂度上升，前端工程师越来越离不开数据结构。React、Vue 这些设计精巧的框架，在线文档编辑系统、大型管理系统，甚至一个简单的检索需求，都离不开数据结构的支持。是否能够掌握这个难点内容，将是进阶的重要考量。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4609"}},[t._v("这一讲，我们就来解析数据结构在前端中的应用场景，以此来帮助大家加深理解，做到灵活应用。")]),t._v(" "),a("h3",{attrs:{"data-nodeid":"5703"}},[t._v("堆栈和队列的应用")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4611"}},[t._v("关于栈和队列的实际应用比比皆是：")]),t._v(" "),a("ul",{attrs:{"data-nodeid":"4612"}},[a("li",{attrs:{"data-nodeid":"4613"}},[a("p",{attrs:{"data-nodeid":"4614"}},[t._v("浏览器的历史记录，因为回退总是回退“上一个”最近的页面，它需要遵循栈的原则；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4615"}},[a("p",{attrs:{"data-nodeid":"4616"}},[t._v("类似浏览器的历史记录，任何 Undo/Redo 都是一个栈的实现；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4617"}},[a("p",{attrs:{"data-nodeid":"4618"}},[t._v("在代码中，广泛应用的递归产生的调用栈，同样也是栈思想的体现，想想我们常说的“栈溢出”就是这个道理；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4619"}},[a("p",{attrs:{"data-nodeid":"4620"}},[t._v("同上，浏览器在抛出异常时，常规都会抛出调用栈信息；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4621"}},[a("p",{attrs:{"data-nodeid":"4622"}},[t._v("在计算机科学领域应用广泛，如进制转换、括号匹配、栈混洗、表达式求值等；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4623"}},[a("p",{attrs:{"data-nodeid":"4624"}},[t._v("队列的应用更为直观，我们常说的宏任务/微任务都是队列，不管是什么类型的任务，都是先进先执行；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4625"}},[a("p",{attrs:{"data-nodeid":"4626"}},[t._v("后端也应用广泛，如消息队列、RabbitMQ、ActiveMQ 等，能起到延迟缓冲的功效。")])])]),t._v(" "),a("p",{attrs:{"data-nodeid":"4627"}},[t._v("另外，与性能话题相关，HTTP 1.1 有一个队头阻塞的问题，而原因就在于队列这样的数据结构的特点。具体来说，在 HTTP 1.1 中，每一个链接都默认是长链接，因此对于同一个 TCP 链接，HTTP 1.1 规定："),a("strong",{attrs:{"data-nodeid":"4709"}},[t._v("服务端的响应返回顺序需要遵循其接收到相应的顺序")]),t._v("。但这样存在一个问题：如果第一个请求处理需要较长时间，响应较慢，将会“拖累”其他后续请求的响应，这是一种队头阻塞。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4628"}},[t._v("HTTP 2 采用了"),a("strong",{attrs:{"data-nodeid":"4715"}},[t._v("二进制分帧和多路复用")]),t._v("等方法，同域名下的通信都在同一个连接上完成，在这个连接上可以并行请求和响应，而互不干扰。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4629"}},[t._v("在框架层面，堆栈和队列的应用更是比比皆是。比如 React 的 Context 特性，参考以下代码：")]),t._v(" "),a("pre",{staticClass:"lang-java",attrs:{"data-nodeid":"4630"}},[a("code",{attrs:{"data-language":"java"}},[t._v('import React from "react";\nconst ContextValue = React.createContext();\nexport default function App() {\n  return (\n    <ContextValue.Provider value={1}>\n      <ContextValue.Consumer>\n        {(value1) => (\n          <ContextValue.Provider value={2}>\n            <ContextValue.Consumer>\n              {(value2) => (\n                <span>\n                  {value1}-{value2}\n                </span>\n              )}\n            </ContextValue.Consumer>\n          </ContextValue.Provider>\n        )}\n      </ContextValue.Consumer>\n    </ContextValue.Provider>\n  );\n}\n')])]),t._v(" "),a("p",{attrs:{"data-nodeid":"4631"}},[t._v("对于以上代码，React 内部就是通过一个栈结构，在构造 Fiber 树时的 beginWork 阶段，将 Context.Provider 数据状态入栈（此时 value1：1 和 value2：2 分别入栈），在 completeWork 阶段，将栈中的数据状态出栈，以供给 Context.Consumer 消费。关于 React 源码中，栈的实现，你可以参考"),a("a",{attrs:{href:"https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberStack.old.js","data-nodeid":"4720"}},[t._v("这部分源码。")])]),t._v(" "),a("h3",{attrs:{"data-nodeid":"6141"}},[t._v("链表的应用")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4633"}},[t._v("React 的核心算法"),a("strong",{attrs:{"data-nodeid":"4731"}},[t._v("Fiber 的实现就是链表")]),t._v("。React 最早开始使用大名鼎鼎的 Stack Reconciler 调度算法，Stack Reconciler 调度算法最大的问题在于：它就像函数调用栈一样，递归地、自顶向下进行 diff 和 render 相关操作，在 Stack Reconciler 执行的过程中，该调度算法始终会占据浏览器主线程。也就是说"),a("strong",{attrs:{"data-nodeid":"4732"}},[t._v("在此期间，用户的交互所触发的布局行为、动画执行任务都不会得到立即响应，从而影响用户体验")]),t._v("。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4634"}},[t._v("因此 React Fiber 将渲染和更新过程进行了拆解，简单来说，就是每次检查虚拟 DOM 的一小部分，在检查间隙会检查“是否还有时间继续执行下一个虚拟 DOM 树上某个分支任务”，同时观察是否有更优先的任务需要响应。如果“没有时间执行下一个虚拟 DOM 树上某个分支任务”，且某项任务有更高优先级，React 就会让出主线程，直到主线程“不忙”的时候继续执行任务。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4635"}},[t._v("React Fiber 的实现也很简单，它将 Stack Reconciler 过程分成块，一次执行一块，执行完一块需要将结果保存起来，根据是否还有空闲的响应时间（requestIdleCallback）来决定下一步策略。当所有的块都已经执行完，就进入提交阶段，这个阶段需要更新 DOM，它是一口气完成的。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4636"}},[t._v("以上是比较主观的介绍，下面我们来看更具体的实现。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4637"}},[t._v("为了达到“随意中断调用栈并手动操作调用栈”，React Fiber 专门用于 React 组件堆栈调用的重新实现，也就是说一个 Fiber 就是一个虚拟堆栈帧，一个 Fiber 的结构类似：")]),t._v(" "),a("pre",{staticClass:"lang-java",attrs:{"data-nodeid":"4638"}},[a("code",{attrs:{"data-language":"java"}},[a("span",{staticClass:"hljs-function"},[t._v("function "),a("span",{staticClass:"hljs-title"},[t._v("FiberNode")]),a("span",{staticClass:"hljs-params"},[t._v("(\n  tag: WorkTag,\n  pendingProps: mixed,\n  key: "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(" | string,\n  mode: TypeOfMode,\n)")]),t._v(" ")]),t._v("{\n  "),a("span",{staticClass:"hljs-comment"},[t._v("// Instance")]),t._v("\n  "),a("span",{staticClass:"hljs-comment"},[t._v("// ...")]),t._v("\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".tag = tag;\n  "),a("span",{staticClass:"hljs-comment"},[t._v("// Fiber")]),t._v("\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".return = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(";\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".child = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(";\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".sibling = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(";\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".index = "),a("span",{staticClass:"hljs-number"},[t._v("0")]),t._v(";\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".ref = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(";\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".pendingProps = pendingProps;\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".memoizedProps = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(";\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".updateQueue = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(";\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".memoizedState = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(";\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".dependencies = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(";\n  "),a("span",{staticClass:"hljs-comment"},[t._v("// Effects")]),t._v("\n  "),a("span",{staticClass:"hljs-comment"},[t._v("// ...")]),t._v("\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".alternate = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(";\n}\n")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"4639"}},[t._v("这么看"),a("strong",{attrs:{"data-nodeid":"4746"}},[t._v("Fiber 就是一个对象，通过 parent、children、sibling 维护一个树形关系")]),t._v("，同时 parent、children、sibling 也都是一个 Fiber 结构，FiberNode.alternate 这个属性来存储上一次渲染过的结果，事实上"),a("strong",{attrs:{"data-nodeid":"4747"}},[t._v("整个 Fiber 模式就是一个链表")]),t._v("。React 也借此，从依赖于内置堆栈的同步递归模型，变为具有链表和指针的异步模型了。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4640"}},[t._v("具体的渲染过程：")]),t._v(" "),a("pre",{staticClass:"lang-java",attrs:{"data-nodeid":"4641"}},[a("code",{attrs:{"data-language":"java"}},[t._v(" "),a("span",{staticClass:"hljs-function"},[t._v("function "),a("span",{staticClass:"hljs-title"},[t._v("renderNode")]),a("span",{staticClass:"hljs-params"},[t._v("(node)")]),t._v(" ")]),t._v("{\n   "),a("span",{staticClass:"hljs-comment"},[t._v("// 判断是否需要渲染该节点，如果 props 发生变化，则调用 render")]),t._v("\n   "),a("span",{staticClass:"hljs-keyword"},[t._v("if")]),t._v(" (node.memoizedProps !== node.pendingProps) {\n      render(node)\n   }\n   "),a("span",{staticClass:"hljs-comment"},[t._v("// 是否有子节点，进行子节点渲染")]),t._v("\n   "),a("span",{staticClass:"hljs-keyword"},[t._v("if")]),t._v(" (node.child !== "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(") {\n      "),a("span",{staticClass:"hljs-keyword"},[t._v("return")]),t._v(" node.child\n   "),a("span",{staticClass:"hljs-comment"},[t._v("// 是否有兄弟节点，进行兄弟点渲染")]),t._v("\n   } "),a("span",{staticClass:"hljs-keyword"},[t._v("else")]),t._v(" "),a("span",{staticClass:"hljs-keyword"},[t._v("if")]),t._v(" (node.sibling !== "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v("){\n      "),a("span",{staticClass:"hljs-keyword"},[t._v("return")]),t._v(" node.sibling\n   "),a("span",{staticClass:"hljs-comment"},[t._v("// 没有子节点和兄弟节点")]),t._v("\n   } "),a("span",{staticClass:"hljs-keyword"},[t._v("else")]),t._v(" "),a("span",{staticClass:"hljs-keyword"},[t._v("if")]),t._v(" (node.return !== "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v("){\n      return node.return\n   } "),a("span",{staticClass:"hljs-keyword"},[t._v("else")]),t._v(" {\n      return "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v("\n   }\n}\n"),a("span",{staticClass:"hljs-function"},[t._v("function "),a("span",{staticClass:"hljs-title"},[t._v("workloop")]),a("span",{staticClass:"hljs-params"},[t._v("(root)")]),t._v(" ")]),t._v("{\n   nextNode = "),a("span",{staticClass:"hljs-function"},[t._v("root\n   "),a("span",{staticClass:"hljs-title"},[t._v("while")]),t._v(" "),a("span",{staticClass:"hljs-params"},[t._v("(nextNode !== "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(" && (no other high priority task)")]),t._v(") ")]),t._v("{\n      nextNode = renderNode(nextNode)\n   }\n}\n")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"4642"}},[t._v("注意在 Workloop 当中，while 条件"),a("code",{attrs:{"data-backticks":"1","data-nodeid":"4750"}},[t._v("nextNode !== null && (no other high priority task)")]),t._v("，这是"),a("strong",{attrs:{"data-nodeid":"4756"}},[t._v("描述 Fiber 工作原理的关键伪代码")]),t._v("。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4643"}},[t._v("下面我们换个角度再次说明。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4644"}},[t._v("在 Fiber 之前，React 递归遍历虚拟 DOM，在遍历过程中找到前后两颗虚拟 DOM 的差异，并生成一个 Mutation。这种递归遍历有一个局限性：每次递归都会在栈中"),a("strong",{attrs:{"data-nodeid":"4763"}},[t._v("添加一个同步帧")]),t._v("，因此无法将遍历过程拆分为粒度更小的工作单元，也就无法暂停组件的更新，并在未来的某段时间恢复更新。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"7021"}},[t._v("如何不通过递归的形式去遍历呢？基于链表的 Fiber 模型应运而生。最早的原始模型你可以在 2016 年的 "),a("a",{attrs:{href:"https://github.com/facebook/react/issues/7942?source=post_page---------------------------#issue-182373497","data-nodeid":"7025"}},[t._v("issue")]),t._v(" 中找到。另外，React 中的 Hooks，也是通过链表这个数据结构实现的。")]),t._v(" "),a("h3",{attrs:{"data-nodeid":"7463"}},[t._v("树的应用")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4647"}},[t._v("从应用上来看，我们前端开发离不开的 DOM 就是一个树状结构；同理，不管是 React 还是 Vue 的虚拟 DOM 也都是树。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4648"}},[t._v("上文中我们提到了 React Element 树和 Fiber 树，React Element 树其实就是各级组件渲染，调用 React.createElement 返回 React Element 之后（每一个 React 组件，不管是 class 组件或 functional 组件，调用一次 render 或执行一次 function，就会生成 React Element 节点）的总和。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"8348"}},[t._v("React Element 树和 Fiber 树是在 reconciler 过程中，相互交替，逐级构造进行的。这个生成过程，就"),a("strong",{attrs:{"data-nodeid":"8358"}},[t._v("采用了 DFS 遍历")]),t._v("，主要源码位于 "),a("a",{attrs:{href:"https://github.com/facebook/react/blob/v17.0.1/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L1558","data-nodeid":"8356"}},[t._v("ReactFiberWorkLoop.js")]),t._v(" 中。我这里进行简化，你可以清晰看到 DFS 过程：")]),t._v(" "),a("pre",{staticClass:"lang-java",attrs:{"data-nodeid":"4650"}},[a("code",{attrs:{"data-language":"java"}},[a("span",{staticClass:"hljs-function"},[t._v("function "),a("span",{staticClass:"hljs-title"},[t._v("workLoopSync")]),a("span",{staticClass:"hljs-params"},[t._v("()")]),t._v(" ")]),t._v("{\n  "),a("span",{staticClass:"hljs-comment"},[t._v("// 开始循环")]),t._v("\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("while")]),t._v(" (workInProgress !== "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(") {\n    performUnitOfWork(workInProgress);\n  }\n}\n"),a("span",{staticClass:"hljs-function"},[t._v("function "),a("span",{staticClass:"hljs-title"},[t._v("performUnitOfWork")]),a("span",{staticClass:"hljs-params"},[t._v("(unitOfWork: Fiber)")]),t._v(": "),a("span",{staticClass:"hljs-keyword"},[t._v("void")]),t._v(" ")]),t._v("{\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("const")]),t._v(" current = unitOfWork.alternate;\n  let next;\n  "),a("span",{staticClass:"hljs-comment"},[t._v("// beginWork 阶段，向下遍历子孙组件")]),t._v("\n  next = beginWork(current, unitOfWork, subtreeRenderLanes);\n  "),a("span",{staticClass:"hljs-keyword"},[t._v("if")]),t._v(" (next === "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(") {\n    "),a("span",{staticClass:"hljs-comment"},[t._v("// completeUnitOfWork 是向上回溯树阶段")]),t._v("\n    completeUnitOfWork(unitOfWork);\n  } "),a("span",{staticClass:"hljs-keyword"},[t._v("else")]),t._v(" {\n    workInProgress = next;\n  }\n}\n")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"8795"}},[t._v("另外，React 中，当 context 数据状态改变时，需要"),a("strong",{attrs:{"data-nodeid":"8805"}},[t._v("找出依赖该 context 数据状态的所有子节点，以进行状态变更和渲染")]),t._v("。这个过程，也是一个 DFS，源码你可以参考 "),a("a",{attrs:{href:"https://github.com/facebook/react/blob/v17.0.1/packages/react-reconciler/src/ReactFiberNewContext.old.js#L182-L295","data-nodeid":"8803"}},[t._v("ReactFiberNewContext.js")]),t._v("。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4652"}},[t._v("继续树的应用这个话题，上一讲中我们介绍了二叉搜索树，这里我们来介绍字典树这个概念，并说明其应用场景。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4653"}},[t._v("字典树（Trie）是针对特定类型的搜索而优化的树数据结构。典型的例子是 AutoComplete（自动填充），也就是说它适合实现“"),a("strong",{attrs:{"data-nodeid":"4798"}},[t._v("通过部分值得到完整值")]),t._v("”的场景。因此字典树也是一种搜索树，我们有时候也叫作前缀树，因为任意一个节点的后代都存在共同的前缀。当然，更多基础概念需要你提前了解。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4654"}},[t._v("我们总结一下它的特点：")]),t._v(" "),a("ul",{attrs:{"data-nodeid":"4655"}},[a("li",{attrs:{"data-nodeid":"4656"}},[a("p",{attrs:{"data-nodeid":"4657"}},[t._v("字典树能做到高效查询和插入，时间复杂度为 O(k)，k 为字符串长度；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4658"}},[a("p",{attrs:{"data-nodeid":"4659"}},[t._v("但是如果大量字符串没有共同前缀，就很耗内存，你可以想象一下最极端的情况，所有单词都没有共同前缀时，这颗字典树会是什么样子；")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4660"}},[a("p",{attrs:{"data-nodeid":"4661"}},[t._v("字典树的核心就是"),a("strong",{attrs:{"data-nodeid":"4807"}},[t._v("减少不必要的字符比较，提高查询效率")]),t._v("，也就是说用空间换时间，再利用共同前缀来提高查询效率。")])])]),t._v(" "),a("p",{attrs:{"data-nodeid":"4662"}},[t._v("除了我们刚刚提到的 AutoComplete 自动填充的情况，字典树还有很多其他应用场景：")]),t._v(" "),a("ul",{attrs:{"data-nodeid":"4663"}},[a("li",{attrs:{"data-nodeid":"4664"}},[a("p",{attrs:{"data-nodeid":"4665"}},[t._v("搜索")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4666"}},[a("p",{attrs:{"data-nodeid":"4667"}},[t._v("分类")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4668"}},[a("p",{attrs:{"data-nodeid":"4669"}},[t._v("IP 地址检索")])]),t._v(" "),a("li",{attrs:{"data-nodeid":"4670"}},[a("p",{attrs:{"data-nodeid":"4671"}},[t._v("电话号码检索")])])]),t._v(" "),a("p",{attrs:{"data-nodeid":"4672"}},[t._v("字典树的实现也不复杂，我们可以一步步来，首先实现一个字典树上的节点，如下代码：")]),t._v(" "),a("pre",{staticClass:"lang-java",attrs:{"data-nodeid":"4673"}},[a("code",{attrs:{"data-language":"java"}},[a("span",{staticClass:"hljs-class"},[a("span",{staticClass:"hljs-keyword"},[t._v("class")]),t._v(" "),a("span",{staticClass:"hljs-title"},[t._v("PrefixTreeNode")]),t._v(" ")]),t._v("{\n  constructor(value) {\n    "),a("span",{staticClass:"hljs-comment"},[t._v("// 存储子节点")]),t._v("\n    "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".children = {}\n    "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".isEnd = "),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v("\n    "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".value = value\n  }\n}\n")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"4674"}},[t._v("一个字典树继承 PrefixTreeNode 类，如下代码：")]),t._v(" "),a("pre",{staticClass:"lang-java",attrs:{"data-nodeid":"4675"}},[a("code",{attrs:{"data-language":"java"}},[a("span",{staticClass:"hljs-class"},[a("span",{staticClass:"hljs-keyword"},[t._v("class")]),t._v(" "),a("span",{staticClass:"hljs-title"},[t._v("PrefixTree")]),t._v(" "),a("span",{staticClass:"hljs-keyword"},[t._v("extends")]),t._v(" "),a("span",{staticClass:"hljs-title"},[t._v("PrefixTreeNode")]),t._v(" ")]),t._v("{\n  constructor() {\n    "),a("span",{staticClass:"hljs-keyword"},[t._v("super")]),t._v("("),a("span",{staticClass:"hljs-keyword"},[t._v("null")]),t._v(")\n  }\n}\n")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"4676"}},[t._v("我们可以通过下述方法实现：")]),t._v(" "),a("ul",{attrs:{"data-nodeid":"4677"}},[a("li",{attrs:{"data-nodeid":"4678"}},[a("p",{attrs:{"data-nodeid":"4679"}},[t._v("addWord：创建一个字典树节点，如下代码：")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addWord")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("str")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("addWordHelper")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" str")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 当前 node 不含当前 str 开头的目标")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 以当前 str 开头的第一个字母，创建一个 PrefixTreeNode 实例")]),t._v("\n            node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PrefixTreeNode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isEnd "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addWordHelper")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("slice")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addWordHelper")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("span "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hljs-keyword"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("span"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",{attrs:{"data-nodeid":"4681"}},[a("li",{attrs:{"data-nodeid":"4682"}},[a("p",{attrs:{"data-nodeid":"4683"}},[t._v("predictWord：给定一个字符串，返回字典树中以该字符串开头的所有单词，如下代码：")])])]),t._v(" "),a("pre",{staticClass:"lang-java",attrs:{"data-nodeid":"4684"}},[a("code",{attrs:{"data-language":"java"}},[t._v("predictWord(str) {\n    let getRemainingTree = function(str, tree) {\n      let node = "),a("span",{staticClass:"hljs-function"},[t._v("tree\n      "),a("span",{staticClass:"hljs-title"},[t._v("while")]),t._v(" "),a("span",{staticClass:"hljs-params"},[t._v("(str)")]),t._v(" ")]),t._v("{\n        node = node.children[str["),a("span",{staticClass:"hljs-number"},[t._v("0")]),t._v("]]\n        str = str.substr("),a("span",{staticClass:"hljs-number"},[t._v("1")]),t._v(")\n      }\n      "),a("span",{staticClass:"hljs-keyword"},[t._v("return")]),t._v(" node\n    }\n    "),a("span",{staticClass:"hljs-comment"},[t._v("// 该数组维护所有以 str 开头的单词")]),t._v("\n    let allWords = []\n    let allWordsHelper = function(stringSoFar, tree) {\n      "),a("span",{staticClass:"hljs-keyword"},[t._v("for")]),t._v(" (let k in tree.children) {\n        "),a("span",{staticClass:"hljs-keyword"},[t._v("const")]),t._v(" child = tree.children[k]\n        let newString = stringSoFar + child."),a("span",{staticClass:"hljs-function"},[t._v("value\n        "),a("span",{staticClass:"hljs-title"},[t._v("if")]),t._v(" "),a("span",{staticClass:"hljs-params"},[t._v("(child.endWord)")]),t._v(" ")]),t._v("{\n          allWords.push(newString)\n        }\n        allWordsHelper(newString, child)\n      }\n    }\n    let remainingTree = getRemainingTree(str, "),a("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(")\n    "),a("span",{staticClass:"hljs-keyword"},[t._v("if")]),t._v(" (remainingTree) {\n      allWordsHelper(str, remainingTree)\n    }\n    "),a("span",{staticClass:"hljs-keyword"},[t._v("return")]),t._v(" allWords\n}\n")])]),t._v(" "),a("p",{attrs:{"data-nodeid":"4685"}},[t._v("至此，我们实现了一个字典树的数据结构。")]),t._v(" "),a("h3",{staticClass:"te-preview-highlight",attrs:{"data-nodeid":"9682"}},[t._v("总结")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4687"}},[t._v("这一讲，我们针对上一讲中的经典数据结构，结合前端应用场景进行了逐一分析。我们能够看到，无论是框架还是业务代码，都离不开数据结构的支持。数据结构也是计算机编程领域中一个最基础也是最重要的概念，它既是重点，也是难点。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4688"}},[t._v("本讲内容总结如下：")]),t._v(" "),a("p",{attrs:{"data-nodeid":"9242"}},[a("img",{attrs:{src:"https://s0.lgstatic.com/i/image6/M01/04/F9/CioPOWAvaxqAbp7IAAFyTqrjeO4673.png",alt:"Drawing 0.png","data-nodeid":"9245"}})]),t._v(" "),a("p",{attrs:{"data-nodeid":"4690"}},[t._v("说到底，数据结构的真正意义在于应用，这里给大家留一个思考题，你还在哪些场景看见过数据结构呢？欢迎在留言区和我分享你的观点。")]),t._v(" "),a("p",{attrs:{"data-nodeid":"4691"}},[t._v("下一讲，我们就正式进入前端架构设计的实战部分，这也是本专栏的核心环节，是对之前所学知识的综合运用和设计，请继续保持学习！")]),t._v(" "),a("hr"),t._v(" "),a("h3",{attrs:{id:"精选评论"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#精选评论"}},[t._v("#")]),t._v(" 精选评论")])])}),[],!1,null,null,null);a.default=e.exports}}]);