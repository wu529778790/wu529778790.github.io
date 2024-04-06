<p data-nodeid="853" class="">在前面<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=584#/detail/pc?id=5957&amp;fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="942">第 28 讲“设计性能守卫系统：完善 CI/CD 流程”</a>中我们提到了 Puppeteer。事实上，以 Puppeteer 为代表的 Headless 浏览器在 Node.js 中的应用极为广泛，这一讲，就让我们对 Puppeteer 进行深入分析和应用。</p>
<h3 data-nodeid="854">Puppeteer 介绍和原理</h3>
<p data-nodeid="855">我们先对 Puppeteer 进行一个基本介绍。（<a href="https://github.com/puppeteer?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="948">Puppeteer 官方地址</a>）</p>
<blockquote data-nodeid="856">
<p data-nodeid="857">Puppeteer 是一个 Node 库，它提供了一整套高级 API，通过 DevTools 协议控制 Chromium 或 Chrome。正如其翻译为“操纵木偶的人”一样，你可以通过 Puppeteer 提供的 API 直接控制 Chrome，模拟大部分用户操作，进行 UI 测试或者作为爬虫访问页面来收集数据。</p>
</blockquote>
<p data-nodeid="858">整个定义非常好理解，这里需要开发者注意的是，Puppeteer 在 1.7.0 版本之后，会同时给开发者提供：</p>
<ul data-nodeid="859">
<li data-nodeid="860">
<p data-nodeid="861">Puppeteer</p>
</li>
<li data-nodeid="862">
<p data-nodeid="863">Puppeteer-core</p>
</li>
</ul>
<p data-nodeid="864">两个版本。它们的区别在于载入安装 Puppeteer 时，是否会下载 Chromium。Puppeteer-core 默认不下载 Chromium，同时会忽略所有 puppeteer_* 环境变量。对于开发者来说，使用 Puppeteer-core 无疑更加轻便，但是<strong data-nodeid="966">需要提前保证环境中已经具有可执行的 Chromium</strong>（具体说明可见<a href="https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#puppeteer-vs-puppeteer-core?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="964">puppeteer vs puppeteer-core</a>）。</p>
<p data-nodeid="865">具体 Puppeteer 的应用场景有：</p>
<ul data-nodeid="866">
<li data-nodeid="867">
<p data-nodeid="868">为网页生成页面 PDF 或者截取图片；</p>
</li>
<li data-nodeid="869">
<p data-nodeid="870">抓取 SPA（单页应用）并生成预渲染内容；</p>
</li>
<li data-nodeid="871">
<p data-nodeid="872">自动提交表单，进行 UI 测试、键盘输入等；</p>
</li>
<li data-nodeid="873">
<p data-nodeid="874">创建一个随时更新的自动化测试环境，使用最新的 JavaScript 和浏览器功能直接在最新版本的 Chrome 中执行测试；</p>
</li>
<li data-nodeid="875">
<p data-nodeid="876">捕获网站的<a href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="975">timeline trace</a>，用来帮助分析性能问题；</p>
</li>
<li data-nodeid="877">
<p data-nodeid="878">测试浏览器扩展。</p>
</li>
</ul>
<p data-nodeid="879">下面我们就梳理一些 Puppeteer 应用的重点场景，并详细介绍如何使用 Puppeteer 实现一个高性能的海报 Node.js 服务。</p>
<h3 data-nodeid="880">Puppeteer 在 SSR 中的应用</h3>
<p data-nodeid="881">区别于第 27 讲介绍的<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=584#/detail/pc?id=5956&amp;fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="983">“同构渲染架构：实现一个 SSR 应用”</a>，使用 Puppeteer 实现服务端预渲染出发点完全不同。这种方案最大的好处是不需要对项目代码进行任何调整，却能获取到 SSR 应用的收益。当然，相比同构渲染，基于 Puppeteer 技术的 SSR 在灵活性和扩展性上都有所局限。甚至在 Node.js 端渲染的性能成本也较高，不过该技术也逐渐落地，并在很多场景发挥了重要价值。</p>
<p data-nodeid="882">比如对于这样的一个页面，代码如下：</p>
<pre class="lang-js" data-nodeid="883"><code data-language="js">&lt;html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Populated by the JS below. --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 使用 JavaScript 脚本，进行 CSR 渲染</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderPosts</span>(<span class="hljs-params">posts, container</span>) </span>{
  <span class="hljs-keyword">const</span> html = posts.reduce(<span class="hljs-function">(<span class="hljs-params">html, post</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${html}</span>
      &lt;li class="post"&gt;
        &lt;h2&gt;<span class="hljs-subst">${post.title}</span>&lt;/h2&gt;
        &lt;div class="summary"&gt;<span class="hljs-subst">${post.summary}</span>&lt;/div&gt;
        &lt;p&gt;<span class="hljs-subst">${post.content}</span>&lt;/p&gt;
      &lt;/li&gt;`</span>;
  }, <span class="hljs-string">''</span>);
  container.innerHTML = <span class="hljs-string">`&lt;ul id="posts"&gt;<span class="hljs-subst">${html}</span>&lt;/ul&gt;`</span>;
}
(<span class="hljs-keyword">async</span>() =&gt; {
  <span class="hljs-keyword">const</span> container = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#container'</span>);
  <span class="hljs-comment">// 发送数据请求</span>
  <span class="hljs-keyword">const</span> posts = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/posts'</span>).then(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> resp.json());
  renderPosts(posts, container);
})();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;/html&gt;
</code></pre>
<p data-nodeid="884">该页面是一个典型的 CSR 页面，依靠 Ajax，实现了页面动态化渲染。</p>
<p data-nodeid="885">当在 Node.js 端使用 Puppeteer 渲染时，我们可以实现<code data-backticks="1" data-nodeid="988">ssr.mjs</code>，完成渲染任务，如下代码：</p>
<pre class="lang-java" data-nodeid="886"><code data-language="java"><span class="hljs-keyword">import</span> puppeteer from <span class="hljs-string">'puppeteer'</span>;
<span class="hljs-comment">// 将已经渲染过的页面，缓存在内存中</span>
<span class="hljs-keyword">const</span> RENDER_CACHE = <span class="hljs-keyword">new</span> Map();
<span class="hljs-function">async function <span class="hljs-title">ssr</span><span class="hljs-params">(url)</span> </span>{
	<span class="hljs-comment">// 命中缓存</span>
  <span class="hljs-keyword">if</span> (RENDER_CACHE.has(url)) {
    <span class="hljs-keyword">return</span> {html: RENDER_CACHE.get(url), ttRenderMs: <span class="hljs-number">0</span>};
  }
  <span class="hljs-keyword">const</span> start = Date.now();
  <span class="hljs-comment">// 使用 Puppeteer launch 一个无头浏览器</span>
  <span class="hljs-keyword">const</span> browser = await puppeteer.launch();
  <span class="hljs-keyword">const</span> page = await browser.newPage();
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// 访问页面地址直到页面网络状态为 idle</span>
    await page.goto(url, {waitUntil: <span class="hljs-string">'networkidle0'</span>});
    <span class="hljs-comment">// 确保 #posts 节点已经存在</span>
    await page.waitForSelector(<span class="hljs-string">'#posts'</span>);
  } <span class="hljs-keyword">catch</span> (err) {
    console.error(err);
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(<span class="hljs-string">'page.goto/waitForSelector timed out.'</span>);
  }
	<span class="hljs-comment">// 获取 html 内容</span>
  <span class="hljs-keyword">const</span> html = await page.content(); 
  <span class="hljs-comment">// 关闭无头浏览器</span>
  await browser.close();
  <span class="hljs-keyword">const</span> ttRenderMs = Date.now() - start;
  console.info(`Headless rendered page in: ${ttRenderMs}ms`);
	<span class="hljs-comment">// 进行缓存存储</span>
  RENDER_CACHE.set(url, html);
  <span class="hljs-keyword">return</span> {html, ttRenderMs};
}
export {ssr as <span class="hljs-keyword">default</span>};
</code></pre>
<p data-nodeid="887">对应<code data-backticks="1" data-nodeid="991">server.mjs</code>代码：</p>
<pre class="lang-java" data-nodeid="888"><code data-language="java"><span class="hljs-keyword">import</span> express from <span class="hljs-string">'express'</span>;
<span class="hljs-keyword">import</span> ssr from <span class="hljs-string">'./ssr.mjs'</span>;
<span class="hljs-keyword">const</span> app = express();
app.get(<span class="hljs-string">'/'</span>, async (req, res, next) =&gt; {
  <span class="hljs-comment">// 调用 SSR 方法渲染页面</span>
  <span class="hljs-keyword">const</span> {html, ttRenderMs} = <span class="hljs-function">await <span class="hljs-title">ssr</span><span class="hljs-params">(`xxx/index.html`)</span></span>;
  res.set(<span class="hljs-string">'Server-Timing'</span>, `Prerender;dur=${ttRenderMs};desc=<span class="hljs-string">"Headless render time (ms)"</span>`);
  <span class="hljs-keyword">return</span> res.status(<span class="hljs-number">200</span>).send(html);
});
app.listen(<span class="hljs-number">8080</span>, () =&gt; console.log(<span class="hljs-string">'Server started. Press Ctrl+C to quit'</span>));
</code></pre>
<p data-nodeid="889">当然上述实现比较简陋，只是进行原理说明。如果更进一步，我们可以从以下几个角度进行优化：</p>
<ul data-nodeid="890">
<li data-nodeid="891">
<p data-nodeid="892">改造浏览器端代码，防止重复请求接口；</p>
</li>
<li data-nodeid="893">
<p data-nodeid="894">在 Node.js 端，abort 掉不必要的请求，以得到更快的服务端渲染响应速度；</p>
</li>
<li data-nodeid="895">
<p data-nodeid="896">将关键资源内连进 HTML；</p>
</li>
<li data-nodeid="897">
<p data-nodeid="898">自动压缩静态资源；</p>
</li>
<li data-nodeid="899">
<p data-nodeid="900">在 Node.js 端，渲染页面时，重复利用 Chrome 实例。</p>
</li>
</ul>
<p data-nodeid="901">这里我们用简单代码进行说明：</p>
<pre class="lang-java" data-nodeid="902"><code data-language="java">  <span class="hljs-keyword">import</span> express from <span class="hljs-string">'express'</span>;
  <span class="hljs-keyword">import</span> puppeteer from <span class="hljs-string">'puppeteer'</span>;
  <span class="hljs-keyword">import</span> ssr from <span class="hljs-string">'./ssr.mjs'</span>;
  <span class="hljs-comment">// 重复使用 Chrome 实例</span>
  let browserWSEndpoint = <span class="hljs-keyword">null</span>;
  <span class="hljs-keyword">const</span> app = express();

app.get(<span class="hljs-string">'/'</span>, async (req, res, next) =&gt; {
<span class="hljs-keyword">if</span> (!browserWSEndpoint) {
<span class="hljs-comment">// 一下两行代码不必随着渲染重复执行</span>
<span class="hljs-keyword">const</span> browser = await puppeteer.launch();
browserWSEndpoint = await browser.wsEndpoint();
}

    <span class="hljs-keyword">const</span> url = `${req.protocol}:<span class="hljs-comment">//${req.get('host')}/index.html`;</span>
    <span class="hljs-keyword">const</span> {html} = <span class="hljs-function">await <span class="hljs-title">ssr</span><span class="hljs-params">(url, browserWSEndpoint)</span></span>;

    <span class="hljs-keyword">return</span> res.status(<span class="hljs-number">200</span>).send(html);

});
</code></pre>

<p data-nodeid="903">至此，我们从原理和代码层面分析了 Puppeteer 在 SSR 中的应用。接下来我们来了解更多的 Puppeteer 使用场景，请你继续阅读。</p>
<h3 data-nodeid="904">Puppeteer 在 UI 测试中的应用</h3>
<p data-nodeid="905">Puppeteer 在 UI 测试（即端到端测试）中也可以大显身手，比如和 Jest 结合，通过断言能力实现一个完备的端到端测试系统。</p>
<p data-nodeid="906">比如下面代码：</p>
<pre class="lang-java" data-nodeid="907"><code data-language="java"><span class="hljs-keyword">const</span> puppeteer = require(<span class="hljs-string">'puppeteer'</span>);
<span class="hljs-comment">// 测试页面 title 符合预期</span>
test(<span class="hljs-string">'baidu title is correct'</span>, async () =&gt; {
	<span class="hljs-comment">// 启动一个无头浏览器</span>
  <span class="hljs-keyword">const</span> browser = await puppeteer.launch()
  <span class="hljs-comment">// 通过无头浏览器访问页面</span>
  <span class="hljs-keyword">const</span> page = await browser.newPage()
  await page.goto(<span class="hljs-string">'https://xxxxx'</span>)
  <span class="hljs-comment">// 获取页面 title</span>
  <span class="hljs-keyword">const</span> title = await page.title()
  <span class="hljs-comment">// 使用 Jest 的 test 和 expect 两个全局函数进行断言</span>
  expect(title).toBe(<span class="hljs-string">'xxxx'</span>)
  await browser.close()
});
</code></pre>
<p data-nodeid="908">上面代码简单清晰地勾勒出了 Puppeteer 结合 Jest 实现端到端测试的场景。实际上，现在流行的主流端到端测试框架，比如 Cypress 原理都如上代码所示。</p>
<p data-nodeid="909">接下来，我们来分析 Puppeteer 结合 Lighthouse 应用场景。</p>
<h3 data-nodeid="910">Puppeteer 结合 Lighthouse 应用场景</h3>
<p data-nodeid="911">在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=584#/detail/pc?id=5957&amp;fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="1010">第 28 讲“设计性能守卫系统：完善 CI/CD 流程”</a>中我们也提到了 Lighthouse，既然 Puppeteer 可以和 Jest 结合实现一个端到端测试框架，当然也可以和 Lighthouse 结合——这就是一个简单的性能守卫系统的雏形。</p>
<p data-nodeid="912">我们再通过代码来说明，如下代码：</p>
<pre class="lang-java" data-nodeid="913"><code data-language="java"><span class="hljs-keyword">const</span> chromeLauncher = require(<span class="hljs-string">'chrome-launcher'</span>);
<span class="hljs-keyword">const</span> puppeteer = require(<span class="hljs-string">'puppeteer'</span>);
<span class="hljs-keyword">const</span> lighthouse = require(<span class="hljs-string">'lighthouse'</span>);
<span class="hljs-keyword">const</span> config = require(<span class="hljs-string">'lighthouse/lighthouse-core/config/lr-desktop-config.js'</span>);
<span class="hljs-keyword">const</span> reportGenerator = require(<span class="hljs-string">'lighthouse/lighthouse-core/report/report-generator'</span>);
<span class="hljs-keyword">const</span> request = require(<span class="hljs-string">'request'</span>);
<span class="hljs-keyword">const</span> util = require(<span class="hljs-string">'util'</span>);
<span class="hljs-keyword">const</span> fs = require(<span class="hljs-string">'fs'</span>);
(async() =&gt; {
    <span class="hljs-comment">// 默认配置 </span>
    <span class="hljs-keyword">const</span> opts = {
        logLevel: <span class="hljs-string">'info'</span>,
        output: <span class="hljs-string">'json'</span>,
        disableDeviceEmulation: <span class="hljs-keyword">true</span>,
        defaultViewport: {
            width: <span class="hljs-number">1200</span>,
            height: <span class="hljs-number">900</span>
        },
        chromeFlags: [<span class="hljs-string">'--disable-mobile-emulation'</span>]
    };
		<span class="hljs-comment">// 使用 chromeLauncher 启动一个 chrome 实例</span>
    <span class="hljs-keyword">const</span> chrome = await chromeLauncher.launch(opts);
    opts.port = chrome.port;
<span class="hljs-comment">// 使用 puppeteer.connect 连接 chrome 实例</span>
    <span class="hljs-keyword">const</span> resp = await util.promisify(request)(`http:<span class="hljs-comment">//localhost:${opts.port}/json/version`);</span>
    <span class="hljs-keyword">const</span> {webSocketDebuggerUrl} = JSON.parse(resp.body);
    <span class="hljs-keyword">const</span> browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});

<span class="hljs-comment">// Puppeteer 访问逻辑</span>
page = (await browser.pages())[<span class="hljs-number">0</span>];
await page.setViewport({ width: <span class="hljs-number">1200</span>, height: <span class="hljs-number">900</span>});
console.log(page.url());
<span class="hljs-comment">// 使用 lighthouse 产出报告</span>
<span class="hljs-keyword">const</span> report = <span class="hljs-function">await <span class="hljs-title">lighthouse</span><span class="hljs-params">(page.url()</span>, opts, config).<span class="hljs-title">then</span><span class="hljs-params">(results =&gt; {
return results;
})</span></span>;
<span class="hljs-keyword">const</span> html = reportGenerator.generateReport(report.lhr, <span class="hljs-string">'html'</span>);
<span class="hljs-keyword">const</span> json = reportGenerator.generateReport(report.lhr, <span class="hljs-string">'json'</span>);
await browser.disconnect();
await chrome.kill();
<span class="hljs-comment">// 将报告写入文件系统</span>
fs.writeFile(<span class="hljs-string">'report.html'</span>, html, (err) =&gt; {
<span class="hljs-keyword">if</span> (err) {
console.error(err);
}
});
fs.writeFile(<span class="hljs-string">'report.json'</span>, json, (err) =&gt; {
<span class="hljs-keyword">if</span> (err) {
console.error(err);
}
});
})();
</code></pre>

<p data-nodeid="914">整体流程非常清晰，是一个典型的 Puppeteer 与 Lighthouse 结合的案例。事实上，我们看到 Puppeteer 或 Headless 浏览器可以和多个领域能力相结合，在 Node.js 服务上实现平台化能力。接下来，我们再看最后一个案例，请读者继续阅读。</p>
<h3 data-nodeid="915">Puppeteer 实现海报 Node.js 服务</h3>
<p data-nodeid="916">社区上我们常见生成海报的技术分享。应用场景很多，比如文稿中划线，进行“金句分享”，如下图所示：</p>
<p data-nodeid="917"><img src="https://s0.lgstatic.com/i/image6/M00/21/5C/CioPOWBURyGAdWWfAAVd4uI0v5k453.png" alt="Drawing 0.png" data-nodeid="1018"></p>
<p data-nodeid="918">一般来说，生成海报可以使用<a href="https://github.com/niklasvh/html2canvas?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="1022">html2canvas</a>这样的类库完成，这里面的技术难点主要有跨域处理、分页处理、页面截图时机处理等。整体来说，并不难实现，但是稳定性一般。另一种生成海报的方式就是使用 Puppeteer，构建一个 Node.js 服务来做页面截图。</p>
<p data-nodeid="2155">下面我们来实现一个名叫 posterMan 的海报服务，整体技术链路如下图：</p>
<p data-nodeid="2156" class=""><img src="https://s0.lgstatic.com/i/image6/M01/25/41/Cgp9HWBZg66ADjAJAAJBHVTqmKw043.png" alt="图片4.png" data-nodeid="2160"></p>

<p data-nodeid="2792">核心技术无外乎使用 Puppeteer，访问页面并截图，这与前面几个场景是一样的，如下图所示：</p>
<p data-nodeid="2793" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image6/M01/25/3D/CioPOWBZg8GAX2qJAALAFyJ2lc8362.png" alt="图片5.png" data-nodeid="2797"></p>

<p data-nodeid="923">这里需要特别强调的是，为了实现最好的性能，我们<strong data-nodeid="1037">设计了一个链接池来存储 Puppeteer 实例</strong>，以备所需，如下图所示：</p>
<p data-nodeid="924" class=""><img src="https://s0.lgstatic.com/i/image6/M00/21/5F/Cgp9HWBUR3WAUmueAAEA26Dx-54108.png" alt="Drawing 3.png" data-nodeid="1040"></p>
<p data-nodeid="925">在实现上，我们依赖<a href="https://www.npmjs.com/package/generic-pool?fileGuid=xxQTRXtVcqtHK6j8" data-nodeid="1044">generic-pool</a>库，这个库提供了 Promise 风格的通用池，可以用来对一些高消耗、高成本资源的调用实现<strong data-nodeid="1050">防抖或拒绝服务</strong>能力，一个典型场景是对数据库的连接。这里我们把它用于 Puppeteer 实例的创建，如下代码所示：</p>
<pre class="lang-java" data-nodeid="926"><code data-language="java"><span class="hljs-keyword">const</span> puppeteer = require(<span class="hljs-string">'puppeteer'</span>)
<span class="hljs-keyword">const</span> genericPool = require(<span class="hljs-string">'generic-pool'</span>)
<span class="hljs-keyword">const</span> createPuppeteerPool = ({
  <span class="hljs-comment">// pool 的最大容量</span>
  max = <span class="hljs-number">10</span>,
  <span class="hljs-comment">// pool 的最小容量</span>
  min = <span class="hljs-number">2</span>,
  <span class="hljs-comment">// 连接在池中保持空闲而不被回收的最小时间值</span>
  idleTimeoutMillis = <span class="hljs-number">30000</span>,
  <span class="hljs-comment">// 最大使用数</span>
  maxUses = <span class="hljs-number">50</span>,
  <span class="hljs-comment">// 在连接池交付实例前是否先经过 factory.validate 测试</span>
  testOnBorrow = <span class="hljs-keyword">true</span>,
  puppeteerArgs = {},
  validator = () =&gt; Promise.resolve(<span class="hljs-keyword">true</span>),
  ...otherConfig
} = {}) =&gt; {
  <span class="hljs-keyword">const</span> factory = {
  	<span class="hljs-comment">// 创建实例</span>
    create: () =&gt;
      puppeteer.launch(puppeteerArgs).then(instance =&gt; {
        instance.useCount = <span class="hljs-number">0</span>
        <span class="hljs-keyword">return</span> instance
      }),
    <span class="hljs-comment">// 销毁实例</span>
    destroy: instance =&gt; {
      instance.close()
    },
    <span class="hljs-comment">// 验证实例可用性</span>
    validate: instance =&gt; {
      <span class="hljs-keyword">return</span> validator(instance).then(valid =&gt;
        <span class="hljs-comment">// maxUses 小于 0 或者 instance 使用计数小于 maxUses 时可用</span>
        Promise.resolve(valid &amp;&amp; (maxUses &lt;= <span class="hljs-number">0</span> || instance.useCount &lt; maxUses))
      )
    }
  }
  <span class="hljs-keyword">const</span> config = {
    max,
    min,
    idleTimeoutMillis,
    testOnBorrow,
    ...otherConfig
  }
  <span class="hljs-comment">// 创建连接池</span>
  <span class="hljs-keyword">const</span> pool = genericPool.createPool(factory, config)
  <span class="hljs-keyword">const</span> genericAcquire = pool.acquire.bind(pool)
  <span class="hljs-comment">// 池中资源连接时进行的操作</span>
  pool.acquire = () =&gt;
    genericAcquire().then(instance =&gt; {
      instance.useCount += <span class="hljs-number">1</span>
      <span class="hljs-keyword">return</span> instance
    })
  pool.use = fn =&gt; {
    let resource
    <span class="hljs-keyword">return</span> pool
      .acquire()
      .then(r =&gt; {
        resource = r
        <span class="hljs-keyword">return</span> r
      })
      .then(fn)
      .then(
        result =&gt; {
          <span class="hljs-comment">// 释放资源</span>
          pool.release(resource)
          <span class="hljs-keyword">return</span> result
        },
        err =&gt; {
          pool.release(resource)
          <span class="hljs-keyword">throw</span> err
        }
      )
  }
  <span class="hljs-keyword">return</span> pool
}
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = createPuppeteerPool
</code></pre>
<p data-nodeid="927">使用连接池的方式也很简单，如下代码，<code data-backticks="1" data-nodeid="1052">./pool.js</code>：</p>
<pre class="lang-java" data-nodeid="928"><code data-language="java"><span class="hljs-keyword">const</span> pool = createPuppeteerPool({
  puppeteerArgs: {
    args: config.browserArgs
  }
})
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = pool
</code></pre>
<p data-nodeid="929">有了“武器弹药”，我们来看看渲染一个页面为海报的具体逻辑。如下代码所示<code data-backticks="1" data-nodeid="1055">render</code>方法，该方法支持接受一个 URL 也支持接受具体的 HTML 字符串去生成相应海报：</p>
<pre class="lang-java" data-nodeid="930"><code data-language="java"><span class="hljs-comment">// 获取连接池</span>
<span class="hljs-keyword">const</span> pool = require(<span class="hljs-string">'./pool'</span>)
<span class="hljs-keyword">const</span> config = require(<span class="hljs-string">'./config'</span>)
<span class="hljs-keyword">const</span> render = (ctx, handleFetchPicoImageError) =&gt;
  <span class="hljs-comment">// 使用连接池资源</span>
  pool.use(async browser =&gt; {
    <span class="hljs-keyword">const</span> { body, query } = ctx.request
    <span class="hljs-comment">// 打开新的页面</span>
    <span class="hljs-keyword">const</span> page = await browser.newPage()
    <span class="hljs-comment">// 服务支持直接传递 HTML 字符串内容</span>
    let html = body
		<span class="hljs-comment">// 从请求服务的 query 获取默认参数</span>
    <span class="hljs-keyword">const</span> {
      width = <span class="hljs-number">300</span>,
      height = <span class="hljs-number">480</span>,
      ratio: deviceScaleFactor = <span class="hljs-number">2</span>,
      type = <span class="hljs-string">'png'</span>,
      filename = <span class="hljs-string">'poster'</span>,
      waitUntil = <span class="hljs-string">'domcontentloaded'</span>,
      quality = <span class="hljs-number">100</span>,
      omitBackground,
      fullPage,
      url,
      useCache = <span class="hljs-string">'true'</span>,
      usePicoAutoJPG = <span class="hljs-string">'true'</span>
    } = query
    let image
    <span class="hljs-keyword">try</span> {
    	<span class="hljs-comment">// 设置浏览器视口</span>
      await page.setViewport({
        width: Number(width),
        height: Number(height),
        deviceScaleFactor: Number(deviceScaleFactor)
      })
      <span class="hljs-keyword">if</span> (html.length &gt; <span class="hljs-number">1.25e6</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(<span class="hljs-string">'image size out of limits, at most 1 MB'</span>)
      }
			<span class="hljs-comment">// 访问 URL 页面</span>
      await page.goto(url || `data:text/html,${html}`, {
        waitUntil: waitUntil.split(<span class="hljs-string">','</span>)
      })
			<span class="hljs-comment">// 进行截图</span>
      image = await page.screenshot({
        type: type === <span class="hljs-string">'jpg'</span> ? <span class="hljs-string">'jpeg'</span> : type,
        quality: type === <span class="hljs-string">'png'</span> ? undefined : Number(quality),
        omitBackground: omitBackground === <span class="hljs-string">'true'</span>,
        fullPage: fullPage === <span class="hljs-string">'true'</span>
      })
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">throw</span> error
    }
    ctx.set(<span class="hljs-string">'Content-Type'</span>, `image/${type}`)
    ctx.set(<span class="hljs-string">'Content-Disposition'</span>, `inline; filename=${filename}.${type}`)
    await page.close()
    <span class="hljs-keyword">return</span> image
  })
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = render
</code></pre>
<p data-nodeid="931">至此，基于 Puppeteer 的海报系统就已经开发完成了。它是一个对外的 Node.js 服务。</p>
<p data-nodeid="932">我们也可以生成各种语言的 SDK 客户端，调用该海报服务。比如一个简单的 Python 版 SDK 客户端实现如下代码：</p>
<pre class="lang-java" data-nodeid="933"><code data-language="java"><span class="hljs-function"><span class="hljs-keyword">import</span> requests
class <span class="hljs-title">PosterGenerator</span><span class="hljs-params">(object)</span>:
    <span class="hljs-comment">// ...</span>
    def <span class="hljs-title">generate</span><span class="hljs-params">(self, **kwargs)</span>:
        """
        生成海报图片，返回二进制海报数据
        :param kwargs: 渲染时需要传递的参数字典
        :return: 二进制图片数据
        """
        html_content </span>= render(self._syntax, self._template_content, **kwargs)
        url = POSTER_MAN_HA_PROXIES[self._api_env.value]
        <span class="hljs-keyword">try</span>:
        		<span class="hljs-comment">// post 请求海报服务</span>
            resp = requests.post(
                url,
                data=html_content.encode(<span class="hljs-string">'utf8'</span>),
                headers={
                    <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
                },
                timeout=<span class="hljs-number">60</span>,
                params=self.config
            )
        except RequestException as err:
            <span class="hljs-function">raise <span class="hljs-title">GenerateFailed</span><span class="hljs-params">(err.message)</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">if</span> not resp:
                raise <span class="hljs-title">GenerateFailed</span><span class="hljs-params">(u<span class="hljs-string">"Failed to generate poster, got NOTHING from poster-man"</span>)</span>
            <span class="hljs-keyword">try</span>:
                resp.<span class="hljs-title">raise_for_status</span><span class="hljs-params">()</span>
            except requests.HTTPError as err:
                raise <span class="hljs-title">GenerateFailed</span><span class="hljs-params">(err.message)</span>
            <span class="hljs-keyword">else</span>:
                return resp.content
</span></code></pre>
<h3 data-nodeid="934">总结</h3>
<p data-nodeid="935" class="">这一讲我们介绍了 Puppeteer 的各种应用场景，并重点介绍了一个基于 Puppeteer 设计实现的海报服务系统。</p>
<p data-nodeid="936">本讲内容总结如下：</p>
<p data-nodeid="937"><img src="https://s0.lgstatic.com/i/image6/M00/21/60/Cgp9HWBUR8mAUFYXAALdEMP1LzI390.png" alt="Drawing 4.png" data-nodeid="1064"></p>
<p data-nodeid="938" class="">通过这几讲的学习，希望你能够从实践出发，对 Node.js 落地应用有一个更全面的认知。这里我也给大家留一个思考题，你平时开发中使用过 Puppeteer 吗？你还能基于 Puppeteer 想到哪些使用场景呢？欢迎在留言区和我分享你的经验。</p>

---

### 精选评论

##### \*聪：

> 用 puppeteer 来做爬虫项目

##### \*靖：

> 请问最后思维导图里面的英文字体是什么呀？好好看 😁

###### &nbsp;&nbsp;&nbsp; 编辑回复：

> &nbsp;&nbsp;&nbsp; 是 XMind 中的 Segoe Print 哦~

##### \*炜：

> 前几天面试腾讯,被问到如果优化 puppeteer,链接池还是没有答上来.

###### &nbsp;&nbsp;&nbsp; 编辑回复：

> &nbsp;&nbsp;&nbsp; 多积累一下经验，下次一定 OK 的！

##### \*\*3336：

> 老师讲的案例都有代码仓库嘛

###### &nbsp;&nbsp;&nbsp; 编辑回复：

> &nbsp;&nbsp;&nbsp; 注意看文中加超链接的地方，相关地址都在呐~
