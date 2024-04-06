<p data-nodeid="3596">前端工程化和基础建设这个话题，自然少不了分析构建工具。作为前端工程中最常见、最经典的构建工具，Webpack 必须要有一个独立小节进行精讲。可是，关于 Webpack 什么样的内容才更有意义呢？当前社区，Webpack 插件编写、loader 编写相关内容已经非常多了，甚至 Tapable 机制也已经有了涉猎。</p>
<p data-nodeid="3597">这一讲，我们独辟蹊径，从 Webpack 的实现入手，帮助你构建一个自己的工程化工具。</p>
<h3 data-nodeid="3598">Webpack 的初心和揭秘</h3>
<p data-nodeid="3599">我不建议对着 Webpack 源码讲解，因为 Webpack 是一个庞大的体系，其源码逐行讲解太过枯燥，真正能转化在技术积累上的内容较少。今天，我们先抽丝剥茧，从 Webpack 的使命谈起，相信你会有一个更加清晰的认知。</p>
<p data-nodeid="3600">Webpack 的介绍只有简单一句：</p>
<blockquote data-nodeid="3601">
<p data-nodeid="3602">Webpack is a static module bundler for modern JavaScript applications.</p>
</blockquote>
<p data-nodeid="3603">虽然 Webpack 看上去无所不能，但从其本质上来说，Webpack 实质就是一个“前端模块打包器”。前端模块打包器做的事情很简单：它帮助开发者将 JavaScript 模块（各种类型的模块化规范）打包为一个或多个 JavaScript 脚本文件。</p>
<p data-nodeid="3604">我们回到最初起源，前端为什么需要一个模块打包器呢？其实理由很简单：</p>
<ul data-nodeid="3605">
<li data-nodeid="3606">
<p data-nodeid="3607">不是所有浏览器都直接支持 JavaScript 规范；</p>
</li>
<li data-nodeid="3608">
<p data-nodeid="3609">前端需要管理依赖脚本，把控不同脚本加载的顺序；</p>
</li>
<li data-nodeid="3610">
<p data-nodeid="3611">前端需要按顺序加载不同类型的静态资源。</p>
</li>
</ul>
<p data-nodeid="3612">想象一下，我们的 Web 应用有这样一段内容：</p>
<pre class="lang-java" data-nodeid="3613"><code data-language="java">&lt;html&gt;
  &lt;script src="/src/1.js"&gt;&lt;/script&gt;
  &lt;script src="/src/2.js"&gt;&lt;/script&gt;
  &lt;script src="/src/3.js"&gt;&lt;/script&gt;
  &lt;script src="/src/4.js"&gt;&lt;/script&gt;
  &lt;script src="/src/5.js"&gt;&lt;/script&gt;
  &lt;script src="/src/6.js"&gt;&lt;/script&gt;
&lt;/html&gt;
</code></pre>
<p data-nodeid="3614">每个 JavaScript 文件都需要额外的 HTTP 请求获取，并且因为依赖关系，<code data-backticks="1" data-nodeid="3778">1.js</code>到<code data-backticks="1" data-nodeid="3780">6.js</code>需要按顺序加载。因此，打包需求应运而生：</p>
<pre class="lang-java" data-nodeid="3615"><code data-language="java">&lt;html&gt;
  &lt;script src="/dist/bundle.js"&gt;&lt;/script&gt;
&lt;/html&gt;
</code></pre>
<p data-nodeid="3616">这里需要注意几点：</p>
<ul data-nodeid="5616">
<li data-nodeid="5617">
<p data-nodeid="5618" class="">随着 HTTP/2 技术的推广，未来长远上看，浏览器像上述代码一样发送多个请求不再是性能瓶颈，但目前来看还过于乐观（更多内容参见 <a href="https://developers.google.com/web/fundamentals/performance/http2/" data-nodeid="5624">HTTP/2 简介</a>）；</p>
</li>
<li data-nodeid="5619">
<p data-nodeid="5620"><strong data-nodeid="5636">并不是将所有脚本都打包在一起就是性能最优</strong>，<code data-backticks="1" data-nodeid="5630">/dist/bundle.js</code>的 size 一般较大，但这属于另外“性能优化”话题了，相关内容，我们在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=584#/detail/pc?id=5915" data-nodeid="5634">10 讲“代码拆分和按需加载：缩减 bundle size，把性能做到极致”</a>中已有涉及。</p>
</li>
</ul>

<p data-nodeid="3622">总之，打包器的需求就是前端“刚需”，实现上述打包需要也并不简单，需要考虑：</p>
<ul data-nodeid="3623">
<li data-nodeid="3624">
<p data-nodeid="3625">如何维护不同脚本的打包顺序，保证<code data-backticks="1" data-nodeid="3801">bundle.js</code>的可用性；</p>
</li>
<li data-nodeid="3626">
<p data-nodeid="3627">如何避免不同脚本、不同模块的命名冲突；</p>
</li>
<li data-nodeid="3628">
<p data-nodeid="3629">在打包过程中，如何确定真正需要的脚本，而不将没有用到的脚本排除在<code data-backticks="1" data-nodeid="3805">bundle.js</code>之外？</p>
</li>
</ul>
<p data-nodeid="3630">事实上，虽然当前 Webpack 依靠 loader 机制实现了对于不同类型资源的解析和打包，依靠插件机制实现了第三方介入编译构建的过程，但究其本质，Webpack 只是一个“无所不能”的打包器，实现了：</p>
<pre class="lang-java" data-nodeid="3631"><code data-language="java">a.js + b.js + c.js. =&gt; bundle.js
</code></pre>
<p data-nodeid="3632">的能力。</p>
<p data-nodeid="3633">下面我们继续揭秘 Webpack 在打包过程中的奥秘。</p>
<p data-nodeid="3634">为了简化，我们以 ESM 模块化规范举例。假设我们有：</p>
<ul data-nodeid="3635">
<li data-nodeid="3636">
<p data-nodeid="3637"><code data-backticks="1" data-nodeid="3811">circle.js</code>模块求圆形面积；</p>
</li>
<li data-nodeid="3638">
<p data-nodeid="3639"><code data-backticks="1" data-nodeid="3813">square.js</code>模块求正方形面积；</p>
</li>
<li data-nodeid="3640">
<p data-nodeid="3641"><code data-backticks="1" data-nodeid="3815">app.js</code>模块作为主模块。</p>
</li>
</ul>
<p data-nodeid="3642">对应内容分别如下代码：</p>
<pre class="lang-java" data-nodeid="3643"><code data-language="java"><span class="hljs-comment">// filename: circle.js</span>
<span class="hljs-keyword">const</span> PI = <span class="hljs-number">3.141</span>;
<span class="hljs-function">export <span class="hljs-keyword">default</span> function <span class="hljs-title">area</span><span class="hljs-params">(radius)</span> </span>{
  <span class="hljs-keyword">return</span> PI * radius * radius;
}
<span class="hljs-comment">// filename: square.js</span>
<span class="hljs-function">export <span class="hljs-keyword">default</span> function <span class="hljs-title">area</span><span class="hljs-params">(side)</span> </span>{
  <span class="hljs-keyword">return</span> side * side;
}
<span class="hljs-comment">// filename: app.js</span>
<span class="hljs-keyword">import</span> squareArea from <span class="hljs-string">'./square'</span>;
<span class="hljs-keyword">import</span> circleArea from <span class="hljs-string">'./circle'</span>;
console.log(<span class="hljs-string">'Area of square: '</span>, squareArea(<span class="hljs-number">5</span>));
console.log(<span class="hljs-string">'Area of circle'</span>, circleArea(<span class="hljs-number">5</span>));
</code></pre>
<p data-nodeid="3644">经过 Webpack 打包之后，我们用<code data-backticks="1" data-nodeid="3819">bundle.js</code>来表示 Webpack 处理结果（精简并可读化处理后）：</p>
<pre class="lang-java" data-nodeid="3645"><code data-language="java"><span class="hljs-comment">// filename: bundle.js</span>
<span class="hljs-keyword">const</span> modules = {
  <span class="hljs-string">'circle.js'</span>: function(<span class="hljs-keyword">exports</span>, require) {
    <span class="hljs-keyword">const</span> PI = <span class="hljs-number">3.141</span>;
    <span class="hljs-keyword">exports</span>.<span class="hljs-keyword">default</span> = <span class="hljs-function">function <span class="hljs-title">area</span><span class="hljs-params">(radius)</span> </span>{
      <span class="hljs-keyword">return</span> PI * radius * radius;
    }
  },
  <span class="hljs-string">'square.js'</span>: function(<span class="hljs-keyword">exports</span>, require) {
    <span class="hljs-keyword">exports</span>.<span class="hljs-keyword">default</span> = <span class="hljs-function">function <span class="hljs-title">area</span><span class="hljs-params">(side)</span> </span>{
      <span class="hljs-keyword">return</span> side * side;
    }
  },
  <span class="hljs-string">'app.js'</span>: function(<span class="hljs-keyword">exports</span>, require) {
    <span class="hljs-keyword">const</span> squareArea = require(<span class="hljs-string">'square.js'</span>).<span class="hljs-keyword">default</span>;
    <span class="hljs-keyword">const</span> circleArea = require(<span class="hljs-string">'circle.js'</span>).<span class="hljs-keyword">default</span>;
    console.log(<span class="hljs-string">'Area of square: '</span>, squareArea(<span class="hljs-number">5</span>))
    console.log(<span class="hljs-string">'Area of circle'</span>, circleArea(<span class="hljs-number">5</span>))
  }
}
webpackBundle({
  modules,
  entry: <span class="hljs-string">'app.js'</span>
});
</code></pre>
<p data-nodeid="3646">如上代码，我们维护了<code data-backticks="1" data-nodeid="3822">modules</code>变量，存储了不同模块信息，这个 map 中，key 为模块路径名，value 为一个被 wrapped 过的模块函数，我们先称之为<code data-backticks="1" data-nodeid="3824">module factory function</code>，该函数形如：</p>
<pre class="lang-java" data-nodeid="3647"><code data-language="java">function(<span class="hljs-keyword">exports</span>, require) {
	<span class="hljs-comment">// 模块内容</span>
}
</code></pre>
<p data-nodeid="3648">这样做是为每个模块提供<code data-backticks="1" data-nodeid="3827">exports</code>和<code data-backticks="1" data-nodeid="3829">require</code>能力，同时<strong data-nodeid="3835">保证了每个模块都处于一个隔离的函数作用域范围</strong>。</p>
<p data-nodeid="3649">有了<code data-backticks="1" data-nodeid="3837">modules</code>变量还不够，我们依赖<code data-backticks="1" data-nodeid="3839">webpackBundle</code>方法，将所有内容整合在一起。<code data-backticks="1" data-nodeid="3841">webpackBundle</code>方法接收<code data-backticks="1" data-nodeid="3843">modules</code>模块信息以及一个入口脚本。代码如下：</p>
<pre class="lang-java" data-nodeid="3650"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">webpackBundle</span><span class="hljs-params">({ modules, entry })</span> </span>{
  <span class="hljs-keyword">const</span> moduleCache = {};
  
  <span class="hljs-keyword">const</span> require = moduleName =&gt; {
    <span class="hljs-comment">// 如果已经解析并缓存过，直接返回缓存内容</span>
    <span class="hljs-keyword">if</span> (moduleCache[moduleName]) {
      <span class="hljs-keyword">return</span> moduleCache[moduleName];
    }
    
    <span class="hljs-keyword">const</span> <span class="hljs-keyword">exports</span> = {};
    <span class="hljs-comment">// 这里是为了防止循环引用</span>
    moduleCache[moduleName] = <span class="hljs-keyword">exports</span>;
    <span class="hljs-comment">// 执行模块内容，如果遇见了 require 方法，则继续递归执行 require 方法 </span>
    modules[moduleName](<span class="hljs-keyword">exports</span>, require);
    
    <span class="hljs-keyword">return</span> moduleCache[moduleName];
  };
  require(entry);
}
</code></pre>
<p data-nodeid="3651">上述代码中需要注意：<strong data-nodeid="3853">webpackBundle 方法中声明的</strong><code data-backticks="1" data-nodeid="3849">require</code>方法和 CommonJS 规范中的 require 是两回事，该<code data-backticks="1" data-nodeid="3851">require</code>方法是 Webpack 自己实现的模块化解决方案。</p>
<p data-nodeid="3652">我们通过下图来总结一下 Webpack 风格的打包器原理和流程：</p>
<p data-nodeid="7255"><img src="https://s0.lgstatic.com/i/image/M00/91/75/Ciqc1GAOlIOAYZLfAAFmQUf14uQ501.png" alt="Lark20210125-174549.png" data-nodeid="7259"></p>
<div data-nodeid="7256" class=""><p style="text-align:center">Webpack 打包器原理和流程图</p></div>



<p data-nodeid="3655">讲到这里，我们再扩充一下另一个打包器——Rollup 的打包原理，针对上述代码，Rollup 打包过后的产出为：</p>
<pre class="lang-java" data-nodeid="3656"><code data-language="java"><span class="hljs-keyword">const</span> PI = <span class="hljs-number">3.141</span>;
function circle$area(radius) {
  <span class="hljs-keyword">return</span> PI * radius * radius;
}
function square$area(side) {
  <span class="hljs-keyword">return</span> side * side;
}
console.log(<span class="hljs-string">'Area of square: '</span>, square$area(<span class="hljs-number">5</span>));
console.log(<span class="hljs-string">'Area of circle'</span>, circle$area(<span class="hljs-number">5</span>));
</code></pre>
<p data-nodeid="3657">如上代码，我们看到，Rollup 的原理思想与 Webpack 不同：<strong data-nodeid="3865">Rollup 不会维护一个 module map，而是将所有模块拍平（flatten）放到 bundle 中</strong>，也就不存在包裹函数（module factory function）。</p>
<p data-nodeid="3658">为了保证命名冲突不出现，Rollup 将函数和变量名进行了改写，在模块脚本<code data-backticks="1" data-nodeid="3867">circle.js</code>和<code data-backticks="1" data-nodeid="3869">square.js</code>中，都命名了一个<code data-backticks="1" data-nodeid="3871">area</code>方法。经过 Rollup 打包后，<code data-backticks="1" data-nodeid="3873">area</code>方法根据模块主体，进行了重命名。</p>
<p data-nodeid="3659">我们将 Webpack 和 Rollup 的打包方式进行对比总结。</p>
<ul data-nodeid="3660">
<li data-nodeid="3661">
<p data-nodeid="3662">Webpack 理念：</p>
</li>
</ul>
<ol data-nodeid="3663">
<li data-nodeid="3664">
<p data-nodeid="3665">使用了 module map，维护项目中的依赖关系；</p>
</li>
<li data-nodeid="3666">
<p data-nodeid="3667">使用了包裹函数，对每个模块进行包裹；</p>
</li>
<li data-nodeid="3668">
<p data-nodeid="3669">使用了一个“runtime”方法（这里举例为<code data-backticks="1" data-nodeid="3880">webpackBundle</code>），最终合成 bundle 内容。</p>
</li>
</ol>
<ul data-nodeid="3670">
<li data-nodeid="3671">
<p data-nodeid="3672">Rollup 理念：</p>
</li>
</ul>
<ol data-nodeid="3673">
<li data-nodeid="3674">
<p data-nodeid="3675">将每个模块拍平；</p>
</li>
<li data-nodeid="3676">
<p data-nodeid="3677">不使用包裹函数，不需要对每个模块进行包裹。</p>
</li>
</ol>
<p data-nodeid="3678">不同的理念也会造成不同的打包结果，这里我想给你留一个思考题：<strong data-nodeid="3890">在 Rollup 处理理念下，如果模块出现了循环依赖，会发生什么现象呢</strong>？</p>
<h3 data-nodeid="3679">手动实现打包器</h3>
<p data-nodeid="3680">前面内容我们剖析了以 Webpak、Rollup 为代表的打包器核心原理。下面内容，我们将手动实现一个自己的简易打包器，我们的目标将会向 Webpack 打包设计对齐。核心思路如下：</p>
<ol data-nodeid="3681">
<li data-nodeid="3682">
<p data-nodeid="3683">读取入口文件（比如<code data-backticks="1" data-nodeid="3894">entry.js</code>）；</p>
</li>
<li data-nodeid="3684">
<p data-nodeid="3685">基于 AST 分析入口文件，并产出依赖列表；</p>
</li>
<li data-nodeid="3686">
<p data-nodeid="3687">使用 Babel 将相关模块编译到 ES5；</p>
</li>
<li data-nodeid="3688">
<p data-nodeid="3689">对每个依赖模块产出一个唯一的 ID，方便后续读取模块相关内容；</p>
</li>
<li data-nodeid="3690">
<p data-nodeid="3691">将每个依赖以及经过 Babel 编译过后的内容，存储在一个对象中进行维护；</p>
</li>
<li data-nodeid="3692">
<p data-nodeid="3693">遍历上一步中的对象，构建出一个依赖图（Dependency Graph）；</p>
</li>
<li data-nodeid="3694">
<p data-nodeid="3695">将各模块内容 bundle 产出。</p>
</li>
</ol>
<p data-nodeid="3696">我们来一步一步实现。首先创建项目：</p>
<pre class="lang-java" data-nodeid="3697"><code data-language="java">mkdir bundler-playground &amp;&amp; cd $_
</code></pre>
<p data-nodeid="3698">并启动 npm：</p>
<pre class="lang-java" data-nodeid="3699"><code data-language="java">npm init -y
</code></pre>
<p data-nodeid="3700">安装以下依赖：</p>
<ul data-nodeid="3701">
<li data-nodeid="3702">
<p data-nodeid="3703"><code data-backticks="1" data-nodeid="3905">@babel/parser</code>用于分析源代码，产出 AST；</p>
</li>
<li data-nodeid="3704">
<p data-nodeid="3705"><code data-backticks="1" data-nodeid="3907">@babel/traverse</code>用于遍历 AST，找到 import 声明；</p>
</li>
<li data-nodeid="3706">
<p data-nodeid="3707"><code data-backticks="1" data-nodeid="3909">@babel/core</code>用于编译，将源代码编译为 ES5；</p>
</li>
<li data-nodeid="3708">
<p data-nodeid="3709"><code data-backticks="1" data-nodeid="3911">@babel/preset-env</code>搭配<code data-backticks="1" data-nodeid="3913">@babel/core</code>使用；</p>
</li>
<li data-nodeid="3710">
<p data-nodeid="3711"><code data-backticks="1" data-nodeid="3915">resolve</code>用于获取依赖的绝对路径。</p>
</li>
</ul>
<p data-nodeid="3712">相关命令：</p>
<pre class="lang-java" data-nodeid="3713"><code data-language="java">npm install --save <span class="hljs-meta">@babel</span>/parser <span class="hljs-meta">@babel</span>/traverse <span class="hljs-meta">@babel</span>/core  <span class="hljs-meta">@babel</span>/preset-env resolve
</code></pre>
<p data-nodeid="3714">做完了这些，我们开始核心逻辑的编写，创建<code data-backticks="1" data-nodeid="3919">index.js</code>，并引入如下依赖代码：</p>
<pre class="lang-java" data-nodeid="3715"><code data-language="java"> <span class="hljs-keyword">const</span> fs = require(<span class="hljs-string">"fs"</span>);
 <span class="hljs-keyword">const</span> path = require(<span class="hljs-string">"path"</span>);
 <span class="hljs-keyword">const</span> parser = require(<span class="hljs-string">"@babel/parser"</span>);
 <span class="hljs-keyword">const</span> traverse = require(<span class="hljs-string">"@babel/traverse"</span>).<span class="hljs-keyword">default</span>;
 <span class="hljs-keyword">const</span> babel = require(<span class="hljs-string">"@babel/core"</span>); 
 <span class="hljs-keyword">const</span> resolve = require(<span class="hljs-string">"resolve"</span>).sync;
</code></pre>
<p data-nodeid="3716">接着，我们维护一个全局 ID，并通过遍历 AST，访问<code data-backticks="1" data-nodeid="3922">ImportDeclaration</code>节点，收集依赖到<code data-backticks="1" data-nodeid="3924">deps</code>数组中，同时完成 Babel 降级编译：</p>
<pre class="lang-java" data-nodeid="3717"><code data-language="java">let ID = <span class="hljs-number">0</span>;
 
<span class="hljs-function">function <span class="hljs-title">createModuleInfo</span><span class="hljs-params">(filePath)</span> </span>{
    <span class="hljs-comment">// 读取模块源代码</span>
    <span class="hljs-keyword">const</span> content = fs.readFileSync(filePath, <span class="hljs-string">"utf-8"</span>);
    <span class="hljs-comment">// 对源代码进行 AST 产出</span>
    <span class="hljs-keyword">const</span> ast = parser.parse(content, {
    sourceType: <span class="hljs-string">"module"</span>
    });
    <span class="hljs-comment">// 相关模块依赖数组</span>
    <span class="hljs-keyword">const</span> deps = [];
    <span class="hljs-comment">// 遍历模块 AST，将依赖推入 deps 数组中</span>
    traverse(ast, {
        ImportDeclaration: ({ node }) =&gt; {
          deps.push(node.source.value);
        }
    });
    <span class="hljs-keyword">const</span> id = ID++;
    <span class="hljs-comment">// 编译为 ES5</span>
    <span class="hljs-keyword">const</span> { code } = babel.transformFromAstSync(ast, <span class="hljs-keyword">null</span>, {
        presets: [<span class="hljs-string">"@babel/preset-env"</span>]
    });
    <span class="hljs-keyword">return</span> {
        id,
        filePath,
        deps,
        code
    };
}
</code></pre>
<p data-nodeid="3718">上述代码中，相关注释已经比较明晰了。这里需要指出的是，我们采用了<strong data-nodeid="3935">自增 ID</strong>的方式，<strong data-nodeid="3936">如果采用随机的 GUID，会是更安全的做法</strong>。</p>
<p data-nodeid="3719">至此，我们实现了对一个模块的分析，并产出：</p>
<ul data-nodeid="3720">
<li data-nodeid="3721">
<p data-nodeid="3722">该模块对应 ID；</p>
</li>
<li data-nodeid="3723">
<p data-nodeid="3724">该模块路径；</p>
</li>
<li data-nodeid="3725">
<p data-nodeid="3726">该模块的依赖数组；</p>
</li>
<li data-nodeid="3727">
<p data-nodeid="3728">该模块经过 Babel 编译后的代码。</p>
</li>
</ul>
<p data-nodeid="3729">接下来，我们生成整个项目的依赖树（Dependency Graph）。代码如下：</p>
<pre class="lang-java" data-nodeid="3730"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">createDependencyGraph</span><span class="hljs-params">(entry)</span> </span>{
    <span class="hljs-comment">// 获取模块信息</span>
    <span class="hljs-keyword">const</span> entryInfo = createModuleInfo(entry);
    <span class="hljs-comment">// 项目依赖树</span>
    <span class="hljs-keyword">const</span> graphArr = [];
    graphArr.push(entryInfo);
    <span class="hljs-comment">// 以入口模块为起点，遍历整个项目依赖的模块，并将每个模块信息维护到 graphArr 中</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> <span class="hljs-keyword">module</span> of graphArr) {
        <span class="hljs-keyword">module</span>.map = {};
        <span class="hljs-keyword">module</span>.deps.forEach(depPath =&gt; {
            <span class="hljs-keyword">const</span> baseDir = path.dirname(<span class="hljs-keyword">module</span>.filePath);
            <span class="hljs-keyword">const</span> moduleDepPath = resolve(depPath, { baseDir });
            <span class="hljs-keyword">const</span> moduleInfo = createModuleInfo(moduleDepPath);
            graphArr.push(moduleInfo);
            <span class="hljs-keyword">module</span>.map[depPath] = moduleInfo.id;
        });
    }
    <span class="hljs-keyword">return</span> graphArr;
}
</code></pre>
<p data-nodeid="3731">上述代码中，我们使用一个数组类型的变量<code data-backticks="1" data-nodeid="3944">graphArr</code>来描述整个项目的依赖树情况。最后，我们基于<code data-backticks="1" data-nodeid="3946">graphArr</code>内容，将相关模块进行打包。</p>
<pre class="lang-java" data-nodeid="3732"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">pack</span><span class="hljs-params">(graph)</span> </span>{
    <span class="hljs-keyword">const</span> moduleArgArr = graph.map(<span class="hljs-keyword">module</span> =&gt; {
        <span class="hljs-keyword">return</span> `${<span class="hljs-keyword">module</span>.id}: {
            factory: (<span class="hljs-keyword">exports</span>, require) =&gt; {
                ${<span class="hljs-keyword">module</span>.code}
            },
            map: ${JSON.stringify(<span class="hljs-keyword">module</span>.map)}
        }`;
    });
    <span class="hljs-keyword">const</span> iifeBundler = `(function(modules){
        <span class="hljs-keyword">const</span> require = id =&gt; {
            <span class="hljs-keyword">const</span> {factory, map} = modules[id];
            <span class="hljs-keyword">const</span> localRequire = requireDeclarationName =&gt; require(map[requireDeclarationName]); 
            <span class="hljs-keyword">const</span> <span class="hljs-keyword">module</span> = {<span class="hljs-keyword">exports</span>: {}};
            factory(<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>, localRequire); 
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>; 
        }
        require(<span class="hljs-number">0</span>);
        
        })({${moduleArgArr.join()}})
    `;
    <span class="hljs-keyword">return</span> iifeBundler;
}
</code></pre>
<p data-nodeid="3733">如上代码，我们创建一个对应每个模块的模板对象：</p>
<pre class="lang-java" data-nodeid="3734"><code data-language="java"><span class="hljs-keyword">return</span> `${<span class="hljs-keyword">module</span>.id}: {
  factory: (<span class="hljs-keyword">exports</span>, require) =&gt; {
    ${<span class="hljs-keyword">module</span>.code}
  },
  map: ${JSON.stringify(<span class="hljs-keyword">module</span>.map)}
  }`;
</code></pre>
<p data-nodeid="3735">在<code data-backticks="1" data-nodeid="3950">factory</code>对应的内容中，我们包裹模块代码，并注入<code data-backticks="1" data-nodeid="3952">exports</code>和<code data-backticks="1" data-nodeid="3954">require</code>两个参数。同时，我们构造了一个 IIFE 风格的代码区块，用于将依赖树中的代码串联在一起。最难理解的部分在于：</p>
<pre class="lang-java" data-nodeid="3736"><code data-language="java">  <span class="hljs-keyword">const</span> iifeBundler = `(function(modules){
    <span class="hljs-keyword">const</span> require = id =&gt; {
      <span class="hljs-keyword">const</span> {factory, map} = modules[id];
      <span class="hljs-keyword">const</span> localRequire = requireDeclarationName =&gt; require(map[requireDeclarationName]); 
      <span class="hljs-keyword">const</span> <span class="hljs-keyword">module</span> = {<span class="hljs-keyword">exports</span>: {}};
      factory(<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>, localRequire); 
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>; 
    } 
    require(<span class="hljs-number">0</span>);
  })({${moduleArgArr.join()}})
  `;
</code></pre>
<p data-nodeid="3737">针对这段代码，我们进行更细致的分析。</p>
<ul data-nodeid="3738">
<li data-nodeid="3739">
<p data-nodeid="3740">使用 IIFE 的方式，来保证模块变量不会影响到全局作用域。</p>
</li>
<li data-nodeid="3741">
<p data-nodeid="3742">构造好的项目依赖树（Dependency Graph）数组，将会作为名为<code data-backticks="1" data-nodeid="3959">modules</code>的行参，传递给 IIFE。</p>
</li>
<li data-nodeid="3743">
<p data-nodeid="3744">我们构造了<code data-backticks="1" data-nodeid="3962">require(id)</code>方法，这个方法的意义在于：</p>
</li>
</ul>
<ol data-nodeid="3745">
<li data-nodeid="3746">
<p data-nodeid="3747">通过<code data-backticks="1" data-nodeid="3965">require(map[requireDeclarationName])</code>方式，按顺序递归调用各个依赖模块；</p>
</li>
<li data-nodeid="3748">
<p data-nodeid="3749">通过调用<code data-backticks="1" data-nodeid="3968">factory(module.exports, localRequire)</code>执行模块相关代码；</p>
</li>
<li data-nodeid="3750">
<p data-nodeid="3751">该方法最终返回<code data-backticks="1" data-nodeid="3971">module.exports</code>对象，module.exports 最初值为空对象（<code data-backticks="1" data-nodeid="3973">{exports: {}}</code>），但在一次次调用<code data-backticks="1" data-nodeid="3975">factory()</code>函数后，<code data-backticks="1" data-nodeid="3977">module.exports</code>对象内容已经包含了模块对外暴露的内容了。</p>
</li>
</ol>
<h3 data-nodeid="3752">总结</h3>
<p data-nodeid="3753">这一讲虽然标题包含“解析 Webpack 源码”，但我们并没有采用源码解读的方式展开，而是从打包器的设计原理入手，换一种角度进行 Webpack 源码解读，并最终动手实现了一个自己的简易打包器。</p>
<p data-nodeid="3754">实际上，打包过程主要分为两步：<strong data-nodeid="3990">依赖解析</strong>（Dependency Resolution）和<strong data-nodeid="3991">代码打包</strong>（Bundling）：</p>
<ul data-nodeid="3755">
<li data-nodeid="3756">
<p data-nodeid="3757">在依赖解析过程中，我们通过 AST 技术，找到每个模块的依赖模块，并组合为最终的项目依赖树。</p>
</li>
<li data-nodeid="3758">
<p data-nodeid="3759">在代码打包过程中，我们使用 Babel 对源代码进行编译，其中也包括了对 imports / exports（即对 ESM） 的编译。</p>
</li>
</ul>
<p data-nodeid="3760">整个过程稍微有些抽象，需要你用心体会。</p>
<p data-nodeid="3761">主要内容总结为下图：</p>
<p data-nodeid="8064" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image2/M01/09/65/Cip5yGAOlKiAA3uyAAG87LhMy8s651.png" alt="Drawing 1.png" data-nodeid="8067"></p>

<p data-nodeid="3763">在实际生产环节，打包器当然功能更多，比如需要考虑：code spliting 甚至 watch mode 以及 reloading 能力等。但是不管什么样的特性和能力，只要我们理清最初心，掌握最基本的思想，任何疑问都会迎刃而解。</p>

---

### 精选评论

##### *帅：
> 妙啊~

