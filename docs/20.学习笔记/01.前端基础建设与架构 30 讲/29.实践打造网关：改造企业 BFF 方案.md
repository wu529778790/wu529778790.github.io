<p data-nodeid="31022">前几讲我们分别介绍了 Node.js 在同构项目以及性能守卫服务中的应用。结合当下热点，这一讲我们继续深入讲解 Node.js 另外一个重要的应用场景：企业级 BFF 网关。</p>
<p data-nodeid="31023">网关这个话题可以和微服务、Serverless 等概念相结合，想象空间无限大，同时我们又要深入网关实现代码，抽丝剥茧。下面我们就开始今天内容的学习，请你做好准备。</p>
<h3 data-nodeid="31024">BFF 网关介绍和优缺点梳理</h3>
<p data-nodeid="31025">首先，我们对 BFF 网关做一个定义。BFF 即 Backend For Frontend，翻译过来就是服务于前端的后端。这个概念最早在<a href="https://samnewman.io/patterns/architectural/bff/?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31196">Pattern: Backends For Frontends</a>中提出，它不是一种技术，而是一种<strong data-nodeid="31206">逻辑分层</strong>：在后端普遍采用微服务的技术背景下，<strong data-nodeid="31207">作为适配层能够更好地为前端服务，而传统业务后端只需要关注自己的微服务</strong>即可。</p>
<p data-nodeid="31026">我们结合下图进行拆解：</p>
<p data-nodeid="34120" class=""><img src="https://s0.lgstatic.com/i/image6/M01/21/5E/Cgp9HWBURl6AGdLyAAGLpDcAPtI043.png" alt="Drawing 0.png" data-nodeid="34124"></p>
<div data-nodeid="34121"><p style="text-align:center">BFF 网关拆解图</p></div>



<p data-nodeid="31029">如图所示，我们把用户体验适配和 API 网关聚合层合称为广义的 BFF 层，在 BFF 层的上游是各种后端业务微服务，在 BFF 下游就是各端应用。从职责上看，BFF 层向下给端提供 HTTP 接口，向上通过调用 HTTP 或 RPC 获取数据进行加工，最终完成整个 BFF 层的闭环。</p>
<p data-nodeid="31030">对比传统的架构，我们可以得出 BFF 层设计的优势：</p>
<ul data-nodeid="31031">
<li data-nodeid="31032">
<p data-nodeid="31033"><strong data-nodeid="31219">降低沟通成本</strong>，领域模型与页面数据更好地解耦；</p>
</li>
<li data-nodeid="31034">
<p data-nodeid="31035">提供<strong data-nodeid="31225">更好的用户体验</strong>，比如可以做到多端应用适配，根据不同端，提供更精简的数据。</p>
</li>
</ul>
<p data-nodeid="31036">但是 BFF 层需要谁来开发呢？这就引出了 BFF 的一些痛点：</p>
<ul data-nodeid="31037">
<li data-nodeid="31038">
<p data-nodeid="31039"><strong data-nodeid="31231">需要解决分工问题</strong>，作为衔接前与后的环节，需要界定前后端职责，明确开发归属；</p>
</li>
<li data-nodeid="31040">
<p data-nodeid="31041"><strong data-nodeid="31236">链路复杂</strong>，引入 BFF 层之后，流程变得更加烦琐；</p>
</li>
<li data-nodeid="31042">
<p data-nodeid="31043"><strong data-nodeid="31241">资源浪费</strong>，BFF 层会带来一定额外资源的占用，需要有较好的弹性伸缩扩容机制。</p>
</li>
</ul>
<p data-nodeid="31044">通过分析 BFF 层的优缺点，我们可以明确打造一个 BFF 网关需要考虑的问题。而对于前端开发者来说，使用 Node.js 实现一个 BFF 网关则是一项当仁不让的工作。我们继续往下看。</p>
<h3 data-nodeid="31045">打造 BFF 网关需要考虑的问题</h3>
<h4 data-nodeid="31046">数据处理</h4>
<p data-nodeid="31047">这里的数据处理，主要包括了：</p>
<ul data-nodeid="31048">
<li data-nodeid="31049">
<p data-nodeid="31050">数据聚合和裁剪</p>
</li>
<li data-nodeid="31051">
<p data-nodeid="31052">序列化格式转换</p>
</li>
<li data-nodeid="31053">
<p data-nodeid="31054">协议转换</p>
</li>
<li data-nodeid="31055">
<p data-nodeid="31056">Node.js 调用 RPC</p>
</li>
</ul>
<p data-nodeid="31057">在微服务体系结构中，各个微服务的数据实体可能并不统一和规范，如果没有 BFF 层的统一处理，在端上进行不同数据格式的聚合会是一件非常痛苦的事情。因此，数据裁剪和聚合对于 BFF 网关来说就变得尤为重要了。</p>
<p data-nodeid="31058">同时，<strong data-nodeid="31256">不同端可能也会需要不同的数据序列化格式</strong>。比如，某个微服务使用 JSON，而某个客户只能使用 XML，那么 JSON 转换为 XML 的工作，也应当合理地在 BFF 网关层实现。</p>
<p data-nodeid="31059">再比如微服务架构一般允许多语言协议传输，比如客户端需要通过 HTTP REST 进行所有的通信，而某个微服务内部使用了 gRPC 或 GraphQL，其中的语言协议转换，也需要在 BFF 网关层解决。</p>
<p data-nodeid="31060">还需要你了解的是，在传统开发模式中，前端通过 Node.js 实现 BFF 的模式：前端请求 BFF 提供的接口，BFF 直接通过 HTTP Client 或者 cURL 方式透传给微服务——这种模式有其优势，但是可以做到精益求精。相比 BFF 不做任何逻辑处理，<strong data-nodeid="31263">Node.js 是一个 Proxy，我们可以思考如何让 Node.js 调用 RPC</strong>，以最大限度地发挥 BFF 层能力。</p>
<h4 data-nodeid="31061">流量处理</h4>
<p data-nodeid="31062">这里的流量处理主要是指：</p>
<ul data-nodeid="31063">
<li data-nodeid="31064">
<p data-nodeid="31065">请求分发能力、代理能力；</p>
</li>
<li data-nodeid="31066">
<p data-nodeid="31067">可用性保障。</p>
</li>
</ul>
<p data-nodeid="31068">在 BFF 层网关中，我们需要执行一些代理操作，比如将请求路由到特定服务。<strong data-nodeid="31274">在 Node.js 中，我们可以使用</strong><code data-backticks="1" data-nodeid="31272">http-proxy</code>来简单代理特定服务。</p>
<p data-nodeid="31069">我们需要考虑<strong data-nodeid="31280">网关层如何维护分发路由</strong>这个关键问题。简单来说，我们可以 hard coding 写在代码里，同时也可以实现网关层的服务发现。比如，在 URL 规范化的基础上，网关层进行请求匹配时，可以只根据 URL 内容对应不同的 namespace 进而对应到不同的微服务。当然也可以使用中心化配置，通过配置来维护网关层路由分发。</p>
<p data-nodeid="31070">除此之外，网关层也要考虑条件路由，即对具有特定内容（或者一定流量比例）的请求进行筛选并分发到特定实例组上，这种条件路由能力是实现灰度发布、蓝绿发布、AB Test 等功能的基础。</p>
<p data-nodeid="31071">另外，BFF 网关直面用户，因此这一层也需要有良好的限速、隔离、熔断降级、负载均衡和缓存能力。</p>
<p data-nodeid="31072">关于这些内容，我们会在后半部分代码环节中进一步体现。</p>
<h4 data-nodeid="31073">安全问题</h4>
<p data-nodeid="31074">鉴于 BFF 层承上启下的位置，BFF 要考虑数据流向的安全性，需要完成必要的校验逻辑。其原则是：</p>
<ul data-nodeid="31075">
<li data-nodeid="31076">
<p data-nodeid="31077">BFF 层不需要完成全部的校验逻辑，部分业务校验应该留在微服务中完成；</p>
</li>
<li data-nodeid="31078">
<p data-nodeid="31079">BFF 需要完成必要的检查，比如请求头检查和必要的数据消毒；</p>
</li>
<li data-nodeid="31080">
<p data-nodeid="31081">合理使用 Content-Security-Policy；</p>
</li>
<li data-nodeid="31082">
<p data-nodeid="31083">使用 HTTPS/HSTS；</p>
</li>
<li data-nodeid="31084">
<p data-nodeid="31085">设置监控报警以及调用链追踪能力。</p>
</li>
</ul>
<p data-nodeid="31086">同时，在使用 Node.js 做 BFF 层时，需要开发者<strong data-nodeid="31300">时刻注意依赖包的安全性</strong>，可以考虑在 CI/CD 环节使用<code data-backticks="1" data-nodeid="31296">nsp</code>、<code data-backticks="1" data-nodeid="31298">npm audit</code>等工具进行安全审计。</p>
<h4 data-nodeid="31087">权限与校验设计</h4>
<p data-nodeid="31088">在上面提到的安全问题中，一个关键的设计就是 BFF 层的用户权限校验。这里我们单独展开说明。</p>
<p data-nodeid="31089">对于大多数微服务基础架构来说，需要将身份验证和权限校验等共享逻辑放入网关层，这样不仅能够帮助后端开发者缩小服务的体积，也能让后端开发者更专注于自身领域。</p>
<p data-nodeid="31090">在网关中，一般我们需要支持基于 cookie 或 token 的身份验证。关于身份验证的话题这里我们不详细展开，值得一提的是，需要开发者关注 SSO 单点登录的设计。</p>
<p data-nodeid="31091">关于权限问题，一般主流采用 ACL 或 RBAC 的方式，这就需要开发者系统学习权限设计知识。简单来说，<strong data-nodeid="31310">ACL 即访问控制列表，它的核心在于用户直接和权限挂钩。RBAC 的核心是用户只和角色关联，而角色对应了权限</strong>，这样设计的优势在于：对用户而言，只需分配角色即可以实现权限管理，而某角色可以拥有各种各样的权限并可以继承。</p>
<p data-nodeid="31092">ACL 和 RBAC 相比，缺点在于由于用户和权限直接挂钩，导致在授予时的复杂性；虽然可以利用组（角色）来简化这个复杂性，但 RBAC 仍然会导致系统不好理解，而且在判断用户是否有该权限时比较困难，一定程度上影响了效率。</p>
<p data-nodeid="31093">总之，设计一个良好的 BFF 网关，要求开发者具有较强的综合能力。下面，我们就来实现一个精简的网关系统，该网关只保留了最核心的能力，以性能为重要目标，同时支持能力扩展。</p>
<h3 data-nodeid="31094">实现一个 lucas-gateway</h3>
<p data-nodeid="31095">如何设计一个扩展性良好的 BFF 层，以灵活支持上述需要考量的问题呢？我们来看几个关键的思路。</p>
<ul data-nodeid="31096">
<li data-nodeid="31097">
<p data-nodeid="31098"><strong data-nodeid="31319">插件化</strong>：一个良好的 BFF 层设计可以内置或可插拔多种插件，比如 Logger 等，也可以接受第三方插件。</p>
</li>
<li data-nodeid="31099">
<p data-nodeid="31100"><strong data-nodeid="31324">中间件化</strong>：SSO、限流、熔断等策略可以通过中间件形式实现，类似插件，中间件也可以进行定制和扩展。</p>
</li>
</ul>
<p data-nodeid="31101">下面我们就实战实现一个 BFF 网关，请随我一起深入代码。该实现代码我主要 fork 了<a href="https://github.com/jkyberneees/fast-gateway?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31328">jkyberneees 的 fast-gateway</a>，源代码放在了：<a href="https://github.com/HOUCe?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31332">HOUCe</a>/<a href="https://github.com/HOUCe/fast-gateway?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31336">fast-gateway</a>当中。</p>
<p data-nodeid="31102">我们先看看开发这个网关的必要依赖。</p>
<ul data-nodeid="31103">
<li data-nodeid="31104">
<p data-nodeid="31105"><a href="https://www.npmjs.com/package/fast-proxy?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31341">fast-proxy</a>：支持 HTTP、HTTPS、HTTP2 三种协议，可以高性能完成请求的转发、代理。</p>
</li>
<li data-nodeid="31106">
<p data-nodeid="31107"><a href="https://www.npmjs.com/package/@polka/send-type?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31345">@polka/send-type</a>：处理 HTTP 响应的工具函数。</p>
</li>
<li data-nodeid="31108">
<p data-nodeid="31109"><a href="https://www.npmjs.com/package/http-cache-middleware?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31349">http-cache-middleware</a>：是一个高性能的 HTTP 缓存中间件。</p>
</li>
<li data-nodeid="31110">
<p data-nodeid="31111"><a href="https://www.npmjs.com/package/restana?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31353">restana</a>：一个极简的 REST 风格的 Node.js 框架。</p>
</li>
</ul>
<p data-nodeid="31112">我们的设计主要从</p>
<ul data-nodeid="31113">
<li data-nodeid="31114">
<p data-nodeid="31115">基本反代理</p>
</li>
<li data-nodeid="31116">
<p data-nodeid="31117">中间件</p>
</li>
<li data-nodeid="31118">
<p data-nodeid="31119">缓存</p>
</li>
<li data-nodeid="31120">
<p data-nodeid="31121">Hooks</p>
</li>
</ul>
<p data-nodeid="31122">几个方向展开。</p>
<h4 data-nodeid="31123">基本反代理</h4>
<p data-nodeid="31124">设计使用方式如下代码：</p>
<pre class="lang-java" data-nodeid="31125"><code data-language="java"><span class="hljs-keyword">const</span> gateway = require(<span class="hljs-string">'lucas-gateway'</span>)
<span class="hljs-keyword">const</span> server = gateway({
  routes: [{
    prefix: <span class="hljs-string">'/service'</span>,
    target: <span class="hljs-string">'http://127.0.0.1:3000'</span>
  }]
})
server.start(<span class="hljs-number">8080</span>)
</code></pre>
<p data-nodeid="31126">网关暴露出<code data-backticks="1" data-nodeid="31364">gateway</code>方法进行请求反向代理。如上代码，我们将 prefix 为<code data-backticks="1" data-nodeid="31366">/service</code>的请求反向代理到<code data-backticks="1" data-nodeid="31368">http://127.0.0.1:3000</code>地址。我们来看看<code data-backticks="1" data-nodeid="31370">gateway</code>核心函数的实现：</p>
<pre class="lang-java" data-nodeid="31127"><code data-language="java"><span class="hljs-keyword">const</span> proxyFactory = require(<span class="hljs-string">'./lib/proxy-factory'</span>)
<span class="hljs-comment">// 一个简易的高性能 Node.js 框架</span>
<span class="hljs-keyword">const</span> restana = require(<span class="hljs-string">'restana'</span>)
<span class="hljs-comment">// 默认的代理 handler</span>
<span class="hljs-keyword">const</span> defaultProxyHandler = (req, res, url, proxy, proxyOpts) =&gt; proxy(req, res, url, proxyOpts)
<span class="hljs-comment">// 默认支持的方法，包括 ['get', 'delete', 'put', 'patch', 'post', 'head', 'options', 'trace']</span>
<span class="hljs-keyword">const</span> DEFAULT_METHODS = require(<span class="hljs-string">'restana/libs/methods'</span>).filter(method =&gt; method !== <span class="hljs-string">'all'</span>)
<span class="hljs-comment">// 一个简易的 HTTP 响应库</span>
<span class="hljs-keyword">const</span> send = require(<span class="hljs-string">'@polka/send-type'</span>)
<span class="hljs-comment">// 支持 HTTP 代理</span>
<span class="hljs-keyword">const</span> PROXY_TYPES = [<span class="hljs-string">'http'</span>]
<span class="hljs-keyword">const</span> gateway = (opts) =&gt; {
  opts = Object.assign({
    middlewares: [],
    pathRegex: <span class="hljs-string">'/*'</span>
  }, opts)
	<span class="hljs-comment">// 运行开发者传一个 server 实例，默认则使用 restana server</span>
  <span class="hljs-keyword">const</span> server = opts.server || restana(opts.restana)
  <span class="hljs-comment">// 注册中间件</span>
  opts.middlewares.forEach(middleware =&gt; {
    server.use(middleware)
  })
  <span class="hljs-comment">// 一个简易的接口 `/services.json`，该接口罗列出网关代理的所有请求和相应信息</span>
  <span class="hljs-keyword">const</span> services = opts.routes.map(route =&gt; ({
    prefix: route.prefix,
    docs: route.docs
  }))
  server.get(<span class="hljs-string">'/services.json'</span>, (req, res) =&gt; {
    send(res, <span class="hljs-number">200</span>, services)
  })
  <span class="hljs-comment">// 路由处理</span>
  opts.routes.forEach(route =&gt; {
    <span class="hljs-keyword">if</span> (undefined === route.prefixRewrite) {
      route.prefixRewrite = <span class="hljs-string">''</span>
    }
    <span class="hljs-keyword">const</span> { proxyType = <span class="hljs-string">'http'</span> } = <span class="hljs-function">route
    <span class="hljs-title">if</span> <span class="hljs-params">(!PROXY_TYPES.includes(proxyType)</span>) </span>{
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(<span class="hljs-string">'Unsupported proxy type, expecting one of '</span> + PROXY_TYPES.toString())
    }
    <span class="hljs-comment">// 加载默认的 Hooks</span>
    <span class="hljs-keyword">const</span> { onRequestNoOp, onResponse } = require(<span class="hljs-string">'./lib/default-hooks'</span>)[proxyType]
    <span class="hljs-comment">// 加载自定义的 Hooks，允许开发者拦截并响应自己的 Hooks</span>
    route.hooks = route.hooks || {}
    route.hooks.onRequest = route.hooks.onRequest || onRequestNoOp
    route.hooks.onResponse = route.hooks.onResponse || onResponse
    <span class="hljs-comment">// 加载中间件，允许开发者自己传入自定义中间件</span>
    route.middlewares = route.middlewares || []
    <span class="hljs-comment">// 支持正则形式的 route path</span>
    route.pathRegex = undefined === route.pathRegex ? opts.pathRegex : String(route.pathRegex)
    <span class="hljs-comment">// 使用 proxyFactory 创建一个 proxy 实例</span>
    <span class="hljs-keyword">const</span> proxy = proxyFactory({ opts, route, proxyType })
    <span class="hljs-comment">// 允许开发者自定义传入一个 proxyHandler，否则使用默认的 defaultProxyHandler</span>
    <span class="hljs-keyword">const</span> proxyHandler = route.proxyHandler || defaultProxyHandler
    <span class="hljs-comment">// 设置超时时间</span>
    route.timeout = route.timeout || opts.timeout
    <span class="hljs-keyword">const</span> methods = route.methods || DEFAULT_METHODS
    <span class="hljs-keyword">const</span> args = [
      <span class="hljs-comment">// path</span>
      route.prefix + route.pathRegex,
      <span class="hljs-comment">// route middlewares</span>
      ...route.middlewares,
      <span class="hljs-comment">// 相关 handler 函数</span>
      handler(route, proxy, proxyHandler)
    ]
    methods.forEach(method =&gt; {
      method = method.toLowerCase()
      <span class="hljs-keyword">if</span> (server[method]) {
        server[method].apply(server, args)
      }
    })
  })
  <span class="hljs-keyword">return</span> server
}
<span class="hljs-keyword">const</span> handler = (route, proxy, proxyHandler) =&gt; async (req, res, next) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// 支持 urlRewrite 配置</span>
    req.url = route.urlRewrite
      ? route.urlRewrite(req)
      : req.url.replace(route.prefix, route.prefixRewrite)
    <span class="hljs-keyword">const</span> shouldAbortProxy = await route.hooks.onRequest(req, res)
    <span class="hljs-comment">// 如果 onRequest hooks 返回一个 falsy 值，则执行 proxyHandler，否则停止代理</span>
    <span class="hljs-keyword">if</span> (!shouldAbortProxy) {
      <span class="hljs-keyword">const</span> proxyOpts = Object.assign({
        request: {
          timeout: req.timeout || route.timeout
        },
        queryString: req.query
      }, route.hooks)
      proxyHandler(req, res, req.url, proxy, proxyOpts)
    }
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-keyword">return</span> next(err)
  }
}
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = gateway
</code></pre>
<p data-nodeid="31128">上述代码主要流程并不复杂，我已经加入了相应的注释。<code data-backticks="1" data-nodeid="31373">gateway</code>函数是整个网关的入口，包含了所有核心流程。这里我们对<code data-backticks="1" data-nodeid="31375">proxyFactory</code>函数进行简单梳理：</p>
<pre class="lang-java" data-nodeid="31129"><code data-language="java"><span class="hljs-keyword">const</span> fastProxy = require(<span class="hljs-string">'fast-proxy'</span>)
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = ({ proxyType, opts, route }) =&gt; {
  let proxy = fastProxy({
      base: opts.targetOverride || route.target,
      http2: !!route.http2,
      ...(route.fastProxy)
    }).proxy
  <span class="hljs-keyword">return</span> proxy
}
</code></pre>
<p data-nodeid="31130">如上代码所示，我们使用了<code data-backticks="1" data-nodeid="31378">fast-proxy</code>库，并支持开发者以<code data-backticks="1" data-nodeid="31380">fastProxy</code>字段进行对<code data-backticks="1" data-nodeid="31382">fast-proxy</code>库的配置。具体配置信息你可以参考<code data-backticks="1" data-nodeid="31384">fast-proxy</code>库，这里我们不再展开。</p>
<p data-nodeid="31131">其实通过以上代码分析，我们已经把大体流程梳理了一遍。但是上述代码只实现了基础的代理功能，只是网关的一部分能力。接下来，我们从网关扩展层面，继续了解网关的设计和实现。</p>
<h4 data-nodeid="31132">中间件</h4>
<p data-nodeid="31133">中间件化思想已经渗透到前端编程理念中，开发者颇为受益。中间件能够帮助我们在解耦合的基础上，实现能力扩展。</p>
<p data-nodeid="31134">我们来看看这个网关的中间件能力，如下代码：</p>
<pre class="lang-java" data-nodeid="31135"><code data-language="java"><span class="hljs-keyword">const</span> rateLimit = require(<span class="hljs-string">'express-rate-limit'</span>)
<span class="hljs-keyword">const</span> requestIp = require(<span class="hljs-string">'request-ip'</span>)
gateway({
  <span class="hljs-comment">// 定义一个全局中间件</span>
  middlewares: [
    <span class="hljs-comment">// 记录访问 IP</span>
    (req, res, next) =&gt; {
      req.ip = requestIp.getClientIp(req)
      <span class="hljs-keyword">return</span> next()
    },
    <span class="hljs-comment">// 使用 RateLimit 模块</span>
    rateLimit({
      <span class="hljs-comment">// 1 分钟窗口期</span>
      windowMs: <span class="hljs-number">1</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>, <span class="hljs-comment">// 1 minutes</span>
      <span class="hljs-comment">// 在窗口期内，同一个 IP 只允许访问 60 次</span>
      max: <span class="hljs-number">60</span>,
      handler: (req, res) =&gt; res.send(<span class="hljs-string">'Too many requests, please try again later.'</span>, <span class="hljs-number">429</span>)
    })
  ],
  <span class="hljs-comment">// downstream 服务代理</span>
  routes: [{
    prefix: <span class="hljs-string">'/public'</span>,
    target: <span class="hljs-string">'http://localhost:3000'</span>
  }, {
    <span class="hljs-comment">// ...</span>
  }]
})
</code></pre>
<p data-nodeid="31136">上面代码中，我们实现了两个中间件。第一个中间通过<a href="https://www.npmjs.com/package/request-ip?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31393">request-ip</a>这个库获取访问的真实 IP 地址，并将 IP 值挂载在 req 对象上。第二个中间件通过<a href="https://www.npmjs.com/package/express-rate-limit?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31397">express-rate-limit</a>进行“在窗口期内，同一个 IP 只允许访问 60 次”的限流策略。因为<a href="https://www.npmjs.com/package/express-rate-limit?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31401">express-rate-limit</a>库默认使用<code data-backticks="1" data-nodeid="31403">req.ip</code>作为<a href="https://github.com/nfriedly/express-rate-limit/blob/master/lib/express-rate-limit.js#L16?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31407">keyGenerator</a>，所以我们的第一个中间件将 IP 记录在了<code data-backticks="1" data-nodeid="31409">req.ip</code>上面。</p>
<p data-nodeid="31137">这是一个简单的运用中间件实现限流的案例，开发者可以通过自己动手实现，或依赖其他库实现相关策略。</p>
<h4 data-nodeid="31138">缓存策略</h4>
<p data-nodeid="31139">缓存能够有效提升网关对于请求的处理能力和吞吐量。我们的网关设计支持了多种缓存方案，如下代码是一个使用 Node 内存缓存的案例：</p>
<pre class="lang-java" data-nodeid="31140"><code data-language="java"><span class="hljs-comment">// 使用 http-cache-middleware 作为缓存中间件</span>
<span class="hljs-keyword">const</span> cache = require(<span class="hljs-string">'http-cache-middleware'</span>)()
<span class="hljs-comment">// enable http cache middleware</span>
<span class="hljs-keyword">const</span> gateway = require(<span class="hljs-string">'fast-gateway'</span>)
<span class="hljs-keyword">const</span> server = gateway({
  middlewares: [cache],
  routes: [...]
})
</code></pre>
<p data-nodeid="31141">如果不担心缓存数据的丢失，即缓存数据不需要持久化，且只有一个网关实例，使用内存缓存是一个很好的选择。</p>
<p data-nodeid="31142">当然，也支持使用 Redis 进行缓存，如下代码：</p>
<pre class="lang-java" data-nodeid="31143"><code data-language="java"><span class="hljs-comment">// 初始化 Redis</span>
<span class="hljs-keyword">const</span> CacheManager = require(<span class="hljs-string">'cache-manager'</span>)
<span class="hljs-keyword">const</span> redisStore = require(<span class="hljs-string">'cache-manager-ioredis'</span>)
<span class="hljs-keyword">const</span> redisCache = CacheManager.caching({
  store: redisStore,
  db: <span class="hljs-number">0</span>,
  host: <span class="hljs-string">'localhost'</span>,
  port: <span class="hljs-number">6379</span>,
  ttl: <span class="hljs-number">30</span>
})
<span class="hljs-comment">// 缓存中间件</span>
<span class="hljs-keyword">const</span> cache = require(<span class="hljs-string">'http-cache-middleware'</span>)({
  stores: [redisCache]
})
<span class="hljs-keyword">const</span> gateway = require(<span class="hljs-string">'fast-gateway'</span>)
<span class="hljs-keyword">const</span> server = gateway({
  middlewares: [cache],
  routes: [...]
})
</code></pre>
<p data-nodeid="31144">在网关的设计中，我们依赖了<a href="https://github.com/jkyberneees/http-cache-middleware?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31419">http-cache-middleware</a>库作为缓存，参考其<a href="http://http-cache-middleware?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="31423">源码</a>，我们可以看到缓存使用了<code data-backticks="1" data-nodeid="31425">req.method + req.url + cacheAppendKey</code>作为缓存的 key，<code data-backticks="1" data-nodeid="31427">cacheAppendKey</code>出自<code data-backticks="1" data-nodeid="31429">req</code>对象，因此开发者可以通过设置<code data-backticks="1" data-nodeid="31431">req.cacheAppendKey = (req) =&gt; req.user.id</code>的方式，自定义缓存 key。</p>
<p data-nodeid="31145">当然，我们可以对某个接口 Endpoint 禁用缓存，这也是通过中间件实现的：</p>
<pre class="lang-java" data-nodeid="31146"><code data-language="java">routes: [{
  prefix: <span class="hljs-string">'/users'</span>,
  target: <span class="hljs-string">'http://localhost:3000'</span>,
  middlewares: [(req, res, next) =&gt; {
    req.cacheDisabled = <span class="hljs-function"><span class="hljs-keyword">true</span>
    return <span class="hljs-title">next</span><span class="hljs-params">()</span>
  }]
}]
</span></code></pre>
<h4 data-nodeid="31147">Hooks 设计</h4>
<p data-nodeid="31148">有了中间件还不够，我们还可以以 Hooks 的方式，允许开发者介入网关处理流程。比如以下代码：</p>
<pre class="lang-java" data-nodeid="31149"><code data-language="java"><span class="hljs-keyword">const</span> { multipleHooks } = require(<span class="hljs-string">'fg-multiple-hooks'</span>)
<span class="hljs-keyword">const</span> hook1 = async (req, res) =&gt; {
  console.log(<span class="hljs-string">'hook1 with logic 1 called'</span>)
  <span class="hljs-comment">// 返回 falsy 值，不会阻断请求处理流程</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
}
<span class="hljs-keyword">const</span> hook2 = async (req, res) =&gt; {
  console.log(<span class="hljs-string">'hook2 with logic 2 called'</span>)
  <span class="hljs-keyword">const</span> shouldAbort = <span class="hljs-function"><span class="hljs-keyword">true</span>
  <span class="hljs-title">if</span> <span class="hljs-params">(shouldAbort)</span> </span>{
    res.send(<span class="hljs-string">'handle a rejected request here'</span>)
  }
  <span class="hljs-comment">// 返回 true，则终端处理流程</span>
  <span class="hljs-keyword">return</span> shouldAbort
}
gateway({
  routes: [{
    prefix: <span class="hljs-string">'/service'</span>,
    target: <span class="hljs-string">'http://127.0.0.1:3000'</span>,
    hooks: {
    	<span class="hljs-comment">// 使用多个 Hooks 函数，处理 onRequest</span>
      onRequest: (req, res) =&gt; multipleHooks(req, res, hook1, hook2), 
      rewriteHeaders (handlers) {
      	<span class="hljs-comment">// 可以在这里设置 response header</span>
      	<span class="hljs-keyword">return</span> headers
      }
      <span class="hljs-comment">// 使用多个 Hooks 函数，处理 onResponse</span>
      onResponse (req, res, stream) {
        
      }
    }
  }]
}).start(PORT).then(server =&gt; {
  console.log(`API Gateway listening on ${PORT} port!`)
})
</code></pre>
<p data-nodeid="31150">对应源码处理相应的 Hooks 流程已经在前面部分有所涉及，这里不再一一展开。</p>
<p data-nodeid="31151">最后，我们再通过一个实现负载均衡的场景，来加强对该网关的设计理解，如下代码：</p>
<pre class="lang-java" data-nodeid="31152"><code data-language="java"><span class="hljs-keyword">const</span> gateway = require(<span class="hljs-string">'../index'</span>)
<span class="hljs-keyword">const</span> { P2cBalancer } = require(<span class="hljs-string">'load-balancers'</span>)
<span class="hljs-keyword">const</span> targets = [
  <span class="hljs-string">'http://localhost:3000'</span>,
  <span class="hljs-string">'xxxxx'</span>,
  <span class="hljs-string">'xxxxxxx'</span>
]
<span class="hljs-keyword">const</span> balancer = <span class="hljs-keyword">new</span> P2cBalancer(targets.length)
gateway({
  routes: [{
    <span class="hljs-comment">// 自定义 proxyHandler</span>
    proxyHandler: (req, res, url, proxy, proxyOpts) =&gt; {
      <span class="hljs-comment">// 使用 P2cBalancer 实例进行负载均衡</span>
      <span class="hljs-keyword">const</span> target = targets[balancer.pick()]
      <span class="hljs-keyword">if</span> (typeof target === <span class="hljs-string">'string'</span>) {
        proxyOpts.base = target
      } <span class="hljs-keyword">else</span> {
        proxyOpts.onResponse = onResponse
        proxyOpts.onRequest = onRequestNoOp
        proxy = target
      }
      <span class="hljs-keyword">return</span> proxy(req, res, url, proxyOpts)
    },
    prefix: <span class="hljs-string">'/balanced'</span>
  }]
})
</code></pre>
<p data-nodeid="31153">通过如上代码我们看出，网关的设计既支持默认的 proxyHandler，又支持开发者自定义的 proxyHandler，对于自定义的 proxyHandler，网关层面提供：</p>
<ul data-nodeid="31154">
<li data-nodeid="31155">
<p data-nodeid="31156">req</p>
</li>
<li data-nodeid="31157">
<p data-nodeid="31158">res</p>
</li>
<li data-nodeid="31159">
<p data-nodeid="31160">req.url</p>
</li>
<li data-nodeid="31161">
<p data-nodeid="31162">proxy</p>
</li>
<li data-nodeid="31163">
<p data-nodeid="31164">proxyOpts</p>
</li>
</ul>
<p data-nodeid="31165">相关参数，方便开发者发挥。</p>
<p data-nodeid="31166">至此，我们就从源码和设计层面对一个成熟的网关实现进行了解析。你可以结合源码进行学习。</p>
<h3 data-nodeid="31167">总结</h3>
<p data-nodeid="31168">这一讲我们深入讲解了 Node.js 另外一个重要的应用场景：企业级 BFF 网关。我们详细介绍了 BFF 网关的优缺点、打造 BFF 网关需要考虑的问题。总之，设计一个良好的 BFF 网关，要求开发者具有较强的综合能力。接下来我们实现一个精简的网关系统，并结合源码和设计层面对其实现进行了解析，帮助你深入了解网关的构建。</p>
<p data-nodeid="35007" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image6/M00/21/5C/CioPOWBURoyAGqyFAAdwJg_hSMw100.png" alt="Drawing 2.png" data-nodeid="35010"></p>


<p data-nodeid="31171">事实上，BFF 网关理念已经完全被业界接受，业界著名的网关包括但不限于：</p>
<ul data-nodeid="31172">
<li data-nodeid="31173">
<p data-nodeid="31174">Netflix API Gateway: Zuul</p>
</li>
<li data-nodeid="31175">
<p data-nodeid="31176">Amazon AWS 网关</p>
</li>
<li data-nodeid="31177">
<p data-nodeid="31178">Kong Gateway</p>
</li>
<li data-nodeid="31179">
<p data-nodeid="31180">SwaggerHub</p>
</li>
<li data-nodeid="31181">
<p data-nodeid="31182">Express API Gateway</p>
</li>
<li data-nodeid="31183">
<p data-nodeid="31184">Azure API Gateway</p>
</li>
</ul>
<p data-nodeid="31185">作为前端开发者，向 BFF 进军是一个有趣且必要的发展方向。</p>
<p data-nodeid="31186">另外，Serverless 是一种无服务器架构，它的弹性伸缩、按需使用、无运维等特性都是未来的发展方向。而 Serverless 结合 BFF 网关设计理念，业界也推出了 SFF（Serverless For Frontend）的概念。</p>
<p data-nodeid="31187">其实，这些概念万变不离其宗，掌握了 BFF 网关，能够设计一个高可用的网关层，会让你在技术上收获颇多，同时也能为业务带来更大的收益。</p>
<p data-nodeid="31188">下一讲，我们就迎来了课程的最后内容——实现高可用：使用 Puppeteer 生成性能最优的海报系统。我们将介绍 Puppeteer 的各种应用场景，并重点讲解基于 Puppeteer 设计实现的海报服务系统。下节内容同样精彩，请你继续阅读。</p>

---

### 精选评论

##### **扬：
> 老师请问 数据聚合和裁剪，">Node.js 调用 RPC 在这个BFF 网关库中如何使用呢

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以看看各 rpc 的 node client 版本

##### **翔：
> BFF 层是否要包含部分逻辑处理

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 可以包含，具体要看是什么逻辑

##### **3336：
> 老师真的太厉害了，偶像🤩

