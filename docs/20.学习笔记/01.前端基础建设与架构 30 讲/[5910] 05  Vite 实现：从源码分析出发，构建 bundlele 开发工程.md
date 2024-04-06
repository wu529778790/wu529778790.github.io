<p data-nodeid="39436" class="">通过上一讲的内容，相信你已经了解了现代化构建流程和处理内容。这一讲，我将结合 Webpack 为主的成熟方案现阶段的“不足”，从源码实现角度带你分析 Vite 的设计哲学，同时为“解析 Webpack 源码，实现自己的构建工具”一讲内容打下基础，循序渐进，最终你将能够开发一个自己的构建工具。</p>
<h3 data-nodeid="39437">Vite 的“横空出世”</h3>
<p data-nodeid="39438">Vite 是由 Vue 作者尤雨溪开发的 Web 开发工具，尤雨溪在微博上推广时对 Vite 做了简短介绍：</p>
<blockquote data-nodeid="39439">
<p data-nodeid="39440">Vite，一个基于浏览器原生 ES imports 的开发服务器。利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。同时不仅有 Vue 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 Rollup 打包。虽然现在还比较粗糙，但这个方向我觉得是有潜力的，做得好可以彻底解决改一行代码等半天热更新的问题。</p>
</blockquote>
<p data-nodeid="39441">从这段话中我们能够提炼一些关键点：</p>
<ul data-nodeid="39442">
<li data-nodeid="39443">
<p data-nodeid="39444">Vite 基于 ESM，因此实现了快速启动和即时模块热更新能力；</p>
</li>
<li data-nodeid="39445">
<p data-nodeid="39446">Vite 在服务端实现了按需编译。</p>
</li>
</ul>
<p data-nodeid="39447">经验丰富的开发者通过上述介绍，似乎就能给出 Vite 的基本流程，甚至可以说得更直白一些：<strong data-nodeid="39585">Vite 在开发环境下并没有打包和构建过程</strong>。</p>
<p data-nodeid="39448">开发者在代码中写到的 ESM 导入语法会直接发送给服务器，而服务器也直接将 ESM 模块内容运行处理后，下发给浏览器。接着，现代浏览器通过解析 script module，对每一个 import 到的模块进行 HTTP 请求，服务器继续对这些 HTTP 请求进行处理并响应。</p>
<h3 data-nodeid="39449">Vite 实现原理解读</h3>
<p data-nodeid="39450">Vite 思想比较容易理解，实现起来也并不复杂。接下来，我们就对 Vite 源码进行分析，帮助你更好地体会它的设计哲学和实现技巧。</p>
<p data-nodeid="39451">首先，我们打造一个学习环境，创建一个基于 Vite 的应用，并启动：</p>
<pre class="lang-java" data-nodeid="39452"><code data-language="java">npm init vite-app vite-app
cd vite-app
npm install
npm run dev
</code></pre>
<p data-nodeid="39453">得到以下目录结构和页面内容：</p>
<p data-nodeid="39454"><img src="https://s0.lgstatic.com/i/image/M00/8C/18/Ciqc1F_ltOCAMzS3AAHqGo5sIeo562.png" alt="Lark20201225-174521.png" data-nodeid="39593"></p>
<p data-nodeid="39455"><img src="https://s0.lgstatic.com/i/image2/M01/03/A7/Cip5yF_gX_iAUku7AAK-5yeYi0A500.png" alt="Drawing 1.png" data-nodeid="39596"></p>
<p data-nodeid="39456">其中浏览器请求：<code data-backticks="1" data-nodeid="39598">http://localhost:3000/</code>，得到的内容即是我们应用项目中的 index.html 内容。</p>
<p data-nodeid="39457">在项目 packaga.json 中，我们看到：</p>
<pre class="lang-java" data-nodeid="39458"><code data-language="java"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"vite"</span>,
    <span class="hljs-comment">// ...</span>
 },
</code></pre>
<p data-nodeid="39459">找到 Vite 源码中，<a href="https://github.com/vitejs/vite/blob/master/src/node/cli.ts#L66" data-nodeid="39604">命令行实现部分：</a></p>
<pre class="lang-java" data-nodeid="39460"><code data-language="java"><span class="hljs-keyword">if</span> (!options.command || options.command === <span class="hljs-string">'serve'</span>) {
	runServe(options)
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (options.command === <span class="hljs-string">'build'</span>) {
	runBuild(options)
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (options.command === <span class="hljs-string">'optimize'</span>) {
	runOptimize(options)
} <span class="hljs-keyword">else</span> {
	console.error(chalk.red(`unknown command: ${options.command}`))
	process.exit(<span class="hljs-number">1</span>)
}
</code></pre>
<p data-nodeid="39461">上面代码，根据不同的命令行命令，执行不同的入口函数。</p>
<p data-nodeid="39462">在开发模式下，Vite 通过 runServe 方法，启动了一个 koaServer，来实现对浏览器请求的响应，<a href="https://github.com/vitejs/vite/blob/c3ef4f64ec09c6916f4e6b9764362a23843b98b6/src/node/cli.ts#L131" data-nodeid="39609">runServer 实现</a>如下：</p>
<pre class="lang-java" data-nodeid="39463"><code data-language="java"><span class="hljs-keyword">const</span> server = require(<span class="hljs-string">'./server'</span>).createServer(options)
</code></pre>
<p data-nodeid="39464"><a href="https://github.com/vitejs/vite/blob/c3ef4f64ec09c6916f4e6b9764362a23843b98b6/src/node/server/index.ts#L50" data-nodeid="39613">createServer 方法实现</a>，我们可以精简为以下内容：</p>
<pre class="lang-java" data-nodeid="39465"><code data-language="java"><span class="hljs-function">export function <span class="hljs-title">createServer</span><span class="hljs-params">(config: ServerConfig)</span>: Server </span>{
  <span class="hljs-keyword">const</span> {
    root = process.cwd(),
    configureServer = [],
    resolvers = [],
    alias = {},
    transforms = [],
    vueCustomBlockTransforms = {},
    optimizeDeps = {},
    enableEsbuild = <span class="hljs-keyword">true</span>
  } = config
  <span class="hljs-comment">//&nbsp;创建 Koa 实例</span>
  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa&lt;State, Context&gt;()
  <span class="hljs-keyword">const</span> server = resolveServer(config, app.callback())
  <span class="hljs-keyword">const</span> resolver = createResolver(root, resolvers, alias)
  <span class="hljs-comment">// 相关上下文信息&nbsp;</span>
  <span class="hljs-keyword">const</span> context: ServerPluginContext = {
    root,
    app,
    server,
    resolver,
    config,
    port: config.port || <span class="hljs-number">3000</span>
  }
  <span class="hljs-comment">// 一个简单中间件，扩充 context 上下文内容</span>
  app.use((ctx, next) =&gt; {
    Object.assign(ctx, context)
    ctx.read = cachedRead.bind(<span class="hljs-keyword">null</span>, ctx)
    <span class="hljs-keyword">return</span> next()
  })
  <span class="hljs-keyword">const</span> resolvedPlugins = [
    <span class="hljs-comment">// ...</span>
  ]

  resolvedPlugins.forEach((m) =&gt; m &amp;&amp; m(context))
  <span class="hljs-keyword">const</span> listen = server.listen.bind(server)
  server.listen = (async (port: number, ...args: any[]) =&gt; {
    <span class="hljs-keyword">if</span> (optimizeDeps.auto !== <span class="hljs-keyword">false</span>) {
      <span class="hljs-function">await <span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'../optimizer'</span>)</span>.<span class="hljs-title">optimizeDeps</span><span class="hljs-params">(config)</span>
    }
    <span class="hljs-keyword">const</span> listener </span>= listen(port, ...args)
    context.port = server.address().port
    <span class="hljs-keyword">return</span> listener
  }) as any
  <span class="hljs-keyword">return</span> server
}
</code></pre>
<p data-nodeid="39466">浏览器在访问<code data-backticks="1" data-nodeid="39616">http://localhost:3000/</code>后，得到了主体为：</p>
<pre class="lang-java" data-nodeid="39467"><code data-language="java">&lt;body&gt;
  &lt;di v id="app"&gt;&lt;/div&gt;
  &lt;script type="module" src="/src/main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p data-nodeid="39468">的内容。</p>
<p data-nodeid="39469">依据 ESM 规范在浏览器 script 标签中的实现，对于<code data-backticks="1" data-nodeid="39620">&lt;script type="module" src="./bar.js"&gt;&lt;/script&gt;</code>内容：<strong data-nodeid="39626">当出现 script 标签 type 属性为 module 时，浏览器将会请求模块相应内容</strong>。</p>
<p data-nodeid="39470">另一种 ESM 规范在浏览器 script 标签中的实现为：</p>
<pre class="lang-java" data-nodeid="39471"><code data-language="java">&lt;script type="module"&gt;
  import { bar } from './bar.js‘
&lt;/script&gt;
</code></pre>
<p data-nodeid="39472">浏览器会发起 HTTP 请求，请求 HTTP Server 托管的 bar.js。</p>
<p data-nodeid="39473">我们可以看到，经过 Vite Server 处理 http://localhost:3000/src/main.js 请求后，最终返回了：</p>
<p data-nodeid="39474"><img src="https://s0.lgstatic.com/i/image/M00/8C/18/Ciqc1F_ltQGAaQZkAAXD68sxUe4161.png" alt="Lark20201225-174524.png" data-nodeid="39632"></p>
<p data-nodeid="39475">返回内容和我们项目中的 ./src/main.js 略有差别：</p>
<pre class="lang-java" data-nodeid="39476"><code data-language="java"><span class="hljs-keyword">import</span> { createApp } from <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App from <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.css'</span>
</code></pre>
<p data-nodeid="39477">现在变为：</p>
<pre class="lang-java" data-nodeid="39478"><code data-language="java"><span class="hljs-keyword">import</span> { createApp } from <span class="hljs-string">'/@modules/vue.js'</span>
<span class="hljs-keyword">import</span> App from <span class="hljs-string">'/src/App.vue'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'/src/index.css?import'</span>
</code></pre>
<p data-nodeid="39479">这里我们拆成两部分来看。</p>
<p data-nodeid="39480">其中<code data-backticks="1" data-nodeid="39637">import { createApp } from 'vue'</code>改为<code data-backticks="1" data-nodeid="39639">import { createApp } from '/@modules/vue.js'</code>，原因很明显：<strong data-nodeid="39656">import 对应的路径只支持 "/""./"或者 "../" 开头的内容，直接使用模块名 import，会立即报错</strong>。</p>
<p data-nodeid="39481">所以在 Vite Server 处理请求时，通过 serverPluginModuleRewrite 这个中间件来给 import from 'A' 的 A 添加 /@module/ 前缀为 from '/@modules/A'，<a href="https://github.com/vitejs/vite/blob/master/src/node/server/index.ts#L97" data-nodeid="39668">源码部分对应</a>：</p>
<pre class="lang-java" data-nodeid="39482"><code data-language="java"><span class="hljs-keyword">const</span> resolvedPlugins = [
  <span class="hljs-comment">// ...</span>
  moduleRewritePlugin,
  <span class="hljs-comment">// ...</span>
]
resolvedPlugins.forEach((m) =&gt; m &amp;&amp; m(context))
</code></pre>
<p data-nodeid="39483">而 moduleRewritePlugin 插件的<a href="https://github.com/vitejs/vite/blob/c3ef4f64ec09c6916f4e6b9764362a23843b98b6/src/node/server/serverPluginModuleRewrite.ts#L48" data-nodeid="39673">实现</a>也并不困难，主要通过 <a href="https://github.com/vitejs/vite/blob/c3ef4f64ec09c6916f4e6b9764362a23843b98b6/src/node/server/serverPluginModuleRewrite.ts#L120" data-nodeid="39677">rewriteImports 方法</a>，来执行 <a href="https://github.com/vitejs/vite/blob/c3ef4f64ec09c6916f4e6b9764362a23843b98b6/src/node/server/serverPluginModuleRewrite.ts#L259" data-nodeid="39681">resolveImport 方法</a>，并进行改写。这里已经添加了相关源码链接，我们不再一一展开，你可以在课后进一步学习。</p>
<p data-nodeid="39484">整个过程和调用链路较长，我对 Vite 处理 import 方法做一个简单总结：</p>
<ul data-nodeid="39485">
<li data-nodeid="39486">
<p data-nodeid="39487">在 koa 中间件里获取请求 path 对应的 body 内容；</p>
</li>
<li data-nodeid="39488">
<p data-nodeid="39489">通过 <a href="https://github.com/guybedford/es-module-lexer" data-nodeid="39688">es-module-lexer</a> 解析资源 AST，并拿到 import 的内容；</p>
</li>
<li data-nodeid="39490">
<p data-nodeid="39491">如果判断 import 的资源是绝对路径，即可认为该资源为 npm 模块，并返回处理后的资源路径。比如上述代码中，vue → /@modules/vue。</p>
</li>
</ul>
<p data-nodeid="39492">对于形如：<code data-backticks="1" data-nodeid="39692">import App from './App.vue'</code>和<code data-backticks="1" data-nodeid="39694">import './index.css'</code>的处理，与上述情况类似：</p>
<ul data-nodeid="39493">
<li data-nodeid="39494">
<p data-nodeid="39495">在 koa 中间件里获取请求 path 对应的 body 内容；</p>
</li>
<li data-nodeid="39496">
<p data-nodeid="39497">通过 <a href="https://github.com/guybedford/es-module-lexer" data-nodeid="39700">es-module-lexer</a> 解析资源 AST，并拿到 import 的内容；</p>
</li>
<li data-nodeid="39498">
<p data-nodeid="39499">如果判断 import 的资源是相对路径，即可认为该资源为项目应用中资源，并返回处理后的资源路径。比如上述代码中，./App.vue → /src/App.vue。</p>
</li>
</ul>
<p data-nodeid="39500">接下来浏览器根据 main.js 的内容，分别请求：</p>
<pre class="lang-java" data-nodeid="39501"><code data-language="java">/<span class="hljs-meta">@modules</span>/vue.js
/src/App.vue
/src/index.css?<span class="hljs-keyword">import</span>
</code></pre>
<p data-nodeid="39502">对于 /@module/ 类请求较为容易，我们只需要完成下面三步：</p>
<ul data-nodeid="39503">
<li data-nodeid="39504">
<p data-nodeid="39505">在 koa 中间件里获取请求 path 对应的 body 内容；</p>
</li>
<li data-nodeid="39506">
<p data-nodeid="39507">判断路径是否以 /@module/ 开头，如果是，取出包名（这里为 vue.js）；</p>
</li>
<li data-nodeid="39508">
<p data-nodeid="39509">去 node_modules 文件中找到对应的 npm 库，并返回内容。</p>
</li>
</ul>
<p data-nodeid="39510">上述步骤在 Vite 中使用 serverPluginModuleResolve 中间件实现，点击这里可以访问<a href="https://github.com/vitejs/vite/blob/c3ef4f64ec09c6916f4e6b9764362a23843b98b6/src/node/server/serverPluginModuleResolve.ts#L22" data-nodeid="39713">对应源码</a>。</p>
<p data-nodeid="39511">接着，就是对 /src/App.vue 类请求进行处理，这就涉及 Vite 服务器的编译能力了。</p>
<p data-nodeid="39512">我们先看结果，对比项目中的 App.vue，浏览器请求得到的结果显然出现了大变样：</p>
<p data-nodeid="39513"><img src="https://s0.lgstatic.com/i/image/M00/8B/C6/Ciqc1F_gYEGAL6S2AASUUhepUGQ785.png" alt="Drawing 3.png" data-nodeid="39719"></p>
<p data-nodeid="39514">实际上，App.vue 这样的单文件组件对应 script、style 和 template，在经过 Vite Server 处理时，服务端对 script、style 和 template 三部分分别处理，对应中间件为 <a href="https://github.com/vitejs/vite/blob/c3ef4f64ec09c6916f4e6b9764362a23843b98b6/src/node/server/serverPluginVue.ts" data-nodeid="39723">serverPluginVue</a>。这个中间件的实现很简单，即<strong data-nodeid="39733">对 .vue 文件请求进行处理，通过 parseSFC 方法解析单文件组件，并通过 compileSFCMain 方法将单文件组件拆分</strong>为形如上图内容，对应中间件关键内容可在源码 vuePlugin 中找到。源码中，涉及 <a href="https://github.com/vitejs/vite/blob/c3ef4f64ec09c6916f4e6b9764362a23843b98b6/src/node/server/serverPluginVue.ts#L377" data-nodeid="39731">parseSFC</a> 具体所做的事情，是调用 @vue/compiler-sfc 进行单文件组件解析。精简为我自己的逻辑，帮助你理解：</p>
<pre class="lang-java" data-nodeid="39515"><code data-language="java"><span class="hljs-keyword">if</span> (!query.type) {
  ctx.body = `
    <span class="hljs-keyword">const</span> __script = ${descriptor.script.content.replace(<span class="hljs-string">'export default '</span>, <span class="hljs-string">''</span>)}
    <span class="hljs-comment">// 单文件组件中，对于 style 部分的编译，编译为对应 style 样式的 import 请求</span>
    ${descriptor.styles.length ? `<span class="hljs-keyword">import</span> <span class="hljs-string">"${url}?type=style"</span>` : <span class="hljs-string">''</span>}
    <span class="hljs-comment">// 单文件组件中，对于 template 部分的编译，编译为对应 template 样式的 import 请求</span>
    <span class="hljs-keyword">import</span> { render as __render } from <span class="hljs-string">"${url}?type=template"</span>
    <span class="hljs-comment">// 渲染 template 的内容</span>
    __script.render = __render;
    export <span class="hljs-keyword">default</span> __script;
  `;
}
</code></pre>
<p data-nodeid="39516">总而言之，每一个 .vue 单文件组件都被拆分成多个请求。比如对应上面场景，浏览器接收到 App.vue 对应的实际内容后，发出 HelloWorld.vue 以及 App.vue?type=template 的请求（通过 type 这个 query 来表示是 template 还是 style）。koa server 进行分别处理并返回，这些请求依然分别被上面提到的 serverPluginVue 中间件处理：对于 template 的请求，服务使用 @vue/compiler-dom 进行编译 template 并返回内容。</p>
<p data-nodeid="39517">精简为我自己的逻辑，帮助你理解：</p>
<pre class="lang-java" data-nodeid="39518"><code data-language="java"><span class="hljs-keyword">if</span> (query.type === <span class="hljs-string">'template'</span>) {
	<span class="hljs-keyword">const</span> template = descriptor.template;
	<span class="hljs-keyword">const</span> render = require(<span class="hljs-string">'@vue/compiler-dom'</span>).compile(template.content, {
	  mode: <span class="hljs-string">'module'</span>,
	}).code;
	ctx.type = <span class="hljs-string">'application/javascript'</span>;
	ctx.body = render;
}
</code></pre>
<p data-nodeid="39519">对于上面提到的 http://localhost:3000/src/index.css?import 请求稍微特殊，需通过 serverPluginVue 来实现解析：</p>
<pre class="lang-java" data-nodeid="39520"><code data-language="java"><span class="hljs-comment">//&nbsp;style 类型请求</span>
<span class="hljs-keyword">if</span> (query.type === <span class="hljs-string">'style'</span>) {
  <span class="hljs-keyword">const</span> index = Number(query.index)
  <span class="hljs-keyword">const</span> styleBlock = descriptor.styles[index]
  <span class="hljs-keyword">if</span> (styleBlock.src) {
    filePath = <span class="hljs-function">await <span class="hljs-title">resolveSrcImport</span><span class="hljs-params">(root, styleBlock, ctx, resolver)</span>
  }
  <span class="hljs-keyword">const</span> id </span>= hash_sum(publicPath)
  <span class="hljs-comment">//&nbsp;调用 compileSFCStyle 方法编译当文件组件样式部分</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-function">await <span class="hljs-title">compileSFCStyle</span><span class="hljs-params">(
    root,
    styleBlock,
    index,
    filePath,
    publicPath,
    config
  )</span>
  ctx.type </span>= <span class="hljs-string">'js'</span>
  <span class="hljs-comment">//&nbsp;返回样式内容</span>
  ctx.body = codegenCss(`${id}-${index}`, result.code, result.modules)
  <span class="hljs-keyword">return</span> etagCacheCheck(ctx)
}
</code></pre>
<p data-nodeid="39521">调用 <a href="https://github.com/vitejs/vite/blob/38f811c5b077f437ffff072276531e8f75953e94/src/node/server/serverPluginCss.ts" data-nodeid="39740">serverPluginCss</a> 中间件的 codegenCss 方法：</p>
<pre class="lang-java" data-nodeid="39522"><code data-language="java"><span class="hljs-function">export function <span class="hljs-title">codegenCss</span><span class="hljs-params">(
  id: string,
  css: string,
  modules?: Record&lt;string, string&gt;
)</span>: string </span>{
  <span class="hljs-comment">// 样式代码模板</span>
  let code =
    `<span class="hljs-keyword">import</span> { updateStyle } from <span class="hljs-string">"${clientPublicPath}"</span>\n` +
    `<span class="hljs-keyword">const</span> css = ${JSON.stringify(css)}\n` +
    `updateStyle(${JSON.stringify(id)}, css)\n`
  <span class="hljs-keyword">if</span> (modules) {
    code += dataToEsm(modules, { namedExports: <span class="hljs-keyword">true</span> })
  } <span class="hljs-keyword">else</span> {
    code += `export <span class="hljs-keyword">default</span> css`
  }
  <span class="hljs-keyword">return</span> code
}
</code></pre>
<p data-nodeid="39523">该方法会在浏览器中执行 updateStyle 方法，<a href="https://github.com/vitejs/vite/blob/c3ef4f64ec09c6916f4e6b9764362a23843b98b6/src/client/client.ts#L170" data-nodeid="39745">源码</a>如下：</p>
<pre class="lang-java" data-nodeid="39524"><code data-language="java"><span class="hljs-keyword">const</span> supportsConstructedSheet = (() =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// 生成 CSSStyleSheet 实例，试探是否支持 ConstructedSheet</span>
    <span class="hljs-keyword">new</span> CSSStyleSheet()
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>
  } <span class="hljs-keyword">catch</span> (e) {}
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
})()
<span class="hljs-function">export function <span class="hljs-title">updateStyle</span><span class="hljs-params">(id: string, content: string)</span> </span>{
  let style = sheetsMap.get(id)
  <span class="hljs-keyword">if</span> (supportsConstructedSheet &amp;&amp; !content.includes(<span class="hljs-string">'@import'</span>)) {
    <span class="hljs-keyword">if</span> (style &amp;&amp; !(style <span class="hljs-keyword">instanceof</span> CSSStyleSheet)) {
      removeStyle(id)
      style = undefined
    }
    <span class="hljs-keyword">if</span> (!style) {
      <span class="hljs-comment">// 生成 CSSStyleSheet 实例</span>
      style = <span class="hljs-keyword">new</span> CSSStyleSheet()
      style.replaceSync(content)
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, style]
    } <span class="hljs-keyword">else</span> {
      style.replaceSync(content)
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (style &amp;&amp; !(style <span class="hljs-keyword">instanceof</span> HTMLStyleElement)) {
      removeStyle(id)
      style = undefined
    }
    <span class="hljs-keyword">if</span> (!style) {
      <span class="hljs-comment">// 生成新的 style 标签并插入到 document 挡住</span>
      style = document.createElement(<span class="hljs-string">'style'</span>)
      style.setAttribute(<span class="hljs-string">'type'</span>, <span class="hljs-string">'text/css'</span>)
      style.innerHTML = content
      document.head.appendChild(style)
    } <span class="hljs-keyword">else</span> {
      style.innerHTML = content
    }
  }
  sheetsMap.set(id, style)
}
</code></pre>
<p data-nodeid="39525">最终完成在浏览器中插入样式。</p>
<p data-nodeid="39526">至此，我们解析并列举了较多源码内容。以上内容需要你跟着思路，一步步梳理，我也强烈建议你打开 Vite 源码自己动手剖析。如果看到这里你仍然也有些“云里雾里”，不要心急，结合我下面这个图示，再次进行阅读，相信会更有收获。</p>
<p data-nodeid="39527">Vite 这种 bundleless 方案的运行原理图：</p>
<p data-nodeid="39528"><img src="https://s0.lgstatic.com/i/image2/M01/03/FB/Cip5yF_ltUqAV2zLAADo9NOnOvk745.png" alt="Lark20201225-174527.png" data-nodeid="39752"></p>
<p data-nodeid="39529"><img src="https://s0.lgstatic.com/i/image/M00/8C/18/Ciqc1F_ltVCAEgT6AAERxP80SRw964.png" alt="Lark20201225-174517.png" data-nodeid="39755"></p>
<p data-nodeid="39530">接下来我们再做一些更细节的总结。</p>
<ul data-nodeid="39531">
<li data-nodeid="39532">
<p data-nodeid="39533">Vite 利用浏览器原生支持 ESM 这一特性，省略了对模块的打包，也就不需要生成 bundle，因此初次启动更快，HMR 特性友好。</p>
</li>
<li data-nodeid="39534">
<p data-nodeid="39535">Vite 开发模式下，通过启动 koa 服务器，在服务端完成模块的改写（比如单文件的解析编译等）和请求处理，实现真正的按需编译。</p>
</li>
<li data-nodeid="39536">
<p data-nodeid="39537">Vite Server 所有逻辑基本都依赖中间件实现。这些中间件，拦截请求之后，完成了如下内容：</p>
<ul data-nodeid="39538">
<li data-nodeid="39539">
<p data-nodeid="39540">处理 ESM 语法，比如将业务代码中的 import 第三方依赖路径转为浏览器可识别的依赖路径；</p>
</li>
<li data-nodeid="39541">
<p data-nodeid="39542">对 .ts、.vue 等文件进行即时编译；</p>
</li>
<li data-nodeid="39543">
<p data-nodeid="39544">对 Sass/Less 的需要预编译的模块进行编译；</p>
</li>
<li data-nodeid="39545">
<p data-nodeid="39546">和浏览器端建立 socket 连接，实现 HMR。</p>
</li>
</ul>
</li>
</ul>
<h4 data-nodeid="39547">Vite HMR 实现原理</h4>
<p data-nodeid="39548">Vite 的打包命令使用了 Rollup 进行，这里并没有什么特别之处，我们不再展开讲解。而 Vite 的 HMR 特性，主要是围绕着：</p>
<ul data-nodeid="39549">
<li data-nodeid="39550">
<p data-nodeid="39551">通过 watcher 监听文件改动</p>
</li>
<li data-nodeid="39552">
<p data-nodeid="39553">通过 server 端编译资源，并推送新模块内容给浏览器</p>
</li>
<li data-nodeid="39554">
<p data-nodeid="39555">浏览器收到新的模块内容，执行框架层面的 rerender/reload</p>
</li>
</ul>
<p data-nodeid="39556">三步进行。</p>
<p data-nodeid="39557">当浏览器请求 HTML 页面时，服务端通过 <a href="https://github.com/vitejs/vite/blob/master/src/node/server/serverPluginHtml.ts" data-nodeid="39773">serverPluginHtml</a> 插件向 HTML 内容注入一段脚本。如下图所示，我们可以看到， index.html 中就有一段引入 /vite/client 代码，进行 WebSocket 的注册和监听。</p>
<p data-nodeid="39558"><img src="https://s0.lgstatic.com/i/image/M00/8B/C7/Ciqc1F_gZk-AeTAnAAK2AAgChPQ413.png" alt="Drawing 6.png" data-nodeid="39777"></p>
<p data-nodeid="39559"><img src="https://s0.lgstatic.com/i/image/M00/8B/D2/CgqCHl_gZlWAHmvqAAgRairyZ98357.png" alt="Drawing 7.png" data-nodeid="39780"></p>
<p data-nodeid="39560">对于 /vite/client 请求的处理，服务端由 <a href="https://github.com/vitejs/vite/blob/a47429dabea12e8aa5f4a21209846aaf857d5be0/src/node/server/serverPluginClient.ts" data-nodeid="39784">serverPluginClient</a> 插件进行处理：</p>
<pre class="lang-java" data-nodeid="39561"><code data-language="java">export <span class="hljs-keyword">const</span> clientPlugin: ServerPlugin = ({ app, config }) =&gt; {
  <span class="hljs-keyword">const</span> clientCode = fs
    .readFileSync(clientFilePath, <span class="hljs-string">'utf-8'</span>)
    .replace(`__MODE__`, JSON.stringify(config.mode || <span class="hljs-string">'development'</span>))
    .replace(
      `__DEFINES__`,
      JSON.stringify({
        ...defaultDefines,
        ...config.define
      })
    )
  <span class="hljs-comment">// 相应中间件处理</span>
  app.use(async (ctx, next) =&gt; {
    <span class="hljs-keyword">if</span> (ctx.path === clientPublicPath) {
      ctx.type = <span class="hljs-string">'js'</span>
      ctx.status = <span class="hljs-number">200</span>
      <span class="hljs-comment">// 返回具体内容</span>
      ctx.body = clientCode.replace(`__PORT__`, ctx.port.toString())
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 兼容历史逻辑，并进行错误提示</span>
      <span class="hljs-keyword">if</span> (ctx.path === legacyPublicPath) {
        console.error(
          chalk.red(
            `[vite] client <span class="hljs-keyword">import</span> path has changed from <span class="hljs-string">"/vite/hmr"</span> to <span class="hljs-string">"/vite/client"</span>. ` +
              `please update your code accordingly.`
          )
        )
      }
      <span class="hljs-keyword">return</span> next()
    }
  })
}
</code></pre>
<p data-nodeid="39562">返回的 /vite/src/client/client.js 代码在浏览器端主要通过 WebSocket 监听了一些更新的类型（vue 组件更新/vue template 更新/vue style 更新/css 更新/css 移除/js 更新/页面 roload），分别进行处理。</p>
<p data-nodeid="39563">在服务端，通过 <a href="https://www.npmjs.com/package/chokidar" data-nodeid="39790">chokidar</a> 创建了一个监听文件改动的 watcher 来监听文件改动：</p>
<pre class="lang-java" data-nodeid="39564"><code data-language="java"><span class="hljs-keyword">const</span> watcher = chokidar.watch(root, {
	ignored: [/node_modules/, /\.git/],
	<span class="hljs-comment">// #610</span>
	awaitWriteFinish: {
	  stabilityThreshold: <span class="hljs-number">100</span>,
	  pollInterval: <span class="hljs-number">10</span>
	}
}) as HMRWatcher
</code></pre>
<p data-nodeid="39565">并通过 <a href="https://github.com/vitejs/vite/blob/master/src/node/server/serverPluginHmr.ts" data-nodeid="39795">serverPluginHmr</a> 发布变动，通知浏览器。</p>
<p data-nodeid="39566">更多源码不再一一贴出。这里我总结了一张流程图供你参考：</p>
<p data-nodeid="39809" class=""><img src="https://s0.lgstatic.com/i/image2/M01/03/FD/CgpVE1_ltm6AN8nCAAMSQ8AjILg631.png" alt="Lark20201225-175233.png" data-nodeid="39813"></p>
<div data-nodeid="39810"><p style="text-align:center">Vite 实现 HMR 流程图</p></div>


<h3 data-nodeid="39569">总结</h3>
<p data-nodeid="39570">这一讲我们聚焦 Vite 实现，分析了如何利用 ESM，构建一个 bundleless 风格的现代化开发工程方案。源码内容较多，也涉及一定工程化架构设计内容，但 Vite 实现流程清晰，易读性高，是源码阅读类很好的资源。</p>
<p data-nodeid="39571">事实上，Vite 依赖优化的灵感来自 <a href="https://www.snowpack.dev/" data-nodeid="39806">Snowpack</a>，这类 bundleless 工具也代表着一种新趋势、新方向。我认为，技术功底是很重要的一方面，而技术敏感度的培养也非常关键。希望与你共勉！</p>
<p data-nodeid="39572" class="">到此，新编译工具理念——Vite 我们就介绍到这里。接下来我们将进入代码降级编译环节的学习，我们下一讲再见。</p>

---

### 精选评论

##### **龙：
> 老师我想问下Vite 是怎么保证dev环境和生产环境，最后得到的结果是一样的啊，会不会出现dev看到的是一种现象，生产环境看到的是另一种现象还有如果我同时import 两个js文件，这两个文件的加载执行顺序会有先后吗？是必须前一个加载完成后，才会去import另外一个吗？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 不是的，请求不一定是串行关系，这个可以自己动手试验一下

##### **龙：
> 老师我有几个疑惑点1 Vite 是怎么保证本地环境运行出的结果和最后生产环境是一致的啊2 我在一个js文件中，同时有两个import，这个js就会导致发送两个请求，是不是只有等一个请求发送接收到返回以后，才回去发送下一个请求，是一种同步的行为

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 不是的，请求不一定是串行关系，这个可以自己动手试验一下

##### **勇：
> vite@2.x不使用koa来创建服务和管理中间件了，而是使用connect。是处于什么考虑呢？TJ不维护Koa了哇

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 这是目前看到最好的问题之一，不过提问者应该更进一步，提升自己解决问题，找到答案的能力。具体原因在 https://github.com/vitejs/vite/blob/91dbb017091c175a54bcd1c93a69f8458d1bde8d/docs/guide/migration.md#for-plugin-authors 中有所体现了其实，简单总结一下是 vite@2.x 主要是用基于 hooks 的插件，对于 koa 中间件的需求大幅度减少，从依赖成本上看，old school 的 connect 即可方便轻巧满足需求了

##### *锋：
> 什么时候更新呀

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 每周一、三更新哈~

##### **8621：
> 第一个提出bundleless理念的人，绝对是十分善于思考的人。

##### **勇：
> SnowPack和Vite的区别主要是对打包的处理吗？Vite是使用Rollup来build，Vite还是使用Webpack来完成build。后续会对这两者的区别展开讲解吗？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 对于 SnowPack和Vite的发展路线其实是比较有趣的话题，也会随着时间演进有所变化。可以与我保持联系，随时沟通

##### **0231：
> 大佬太强了，大佬是参考了相关文章进行的学习，还是直接梳理源码进行的分析

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 知识获取方式：看源码，看官网，去 github 提 issue/pr，多参与国际社区讨论，国内毕竟面比较有限

##### **贤：
> 学到了, 都没听说过 Vite, 我是不是太菜了😂

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 不是哦，学习是个持久的过程，每个知识都是从无到有。现在掌握也不晚呐~

##### cxl：
> 请问下老师，react有bundless吗

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 有的，vite 可以改造支持，另外建议找一下 snowpack 的 react 方案

