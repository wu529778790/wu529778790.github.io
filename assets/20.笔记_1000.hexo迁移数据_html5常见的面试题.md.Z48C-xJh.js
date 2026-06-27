import{_ as i,o as l,c as o,j as t,a2 as n}from"./chunks/framework.m9rfQn3T.js";const u=JSON.parse('{"title":"html5常见的面试题","description":"","frontmatter":{"title":"html5常见的面试题","date":"2017-06-06T16:06:21.000Z","permalink":"/pages/ab5909/","categories":["hexo迁移数据"],"author":{"name":"神族九帝","link":"https://github.com/wu529778790","permalink":null,"categories":null},"sidebar":"auto","tags":[null]},"headers":[],"relativePath":"20.笔记/1000.hexo迁移数据/html5常见的面试题.md","filePath":"20.笔记/1000.hexo迁移数据/html5常见的面试题.md","lastUpdated":1782538095000}'),a={name:"20.笔记/1000.hexo迁移数据/html5常见的面试题.md"};function p(r,e,d,s,h,c){return l(),o("div",null,[...e[0]||(e[0]=[t("p",null,"title: html5 常见的面试题 date: 2017-02-11 13:31:48 categories: tags: 面试",-1),t("hr",null,null,-1),t("p",null,"市场总结，提高自己",-1),t("p",null,"<!--more-->",-1),t("p",null,"1,常见的块级元素，内联元素 fieldset - 表单字段集 colgroup - 表单列分组元素 pre 格式化文本 i - 斜体 em - 强调 label - 表单标签 sub - 下标 sup - 上标 u - 下划线 2，实现文本三个点的几个条件 text-overflow 属性仅是：当文本溢出时是否显示省略标记，并不具备其他的样式属性定义，要实现溢出时产生省略号的效果还需定义： 1，容器宽度： width 2，强制文本在一行内显示： white-space：nowrap 3，溢出内容为隐藏：overflow：hidden； 4，溢出文本显示省略号：text-overflow：ellipsis 但行文本才可以设置文本溢出 3，垂直居中的几个条件 设置一个元素在一个容器内垂直居中，必须更改默认的 display 属性值为 inline-block 并加上统计元素（标尺）（同级元素[标尺]样式设置为 vertical-align:middle；width：0；height：100%；display：inline-block；） 三个条件： 1，必须给容器加上 text-align:center； 2，必须给当前元素转化为内块元素（display：inline-block)再给当前元素加上 vertical-align:middle 3，在当前元素的后面加上同级元素 span 进行 vertical-align:middle；width：0；height：100%；display：inline-block； 4，图片精灵，优势 图片整合，将小的单张背景图片整合到一张大的背景图片上 优势：1）通过图片来整合减少对服务器的请求次数，从而提高页面的加载速度。2）通过整合图片来减少图片的体积 5，display:none 与 visibility:hidden 的区别",-1),t("p",null,"前者：隐藏不占位 后者：隐藏但是占位置 6，清除浮动的几种方式",-1),t("p",null,"hack1：给父元素添加声明 overflow:hidden;",-1),t("p",null,"hack2: 给父元素加 height",-1),t("p",{"clear:both;":"","height:0;":"","overflow:hidden;":""},"hack3: 在浮动元素下方添加空 div,并给该元素添加 声明：div",-1),n(`<p>hack4:万能清除浮动法 p:after{content:“.”;clear:both;display:block;height:0;overflow:hidden; visibility:hidden;} 7，哪些属性可以继承？</p><pre><code>1）文字相关：font-family、font-size、font-style、font-variant、font-weight、font、letter-spacing、line-height、text-align、text-indent、text-transform、word-spacing
2）列表相关：list-style-image、list-style-position、list-style-type、list-style
3）颜色相关：color
4）透明度（子元素会继承祖元素的opacity，但是无法更改）
注：font-size继承的是父元素的大小，而不是比例。line-height当父元素是百分比或px值得时候，子元素跟父元素相同，当父元素是normal或数字的时候，子元素的line-height是子元素的字体大小乘以数字。
</code></pre><p>8，link 和@import 区别？</p><pre><code>1、老祖宗的差别。link属于XHTML标签，而@import完全是CSS提供的一种方式。

2、link标签除了可以加载CSS外，还可以做很多其它的事情，比如定义RSS，定义rel连接属性等，@import就只能加载CSS了

3、加载顺序的差别。当一个页面被加载的时候（就是被浏览者浏览的时候），link引用的CSS会同时被加载，而@import引用的CSS 会等到页面全部被下载完再被加载。所以有时候浏览@import加载CSS的页面时开始会没有样式（就是闪烁）

4、兼容性的差别。由于@import是CSS2.1提出的所以老的浏览器不支持，@import只有在IE5以上的才能识别，而link标签无此问题

5、使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的
</code></pre><p>9，定位的属性值都有哪些？每个值得意思？</p><pre><code>各属性值的作用：

static：默认值。位置设置为 static 的元素会正常显示，它始终会处于文档流给予的位置（static 元素会忽略任何 top、bottom、left 或 right 声明）。

absolute：相对于父级元素的绝对定位，s浮出、脱离布局流，它不占据空间，就是我们所说的层，其位置相对于最近的已定位父元素而言的位置，可直接指定 “left”、“top”、“right” 以及 “bottom” 属性。若父级都没有定位，则以html（根元素）。(层叠的顺序z-index:value)

relative：是相对于默认位置的偏移定位，通过设置left、top、right、bottom值可将其移至相对于其正常位置的地方（相对于自己的开始的位置发生的位置上的移动，【不会破坏正常的布局流】

fixed：相对浏览器的绝对定位，是相对于浏览器窗口的指定坐标进行定位。此元素的位置可通过 &quot;left&quot;、&quot;top&quot;、&quot;right&quot; 以及&quot;bottom&quot; 属性来规定。不论窗口滚动与否，元素都会留在那个位置。
</code></pre><p>10，写出 html5 新增的标签 15 个</p><pre><code>header nav footer main aside article section figure datalist video audio fieldest  legend  label caption
</code></pre><p>11，实现垂直+水平居中有哪些方法？</p><pre><code>1、div{width:200px;height:200px;background:#f00;position:fixed;left:0;right:0;top:0;bottom:0;margin:auto;}

2、div{width:200px;height:200px;background:#f00;position:fixed;left:50%;top:50%;margin:-100px 0 0 -100px;}
</code></pre>`,10)])])}const f=i(a,[["render",p]]);export{u as __pageData,f as default};
