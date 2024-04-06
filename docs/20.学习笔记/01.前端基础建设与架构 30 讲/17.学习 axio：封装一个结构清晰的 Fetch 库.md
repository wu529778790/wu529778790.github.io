<p data-nodeid="6450" class="">从这一讲开始，我们将进入核心框架原理与代码设计模式的学习。任何一个动态应用的实现，都离不开前后端的互动配合。前端发送请求获取数据是开发者必不可少的场景。正因为如此，每一个前端项目都有必要接入一个请求库。</p>
<p data-nodeid="6451">那么请求库如何设计，才能保证使用者的顺畅？请求逻辑如何抽象成统一请求库，才能避免出现代码混乱堆积，难以维护的现象呢？下面我们就进入正题。</p>
<h3 data-nodeid="6452">一个请求库需要考虑哪些问题</h3>
<p data-nodeid="6453">一个请求，纵向向前承载了数据的发送，向后链接了数据的接收和消费，横向还需要处理网络环境和宿主能力，以及业务的扩展需求。因此设计一个好的请求库，首先需要预见可能会发生的问题。下面我们将重点展开几个关键问题。</p>
<h4 data-nodeid="6454">适配浏览器 or Node.js 环境</h4>
<p data-nodeid="6455">如今，前端开发不再局限于浏览器层面，Node.js 环境的出现，使得请求库的适配需求变得更加复杂。<strong data-nodeid="6596">Node.js 基于 V8 JavaScript Engine，顶层对象是 global，不存在 Window 对象和浏览器宿主</strong>，因此使用传统的 XMLHttpRequest/Fetch 在 Node.js 上发送请求是行不通的。对于搭建了 Node.js 环境的前端来说，请求库的设计实现需要考虑是否同时支持在浏览器和 Node.js 两种环境发送请求。在同构的背景下，如何使不同环境的请求库使用体验趋于一致呢？下面我们将会对这部分内容进一步讲解。</p>
<h4 data-nodeid="6456">XHR or Fetch</h4>
<p data-nodeid="6457">单就浏览器环境发送请求来说，一般存在两种技术方法：</p>
<ul data-nodeid="6458">
<li data-nodeid="6459">
<p data-nodeid="6460"><a href="https://xhr.spec.whatwg.org/" data-nodeid="6601">XMLHttpRequest 规范</a></p>
</li>
<li data-nodeid="6461">
<p data-nodeid="6462"><a href="https://fetch.spec.whatwg.org/" data-nodeid="6604">Fetch 规范</a></p>
</li>
</ul>
<p data-nodeid="6463">我们先简要对比两种技术的使用方式。</p>
<p data-nodeid="6464">使用 XMLHttpRequest 发送请求：</p>
<pre class="lang-java" data-nodeid="6465"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">success</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> data = JSON.parse(<span class="hljs-keyword">this</span>.responseText);
    console.log(data);
}
<span class="hljs-function">function <span class="hljs-title">error</span><span class="hljs-params">(err)</span> </span>{
    console.log(<span class="hljs-string">'Error Occurred :'</span>, err);
}
<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.onload = success;
xhr.onerror = error;
xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'https://xxx'</span>);
xhr.send();
</code></pre>
<p data-nodeid="6466">简单来说，XMLHttpRequest 存在一些缺点，比如：</p>
<ul data-nodeid="6467">
<li data-nodeid="6468">
<p data-nodeid="6469">配置和使用方式较为烦琐；</p>
</li>
<li data-nodeid="6470">
<p data-nodeid="6471">基于事件的异步模型不够友好。</p>
</li>
</ul>
<p data-nodeid="6472">而 Fetch 的推出，主要也是为了解决上述问题。</p>
<p data-nodeid="6473">使用 Fetch 发送一个请求：</p>
<pre class="lang-java" data-nodeid="6474"><code data-language="java">fetch(<span class="hljs-string">'https://xxx'</span>)
    .then(function (response) {
        console.log(response);
    })
    .<span class="hljs-keyword">catch</span>(function (err) {
        console.log(<span class="hljs-string">"Something went wrong!"</span>, err);
    });
</code></pre>
<p data-nodeid="6475">我们可以看到，Fetch 基于 Promise，<strong data-nodeid="6621">语法更加简洁，语义化更加突出</strong>，但<strong data-nodeid="6622">兼容性不如 XMLHttpRequest</strong>。</p>
<p data-nodeid="6476">对于一个请求库来说，在浏览器端使用 XMLHttpRequest 还是 Fetch？这是一个问题。下面我们通过 axios 的实现具体展开讲解。</p>
<h4 data-nodeid="6477">功能设计与抽象粒度</h4>
<p data-nodeid="6478">无论是基于 XMLHttpRequest 还是 Fetch，实现一层封装，屏蔽一些基础能力并暴露给业务方使用，即实现一个请求库，这并不困难。我认为，真正难的是<strong data-nodeid="6630">请求库的功能设计和抽象粒度</strong>。如果功能设计分层不够清晰，抽象方式不够灵活，很容易产出“屎山代码”。</p>
<p data-nodeid="6479">比如，对于请求库来说，是否要处理以下看似通用，但又具有定制性的功能呢？你需要考虑以下功能点：</p>
<ul data-nodeid="6480">
<li data-nodeid="6481">
<p data-nodeid="6482">自定义 headers 添加</p>
</li>
<li data-nodeid="6483">
<p data-nodeid="6484">统一断网/弱网处理</p>
</li>
<li data-nodeid="6485">
<p data-nodeid="6486">接口缓存处理</p>
</li>
<li data-nodeid="6487">
<p data-nodeid="6488">接口统一错误提示</p>
</li>
<li data-nodeid="6489">
<p data-nodeid="6490">接口统一数据处理</p>
</li>
<li data-nodeid="6491">
<p data-nodeid="6492">统一数据层结合</p>
</li>
<li data-nodeid="6493">
<p data-nodeid="6494">统一请求埋点</p>
</li>
</ul>
<p data-nodeid="6495">这些设计问题如果初期不考虑清楚，那么在业务层面，一旦真正使用了设计不良的请求库，很容易遇到不满足业务需求的场景，而沦为手写 Fetch，势必导致代码库中请求方式多种多样，风格不一。</p>
<p data-nodeid="6496">这里我们稍微展开，以一个请求库的分层封装为例，其实任何一种通用能力的封装都可以参考下图：</p>
<p data-nodeid="6497"><img src="https://s0.lgstatic.com/i/image6/M01/02/45/Cgp9HWAdGnOAEUmTAADzvClHn5k247.png" alt="202125-101326.png" data-nodeid="6643"></p>
<div data-nodeid="6498"><p style="text-align:center">请求库分层封装示例图</p></div>
<p data-nodeid="6499">如图所示，底层能力部分，对应请求库中宿主提供的 XMLHttpRequest 或 Fetch 能力，以及项目中已经内置的框架/类库能力。这一部分对于一个已有项目来说，往往是较难改变或重构的，也是不同项目中可以复用的；而业务层，比如依赖 axios 请求库的更上层封装，我们一般可以分为：</p>
<ul data-nodeid="6500">
<li data-nodeid="6501">
<p data-nodeid="6502">项目层</p>
</li>
<li data-nodeid="6503">
<p data-nodeid="6504">页面层</p>
</li>
<li data-nodeid="6505">
<p data-nodeid="6506">组件层</p>
</li>
</ul>
<p data-nodeid="6507">三个方面，它们依次递进，完成最终业务消费。底层能力部分，对许多项目来说都可以使用，而<strong data-nodeid="6653">让不同项目之间的代码质量和开发效率产生差异</strong>的，恰好是容易被轻视的业务级别的封装设计。</p>
<p data-nodeid="6508">比如设计者在项目层的封装上，如果做了几乎所有事情，囊括了所有请求相关的规则，很容易使封装复杂，过度设计。不同层级的功能和职责是不同的，<strong data-nodeid="6659">错位的使用和设计，是让项目变得更加混乱的诱因之一</strong>。</p>
<p data-nodeid="6509">合理的设计是，底层部分保留对全局封装的影响范围，而项目层保留对页面层的影响能力，页面层保留对组件层的影响能力。</p>
<p data-nodeid="6510"><img src="https://s0.lgstatic.com/i/image6/M00/02/E5/CioPOWAeNr6AYnHYAAVEoQwNcDk580.png" alt="前端基建 金句.png" data-nodeid="6663"></p>
<p data-nodeid="6511">比如，我们在项目层提供一个基础请求库封装，在这一层可以提供默认发送 cookie 等（一定需要存在）的行为，同时通过配置 options.fetch 保留覆盖 globalThis.fetch 的能力，这样可以在 Node 等环境中，通过<strong data-nodeid="6669">注入一个 node-fetch npm 库</strong>的方式，支持 SSR 能力。</p>
<p data-nodeid="6512">这里需要注意的是，我们一定要避免设计一个特别大的 Fetch 方法，通过拓展 options 把所有事情都做了，用 options 驱动一切行为，这比较容易让 Fetch 代码和逻辑变得复杂、难以理解，而且不利于 tree-shaking 和 code-spliting。</p>
<p data-nodeid="6513">那么如何做到这种层次清晰的基础库呢？接下来，我们就从 axios 的设计分析寻找答案。</p>
<h3 data-nodeid="6514">axios 设计之美</h3>
<p data-nodeid="6515">axios 是一个被前端广泛使用的请求库，对应上述分层结构中，属于框架/类库层，我们来总结一下它的功能特点：</p>
<ul data-nodeid="6516">
<li data-nodeid="6517">
<p data-nodeid="6518">在浏览器端，使用 XMLHttpRequest 发送请求；</p>
</li>
<li data-nodeid="6519">
<p data-nodeid="6520">支持 Node.js 端发送请求；</p>
</li>
<li data-nodeid="6521">
<p data-nodeid="6522">支持 Promise API，使用 Promise 风格语法；</p>
</li>
<li data-nodeid="6523">
<p data-nodeid="6524">支持请求和响应拦截；</p>
</li>
<li data-nodeid="6525">
<p data-nodeid="6526">支持自定义修改请求和返回内容；</p>
</li>
<li data-nodeid="6527">
<p data-nodeid="6528">支持请求取消；</p>
</li>
<li data-nodeid="6529">
<p data-nodeid="6530">默认支持 XSRF 防御。</p>
</li>
</ul>
<p data-nodeid="6531">下面，我们主要从拦截器思想、适配器思想、安全思想三方面展开，分析 axios 设计的可取之处。</p>
<h4 data-nodeid="6532">拦截器思想</h4>
<p data-nodeid="6533">拦截器思想是 axios 带来的最具启发性的思想之一。它赋予了<strong data-nodeid="6688">分层开发时借助拦截行为，注入自定义能力的功能</strong>。简单来说，axios 的拦截器主要由：任务注册 → 任务编排 → 任务调度（执行）三步组成。</p>
<p data-nodeid="6534">我们先看任务注册，在请求发出前，可以使用<code data-backticks="1" data-nodeid="6690">axios.interceptors.request.use</code>方法注入拦截逻辑，比如：</p>
<pre class="lang-java" data-nodeid="6535"><code data-language="java">axios.interceptors.request.use(function (config) {
    <span class="hljs-comment">// 请求发送前做一些事情，比如添加 headers</span>
    <span class="hljs-keyword">return</span> config;
  }, function (error) {
    <span class="hljs-comment">// 请求出现错误时，处理逻辑</span>
    <span class="hljs-keyword">return</span> Promise.reject(error);
  });
</code></pre>
<p data-nodeid="6536">在请求返回后，用<code data-backticks="1" data-nodeid="6693">axios.interceptors.response.use</code>方法注入拦截逻辑，比如：</p>
<pre class="lang-java" data-nodeid="6537"><code data-language="java">axios.interceptors.response.use(function (response) {
    <span class="hljs-comment">// 响应返回 2xx 时，做一些操作，比如响应状态码为 401 时，自动跳转到登录页</span>
    <span class="hljs-keyword">return</span> response;
  }, function (error) {
    <span class="hljs-comment">// 响应返回 2xx 外响应码时，错误处理逻辑</span>
    <span class="hljs-keyword">return</span> Promise.reject(error);
  });
</code></pre>
<p data-nodeid="6538">任务注册部分的源码实现也不复杂：</p>
<pre class="lang-java" data-nodeid="6539"><code data-language="java"><span class="hljs-comment">// lib/core/Axios.js</span>
<span class="hljs-function">function <span class="hljs-title">Axios</span><span class="hljs-params">(instanceConfig)</span> </span>{
  <span class="hljs-keyword">this</span>.defaults = instanceConfig;
  <span class="hljs-keyword">this</span>.interceptors = {
    request: <span class="hljs-keyword">new</span> InterceptorManager(),
    response: <span class="hljs-keyword">new</span> InterceptorManager()
  };
}
<span class="hljs-comment">// lib/core/InterceptorManager.js</span>
<span class="hljs-function">function <span class="hljs-title">InterceptorManager</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.handlers = [];
}
InterceptorManager.prototype.use = <span class="hljs-function">function <span class="hljs-title">use</span><span class="hljs-params">(fulfilled, rejected)</span> </span>{
  <span class="hljs-keyword">this</span>.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  <span class="hljs-comment">// 返回当前的索引，用于移除已注册的拦截器</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.handlers.length - <span class="hljs-number">1</span>;
};
</code></pre>
<p data-nodeid="6540">如上代码，我们定义的请求/响应拦截器，会在每一个 axios 实例的 Interceptors 属性中维护，<code data-backticks="1" data-nodeid="6697">this.interceptors.request</code>和<code data-backticks="1" data-nodeid="6699">this.interceptors.response</code>也都是一个 InterceptorManager 实例，该实例的<code data-backticks="1" data-nodeid="6701">handlers</code>属性<strong data-nodeid="6707">以数组的形式</strong>存储了使用方定义的一个个拦截器逻辑。</p>
<p data-nodeid="6541">注册了任务，我们再来看看任务编排时是如何将拦截器串联起来，并在任务调度阶段执行各个拦截器的。如下源码：</p>
<pre class="lang-java" data-nodeid="6542"><code data-language="java"><span class="hljs-comment">// lib/core/Axios.js</span>
Axios.prototype.request = <span class="hljs-function">function <span class="hljs-title">request</span><span class="hljs-params">(config)</span> </span>{
  config = mergeConfig(<span class="hljs-keyword">this</span>.defaults, config);
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">var</span> chain = [dispatchRequest, undefined];
  <span class="hljs-keyword">var</span> promise = Promise.resolve(config);
  <span class="hljs-comment">// 任务编排</span>
  <span class="hljs-keyword">this</span>.interceptors.request.forEach(<span class="hljs-function">function <span class="hljs-title">unshiftRequestInterceptors</span><span class="hljs-params">(interceptor)</span> </span>{
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  <span class="hljs-keyword">this</span>.interceptors.response.forEach(<span class="hljs-function">function <span class="hljs-title">pushResponseInterceptors</span><span class="hljs-params">(interceptor)</span> </span>{
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  <span class="hljs-comment">// 任务调度</span>
  <span class="hljs-keyword">while</span> (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  <span class="hljs-keyword">return</span> promise;
};
</code></pre>
<p data-nodeid="6543">我们通过<code data-backticks="1" data-nodeid="6710">chain</code>数组来编排调度任务，<code data-backticks="1" data-nodeid="6712">dispatchRequest</code>方法实际执行请求的发送，编排过程实现：<strong data-nodeid="6721">在实际发送请求的方法</strong><code data-backticks="1" data-nodeid="6717">dispatchRequest</code>前插入请求拦截器，在<code data-backticks="1" data-nodeid="6719">dispatchRequest</code>方法后，插入响应拦截器。</p>
<p data-nodeid="6544">任务调度其实就是通过一个 While 循环，通过一个 Promise 实例，遍历迭代<code data-backticks="1" data-nodeid="6723">chain</code>数组方法，并基于 Promise 回调特性，将各个拦截器串联执行起来。</p>
<p data-nodeid="6545">我们通过下图，来加深理解：</p>
<p data-nodeid="6546"><img src="https://s0.lgstatic.com/i/image/M00/94/9E/CgqCHmAY6WuAA9A_AAEfckV_ZjM495.png" alt="Drawing 1.png" data-nodeid="6728"></p>
<h4 data-nodeid="6547">适配器思想</h4>
<p data-nodeid="6548">前文提到了 axios 同时支持 Node.js 环境和浏览器环境发送请求，在浏览器中我们可以选用 XMLHttpRequest 或 Fetch 方法发送请求，但是在 Node.js 中，需要通过 HTTP 模块发送请求。对此，axiso 是如何设计实现的呢？</p>
<p data-nodeid="6549">为了支持适配不同环境，axios 实现了适配器：Adapter，具体实现在<code data-backticks="1" data-nodeid="6732">dispatchRequest</code>方法中：</p>
<pre class="lang-java" data-nodeid="6550"><code data-language="java"><span class="hljs-comment">// lib/core/dispatchRequest.js</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-function">function <span class="hljs-title">dispatchRequest</span><span class="hljs-params">(config)</span> </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">var</span> adapter = config.adapter || defaults.adapter;

  <span class="hljs-keyword">return</span> adapter(config).then(<span class="hljs-function">function <span class="hljs-title">onAdapterResolution</span><span class="hljs-params">(response)</span> </span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> response;
  }, <span class="hljs-function">function <span class="hljs-title">onAdapterRejection</span><span class="hljs-params">(reason)</span> </span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> Promise.reject(reason);
  });
};
</code></pre>
<p data-nodeid="6551">如上代码，axios 支持使用方实现自己的 Adapter，自定义不同环境中的请求实现方式，也提供了默认的 Adapter。默认 Adapter 逻辑代码如下：</p>
<pre class="lang-java" data-nodeid="6552"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">getDefaultAdapter</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">var</span> adapter;
  <span class="hljs-keyword">if</span> (typeof XMLHttpRequest !== <span class="hljs-string">'undefined'</span>) {
    <span class="hljs-comment">// 浏览器端使用 XMLHttpRequest 方法</span>
    adapter = require(<span class="hljs-string">'./adapters/xhr'</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (typeof process !== <span class="hljs-string">'undefined'</span> &amp;&amp; 
    Object.prototype.toString.call(process) === <span class="hljs-string">'[object process]'</span>) {
    <span class="hljs-comment">// Node.js 端，使用 HTTP 模块</span>
    adapter = require(<span class="hljs-string">'./adapters/http'</span>);
  }
  <span class="hljs-keyword">return</span> adapter;
}
</code></pre>
<p data-nodeid="6553">一个 Adapter 需要返回一个 Promise 实例（这是因为<strong data-nodeid="6740">axios 内部通过 Promise 链式调用完成请求调度</strong>），我们分别看看在浏览器端和 Node.js 端具体 Adapter 实现逻辑：</p>
<pre class="lang-java" data-nodeid="6554"><code data-language="java"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-function">function <span class="hljs-title">xhrAdapter</span><span class="hljs-params">(config)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function">function <span class="hljs-title">dispatchXhrRequest</span><span class="hljs-params">(resolve, reject)</span> </span>{
    <span class="hljs-keyword">var</span> requestData = config.data;
    <span class="hljs-keyword">var</span> requestHeaders = config.headers;
    <span class="hljs-keyword">var</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
    <span class="hljs-keyword">var</span> fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), <span class="hljs-keyword">true</span>);

    <span class="hljs-comment">// Listen for ready state</span>
    request.onreadystatechange = <span class="hljs-function">function <span class="hljs-title">handleLoad</span><span class="hljs-params">()</span> </span>{
    	<span class="hljs-comment">// ....</span>
    };
    <span class="hljs-comment">// Handle browser request cancellation (as opposed to a manual cancellation)</span>
    request.onabort = <span class="hljs-function">function <span class="hljs-title">handleAbort</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// ...</span>
    };
    <span class="hljs-comment">// Handle low level network errors</span>
    request.onerror = <span class="hljs-function">function <span class="hljs-title">handleError</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// ...</span>
    };
    <span class="hljs-comment">// Handle timeout</span>
    request.ontimeout = <span class="hljs-function">function <span class="hljs-title">handleTimeout</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// ...</span>
    };
    <span class="hljs-comment">// ...</span>

    request.send(requestData);
  });
};
</code></pre>
<p data-nodeid="6555">如上代码，就是一个典型的使用 XMLHttpRequest 发送请求的实现内容。在 Node.js 端的实现，精简后代码如下：</p>
<pre class="lang-java" data-nodeid="6556"><code data-language="java"><span class="hljs-keyword">var</span> http = require(<span class="hljs-string">'http'</span>);
<span class="hljs-comment">/*eslint consistent-return:0*/</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-function">function <span class="hljs-title">httpAdapter</span><span class="hljs-params">(config)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function">function <span class="hljs-title">dispatchHttpRequest</span><span class="hljs-params">(resolvePromise, rejectPromise)</span> </span>{
    <span class="hljs-keyword">var</span> resolve = <span class="hljs-function">function <span class="hljs-title">resolve</span><span class="hljs-params">(value)</span> </span>{
      resolvePromise(value);
    };
    <span class="hljs-keyword">var</span> reject = <span class="hljs-function">function <span class="hljs-title">reject</span><span class="hljs-params">(value)</span> </span>{
      rejectPromise(value);
    };
    <span class="hljs-keyword">var</span> data = config.data;
    <span class="hljs-keyword">var</span> headers = config.headers;
    <span class="hljs-keyword">var</span> options = {
      <span class="hljs-comment">// ...</span>
    };

    <span class="hljs-keyword">var</span> transport = http;
    <span class="hljs-keyword">var</span> req = http.request(options, <span class="hljs-function">function <span class="hljs-title">handleResponse</span><span class="hljs-params">(res)</span> </span>{
      <span class="hljs-comment">// ...</span>
    });
    <span class="hljs-comment">// Handle errors</span>
    req.on(<span class="hljs-string">'error'</span>, <span class="hljs-function">function <span class="hljs-title">handleRequestError</span><span class="hljs-params">(err)</span> </span>{
      <span class="hljs-comment">// ...</span>
    });
    <span class="hljs-comment">// Send the request</span>
    <span class="hljs-keyword">if</span> (utils.isStream(data)) {
      data.on(<span class="hljs-string">'error'</span>, <span class="hljs-function">function <span class="hljs-title">handleStreamError</span><span class="hljs-params">(err)</span> </span>{
        reject(enhanceError(err, config, <span class="hljs-keyword">null</span>, req));
      }).pipe(req);
    } <span class="hljs-keyword">else</span> {
      req.end(data);
    }
  });
};
</code></pre>
<p data-nodeid="6557">上述代码主要是调用 Node.js HTTP 模块，进行请求的发送和处理，当然，真实源码实现还需要考虑 HTTPS 以及 Redirect 等问题，这里我们不再展开。</p>
<p data-nodeid="6558">讲到这里，可能你会问，什么场景下，才会需要自定义 Adapter 进行请求发送呢？比如<strong data-nodeid="6748">在测试阶段或特殊环境</strong>中，我们可以 mock 请求：</p>
<pre class="lang-java" data-nodeid="6559"><code data-language="java"><span class="hljs-keyword">if</span> (isEnv === <span class="hljs-string">'ui-test'</span>) {
	adapter = require(<span class="hljs-string">'axios-mock-adapter'</span>)
}
</code></pre>
<p data-nodeid="6560">实现一个自定义的 Adapter 也并不困难，说到底它也只是一个 Node.js 模块，导出一个 Promise 实例即可：</p>
<pre class="lang-java" data-nodeid="6561"><code data-language="java"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-function">function <span class="hljs-title">myAdapter</span><span class="hljs-params">(config)</span> </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(function(resolve, reject) {
    <span class="hljs-comment">// ...</span>
    sendRequest(resolve, reject, response);
    <span class="hljs-comment">// ....</span>
  });
}
</code></pre>
<p data-nodeid="6562">相信你学会了这些内容，就对 <a href="https://github.com/ctimmerm/axios-mock-adapter" data-nodeid="6753">axios-mock-adapter</a> 这个库的实现原理了然于胸了。</p>
<h4 data-nodeid="6563">安全思想</h4>
<p data-nodeid="6564">说到请求，自然关联着安全问题。在本小节最后部分，我们对 axios 中的一些安全机制进行解析，涉及相关攻击手段：CSRF。</p>
<blockquote data-nodeid="6565">
<p data-nodeid="6566">Cross—Site Request Forgery，攻击者盗用了你的身份，以你的名义发送恶意请求，对服务器来说，这个请求是完全合法的，但是却完成了攻击者期望的一个操作，比如以你的名义发送邮件、发消息，盗取你的账号，添加系统管理员，甚至购买商品、虚拟货币转账等。</p>
</blockquote>
<p data-nodeid="6567">在 axios 中，主要依赖双重 cookie 的方式防御 CSRF。具体来说，对于攻击者，获取用户 cookie 是比较困难的，因此，<strong data-nodeid="6763">我们可以在请求中携带一个 cookie 值，来保证请求的安全性</strong>。这里我们将相关流程梳理为：</p>
<ul data-nodeid="6568">
<li data-nodeid="6569">
<p data-nodeid="6570">用户访问页面，后端向请求域中注入一个 cookie，一般该 cookie 值为加密随机字符串；</p>
</li>
<li data-nodeid="6571">
<p data-nodeid="6572">在前端通过 Ajax 请求数据时，取出上述 cookie，添加到 URL 参数或者请求 header 中；</p>
</li>
<li data-nodeid="6573">
<p data-nodeid="6574">后端接口验证请求中携带的 cookie 值是否合法，不合法（不一致），则拒绝请求。</p>
</li>
</ul>
<p data-nodeid="6575">我们看 axios 源码：</p>
<pre class="lang-java" data-nodeid="6576"><code data-language="java"><span class="hljs-comment">// lib/defaults.js</span>
<span class="hljs-keyword">var</span> defaults = {
  adapter: getDefaultAdapter(),
  <span class="hljs-comment">// ...</span>
  xsrfCookieName: <span class="hljs-string">'XSRF-TOKEN'</span>,
  xsrfHeaderName: <span class="hljs-string">'X-XSRF-TOKEN'</span>,
};
</code></pre>
<p data-nodeid="6577">在这里，axios 默认配置了默认<code data-backticks="1" data-nodeid="6769">xsrfCookieName</code>和<code data-backticks="1" data-nodeid="6771">xsrfHeaderName</code>，实际开发中可以按具体情况传入配置。在具体请求时，以<code data-backticks="1" data-nodeid="6773">lib/adapters/xhr.js</code>为例：</p>
<pre class="lang-java" data-nodeid="6578"><code data-language="java"><span class="hljs-comment">// 添加 xsrf header</span>
<span class="hljs-keyword">if</span> (utils.isStandardBrowserEnv()) {
  <span class="hljs-keyword">var</span> xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) &amp;&amp; config.xsrfCookieName ?
    cookies.read(config.xsrfCookieName) :
    undefined;
  <span class="hljs-keyword">if</span> (xsrfValue) {
    requestHeaders[config.xsrfHeaderName] = xsrfValue;
  }
}
</code></pre>
<p data-nodeid="6579">由此可见，对一个成熟请求库的设计来说，安全防范这个话题永不过时。</p>
<h3 data-nodeid="6580">总结</h3>
<p data-nodeid="6581">本讲我们在开篇分析了代码设计、代码分层的方方面面，一个好的设计一定是层次明晰，各司其职的，一个好的设计也会直接帮助业务开发提升效率。封装和设计，是编程领域亘古不变的经典话题，需要每名开发者下沉到业务开发中体会、思考。</p>
<p data-nodeid="6582">本小节的后半部分，我们从源码入手，分析了 axios 的优秀设计思想。即便你在业务中没有使用过 axios，但对于 axios 的学习始终是必要且重要的。</p>
<p data-nodeid="6583">主要内容总结如下：</p>
<p data-nodeid="6584"><img src="https://s0.lgstatic.com/i/image2/M01/0C/8A/Cip5yGAY6X6ASgWfAAEY6D_f_OM734.png" alt="Drawing 2.png" data-nodeid="6782"></p>
<p data-nodeid="6585" class="te-preview-highlight">最后，给大家布置一个思考题：axios 支持<a href="https://github.com/axios/axios#cancellation" data-nodeid="6786">请求取消能力</a>，这是如何实现的呢？欢迎在留言区和我分享你的观点。下一讲，我们将继续学习代码设计这一话题，通过对比 Koa 和 Redux，聚焦中间件化和插件化理念。我们下一讲再见。</p>

---

### 精选评论

##### **用户4723：
> 通过传递config配置cancelToken的形式，来取消的。判断有传cancelToken，在promise链式调用的dispatchRequest抛出错误，在adapter中request.abort()取消请求，使promise走向rejected，被用户捕获取消信息。具体分析之前写过一篇《学习 axios 源码整体架构，打造属于自己的请求库》链接：https://lxchuan12.gitee.io/axios/

##### *勇：
> axios 通过在config中传入一个cancelToken, cancelToken.promise 实际为一个PENDING状态的promise实例，当用户调用cancel方法，会使该promise 实例由PENDING状态变为RESOLVE状态，触发监听函数onCanceled，调用request.abort()，取消xhr调用

##### **贤：
> 哈哈, 我搞的项目就是 options 驱动一切...

##### **明：
> 合理的设计是，底层部分保留对全局封装的影响范围，而项目层保留对页面层的影响能力，页面层保留对组件层的影响能力。这里的 XXX 保留对 xxx 的影响能力怎么理解？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 就是底层可以「修改和干预」上层，而上层只能依赖底层，不可以修改底层

