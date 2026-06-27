import{_ as a,o as s,c as p,a2 as e}from"./chunks/framework.m9rfQn3T.js";const g=JSON.parse('{"title":"图片预加载","description":"","frontmatter":{"title":"图片预加载","date":"2017-06-06T16:06:21.000Z","permalink":"/pages/ed537b/","categories":["hexo迁移数据"],"author":{"name":"神族九帝","link":"https://github.com/wu529778790","permalink":null,"categories":null},"sidebar":"auto","tags":[null]},"headers":[],"relativePath":"20.笔记/1000.hexo迁移数据/图片预加载.md","filePath":"20.笔记/1000.hexo迁移数据/图片预加载.md","lastUpdated":1782538095000}'),l={name:"20.笔记/1000.hexo迁移数据/图片预加载.md"};function t(i,n,c,o,d,r){return s(),p("div",null,[...n[0]||(n[0]=[e(`<p>预加载图片是提高用户体验的一个很好方法。图片预先加载到浏览器中，访问者便可顺利地在你的网站上冲浪，并享受到极快的加载速度。这对图片画廊及图片占据很大比例的网站来说十分有利，它保证了图片快速、无缝地发布，也可帮助用户在浏览你网站内容时获得更好的用户体验。本文将分享三个不同的预加载技术，来增强网站的性能与可用性。</p><p>&lt;!--more--&gt;</p><p>方法一：用 CSS 和 JavaScript 实现预加载</p><p>实现预加载图片有很多方法，包括使用 CSS、JavaScript 及两者的各种组合。这些技术可根据不同设计场景设计出相应的解决方案，十分高效。</p><p>单纯使用 CSS，可容易、高效地预加载图片，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	#preload-01 { background: url(-01.png) no-repeat -9999px -9999px; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	#preload-02 { background: url(-02.png) no-repeat -9999px -9999px; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	#preload-03 { background: url(-03.png) no-repeat -9999px -9999px; }</span></span></code></pre></div><p>将这三个 ID 选择器应用到(X)HTML 元素中，我们便可通过 CSS 的 background 属性将图片预加载到屏幕外的背景上。只要这些图片的路径保持不变，当它们在 Web 页面的其他地方被调用时，浏览器就会在渲染过程中使用预加载（缓存）的图片。简单、高效，不需要任何 JavaScript。</p><p>该方法虽然高效，但仍有改进余地。使用该法加载的图片会同页面的其他内容一起加载，增加了页面的整体加载时间。为了解决这个问题，我们增加了一些 JavaScript 代码，来推迟预加载的时间，直到页面加载完毕。代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	// better image preloading @ &lt;a href=&quot;;&gt;;/a&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	function preloader() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (document.getElementById) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        document.getElementById(&quot;preload-01&quot;).style.background = &quot;url() no-repeat -9999px -9999px&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        document.getElementById(&quot;preload-02&quot;).style.background = &quot;url() no-repeat -9999px -9999px&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        document.getElementById(&quot;preload-03&quot;).style.background = &quot;url() no-repeat -9999px -9999px&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	function addLoadEvent(func) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var oldonload = window.onload;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (typeof window.onload != &#39;function&#39;) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        window.onload = func;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        window.onload = function() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (oldonload) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                oldonload();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            func();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	addLoadEvent(preloader);</span></span></code></pre></div><p>在该脚本的第一部分，我们获取使用类选择器的元素，并为其设置了 background 属性，以预加载不同的图片。</p><p>该脚本的第二部分，我们使用 addLoadEvent()函数来延迟 preloader()函数的加载时间，直到页面加载完毕。</p><p>如果 JavaScript 无法在用户的浏览器中正常运行，会发生什么？很简单，图片不会被预加载，当页面调用图片时，正常显示即可。</p><p>方法二：仅使用 JavaScript 实现预加载</p><p>上述方法有时确实很高效，但我们逐渐发现它在实际实现过程中会耗费太多时间。相反，我更喜欢使用纯 JavaScript 来实现图片的预加载。下面将提供两种这样的预加载方法，它们可以很漂亮地工作于所有现代浏览器之上。</p><p>JavaScript 代码段 1</p><p>只需简单编辑、加载所需要图片的路径与名称即可，很容易实现：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	&lt;div class=&quot;hidden&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!--//--&gt;&lt;![CDATA[//&gt;&lt;!--</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var images = new Array()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            function preload() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                for (i = 0; i &lt; preload.arguments.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    images[i] = new Image()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    images[i].src = preload.arguments[i]</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            preload(</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                &quot;;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                &quot;;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                &quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //--&gt;&lt;!]]&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;/div&gt;</span></span></code></pre></div><p>该方法尤其适用预加载大量的图片。我的画廊网站使用该技术，预加载图片数量达 50 多张。将该脚本应用到登录页面，只要用户输入登录帐号，大部分画廊图片将被预加载。</p><p>JavaScript 代码段 2</p><p>该方法与上面的方法类似，也可以预加载任意数量的图片。将下面的脚本添加入任何 Web 页中，根据程序指令进行编辑即可。</p><pre><code>&lt;div class=&quot;hidden&quot;&gt;

&lt;script type=&quot;text/javascript&quot;&gt;

    &lt;!--//--&gt;&lt;![CDATA[//&gt;&lt;!--

        if (document.images) {

            img1 = new Image();

            img2 = new Image();

            img3 = new Image();

            img1.src = &quot;;;

            img2.src = &quot;;;

            img3.src = &quot;;;

        }

    //--&gt;&lt;!]]&gt;

&lt;/script&gt;

&lt;/div&gt;
</code></pre><p>正如所看见，每加载一个图片都需要创建一个变量，如“img1 = new Image();”，及图片源地址声明，如“img3.src = &quot;../path/to/image-003.gif&quot;;”。参考该模式，你可根据需要加载任意多的图片。</p><p>我们又对该方法进行了改进。将该脚本封装入一个函数中，并使用 addLoadEvent（），延迟预加载时间，直到页面加载完毕。</p><pre><code>function preloader() {

if (document.images) {

    var img1 = new Image();

    var img2 = new Image();

    var img3 = new Image();

    img1.src = &quot;;;

    img2.src = &quot;;;

    img3.src = &quot;;;

}

}

function addLoadEvent(func) {

var oldonload = window.onload;

if (typeof window.onload != &#39;function&#39;) {

    window.onload = func;

} else {

    window.onload = function() {

        if (oldonload) {

            oldonload();

        }

        func();

    }

}

}

addLoadEvent(preloader);
</code></pre><p>方法三：使用 Ajax 实现预加载</p><p>上面所给出的方法似乎不够酷，那现在来看一个使用 Ajax 实现图片预加载的方法。该方法利用 DOM，不仅仅预加载图片，还会预加载 CSS、JavaScript 等相关的东西。使用 Ajax，比直接使用 JavaScript，优越之处在于 JavaScript 和 CSS 的加载不会影响到当前页面。该方法简洁、高效。 window.onload = function() {</p><pre><code>setTimeout(function() {

    // XHR to request a JS and a CSS

    var xhr = new XMLHttpRequest();

    xhr.open(&#39;GET&#39;, &#39;;);

    xhr.send(&#39;&#39;);

    xhr = new XMLHttpRequest();

    xhr.open(&#39;GET&#39;, &#39;;);

    xhr.send(&#39;&#39;);

    // preload image

    new Image().src = &quot;;;

}, 1000);

};
</code></pre><p>上面代码预加载了“preload.js”、“preload.css”和“preload.png”。1000 毫秒的超时是为了防止脚本挂起，而导致正常页面出现功能问题。</p><p>下面，我们看看如何用 JavaScript 来实现该加载过程：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    window.onload = function() {</span></span>
<span class="line"><span>    setTimeout(function() {</span></span>
<span class="line"><span>        // reference to &lt;head&gt;</span></span>
<span class="line"><span>        var head = document.getElementsByTagName(&#39;head&#39;)[0];</span></span>
<span class="line"><span>        // a new CSS</span></span>
<span class="line"><span>        var css = document.createElement(&#39;link&#39;);</span></span>
<span class="line"><span>        css.type = &quot;text/css&quot;;</span></span>
<span class="line"><span>        css.rel  = &quot;stylesheet&quot;;</span></span>
<span class="line"><span>        css.href = &quot;;;</span></span>
<span class="line"><span>        // a new JS</span></span>
<span class="line"><span>        var js  = document.createElement(&quot;script&quot;);</span></span>
<span class="line"><span>        js.type = &quot;text/javascript&quot;;</span></span>
<span class="line"><span>        js.src  = &quot;;;</span></span>
<span class="line"><span>        // preload JS and CSS</span></span>
<span class="line"><span>        head.appendChild(css);</span></span>
<span class="line"><span>        head.appendChild(js);</span></span>
<span class="line"><span>        // preload image</span></span>
<span class="line"><span>        new Image().src = &quot;;;</span></span>
<span class="line"><span>    }, 1000);</span></span>
<span class="line"><span>    };</span></span></code></pre></div><p>这里，我们通过 DOM 创建三个元素来实现三个文件的预加载。正如上面提到的那样，使用 Ajax，加载文件不会应用到加载页面上。从这点上看，Ajax 方法优越于 JavaScript。</p>`,31)])])}const m=a(l,[["render",t]]);export{g as __pageData,m as default};
