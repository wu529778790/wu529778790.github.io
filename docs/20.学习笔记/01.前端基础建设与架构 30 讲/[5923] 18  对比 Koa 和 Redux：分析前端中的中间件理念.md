<p data-nodeid="83997" class="">上一讲，我们通过分析 axios 源码，延伸了“如何设计一个请求公共库”，其中提到了不同层次级别的分层理念。这一讲，我们继续讨论代码设计这一话题，聚焦中间件化和插件化理念。并通过实现一个中间件化的请求库和上一节内容融会贯通。</p>
<h3 data-nodeid="83998">以 Koa 为代表的 Node.js 中间件化设计</h3>
<p data-nodeid="83999">说到中间件，很多开发者都会想到 Koa.js，其中间件设计无疑是前端中间件思想的典型代表之一。我们先来剖析 Koa.js 的设计和实现。</p>
<p data-nodeid="84000">先来看一下 Koa.js 中间件的实现和应用：</p>
<pre class="lang-java" data-nodeid="84001"><code data-language="java"><span class="hljs-comment">// 最外层中间件，可以用于兜底 Koa 全局错误</span>
app.use(async (ctx, next) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// console.log('中间件 1 开始执行')</span>
    <span class="hljs-comment">// 执行下一个中间件</span>
    <span class="hljs-function">await <span class="hljs-title">next</span><span class="hljs-params">()</span></span>;
    <span class="hljs-comment">// console.log('中间件 1 执行结束')</span>
  } <span class="hljs-keyword">catch</span> (error) {
    console.log(`[koa error]: ${error.message}`)
  }
});
<span class="hljs-comment">// 第二层中间件，可以用于日志记录</span>
app.use(async (ctx, next) =&gt; {
  <span class="hljs-comment">// console.log('中间件 2 开始执行')</span>
  <span class="hljs-keyword">const</span> { req } = ctx;
  console.log(`req is ${JSON.stringify(req)}`);
  <span class="hljs-function">await <span class="hljs-title">next</span><span class="hljs-params">()</span></span>;
  console.log(`res is ${JSON.stringify(ctx.res)}`);
  <span class="hljs-comment">// console.log('中间件 2 执行结束')</span>
});
</code></pre>
<p data-nodeid="84002">如上代码，我们看 Koa 实例，通过<code data-backticks="1" data-nodeid="84120">use</code>方法注册和串联中间件，其源码实现部分精简表述为：</p>
<pre class="lang-java" data-nodeid="84003"><code data-language="java">use(fn) {
    <span class="hljs-keyword">this</span>.middleware.push(fn);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
</code></pre>
<p data-nodeid="84004">如上代码，我们的中间件被存储进<code data-backticks="1" data-nodeid="84123">this.middleware</code>数组中，那么中间件是如何被执行的呢？参考下面源码：</p>
<pre class="lang-java" data-nodeid="84005"><code data-language="java"><span class="hljs-comment">// 通过 createServer 方法启动一个 Node.js 服务</span>
listen(...args) {
    <span class="hljs-keyword">const</span> server = http.createServer(<span class="hljs-keyword">this</span>.callback());
    <span class="hljs-keyword">return</span> server.listen(...args);
}
</code></pre>
<p data-nodeid="84006">Koa 框架通过 <code data-backticks="1" data-nodeid="84126">http</code> 模块的 <code data-backticks="1" data-nodeid="84128">createServer</code> 方法创建一个 Node.js 服务，并传入 this.callback() 方法， this.callback() 方法源码精简实现如下：</p>
<pre class="lang-java" data-nodeid="84007"><code data-language="java">callback() {
    <span class="hljs-comment">// 从 this.middleware 数组中，组合中间件</span>
    <span class="hljs-keyword">const</span> fn = compose(<span class="hljs-keyword">this</span>.middleware);

    <span class="hljs-comment">// handleRequest 方法作为 `http` 模块的 `createServer` 方法参数，该方法通过 `createContext` 封装了 `http.createServer` 中的 `request` 和 `response`对象，并将这两个对象放到 ctx 中</span>
    <span class="hljs-keyword">const</span> handleRequest = (req, res) =&gt; {
        <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>.createContext(req, res);
        <span class="hljs-comment">// 将 ctx 和组合后的中间件函数 fn 传递给 this.handleRequest 方法</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.handleRequest(ctx, fn);
    };

    <span class="hljs-keyword">return</span> handleRequest;
}
handleRequest(ctx, fnMiddleware) {
    <span class="hljs-keyword">const</span> res = ctx.res;
    res.statusCode = <span class="hljs-number">404</span>;
    <span class="hljs-keyword">const</span> onerror = err =&gt; ctx.onerror(err);
    <span class="hljs-keyword">const</span> handleResponse = () =&gt; respond(ctx);
    <span class="hljs-comment">// on-finished npm 包提供的方法，该方法在一个 HTTP 请求 closes，finishes 或者 errors 时执行</span>
    onFinished(res, onerror);
    <span class="hljs-comment">// 将 ctx 对象传递给中间件函数 fnMiddleware</span>
    <span class="hljs-keyword">return</span> fnMiddleware(ctx).then(handleResponse).<span class="hljs-keyword">catch</span>(onerror);
}
</code></pre>
<p data-nodeid="84008">如上代码，我们将 Koa 一个中间件组合和执行流程梳理为以下步骤。</p>
<ol data-nodeid="84009">
<li data-nodeid="84010">
<p data-nodeid="84011">通过<code data-backticks="1" data-nodeid="84132">compose</code>方法组合各种中间件，返回一个中间件组合函数<code data-backticks="1" data-nodeid="84134">fnMiddleware</code></p>
</li>
<li data-nodeid="84012">
<p data-nodeid="84013">请求过来时，会先调用<code data-backticks="1" data-nodeid="84136">handleRequest</code>方法，该方法完成：</p>
<ul data-nodeid="84014">
<li data-nodeid="84015">
<p data-nodeid="84016">调用<code data-backticks="1" data-nodeid="84139">createContext</code>方法，对该次请求封装出一个<code data-backticks="1" data-nodeid="84141">ctx</code>对象；</p>
</li>
<li data-nodeid="84017">
<p data-nodeid="84018">接着调用<code data-backticks="1" data-nodeid="84144">this.handleRequest(ctx, fnMiddleware)</code>处理该次请求。</p>
</li>
</ul>
</li>
<li data-nodeid="84019">
<p data-nodeid="84020">通过<code data-backticks="1" data-nodeid="84147">fnMiddleware(ctx).then(handleResponse).catch(onerror)</code>执行中间件。</p>
</li>
</ol>
<p data-nodeid="84021">其中，一个核心过程就是使用<code data-backticks="1" data-nodeid="84150">compose</code>方法组合各种中间件，其源码实现精简为：</p>
<pre class="lang-java" data-nodeid="84022"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">compose</span><span class="hljs-params">(middleware)</span> </span>{
    <span class="hljs-comment">// 这里返回的函数，就是上文中的 fnMiddleware</span>
    <span class="hljs-keyword">return</span> function (context, next) {
        let index = -<span class="hljs-number">1</span>
        <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>)

        <span class="hljs-function">function <span class="hljs-title">dispatch</span><span class="hljs-params">(i)</span> </span>{
        	  <span class="hljs-comment">// </span>
            <span class="hljs-keyword">if</span> (i &lt;= index) <span class="hljs-keyword">return</span> Promise.reject(<span class="hljs-keyword">new</span> Error(<span class="hljs-string">'next() called multiple times'</span>))
            index = i
            <span class="hljs-comment">// 取出第 i 个中间件为 fn</span>
            let fn = middleware[i]

            <span class="hljs-keyword">if</span> (i === middleware.length) fn = next

            <span class="hljs-comment">// 已经取到了最后一个中间件，直接返回一个 Promise 实例，进行串联</span>
            <span class="hljs-comment">// 这一步的意义是保证最后一个中间件调用 next 方法时，也不会报错</span>
            <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> Promise.resolve()

            <span class="hljs-keyword">try</span> {
                <span class="hljs-comment">// 把 ctx 和 next 方法传入到中间件 fn 中，并将执行结果使用 Promise.resolve 包装</span>
                <span class="hljs-comment">// 这里可以发现，我们在一个中间件中调用的 next 方法，其实就是dispatch.bind(null, i + 1)，即调用下一个中间件</span>
                <span class="hljs-keyword">return</span> Promise.resolve(fn(context, dispatch.bind(<span class="hljs-keyword">null</span>, i + <span class="hljs-number">1</span>)));
            } <span class="hljs-keyword">catch</span> (err) {
                <span class="hljs-keyword">return</span> Promise.reject(err)
            }
        }
    }
}
</code></pre>
<p data-nodeid="84023">源码实现中我已加入了相关注释，如果对于你来说还是晦涩难懂，不妨看一下下面这个 hard coding 的例子，通过下面代码，表示三个 Koa 中间件的执行情况：</p>
<pre class="lang-java" data-nodeid="84024"><code data-language="java"><span class="hljs-function">async function <span class="hljs-title">middleware1</span><span class="hljs-params">()</span> </span>{
  ...
  await (<span class="hljs-function">async function <span class="hljs-title">middleware2</span><span class="hljs-params">()</span> </span>{
    ...
    await (<span class="hljs-function">async function <span class="hljs-title">middleware3</span><span class="hljs-params">()</span> </span>{
      ...
    });
    ...
  });
  ...
}
</code></pre>
<p data-nodeid="84025">这里我们来做一个简单的总结：</p>
<ul data-nodeid="84026">
<li data-nodeid="84027">
<p data-nodeid="84028">Koa 的中间件机制被社区形象地总结为洋葱模型；</p>
</li>
</ul>
<blockquote data-nodeid="84029">
<p data-nodeid="84030">所谓洋葱模型，就是指每一个 Koa 中间件都是一层洋葱圈，它即可以掌管请求进入，也可以掌管响应返回。换句话说：外层的中间件可以影响内层的请求和响应阶段，内层的中间件只能影响外层的响应阶段。</p>
</blockquote>
<ul data-nodeid="84031">
<li data-nodeid="84032">
<p data-nodeid="84033"><code data-backticks="1" data-nodeid="84156">dispatch(n)</code>对应第 n 个中间件的执行，第 n 个中间件可以通过<code data-backticks="1" data-nodeid="84158">await next()</code>来执行下一个中间件，同时在最后一个中间件执行完成后，依然有恢复执行的能力。即，通过洋葱模型，<code data-backticks="1" data-nodeid="84160">await next()</code>控制调用 “下游”中间件，直到 “下游”没有中间件且堆栈执行完毕，最终流回“上游”中间件。这种方式有个优点，特别是<strong data-nodeid="84166">对于日志记录以及错误处理等需要非常友好</strong>。</p>
</li>
</ul>
<p data-nodeid="84034">这里我们稍微做一下扩展，引申出 Koa v1 版本中中间件的实现，Koa1 的中间件实现利用了 <strong data-nodeid="84176">Generator 函数 + co 库</strong>（一种基于 Promise 的 Generator 函数流程管理工具），来实现协程运行。本质上，Koa v1 版本中间件和 Koa v2 版本中间件思想是类似的，只不过 Koa v2 主要是用了 <strong data-nodeid="84177">Async/Await</strong> 来替换 Generator 函数 + co 库，整体实现更加巧妙，代码更加优雅、简易。</p>
<h3 data-nodeid="84035">对比 Express，再谈 Koa 中间件</h3>
<p data-nodeid="84036">说起 Node.js 框架，我们自然忘不了 Express.js。它的中间件机制同样值得我们学习、比对。Express 不同于 Koa，它继承了<strong data-nodeid="84188">路由、静态服务器和模板引擎等功能</strong>，因此看上去比 Koa 更像是一个框架。通过学习 <a href="https://github.com/expressjs/express" data-nodeid="84186">Express 源码</a>，我们可以总结出它的工作机制。</p>
<ol data-nodeid="84037">
<li data-nodeid="84038">
<p data-nodeid="84039">通过<code data-backticks="1" data-nodeid="84190">app.use</code>方法注册中间件。</p>
</li>
<li data-nodeid="84040">
<p data-nodeid="84041">一个中间件可以理解为一个 Layer 对象，其中包含了当前路由匹配的正则信息以及 handle 方法。</p>
</li>
<li data-nodeid="84042">
<p data-nodeid="84043">所有中间件（Layer 对象）使用<code data-backticks="1" data-nodeid="84194">stack</code>数组存储起来。</p>
</li>
<li data-nodeid="84044">
<p data-nodeid="84045">因此，每个 Router 对象都是通过一个<code data-backticks="1" data-nodeid="84197">stack</code>数组，存储了相关中间件函数。</p>
</li>
<li data-nodeid="84046">
<p data-nodeid="84047">当一个请求过来时，会从 REQ 中获取请求 path，根据 path 从<code data-backticks="1" data-nodeid="84200">stack</code>中找到匹配的 Layer，具体匹配过程由<code data-backticks="1" data-nodeid="84202">router.handle</code>函数实现。</p>
</li>
<li data-nodeid="84048">
<p data-nodeid="84049"><code data-backticks="1" data-nodeid="84204">router.handle</code>函数通过<code data-backticks="1" data-nodeid="84206">next()</code>方法遍历每一个 layer 进行比对：</p>
<ol data-nodeid="84050">
<li data-nodeid="84051">
<p data-nodeid="84052"><code data-backticks="1" data-nodeid="84208">next()</code>方法通过闭包维持了对于 Stack Index 游标的引用，当调用<code data-backticks="1" data-nodeid="84210">next()</code>方法时，就会从下一个中间件开始查找；</p>
</li>
<li data-nodeid="84053">
<p data-nodeid="84054">如果比对结果为 true，则调用<code data-backticks="1" data-nodeid="84213">layer.handle_request</code>方法，<code data-backticks="1" data-nodeid="84215">layer.handle_request</code>方法中会调用<code data-backticks="1" data-nodeid="84217">next()</code>方法 ，实现中间件的执行。</p>
</li>
</ol>
</li>
</ol>
<p data-nodeid="84055">我们将上述过程总结为下图，帮助你理解：</p>
<p data-nodeid="84333" class=""><img src="https://s0.lgstatic.com/i/image6/M00/03/C9/Cgp9HWAfsPuAMXAzAAIE4xCY0WY258.png" alt="202127-92025.png" data-nodeid="84337"></p>
<div data-nodeid="84334"><p style="text-align:center">Express 工作机制</p></div>


<p data-nodeid="84058">通过上述内容，我们可以看到，Express 的<code data-backticks="1" data-nodeid="84224">next()</code>方法维护了遍历中间件列表的 Index 游标，中间件每次调用<code data-backticks="1" data-nodeid="84226">next()</code>方法时，会通过<strong data-nodeid="84232">增加 Index 游标的方式</strong>找到下一个中间件并执行。我们采用类似的 hard coding 形式帮助大家理解 Express 插件作用机制：</p>
<pre class="lang-java" data-nodeid="84059"><code data-language="java">((req, res) =&gt; {
  console.log(<span class="hljs-string">'第一个中间件'</span>);
  ((req, res) =&gt; {
    console.log(<span class="hljs-string">'第二个中间件'</span>);
    (async(req, res) =&gt; {
      console.log(<span class="hljs-string">'第三个中间件 =&gt; 是一个 route 中间件，处理 /api/test1'</span>);
      <span class="hljs-function">await <span class="hljs-title">sleep</span><span class="hljs-params">(<span class="hljs-number">2000</span>)</span>
      res.<span class="hljs-title">status</span><span class="hljs-params">(<span class="hljs-number">200</span>)</span>.<span class="hljs-title">send</span><span class="hljs-params">(<span class="hljs-string">'hello'</span>)</span>
    })<span class="hljs-params">(req, res)</span>
    console.<span class="hljs-title">log</span><span class="hljs-params">(<span class="hljs-string">'第二个中间件调用结束'</span>)</span></span>;
  })(req, res)
  console.log(<span class="hljs-string">'第一个中间件调用结束'</span>)
})(req, res)
</code></pre>
<p data-nodeid="84060">如上代码，Express 中间件设计并不是一个洋葱模型，它是基于回调实现的线形模型，不利于组合，不利于互操，在设计上并不像 Koa 一样简单。如果想实现一个记录请求响应的中间件，就需要：</p>
<pre class="lang-java" data-nodeid="84061"><code data-language="java">var express = require('express')
var app = express()
var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
app.use(requestTime)
app.get('/', function (req, res) {
  var responseText = 'Hello World!&lt;br&gt;

'
  responseText += '&lt;small&gt;Requested at: ' + req.requestTime + '&lt;/small&gt;'
  res.send(responseText)
})
app.listen(3000)
</code></pre>
<p data-nodeid="84062">我们可以看到，上述实现就对业务代码有一定程度的侵扰，甚至会造成不同中间件间的耦合。</p>
<p data-nodeid="84063">我们回退到“上帝视角”发现，毫无疑问 Koa 的洋葱模型更加先进，而<strong data-nodeid="84240">Express 的线形机制不容易实现拦截处理逻辑</strong>：比如异常处理和统计响应时间——这在 Koa 里，一般只需要一个中间件就能全部搞定。</p>
<p data-nodeid="84064">当然，Koa 本身只提供了 HTTP 模块和洋葱模型的最小封装，Express 是一种更高形式的抽象，其设计思路和面向目标也有不同。</p>
<h3 data-nodeid="84065">Redux 中间件设计和实现</h3>
<p data-nodeid="84066">通过前文，我们了解了 Node.js 两个当红框架的中间件设计，我们再换一个角度：从 Redux 这个状态管理方案的中间件设计，了解更全面的中间件系统。</p>
<p data-nodeid="84067">类似 Koa 中的 koa-compose 实现，Redux 也实现了一个<code data-backticks="1" data-nodeid="84245">compose</code>方法，完成中间件的注册和串联：</p>
<pre class="lang-java" data-nodeid="84068"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">compose</span><span class="hljs-params">(...funcs: Function[])</span> </span>{
	<span class="hljs-keyword">return</span> funcs.reduce((a, b) =&gt; (...args: any) =&gt; a(b(...args)));
}
</code></pre>
<p data-nodeid="84069"><code data-backticks="1" data-nodeid="84247">compose</code>方法的执行效果如下代码：</p>
<pre class="lang-java" data-nodeid="84070"><code data-language="java">compose([fn1, fn2, fn3])(args)
=&gt;
compose(fn1, fn2, fn3) (...args) = &gt; fn1(fn2(fn3(...args)))
</code></pre>
<p data-nodeid="84071">简单来说，<code data-backticks="1" data-nodeid="84250">compose</code>方法是一种高阶聚合，先执行 fn3，并将执行结果作为参数传给 fn2，以此类推。我们使用 Redux 创建一个 store 时，完成对<code data-backticks="1" data-nodeid="84252">compose</code>方法的调用，Redux 精简源码类比为：</p>
<pre class="lang-java" data-nodeid="84072"><code data-language="java"><span class="hljs-comment">// 这是一个简单的打日志中间件</span>
<span class="hljs-function">function <span class="hljs-title">logger</span><span class="hljs-params">({ getState, dispatch })</span> </span>{
    <span class="hljs-comment">// next 代表下一个中间件包装过后的 dispatch 方法，action 表示当前接收到的动作</span>
    <span class="hljs-keyword">return</span> next =&gt; action =&gt; {
        console.log(<span class="hljs-string">"before change"</span>, action);
        <span class="hljs-comment">// 调用下一个中间件包装的 dispatch </span>
        let val = next(action);
        console.log(<span class="hljs-string">"after change"</span>, getState(), val);
        <span class="hljs-keyword">return</span> val;
    };
}
<span class="hljs-comment">// 使用 logger 中间件，创建一个增强的 store</span>
let createStoreWithMiddleware = Redux.applyMiddleware(logger)(Redux.createStore)
<span class="hljs-function">function <span class="hljs-title">applyMiddleware</span><span class="hljs-params">(...middlewares)</span> </span>{
  <span class="hljs-comment">// middlewares 为中间件列表，返回一个接受原始 createStore 方法（Redux.createStore）作为参数的函数</span>
  <span class="hljs-keyword">return</span> createStore =&gt; (...args) =&gt; {
    <span class="hljs-comment">// 创建原始的 store</span>
    <span class="hljs-keyword">const</span> store = createStore(...args)
    <span class="hljs-comment">// 每个中间件都会被传入 middlewareAPI 对象，作为中间件参数</span>
    <span class="hljs-keyword">const</span> middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) =&gt; dispatch(...args)
    }

    <span class="hljs-comment">// 给每个中间件传入 middlewareAPI 参数</span>
    <span class="hljs-comment">// 中间件的统一模板为 next =&gt; action =&gt; next(action) 格式</span>
    <span class="hljs-comment">// chain 中保存的都是 next =&gt; action =&gt; {next(action)} 的方法</span>
    <span class="hljs-keyword">const</span> chain = middlewares.map(middleware =&gt; middleware(middlewareAPI))

    <span class="hljs-comment">// 传入最原始 store.dispatch 方法，作为 compose 二级参数，compose 方法最终返回一个增强的dispatch 方法</span>
    dispatch = compose(...chain)(store.dispatch)

    <span class="hljs-keyword">return</span> {
      ...store,
      dispatch  <span class="hljs-comment">// 返回一个增强版的 dispatch</span>
    }
  }
}
</code></pre>
<p data-nodeid="84073">如上代码，我们将 Redux 中间件特点总结为：</p>
<ul data-nodeid="84074">
<li data-nodeid="84075">
<p data-nodeid="84076">Redux 中间件接收<code data-backticks="1" data-nodeid="84256">getState</code>和<code data-backticks="1" data-nodeid="84258">dispatch</code>两个方法组成的对象作为参数；</p>
</li>
<li data-nodeid="84077">
<p data-nodeid="84078">Redux 中间件返回一个函数，该函数接收下一个<code data-backticks="1" data-nodeid="84261">next</code>方法作为参数，并返回一个接收 action 的新的<code data-backticks="1" data-nodeid="84263">dispatch</code>方法；</p>
</li>
<li data-nodeid="84079">
<p data-nodeid="84080">Redux 中间件通过手动调用<code data-backticks="1" data-nodeid="84266">next(action)</code>方法，执行下一个中间件。</p>
</li>
</ul>
<p data-nodeid="84081">我们将 Redux 的中间件作用机制总结为下图：</p>
<p data-nodeid="85010" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image6/M00/03/C9/Cgp9HWAfsQuABGmXAAGNk0fcn-c946.png" alt="202127-92020.png" data-nodeid="85014"></p>
<div data-nodeid="85011"><p style="text-align:center">Redux 的中间件作用机制</p></div>


<p data-nodeid="84084">看上去也像是一个洋葱圈模型，但是对于同步调用和异步调用稍有不同，以三个中间件为例。</p>
<ul data-nodeid="84085">
<li data-nodeid="84086">
<p data-nodeid="84087">三个中间件均是正常同步调用<code data-backticks="1" data-nodeid="84274">next(action)</code>，则执行顺序为：中间件 1 before next → 中间件 2 before next → 中间件 3 before next → dispatch 方法调用 → 中间件 3 after next → 中间件 2 after next → 中间件 1 after next。</p>
</li>
<li data-nodeid="84088">
<p data-nodeid="84089">第二个中间件没有调用<code data-backticks="1" data-nodeid="84277">next(action)</code>，则执行顺序为：中间件 1 befoe next → 中间件 2 逻辑 → 中间件 1 after next，注意<strong data-nodeid="84283">此时中间件 3 没有被执行</strong>。</p>
</li>
<li data-nodeid="84090">
<p data-nodeid="84091">第二个中间件异步调用<code data-backticks="1" data-nodeid="84285">next(action)</code>，其他中间件均是正常同步调用<code data-backticks="1" data-nodeid="84287">nextt(action)</code>，则执行顺序为：中间件 1 before next → 中间件 2 同步代码部分 → 中间件 1 after next → 中间件 2 异步代码部分 before next → 中间件 3 before next → dispatch 方法调用 → 中间件 3 after next → 中间件 2 异步代码部分 after next。</p>
</li>
</ul>
<h3 data-nodeid="84092">利用中间件思想，实现一个中间件化的 Fetch 库</h3>
<p data-nodeid="84093">上面我们分析了前端中的中间件化思想，这一部分，我们活学活用，利用中间件思路，结合上一讲内容，实现一个中间件化的 Fetch 库。</p>
<p data-nodeid="84094">我们先来思考一个中间件化的 Fetch 库有哪些优点呢？Fetch 库的核心实现请求的发送，而各种业务逻辑以中间件化的插件模式进行增强，这样一来，实现了特定业务需求和请求库的解耦，更加灵活，也是一种分层思想的体现。具体来说，一个中间件化的 Fetch 库：</p>
<ul data-nodeid="84095">
<li data-nodeid="84096">
<p data-nodeid="84097">支持业务方递归扩展底层 Fetch API 能力；</p>
</li>
<li data-nodeid="84098">
<p data-nodeid="84099">方便测试；</p>
</li>
<li data-nodeid="84100">
<p data-nodeid="84101">一个中间件化的 Fetch 库，天然支持各类型的 Fetch 封装（比如 Native Fetch、fetch-ponyfill、fetch-polyfill 等）。</p>
</li>
</ul>
<p data-nodeid="84102">我们给这个中间件化的 Fetch 库取名为：fetch-wrap，借助 <a href="https://github.com/benjamine/fetch-wrap" data-nodeid="84298">fetch-wrap</a> 的实现，预期使用方式为：</p>
<pre class="lang-java" data-nodeid="84103"><code data-language="java"><span class="hljs-keyword">const</span> fetchWrap = require(<span class="hljs-string">'fetch-wrap'</span>);
<span class="hljs-comment">// 这里可以接入自己的核心 Fetch 底层实现，比如使用原生 Fetch，或同构的 isomorphic-fetch 等</span>
let fetch = require(<span class="hljs-string">'isomorphic-fetch'</span>);
<span class="hljs-comment">// 扩展 Fetch 中间件</span>
fetch = fetchWrap(fetch, [
  middleware1,
  middleware2,
  middleware3,
]);
<span class="hljs-comment">// 一个典型的中间件</span>
<span class="hljs-function">function <span class="hljs-title">middleware1</span><span class="hljs-params">(url, options, innerFetch)</span> </span>{
	<span class="hljs-comment">// ...</span>
	<span class="hljs-comment">// 业务扩展</span>
	<span class="hljs-comment">// ...</span>
	<span class="hljs-keyword">return</span> innerFetch(url, options);
}
<span class="hljs-comment">// 一个更改 URL 的中间件</span>
function(url, options, fetch) {
	<span class="hljs-comment">// modify url or options</span>
	<span class="hljs-keyword">return</span> fetch(url.replace(/^(http:)?/, <span class="hljs-string">'https:'</span>), options);
},
<span class="hljs-comment">// 一个修改返回结果的中间件</span>
function(url, options, fetch) {
	<span class="hljs-keyword">return</span> fetch(url, options).then(function(response) {
	  <span class="hljs-keyword">if</span> (!response.ok) {
	    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(result.status + <span class="hljs-string">' '</span> + result.statusText);
	  }
	  <span class="hljs-keyword">if</span> (/application\/json/.test(result.headers.get(<span class="hljs-string">'content-type'</span>))) {
	    <span class="hljs-keyword">return</span> response.json();
	  }
	  <span class="hljs-keyword">return</span> response.text();
	});
}
<span class="hljs-comment">// 一个做错误处理的中间件</span>
function(url, options, fetch) {
	<span class="hljs-comment">// catch errors</span>
	<span class="hljs-keyword">return</span> fetch(url, options).<span class="hljs-keyword">catch</span>(function(err) {
	  console.error(err);
	  <span class="hljs-keyword">throw</span> err;
	});
}
</code></pre>
<p data-nodeid="84104">核心实现也不困难，观察<code data-backticks="1" data-nodeid="84301">fetchWrap</code>使用方式，我们实现源码为：</p>
<pre class="lang-java" data-nodeid="84105"><code data-language="java"><span class="hljs-comment">// 接受第一个参数为基础 Fetch，第二个参数为中间件数组或单个中间件</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-function">function <span class="hljs-title">fetchWrap</span><span class="hljs-params">(fetch, middleware)</span> </span>{
    <span class="hljs-comment">// 没有使用中间件，则返回原生 fetch</span>
	<span class="hljs-keyword">if</span> (!middleware || middleware.length &lt; <span class="hljs-number">1</span>) {
		<span class="hljs-keyword">return</span> fetch;
	}
	
	<span class="hljs-comment">// 递归调用 extend 方法，每次递归时剔除出 middleware 数组中的首项</span>
	<span class="hljs-keyword">var</span> innerFetch = middleware.length === <span class="hljs-number">1</span> ? fetch : fetchWrap(fetch, middleware.slice(<span class="hljs-number">1</span>));
	
	<span class="hljs-keyword">var</span> next = middleware[<span class="hljs-number">0</span>];
	
	<span class="hljs-keyword">return</span> <span class="hljs-function">function <span class="hljs-title">extendedFetch</span><span class="hljs-params">(url, options)</span> </span>{
		<span class="hljs-keyword">try</span> {
		  <span class="hljs-comment">// 每一个 Fetch 中间件通过 Promsie 来串联</span>
		  <span class="hljs-keyword">return</span> Promise.resolve(next(url, options || {}, innerFetch));
		} <span class="hljs-keyword">catch</span> (err) {
		  <span class="hljs-keyword">return</span> Promise.reject(err);
		}
	};
}
</code></pre>
<p data-nodeid="84106">我们可以看到，每一个中间件都接收一个<code data-backticks="1" data-nodeid="84304">url</code>和<code data-backticks="1" data-nodeid="84306">options</code>参数，因此具有了改写<code data-backticks="1" data-nodeid="84308">url</code>和<code data-backticks="1" data-nodeid="84310">options</code>的能力；同时接收一个<code data-backticks="1" data-nodeid="84312">innerFetch</code>方法，<code data-backticks="1" data-nodeid="84314">innerFetch</code>为上一个中间件包装过的<code data-backticks="1" data-nodeid="84316">fetch</code>方法，而每一个中间件也都返回一个包装过的<code data-backticks="1" data-nodeid="84318">fetch</code>方法，将各个中间件依次调用串联。</p>
<p data-nodeid="84107">另外，社区上的 <a href="https://www.npmjs.com/package/umi-request" data-nodeid="84323">umi-request</a> 的中间件机制也是类似的，其核心代码：</p>
<pre class="lang-java" data-nodeid="84108"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Onion</span> </span>{
  constructor() {
    <span class="hljs-keyword">this</span>.middlewares = [];
  }
  <span class="hljs-comment">// 存储中间件</span>
  use(newMiddleware) {
    <span class="hljs-keyword">this</span>.middlewares.push(newMiddleware);
  }
  <span class="hljs-comment">// 执行中间件</span>
  execute(params = <span class="hljs-keyword">null</span>) {
    <span class="hljs-keyword">const</span> fn = compose(<span class="hljs-keyword">this</span>.middlewares);
    <span class="hljs-keyword">return</span> fn(params);
  }
}
<span class="hljs-function">export <span class="hljs-keyword">default</span> function <span class="hljs-title">compose</span><span class="hljs-params">(middlewares)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">function <span class="hljs-title">wrapMiddlewares</span><span class="hljs-params">(params)</span> </span>{
    let index = -<span class="hljs-number">1</span>;
    <span class="hljs-function">function <span class="hljs-title">dispatch</span><span class="hljs-params">(i)</span> </span>{
      index = i;
      <span class="hljs-keyword">const</span> fn = middlewares[i];
      <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> Promise.resolve();
      <span class="hljs-keyword">return</span> Promise.resolve(fn(params, () =&gt; dispatch(i + <span class="hljs-number">1</span>)));
    }
    <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>);
  };
}
</code></pre>
<p data-nodeid="84109">我们可以看到，上述源码更像 Koa 的实现了，但其实道理和上面的 fetch-wrap 大同小异。至此，相信你已经了解了中间件的思想，也能够体会洋葱模型的精妙设计。</p>
<h3 data-nodeid="84110">总结</h3>
<p data-nodeid="84111">这一讲，我们通过分析前端不同框架的中间件设计，剖析了中间件化这一重要思想。中间件化意味着插件化，这也是上一讲提到的分层思想的一种实现，同时，这种实现思路灵活且扩展能力强，能够和核心逻辑相解耦，需要你细心体会。</p>
<p data-nodeid="84112">本讲主要内容如下：</p>
<p data-nodeid="84113"><img src="https://s0.lgstatic.com/i/image/M00/94/A4/CgqCHmAY-AqAIZqkAAO1O62z-y4965.png" alt="Drawing 2.png" data-nodeid="84331"></p>
<p data-nodeid="84114" class="">在下一讲中，我们将继续围绕着代码设计中的灵活性和定制性这一话题展开，同时也给大家留一个思考题：你在平时开发中，见过或者使用过哪些插件化的工程或技术呢？欢迎在留言区和我分享你的观点，我们下一讲再见。</p>

---

### 精选评论

##### **伦：
> 插件化还是比较常见的，比如常用的 eggjs,webpack，最近在看的技术比如 LogicFlow antv/x6

