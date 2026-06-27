import{_ as n,o as a,c as p,a2 as e}from"./chunks/framework.m9rfQn3T.js";const h=JSON.parse('{"title":"webpack的异步加载原理及分包策略","description":"","frontmatter":{"title":"webpack的异步加载原理及分包策略","date":"2021-06-09T10:04:09.000Z","permalink":"/pages/7d108c4fd51b4/","categories":["面试题","前端优化"],"tags":[null]},"headers":[],"relativePath":"10.面试题/43.前端优化/03.webpack的异步加载原理及分包策略.md","filePath":"10.面试题/43.前端优化/03.webpack的异步加载原理及分包策略.md","lastUpdated":1782538095000}'),l={name:"10.面试题/43.前端优化/03.webpack的异步加载原理及分包策略.md"};function i(t,s,c,o,d,r){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h2 id="webpack-异步加载原理" tabindex="-1">webpack 异步加载原理 <a class="header-anchor" href="#webpack-异步加载原理" aria-label="Permalink to &quot;webpack 异步加载原理&quot;">​</a></h2><p><code>webpack ensure</code> 有人称它为异步加载，也有人称为代码切割，他其实就是将 js 模块给独立导出一个.js 文件，然后使用这个模块的时候，再创建一个 <code>script</code> 对象，加入到 <code>document.head</code> 对象中，浏览器会自动帮我们发起请求，去请求这个 js 文件，然后写个回调函数，让请求到的 js 文件做一些业务操作。</p><h3 id="举个例子" tabindex="-1">举个例子 <a class="header-anchor" href="#举个例子" aria-label="Permalink to &quot;举个例子&quot;">​</a></h3><p>需求：<code>main.js</code> 依赖两个 js 文件：<code>A.js</code> 是点击 aBtn 按钮后，才执行的逻辑，<code>B.js</code> 是点击 bBtn 按钮后，才执行的逻辑。</p><p><code>webpack.config.js</code>，我们先来写一下 <code>webpack</code> 打包的配置的代码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const path = require(&#39;path&#39;) // 路径处理模块</span></span>
<span class="line"><span>const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;)</span></span>
<span class="line"><span>const { CleanWebpackPlugin } = require(&#39;clean-webpack-plugin&#39;) // 引入CleanWebpackPlugin插件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  entry: {</span></span>
<span class="line"><span>    index: path.join(__dirname, &#39;/src/main.js&#39;),</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  output: {</span></span>
<span class="line"><span>    path: path.join(__dirname, &#39;/dist&#39;),</span></span>
<span class="line"><span>    filename: &#39;index.js&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  plugins: [</span></span>
<span class="line"><span>    new HtmlWebpackPlugin({</span></span>
<span class="line"><span>      template: path.join(__dirname, &#39;/index.html&#39;),</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>    new CleanWebpackPlugin(), // 所要清理的文件夹名称</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>index.html</code> 代码如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>  &lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span>    &lt;title&gt;webpack&lt;/title&gt;</span></span>
<span class="line"><span>  &lt;/head&gt;</span></span>
<span class="line"><span>  &lt;body&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span>      &lt;button id=&quot;aBtn&quot;&gt;按钮A&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;button id=&quot;bBtn&quot;&gt;按钮B&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>入口文件 <code>main.js</code> 如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import A from &#39;./A&#39;</span></span>
<span class="line"><span>import B from &#39;./B&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>document.getElementById(&#39;aBtn&#39;).onclick = function () {</span></span>
<span class="line"><span>  alert(A)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>document.getElementById(&#39;bBtn&#39;).onclick = function () {</span></span>
<span class="line"><span>  alert(B)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>A.js</code> 和 <code>B.js</code> 的代码分别如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// A.js</span></span>
<span class="line"><span>const A = &#39;hello A&#39;</span></span>
<span class="line"><span>module.exports = A</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// B.js</span></span>
<span class="line"><span>const B = &#39;hello B&#39;</span></span>
<span class="line"><span>module.exports = B</span></span></code></pre></div><p>此时，我们对项目进行 <code>npm run build</code>， 打包出来的只有两个文件</p><ul><li>index.html</li><li>index.js</li></ul><p>由此可见，此时 <code>webpack</code> 把 <code>main.js</code> 依赖的两个文件都同时打包到同一个 js 文件，并在 index.html 中引入。但是 <code>A.js</code> 和 <code>B.js</code> 都是点击相应按钮才会执行的逻辑，如果用户并没有点击相应按钮，而且这两个文件又是比较大的话，这样是不是就导致首页默认加载的 js 文件太大，从而导致首页渲染较慢呢？那么有能否实现当用户点击按钮的时候再加载相应的依赖文件呢？</p><p><code>webpack.ensure</code> 就解决了这个问题。</p><h3 id="require-ensure-异步加载" tabindex="-1">require.ensure 异步加载 <a class="header-anchor" href="#require-ensure-异步加载" aria-label="Permalink to &quot;require.ensure 异步加载&quot;">​</a></h3><p>下面我们将 <code>main.js</code> 改成异步加载的方式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>document.getElementById(&#39;aBtn&#39;).onclick = function () {</span></span>
<span class="line"><span>  //异步加载A</span></span>
<span class="line"><span>  require.ensure([], function () {</span></span>
<span class="line"><span>    let A = require(&#39;./A.js&#39;)</span></span>
<span class="line"><span>    alert(A)</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>document.getElementById(&#39;bBtn&#39;).onclick = function () {</span></span>
<span class="line"><span>  //异步加载b</span></span>
<span class="line"><span>  require.ensure([], function () {</span></span>
<span class="line"><span>    let B = require(&#39;./B.js&#39;)</span></span>
<span class="line"><span>    alert(B)</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>此时，我们再进行一下打包，发现多了 <code>1.index.js</code> 和 <code>2.index.js</code> 两个文件。而我们打开页面时只引入了 <code>index.js</code> 一个文件，当点击按钮 A 的时候才引入 <code>1.index.js</code> 文件，点击按钮 B 的时候才引入 <code>2.index.js</code> 文件。这样就满足了我们按需加载的需求。</p><p><code>require.ensure</code> 这个函数是一个代码分离的分割线，表示回调里面的 <code>require</code> 是我们想要进行分割出去的，即 <code>require(&#39;./A.js&#39;)</code>，把 A.js 分割出去，形成一个 <code>webpack</code> 打包的单独 js 文件。它的语法如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>require.ensure(dependencies: String[], callback: function(require), chunkName: String)</span></span></code></pre></div><p>我们打开 <code>1.index.js</code> 文件，发现它的代码如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>;(window.webpackJsonp = window.webpackJsonp || []).push([</span></span>
<span class="line"><span>  [1],</span></span>
<span class="line"><span>  [</span></span>
<span class="line"><span>    ,</span></span>
<span class="line"><span>    function (o, n) {</span></span>
<span class="line"><span>      o.exports = &#39;hello A&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>])</span></span></code></pre></div><p>由上面的代码可以看出：</p><ol><li>异步加载的代码，会保存在一个全局的 <code>webpackJsonp</code> 中。</li><li><code>webpackJsonp.push</code> 的的值，两个参数分别为异步加载的文件中存放的需要安装的模块对应的 id 和异步加载的文件中存放的需要安装的模块列表。</li><li>在满足某种情况下，会执行具体模块中的代码。</li></ol><h3 id="import-按需加载" tabindex="-1">import() 按需加载 <a class="header-anchor" href="#import-按需加载" aria-label="Permalink to &quot;import() 按需加载&quot;">​</a></h3><p>webpack4 官方文档提供了模块按需切割加载，配合 es6 的按需加载 <code>import()</code> 方法，可以做到减少首页包体积，加快首页的请求速度，只有其他模块，只有当需要的时候才会加载对应 js。</p><p><code>import()</code>的语法十分简单。该函数只接受一个参数，就是引用包的地址，并且使用了 <code>promise</code> 式的回调，获取加载的包。在代码中所有被 <code>import()</code>的模块，都将打成一个单独的包，放在 <code>chunk</code> 存储的目录下。在浏览器运行到这一行代码时，就会自动请求这个资源，实现异步加载。</p><p>下面我们将上述代码改成 <code>import()</code>方式。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>document.getElementById(&#39;aBtn&#39;).onclick = function () {</span></span>
<span class="line"><span>  //异步加载A</span></span>
<span class="line"><span>  import(&#39;./A&#39;).then((data) =&gt; {</span></span>
<span class="line"><span>    alert(data.A)</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>document.getElementById(&#39;bBtn&#39;).onclick = function () {</span></span>
<span class="line"><span>  //异步加载b</span></span>
<span class="line"><span>  import(&#39;./B&#39;).then((data) =&gt; {</span></span>
<span class="line"><span>    alert(data.B)</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>此时打包出来的文件和 <code>webpack.ensure</code> 方法是一样的。</p><h2 id="路由懒加载" tabindex="-1">路由懒加载 <a class="header-anchor" href="#路由懒加载" aria-label="Permalink to &quot;路由懒加载&quot;">​</a></h2><p>为什么需要懒加载？</p><p>像 vue 这种单页面应用，如果没有路由懒加载，运用 webpack 打包后的文件将会很大，造成进入首页时，需要加载的内容过多，出现较长时间的白屏，运用路由懒加载则可以将页面进行划分，需要的时候才加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。</p><p>vue 路由懒加载有以下三种方式</p><ul><li>vue 异步组件</li><li>ES6 的 <code>import()</code></li><li>webpack 的 <code>require.ensure()</code></li></ul><h3 id="vue-异步组件" tabindex="-1">vue 异步组件 <a class="header-anchor" href="#vue-异步组件" aria-label="Permalink to &quot;vue 异步组件&quot;">​</a></h3><p>这种方法主要是使用了 <code>resolve</code> 的异步机制，用 <code>require</code> 代替了 <code>import</code> 实现按需加载</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default new Router({</span></span>
<span class="line"><span>  routes: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      path: &#39;/home&#39;,&#39;,</span></span>
<span class="line"><span>      component: (resolve) =&gt; require([&#39;@/components/home&#39;], resolve),</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      path: &#39;/about&#39;,&#39;,</span></span>
<span class="line"><span>      component: (resolve) =&gt; require([&#39;@/components/about&#39;], resolve),</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>})</span></span></code></pre></div><h3 id="require-ensure" tabindex="-1">require.ensure <a class="header-anchor" href="#require-ensure" aria-label="Permalink to &quot;require.ensure&quot;">​</a></h3><p>这种模式可以通过参数中的 <code>webpackChunkName</code> 将 js 分开打包。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default new Router({</span></span>
<span class="line"><span>  routes: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      path: &#39;/home&#39;,</span></span>
<span class="line"><span>      component: (resolve) =&gt; require.ensure([], () =&gt; resolve(require(&#39;@/components/home&#39;)), &#39;home&#39;),</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      path: &#39;/about&#39;,</span></span>
<span class="line"><span>      component: (resolve) =&gt; require.ensure([], () =&gt; resolve(require(&#39;@/components/about&#39;)), &#39;about&#39;),</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>})</span></span></code></pre></div><h3 id="es6-的-import" tabindex="-1">ES6 的 import() <a class="header-anchor" href="#es6-的-import" aria-label="Permalink to &quot;ES6 的 import()&quot;">​</a></h3><p><code>vue-router</code> 在官网提供了一种方法，可以理解也是为通过 <code>Promise</code> 的 <code>resolve</code> 机制。因为 <code>Promise</code> 函数返回的 <code>Promise</code> 为 <code>resolve</code> 组件本身，而我们又可以使用 <code>import</code> 来导入组件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default new Router({</span></span>
<span class="line"><span>  routes: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      path: &#39;/home&#39;,</span></span>
<span class="line"><span>      component: () =&gt; import(&#39;@/components/home&#39;),</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      path: &#39;/about&#39;,</span></span>
<span class="line"><span>      component: () =&gt; import(&#39;@/components/home&#39;),</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>})</span></span></code></pre></div><h2 id="webpack-分包策略" tabindex="-1">webpack 分包策略 <a class="header-anchor" href="#webpack-分包策略" aria-label="Permalink to &quot;webpack 分包策略&quot;">​</a></h2><p>在 webpack 打包过程中，经常出现 <code>vendor.js</code>， <code>app.js</code> 单个文件较大的情况，这偏偏又是网页最先加载的文件，这就会使得加载时间过长，从而使得白屏时间过长，影响用户体验。所以我们需要有合理的分包策略。</p><h3 id="commonschunkplugin" tabindex="-1">CommonsChunkPlugin <a class="header-anchor" href="#commonschunkplugin" aria-label="Permalink to &quot;CommonsChunkPlugin&quot;">​</a></h3><p>在 Webapck4.x 版本之前，我们都是使用 <code>CommonsChunkPlugin</code> 去做分离</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>plugins: [</span></span>
<span class="line"><span>  new webpack.optimize.CommonsChunkPlugin({</span></span>
<span class="line"><span>    name: &#39;vendor&#39;,</span></span>
<span class="line"><span>    minChunks: function (module, count) {</span></span>
<span class="line"><span>      return (</span></span>
<span class="line"><span>        module.resource &amp;&amp;</span></span>
<span class="line"><span>        /\\.js$/.test(module.resource) &amp;&amp;</span></span>
<span class="line"><span>        module.resource.indexOf(path.join(__dirname, &#39;./node_modules&#39;)) === 0</span></span>
<span class="line"><span>      )</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  }),</span></span>
<span class="line"><span>  new webpack.optimize.CommonsChunkPlugin({</span></span>
<span class="line"><span>    name: &#39;common&#39;,</span></span>
<span class="line"><span>    chunks: &#39;initial&#39;,</span></span>
<span class="line"><span>    minChunks: 2,</span></span>
<span class="line"><span>  }),</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>我们把以下文件单独抽离出来打包</p><ul><li><code>node_modules</code> 文件夹下的，模块</li><li>被 3 个 入口 <code>chunk</code> 共享的模块</li></ul><h3 id="optimization-splitchunks" tabindex="-1">optimization.splitChunks <a class="header-anchor" href="#optimization-splitchunks" aria-label="Permalink to &quot;optimization.splitChunks&quot;">​</a></h3><p>webpack 4 最大的改动就是废除了 <code>CommonsChunkPlugin</code> 引入了 <code>optimization.splitChunks</code>。如果你的 <code>mode</code> 是 <code>production</code>，那么 webpack4 就会自动开启 <code>Code Splitting</code>。</p><p>它内置的代码分割策略是这样的：</p><ul><li>新的 chunk 是否被共享或者是来自 <code>node_modules</code> 的模块</li><li>新的 chunk 体积在压缩之前是否大于 30kb</li><li>按需加载 chunk 的并发请求数量小于等于 5 个</li><li>页面初始加载时的并发请求数量小于等于 3 个</li></ul><p>虽然在 webpack4 会自动开启 <code>Code Splitting</code>，但是随着项目工程的最大，这往往不能满足我们的需求，我们需要再进行个性化的优化。</p><h3 id="应用实例" tabindex="-1">应用实例 <a class="header-anchor" href="#应用实例" aria-label="Permalink to &quot;应用实例&quot;">​</a></h3><p>我们先找到一个优化空间较大的项目来进行操作。这是一个后台管理系统项目，大部分内容由 3-4 个前端开发，平时开发周期较短，且大部分人没有优化意识，只是写好业务代码完成需求，日子一长，造成打包出来的文件较大，大大影响性能。</p><p>我们先用 <code>webpack-bundle-analyzer</code> 分析打包后的模块依赖及文件大小，确定优化的方向在哪。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc64cbf79557428496a368685ff42de9~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>然后我们再看下打包出来的 js 文件</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82059f53060248ecabaa870e0d9c70c1~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>看到这两张图的时候，我内心是崩溃的，槽点如下</p><ul><li>打包后生成多个将近 1M 的 js 文件，其中不乏 <code>vendor.js</code> 首页必须加载的大文件</li><li><code>xlsx.js</code> 这样的插件没必要使用，导出 excel 更好的方法应该是后端返回文件流格式给前端处理</li><li><code>echart</code> 和 <code>iview</code> 文件太大，应该使用 cdn 引入的方法</li></ul><p>吐槽完之后我们就要开始做正事了。正是因为有这么多槽点，我们才更好用来验证我们优化方法的可行性。</p><h4 id="抽离-echart-和-iview" tabindex="-1">抽离 echart 和 iview <a class="header-anchor" href="#抽离-echart-和-iview" aria-label="Permalink to &quot;抽离 echart 和 iview&quot;">​</a></h4><p>由上面分析可知，<code>echart</code> 和 <code>iview</code> 文件太大，此时我们就用到 webpack4 的 <code>optimization.splitChunks</code> 进行代码分割了，把他们单独抽离打包成文件。(为了更好地呈现优化效果，我们先把 xlsx.js 去掉)</p><p><code>vue.config.js</code> 修改如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>chainWebpack: config =&gt; {</span></span>
<span class="line"><span>    config.optimization.splitChunks({</span></span>
<span class="line"><span>      chunks: &#39;all&#39;,</span></span>
<span class="line"><span>      cacheGroups: {</span></span>
<span class="line"><span>        vendors: {</span></span>
<span class="line"><span>          name: &#39;chunk-vendors&#39;,</span></span>
<span class="line"><span>          test: /[\\\\/]node_modules[\\\\/]/,</span></span>
<span class="line"><span>          priority: 10,</span></span>
<span class="line"><span>          chunks: &#39;initial&#39;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        iview: {</span></span>
<span class="line"><span>          name: &#39;chunk-iview&#39;,</span></span>
<span class="line"><span>          priority: 20,</span></span>
<span class="line"><span>          test: /[\\\\/]node_modules[\\\\/]_?iview(.*)/</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        echarts: {</span></span>
<span class="line"><span>          name: &#39;chunk-echarts&#39;,</span></span>
<span class="line"><span>          priority: 20,</span></span>
<span class="line"><span>          test: /[\\\\/]node_modules[\\\\/]_?echarts(.*)/</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        commons: {</span></span>
<span class="line"><span>          name: &#39;chunk-commons&#39;,</span></span>
<span class="line"><span>          minChunks: 2,</span></span>
<span class="line"><span>          priority: 5,</span></span>
<span class="line"><span>          chunks: &#39;initial&#39;,</span></span>
<span class="line"><span>          reuseExistingChunk: true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  },</span></span></code></pre></div><p>此时我们再用 <code>webpack-bundle-analyzer</code> 分析一下</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/155bab2a58c74f0db92d04385e62f21d~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>打包出来的 js 文件</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef0679845a51459e983f24a4a6ee83e2~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>从这里可以看出我们已经成功把 <code>echart</code> 和 <code>iview</code> 单独抽离出来了，同时 <code>vendor.js</code> 也相应地减小了体积。此外，我们还可以继续抽离其他更多的第三方模块。</p><h4 id="cdn-方式" tabindex="-1">CDN 方式 <a class="header-anchor" href="#cdn-方式" aria-label="Permalink to &quot;CDN 方式&quot;">​</a></h4><p>虽然第三方模块是单独抽离出来了，但是在首页或者相应路由加载时还是要加载这样一个几百 kb 的文件，还是不利于性能优化的。这时，我们可以用 CDN 的方式引入这样插件或者 UI 组件库。</p><ol><li>在 <code>index.html</code> 引入相应 cdn 链接</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>  &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.bootcdn.net/ajax/libs/iview/3.5.4/styles/iview.css&quot; /&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>  &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>  &lt;script src=&quot;https://cdn.bootcss.com/vue/2.6.8/vue.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>  &lt;script src=&quot;https://cdn.bootcdn.net/ajax/libs/iview/3.5.4/iview.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>  &lt;script src=&quot;https://cdn.bootcdn.net/ajax/libs/xlsx/0.16.8/xlsx.mini.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>  &lt;script src=&quot;https://cdn.bootcdn.net/ajax/libs/xlsx/0.16.8/cpexcel.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span></code></pre></div><ol start="2"><li><code>vue.config.js</code> 配置 <code>externals</code></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>configureWebpack: (config) =&gt; {</span></span>
<span class="line"><span>  config.externals = {</span></span>
<span class="line"><span>    vue: &#39;Vue&#39;,</span></span>
<span class="line"><span>    xlsx: &#39;XLSX&#39;,</span></span>
<span class="line"><span>    iview: &#39;iView&#39;,</span></span>
<span class="line"><span>    iView: &#39;ViewUI&#39;,</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="3"><li>删除之前的引入方式并卸载相应 npm 依赖包</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm uninstall vue iview echarts xlsx --save</span></span></code></pre></div><p>此时我们在来看一下打包后的情况</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8553fb4e38745148177d780d77b90e4~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>打包出来的 js 文件</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4bb3f312dd04ff6addf74455607be15~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>well done ! 这时基本没有打包出大文件了，首页加载需要的 <code>vendor.js</code> 也只有几十 kb，而且我们还可以进一步优化，就是把 vue 全家桶的一些模块再通过 cdn 的方法引入，比如 <code>vue-router</code>，<code>vuex</code>，<code>axios</code> 等。这时页面特别是首页加载的性能就得到大大地优化了。</p><h2 id="推荐文章" tabindex="-1">推荐文章 <a class="header-anchor" href="#推荐文章" aria-label="Permalink to &quot;推荐文章&quot;">​</a></h2><p><a href="https://juejin.im/post/6866964944634511368" target="_blank" rel="noreferrer">谈谈数据状态管理和实现一个简易版 vuex</a></p><p><a href="https://juejin.im/post/6844904193589772301" target="_blank" rel="noreferrer">总结 18 个 webpack 插件，总会有你想要的！</a></p><p><a href="https://juejin.im/post/6844904152389124103#heading-19" target="_blank" rel="noreferrer">搭建一个 vue-cli4+webpack 移动端框架（开箱即用）</a></p><p><a href="https://juejin.im/post/6844904168868544525" target="_blank" rel="noreferrer">从零构建到优化一个类似 vue-cli 的脚手架</a></p><p><a href="https://juejin.im/post/6844903991655022600" target="_blank" rel="noreferrer">封装一个 toast 和 dialog 组件并发布到 npm</a></p><p><a href="https://juejin.im/post/6844904005286494215" target="_blank" rel="noreferrer">从零开始构建一个 webpack 项目</a></p><p><a href="https://juejin.im/post/6844904004825120782" target="_blank" rel="noreferrer">总结几个 webpack 打包优化的方法</a></p><p><a href="https://juejin.im/post/6844904094692278286" target="_blank" rel="noreferrer">总结 vue 知识体系之高级应用篇</a></p><p><a href="https://juejin.im/post/6844904080960126989" target="_blank" rel="noreferrer">总结 vue 知识体系之实用技巧</a></p><p><a href="https://juejin.im/post/6844904079164964871" target="_blank" rel="noreferrer">总结 vue 知识体系之基础入门篇</a></p><p><a href="https://juejin.im/post/6844904066301050893" target="_blank" rel="noreferrer">总结移动端 H5 开发常用技巧（干货满满哦！）</a></p><p>本文转自 <a href="https://juejin.cn/post/6895546761255845901" target="_blank" rel="noreferrer">https://juejin.cn/post/6895546761255845901</a>，如有侵权，请联系删除。</p>`,102)])])}const m=n(l,[["render",i]]);export{h as __pageData,m as default};
