import{_ as e,o as n,c as o,a2 as a}from"./chunks/framework.m9rfQn3T.js";const d=JSON.parse('{"title":"移动端rem布局-阿里","description":"","frontmatter":{"title":"移动端rem布局-阿里","date":"2017-06-06T16:06:21.000Z","permalink":"/pages/de97d6/","categories":["hexo迁移数据"],"author":{"name":"神族九帝","link":"https://github.com/wu529778790","permalink":null,"categories":null},"sidebar":"auto","tags":[null]},"headers":[],"relativePath":"20.笔记/1000.hexo迁移数据/移动端rem布局-阿里.md","filePath":"20.笔记/1000.hexo迁移数据/移动端rem布局-阿里.md","lastUpdated":1782538095000}'),i={name:"20.笔记/1000.hexo迁移数据/移动端rem布局-阿里.md"};function l(r,t,s,p,u,m){return n(),o("div",null,[...t[0]||(t[0]=[a(`<p>一直在用阿里的 flexible 布局，但是从来没总结过，今天看到一篇总结的不错就搬过来记录下。</p><p>&lt;!--more--&gt;</p><p>使用起来很简单，把下面的 js 直接引入就好了<br><a href="https://github.com/amfe/lib-flexible" target="_blank" rel="noreferrer">https://github.com/amfe/lib-flexible</a></p><h2 id="代码原理" tabindex="-1">代码原理 <a class="header-anchor" href="#代码原理" aria-label="Permalink to &quot;代码原理&quot;">​</a></h2><p>这是阿里团队的高清方案布局，所谓高清方案就是根据设备屏幕的 DPR（设备像素比，又称 DPPX，比如 dpr=2 时，表示一个 css 像素由四个物理像素点组成。）<br> 动态设置 html 的 font-size，同时根据设备的 DPR 调整页面的缩放值，进而达到效果。</p><h2 id="有何优势" tabindex="-1">有何优势 <a class="header-anchor" href="#有何优势" aria-label="Permalink to &quot;有何优势&quot;">​</a></h2><p>引用简单，布局简单<br> 根据设备屏幕的 DPR，自动设置最合适的高清缩放。<br> 保证了不同设备下的视觉体验的一致性。<br> 有效解决移动端真实 1px 问题（这里的 1px 时设备屏幕下的物理像素）</p><h2 id="如何使用" tabindex="-1">如何使用 <a class="header-anchor" href="#如何使用" aria-label="Permalink to &quot;如何使用&quot;">​</a></h2><p>重要的事情说三遍！ 绝不是每个地方都要用 rem，rem 只适用于固定尺寸！ 绝不是每个地方都要用 rem，rem 只适用于固定尺寸！ 绝不是每个地方都要用 rem，rem 只适用于固定尺寸！</p><p>在相当数量的布局情境中（比如底部导航元素平分屏幕宽，大尺寸元素），你必须使用百分比或者 flex 才能完美布局！</p><p>此方案也是默认 1rem = 100px，所以你布局的时候，完全可以按照设计师给你的效果图写各种尺寸啦。 比如你在效果图上量取的某个按钮元素长 55px, 宽 37px ，那你直接可以这样写样式：</p><pre><code>.myBtn {
   width: 0.55rem;
   height: 0.37rem;
}
</code></pre><h2 id="常见问题说明" tabindex="-1">常见问题说明 <a class="header-anchor" href="#常见问题说明" aria-label="Permalink to &quot;常见问题说明&quot;">​</a></h2><ol><li>为啥手机网页效果图宽度是要 640 或者 750 的，我非得弄个 666 的不行咩？<br> 答：老实说当然可以，不过为了规范，640 或者 750 是相对合适的。 拿 Iphone 5s 举例，它的 css 像素宽度是 320px，由于它的 dpr=2，所以它的物理像素宽度为 320 × 2 = 640px，这也就是为什么，你在 5s 上截了一张图，在电脑上打开，它的原始宽度是 640px 的原因。 那 iphone 6 的截图宽度呢？ 375 × 2 = 750 那 iphone 6 sp 的截图宽度呢？ 414 × 3 = 1242 以此类推，你现在能明白效果图为什么一般是 640 ，750 甚至是 1242 的原因了么？（真没有歧视安卓机的意思。。。）</li><li>宽度用 rem 写的情况下， 在 iphone6 上没问题， 在 iphone5 上会有横向滚动条，何解？<br> 答：假设你的效果图宽度是 750，在这个效果图上可能有一个宽度为 7rem（高清方案默认 1rem = 100px）的元素。我们知道，高清方案的特点就是几乎完美还原效果图，也就是说，你写了一个宽度为 7rem 的元素，那么在目前主流移动设备上都是 7rem。然而，iphone 5 的宽度为 640，也就是 6.4rem。于是横向滚动条不可避免的出现了。 怎么办呢？ 这是我目前推荐的比较安全的方式：如果元素的宽度超过效果图宽度的一半（效果图宽为 640 或 750），果断使用百分比宽度，或者 flex 布局。就像把等屏宽的图片宽度设为 100%一样。</li><li>不是 1rem = 100px 吗，为什么我的代码写了一个宽度为 3rem 的元素，在电脑端的谷歌浏览器上宽度只有 150px?<br> 答：先说高清方案代码，再次强调咱们的高清方案代码是根据设备的 dpr 动态设置 html 的 font-size， 如果 dpr=1(如电脑端），则 html 的 font-size 为 50px，此时 1rem = 50px 如果 dpr=2(如 iphone 5 和 6），则 html 的 font-size 为 100px，此时 1rem = 100px 如果 dpr=3(如 iphone 6 sp），则 html 的 font-size 为 150px，此时 1rem = 150px 如果 dpr 为其他值，即便不是整数，如 3.4 , 也是一样直接将 dpr 乘以 50 。<br> 再来说说效果图，一般来讲，我们的效果图宽度要么是 640，要么是 750，无论哪一个，它们对应设备的 dpr=2，此时，1 rem = 50 × 2 = 100px。这也就是为什么高清方案默认 1rem = 100px。而将 1rem 默认 100px 也是好处多多，可以帮你快速换算单位，比如在 750 宽度下的效果图，某元素宽度为 53px，那么 css 宽度直接设为 53/100=0.53rem 了。<br> 然而极少情况下，有设计师将效果图宽定为 1242px，因为他手里只有一个 iphone 6 sp (dpr = 3)，设计完效果图刚好可以在他的 iphone 6 sp 里查看调整。一切完毕之后，他将这个效果图交给你来切图。由于这个效果图对应设备的 dpr=3，也就是 1rem = 50 × 3 = 150px。所以如果你量取了一个宽度为 90px 的元素，它的 css 宽度应该为 90/150=0.6rem。由于咱们的高清方案默认 1rem=100px，为了还原效果图，你需要这样换算。当然，一个技巧就是你可以直接修改咱们的高清方案的默认设置。在代码的最后 你会看到 flex(100, 1) ，将其修改成 flex(66.66667, 1)就不用那么麻烦的换算了，此时那个 90px 的直接写成 0.9rem 就可以了。</li><li>高清方案在微信上，有时候字体会不受控制变的很大，怎么办？<br><a href="https://github.com/ant-design/ant-design-mobile/issues/732" target="_blank" rel="noreferrer">https://github.com/ant-design/ant-design-mobile/issues/732</a></li></ol><p>问题原因：<br> 在 X5 新内核 Blink 中，在排版页面的时候，会主动对字体进行放大，会检测页面中的主字体，当某一块字体在 我们的判定规则中，认为字号较小，并且是页面中的主要字体，就会采取主动放大的操作。然而这不是我们想要的，可以采取给最大高度解决</p><p>后续：经过项目实践，还是决定给 max-height 一个具体数值比较好，之前给的是 100% ，但有自身的局限性，比如 antd 的轮播组件在 max-height:100% 的情况下就不能正常显示。</p><ol start="5"><li>我在底部导航用的 flex 感觉更合适一些，请问这样子混着用可以吗？<br> 咱们的 rem 适合写固定尺寸。其余的根据需要换成 flex 或者百分比。源码示例中就有这三种的综合运用。</li><li>在高清方案下，一个标准的，较为理想的宽度为 640 的页面效果图应该是怎样的？</li></ol><p><img src="http://cdn.attach.qdfuns.com/notes/pics/201705/05/165046bsdbcb1frrhfnbpp.png" alt="参考布局"></p><ol start="7"><li><p>源码：<br> &#39;use strict&#39;;</p><p>/**</p><ul><li>@param {Number} [baseFontSize = 100] - 基础 fontSize, 默认 100px;</li><li>@param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体; */ const win = window; export default win.flex = (baseFontSize, fontscale) =&gt; { const _baseFontSize = baseFontSize || 100; const _fontscale = fontscale || 1;</li></ul><p>const doc = win.document; const ua = navigator.userAgent; const matches = ua.match(/Android[\\S\\s]+AppleWebkit/(\\d{3})/i); const UCversion = ua.match(/U3/((\\d+|.){5,})/i); const isUCHd = UCversion &amp;&amp; parseInt(UCversion[1].split(&#39;.&#39;).join(&#39;&#39;), 10) &gt;= 80; const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi); let dpr = win.devicePixelRatio || 1; if (!isIos &amp;&amp; !(matches &amp;&amp; matches[1] &gt; 534) &amp;&amp; !isUCHd) { // 如果非 iOS, 非 Android4.3 以上, 非 UC 内核, 就不执行高清, dpr 设为 1; dpr = 1; } const scale = 1 / dpr;</p><p>let metaEl = doc.querySelector(&#39;meta[name=&quot;viewport&quot;]&#39;); if (!metaEl) { metaEl = doc.createElement(&#39;meta&#39;); metaEl.setAttribute(&#39;name&#39;, &#39;viewport&#39;); doc.head.appendChild(metaEl); } metaEl.setAttribute(&#39;content&#39;, <code>width=device-width,user-scalable=no,initial-scale=\${scale},maximum-scale=\${scale},minimum-scale=\${scale}</code>); doc.documentElement.style.fontSize = <code>\${_baseFontSize / 2 * dpr * _fontscale}px</code>; };</p></li></ol><p>demo：</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;

    &lt;!-- 阿里高清方案 --&gt;
    &lt;script&gt;!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p=&quot;&quot;,t(0)}([function(e,t){&quot;use strict&quot;;Object.defineProperty(t,&quot;__esModule&quot;,{value:!0});var i=window;t[&quot;default&quot;]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\\S\\s]+AppleWebkit\\/(\\d{3})/i),l=o.match(/U3\\/((\\d+|\\.){5,})/i),c=l&amp;&amp;parseInt(l[1].split(&quot;.&quot;).join(&quot;&quot;),10)&gt;=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&amp;&amp;d[1]&gt;534||c||(s=1);var u=1/s,m=r.querySelector(&#39;meta[name=&quot;viewport&quot;]&#39;);m||(m=r.createElement(&quot;meta&quot;),m.setAttribute(&quot;name&quot;,&quot;viewport&quot;),r.head.appendChild(m)),m.setAttribute(&quot;content&quot;,&quot;width=device-width,user-scalable=no,initial-scale=&quot;+u+&quot;,maximum-scale=&quot;+u+&quot;,minimum-scale=&quot;+u),r.documentElement.style.fontSize=a/2*s*n+&quot;px&quot;},e.exports=t[&quot;default&quot;]}]);
    flex(100, 1);&lt;/script&gt;
    &lt;!-- 字形图标 --&gt;
    &lt;script src=&quot;https://use.fontawesome.com/f47f4563cb.js&quot;&gt;&lt;/script&gt;
    &lt;style&gt;
        * {
            box-sizing: border-box;
        }

        *:before, *:after {
            box-sizing: border-box;
        }

        *, *:before, *:after {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {
            border: 0 none;
            font-size: inherit;
            color: inherit;
            margin: 0;
            padding: 0;
            vertical-align: baseline;

            /* 在X5新内核Blink中，在排版页面的时候，会主动对字体进行放大，会检测页面中的主字体，当某一块字体在我们的判定规则中，认为字号较小，并且是页面中的主要字体，就会采取主动放大的操作。然而这不是我们想要的，可以采取给最大高度解决 */
            max-height: 100000px;
        }

        h1, h2, h3, h4, h5, h6 {
            font-weight: normal;
        }

        em, strong {
            font-style: normal;
        }

        ul, ol, li {
            list-style: none;
        }

        body {
            font-family: &quot;Helvetica Neue&quot;,Helvetica,&quot;PingFang SC&quot;,&quot;Hiragino Sans GB&quot;,&quot;Microsoft YaHei&quot;,&quot;\\5FAE\\8F6F\\96C5\\9ED1&quot;,Arial,sans-serif;
            line-height: 1.5;
            color: #333;
            background-color: #f2f2f2;
            font-size: 0.24rem;
        }

        a {
            text-decoration: none;
        }
        .box {
            position: relative;
            max-width: 10rem;
            margin: 0 auto;
        }

        .navRoot {
            position: fixed;
            z-index: 50;
            bottom: 0;
            left:0;
            width: 100%;
            height: 1rem;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            border-top: 0.01rem solid #ccc;
            background:#f2f2f2;
        }

        .navLink {
            font-size: 0.42rem;
            -webkit-box-flex: 1;
            -ms-flex: auto;
            flex: auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            line-height: 1;
            color: #666;
        }
        .navLink.active {
            color: #1abc9c
        }
        .navLinkIco {
            display: block;
            margin-bottom: 0.1rem;
        }

        .navLinkText {
            display: block;
            line-height: 1;
            font-size: 0.24rem;
        }

        .img-responsive {
            width: 100%;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class=&quot;box&quot;&gt;
   &lt;div class=&quot;box-content&quot;&gt;
    &lt;img src=&quot;http://temp.im/640x260/444/fff&quot; class=&quot;img-responsive&quot;&gt;
    &lt;ul style=&quot;font-size:0.3rem; padding: 0.2rem&quot;&gt;
        &lt;li style=&quot;font-size:0.4rem&quot;&gt;&lt;a href=&quot;http://www.jianshu.com/p/985d26b40199&quot;&gt;rem布局（进阶版）的一些说明&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;1，大家先把这个页面在不同设备模式下浏览下，感受下。&lt;/li&gt;
        &lt;li&gt;2，一般来说我们的手机端效果图是640px或750px。&lt;/li&gt;
        &lt;li&gt;3，对于上图这类需要等屏宽的图片，只需让其宽度设为 100% 即可。&lt;/li&gt;
        &lt;li&gt;4，该布局方案要求凡是涉及尺寸的，单位都是rem，比如，height width margin paddint top border-radius 等等。你只需要按照效果图上标注的尺寸布局即可。&lt;/li&gt;
    &lt;/ul&gt;

   &lt;/div&gt;
    &lt;div class=&quot;navRoot&quot;&gt;
        &lt;a href=&quot;#&quot; class=&quot;navLink active&quot;&gt;
            &lt;i class=&quot;fa fa-home navLinkIco&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;
            &lt;span class=&quot;navLinkText&quot;&gt;首页&lt;/span&gt;
        &lt;/a&gt;
        &lt;a href=&quot;#&quot; class=&quot;navLink&quot;&gt;
            &lt;i class=&quot;fa fa-home navLinkIco&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;
            &lt;span class=&quot;navLinkText&quot;&gt;好店&lt;/span&gt;
        &lt;/a&gt;
        &lt;a href=&quot;#&quot; class=&quot;navLink&quot;&gt;
            &lt;i class=&quot;fa fa-home navLinkIco&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;
            &lt;span class=&quot;navLinkText&quot;&gt;简单&lt;/span&gt;
        &lt;/a&gt;
        &lt;a href=&quot;#&quot; class=&quot;navLink&quot;&gt;
            &lt;i class=&quot;fa fa-home navLinkIco&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;
            &lt;span class=&quot;navLinkText&quot;&gt;复杂&lt;/span&gt;
        &lt;/a&gt;
        &lt;a href=&quot;#&quot; class=&quot;navLink&quot;&gt;
            &lt;i class=&quot;fa fa-home navLinkIco&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;
            &lt;span class=&quot;navLinkText&quot;&gt;异步&lt;/span&gt;
        &lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;/body&gt;
&lt;/html&gt;
</code></pre><p>参考： <a href="http://www.jianshu.com/p/985d26b40199" target="_blank" rel="noreferrer">http://www.jianshu.com/p/985d26b40199</a><br><a href="http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html" target="_blank" rel="noreferrer">http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html</a></p>`,22)])])}const h=e(i,[["render",l]]);export{d as __pageData,h as default};
