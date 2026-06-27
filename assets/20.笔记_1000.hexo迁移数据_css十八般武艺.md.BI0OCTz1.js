import{_ as t,o as e,c as i,a2 as o}from"./chunks/framework.m9rfQn3T.js";const u=JSON.parse('{"title":"css十八般武艺","description":"","frontmatter":{"title":"css十八般武艺","date":"2017-06-06T16:06:21.000Z","permalink":"/pages/b47a5b/","categories":["hexo迁移数据"],"author":{"name":"神族九帝","link":"https://github.com/wu529778790","permalink":null,"categories":null},"sidebar":"auto","tags":[null]},"headers":[],"relativePath":"20.笔记/1000.hexo迁移数据/css十八般武艺.md","filePath":"20.笔记/1000.hexo迁移数据/css十八般武艺.md","lastUpdated":1782538095000}'),l={name:"20.笔记/1000.hexo迁移数据/css十八般武艺.md"};function n(r,a,d,s,h,c){return e(),i("div",null,[...a[0]||(a[0]=[o(`<p>水平居中，垂直居中，单列布局，多列布局</p><p>&lt;!--more--&gt;</p><h2 id="常用居中方法" tabindex="-1">常用居中方法 <a class="header-anchor" href="#常用居中方法" aria-label="Permalink to &quot;常用居中方法&quot;">​</a></h2><p>居中在布局中很常见，我们假设 DOM 文档节后如下，子元素要在父元素中居中</p><pre><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
</code></pre><h3 id="水平居中" tabindex="-1">水平居中 <a class="header-anchor" href="#水平居中" aria-label="Permalink to &quot;水平居中&quot;">​</a></h3><p>子元素为行内元素还是块状元素，宽度一定还是宽度未定，采取的布局方案不同</p><p>子元素为：</p><p>**行内元素：对父元素设置 text-align:center, **定宽块状元素：设置左右 margin 值为 auto， **不定宽块状元素：设置子元素为 display：inline,然后在父元素上设置 text-align:center, **通用方案：flex 布局，对父元素设置 display:flex;justify-content:center;</p><h3 id="垂直居中" tabindex="-1">垂直居中： <a class="header-anchor" href="#垂直居中" aria-label="Permalink to &quot;垂直居中：&quot;">​</a></h3><p>垂直居中对于子元素是单行内联文本、多行内联文本以及块状元素采用的方案是不同的。</p><p>**父元素一定，子元素为单行内联文本： 设置父元素的 height 等于行高 line-height **父元素一定，子元素为多行内联文本： 设置父元素的 display：table-cell 或 inline-block，在设置 vertical-align：middle； **块状元素： 设置子元素篇 position:absolute 并设置 top、bottom 为 0，父元素要设置定位为 static 以外的值，margin:auto; **通用方案： flex 布局，对父元素设置 display：flex；align-items:center；</p><h2 id="单列布局" tabindex="-1">单列布局 <a class="header-anchor" href="#单列布局" aria-label="Permalink to &quot;单列布局&quot;">​</a></h2><p><img src="https://pic4.zhimg.com/v2-12cd0eddc97721987b9f6e41e5a1fc4b_b.png" alt="单行布局的两种形式"></p><p>特征： 定宽、水平居中</p><p>常见的单列布局有两种：</p><pre><code>* 一种是header、content、footer宽度都相同，期一般不会占满浏览器的最宽宽度，但当浏览器宽度缩小低于最大宽度时，宽度会自适应。
* 一种是header、footer宽度为浏览器宽度，但content以及header和footer里的内容却不会占满浏览器宽度。
</code></pre><p>对于第一种，对 header、content、footer 统一设置 width 或 max-width，并通过 margin:auto 实现居中。</p><h3 id="dom-文档" tabindex="-1">DOM 文档 <a class="header-anchor" href="#dom-文档" aria-label="Permalink to &quot;DOM 文档&quot;">​</a></h3><pre><code>&lt;div class=&quot;layout&quot;&gt;
    &lt;div class=&quot;header&quot;&gt;头部&lt;/div&gt;
    &lt;div class=&quot;content&quot;&gt;内容&lt;/div&gt;
    &lt;div class=&quot;footer&quot;&gt;尾部&lt;/div&gt;
&lt;/div&gt;
</code></pre><h3 id="css-清单" tabindex="-1">css 清单 <a class="header-anchor" href="#css-清单" aria-label="Permalink to &quot;css 清单&quot;">​</a></h3><pre><code>.layout{
/*   width: 960px; *//*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/
max-width: 960px;
margin: 0 auto;
}
</code></pre><p>对于第二种，header，footer 的内容宽度为 100%，单 header，footer 的内容区以及 content 统一设置为 width 或者 max-width，并通过 margin：auto 实现。</p><h3 id="dom-文档-1" tabindex="-1">DOM 文档 <a class="header-anchor" href="#dom-文档-1" aria-label="Permalink to &quot;DOM 文档&quot;">​</a></h3><pre><code>&lt;div id=&quot;header&quot;&gt;
  &lt;div class=&quot;layout&quot;&gt;头部&lt;/div&gt;
&lt;/div&gt;
&lt;div id=&quot;content&quot; class=&quot;layout&quot;&gt;内容&lt;/div&gt;
&lt;div id=&quot;footer&quot;&gt;
  &lt;div class=&quot;layout&quot;&gt;尾部&lt;/div&gt;
&lt;/div&gt;
</code></pre><h3 id="css-清单-1" tabindex="-1">css 清单 <a class="header-anchor" href="#css-清单-1" aria-label="Permalink to &quot;css 清单&quot;">​</a></h3><pre><code>.layout{
/*   width: 960px; *//*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/
max-width: 960px;
margin: 0 auto;
}
</code></pre><h2 id="二列-三列布局" tabindex="-1">二列&amp;三列布局 <a class="header-anchor" href="#二列-三列布局" aria-label="Permalink to &quot;二列&amp;三列布局&quot;">​</a></h2><p>1<a href="https://pic2.zhimg.com/v2-784022577a47ea5fc449b06de53c4651_b.png" target="_blank" rel="noreferrer">二列三列布局</a></p><p>二列布局的特征是侧栏固定宽度，主栏自适应宽度。三列布局的特征是两侧两列固定宽度，中间列自适应宽度。</p><p>之所以将二列布局和三列布局写在一起，是因为二列布局可以看做是去掉一个侧栏的三列布局，其布局的思想有异曲同工之妙。对于传统的实现方法，主要讨论上图中前三种布局，经典的带有侧栏的二栏布局以及带有左右侧栏的三栏布局，对于 flex 布局，实现了上图的五种布局。</p><h3 id="a-float-margin" tabindex="-1">a.float+margin <a class="header-anchor" href="#a-float-margin" aria-label="Permalink to &quot;a.float+margin&quot;">​</a></h3><p>**原理说明： 设置两个侧栏分别向左向右浮动，中间列通过外边距给两个侧栏腾出空间，中间列的宽度根据浏览器窗口自适应。</p><h4 id="dom-文档-2" tabindex="-1">DOM 文档 <a class="header-anchor" href="#dom-文档-2" aria-label="Permalink to &quot;DOM 文档&quot;">​</a></h4><pre><code>&lt;div id=&quot;content&quot;&gt;
    &lt;div class=&quot;sub&quot;&gt;sub&lt;/div&gt;
    &lt;div class=&quot;extra&quot;&gt;extra&lt;/div&gt;
    &lt;div class=&quot;main&quot;&gt;main&lt;/div&gt;
&lt;/div&gt;
</code></pre><p>布局步骤：</p><ol><li>对两边侧栏分别设置宽度，并对左侧栏添加左浮动，右侧栏添加右浮动。</li><li>对主面板设置左右外边距，margin-left 的值为左侧栏的宽度，margin-right 的值为有侧栏的宽度。</li></ol><h4 id="css-清单-2" tabindex="-1">css 清单 <a class="header-anchor" href="#css-清单-2" aria-label="Permalink to &quot;css 清单&quot;">​</a></h4><pre><code>.sub{
    width: 100px;
    float: left;
}
.extra{
    width: 200px;
    float: right;
}
.main{
    margin-left: 100px;
    margin-right: 200px;
}
</code></pre><h4 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-label="Permalink to &quot;说明&quot;">​</a></h4><ul><li>注意 dom 文档的书写顺序，先写两侧栏，在写主面板，更换后则侧栏会被挤到下一列.</li><li>这种布局方式比较简单明了，单缺点是渲染师先渲染了侧边栏，而不是比较重要的主面板。</li></ul><h4 id="两列的实现方法" tabindex="-1">两列的实现方法 <a class="header-anchor" href="#两列的实现方法" aria-label="Permalink to &quot;两列的实现方法&quot;">​</a></h4><p>如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的 margin-right 值，其他操作相同。反之亦然。</p><h3 id="b-position-margin" tabindex="-1">b.position+margin <a class="header-anchor" href="#b-position-margin" aria-label="Permalink to &quot;b.position+margin&quot;">​</a></h3><p>*原理说明：通过绝对定位将两个侧栏固定，同样通过外边距给两个侧栏腾出空间，中间列自适应。</p><h4 id="dom-文档-3" tabindex="-1">DOM 文档 <a class="header-anchor" href="#dom-文档-3" aria-label="Permalink to &quot;DOM 文档&quot;">​</a></h4><pre><code>&lt;div class=&quot;sub&quot;&gt;left&lt;/div&gt;
&lt;div class=&quot;main&quot;&gt;main&lt;/div&gt;
&lt;div class=&quot;extra&quot;&gt;right&lt;/div&gt;
</code></pre><p>布局步骤：</p><pre><code>1. 对两边侧栏分别设置宽度，设置定位方式为绝对定位。
2. 设置两侧栏的top值都为0，设置左侧栏的left值为0，右侧栏的right为0.
3. 对主面板设置左右外边距，margin-left的值为左侧栏的宽度，margin-right的值为有侧栏的宽度。
</code></pre><h4 id="css-清单-3" tabindex="-1">css 清单 <a class="header-anchor" href="#css-清单-3" aria-label="Permalink to &quot;css 清单&quot;">​</a></h4><pre><code>.sub, .extra {
    position: absolute;
    top: 0;
    width: 200px;
}
.sub {
    left: 0;
}
.extra {
    right: 0;
}
.main {
    margin: 0 200px;
}
</code></pre><ul><li><p>本方法不限制 DOM 书写顺序，先写主面板会使主面板部分优先渲染（一般主面板会比侧栏内容重要）。</p></li><li><p>与上一种方法相比，本种方法是通过定位来实现侧栏的位置固定。</p></li><li><p>如果中间栏含有最小宽度限制，或是含有宽度的内部元素，则浏览器窗口小到一定程度，主面板与侧栏会发生重叠。</p></li></ul><h4 id="二列的实现方法" tabindex="-1">二列的实现方法 <a class="header-anchor" href="#二列的实现方法" aria-label="Permalink to &quot;二列的实现方法&quot;">​</a></h4><p>如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的 margin-right 值，其他操作相同。反之亦然。</p><h3 id="c-圣杯布局-float-负-margin" tabindex="-1">c.圣杯布局(float + 负 margin) <a class="header-anchor" href="#c-圣杯布局-float-负-margin" aria-label="Permalink to &quot;c.圣杯布局(float + 负 margin)&quot;">​</a></h3><h4 id="原理说明" tabindex="-1">原理说明： <a class="header-anchor" href="#原理说明" aria-label="Permalink to &quot;原理说明：&quot;">​</a></h4><pre><code>主面板设置宽度为100%，主面板与两个侧栏都设置浮动，常见为左浮动，这时两个侧栏会被主面板挤下去。通过负边距将浮动的侧栏拉上来，左侧栏的负边距为100%，刚好是窗口的宽度，因此会从主面板下面的左边跑到与主面板对其的左边，右侧栏此时浮动在主面板下面的左边，设置负边距为负的自身宽度刚好浮动到主面板对齐的右边。为了避免侧栏遮挡住面板内容，在外层设置左右padding值为左右侧栏的宽度，给侧栏腾出空间，此时主面板的宽度减小。由于侧栏的负margin都是相对主面板的，两个侧栏并不会像我们想象中的停靠在左右两边，而是跟着缩小的主面板一起向中间靠拢。此时使用相对布局，调整两个侧栏到相应的位置。
</code></pre><h4 id="dom-文档-4" tabindex="-1">DOM 文档 <a class="header-anchor" href="#dom-文档-4" aria-label="Permalink to &quot;DOM 文档&quot;">​</a></h4><pre><code>&lt;div id=&quot;bd&quot;&gt;
    &lt;div class=&quot;main&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;sub&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;extra&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
</code></pre><p>布局步骤：</p><ol><li>三者都设置想左浮动 2.设置 main 宽度为 100%，设置两侧栏的宽度 3.设置负边距，sub 设置负左边距 100%，extra 设置负左边距为负的自身高度 4.设置 mian 的 padding 值给左右两个子面板留出空间 5.设置两个字面板为相对定位，sub 的 left 值为负的 sub 宽度，extra 的 right 值为负的 extra 宽度。</li></ol><h4 id="css-清单-4" tabindex="-1">css 清单 <a class="header-anchor" href="#css-清单-4" aria-label="Permalink to &quot;css 清单&quot;">​</a></h4><pre><code>.main {
float: left;
width: 100%;
}
.sub {
float: left;
width: 190px;
margin-left: -100%;
position: relative;
left: -190px;
}
.extra {
float: left;
width: 230px;
margin-left: -230px;
position: relative;
right: -230px;
}
#bd {
padding: 0 230px 0 190px;
}
</code></pre><h4 id="说明-1" tabindex="-1">说明 <a class="header-anchor" href="#说明-1" aria-label="Permalink to &quot;说明&quot;">​</a></h4><ul><li>dom 元素的书写顺序不得更改</li><li>主面板部分优先渲染(一般主面板回避侧栏内容重要)</li><li>当面板的 main 内容部分比两边的子面板宽度小的时候，布局就会乱掉，可以通过设置 main 的 mian-width 属性或者使用双飞翼布局避免问题。</li></ul><h4 id="二列的实现方法-1" tabindex="-1">二列的实现方法 <a class="header-anchor" href="#二列的实现方法-1" aria-label="Permalink to &quot;二列的实现方法&quot;">​</a></h4><p>如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的 padding-right 值，其他操作相同。反之亦然。</p><h3 id="d-flex-布局" tabindex="-1">d flex 布局， <a class="header-anchor" href="#d-flex-布局" aria-label="Permalink to &quot;d flex 布局，&quot;">​</a></h3><p>这个主要看阮一峰老师的教程</p><p>语法篇： <a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool" target="_blank" rel="noreferrer">http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool</a></p><p>实例篇： <a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" target="_blank" rel="noreferrer">http://www.ruanyifeng.com/blog/2015/07/flex-examples.html</a></p><p>总结： 统的布局方法基于盒状模型，依赖 display 属性 + position 属性 + float 属性，逻辑相对复杂，对于实现一些特殊效果，例如垂直居中，尤其复杂繁琐。而 flex 布局中的 flex 容器可以根据实际可用空间动态调整子元素的宽高比和顺序，使元素能够尽可能地利用可用空间，同时也能通过缩小来避免超出。flex 布局提供了一套简便、完整、响应式的布局方案。</p><p>转自：<a href="https://zhuanlan.zhihu.com/p/25565751" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/25565751</a></p>`,73)])])}const m=t(l,[["render",n]]);export{u as __pageData,m as default};
