<p data-nodeid="1261" class="">之前我们提到过，一个顺畅的基建流程离不开 npm scripts。npm scripts 将工程化的各个环节串联起来，相信任何一个现代化的项目都有自己的 npm scripts 设计。那么作为架构师或资深开发者，我们如何设计并实现项目配套的 npm scripts 呢？关于 npm scripts 我们如何进行封装抽象，做到复用或基建统一呢？</p>
<p data-nodeid="1262">这一讲，我们就围绕如何使用 npm scripts，打造一体化的构建和部署流程展开。</p>
<h3 data-nodeid="1263">npm scripts 原理介绍</h3>
<p data-nodeid="1264">这一部分，我们将对 npm scripts 是什么，以及其核心原理进行讲解。</p>
<h4 data-nodeid="1265">npm scripts 是什么</h4>
<p data-nodeid="1266">我们先来系统地了解一下 npm scripts。Node.js 在设计 npm 之初，允许开发者在 package.json 文件中，通过 scripts 字段来自定义项目的脚本。比如我们可以在 package.json 中这样使用：</p>
<pre class="lang-java" data-nodeid="1267"><code data-language="java">{
	<span class="hljs-comment">// ...</span>
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build.js"</span>,
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node dev.js"</span>,
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"node test.js"</span>,
  }
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p data-nodeid="1268">对应上述代码，我们在项目中可以使用命令行执行相关的脚本：</p>
<pre class="lang-java" data-nodeid="1269"><code data-language="java">$ npm run build
$ npm run dev
$ npm run test
</code></pre>
<p data-nodeid="1270">其中<code data-backticks="1" data-nodeid="1367">build.js</code>、<code data-backticks="1" data-nodeid="1369">dev.js</code>、<code data-backticks="1" data-nodeid="1371">test.js</code>三个 Node.js 模块分别对应上面三个命令行执行命令。这样的设计，可以方便我们统计和集中维护项目工程化或基建相关的所有脚本/命令，也可以利用 npm 很多辅助功能，例如下面几个功能。</p>
<ul data-nodeid="1271">
<li data-nodeid="1272">
<p data-nodeid="1273">使用 npm 钩子，比如<code data-backticks="1" data-nodeid="1374">pre</code>、<code data-backticks="1" data-nodeid="1376">post</code>，对应命令<code data-backticks="1" data-nodeid="1378">npm run build</code>的钩子命令就是：<code data-backticks="1" data-nodeid="1380">prebuild</code>和<code data-backticks="1" data-nodeid="1382">postbuild</code>。</p>
</li>
<li data-nodeid="1274">
<p data-nodeid="1275">开发者使用<code data-backticks="1" data-nodeid="1385">npm run build</code>时，会默认自动先执行<code data-backticks="1" data-nodeid="1387">npm run prebuild</code>再执行<code data-backticks="1" data-nodeid="1389">npm run build</code>，最后执行<code data-backticks="1" data-nodeid="1391">npm run postbuild</code>，对此我们可以自定义：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="1276"><code data-language="java">    {
    	<span class="hljs-comment">// ...</span>
      <span class="hljs-string">"scripts"</span>: {
        <span class="hljs-string">"prebuild"</span>: <span class="hljs-string">"node prebuild.js"</span>,
        <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build.js"</span>,
        <span class="hljs-string">"postbuild"</span>: <span class="hljs-string">"node postbuild.js"</span>,
      }
      <span class="hljs-comment">// ...</span>
    }
</code></pre>
<ul data-nodeid="1277">
<li data-nodeid="1278">
<p data-nodeid="1279">使用 npm 提供的<code data-backticks="1" data-nodeid="1394">process.env.npm_lifecycle_event</code>等环境变量。通过<code data-backticks="1" data-nodeid="1396">process.env.npm_lifecycle_event</code>，可以在相关 npm scripts 脚本中获得当前运行的脚本名称。</p>
</li>
<li data-nodeid="1280">
<p data-nodeid="1281">使用 npm 提供的<code data-backticks="1" data-nodeid="1399">npm_package_</code>能力，获取 package.json 中的相关字段，比如下面代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="1282"><code data-language="java">  <span class="hljs-comment">// 获取 package.json 中的 name 字段值</span>
  console.log(process.env.npm_package_name)

  <span class="hljs-comment">// 获取 package.json 中的 version 字段值</span>
  console.log(process.env.npm_package_version)
</code></pre>
<p data-nodeid="1283">更多 npm 为 npm scripts 提供的“黑魔法”，我们不再一一列举了。你可以前往 <a href="https://docs.npmjs.com/" data-nodeid="1404">https://docs.npmjs.com/</a> 进行了解。</p>
<h4 data-nodeid="1284">npm scripts 原理</h4>
<p data-nodeid="1285">其实，npm scripts 原理比较简单。我们依靠<code data-backticks="1" data-nodeid="1408">npm run xxx</code>来执行一个 npm scripts，那么核心奥秘就在于<code data-backticks="1" data-nodeid="1410">npm run</code>了。<code data-backticks="1" data-nodeid="1412">npm run</code>会自动创建一个 Shell（实际使用的 Shell 会根据系统平台而不同，类 UNIX 系统里，如 macOS 或 Linux 中指代的是 /bin/sh， 在 Windows 中使用的是 cmd.exe），我们的 npm scripts 脚本就在这个新创建的 Shell 中被运行。这样一来，我们可以得出几个关键结论：</p>
<ul data-nodeid="1286">
<li data-nodeid="1287">
<p data-nodeid="1288">只要是 Shell 可以运行的命令，都可以作为 npm scripts 脚本；</p>
</li>
<li data-nodeid="1289">
<p data-nodeid="1290">npm 脚本的退出码，也自然遵守 Shell 脚本规则；</p>
</li>
<li data-nodeid="1291">
<p data-nodeid="1292">如果我们的系统里安装了 Python，可以将 Python 脚本作为 npm scripts；</p>
</li>
<li data-nodeid="1293">
<p data-nodeid="1294">npm scripts 脚本可以使用 Shell 通配符等常规能力。</p>
</li>
</ul>
<p data-nodeid="1295">比如这样的代码：</p>
<pre class="lang-java" data-nodeid="1296"><code data-language="java">  {
  	<span class="hljs-comment">// ...</span>
    <span class="hljs-string">"scripts"</span>: {
      <span class="hljs-string">"lint"</span>: <span class="hljs-string">"eslint **/*.js"</span>,
    }
    <span class="hljs-comment">// ...</span>
  }
</code></pre>
<p data-nodeid="1297"><code data-backticks="1" data-nodeid="1419">*</code>表示任意文件名，<code data-backticks="1" data-nodeid="1421">**</code>表示任意一层子目录，在执行<code data-backticks="1" data-nodeid="1423">npm run lint</code>后，就可以对当前目录下，任意一层子目录的 js 文件进行 lint 审查。</p>
<p data-nodeid="1298">另外，请你思考：<code data-backticks="1" data-nodeid="1426">npm run</code>创建出来的 Shell 有什么特别之处呢？</p>
<p data-nodeid="1299">我们知道，<code data-backticks="1" data-nodeid="1429">node_modules/.bin</code>子目录中的所有脚本都<strong data-nodeid="1435">可以直接以脚本名的形式调用，而不必写出完整路径</strong>，比如下面代码：</p>
<pre class="lang-java" data-nodeid="1300"><code data-language="java">{
	<span class="hljs-comment">// ...</span>
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>,
  }
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p data-nodeid="1301">在 package.json 中直接写<code data-backticks="1" data-nodeid="1437">webpack</code>即可，而不需要写成：</p>
<pre class="lang-java" data-nodeid="1302"><code data-language="java">{
	<span class="hljs-comment">// ...</span>
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"./node_modules/.bin/webpack"</span>,
  }
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p data-nodeid="1303">的形式。这是为什么呢？</p>
<p data-nodeid="1304">实际上，<code data-backticks="1" data-nodeid="1441">npm run</code>创建出来的 Shell 需要<strong data-nodeid="1452">将当前目录的</strong><code data-backticks="1" data-nodeid="1446">node_modules/.bin</code>子目录加入<strong data-nodeid="1453">PATH 变量中</strong>，在 npm scripts 执行完成后，再将 PATH 变量恢复。</p>
<h4 data-nodeid="1305">npm scripts 使用技巧</h4>
<p data-nodeid="1306">这里我们简单讲解两个常见场景，以此介绍 npm scripts 的关键使用技巧。</p>
<p data-nodeid="1307"><strong data-nodeid="1459">传递参数</strong></p>
<p data-nodeid="1308">任何命令脚本，都需要进行参数传递。在 npm scripts 中，可以使用<code data-backticks="1" data-nodeid="1461">--</code>标记参数。比如下面代码：</p>
<pre class="lang-java" data-nodeid="1309"><code data-language="java">$ webpack --profile --json &gt; stats.json
</code></pre>
<p data-nodeid="1310">另外一种传参的方式是通过 package.json，比如下面代码：</p>
<pre class="lang-java" data-nodeid="1311"><code data-language="java">{
	<span class="hljs-comment">// ...</span>
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --profile --json &gt; stats.json"</span>,
  }
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p data-nodeid="1312"><strong data-nodeid="1467">串行/并行执行脚本</strong></p>
<p data-nodeid="1313">在一个项目中，任意 npm scripts 可能彼此之间都有会依赖关系，我们可以通过<code data-backticks="1" data-nodeid="1469">&amp;&amp;</code>符号来串行执行脚本。比如下面代码：</p>
<pre class="lang-java" data-nodeid="1314"><code data-language="java">$ npm run pre.js &amp;&amp; npm run post.js
</code></pre>
<p data-nodeid="1315">如果需要并行执行，可以使用<code data-backticks="1" data-nodeid="1472">&amp;</code>符号，如下代码：</p>
<pre class="lang-java te-preview-highlight" data-nodeid="1576"><code data-language="java">npm run scriptA.js &amp; npm run scriptB.js
</code></pre>

<p data-nodeid="1317">这两种串行/并行执行方式其实是 Bash 的能力，社区里也封装了很多串行/并行执行脚本的公共包供开发者选用，比如：<a href="https://github.com/mysticatea/npm-run-all" data-nodeid="1477">npm-run-all</a> 就是一个常用的例子。</p>
<p data-nodeid="1318"><strong data-nodeid="1482">最后的提醒</strong></p>
<p data-nodeid="1319">最后，特别强调两点注意事项。</p>
<p data-nodeid="1320">首先，<strong data-nodeid="1501">npm scripts 可以和 git-hooks 相结合</strong>，为项目提供更顺畅、自然的能力。比如 <a href="https://github.com/observing/pre-commit" data-nodeid="1491">pre-commit</a>、<a href="https://github.com/typicode/husky" data-nodeid="1495">husky</a>、<a href="https://github.com/okonet/lint-staged" data-nodeid="1499">lint-staged</a> 这类工具，支持 Git Hooks 各种种类，在必要的 git 操作节点，执行我们的 npm scripts。</p>
<p data-nodeid="1321">同时需要注意的是，我们编写的 npm scripts 应该考虑<strong data-nodeid="1511">不同操作系统上兼容性的问题</strong>，因为 npm scripts 理论上在任何系统都应该 just work。社区为我们提供了很多跨平台的方案，比如 <a href="https://www.npmjs.com/package/run-script-os" data-nodeid="1509">un-script-os</a> 允许我们针对不同平台进行不同的定制化脚本，如下代码：</p>
<pre class="lang-java" data-nodeid="1322"><code data-language="java">{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"run-script-os"</span>,
    <span class="hljs-string">"test:win32"</span>: <span class="hljs-string">"echo 'del whatever you want in Windows 32/64'"</span>,
    <span class="hljs-string">"test:darwin:linux"</span>: <span class="hljs-string">"echo 'You can combine OS tags and rm all the things!'"</span>,
    <span class="hljs-string">"test:default"</span>: <span class="hljs-string">"echo 'This will run on any platform that does not have its own script'"</span>
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p data-nodeid="1323">再比如，更加常见的<a href="https://www.npmjs.com/package/cross-env" data-nodeid="1515">https://www.npmjs.com/package/cross-env</a>，可以为我们自动在不同的平台设置环境变量。</p>
<p data-nodeid="1324">好了，接下来我们从一个实例出发，打造一个 lucas-scripts，实践操作 npm scripts，同时丰富我们的工程化经验。</p>
<h3 data-nodeid="1325">打造一个 lucas-scripts</h3>
<p data-nodeid="1326">lucas-scripts 其实是我设想的一个 npm scripts 插件集合，通过 Monorepo 风格的项目，借助 npm 抽象“自己常用的”npm scripts 脚本，以在多个项目中达到复用的目的。</p>
<p data-nodeid="1327">其设计思想其实源于 Kent C.Dodds（<a href="https://kentcdodds.com/blog/tools-without-config/" data-nodeid="1523">https://kentcdodds.com/blog</a>）的：Tools without config 思想。事实上，在 PayPal 公司内部，有一个 paypal-scripts（未开源），借助 paypal-scripts 的设计思路，就有了 lucas-scripts。我们先从设计思想上分析，不管是 paypal-scripts 还是 lucas-scripts，它们主要解决了哪类问题。</p>
<p data-nodeid="1328">谈到前端开发，各种工具配置着实令人头大，而对于一个企业级团队来说，维护统一的企业级工具配置或设计，对工程效率的提升至关重要。这些工具包括但不限于：</p>
<ul data-nodeid="1329">
<li data-nodeid="1330">
<p data-nodeid="1331">测试工具及方案</p>
</li>
<li data-nodeid="1332">
<p data-nodeid="1333">Client 端打包工具及方案</p>
</li>
<li data-nodeid="1334">
<p data-nodeid="1335">Linting 工具及方案</p>
</li>
<li data-nodeid="1336">
<p data-nodeid="1337">Babel 工具及方案</p>
</li>
</ul>
<p data-nodeid="1338">等等，这些工具及方案的背后往往是烦琐的配置，同时，这些配置的设计却至关重要。比如我们的 Webpack 可以工作，但是它的配置设计却经常经不起推敲；Linters 经常过时，跟不上语言的发展，使得我们的构建流程无比脆弱而容易中断。</p>
<p data-nodeid="1339">在此背景下，lucas-scripts 负责维护和掌管工程基建中的种种工具及方案，同时它的使命不仅仅是 Bootstrap 一个项目，而是长期维护基建方案，可以随时升级，随时插拔。</p>
<p data-nodeid="1340">这很类似我们熟悉的 <a href="https://github.com/facebook/create-react-app" data-nodeid="1535">create-react-app</a>，create-react-app 可以帮助 React 开发者迅速启动一个项目，它以黑盒的方式维护了 Webpack 构建以及 Jest 测试、Eslint 等能力。开发者只需要使用 react-scripts 就能够满足构建和测试等需求，开发者只需要关心业务开发。lucas-scripts 的理念相同：开发者只需要使用 lucas-scripts，就可以使用开箱即用的各类型 npm scripts 插件，npm scripts 插件提供基础工具的配置和方案设计。</p>
<p data-nodeid="1341">但需要注意的是，<a href="https://github.com/facebook/create-react-app" data-nodeid="1540">create-react-app</a> 官方并不允许开发者自定义这些工具的配置及方案设计，而我们的 lucas-scripts 理应实现更灵活的配置能力。如何做到开发者自定义配置的能力呢？设计上，我们支持<strong data-nodeid="1547">开发者在项目中添加</strong><code data-backticks="1" data-nodeid="1545">.babelrc</code>或在项目的 package.json 中添加相应的 babel 配置项，lucas-scripts 在运行时读取这些信息，并采用开发者自定义的配置即可。</p>
<p data-nodeid="1342">比如，我们支持项目中 package.json 配置：</p>
<pre class="lang-java" data-nodeid="1343"><code data-language="java">{
  <span class="hljs-string">"babel"</span>: {
    <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"lucas-scripts/babel"</span>],
    <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"glamorous-displayname"</span>]
  }
}
</code></pre>
<p data-nodeid="1344">上述代码可以做到使用 lucas-scripts 定义的 Babel 预设，同时支持开发者使用名为 glamorous-displayname 的 Babel 插件。</p>
<p data-nodeid="1345">下面，我们就以 lucas-scripts 中封装的 Babel 配置进行详细讲解。</p>
<p data-nodeid="1346">在使用 lucas-scripts 的 Babel 方案时，我们提供了默认的一套 Babel 设计方案，具体代码如下：</p>
<pre class="lang-java" data-nodeid="1347"><code data-language="java"><span class="hljs-comment">// 使用 browserslist 包进行降级目标设置</span>
<span class="hljs-keyword">const</span> browserslist = require(<span class="hljs-string">'browserslist'</span>)
<span class="hljs-keyword">const</span> semver = require(<span class="hljs-string">'semver'</span>)
<span class="hljs-comment">// 几个工具包，这里不再一一展开</span>
<span class="hljs-keyword">const</span> {
  ifDep,
  ifAnyDep,
  ifTypescript,
  parseEnv,
  appDirectory,
  pkg,
} = require(<span class="hljs-string">'../utils'</span>)
<span class="hljs-comment">// 获取环境变量</span>
<span class="hljs-keyword">const</span> {BABEL_ENV, NODE_ENV, BUILD_FORMAT} = process.env
<span class="hljs-comment">// 几个关键变量的判断</span>
<span class="hljs-keyword">const</span> isTest = (BABEL_ENV || NODE_ENV) === <span class="hljs-string">'test'</span>
<span class="hljs-keyword">const</span> isPreact = parseEnv(<span class="hljs-string">'BUILD_PREACT'</span>, <span class="hljs-keyword">false</span>)
<span class="hljs-keyword">const</span> isRollup = parseEnv(<span class="hljs-string">'BUILD_ROLLUP'</span>, <span class="hljs-keyword">false</span>)
<span class="hljs-keyword">const</span> isUMD = BUILD_FORMAT === <span class="hljs-string">'umd'</span>
<span class="hljs-keyword">const</span> isCJS = BUILD_FORMAT === <span class="hljs-string">'cjs'</span>
<span class="hljs-keyword">const</span> isWebpack = parseEnv(<span class="hljs-string">'BUILD_WEBPACK'</span>, <span class="hljs-keyword">false</span>)
<span class="hljs-keyword">const</span> isMinify = parseEnv(<span class="hljs-string">'BUILD_MINIFY'</span>, <span class="hljs-keyword">false</span>)
<span class="hljs-keyword">const</span> treeshake = parseEnv(<span class="hljs-string">'BUILD_TREESHAKE'</span>, isRollup || isWebpack)
<span class="hljs-keyword">const</span> alias = parseEnv(<span class="hljs-string">'BUILD_ALIAS'</span>, isPreact ? {react: <span class="hljs-string">'preact'</span>} : <span class="hljs-keyword">null</span>)
<span class="hljs-comment">// 是否使用 @babel/runtime</span>
<span class="hljs-keyword">const</span> hasBabelRuntimeDep = Boolean(
  pkg.dependencies &amp;&amp; pkg.dependencies[<span class="hljs-string">'@babel/runtime'</span>],
)
<span class="hljs-keyword">const</span> RUNTIME_HELPERS_WARN =
  <span class="hljs-string">'You should add @babel/runtime as dependency to your package. It will allow reusing "babel helpers" from node_modules rather than bundling their copies into your files.'</span>
<span class="hljs-comment">// 强制使用 @babel/runtime，以减少编译后代码体积等</span>
<span class="hljs-keyword">if</span> (!treeshake &amp;&amp; !hasBabelRuntimeDep &amp;&amp; !isTest) {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(RUNTIME_HELPERS_WARN)
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (treeshake &amp;&amp; !isUMD &amp;&amp; !hasBabelRuntimeDep) {
  console.warn(RUNTIME_HELPERS_WARN)
}
<span class="hljs-comment">// 获取用户的 browserslist 配置，默认给一个 ie 10 和 ios 7 配置</span>
<span class="hljs-keyword">const</span> browsersConfig = browserslist.loadConfig({path: appDirectory}) || [
  <span class="hljs-string">'ie 10'</span>,
  <span class="hljs-string">'ios 7'</span>,
]
<span class="hljs-comment">// 获取 envTargets</span>
<span class="hljs-keyword">const</span> envTargets = isTest
  ? {node: <span class="hljs-string">'current'</span>}
  : isWebpack || isRollup
  ? {browsers: browsersConfig}
  : {node: getNodeVersion(pkg)}

<span class="hljs-comment">// @babel/preset-env 配置，默认使用以下配置项</span>
<span class="hljs-keyword">const</span> envOptions = {modules: <span class="hljs-keyword">false</span>, loose: <span class="hljs-keyword">true</span>, targets: envTargets}
<span class="hljs-comment">// babel 默认方案</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = () =&gt; ({
  presets: [
    [require.resolve(<span class="hljs-string">'@babel/preset-env'</span>), envOptions],
    <span class="hljs-comment">// 如果存在 react 或 preact 依赖，则补充 @babel/preset-react</span>
    ifAnyDep(
      [<span class="hljs-string">'react'</span>, <span class="hljs-string">'preact'</span>],
      [
        require.resolve(<span class="hljs-string">'@babel/preset-react'</span>),
        {pragma: isPreact ? ifDep(<span class="hljs-string">'react'</span>, <span class="hljs-string">'React.h'</span>, <span class="hljs-string">'h'</span>) : undefined},
      ],
    ),
    <span class="hljs-comment">// 如果使用 Typescript，则补充 @babel/preset-typescript</span>
    ifTypescript([require.resolve(<span class="hljs-string">'@babel/preset-typescript'</span>)]),
  ].filter(Boolean),
  plugins: [
    [
    	<span class="hljs-comment">// 强制使用 @babel/plugin-transform-runtime </span>
      require.resolve(<span class="hljs-string">'@babel/plugin-transform-runtime'</span>),
      {useESModules: treeshake &amp;&amp; !isCJS},
    ],
    <span class="hljs-comment">// 使用 babel-plugin-macros</span>
    require.resolve(<span class="hljs-string">'babel-plugin-macros'</span>),
    <span class="hljs-comment">// 别名配置</span>
    alias
      ? [
          require.resolve(<span class="hljs-string">'babel-plugin-module-resolver'</span>),
          {root: [<span class="hljs-string">'./src'</span>], alias},
        ]
      : <span class="hljs-keyword">null</span>,
    <span class="hljs-comment">// 是否编译为 UMD 规范</span>
    isUMD
      ? require.resolve(<span class="hljs-string">'babel-plugin-transform-inline-environment-variables'</span>)
      : <span class="hljs-keyword">null</span>,
    <span class="hljs-comment">// 强制使用 @babel/plugin-proposal-class-properties</span>
    [require.resolve(<span class="hljs-string">'@babel/plugin-proposal-class-properties'</span>), {loose: <span class="hljs-keyword">true</span>}],
    <span class="hljs-comment">// 是否进行压缩</span>
    isMinify
      ? require.resolve(<span class="hljs-string">'babel-plugin-minify-dead-code-elimination'</span>)
      : <span class="hljs-keyword">null</span>,
    treeshake
      ? <span class="hljs-keyword">null</span>
      : require.resolve(<span class="hljs-string">'@babel/plugin-transform-modules-commonjs'</span>),
  ].filter(Boolean),
})
<span class="hljs-comment">// 获取 node 版本</span>
<span class="hljs-function">function <span class="hljs-title">getNodeVersion</span><span class="hljs-params">({engines: {node: nodeVersion = <span class="hljs-string">'10.13'</span>} = {}})</span> </span>{
  <span class="hljs-keyword">const</span> oldestVersion = semver
    .validRange(nodeVersion)
    .replace(/[&gt;=&lt;|]/g, <span class="hljs-string">' '</span>)
    .split(<span class="hljs-string">' '</span>)
    .filter(Boolean)
    .sort(semver.compare)[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">if</span> (!oldestVersion) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(
      `Unable to determine the oldest version in the range in your <span class="hljs-keyword">package</span>.json at engines.node: <span class="hljs-string">"${nodeVersion}"</span>. Please attempt to make it less ambiguous.`,
    )
  }
  <span class="hljs-keyword">return</span> oldestVersion
}
</code></pre>
<p data-nodeid="1348">通过上面代码，我们将 Babel 方案强制使用了一些最佳实践，比如使用了特定 loose、moudles 设置的 @babel/preset-env 配置项，使用了 @babel/plugin-transform-runtime，使用了 @babel/plugin-proposal-class-properties，各种原理我们已经在 07 讲《<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=584#/detail/pc?id=5912" data-nodeid="1555">梳理混乱的 Babel，不再被编译报错困扰</a>》中有所涉及。</p>
<p data-nodeid="1349">了解了 Babel 的设计方案，我们在使用 lucas-scripts 时是如何调用设计方案并执行 Babel 编译的呢？我们看看相关逻辑源码，如下：</p>
<pre class="lang-java" data-nodeid="1350"><code data-language="java"><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// 支持使用 DEFAULT_EXTENSIONS，具体见：https://www.babeljs.cn/docs/babel-core#default_extensions</span>
<span class="hljs-keyword">const</span> {DEFAULT_EXTENSIONS} = require(<span class="hljs-string">'@babel/core'</span>)
<span class="hljs-keyword">const</span> spawn = require(<span class="hljs-string">'cross-spawn'</span>)
<span class="hljs-keyword">const</span> yargsParser = require(<span class="hljs-string">'yargs-parser'</span>)
<span class="hljs-keyword">const</span> rimraf = require(<span class="hljs-string">'rimraf'</span>)
<span class="hljs-keyword">const</span> glob = require(<span class="hljs-string">'glob'</span>)
<span class="hljs-comment">// 工具方法</span>
<span class="hljs-keyword">const</span> {
  hasPkgProp,
  fromRoot,
  resolveBin,
  hasFile,
  hasTypescript,
  generateTypeDefs,
} = require(<span class="hljs-string">'../../utils'</span>)
let args = process.argv.slice(<span class="hljs-number">2</span>)
<span class="hljs-keyword">const</span> here = p =&gt; path.join(__dirname, p)
<span class="hljs-comment">// 解析命令行参数</span>
<span class="hljs-keyword">const</span> parsedArgs = yargsParser(args)
<span class="hljs-comment">// 是否使用 lucas-scripts 提供的默认 babel 方案</span>
<span class="hljs-keyword">const</span> useBuiltinConfig =
  !args.includes(<span class="hljs-string">'--presets'</span>) &amp;&amp;
  !hasFile(<span class="hljs-string">'.babelrc'</span>) &amp;&amp;
  !hasFile(<span class="hljs-string">'.babelrc.js'</span>) &amp;&amp;
  !hasFile(<span class="hljs-string">'babel.config.js'</span>) &amp;&amp;
  !hasPkgProp(<span class="hljs-string">'babel'</span>)

<span class="hljs-comment">// 使用 lucas-scripts 提供的默认 babel 方案，读取相关配置</span>
<span class="hljs-keyword">const</span> config = useBuiltinConfig
  ? [<span class="hljs-string">'--presets'</span>, here(<span class="hljs-string">'../../config/babelrc.js'</span>)]
  : []
<span class="hljs-comment">// 是否使用 babel-core 所提供的 DEFAULT_EXTENSIONS 能力</span>
<span class="hljs-keyword">const</span> extensions =
  args.includes(<span class="hljs-string">'--extensions'</span>) || args.includes(<span class="hljs-string">'--x'</span>)
    ? []
    : [<span class="hljs-string">'--extensions'</span>, [...DEFAULT_EXTENSIONS, <span class="hljs-string">'.ts'</span>, <span class="hljs-string">'.tsx'</span>]]
<span class="hljs-comment">// 忽略某些文件夹，不进行编译</span>
<span class="hljs-keyword">const</span> builtInIgnore = <span class="hljs-string">'**/__tests__/**,**/__mocks__/**'</span>
<span class="hljs-keyword">const</span> ignore = args.includes(<span class="hljs-string">'--ignore'</span>) ? [] : [<span class="hljs-string">'--ignore'</span>, builtInIgnore]
<span class="hljs-comment">// 是否复制文件</span>
<span class="hljs-keyword">const</span> copyFiles = args.includes(<span class="hljs-string">'--no-copy-files'</span>) ? [] : [<span class="hljs-string">'--copy-files'</span>]
<span class="hljs-comment">// 是否使用特定的 output 文件夹</span>
<span class="hljs-keyword">const</span> useSpecifiedOutDir = args.includes(<span class="hljs-string">'--out-dir'</span>)
<span class="hljs-comment">// 默认的 output 文件夹名为 dist</span>
<span class="hljs-keyword">const</span> builtInOutDir = <span class="hljs-string">'dist'</span>
<span class="hljs-keyword">const</span> outDir = useSpecifiedOutDir ? [] : [<span class="hljs-string">'--out-dir'</span>, builtInOutDir]
<span class="hljs-keyword">const</span> noTypeDefinitions = args.includes(<span class="hljs-string">'--no-ts-defs'</span>)
<span class="hljs-comment">// 编译开始前，是否先清理 output 文件夹</span>
<span class="hljs-keyword">if</span> (!useSpecifiedOutDir &amp;&amp; !args.includes(<span class="hljs-string">'--no-clean'</span>)) {
  rimraf.sync(fromRoot(<span class="hljs-string">'dist'</span>))
} <span class="hljs-keyword">else</span> {
  args = args.filter(a =&gt; a !== <span class="hljs-string">'--no-clean'</span>)
}
<span class="hljs-keyword">if</span> (noTypeDefinitions) {
  args = args.filter(a =&gt; a !== <span class="hljs-string">'--no-ts-defs'</span>)
}
<span class="hljs-comment">// 入口编译流程</span>
<span class="hljs-function">function <span class="hljs-title">go</span><span class="hljs-params">()</span> </span>{
	<span class="hljs-comment">// 使用 spawn.sync 方式，调用 @babel/cli </span>
  let result = spawn.sync(
    resolveBin(<span class="hljs-string">'@babel/cli'</span>, {executable: <span class="hljs-string">'babel'</span>}),
    [
      ...outDir,
      ...copyFiles,
      ...ignore,
      ...extensions,
      ...config,
      <span class="hljs-string">'src'</span>,
    ].concat(args),
    {stdio: <span class="hljs-string">'inherit'</span>},
  )
  <span class="hljs-comment">// 如果 status 不为 0，返回编译状态</span>
  <span class="hljs-keyword">if</span> (result.status !== <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> result.status
  <span class="hljs-keyword">const</span> pathToOutDir = fromRoot(parsedArgs.outDir || builtInOutDir)
	<span class="hljs-comment">// 使用 Typescript，并产出 type 类型</span>
  <span class="hljs-keyword">if</span> (hasTypescript &amp;&amp; !noTypeDefinitions) {
    console.log(<span class="hljs-string">'Generating TypeScript definitions'</span>)
    result = generateTypeDefs(pathToOutDir)
    console.log(<span class="hljs-string">'TypeScript definitions generated'</span>)
    <span class="hljs-keyword">if</span> (result.status !== <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> result.status
  }
  <span class="hljs-comment">// 因为 babel 目前仍然会拷贝一份需要忽略不进行编译的文件，所以我们将这些文件手动进行清理</span>
  <span class="hljs-keyword">const</span> ignoredPatterns = (parsedArgs.ignore || builtInIgnore)
    .split(<span class="hljs-string">','</span>)
    .map(pattern =&gt; path.join(pathToOutDir, pattern))
  <span class="hljs-keyword">const</span> ignoredFiles = ignoredPatterns.reduce(
    (all, pattern) =&gt; [...all, ...glob.sync(pattern)],
    [],
  )
  ignoredFiles.forEach(ignoredFile =&gt; {
    rimraf.sync(ignoredFile)
  })
  <span class="hljs-keyword">return</span> result.status
}
process.exit(go())
</code></pre>
<p data-nodeid="1351">通过上面代码，我们就可以将 lucas-script 的 Babel 方案融会贯通了。</p>
<p data-nodeid="1352">整体设计思路我 fork 了 <a href="https://github.com/kentcdodds/kcd-scripts" data-nodeid="1562">https://github.com/kentcdodds/kcd-scripts</a>，并进行部分优化和改动，你可以在<a href="https://github.com/HOUCe/kcd-scripts" data-nodeid="1566">https://github.com/HOUCe/kcd-scripts</a>中进一步学习。</p>
<h3 data-nodeid="1353">总结</h3>
<p data-nodeid="1354">这一讲我们先介绍了 npm scripts 的重要性，接着分析了 npm scripts 的原理；后半部分，从实践出发，分析了 lucas-scripts 的设计理念，以此进一步巩固 npm scripts 相关知识。</p>
<p data-nodeid="1355">本讲内容总结如下：</p>
<p data-nodeid="1356"><img src="https://s0.lgstatic.com/i/image6/M01/0A/8E/Cgp9HWA3ZvSAGD15AAITBEgOZ_c039.png" alt="npm scripts：打造一体化的构建和部署流程.png" data-nodeid="1573"></p>
<p data-nodeid="1357">说到底，npm scripts 就是一个 Shell，我们以前端开发者所熟悉的 Node.js 来实现 npm scripts，当然这还不够。事实上，npm scripts 的背后是对一整套工程化体系的理解，比如我们需要通过 npm scripts 来抽象 Babel 方案、抽象 Rollup 方案等。相信通过这一讲的学习，你会有所收获。</p>
<p data-nodeid="1358" class="">下一讲，我们将深入工程化体系的一个重点细节——自动化代码检查，并反过来使用 lucas-scripts 再实现一套智能的代码 Lint 脚本，请你继续学习。</p>

---

### 精选评论

##### **嘉：
> 这个没看太懂，是怎么通过这个lucas-scripts 然后就可以运行到项目中的呢，原理是什么，有具体说下吗

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以了解一下命令行的原理

