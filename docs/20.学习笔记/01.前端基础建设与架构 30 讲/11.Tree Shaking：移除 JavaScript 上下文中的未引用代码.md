<p data-nodeid="76796">时至今日，Tree Shaking 对于前端工程师来说，已经不是一个陌生的名词了。顾名思义：Tree Shaking 译为“摇树”，它通常用于描述移除 JavaScript 上下文中的未引用代码（dead-code）。</p>
<p data-nodeid="76797">据我观察，Tree Shaking 也经常出现在诸多候选人的简历当中。然而可惜的是，大部分候选人都知道 Tree Shaking 的定义，但“知其然不知其所以然”，并没有在工程中真正实践过 Tree Shaking 技术，更没有深入理解 Tree Shaking 这个概念。社区上一些好的文章，比如<a href="https://github.com/wuomzfx/tree-shaking-test" data-nodeid="76953">《你的 Tree-Shaking 并没什么卵用》</a>发布于 2018 年初，但就目前来看，其中内容也有些“过期”了。</p>
<p data-nodeid="76798">这一节，就让我们真正深入学习 Tree Shaking 这个概念。</p>
<h3 data-nodeid="76799">Tree Shaking 必备理论</h3>
<p data-nodeid="76800">Tree Shaking 概念很好理解，这个词最先在 Rollup 社区流行，后续蔓延到整个前端生态。Tree Shaking 背后的理论知识独成体系，我们先从其原理入手，试着分析并回答以下问题。</p>
<h4 data-nodeid="76801">问题一：Tree Shaking 为什么要依赖 ESM 规范？</h4>
<p data-nodeid="76802">事实上，Tree Shaking 是在编译时进行无用代码消除的，因此它<strong data-nodeid="76964">需要在编译时确定依赖关系</strong>，进而确定哪些代码可以被“摇掉”，而 ESM 具备以下特点：</p>
<ul data-nodeid="76803">
<li data-nodeid="76804">
<p data-nodeid="76805">import 模块名只能是字符串常量</p>
</li>
<li data-nodeid="76806">
<p data-nodeid="76807">import 一般只能在模块的最顶层出现</p>
</li>
<li data-nodeid="76808">
<p data-nodeid="76809">import binding 是 immutable 的</p>
</li>
</ul>
<p data-nodeid="76810">这些特点使得 ESM 具有静态分析能力。而<strong data-nodeid="76973">CommonJS 定义的模块化规范，只有在执行代码后，才能动态确定依赖模块</strong>，因此不具备 Tree Shaking 的先天条件。</p>
<p data-nodeid="76811">在传统编译型语言中，一般由编译器将无用代码在 AST（抽象语法树）中删除，而前端 JavaScript 并没有正统“编译器”这个概念，那么 Tree Shaking 就需要在工程链中由工程化工具完成。</p>
<h4 data-nodeid="76812">问题二：什么是副作用模块，如何对副作用模块进行 Tree Shaking?</h4>
<p data-nodeid="76813">如果你熟悉函数式开发理念，可能听说过“副作用函数”，但什么是“副作用模块”呢？它又和 Tree Shaking 有什么关联呢？很多人清楚的 Tree Shaking 只是皮毛，而并不清楚 Tree Shaking 并不能“摇掉”副作用模块，具体我们看这样一段代码：</p>
<pre class="lang-java" data-nodeid="76814"><code data-language="java"><span class="hljs-function">export function <span class="hljs-title">add</span><span class="hljs-params">(a, b)</span> </span>{
	<span class="hljs-keyword">return</span> a + b
}
export <span class="hljs-keyword">const</span> memoizedAdd = window.memoize(add)
</code></pre>
<p data-nodeid="76815">当该模块被 import 时，<code data-backticks="1" data-nodeid="76978">window.memoize</code>方法会被执行，那么对于工程化工具（比如 Webpack）来说，分析思路是这样的：</p>
<ul data-nodeid="76816">
<li data-nodeid="76817">
<p data-nodeid="76818">创建一个纯函数<code data-backticks="1" data-nodeid="76981">add</code>，如果没有其他模块引用<code data-backticks="1" data-nodeid="76983">add</code>函数，那么<code data-backticks="1" data-nodeid="76985">add</code>函数可以被 Tree Shaking 掉；</p>
</li>
<li data-nodeid="76819">
<p data-nodeid="76820">接着调用<code data-backticks="1" data-nodeid="76988">window.memoize</code>方法，并传入<code data-backticks="1" data-nodeid="76990">add</code>函数作为其参数；</p>
</li>
<li data-nodeid="76821">
<p data-nodeid="76822">工程化工具（比如 Webpack）并不知道<code data-backticks="1" data-nodeid="76993">window.memoize</code>方法会做什么事情，也许<code data-backticks="1" data-nodeid="76995">window.memoize</code>方法会调用<code data-backticks="1" data-nodeid="76997">add</code>函数，并触发某些副作用（比如维护一个全局的 Cache Map）；</p>
</li>
<li data-nodeid="76823">
<p data-nodeid="76824">工程化工具（比如 Webpack）为了安全起见，即便没有其他模块依赖的<code data-backticks="1" data-nodeid="77000">add</code>函数，那么也要将<code data-backticks="1" data-nodeid="77002">add</code>函数打包到最后的 bundle 中。</p>
</li>
</ul>
<p data-nodeid="76825">因此，具有副作用的模块难以被 Tree Shaking 优化，即便开发者知道<code data-backticks="1" data-nodeid="77005">window.memoize</code>方法是无副作用的。</p>
<p data-nodeid="76826">为了解决“具有副作用的模块难以被 Tree Shaking 优化”这个问题，Webpack 给出了自己的方案，我们可以利用 package.json 的<code data-backticks="1" data-nodeid="77008">sideEffects</code>属性来告诉工程化工具哪些模块具有副作用，哪些剩余模块没有副作用，可以被 Tree Shaking 优化：</p>
<pre class="lang-java" data-nodeid="76827"><code data-language="java">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"your-project"</span>,
  <span class="hljs-string">"sideEffects"</span>: <span class="hljs-keyword">false</span>
}
</code></pre>
<p data-nodeid="76828">表示全部代码均无副作用，告知 webpack，它可以安全地删除未用到的 export 导出。</p>
<pre class="lang-java" data-nodeid="76829"><code data-language="java">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"your-project"</span>,
  <span class="hljs-string">"sideEffects"</span>: [
    <span class="hljs-string">"./src/some-side-effectful-file.js"</span>，
    <span class="hljs-string">"*.css"</span>
  ]
}
</code></pre>
<p data-nodeid="76830">通过数组表示，<code data-backticks="1" data-nodeid="77012">./src/some-side-effectful-file.js</code>和所有<code data-backticks="1" data-nodeid="77014">.css</code>文件模块都有副作用。对于 Webpack 工具，<strong data-nodeid="77026">开发者可以在</strong><a href="https://github.com/webpack/webpack/issues/6065#issuecomment-351060570" data-nodeid="77021">module.rule</a><strong data-nodeid="77027">配置中声明副作用模块</strong>。</p>
<p data-nodeid="76831">事实上，仅对上面<code data-backticks="1" data-nodeid="77029">add</code>函数，即便不通过声明 sideEffects，Webpack 也足够智能，能够分析出可 Tree Shaking 掉的部分，不过这需要我们对上述代码进行重构：</p>
<pre class="lang-java" data-nodeid="76832"><code data-language="java"><span class="hljs-keyword">import</span> { memoize } from <span class="hljs-string">'./util'</span>
<span class="hljs-function">export function <span class="hljs-title">add</span><span class="hljs-params">(a, b)</span> </span>{
	<span class="hljs-keyword">return</span> a + b
}
export <span class="hljs-keyword">const</span> memoizedAdd = memoize(add)
</code></pre>
<p data-nodeid="76833">此时 Webpack 的分析逻辑：</p>
<ul data-nodeid="76834">
<li data-nodeid="76835">
<p data-nodeid="76836"><code data-backticks="1" data-nodeid="77032">memoize</code>函数是一个 ESM 模块，我们去<code data-backticks="1" data-nodeid="77034">util.js</code>中检查一下<code data-backticks="1" data-nodeid="77036">memoize</code>函数内容；</p>
</li>
<li data-nodeid="76837">
<p data-nodeid="76838">在<code data-backticks="1" data-nodeid="77039">util.js</code>中，发现<code data-backticks="1" data-nodeid="77041">memoize</code>函数是一个纯函数，因此如果<code data-backticks="1" data-nodeid="77043">add</code>函数没有被其他模块依赖，可以被安全 Tree Shaking 掉。</p>
</li>
</ul>
<p data-nodeid="76839">所以，我们能得出一个 Tree Shaking 友好的最佳实践——在业务项目中，设置最小化副作用范围，同时通过合理的配置，给工程化工具最多的副作用信息。</p>
<p data-nodeid="76840">下面，我们再来看一个  Tree Shaking 友好的实践案例。</p>
<h4 data-nodeid="76841">一个 Tree Shaking 友好的导出模式</h4>
<p data-nodeid="76842">参考以下代码：</p>
<pre class="lang-java" data-nodeid="76843"><code data-language="java">export <span class="hljs-keyword">default</span> {
	add(a, b) {
		<span class="hljs-keyword">return</span> a + b
	}
	subtract(a, b) {
		<span class="hljs-keyword">return</span> a - b
	}
}
</code></pre>
<p data-nodeid="76844">以及：</p>
<pre class="lang-java" data-nodeid="76845"><code data-language="java">export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Number</span> </span>{
	constructor(num) {
		<span class="hljs-keyword">this</span>.num = num
	}
	add(otherNum) {
		<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.num + otherNum
	}
	subtract(otherNum) {
		<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.num - otherNum
	}
}
</code></pre>
<p data-nodeid="76846">对于上述情况，以 Webpack 为例，<strong data-nodeid="77055">Webpack 将会趋向保留整个默认导出对象/class</strong>（Webpack 和 Rollup 只处理函数和顶层的 import/export 变量，不能把没用到的类或对象内部的方法消除掉）。</p>
<p data-nodeid="76847">因此：</p>
<ul data-nodeid="76848">
<li data-nodeid="76849">
<p data-nodeid="76850">导出一个包含多项属性和方法的对象</p>
</li>
<li data-nodeid="76851">
<p data-nodeid="76852">导出一个包含多项属性和方法的 class</p>
</li>
<li data-nodeid="76853">
<p data-nodeid="76854">使用<code data-backticks="1" data-nodeid="77060">export default</code>导出</p>
</li>
</ul>
<p data-nodeid="76855">都不利于 Tree Shaking。即便现代化工程工具或 Webpack 支持对于对象或 class 的方法属性剪裁（比如 webpack-deep-scope-plugin 这个插件的设计，或 Webpack 和 Rollup 新版本的跟进），这些都产生了不必要的成本，增加了编译时负担。</p>
<p data-nodeid="76856">我们更加推荐的原则是：<strong data-nodeid="77068">原子化和颗粒化导出</strong>。如下代码，就是一个更好的实践：</p>
<pre class="lang-java" data-nodeid="76857"><code data-language="java"><span class="hljs-function">export function <span class="hljs-title">add</span><span class="hljs-params">(a, b)</span> </span>{
	<span class="hljs-keyword">return</span> a + b
}
<span class="hljs-function">export function <span class="hljs-title">subtract</span><span class="hljs-params">(a, b)</span> </span>{
	<span class="hljs-keyword">return</span> a - b
}
</code></pre>
<p data-nodeid="76858">这种方式可以让 Webpack 更好地在编译时掌控和分析 Tree Shaking 信息，取得一个更优的 bundle size。</p>
<h3 data-nodeid="76859">前端工程生态和 Tree Shaking 实践</h3>
<p data-nodeid="76860">通过上述内容，我们可以看出 Tree Shaking 依托于 ESM 静态分析的理论技术，而真正的 Tree Shaking 过程，还需要依靠前端工程工具实现。Tree Shaking 链路当然也就和前端工程生态绑定在一起，我们继续从工程生态层面，分析 Tree Shaking 实践。</p>
<h4 data-nodeid="76861">Babel 和 Tree Shaking</h4>
<p data-nodeid="76862">Babel 已经成为现代化工程和基建方案的必备工具，但是考虑到 Tree Shaking，需要开发者注意：<strong data-nodeid="77078">如果使用 Babel 对代码进行编译，Babel 默认会将 ESM 编译为 CommonJS 模块规范</strong>。而我们从前面理论知识知道，Tree Shaking 必须依托于 ESM。</p>
<p data-nodeid="80123" class="">为此，我们需要配置 Babel 对于模块化的编译降级，具体配置项在 <a href="https://babeljs.io/docs/en/babel-preset-env#modules" data-nodeid="80127">babel-preset-env#modules</a> 中可以找到。</p>


<p data-nodeid="76864">但既然是“前端工程生态”，那问题就没这么好解决。事实上，如果我们不使用 Babel 将代码编译为 CommonJS 规范的代码，某些工程链上的工具可能就要罢工了。比如 Jest，Jest 是基于 Node.js 开发的，运行在 Node.js 环境。因此使用 Jest 进行测试时，也就需要模块符合 CommonJS 规范，那么如何处理这种“模块死锁”呢？</p>
<p data-nodeid="76865">思路之一是<strong data-nodeid="77090">根据不同的环境，采用不同的 Babel 配置</strong>。在 production 编译环境中，我们配置：</p>
<pre class="lang-java" data-nodeid="76866"><code data-language="java">production: {
   presets: [
    [
     <span class="hljs-string">'@babel/preset-env'</span>,
     {
      modules: <span class="hljs-keyword">false</span>
     }
    ]
   ]
  },
}
</code></pre>
<p data-nodeid="76867">在测试环境中：</p>
<pre class="lang-java" data-nodeid="76868"><code data-language="java">test: {
   presets: [
    [
     '@babel/preset-env',
     {
      modules: 'commonjs
     }
    ]
   ]
  },
}
</code></pre>
<p data-nodeid="76869">但是在测试环境中，编译了业务代码为 CommonJS 规范并没有大功告成，我们还需要处理第三方模块代码。一些第三方模块代码为了方便进行 Tree Shaking，暴露出符合 ESM 模块的代码，对于这些模块，比如 Library1、Library2，我们还需要进行处理，这时候需要配置 Jest：</p>
<pre class="lang-java" data-nodeid="76870"><code data-language="java"><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> librariesToRecompile = [
 <span class="hljs-string">'Library1'</span>,
 <span class="hljs-string">'Library2'</span>
].join(<span class="hljs-string">'|'</span>)
<span class="hljs-keyword">const</span> config = {
 transformIgnorePatterns: [
  `[\\/]node_modules[\\/](?!(${librariesToRecompile})).*$`
 ],
 transform: {
  <span class="hljs-string">'^.+\.jsx?$'</span>: path.resolve(__dirname, <span class="hljs-string">'transformer.js'</span>)
 }
}
</code></pre>
<p data-nodeid="84905" class=""><code data-backticks="1" data-nodeid="84906">transformIgnorePatterns</code>是 Jest 的一个配置项，默认值为<code data-backticks="1" data-nodeid="84908">node_modules</code>，它表示：<code data-backticks="1" data-nodeid="84910">node_modules</code>中的第三方模块代码，都不需要经过<code data-backticks="1" data-nodeid="84912">babel-jest</code>编译。因此，<strong data-nodeid="84920">我们自定义 <code data-backticks="1" data-nodeid="84916">transformIgnorePatterns</code>的值为一个包含了 Library1、Library2 的正则表达式即可</strong>。</p>





<h4 data-nodeid="76872">Webpack 和 Tree Shaking</h4>
<p data-nodeid="76873">上面我们已经讲解了很多关于 Webpack 处理 Tree Shaking 的内容了，这里我们进一步补充。事实上，<strong data-nodeid="77117">Webpack4.0 以上版本在 mode 为 production 时，会自动开启 Tree Shaking 能力</strong>。默认 production mode 的配置如下：</p>
<pre class="lang-java" data-nodeid="76874"><code data-language="java"><span class="hljs-keyword">const</span> config = {
 mode: <span class="hljs-string">'production'</span>,
 optimization: {
  usedExports: <span class="hljs-keyword">true</span>,
  minimizer: [
   <span class="hljs-keyword">new</span> TerserPlugin({...}) <span class="hljs-comment">// 支持删除死代码的压缩器</span>
  ]
 }
}
</code></pre>
<p data-nodeid="76875">其实，Webpack 真正执行模块去除，是依赖了 TerserPlugin、UglifyJS 等压缩插件。<strong data-nodeid="77123">Webpack 负责对模块进行分析和标记，而这些压缩插件负责根据标记结果，进行代码删除</strong>。Webpack 在分析时，有三类相关的标记：</p>
<ul data-nodeid="76876">
<li data-nodeid="76877">
<p data-nodeid="76878">harmony export，被使用过的 export 会被标记为 harmony export；</p>
</li>
<li data-nodeid="76879">
<p data-nodeid="76880">unused harmony export，没被使用过的 export 标记为 unused harmony export；</p>
</li>
<li data-nodeid="76881">
<p data-nodeid="76882">harmony import，所有 import 标记为 harmony import。</p>
</li>
</ul>
<p data-nodeid="76883">上述标记实现的 Webpack 源码在<code data-backticks="1" data-nodeid="77128">lib/dependencies/</code>文件中，这里不再进行源码解读了。具体过程主要是：</p>
<ul data-nodeid="76884">
<li data-nodeid="76885">
<p data-nodeid="76886">Webpack 在编译分析阶段，将每一个模块放入 ModuleGraph 中维护；</p>
</li>
<li data-nodeid="76887">
<p data-nodeid="76888">依靠 HarmonyExportSpecifierDependency 和 HarmonyImportSpecifierDependency 分别识别和处理 import 以及 export；</p>
</li>
<li data-nodeid="76889">
<p data-nodeid="76890">依靠 HarmonyExportSpecifierDependency 识别 used export 和 unused export。</p>
</li>
</ul>
<p data-nodeid="76891">至此，我们理解了使用 Webpack 进行 Tree Shaking 的原理。接下来，我们再看看著名的公共库都是如何处理 Tree Shaking 的。</p>
<h4 data-nodeid="76892">Vue 和 Tree Shaking</h4>
<p data-nodeid="76893">在 Vue 2.0 版本中，Vue 对象会存在一些全局 API，比如：</p>
<pre class="lang-java" data-nodeid="76894"><code data-language="java"><span class="hljs-keyword">import</span> Vue from <span class="hljs-string">'vue'</span>
Vue.nextTick(() =&gt; {
  <span class="hljs-comment">//...</span>
})
</code></pre>
<p data-nodeid="76895">如果我们没有使用<code data-backticks="1" data-nodeid="77137">Vue.nextTick</code>方法，那么<code data-backticks="1" data-nodeid="77139">nextTick</code>这样的全局 API 就成了 dead code，且不容易被 Tree Shaking 掉。为此，在 Vue 3 中，Vue 团队考虑了 Tree Shaking 兼容，进行了重构，<strong data-nodeid="77145">全局 API 需要通过原生 ES Module 的引用方式进行具名引用</strong>，对应前面的代码，需要：</p>
<pre class="lang-java" data-nodeid="76896"><code data-language="java"><span class="hljs-keyword">import</span> { nextTick } from <span class="hljs-string">'vue'</span>
nextTick(() =&gt; {
  <span class="hljs-comment">//...</span>
})
</code></pre>
<p data-nodeid="76897">除了这些全局 API ，Vue 3.0 也实现了很多内置的组件以及工具的具名导出。这些都是前端生态中，公共库拥抱 Tree Shaking 的表现。</p>
<p data-nodeid="76898">此外，我们也可以灵活使用 build-time flags 来帮助构建工具实现 Tree Shaking。以 Webpack<a href="https://webpack.js.org/plugins/define-plugin/" data-nodeid="77150">DefinePlugin </a>为例，下面代码：</p>
<pre class="lang-java" data-nodeid="76899"><code data-language="java"><span class="hljs-keyword">import</span> { validateoptions } from <span class="hljs-string">'./validation'</span>
<span class="hljs-function">function <span class="hljs-title">init</span><span class="hljs-params">(options)</span> </span>{
	<span class="hljs-keyword">if</span> (!__PRODUCTION__) {
		validateoptions(options)
	}
}
</code></pre>
<p data-nodeid="76900">通过<code data-backticks="1" data-nodeid="77153">__PRODUCTION__</code>变量，在 production 环境下，我们可以将<code data-backticks="1" data-nodeid="77155">validateoptions</code>函数进行删除。</p>
<h4 data-nodeid="76901">如何设计一个兼顾 Tree Shaking 和易用性的公共库</h4>
<p data-nodeid="76902">上面我们分析了 Vue 拥抱 Tree Shaking 的例子，下面我们应该从另一个更宏观的角度看待这个问题。作为一个公共库的设计者，我们应该如何兼顾 Tree Shaking 和易用性的公共库呢？</p>
<p data-nodeid="76903">试想，如果我们以 ESM 的方式对外暴露代码，那么就很难直接兼容 CommonJS 规范，也就是说<strong data-nodeid="77168">在 Node.js 环境中，使用者如果直接以 require 方式引用的话，就会得到报错</strong>。<strong data-nodeid="77169">如果以 CommonJS 规范对外暴露代码，又不利于 Tree Shaking</strong>。</p>
<p data-nodeid="76904">因此，如果想要一个 npm 包既能向外提供 ESM 规范的代码，又能向外提供 CommonJS 规范的代码，我们就只能通过“协约”来定义清楚。实际上，npm<code data-backticks="1" data-nodeid="77171">package.json</code>以及社区工程化规范，解决了这个问题：</p>
<pre class="lang-java" data-nodeid="76905"><code data-language="java">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"Library"</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"dist/index.cjs.js"</span>,
  <span class="hljs-string">"module"</span>: <span class="hljs-string">"dist/index.esm.js"</span>,
}
</code></pre>
<p data-nodeid="76906">其实，标准 package.json 语法中，只有一个入口<code data-backticks="1" data-nodeid="77174">main</code>。作为公共库设计者，我们通过<code data-backticks="1" data-nodeid="77176">main</code>来暴露 CommonJS 规范打包的代码<code data-backticks="1" data-nodeid="77178">dist/index.cjs.js</code>；在 Webpack 等构建工具中，又支持了<code data-backticks="1" data-nodeid="77180">module</code>——这个新的入口字段。因此，<code data-backticks="1" data-nodeid="77182">module</code>并非 package.json 的标准字段，而是打包工具专用的字段，用来指定符合 ESM 标准的入口文件。</p>
<p data-nodeid="76907">这样一来，当<code data-backticks="1" data-nodeid="77185">require('Library')</code>时，Webpack 会找到：<code data-backticks="1" data-nodeid="77187">dist/index.cjs.js</code>；当<code data-backticks="1" data-nodeid="77189">import Library from 'Library'</code>时，Webpack 会找到：<code data-backticks="1" data-nodeid="77191">dist/index.esm.js</code>。</p>
<p data-nodeid="76908">这里我们不妨举一个著名的公共库例子，那就是 Lodash。Lodash 其实并不支持 Tree Shaking，其<code data-backticks="1" data-nodeid="77194">package.json</code>：</p>
<pre class="lang-java" data-nodeid="76909"><code data-language="java">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"lodash"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"5.0.0"</span>,
  <span class="hljs-string">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-string">"private"</span>: <span class="hljs-keyword">true</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"lodash.js"</span>,
  <span class="hljs-string">"engines"</span>: {
    <span class="hljs-string">"node"</span>: <span class="hljs-string">"&gt;=4.0.0"</span>
  },
  <span class="hljs-comment">//...</span>
}
</code></pre>
<p data-nodeid="85861" class="">只有一个<code data-backticks="1" data-nodeid="85863">main</code>入口，且<code data-backticks="1" data-nodeid="85865">lodash.js</code>是 UMD 形式的代码，不利于做到 Tree Shaking。为了支持 Tree shakibng，lodash 打包出来专门的 <a href="https://www.npmjs.com/package/lodash-es" data-nodeid="85869">lodash-es</a>，其<code data-backticks="1" data-nodeid="85871">package.json</code>：</p>

<pre class="lang-java" data-nodeid="76911"><code data-language="java">{
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"lodash.js"</span>,
  <span class="hljs-string">"module"</span>: <span class="hljs-string">"lodash.js"</span>,
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"lodash-es"</span>,
  <span class="hljs-string">"sideEffects"</span>: <span class="hljs-keyword">false</span>,
  <span class="hljs-comment">//...</span>
}
</code></pre>
<p data-nodeid="76912">由上述代码可知，lodash-es<code data-backticks="1" data-nodeid="77208">main</code>、<code data-backticks="1" data-nodeid="77210">module</code>、<code data-backticks="1" data-nodeid="77212">sideEffects</code>三字段齐全，通过 ESM 导出，天然支持了 Tree Shaking。</p>
<p data-nodeid="76913">总之，万变不离其宗，只要我们掌握了 Tree Shaking 的原理，那么在涉及公共库时，就能做到游刃有余，以各种形式支持到 Tree Shaking。当然，普遍做法是在第三方库打包构建时，参考 antd，一般都会构建出 lib/ 和 es/ 两个文件夹，并配置<code data-backticks="1" data-nodeid="77215">package.json</code>的<code data-backticks="1" data-nodeid="77217">main</code>、<code data-backticks="1" data-nodeid="77219">module</code>字段即可。</p>
<h4 data-nodeid="76914">CSS 和 Tree Shaking</h4>
<p data-nodeid="76915">以上内容都是针对 JavaScript 代码的 Tree Shaking，作为前端工程师，我们当然也要考虑对 CSS 文件做 Tree Shaking。</p>
<p data-nodeid="76916">实现思路也很简单，<strong data-nodeid="77228">CSS 的 Tree Shaking 要在样式表中，找出没有被应用到选择器样式，进行删除</strong>。那么我们只需要：</p>
<ul data-nodeid="76917">
<li data-nodeid="76918">
<p data-nodeid="76919">遍历所有 CSS 文件的选择器；</p>
</li>
<li data-nodeid="76920">
<p data-nodeid="76921">根据所有 CSS 文件的选择器，在 JavaScript 代码中进行选择器匹配；</p>
</li>
<li data-nodeid="76922">
<p data-nodeid="76923">如果没有匹配到，则删除对应选择器的样式代码。</p>
</li>
</ul>
<p data-nodeid="76924">如何遍历所有 CSS 文件的选择器呢？Babel 依靠 AST 技术，完成了对 JavaScript 代码的遍历分析，而在样式世界中，PostCSS 就起到了 Babel 的作用。PostCSS 提供了一个解析器，它能够将 CSS 解析成 AST 抽象语法树，<strong data-nodeid="77237">我们可以通过 PostCSS 插件对 CSS 对应的 AST 进行操作，达到 Tree Shaking 的目的</strong>。</p>
<p data-nodeid="76925">PostCSS 原理如下图：</p>
<p data-nodeid="88219" class=""><img src="https://s0.lgstatic.com/i/image2/M01/05/E0/Cip5yGABPraACuJCAAGHB98AwXg855.png" alt="Drawing 0.png" data-nodeid="88222"><br>
<img src="https://s0.lgstatic.com/i/image/M00/8D/F3/Ciqc1GABPsGAfsSVAAGgxx7GqrU331.png" alt="Drawing 1.png" data-nodeid="88226"></p>




<div data-nodeid="89167" class=""><p style="text-align:center">PostCSS 原理图</p></div>

<p data-nodeid="90106" class="">这里给大家推荐 <a href="https://github.com/FullHuman/purgecss/tree/master/packages/purgecss-webpack-plugin" data-nodeid="90110">purgecss-webpack-plugin</a>，其原理也很简单：</p>

<ul data-nodeid="76930">
<li data-nodeid="76931">
<p data-nodeid="76932">监听 Webpack compilation 完成阶段，从 compilation 中找到所有的 CSS 文件（对应源码）：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="76933"><code data-language="java">export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PurgeCSSPlugin</span> </span>{
  options: UserDefinedOptions;
  purgedStats: PurgedStats = {};
  constructor(options: UserDefinedOptions) {
    <span class="hljs-keyword">this</span>.options = options;
  }
  apply(compiler: Compiler): <span class="hljs-keyword">void</span> {
    compiler.hooks.compilation.tap(
      pluginName,
      <span class="hljs-keyword">this</span>.initializePlugin.bind(<span class="hljs-keyword">this</span>)
    );
  }
  
  <span class="hljs-comment">//...</span>
  
}
</code></pre>
<ul data-nodeid="76934">
<li data-nodeid="76935">
<p data-nodeid="76936">将所有的 CSS 文件交给 PostCss 处理（<a href="https://github.com/FullHuman/purgecss/blob/84da7ca98872bae29317f88c4295b400a6c02d06/packages/purgecss/src/index.ts#L274" data-nodeid="77255">源码</a>关键部分，对 CSS AST 应用规则）：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="76937"><code data-language="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">walkThroughCSS</span><span class="hljs-params">(
    root: postcss.Root,
    selectors: ExtractorResultSets
  )</span>: <span class="hljs-keyword">void</span> </span>{
    root.walk((node) =&gt; {
      <span class="hljs-keyword">if</span> (node.type === <span class="hljs-string">"rule"</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.evaluateRule(node, selectors);
      }
      <span class="hljs-keyword">if</span> (node.type === <span class="hljs-string">"atrule"</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.evaluateAtRule(node);
      }
      <span class="hljs-keyword">if</span> (node.type === <span class="hljs-string">"comment"</span>) {
        <span class="hljs-keyword">if</span> (isIgnoreAnnotation(node, <span class="hljs-string">"start"</span>)) {
          <span class="hljs-keyword">this</span>.ignore = <span class="hljs-keyword">true</span>;
          <span class="hljs-comment">// remove ignore annotation</span>
          node.remove();
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isIgnoreAnnotation(node, <span class="hljs-string">"end"</span>)) {
          <span class="hljs-keyword">this</span>.ignore = <span class="hljs-keyword">false</span>;
          <span class="hljs-comment">// remove ignore annotation</span>
          node.remove();
        }
      }
    });
  }
</code></pre>
<ul data-nodeid="76938">
<li data-nodeid="76939">
<p data-nodeid="76940">利用 PostCss 插件能力，基于 AST 技术，找出无用代码并进行删除。</p>
</li>
</ul>
<p data-nodeid="76941">核心删除未使用 CSS 代码的逻辑在<a href="https://github.com/FullHuman/purgecss/blob/84da7ca98872bae29317f88c4295b400a6c02d06/packages/purgecss/src/index.ts#L617" data-nodeid="77262"><code data-backticks="1" data-nodeid="77260">purge</code> 方法中</a>，这里我们不再展开。</p>
<h3 data-nodeid="76942">总结</h3>
<p data-nodeid="76943">本小节，我们分析了 Tree Shaking 相关知识，我们发现这一理论内容还需要配合构建工具完成落地，而这一系列过程不只是想象中那样简单。</p>
<p data-nodeid="91050" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image/M00/8D/F3/Ciqc1GABPt6AAFyMAAGLjLOlwJM945.png" alt="Drawing 2.png" data-nodeid="91053"></p>

<p data-nodeid="76945">这里我想给你留一个思考题，Rollup 是如何实现 Tree Shaking 的呢？欢迎在留言区和我分享你的观点。</p>
<p data-nodeid="76946">更多内容，我们会结合下一讲“如何理解 AST 实现和编译原理？”，带你实现一个真实的 AST 的落地场景，完成一个简易版 Tree Shaking 实现。我们下一讲再见！</p>

---

### 精选评论

##### **铭：
> 写的很好

##### **7269：
> 那个裁剪css的插件，我们业务中很多动态class，貌似只能配置白名单了

##### *萱：
> 有些html中的css类是js动态生成的，那岂不是把一些css给摇树掉了？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 不会，会根据 js 进行分析

##### **3336：
> 是不是UMD模块代码做不到TreeShaking？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是

##### *威：
> import现在不一定在最顶层鸭

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; static import vs dynamic import

##### **平：
> 问一下，如果项目里有一个包不支持 Tree Shaking，那打包时整个项目时，除了这个不支持的包以为，其他包都是用Tree Shaking打包吗？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是，但得看你配置和实现

