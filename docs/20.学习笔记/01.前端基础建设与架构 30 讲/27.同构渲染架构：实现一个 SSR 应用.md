<p data-nodeid="27568" class="">从这一讲开始，我们正式进入 Node.js 主题学习。作为 Node.js 技术的重要应用场景，同构渲染 SSR 应用尤其重要。不管是服务端渲染还是服务端渲染衍生出的同构应用，现在来看已经并不新鲜了，实现起来也并不困难。可是有的开发者认为：同构应用不就是调用一个<code data-backticks="1" data-nodeid="27570">renderToString</code>（React 中）类似的 API 吗？</p>


<p data-nodeid="25341">讲道理，确实如此，但同构应用也不只是这么简单。就拿面试来说，同构应用的考察点不是“纸上谈兵”的理论，而是实际实施时的细节。这一讲我们就来一步步实现一个 SSR 应用，并分析 SSR 应用的重点环节。相关内容你可以参考：<a href="https://github.com/HOUCe/ssr" data-nodeid="25454">实现一个简易 ssr</a>。</p>
<h3 data-nodeid="25342">实现一个简易 SSR 应用</h3>
<p data-nodeid="25343">SSR 渲染架构的优势已经非常明显了，不管是对SEO 友好还是性能提升，大部分开发者已经耳熟能详了。这一部分，我们以 React 技术栈为背景，实现一个 SSR 应用。</p>
<p data-nodeid="25344">首先启动项目：</p>
<pre class="lang-java" data-nodeid="25345"><code data-language="java">npm init --yes
</code></pre>
<p data-nodeid="25346">配置 Babel 和Webpack，目的是将ESM 和React编译为 Node.js和浏览器能够理解的代码。相关<code data-backticks="1" data-nodeid="25460">.babelrc</code>内容如下代码：</p>
<pre class="lang-java" data-nodeid="25347"><code data-language="java">{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"@babel/env"</span>, <span class="hljs-string">"@babel/react"</span>]
}
</code></pre>
<p data-nodeid="25348">如上代码，我们直接使用了<code data-backticks="1" data-nodeid="25463">@babel/env</code>和<code data-backticks="1" data-nodeid="25465">@babel/react</code>作为 presets。相关<code data-backticks="1" data-nodeid="25467">webpack.config.js</code>内容如下代码：</p>
<pre class="lang-java" data-nodeid="25349"><code data-language="java"><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry: {
        client: <span class="hljs-string">'./src/client.js'</span>,
        bundle: <span class="hljs-string">'./src/bundle.js'</span>
    },
    output: {
        path: path.resolve(__dirname, <span class="hljs-string">'assets'</span>),
        filename: <span class="hljs-string">"[name].js"</span>
    },
    <span class="hljs-keyword">module</span>: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: <span class="hljs-string">"babel-loader"</span> }
        ]
    }
}
</code></pre>
<p data-nodeid="25350">配置入口文件为<code data-backticks="1" data-nodeid="25470">./src/client.js</code>和<code data-backticks="1" data-nodeid="25472">./src/bundle.js</code>，打包结果如下。</p>
<ul data-nodeid="25351">
<li data-nodeid="25352">
<p data-nodeid="25353"><code data-backticks="1" data-nodeid="25474">assets/bundle.js</code>：CSR 架构下浏览器端脚本。</p>
</li>
<li data-nodeid="25354">
<p data-nodeid="25355"><code data-backticks="1" data-nodeid="25476">assets/client.js</code>：SSR 架构下浏览器端脚本，衔接 SSR 部分。</p>
</li>
</ul>
<p data-nodeid="25356"><code data-backticks="1" data-nodeid="25478">src/</code>文件夹包含所有源码，Babel 将会编译该文件内代码到<code data-backticks="1" data-nodeid="25480">views/</code>目录。这里需要你思考：为什么我们要编译源码呢？</p>
<p data-nodeid="25357">业务源码中，我们使用 ESM 编写 React 和 Redux 代码，<strong data-nodeid="25491">对于低版本 Node.js来说，并不能直接支持 ESM 规范</strong>，因此需要使用 Babel 将<code data-backticks="1" data-nodeid="25487">src/</code>文件夹内代码编译到<code data-backticks="1" data-nodeid="25489">views/</code>目录中。相关命令如下：</p>
<pre class="lang-java" data-nodeid="25358"><code data-language="java"><span class="hljs-string">"babel"</span>: <span class="hljs-string">"babel src -d views"</span>
</code></pre>
<p data-nodeid="25359">我们对项目目录进行说明：</p>
<ul data-nodeid="25360">
<li data-nodeid="25361">
<p data-nodeid="25362"><code data-backticks="1" data-nodeid="25493">src/components</code>中我们存放 React 组件；</p>
</li>
<li data-nodeid="25363">
<p data-nodeid="25364"><code data-backticks="1" data-nodeid="25495">src/redux/</code>中我们存放 Redux 相关代码；</p>
</li>
<li data-nodeid="25365">
<p data-nodeid="25366"><code data-backticks="1" data-nodeid="25497">assets/</code>和<code data-backticks="1" data-nodeid="25499">media/</code>中我们存放样式文件及图片；</p>
</li>
<li data-nodeid="25367">
<p data-nodeid="25368"><code data-backticks="1" data-nodeid="25501">src/server.js</code>和<code data-backticks="1" data-nodeid="25503">src/template.js</code>是 Node.js环境相关脚本。</p>
</li>
</ul>
<p data-nodeid="25369">接下来，我们进入 Node.js相关的<code data-backticks="1" data-nodeid="25506">src/server.js</code>和<code data-backticks="1" data-nodeid="25508">src/template.js</code>脚本的编写。</p>
<p data-nodeid="25370"><code data-backticks="1" data-nodeid="25510">src/server.js</code>如下代码所示：</p>
<pre class="lang-java" data-nodeid="25371"><code data-language="java">import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/app';
module.exports = function render(initialState) {
	// 初始化 redux store
  const store = configureStore(initialState);
  let content = renderToString(&lt;Provider store={store} &gt;&lt;App /&gt;&lt;/Provider&gt;);
  const preloadedState = store.getState();
  return {
    content,
    preloadedState
  };
};
</code></pre>
<p data-nodeid="25372">我们展开具体分析：</p>
<ul data-nodeid="25373">
<li data-nodeid="25374">
<p data-nodeid="25375"><code data-backticks="1" data-nodeid="25513">initialState</code>作为参数传递给<code data-backticks="1" data-nodeid="25515">configureStore()</code>方法，并实例化一个新的Store；</p>
</li>
<li data-nodeid="25376">
<p data-nodeid="25377">调用<code data-backticks="1" data-nodeid="25518">renderToString()</code>方法，得到服务端渲染的 HTML 字符串<code data-backticks="1" data-nodeid="25520">content</code>；</p>
</li>
<li data-nodeid="25378">
<p data-nodeid="25379">调用 Redux<code data-backticks="1" data-nodeid="25523">getState()</code>方法，得到状态为<code data-backticks="1" data-nodeid="25525">preloadedState</code>；</p>
</li>
<li data-nodeid="25380">
<p data-nodeid="25381">返回 HTML 字符串<code data-backticks="1" data-nodeid="25528">content</code>和 preloadedState。</p>
</li>
</ul>
<p data-nodeid="25382"><code data-backticks="1" data-nodeid="25530">src/template.js</code>代码如下：</p>
<pre class="lang-java" data-nodeid="25383"><code data-language="java">export default function template(title, initialState = {}, content = "") {
  let scripts = ''; 
  // 是否有 content 内容
  if (content) {
    scripts = ` &lt;script&gt;
                   window.__STATE__ = ${JSON.stringify(initialState)}
                &lt;/script&gt;
                &lt;script src="assets/client.js"&gt;&lt;/script&gt;
                `
  } else {
    scripts = ` &lt;script src="assets/bundle.js"&gt; &lt;/script&gt; `
  }
  let page = `&lt;!DOCTYPE html&gt;
              &lt;html lang="en"&gt;
              &lt;head&gt;
                &lt;meta charset="utf-8"&gt;
                &lt;title&gt; ${title} &lt;/title&gt;
                &lt;link rel="stylesheet" href="assets/style.css"&gt;
              &lt;/head&gt;
              &lt;body&gt;
                &lt;div class="content"&gt;
                   &lt;div id="app" class="wrap-inner"&gt;
                      ${content}
                   &lt;/div&gt;
                &lt;/div&gt;
                  ${scripts}
              &lt;/body&gt;
              `;
  return page;
}
</code></pre>
<p data-nodeid="25384">我们对上述代码进行解读：<code data-backticks="1" data-nodeid="25533">template</code>函数接受<code data-backticks="1" data-nodeid="25535">title</code>、<code data-backticks="1" data-nodeid="25537">state</code>和<code data-backticks="1" data-nodeid="25539">content</code>作为参数，拼凑成最终的 HTML 文档，并将<code data-backticks="1" data-nodeid="25541">state</code>挂载到<code data-backticks="1" data-nodeid="25543">window.__STATE__</code>中，作为 script 标签内联到 HTML 文档，同时将 SSR 架构下<code data-backticks="1" data-nodeid="25545">assets/client.js</code>脚本或<code data-backticks="1" data-nodeid="25547">assets/bundle.js</code>嵌入。</p>
<p data-nodeid="25385">下面，我们再聚焦同构部分的浏览器端脚本。</p>
<p data-nodeid="25386">在CSR 架构下，<code data-backticks="1" data-nodeid="25551">src/bundle.js</code>代码如下：</p>
<pre class="lang-java" data-nodeid="25387"><code data-language="java">import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/app';
// 获取 store
const store = configureStore();
render(
  &lt;Provider store={store} &gt; &lt;App /&gt; &lt;/Provider&gt;,
  document.querySelector('#app')
);
</code></pre>
<p data-nodeid="25388">而 SSR 架构下，<code data-backticks="1" data-nodeid="25554">src/client.js</code>代码类似：</p>
<pre class="lang-java" data-nodeid="25389"><code data-language="java">import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/app';
const state = window.__STATE__;
delete window.__STATE__;
const store = configureStore(state);
hydrate(
  &lt;Provider store={store} &gt; &lt;App /&gt; &lt;/Provider&gt;,
  document.querySelector('#app')
);
</code></pre>
<p data-nodeid="25390"><code data-backticks="1" data-nodeid="25556">src/client.js</code>对比<code data-backticks="1" data-nodeid="25558">src/bundle.js</code>，比较关键的不同点在于<strong data-nodeid="25573">使用了</strong><code data-backticks="1" data-nodeid="25563">window.__STATE__.</code><strong data-nodeid="25574">获取初始状态，同时使用了</strong><code data-backticks="1" data-nodeid="25567">hydrate()</code><strong data-nodeid="25575">方法代替了</strong><code data-backticks="1" data-nodeid="25571">render()</code>。</p>
<p data-nodeid="25391">至此，我们就实现了一个简易的 SSR 应用。虽然简单，但完全体现了 SSR 架构的原理。然而生产情况复杂多变，我们继续往下看。</p>
<h3 data-nodeid="25392">同构应用中你容易忽略的细节</h3>
<p data-nodeid="25393">接下来，我们对几个更细节的问题加以分析。这些问题的处理，不再是代码层面的解决方案，更是工程化方向的设计。</p>
<h4 data-nodeid="25394">环境区分</h4>
<p data-nodeid="25395">我们知道，同构应用实现了客户端代码和服务端代码的基本统一，我们只需要编写一种组件，就能生成适用于服务端和客户端的组件案例。可是你是否知道，大多数情况下服务端代码和客户端代码需要单独处理？下面我简单举几个例子。</p>
<ul data-nodeid="25396">
<li data-nodeid="25397">
<p data-nodeid="25398"><strong data-nodeid="25584">路由代码差别</strong></p>
</li>
</ul>
<p data-nodeid="25399">服务端需要根据请求路径，匹配页面组件；客户端需要通过浏览器中的地址，匹配页面组件。</p>
<p data-nodeid="25400">客户端代码：</p>
<pre class="lang-java" data-nodeid="25401"><code data-language="java">  const App = () =&gt; {
    return (
      &lt;Provider store={store}&gt;
        &lt;BrowserRouter&gt;
          &lt;div&gt;
            &lt;Route path='/' component={Home}&gt;
            &lt;Route path='/product' component={Product}&gt;
          &lt;/div&gt;
        &lt;/BrowserRouter&gt;
      &lt;/Provider&gt;
    )
  }
  ReactDom.render(&lt;App/&gt;, document.querySelector('#root'))
</code></pre>
<p data-nodeid="25402">BrowserRouter 组件根据 window.location 以及 history API 实现页面切换，而服务端肯定是无法获取 window.location 的。</p>
<p data-nodeid="25403">服务端代码如下：</p>
<pre class="lang-java" data-nodeid="25404"><code data-language="java">  const App = () =&gt; {
    return 
      &lt;Provider store={store}&gt;
        &lt;StaticRouter location={req.path} context={context}&gt;
          &lt;div&gt;
            &lt;Route path='/' component={Home}&gt;
          &lt;/div&gt;
        &lt;/StaticRouter&gt;
      &lt;/Provider&gt;
  }
  Return ReactDom.renderToString(&lt;App/&gt;)
</code></pre>
<p data-nodeid="25405">在服务端，需要<strong data-nodeid="25594">使用 StaticRouter 组件</strong>，并将请求地址和上下文信息作为 location 和 context 这两个props 传入 StaticRouter 中。</p>
<ul data-nodeid="25406">
<li data-nodeid="25407">
<p data-nodeid="25408"><strong data-nodeid="25598">打包差别</strong></p>
</li>
</ul>
<p data-nodeid="28847" class="">服务端运行的代码如果需要依赖 Node 核心模块或者第三方模块，就不再需要把这些模块代码打包到最终代码中了。因为环境已经安装这些依赖，可以直接引用。这样一来，就需要我们<strong data-nodeid="28853">在 Webpack 中配置 target：node</strong>，并借助 webpack-node-externals 插件，解决第三方依赖打包的问题。</p>


<h4 data-nodeid="25410">注水和脱水</h4>
<p data-nodeid="25411">什么叫作注水和脱水呢？这个和同构应用中数据的获取有关：在服务器端渲染时，首先服务端请求接口拿到数据，并处理准备好数据状态（如果使用 Redux，就是进行Store 的更新），为了减少客户端的请求，我们需要保留住这个状态。</p>
<p data-nodeid="25412">一般做法是在服务器端返回 HTML 字符串的时候，将数据 JSON.stringify 一并返回，这个过程，叫作脱水（dehydrate）；在客户端，就不再需要进行数据的请求了，可以直接使用服务端下发下来的数据，这个过程叫注水（hydrate）。</p>
<p data-nodeid="25413">响应代码前面已经有所体现了，但是在服务端渲染时，服务端如何能够请求所有的 APIs，保障数据全部已经请求呢？</p>
<p data-nodeid="25414">一般有两种方法进行服务端请求。</p>
<ul data-nodeid="25415">
<li data-nodeid="25416">
<p data-nodeid="25417">react-router 的解决方案是配置路由route-config，结合 matchRoutes，找到页面上相关组件所需的请求接口的方法并执行请求。这就要求开发者通过路由配置信息，显式地告知服务端请求内容。如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="25418"><code data-language="java">  const routes = [
    {
      path: "/",
      component: Root,
      loadData: () =&gt; getSomeData()
    }
    // etc.
  ]
  
  import { routes } from "./routes"
  
  function App() {
    return (
      &lt;Switch&gt;
        {routes.map(route =&gt; (
          &lt;Route {...route} /&gt;
        ))}
      &lt;/Switch&gt;
    )
  }
</code></pre>
<p data-nodeid="25419">在服务端代码中：</p>
<pre class="lang-java" data-nodeid="25420"><code data-language="java">  <span class="hljs-keyword">import</span> { matchPath } from <span class="hljs-string">"react-router-dom"</span>
  
  <span class="hljs-keyword">const</span> promises = []
  routes.some(route =&gt; {
    <span class="hljs-keyword">const</span> match = matchPath(req.path, route)
    <span class="hljs-keyword">if</span> (match) promises.push(route.loadData(match))
    <span class="hljs-keyword">return</span> match
  })
  
  Promise.all(promises).then(data =&gt; {
    putTheDataSomewhereTheClientCanFindIt(data)
  })
</code></pre>
<ul data-nodeid="25421">
<li data-nodeid="25422">
<p data-nodeid="25423">另外一种思路类似 Next.js，我们需要在 React 组件上<strong data-nodeid="25617">定义静态方法</strong>。比如定义静态 loadData 方法，在服务端渲染时，我们可以遍历所有组件的 loadData，获取需要请求的接口。</p>
</li>
</ul>
<h4 data-nodeid="25424">安全问题</h4>
<p data-nodeid="25425">安全问题非常关键，尤其是涉及服务端渲染，开发者要格外小心。这里提出一个点：我们前面提到了注水和脱水过程，其中的代码：</p>
<pre class="lang-java" data-nodeid="25426"><code data-language="java">ctx.body = `
  &lt;!DOCTYPE html&gt;
  &lt;html lang="en"&gt;
    &lt;head&gt;
      &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;script&gt;
        window.context = {
          initialState: ${JSON.stringify(store.getState())}
        }
      &lt;/script&gt;
      &lt;div id="app"&gt;
          // ...
      &lt;/div&gt;
    &lt;/body&gt;
  &lt;/html&gt;
`
</code></pre>
<p data-nodeid="25427">非常容易遭受 XSS 攻击，JSON.stringify 可能会造成 script 注入。因此，我们需要<strong data-nodeid="25625">严格清洗 JSON 字符串中的 HTML 标签和其他危险的字符</strong>。我习惯使用 serialize-javascript 库进行处理，这也是同构应用中最容易被忽视的细节。</p>
<p data-nodeid="25428">这里给大家留一个思考题，React<code data-backticks="1" data-nodeid="25627">dangerouslySetInnerHTML</code>API 也有类似风险，React 是怎么处理这个安全隐患的呢？</p>
<h4 data-nodeid="25429">请求认证处理</h4>
<p data-nodeid="25430">上面讲到服务端预先请求数据，那么请你思考这样一个场景：某个请求依赖 cookie 表明的用户信息，比如请求“我的学习计划列表”。这种情况下服务端请求是不同于客户端的，不会有浏览器添加 cookie 以及不含有其他相关的 header 信息。这个请求在服务端发送时，一定不会拿到预期的结果。</p>
<p data-nodeid="25431">解决办法也很简单：服务端请求时需要保留客户端页面请求的信息（一般是 cookie），并在 API 请求时携带并透传这个信息（cookie）。</p>
<h4 data-nodeid="25432">样式问题处理</h4>
<p data-nodeid="25433">同构应用的样式处理容易被开发者忽视，而一旦忽略，就会掉到坑里。比如，我们不能再使用 style-loader 了，因为这个WebpackLoader 会在编译时将样式模块载入到 HTML header 中。但是在服务端渲染环境下，没有Window 对象，style-loader就会报错。一般我们使用 isomorphic-style-loader 来实现：</p>
<pre class="lang-java" data-nodeid="25434"><code data-language="java">{
    test: /\.css$/,
    use: [
        <span class="hljs-string">'isomorphic-style-loader'</span>,
        <span class="hljs-string">'css-loader'</span>,
        <span class="hljs-string">'postcss-loader'</span>
    ],
}
</code></pre>
<p data-nodeid="25435">isomorphic-style-loader 的原理是什么呢？</p>
<p data-nodeid="25436">我们知道，对于Webpack 来说，所有的资源都是模块。WebpackLoader 在编译过程中可以将导入的 CSS 文件转换成对象，拿到样式信息。因此<strong data-nodeid="25640">isomorphic-style-loader 可以获取页面中所有组件样式</strong>。为了实现得更加通用化，isomorphic-style-loader 利用 context API，在渲染页面组件时获取所有 React 组件的样式信息，最终插入 HTML 字符串中。</p>
<p data-nodeid="25437">在服务端渲染时，我们需要加入这样的逻辑：</p>
<pre class="lang-java" data-nodeid="25438"><code data-language="java">import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import App from './App.js'
const server = express()
const port = process.env.PORT || 3000
server.get('*', (req, res, next) =&gt; {
  //  css Set 类型来存储页面所有的样式
  const css = new Set()
  const insertCss = (...styles) =&gt; styles.forEach(style =&gt; css.add(style._getCss()))
  const body = ReactDOM.renderToString(
    &lt;StyleContext.Provider value={{ insertCss }}&gt;
      &lt;App /&gt;
    &lt;/StyleContext.Provider&gt;
  )
  
  const html = `&lt;!doctype html&gt;
    &lt;html&gt;
      &lt;head&gt;
        &lt;script src="client.js" defer&gt;&lt;/script&gt;
        // 将样式内连进 html 当中
        &lt;style&gt;${[...css].join('')}&lt;/style&gt;
      &lt;/head&gt;
      &lt;body&gt;
        &lt;div id="root"&gt;${body}&lt;/div&gt;
      &lt;/body&gt;
    &lt;/html&gt;`
  res.status(200).send(html)
})
server.listen(port, () =&gt; {
  console.log(`Node.js app is running at http://localhost:${port}/`)
})
</code></pre>
<p data-nodeid="25439">分析上面代码，我们定义了 css Set 类型来存储页面所有的样式，并定义了 insertCss 方法。该方法通过 context 传给每个 React 组件，这样每个组件就可以调用 insertCss 方法。该方法调用时，会将组件样式加入 css Set 当中。</p>
<p data-nodeid="25440">最后我们用<code data-backticks="1" data-nodeid="25644">[...css].join('')</code>就可以获取页面的所有样式字符串。</p>
<p data-nodeid="25441">强调一下，<a href="https://github.com/kriasoft/isomorphic-style-loader" data-nodeid="25649">isomorphic-style-loader 的源码</a>目前已经更新，采用了最新的 ReactHooks API，我推荐给 React 开发者阅读，相信你一定收获很多！</p>
<h3 data-nodeid="25442">总结</h3>
<p data-nodeid="25443">本小节前半部分我们“手把手”教你实现服务端渲染的同构应用，因为这些知识并不困难，社区上资料也很多。后半部分我们从更高的角度出发，剖析同构应用中那些关键的细节点和疑难问题的解决方案，这些经验源于真刀真枪的线上案例，即使你没有开发过同构应用，也能从中全方位地了解关键信息，一旦掌握了这些细节，同构应用的实现就会更稳、更可靠。</p>
<p data-nodeid="25444">本讲内容总结如下：</p>
<p data-nodeid="29488" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image6/M00/16/ED/CioPOWBHGf-ANBuWAAJkpsrE7fA808.png" alt="同构渲染架构： 实现一个 SSR 应用.png" data-nodeid="29491"></p>

<p data-nodeid="25446">同构应用其实远比理论复杂，绝对不是几个 APIs 和几台服务器就能完成的，希望大家多思考、多动手，一定会更有体会。下一讲，我们进入 CI/CD 流程，设计一个性能守卫系统，以此帮助你了解：Node.js 除了同构直出、数据聚合以外，还能做一些重要的，且有趣的服务。</p>

---

### 精选评论


