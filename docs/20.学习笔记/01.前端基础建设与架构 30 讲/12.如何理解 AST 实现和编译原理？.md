<p data-nodeid="27419">经常留意前端开发技术的同学一定对 AST 技术不陌生。AST 技术是现代化前端基建和工程化建设的基石：Babel、Webpack、ESLint、代码压缩工具等耳熟能详的工程化基建工具或流程，都离不开 AST 技术；Vue、React 等经典前端框架，也离不开基于 AST 技术的编译。</p>
<p data-nodeid="27420">目前社区上不乏 Babel 插件、Webpack 插件等知识的讲解，但是涉及 AST 的部分，往往都是使用现成工具转载模版代码。这一讲，我们就从 AST 基础理念讲起，并实现一个简单的 AST 实战脚本。</p>
<h3 data-nodeid="27421">AST 基础知识</h3>
<p data-nodeid="27422">我们先对 AST 下一个定义，AST 是 Abstract Syntax Tree 的缩写，表示抽象语法树：</p>
<blockquote data-nodeid="27423">
<p data-nodeid="27424">在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax Tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。比如，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现；而类似 if-condition-then 这样的条件跳转语句，可以使用带有三个分支的节点来表示。</p>
</blockquote>
<p data-nodeid="27425">AST 的应用场景经常出现在源代码的编译过程中：一般语法分析器创建出 AST，然后 AST 在语义分析阶段添加一些信息，甚至修改 AST 内容，最终产出编译后代码。</p>
<h4 data-nodeid="27426">AST 初体验</h4>
<p data-nodeid="27427">了解了 AST 基本概念，我们对 AST 进行一个“感官认知”。这里提供给你一个平台：<a href="https://astexplorer.net/" data-nodeid="27534">AST explorer</a>，在这个平台中，可以实时看到 JavaScript 代码转换为 AST 之后的产出结果。如下图所示：</p>
<p data-nodeid="29395" class=""><img src="https://s0.lgstatic.com/i/image2/M01/06/ED/Cip5yGAGmb2ABDuIAAE1iKphCso409.png" alt="Drawing 0.png" data-nodeid="29399"></p>
<div data-nodeid="29396"><p style="text-align:center">AST 在线分析结果图</p></div>



<p data-nodeid="27430">可以看到，经过 AST 转换，我们的 JavaScript 代码（左侧）变成了一种 ESTree 规范的数据结构（右侧），这种数据结构就是 AST。</p>
<p data-nodeid="30526" class="">这个平台实际使用了 <a href="https://github.com/acornjs/acorn" data-nodeid="30530">acorn</a> 作为 AST 解析器。下面我们就来介绍一下 acorn，本节内容我们将要实现的脚本，也会依赖 acorn 的能力。</p>


<h4 data-nodeid="27432">acorn 解析</h4>
<p data-nodeid="27433">实际上，社区上多项著名项目都依赖的 acorn 的能力（比如 ESLint、Babel、Vue.js 等），acorn 的介绍为：</p>
<blockquote data-nodeid="27434">
<p data-nodeid="27435">A tiny, fast JavaScript parser, written completely in JavaScript.</p>
</blockquote>
<p data-nodeid="27436">由此可知，acorn 是一个完全使用 JavaScript 实现的、小型且快速的 JavaScript 解析器。基本用法非常简单，代码如下：</p>
<pre class="lang-java" data-nodeid="27437"><code data-language="java">let acorn = require(<span class="hljs-string">'acorn'</span>)
let code = <span class="hljs-number">1</span> + <span class="hljs-number">2</span>
console.log(acorn.parse(code))
</code></pre>
<p data-nodeid="27438">更多使用方式我们不再一一列举。你可以结合<a href="https://github.com/acornjs/acorn" data-nodeid="27553">相关源码</a>进一步学习。</p>
<p data-nodeid="27439">我们将视线更多地聚焦 acorn 的内部实现中。对所有语法解析器来说，实现流程上很简单，如下图所示：</p>
<p data-nodeid="31651" class=""><img src="https://s0.lgstatic.com/i/image2/M01/06/EE/Cip5yGAGmc2AAm_DAADuYazKZ4U044.png" alt="Lark20210119-163409.png" data-nodeid="31655"></p>
<div data-nodeid="31652"><p style="text-align:center">acorn 工作流程图</p></div>



<p data-nodeid="27442">源代码经过词法分析，即分词得到 Token 序列，对 Token 序列进行语法分析，得到最终 AST 结果。但 acorn 稍有不同的是：<strong data-nodeid="27565">acorn 将词法分析和语法分析交替进行，只需要扫描一遍代码即可得到最终 AST 结果</strong>。</p>
<p data-nodeid="27443">acorn 的 Parser 类<a href="https://github.com/acornjs/acorn/blob/master/acorn/src/state.js" data-nodeid="27569">源码</a>形如：</p>
<pre class="lang-java" data-nodeid="27444"><code data-language="java">export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parser</span> </span>{
  constructor(options, input, startPos) {
    <span class="hljs-comment">//...</span>
  }
  parse() {
    <span class="hljs-comment">// ...</span>
  }
  <span class="hljs-comment">// 判断所处 context</span>
  <span class="hljs-function">get <span class="hljs-title">inFunction</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.currentVarScope().flags &amp; SCOPE_FUNCTION) &gt; <span class="hljs-number">0</span> }
  <span class="hljs-function">get <span class="hljs-title">inGenerator</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.currentVarScope().flags &amp; SCOPE_GENERATOR) &gt; <span class="hljs-number">0</span> }
  <span class="hljs-function">get <span class="hljs-title">inAsync</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.currentVarScope().flags &amp; SCOPE_ASYNC) &gt; <span class="hljs-number">0</span> }
  <span class="hljs-function">get <span class="hljs-title">allowSuper</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.currentThisScope().flags &amp; SCOPE_SUPER) &gt; <span class="hljs-number">0</span> }
  <span class="hljs-function">get <span class="hljs-title">allowDirectSuper</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.currentThisScope().flags &amp; SCOPE_DIRECT_SUPER) &gt; <span class="hljs-number">0</span> }
  <span class="hljs-function">get <span class="hljs-title">treatFunctionsAsVar</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.treatFunctionsAsVarInScope(<span class="hljs-keyword">this</span>.currentScope()) }
  <span class="hljs-function">get <span class="hljs-title">inNonArrowFunction</span><span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.currentThisScope().flags &amp; SCOPE_FUNCTION) &gt; <span class="hljs-number">0</span> }
  <span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-title">extend</span><span class="hljs-params">(...plugins)</span> </span>{
    <span class="hljs-comment">// ...</span>
  }
  <span class="hljs-comment">// 解析入口</span>
  <span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-title">parse</span><span class="hljs-params">(input, options)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>(options, input).parse()
  }
  <span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-title">parseExpressionAt</span><span class="hljs-params">(input, pos, options)</span> </span>{
    let parser = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>(options, input, pos)
    parser.nextToken()
    <span class="hljs-keyword">return</span> parser.parseExpression()
  }
  <span class="hljs-comment">// 分词入口</span>
  <span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-title">tokenizer</span><span class="hljs-params">(input, options)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>(options, input)
  }
}
</code></pre>
<p data-nodeid="27445">我们稍做解释：</p>
<ul data-nodeid="27446">
<li data-nodeid="27447">
<p data-nodeid="27448">type 表示当前 Token 类型；</p>
</li>
<li data-nodeid="27449">
<p data-nodeid="27450">pos 表示当前 Token 所在源代码中的位置；</p>
</li>
<li data-nodeid="27451">
<p data-nodeid="27452">startNode 方法返回当前 AST 节点；</p>
</li>
<li data-nodeid="27453">
<p data-nodeid="27454">nextToken 方法从源代码中读取下一个 Token；</p>
</li>
<li data-nodeid="27455">
<p data-nodeid="27456">parseTopLevel 方法实现递归向下组装 AST 树。</p>
</li>
</ul>
<p data-nodeid="27457">这是 acorn 实现解析 AST 的入口骨架，实际的分词环节主要解决以下问题。</p>
<ol data-nodeid="27458">
<li data-nodeid="27459">
<p data-nodeid="27460">明确需要分析哪些 Token 类型。</p>
</li>
</ol>
<ul data-nodeid="27461">
<li data-nodeid="27462">
<p data-nodeid="27463">关键字：import，function，return 等</p>
</li>
<li data-nodeid="27464">
<p data-nodeid="27465">变量名称</p>
</li>
<li data-nodeid="27466">
<p data-nodeid="27467">运算符号</p>
</li>
<li data-nodeid="27468">
<p data-nodeid="27469">结束符号</p>
</li>
</ul>
<ol start="2" data-nodeid="27470">
<li data-nodeid="27471">
<p data-nodeid="27472">状态机：简单来讲就是消费每一个源代码中的字符，对字符意义进行状态机判断。以“我们对于<code data-backticks="1" data-nodeid="27584">/</code>的处理”为例，对于<code data-backticks="1" data-nodeid="27586">3/10</code>的源代码，<code data-backticks="1" data-nodeid="27588">/</code>就表示一个运算符号；对于<code data-backticks="1" data-nodeid="27590">var re = /ab+c/</code>源代码来说，<code data-backticks="1" data-nodeid="27592">/</code>就表示正则运算的起始字符了。</p>
</li>
</ol>
<p data-nodeid="27473">在分词过程中，实现者往往使用一个 Context 来表达一个上下文，实际上<strong data-nodeid="27603">Context 是一个栈数据结果</strong>（这一部分源码你可以点击<a href="https://github.com/acornjs/acorn/tree/master/acorn/src" data-nodeid="27601">这里</a>阅读）。</p>
<p data-nodeid="27474">acorn 在语法解析阶段主要完成 AST 的封装以及错误抛出。在这个过程中，需要你了解，一段源代码可以用：</p>
<ul data-nodeid="27475">
<li data-nodeid="27476">
<p data-nodeid="27477">Program——整个程序</p>
</li>
<li data-nodeid="27478">
<p data-nodeid="27479">Statement——语句</p>
</li>
<li data-nodeid="27480">
<p data-nodeid="27481">Expression——表达式</p>
</li>
</ul>
<p data-nodeid="27482">来描述。</p>
<p data-nodeid="27483">当然，<strong data-nodeid="27614">Program 包含了多段 Statement，Statement 又由多个 Expression 或者 Statement 组成</strong>。这三种大元素，就构成了遵循 ESTree 规范的 AST。最终的 AST 产出，也是这三种元素的数据结构拼合。具体实现代码我们不再探究。</p>
<p data-nodeid="27484">下面我们通过 acorn 以及一个脚本，来实现非常简易的 Tree Shaking 能力。</p>
<h3 data-nodeid="27485">AST 实战演练——实现一个简易 Tree Shaking 脚本</h3>
<p data-nodeid="27486">上一讲我们介绍了 Tree Shaking 技术的方方面面。下面，我们就基于本节内容的主题——AST，来实现一个简单的 DCE（dead code elimination）。</p>
<p data-nodeid="27487">目标如下，实现一个 Node.js 脚本 treeShaking.js，执行命令：</p>
<pre class="lang-java" data-nodeid="27488"><code data-language="java">node treeShaking test.js
</code></pre>
<p data-nodeid="27489">可以将<code data-backticks="1" data-nodeid="27620">test.js</code>中的 dead code 消除。我们使用<code data-backticks="1" data-nodeid="27622">test.js</code>测试代码如下：</p>
<pre class="lang-java" data-nodeid="27490"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">add</span><span class="hljs-params">(a, b)</span> </span>{
    <span class="hljs-keyword">return</span> a + b
}
<span class="hljs-function">function <span class="hljs-title">multiple</span><span class="hljs-params">(a, b)</span> </span>{
    <span class="hljs-keyword">return</span> a * b
}
<span class="hljs-keyword">var</span> firstOp = <span class="hljs-number">9</span>
<span class="hljs-keyword">var</span> secondOp = <span class="hljs-number">10</span>
add(firstOp, secondOp)
</code></pre>
<p data-nodeid="27491">理论上讲，上述代码中的<code data-backticks="1" data-nodeid="27625">multiple</code>方法可以被“摇掉”。</p>
<p data-nodeid="27492">我们进入实现环节，首先请看下图，了解整体架构流程：</p>
<p data-nodeid="32771" class=""><img src="https://s0.lgstatic.com/i/image/M00/8F/0E/CgqCHmAGmeCARZ9QAAKowCLHfGk667.png" alt="Lark20210119-163411.png" data-nodeid="32775"></p>
<div data-nodeid="32772"><p style="text-align:center">基于 AST 的 tree-shaking 简易实现</p></div>



<p data-nodeid="27495">设计 JSEmitter 类，用于根据 AST 产出 JavaScript 代码（js-emitter.js 文件内容）：</p>
<pre class="lang-java" data-nodeid="27496"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">JSEmitter</span> </span>{
    <span class="hljs-comment">// 访问变量声明，以下都是工具方法</span>
    visitVariableDeclaration(node) {
        let str = <span class="hljs-string">''</span>
        str += node.kind + <span class="hljs-string">' '</span>
        str += <span class="hljs-keyword">this</span>.visitNodes(node.declarations)
        <span class="hljs-keyword">return</span> str + <span class="hljs-string">'\n'</span>
    }
    visitVariableDeclarator(node, kind) {
        let str = <span class="hljs-string">''</span>
        str += kind ? kind + <span class="hljs-string">' '</span> : str
        str += <span class="hljs-keyword">this</span>.visitNode(node.id)
        str += <span class="hljs-string">'='</span>
        str += <span class="hljs-keyword">this</span>.visitNode(node.init)
        <span class="hljs-keyword">return</span> str + <span class="hljs-string">';'</span> + <span class="hljs-string">'\n'</span>
    }
    visitIdentifier(node) {
        <span class="hljs-keyword">return</span> node.name
    }
    visitLiteral(node) {
        <span class="hljs-keyword">return</span> node.raw
    }
    visitBinaryExpression(node) {
        let str = <span class="hljs-string">''</span>
        str += <span class="hljs-keyword">this</span>.visitNode(node.left)
        str += node.operator
        str += <span class="hljs-keyword">this</span>.visitNode(node.right)
        <span class="hljs-keyword">return</span> str + <span class="hljs-string">'\n'</span>
    }
    visitFunctionDeclaration(node) {
        let str = <span class="hljs-string">'function '</span>
        str += <span class="hljs-keyword">this</span>.visitNode(node.id)
        str += <span class="hljs-string">'('</span>
        <span class="hljs-keyword">for</span> (let param = <span class="hljs-number">0</span>; param &lt; node.params.length; param++) {
            str += <span class="hljs-keyword">this</span>.visitNode(node.params[param])
            str += ((node.params[param] == undefined) ? <span class="hljs-string">''</span> : <span class="hljs-string">','</span>)
        }
        str = str.slice(<span class="hljs-number">0</span>, str.length - <span class="hljs-number">1</span>)
        str += <span class="hljs-string">'){'</span>
        str += <span class="hljs-keyword">this</span>.visitNode(node.body)
        str += <span class="hljs-string">'}'</span>
        <span class="hljs-keyword">return</span> str + <span class="hljs-string">'\n'</span>
    }
    visitBlockStatement(node) {
        let str = <span class="hljs-string">''</span>
        str += <span class="hljs-keyword">this</span>.visitNodes(node.body)
        <span class="hljs-keyword">return</span> str
    }
    visitCallExpression(node) {
        let str = <span class="hljs-string">''</span>
        <span class="hljs-keyword">const</span> callee = <span class="hljs-keyword">this</span>.visitIdentifier(node.callee)
        str += callee + <span class="hljs-string">'('</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> arg of node.arguments) {
            str += <span class="hljs-keyword">this</span>.visitNode(arg) + <span class="hljs-string">','</span>
        }
        str = str.slice(<span class="hljs-number">0</span>, str.length - <span class="hljs-number">1</span>)
        str += <span class="hljs-string">');'</span>
        <span class="hljs-keyword">return</span> str + <span class="hljs-string">'\n'</span>
    }
    visitReturnStatement(node) {
        let str = <span class="hljs-string">'return '</span>;
        str += <span class="hljs-keyword">this</span>.visitNode(node.argument)
        <span class="hljs-keyword">return</span> str + <span class="hljs-string">'\n'</span>
    }
    visitExpressionStatement(node) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.visitNode(node.expression)
    }
    visitNodes(nodes) {
        let str = <span class="hljs-string">''</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> node of nodes) {
            str += <span class="hljs-keyword">this</span>.visitNode(node)
        }
        <span class="hljs-keyword">return</span> str
    }
    <span class="hljs-comment">// 根据类型，执行相关处理函数</span>
    visitNode(node) {
        let str = <span class="hljs-string">''</span>
        <span class="hljs-keyword">switch</span> (node.type) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">'VariableDeclaration'</span>:
                str += <span class="hljs-keyword">this</span>.visitVariableDeclaration(node)
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'VariableDeclarator'</span>:
                str += <span class="hljs-keyword">this</span>.visitVariableDeclarator(node)
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'Literal'</span>:
                str += <span class="hljs-keyword">this</span>.visitLiteral(node)
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'Identifier'</span>:
                str += <span class="hljs-keyword">this</span>.visitIdentifier(node)
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'BinaryExpression'</span>:
                str += <span class="hljs-keyword">this</span>.visitBinaryExpression(node)
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'FunctionDeclaration'</span>:
                str += <span class="hljs-keyword">this</span>.visitFunctionDeclaration(node)
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'BlockStatement'</span>:
                str += <span class="hljs-keyword">this</span>.visitBlockStatement(node)
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"CallExpression"</span>:
                str += <span class="hljs-keyword">this</span>.visitCallExpression(node)
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"ReturnStatement"</span>:
                str += <span class="hljs-keyword">this</span>.visitReturnStatement(node)
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"ExpressionStatement"</span>:
                str += <span class="hljs-keyword">this</span>.visitExpressionStatement(node)
                <span class="hljs-keyword">break</span>;
        }
        <span class="hljs-keyword">return</span> str
    }
    <span class="hljs-comment">// 入口</span>
    run(body) {
        let str = <span class="hljs-string">''</span>
        str += <span class="hljs-keyword">this</span>.visitNodes(body)
        <span class="hljs-keyword">return</span> str
    }
}
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = JSEmitter
</code></pre>
<p data-nodeid="27497">我们来具体分析一下，JSEmitter 类中创建了很多 visitXXX 方法，他们最终都会产出 JavaScript 代码。我们继续结合<code data-backticks="1" data-nodeid="27634">treeShaking.js</code>的实现来理解：</p>
<pre class="lang-java" data-nodeid="27498"><code data-language="java"><span class="hljs-keyword">const</span> acorn = require(<span class="hljs-string">"acorn"</span>)
<span class="hljs-keyword">const</span> l = console.log
<span class="hljs-keyword">const</span> JSEmitter = require(<span class="hljs-string">'./js-emitter'</span>)
<span class="hljs-keyword">const</span> fs = require(<span class="hljs-string">'fs'</span>)
<span class="hljs-comment">// 获取命令行参数</span>
<span class="hljs-keyword">const</span> args = process.argv[<span class="hljs-number">2</span>]
<span class="hljs-keyword">const</span> buffer = fs.readFileSync(args).toString()
<span class="hljs-keyword">const</span> body = acorn.parse(buffer).body
<span class="hljs-keyword">const</span> jsEmitter = <span class="hljs-keyword">new</span> JSEmitter()
let decls = <span class="hljs-keyword">new</span> Map()
let calledDecls = []
let code = []
<span class="hljs-comment">// 遍历处理</span>
body.forEach(function(node) {
    <span class="hljs-keyword">if</span> (node.type == <span class="hljs-string">"FunctionDeclaration"</span>) {
        <span class="hljs-keyword">const</span> code = jsEmitter.run([node])
        decls.set(jsEmitter.visitNode(node.id), code)
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">if</span> (node.type == <span class="hljs-string">"ExpressionStatement"</span>) {
        <span class="hljs-keyword">if</span> (node.expression.type == <span class="hljs-string">"CallExpression"</span>) {
            <span class="hljs-keyword">const</span> callNode = node.expression
            calledDecls.push(jsEmitter.visitIdentifier(callNode.callee))
            <span class="hljs-keyword">const</span> args = callNode.<span class="hljs-function">arguments
            <span class="hljs-title">for</span> <span class="hljs-params">(<span class="hljs-keyword">const</span> arg of args)</span> </span>{
                <span class="hljs-keyword">if</span> (arg.type == <span class="hljs-string">"Identifier"</span>) {
                    calledDecls.push(jsEmitter.visitNode(arg))
                }
            }
        }
    }
    <span class="hljs-keyword">if</span> (node.type == <span class="hljs-string">"VariableDeclaration"</span>) {
        <span class="hljs-keyword">const</span> kind = node.<span class="hljs-function">kind
        <span class="hljs-title">for</span> <span class="hljs-params">(<span class="hljs-keyword">const</span> decl of node.declarations)</span> </span>{
            decls.set(jsEmitter.visitNode(decl.id), jsEmitter.visitVariableDeclarator(decl, kind))
        }
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">if</span> (node.type == <span class="hljs-string">"Identifier"</span>) {
        calledDecls.push(node.name)
    }
    code.push(jsEmitter.run([node]))
});
<span class="hljs-comment">// 生成 code</span>
code = calledDecls.map(c =&gt; {
    <span class="hljs-keyword">return</span> decls.get(c)
}).concat([code]).join(<span class="hljs-string">''</span>)
fs.writeFileSync(<span class="hljs-string">'test.shaked.js'</span>, code)
</code></pre>
<p data-nodeid="27499">对于上面代码分析，首先我们通过<code data-backticks="1" data-nodeid="27637">process.argv</code>获取到目标文件，对于目标文件通过<code data-backticks="1" data-nodeid="27639">fs.readFileSync()</code>方法读出字符串形式的内容<code data-backticks="1" data-nodeid="27641">buffer</code>，对于这个<code data-backticks="1" data-nodeid="27643">buffer</code>变量，我们使用<code data-backticks="1" data-nodeid="27645">acorn.parse</code>进行解析，并对产出内容进行遍历。</p>
<p data-nodeid="27500">在遍历过程中，<strong data-nodeid="27652">对于不同的节点类型，调用 JS Emitter 实例不同的处理方法</strong>。在整个过程中，我们维护了：</p>
<ul data-nodeid="27501">
<li data-nodeid="27502">
<p data-nodeid="27503">decls——Map 类型</p>
</li>
<li data-nodeid="27504">
<p data-nodeid="27505">calledDecls——数组类型</p>
</li>
<li data-nodeid="27506">
<p data-nodeid="27507">code——数组类型</p>
</li>
</ul>
<p data-nodeid="27508">三个关键变量。<code data-backticks="1" data-nodeid="27657">decls</code>存储所有的函数或变量声明类型节点，<code data-backticks="1" data-nodeid="27659">calledDecls</code>则存储了代码中真正使用到的数或变量声明，<code data-backticks="1" data-nodeid="27661">code</code>存储了其他所有没有被节点类型匹配的 AST 部分。</p>
<p data-nodeid="27509">下面我们来分析具体的遍历过程。</p>
<ul data-nodeid="27510">
<li data-nodeid="27511">
<p data-nodeid="27512">在遍历过程中，我们<strong data-nodeid="27670">对所有函数和变量的声明，都维护到</strong><code data-backticks="1" data-nodeid="27668">decls</code>中。</p>
</li>
<li data-nodeid="27513">
<p data-nodeid="27514">接着，我们<strong data-nodeid="27682">对所有的 CallExpression 和 IDentifier 进行检测</strong>。因为 CallExpression 代表了一次函数调用，因此在该 if 条件分支内，将相关函数节点调用情况推入到<code data-backticks="1" data-nodeid="27676">calledDecls</code>数组中，同时我们对于该函数的参数变量也推入到<code data-backticks="1" data-nodeid="27678">calledDecls</code>数组。因为 IDentifier 代表了一个变量的取值，我们也推入到<code data-backticks="1" data-nodeid="27680">calledDecls</code>数组。</p>
</li>
</ul>
<p data-nodeid="27515">经过整个 AST 遍历，我们就可以只遍历<code data-backticks="1" data-nodeid="27684">calledDecls</code>数组，并从<code data-backticks="1" data-nodeid="27686">decls</code>变量中获取使用到的变量和函数声明，最终使用<code data-backticks="1" data-nodeid="27688">concat</code>方法合并带入<code data-backticks="1" data-nodeid="27690">code</code>变量中，使用<code data-backticks="1" data-nodeid="27692">join</code>方法转化为字符串类型。</p>
<p data-nodeid="27516">至此，我们的简易版 Tree Shaking 实现就完成了，建议你结合实际代码，多调试，相信会有更多收获。</p>
<h3 data-nodeid="27517">总结</h3>
<p data-nodeid="27518">这一讲，我们聚焦了 AST 这一热点话题。说 AST 是热点，是因为当前前端基础建设、工程化建设中越来越离不开 AST 技术的支持，AST 在前端中扮演的重要角色也越来越广为人知。</p>
<p data-nodeid="27519">但事实上，AST 是计算机领域中一个历经多年的基础概念，每一名开发者也都应该循序渐进地了解 AST 相关技术以及编译原理。</p>
<p data-nodeid="33332" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image/M00/8F/0F/CgqCHmAGmfaAD2geAAY6xJPW71s609.png" alt="Lark20210119-163405.png" data-nodeid="33335"></p>

<p data-nodeid="27521">这一讲，我们先从基本概念入手，然后借助了 acorn 的能力，动手实现了一个真实的 AST 落地场景——实现简易 Tree Shaking，正好又和上一章节内容相扣。由此可见，前端基建和工程化是一张网，网上的每一个技术点，都能由点及面，绘制出一张前端知识图谱。</p>

---

### 精选评论

##### *炜：
> 这节有点难啊

##### **0929：
> ast相关内容怎么学习呀老师，比如traverse操作ast之类的内容，没文档，只能去翻源码吗

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 看官网，看源码。能把官网吃透，你就是个专家了，就比我强……

