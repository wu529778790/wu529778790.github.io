import{_ as s,o as n,c as p,a2 as e}from"./chunks/framework.m9rfQn3T.js";const h=JSON.parse('{"title":"2018面试题","description":"","frontmatter":{"title":"2018面试题","date":"2017-06-06T16:06:21.000Z","permalink":"/pages/3f7547/","categories":["hexo迁移数据"],"author":{"name":"神族九帝","link":"https://github.com/wu529778790","permalink":null,"categories":null},"sidebar":"auto","tags":[null]},"headers":[],"relativePath":"20.笔记/1000.hexo迁移数据/2018面试题.md","filePath":"20.笔记/1000.hexo迁移数据/2018面试题.md","lastUpdated":1782538095000}'),l={name:"20.笔记/1000.hexo迁移数据/2018面试题.md"};function i(t,a,o,c,r,u){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h2 id="js-中如何检测一个变量是-string-类型" tabindex="-1">js 中如何检测一个变量是 String 类型 <a class="header-anchor" href="#js-中如何检测一个变量是-string-类型" aria-label="Permalink to &quot;js 中如何检测一个变量是 String 类型&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>functiton isString(obj) {</span></span>
<span class="line"><span>  return typeof(obj) === &quot;string&quot; ? true : false;</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function isString(obj) {</span></span>
<span class="line"><span>  return obj.constructor === String ? true : false</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function isString(obj) {</span></span>
<span class="line"><span>  return Object.prototype.toString.call(obj) === &quot;[object String]&quot; ? true : false</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>&lt;!-- more --&gt;</p><h2 id="请用-js-去除字符串空格" tabindex="-1">请用 js 去除字符串空格 <a class="header-anchor" href="#请用-js-去除字符串空格" aria-label="Permalink to &quot;请用 js 去除字符串空格&quot;">​</a></h2><ol><li>使用 replace 正则匹配的方法</li></ol><p>去除所有空格: str = str.replace(/\\s*/g, &#39;&#39;); 去除两头空格：str = str.replace(/^\\s*|\\s*$/g, &#39;&#39;); 去除左空格：str = str.replace(/^\\s*/, &#39;&#39;); 取出右空格：str = str.replace(/(\\s*$)/g, &#39;&#39;);</p><p>str 为要去除空格的字符串</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var str = &#39; 23  23 &#39;;</span></span>
<span class="line"><span>var str2 = str.replace(/\\s*/g, &#39;&#39;);</span></span>
<span class="line"><span>console.log(str2); // 2323</span></span></code></pre></div><ol start="2"><li>使用 str.trim()方法 trim()方法有局限性，无法去除中间的空格</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var str = &quot;     xiao    ming    &quot;;</span></span>
<span class="line"><span>var str2 = str.trim();</span></span>
<span class="line"><span>console.log(str2); // xiao    ming</span></span></code></pre></div><p>同理，str.trimLeft()，str.trimRight()分别用于去除字符串左右空格</p><ol start="3"><li>使用 jQuery,$trim(str)方法同上，同样也无法去除中间的空格</li></ol><h2 id="如何获取浏览器-url-中查询字符串中的参数" tabindex="-1">如何获取浏览器 url 中查询字符串中的参数 <a class="header-anchor" href="#如何获取浏览器-url-中查询字符串中的参数" aria-label="Permalink to &quot;如何获取浏览器 url 中查询字符串中的参数&quot;">​</a></h2><p>测试地址：<a href="http://www.runoob.com/jquery/misc-trim.html?channelid=12333&amp;name=xiaoming&amp;age=23" target="_blank" rel="noreferrer">http://www.runoob.com/jquery/misc-trim.html?channelid=12333&amp;name=xiaoming&amp;age=23</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function showWindowHref (){</span></span>
<span class="line"><span>  const Shref = window.location.href;</span></span>
<span class="line"><span>  const args = Shref.split(&#39;?&#39;);</span></span>
<span class="line"><span>  if(args[0] == Shref) return &#39;&#39;;</span></span>
<span class="line"><span>  var arr = args[1].split(&#39;&amp;&#39;);</span></span>
<span class="line"><span>  var obj = {};</span></span>
<span class="line"><span>  arr.forEach(item =&gt; {</span></span>
<span class="line"><span>    const arg = item.split(&#39;=&#39;)</span></span>
<span class="line"><span>    obj[arg[0]] = arg[1]</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  return obj;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var href = showWindowHref();</span></span>
<span class="line"><span>console.log(href[&#39;name&#39;])</span></span></code></pre></div><h2 id="js-字符串操作函数" tabindex="-1">js 字符串操作函数 <a class="header-anchor" href="#js-字符串操作函数" aria-label="Permalink to &quot;js 字符串操作函数&quot;">​</a></h2><ul><li>concat() 将两个或多个字符的文本组合起来，返回一个新字符串</li><li>indexOf() 返回字符串中一个子串第一处出现的索引。如果没有匹配项，返回-1。</li><li>charAt() 返回指定位置的字符。</li><li>lastIndexOf() 返回字符串中一个子串最后一处出现的索引，如果没有匹配项，返回-1。</li><li>match() 检查一个字符串是否匹配一个正则表达式</li><li>substr() 返回从 string 的 startPos 位置，长度为 length 的字符串</li><li>substring() 返回字符串的一个子串，传入参数是其实位置和结束位置</li><li>slice() 提取字符串的一部分，并返回一个新字符串</li><li>replace() 用来查找匹配一个正则表达式的字符串，然后使用新字符串代替匹配的字符串</li><li>search() 执行一个正则表达式匹配查找。如果查找成功，返回字符串中匹配的索引值。否则返回-1</li><li>split() 通过将字符串划分成子串，将一个字符串做成一个字符串数组</li></ul><h2 id="怎样添加、移除、移动、复制、创建、查找节点" tabindex="-1">怎样添加、移除、移动、复制、创建、查找节点 <a class="header-anchor" href="#怎样添加、移除、移动、复制、创建、查找节点" aria-label="Permalink to &quot;怎样添加、移除、移动、复制、创建、查找节点&quot;">​</a></h2><ul><li>创建新节点</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>createDocumentFragment() // 创建一个DOM片段</span></span>
<span class="line"><span>createElement() // 创建一个具体的元素</span></span>
<span class="line"><span>createTextNode() // 创建一个文本节点</span></span></code></pre></div><ul><li>添加、移除、替换、插入</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>appendChild() // 添加</span></span>
<span class="line"><span>removeChild() // 移除</span></span>
<span class="line"><span>replaceChild() // 替换</span></span>
<span class="line"><span>insertBefore() // 插入</span></span></code></pre></div><ul><li>查找</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>getElementByTagName() // 通过标签名称</span></span>
<span class="line"><span>getElementByName() // 通过元素的Name属性的值</span></span>
<span class="line"><span>getElementById() // 通过元素Id， 唯一性</span></span></code></pre></div><h2 id="写出三个使用-this-的典型应用" tabindex="-1">写出三个使用 this 的典型应用 <a class="header-anchor" href="#写出三个使用-this-的典型应用" aria-label="Permalink to &quot;写出三个使用 this 的典型应用&quot;">​</a></h2><ul><li>在 html 元素事件属性中使用</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;input type=&quot;button&quot; onclick=&quot;showInfo(this)&quot; value=&quot;点击一下&quot; /&gt;</span></span></code></pre></div><ul><li>构造函数</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Animal(name, color) {</span></span>
<span class="line"><span>  this.name = name;</span></span>
<span class="line"><span>  this.color = color;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>input 点击获取值</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;input type=&quot;button&quot; id=&quot;text&quot; value=&quot;点击一下&quot; /&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  var btn = document.getElementById(&#39;text&#39;);</span></span>
<span class="line"><span>  btn.onclick = function(){</span></span>
<span class="line"><span>    alert(this.value); // 此处的this是按钮元素</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><ul><li>apply()/call()求数组最值</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var numbers = [5, 458, 120, -25];</span></span>
<span class="line"><span>var maxInNumbers = Math.max.apply(this, numbers);</span></span>
<span class="line"><span>console.log(maxInNumbers); // 458</span></span>
<span class="line"><span>var maxInNumbers = Math.max.call(this,5, 458 , 120 , -215);</span></span>
<span class="line"><span>console.log(maxInNumbers);  // 458</span></span></code></pre></div><h2 id="比较-typeof-与-instanceof" tabindex="-1">比较 typeof 与 instanceof <a class="header-anchor" href="#比较-typeof-与-instanceof" aria-label="Permalink to &quot;比较 typeof 与 instanceof&quot;">​</a></h2><p>相同点： js 中 typeof 和 instanceof 常用来判断一个变量是否为空，或者是什么类型的。</p><ol><li>typeof 一般只能返回如下几个结果： number boolean string function object undefined</li><li>typeof 来获取一个变量是否存在，如 if(typeof a !== &quot;undefined&quot;){alert(&quot;ok&quot;)},而不要去使用 if(a)因为如果 a 不存在则会出错。</li><li>对于 Array，Null 等特殊对象使用 typeof 一律返回，这正是 typeof 的局限性。</li></ol><p>instanceof 用于判断一个变量是否属于某个对象的实例。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var a = new Array();</span></span>
<span class="line"><span>alert(a instanceof Array); // true</span></span>
<span class="line"><span>alert(a instanceof Object); // true</span></span></code></pre></div><p>如上，会返回 true，同时 alert(a instanceof Object) 也会返回 true;这是因为 Array 是 object 的子类。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function test(){};</span></span>
<span class="line"><span>var a = new test();</span></span>
<span class="line"><span>alert(a instanceof test)   // true</span></span></code></pre></div><p>如下，得到的结果为‘N’,这里的 instanceof 测试的 object 是指 js 语法中的 object，不是指 dom 模型对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (window instanceof Object){ alert(&#39;Y&#39;)} else {  alert(&#39;N&#39;);}  // &#39;N&#39;</span></span></code></pre></div><h2 id="如何理解闭包" tabindex="-1">如何理解闭包 <a class="header-anchor" href="#如何理解闭包" aria-label="Permalink to &quot;如何理解闭包&quot;">​</a></h2><ul><li>定义和用法：当一个函数的返回值是另一个函数，而返回的那个函数如果调用了其父函数内部的其他变量，如果返回的这个函数在外部被执行，就产生了闭包。</li><li>表现形式：使函数外部能够调用函数内部定义的变量</li><li>实例如下： <ol><li>根据作用域的规则，底层作用域没有声明的变量，会向上一级找，找到就返回，没找到就一直找，直到 window 的变量，没有就返回 undefined。这里明显 count 是函数内部的 flag2 的那个 count</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var count = 10; // 全局作用域，标记为flag1</span></span>
<span class="line"><span>function add(){</span></span>
<span class="line"><span>  var count = 0;</span></span>
<span class="line"><span>  return function (){</span></span>
<span class="line"><span>    count+=1;</span></span>
<span class="line"><span>    alert(count);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var s = add()</span></span>
<span class="line"><span>s(); //输出1</span></span>
<span class="line"><span>s(); //输出2</span></span></code></pre></div></li><li>变量的作用域</li></ul><p>特点：</p><ol><li>函数内部可以读取函数外部的全局变量，在函数外部无法读取函数内的局部变量</li><li>函数内部声明变量的时候，一定要使用 var 命令，不用的话其实是声明了一个全局变量。当然 let 也可以。</li></ol><ul><li>使用闭包的注意点</li></ul><ol><li>滥用闭包，会造成内存泄露：由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 IE 中可能导致内存泄漏。解决办法是，在退出函数之前，将不使用的局部变量全部删除掉。</li><li>会改变复函数内部变量的值，所以，如果你把复函数当做对象使用，把闭包当做他的公用方法，把内部变量当做他的私有属性，这时一定要小心，不要随便改变复函数内部变量的值。</li></ol><h2 id="什么事跨域-跨域请求资源的方法有哪些" tabindex="-1">什么事跨域？跨域请求资源的方法有哪些？ <a class="header-anchor" href="#什么事跨域-跨域请求资源的方法有哪些" aria-label="Permalink to &quot;什么事跨域？跨域请求资源的方法有哪些？&quot;">​</a></h2><ul><li><p>什么是跨域由于路由器的同源策略，凡是发送请求 utl 的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域。</p><ul><li><p>网络协议不同，如 http 协议访问 https 协议。</p></li><li><p>端口不同，如 80 端口访问 8080 端口。</p></li><li><p>域名不同，如 qianduanblog.com 访问 baidu.com。</p></li><li><p>子域名不同，如 abc.qianduanblog.com 访问 def.qianduanblog.com。</p></li><li><p>域名和域名对应 ip,如 www.a.com 访问 20.205.28.90.</p></li></ul></li><li><p>跨域请求资源的方法</p></li></ul><ol><li>proxy 代理</li></ol><p>定义和用法：proxy 代理用于将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。</p><p>实现方法：通过 nginx 代理；</p><p>注意点：1、如果你代理的是 https 协议的请求，那么你的 proxy 首先需要信任该证书（尤其是自定义证书）或者忽略证书检查，否则你的请求无法成功。</p><ol start="2"><li>CORS 【Cross-Origin Resource Sharing】</li></ol><p>定义和用法：是现代浏览器支持跨域资源请求的一种最常用的方式。</p><p>使用方法：一般需要后端人员在处理请求数据的时候，添加允许跨域的相关操作。如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>res.writeHead(200, {</span></span>
<span class="line"><span>    &quot;Content-Type&quot;: &quot;text/html; charset=UTF-8&quot;,</span></span>
<span class="line"><span>    &quot;Access-Control-Allow-Origin&quot;:&#39;http://localhost&#39;,</span></span>
<span class="line"><span>    &#39;Access-Control-Allow-Methods&#39;: &#39;GET, POST, OPTIONS&#39;,</span></span>
<span class="line"><span>    &#39;Access-Control-Allow-Headers&#39;: &#39;X-Requested-With, Content-Type&#39;</span></span>
<span class="line"><span>});</span></span></code></pre></div><ol start="3"><li>jsonp</li></ol><p>定义和用法：通过动态插入一个 script 标签。浏览器对 script 的资源引用没有同源限制，同时资源加载到页面后会立即执行（没有阻塞的情况下）。</p><p>特点：通过情况下，通过动态创建 script 来读取他域的动态资源，获取的数据一般为 json 格式。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    function testjsonp(data) {</span></span>
<span class="line"><span>       console.log(data.name); // 获取返回的结果</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    var _script = document.createElement(&#39;script&#39;);</span></span>
<span class="line"><span>    _script.type = &quot;text/javascript&quot;;</span></span>
<span class="line"><span>    _script.src = &quot;http://localhost:8888/jsonp?callback=testjsonp&quot;;</span></span>
<span class="line"><span>    document.head.appendChild(_script);</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><p>缺点：</p><ol><li><p>这种方式无法发送 post 请求（这里）</p></li><li><p>另外要确定 jsonp 的请求是否失败并不容易，大多数框架的实现都是结合超时时间来判定。</p></li></ol><h2 id="谈谈垃圾回收机制及内存管理" tabindex="-1">谈谈垃圾回收机制及内存管理 <a class="header-anchor" href="#谈谈垃圾回收机制及内存管理" aria-label="Permalink to &quot;谈谈垃圾回收机制及内存管理&quot;">​</a></h2><p>回收机制方式</p><ol><li>定义：垃圾回收机制，执行环境负责管理代码执行过程中使用的内存。</li><li>原理：垃圾收集器(周期性)会定期找出那些不再继续适用的变量，然后释放其内存。但是这个过程不是实时的，因为其开销大，所以垃圾回收器会按照固定的时间间隔周期性执行。</li><li>实例：</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function fn1 (){</span></span>
<span class="line"><span>  var obj = { name: &#39;hahaha&#39;, age: 10};</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function fn2 (){</span></span>
<span class="line"><span>  var obj = { name: &#39;hahaha&#39;, age: 10};</span></span>
<span class="line"><span>  return obj;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var a = fn1();</span></span>
<span class="line"><span>var b = fn2();</span></span></code></pre></div><p>fn1 中定义的 obj 为局部变量，而当调用结束后，出了 fn1 的环境，那么该内存会被 js 引擎中的垃圾回收器自动释放；在 fn2 被调用的过程中，返回的对象呗全局变量 b 所指向，所以该快内存并不会被释放。</p><ol><li>标记回收策略： 标记清除(较为常用)和引用计数。</li></ol><p>标记清除：</p><p>定义和用法：当变量进入环境时，将变量标记“进入环境”，当变量离开环境时，比较为：“离开环境”。某一个时刻，垃圾回收器会过滤掉环境中的变量，以及被环境变量引用的变量，剩下的就是被视为准备回收的变量。</p><p>到目前为止 IE，Firefox，opera，chrome，Safari 实现使用的都是标记清除的垃圾回收策略或类似的策略，只不过垃圾收集的时间间隔互不相同。</p><p>引用计数：</p><p>定义和用法：引用计数是跟踪记录每个值被引用的次数。基本原理：就是变量的引用次数，被引用一次则加一，当这个引用计数为 0 时，被视为准备回收的对象。</p><p>内存管理：</p><p>什么时候触发垃圾回收？</p><ol><li>垃圾回收器周期性运行，如果分配的内存非常多，那么回收工作也会很艰巨，确定垃圾回收时间间隔就变成了一个值得思考的问题。</li></ol><p>IE6 的垃圾回收是根据内存分配量运行的，当环境中的变量，对象，字符串达到一定数量时触发垃圾回收。垃圾回收器一直处于工作状态，严重影响浏览器性能。</p><p>IE7 中，垃圾回收器会根据内存分配量与程序占用内存的比例进行动态调整，开始回收工作。</p><ol start="2"><li>合理的 GC 方案： (1) 遍历所有可访问的对象；(2) 回收已不可访问的对象。</li><li>GC 缺陷： (1) 停止响应其他操作。</li><li>GC 优惠策略：(1) 分代回收(Generation GC);(2) 增量 GC；</li></ol><h2 id="开发过程中遇见的内存泄漏情况-如何解决的" tabindex="-1">开发过程中遇见的内存泄漏情况，如何解决的？ <a class="header-anchor" href="#开发过程中遇见的内存泄漏情况-如何解决的" aria-label="Permalink to &quot;开发过程中遇见的内存泄漏情况，如何解决的？&quot;">​</a></h2><ol><li>定义：</li></ol><p>内存泄漏是指一块被分配的内存既不能使用，又不能回收，知道浏览器进程结束。C#和 JAVA 等语言采用了自动垃圾回收方法管理内存，机会不会发生内存泄露。我们知道，浏览器中也是采用自动垃圾回收方法管理内存，但由于浏览器垃圾回收方法有 bug，会产生内存泄露。</p><ol start="2"><li><p>内存泄漏的几种情况：</p></li><li><p>当页面中的元素被移除或替换时，若元素绑定的事件仍没被移除，在 IE 中不会做出恰当处理，此时要先手工移除事件，不然会存在内存泄漏。</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div id=&quot;myDiv&quot;&gt;</span></span>
<span class="line"><span>  &lt;input type=&quot;button&quot; value=&quot;Click me&quot; id=&quot;myBtn&quot; /&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  var btn = document.getElementById(&quot;myBtn&quot;)</span></span>
<span class="line"><span>  btn.onclick = function () {</span></span>
<span class="line"><span>    document.getElementById(&quot;myDiv&quot;).innerHTMl = &quot;processing...&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><p>解决方法是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div id=&quot;myDiv&quot;&gt;</span></span>
<span class="line"><span>  &lt;input type=&quot;button&quot; value=&quot;Click me&quot; id=&quot;myBtn&quot; /&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  var btn = document.getElementById(&quot;myBtn&quot;)</span></span>
<span class="line"><span>  btn.onclick = function () {</span></span>
<span class="line"><span>    btn.onclick = null;</span></span>
<span class="line"><span>    document.getElementById(&quot;myDiv&quot;).innerHTMl = &quot;processing...&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><ol start="2"><li>由于是函数内定义函数，并且内部函数--时间回调的引用外暴了，形成了闭包。闭包可以维持函数内局部变量，使其得不到释放。</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function btnEvent(){</span></span>
<span class="line"><span>  var obj = document.createElement(&#39;XXX&#39;);</span></span>
<span class="line"><span>  obj.onclick = function () {</span></span>
<span class="line"><span>    // Even if it&#39;s a empty function</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>解决方法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function bindEvent(){</span></span>
<span class="line"><span>    var obj=document.createElement(&quot;XXX&quot;);</span></span>
<span class="line"><span>    obj.onclick=function(){</span></span>
<span class="line"><span>         //Even if it&#39;s a empty function</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    obj=null;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="javascript-面向对象中继承实现" tabindex="-1">JavaScript 面向对象中继承实现？ <a class="header-anchor" href="#javascript-面向对象中继承实现" aria-label="Permalink to &quot;JavaScript 面向对象中继承实现？&quot;">​</a></h2><p>面向对象的基本特诊有：封闭，继承，多态。</p><p>在 JavaScript 中实现继承的方法：</p><ol><li>原型链(prototype chaining)</li><li>call()/apply()</li><li>混合方式(prototype 和 call()/apply()结合)</li><li>对象冒充</li></ol><p>继承方法：</p><ol><li>proto 原型链方式：</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function teacher(name) {</span></span>
<span class="line"><span>  this.name = name;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>teacher.prototype.sayName = function(){</span></span>
<span class="line"><span>  console.log(&quot;name is&quot; + this.name);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var teacher1 = new teacher(&quot;xiaoming&quot;);</span></span>
<span class="line"><span>teacher1.sayName();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function student(name) {</span></span>
<span class="line"><span>  this.name = name;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>student.prototype = new teacher();</span></span>
<span class="line"><span>var student1 = new student(&quot;xiaolan&quot;);</span></span>
<span class="line"><span>student1.sayName();</span></span>
<span class="line"><span>// name is xiaoming</span></span>
<span class="line"><span>// name is xiaolan</span></span></code></pre></div><ol start="2"><li>call()/apply()方法</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function teacher(name, age) {</span></span>
<span class="line"><span>  this.name = name;</span></span>
<span class="line"><span>  this.age = age;</span></span>
<span class="line"><span>  this.sayhi = function () {</span></span>
<span class="line"><span>    alert(&#39;name&#39; + name + &quot;, age:&quot; + age);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function student () {</span></span>
<span class="line"><span>  var args = arguments;</span></span>
<span class="line"><span>  teacher.call(this, args[0], args[1]);</span></span>
<span class="line"><span>  // teacher.apply(this, arguments);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var teacher1 = new teacher(&#39;xiaoming&#39;, 23);</span></span>
<span class="line"><span>teacher1.sayhi();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var student1 = new student(&#39;xiaolan&#39;, 12);</span></span>
<span class="line"><span>student1.sayhi();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// alert: name:xiaoming, age: 23;</span></span>
<span class="line"><span>// alert: name:xiaolan, age: 12;</span></span></code></pre></div><ol start="3"><li>混合方法[prototype, call/apply]</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  function teacher(name, age) {</span></span>
<span class="line"><span>    this.name = name;</span></span>
<span class="line"><span>    this.age = age;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  teacher.prototype.sayName = function (){</span></span>
<span class="line"><span>    console.log(&#39;name&#39; + this.name);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  teacher.prototype.sayAge = function(){</span></span>
<span class="line"><span>    console.log(&#39;age&#39; + this.age);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  function student() {</span></span>
<span class="line"><span>    var args = arguments;</span></span>
<span class="line"><span>    teacher.call(this, args[0], args[1]);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  student.prototype = new teacher();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  var student1 = new student(&#39;xiaolin&#39;, 23);</span></span>
<span class="line"><span>  student1.sayName();</span></span>
<span class="line"><span>  student1.sayAge();</span></span>
<span class="line"><span>  // name:xiaolin</span></span>
<span class="line"><span>  // age:23</span></span></code></pre></div><ol start="4"><li>对象冒充</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Person(name, age) {</span></span>
<span class="line"><span>  this.name = name;</span></span>
<span class="line"><span>  this.age = age;</span></span>
<span class="line"><span>  this.show = function (){</span></span>
<span class="line"><span>    console.log(this.name + &quot;, &quot; + this.age);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function Student(name, age) {</span></span>
<span class="line"><span>  this.student = Person; // 将Person类的构造函数赋值给this.student</span></span>
<span class="line"><span>  this.student(name, age); // js中实际上是通过对象冒充来实现继承的</span></span>
<span class="line"><span>  delete this.student;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var S = new Student(&quot;小明&quot;, 17);</span></span>
<span class="line"><span>s.show();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var P = new Person(&quot;小花&quot;, 18);</span></span>
<span class="line"><span>p.show();</span></span>
<span class="line"><span>// 小明，17</span></span>
<span class="line"><span>// 小花，18</span></span></code></pre></div><h1 id="javascript-相关程序计算题" tabindex="-1">JavaScript 相关程序计算题 <a class="header-anchor" href="#javascript-相关程序计算题" aria-label="Permalink to &quot;JavaScript 相关程序计算题&quot;">​</a></h1><h2 id="判断一个字符串中出现次数最多的字符-统计这个次数" tabindex="-1">判断一个字符串中出现次数最多的字符，统计这个次数 <a class="header-anchor" href="#判断一个字符串中出现次数最多的字符-统计这个次数" aria-label="Permalink to &quot;判断一个字符串中出现次数最多的字符，统计这个次数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var str = &quot;asdfssaaasasasasaa&quot;;</span></span>
<span class="line"><span>var json = {};</span></span>
<span class="line"><span>for(let i = 0;i &lt; str.length;i++){</span></span>
<span class="line"><span>  if (!json[str.charAt(i)]) {</span></span>
<span class="line"><span>    json[str.charAt(i)] = 1;</span></span>
<span class="line"><span>  }else {</span></span>
<span class="line"><span>    json[str.charAt(i)]++;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var iMax = 0;</span></span>
<span class="line"><span>var iIndex = &#39;&#39;;</span></span>
<span class="line"><span>for(var i in json){</span></span>
<span class="line"><span>  if(json[i]&gt;iMax){</span></span>
<span class="line"><span>    iMax = json[i];</span></span>
<span class="line"><span>    iIndex = i;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(&#39;出现次数最多的是：&#39; + iIndex + &#39;出现&#39; +  iMax + &#39;次&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 出现次数最多的是：a出现9次</span></span></code></pre></div><h1 id="javascript-数组对象" tabindex="-1">JavaScript 数组对象 <a class="header-anchor" href="#javascript-数组对象" aria-label="Permalink to &quot;JavaScript 数组对象&quot;">​</a></h1><h2 id="array-相关的属性和方法" tabindex="-1">Array 相关的属性和方法 <a class="header-anchor" href="#array-相关的属性和方法" aria-label="Permalink to &quot;Array 相关的属性和方法&quot;">​</a></h2><p>Array 对象属性</p><p>constructor 返回对创建此对象的数组函数的引用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var test = new Array()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if(test.constructor == Array) {</span></span>
<span class="line"><span>  console.log(&quot;this is an Array&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if(test.constructor == Boolean) {</span></span>
<span class="line"><span>  console.log(&quot;this is a Boolean&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if(test.constructor == Date) {</span></span>
<span class="line"><span>  console.log(&quot;this is a Date&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if(test.constructor == String) {</span></span>
<span class="line"><span>  console.log(&quot;this is a String&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Array 对象方法</p><p>concat()连接两个或更多的数组，并返回结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [1,2,3,4];</span></span>
<span class="line"><span>var arr2 = [5,6,7,8];</span></span>
<span class="line"><span>var arr3 = arr.concat(arr2);</span></span>
<span class="line"><span>console.log(arr3); // [1, 2, 3, 4, 5, 6, 7, 8]</span></span></code></pre></div><p>join()把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分割。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [&#39;xiao&#39;,&#39;lin&#39;,&#39;qiqi&#39;,&#39;mingtian&#39;];</span></span>
<span class="line"><span>var arr2 = arr.join(&#39;,&#39;);</span></span>
<span class="line"><span>console.log(arr2); // 根据&#39;,&#39;隔开返回的字符串为：&quot;xiao,lin,qiqi,mingtian&quot;</span></span></code></pre></div><p>pop()删除并返回数组的最后一个元素</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [2,3,4,5];</span></span>
<span class="line"><span>var arr2 = arr.pop();</span></span>
<span class="line"><span>console.log(arr2); // 删除的数组的最后一个元素为：5</span></span>
<span class="line"><span>console.log(arr); // 删除元素之后的数组为： [2,3,4]</span></span></code></pre></div><p>shift() 删除并返回数组的第一个元素</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [2,3,4,5];</span></span>
<span class="line"><span>var arr2 = arr.shift();</span></span>
<span class="line"><span>console.log(arr2); // 删除的数组的第一个元素为：2</span></span>
<span class="line"><span>console.log(arr);  // 删除元素之后的数组为：[3, 4，5]</span></span></code></pre></div><p>push() 向数组的末尾添加一个或更多元素，并返回新的长度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [2,3,4,5];</span></span>
<span class="line"><span>var arr2 = arr.push(6);</span></span>
<span class="line"><span>console.log(arr2);  // 返回的数组长度：5</span></span>
<span class="line"><span>console.log(arr);  // [2, 3, 4, 5, 6]</span></span></code></pre></div><p>unshift() 向数组的开头添加一个或更多元素，并返回新的长度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [&#39;xiao&#39;,&#39;ming&#39;,&#39;qiqi&#39;,&#39;aiming&#39;];</span></span>
<span class="line"><span>var arr1 = arr.unshift(&#39;lang&#39;);</span></span>
<span class="line"><span>console.log(arr1);  // 返回的数组的长度：  5</span></span>
<span class="line"><span>console.log(arr);  //向数组开头添加元素返回的结果：[&quot;lang&quot;, &quot;xiao&quot;, &quot;ming&quot;, &quot;qiqi&quot;, &quot;aiming&quot;]</span></span></code></pre></div><p>reverse() 颠倒数组中元素的顺序。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [2,3,4,5];</span></span>
<span class="line"><span>arr.reverse();</span></span>
<span class="line"><span>console.log(arr);   //  [5, 4, 3, 2]</span></span></code></pre></div><p>slice() 从某个已有的数组返回选定的元素</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [2,3,4,5];</span></span>
<span class="line"><span>var arr2 = arr.slice(1,3);</span></span>
<span class="line"><span>console.log(arr2);  // 截取区间返回的数组为：[3, 4]</span></span>
<span class="line"><span>console.log(arr);  // [2, 3, 4, 5]</span></span></code></pre></div><p>sort() 对数组的元素进行排序</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>借助排序函数，实现数值由小到大排序</span></span>
<span class="line"><span>function sortNumber(a,b){</span></span>
<span class="line"><span>    return a - b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var arr = [23,30,42,5];</span></span>
<span class="line"><span>var arr2 = arr.sort(sortNumber);</span></span>
<span class="line"><span>console.log(arr2);  // [5, 23, 30, 42]</span></span>
<span class="line"><span>console.log(arr);   // [5, 23, 30, 42]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>借助排序函数，实现数值由大到小排序</span></span>
<span class="line"><span>function sortNumber(a,b){</span></span>
<span class="line"><span>    return b - a</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var arr = [23,30,42,5];</span></span>
<span class="line"><span>var arr2 = arr.sort(sortNumber);</span></span>
<span class="line"><span>console.log(arr2);  // [42, 30, 23, 5]</span></span>
<span class="line"><span>console.log(arr);  // [42, 30, 23, 5]</span></span></code></pre></div><p>splice() 删除元素，并向数组添加新元素。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>语法:arrayObject.splice(index,howmany,item1,.....,itemX)</span></span>
<span class="line"><span>index:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。</span></span>
<span class="line"><span>howmany:必需。要删除的项目数量。如果设置为 0，则不会删除项目。</span></span>
<span class="line"><span>item1, ..., itemX:可选。向数组添加的新项目。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 创建一个新数组，并向其添加一个元素</span></span>
<span class="line"><span>var arr = [1,2,3,4];</span></span>
<span class="line"><span>arr.splice(2,0,5);</span></span>
<span class="line"><span>console.log(arr);  // [1, 2, 5, 3, 4]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 删除位于 index 2 的元素，并添加一个新元素来替代被删除的元素：</span></span>
<span class="line"><span>var arr = [1,2,3,4];</span></span>
<span class="line"><span>arr.splice(2,1,5);</span></span>
<span class="line"><span>console.log(arr);  // [1, 2, 5, 4]</span></span></code></pre></div><p>toSource() 返回该对象的源代码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>浏览器支持</span></span>
<span class="line"><span>只有 Gecko 核心的浏览器（比如 Firefox）支持该方法，也就是说 IE、Safari、Chrome、Opera 等浏览器均不支持该方法。</span></span>
<span class="line"><span>&lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span>function employee(name,job,born){</span></span>
<span class="line"><span>    this.name=name;</span></span>
<span class="line"><span>    this.job=job;</span></span>
<span class="line"><span>    this.born=born;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var bill = new employee(&quot;Bill Gates&quot;,&quot;Engineer&quot;,1985);</span></span>
<span class="line"><span>document.write(bill.toSource());</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>输出：({name:&quot;Bill Gates&quot;, job:&quot;Engineer&quot;, born:1985})</span></span></code></pre></div><p>toString() 把数组转换为字符串，并返回结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [&#39;xiao&#39;,&#39;ming&#39;,&#39;qiqi&#39;,&#39;aiming&#39;];</span></span>
<span class="line"><span>arr.toString();</span></span>
<span class="line"><span>console.log(arr);  // [&quot;xiao&quot;, &quot;ming&quot;, &quot;qiqi&quot;, &quot;aiming&quot;]</span></span></code></pre></div><p>toLocaleString() 把数组转换为本地数组，并返回结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [&#39;xiao&#39;,&#39;ming&#39;,&#39;qiqi&#39;,&#39;aiming&#39;];</span></span>
<span class="line"><span>arr.toLocaleString();</span></span>
<span class="line"><span>console.log(arr);  // [&quot;xiao&quot;, &quot;ming&quot;, &quot;qiqi&quot;, &quot;aiming&quot;]</span></span></code></pre></div><p>valueOf() 返回数组对象的原始值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [&#39;xiao&#39;,&#39;ming&#39;,&#39;qiqi&#39;,&#39;aiming&#39;];</span></span>
<span class="line"><span>arr.valueOf(&#39;lang&#39;);</span></span>
<span class="line"><span>console.log(arr); // [&quot;xiao&quot;, &quot;ming&quot;, &quot;qiqi&quot;, &quot;aiming&quot;]</span></span></code></pre></div><h2 id="数组去重" tabindex="-1">数组去重 <a class="header-anchor" href="#数组去重" aria-label="Permalink to &quot;数组去重&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [0,2,3,4,4,0,2];</span></span>
<span class="line"><span>var obj = {};</span></span>
<span class="line"><span>var tmp = [];</span></span>
<span class="line"><span>for(var i =0;i&lt;arr.length;i++){</span></span>
<span class="line"><span>  if(!obj[arr[i]]){</span></span>
<span class="line"><span>    obj[arr[i]] = 1;</span></span>
<span class="line"><span>    tmp.push(arr[i]);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>console.log(tmp); // [0, 2, 3, 4]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [2,3,4,4,5,2,3,6],</span></span>
<span class="line"><span>   arr2 = [];</span></span>
<span class="line"><span>for(var i = 0;i&lt; arr.length;i++){</span></span>
<span class="line"><span>    if(arr2.indexOf(arr[i]) &lt; 0){</span></span>
<span class="line"><span>        arr2.push(arr[i]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>console.log(arr2);</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [2,3,4,4,5,2,3,6];</span></span>
<span class="line"><span>var arr2 = arr.filter(function(element,index,self){</span></span>
<span class="line"><span>return self.indexOf(element) === index;</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>console.log(arr2);</span></span></code></pre></div><h2 id="求数组的最值" tabindex="-1">求数组的最值 <a class="header-anchor" href="#求数组的最值" aria-label="Permalink to &quot;求数组的最值&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>求数组最大值:Math.max.apply(null,arr);</span></span>
<span class="line"><span>var arr = [3,43,23,45,65,90];</span></span>
<span class="line"><span>var max = Math.max.apply(null,arr);</span></span>
<span class="line"><span>console.log(max);</span></span>
<span class="line"><span>// 90</span></span>
<span class="line"><span>求数组最小值：Math.min.apply(null,arr);</span></span>
<span class="line"><span>var arr = [3,43,23,45,65,90];</span></span>
<span class="line"><span>var min = Math.min.apply(null,arr);</span></span>
<span class="line"><span>console.log(min);</span></span>
<span class="line"><span>// 3</span></span></code></pre></div><p>方法二：Array.max = function(arr){} / Array.min = function(arr){}</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var array = [3,43,23,45,65,90];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Array.max = function( array ){</span></span>
<span class="line"><span>   return Math.max.apply( Math, array );</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>Array.min = function( array ){</span></span>
<span class="line"><span>   return Math.min.apply( Math, array );</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var max = Array.max(array);</span></span>
<span class="line"><span>console.log(max);  // 90</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var min = Array.min(array);</span></span>
<span class="line"><span>console.log(min);  // 3</span></span></code></pre></div><p>方法三：Array.prototype.max = function(){};Array.prototype.min = function(){};</p><ul><li>求数组最大值(基本思路：将数组中的第一个赋值赋给变量 max，将数组进行循环与 max 进行比较，将数组中的大值赋给 max，最后返回 max)</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [3,43,23,45,65,90];</span></span>
<span class="line"><span>Array.prototype.max = function () {</span></span>
<span class="line"><span>  var max = this[0];</span></span>
<span class="line"><span>  var len = this.length;</span></span>
<span class="line"><span>  for(var i = 0;i &lt; len;i++&gt;){</span></span>
<span class="line"><span>    if(this[i] &gt; max) {</span></span>
<span class="line"><span>      max = this[i];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return max;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var max = arr.max();</span></span>
<span class="line"><span>console.log(max); // 90</span></span></code></pre></div><ul><li>求数组最小值</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [3,43,23,45,65,90];</span></span>
<span class="line"><span>Array.prototype.min = function () {</span></span>
<span class="line"><span>  var min = this[0];</span></span>
<span class="line"><span>  var len = this.length;</span></span>
<span class="line"><span>  for(var i = 0;i &lt; len;i++&gt;){</span></span>
<span class="line"><span>    if(this[i] &lt; min) {</span></span>
<span class="line"><span>      min = this[i];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return min</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var min = arr.min()</span></span>
<span class="line"><span>console.log(min); // 3</span></span></code></pre></div><h2 id="数组排序相关" tabindex="-1">数组排序相关 <a class="header-anchor" href="#数组排序相关" aria-label="Permalink to &quot;数组排序相关&quot;">​</a></h2><p>排序详细可查看：<a href="https://github.com/wu529778790/study/tree/master/sort" target="_blank" rel="noreferrer">https://github.com/wu529778790/study/tree/master/sort</a></p><p>结合 sort 和函数排序：</p><p>数组有小到大排序，sort，sortnum</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [3,43,23,45,65,90];</span></span>
<span class="line"><span>function sortnum(a, b) {</span></span>
<span class="line"><span>  return a- b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>arr = arr.sort(sortnum);</span></span>
<span class="line"><span>console.log(arr); // [3, 23, 43, 45, 65, 90]</span></span></code></pre></div><p>数组由大到小排序</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [3,43,23,45,65,90];</span></span>
<span class="line"><span>function sortnum(a,b){</span></span>
<span class="line"><span>　　return a+b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>arr = arr.sort(sortnum);</span></span>
<span class="line"><span>console.log(arr);</span></span>
<span class="line"><span>// [90, 65, 45, 23, 43, 3]</span></span></code></pre></div><p>冒泡排序：即实现数组由小到大进行排序；思路为：每次比较相邻的两个数，如果后一个比前一个小，换位置。如果要实现由大到小排序，使用 reverse()即可；</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [3, 1, 4, 6, 5, 7, 2];</span></span>
<span class="line"><span>function bubbleSort(arr) {</span></span>
<span class="line"><span>    var len = arr.length;</span></span>
<span class="line"><span>    for (var i = len; i &gt;= 2; --i) {</span></span>
<span class="line"><span>        for (var j = 0; j &lt; i - 1; j++) {</span></span>
<span class="line"><span>            if (arr[j + 1] &lt; arr[j]) {</span></span>
<span class="line"><span>                var temp;</span></span>
<span class="line"><span>                temp = arr[j];</span></span>
<span class="line"><span>                arr[j] = arr[j + 1];</span></span>
<span class="line"><span>                arr[j + 1] = temp;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return arr;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var arr2 = bubbleSort(arr);</span></span>
<span class="line"><span>console.log(arr2);  // [1, 2, 3, 4, 5, 6, 7]</span></span>
<span class="line"><span>var arr3 = arr2.reverse();</span></span>
<span class="line"><span>console.log(arr3);  //  [7, 6, 5, 4, 3, 2, 1]</span></span></code></pre></div><p>快速排序：采用二分法，去除中间数，数组每次和中间数比较，小的放到左边，大的放右边。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [3, 1, 4, 6, 5, 7, 2];</span></span>
<span class="line"><span>function quickSort(arr){</span></span>
<span class="line"><span>  if(arr.length == 0){</span></span>
<span class="line"><span>    return []; // 返回空数组</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  var cIndex = Math.floor(arr.length / 2);</span></span>
<span class="line"><span>  var c = arr.splice(cIndex, 1);</span></span>
<span class="line"><span>  var l = [];</span></span>
<span class="line"><span>  var r = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for(var i = 0;i &lt; arr.length; i++) {</span></span>
<span class="line"><span>    if(arr[i] &lt; c) {</span></span>
<span class="line"><span>      l.push(arr[i])</span></span>
<span class="line"><span>    }else {</span></span>
<span class="line"><span>      r.push(arr[i])</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return quickSort(l).concat(c, quickSort(r));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(quickSort(arr));</span></span></code></pre></div><p>##数组的翻转(非 reverse())</p><p>方法一：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [1,2,3,4];</span></span>
<span class="line"><span>var arr2 = [];</span></span>
<span class="line"><span>while(arr.length) {</span></span>
<span class="line"><span>  var num = arr.pop(); // 删除数组最后一个元素并返回被删除的元素</span></span>
<span class="line"><span>  arr2.push(num);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>console.log(arr2);</span></span></code></pre></div><p>方法二：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var arr = [1,2,3,4];</span></span>
<span class="line"><span>var arr2 = [];</span></span>
<span class="line"><span>while(arr.length) {</span></span>
<span class="line"><span>  var num = arr.shift(); // 删除数组第一个元素并返回被删除的元素</span></span>
<span class="line"><span>  arr2.unshift(num);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="jquery-相关" tabindex="-1">jQuery 相关 <a class="header-anchor" href="#jquery-相关" aria-label="Permalink to &quot;jQuery 相关&quot;">​</a></h1><ol><li>jQuery 库中的 $() 是什么？</li></ol><p>$() 函数是 jQuery() 函数的别称。$() 函数用于将任何对象包裹成 jQuery 对象，接着你就被允许调用定义在 jQuery 对象上的多个不同方法。你可以将一个选择器字符串传入 $() 函数，它会返回一个包含所有匹配的 DOM 元素数组的 jQuery 对象。</p><ol start="2"><li>如何找到所有 HTML select 标签的选中项？</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$(&#39;[name=selectname] :selected&#39;)</span></span></code></pre></div><ol start="3"><li>$(this) 和 this 关键字在 jQuery 中有何不同？</li></ol><p>$(this) 返回一个 jQuery 对象，你可以对它调用多个 jQuery 方法，比如用 text() 获取文本，用 val() 获取值等等。</p><p>而 this 代表当前元素，它是 JavaScript 关键词中的一个，表示上下文中的当前 DOM 元素。你不能对它调用 jQuery 方法，直到它被 $() 函数包裹，例如 $(this)。</p><ol start="4"><li>jquery 怎么移除标签 onclick 属性？</li></ol><p>获得 a 标签的 onclick 属性: $(&quot;a&quot;).attr(&quot;onclick&quot;)</p><p>删除 onclick 属性：$(&quot;a&quot;).removeAttr(&quot;onclick&quot;);</p><p>设置 onclick 属性：$(&quot;a&quot;).attr(&quot;onclick&quot;,&quot;test();&quot;);</p><ol start="5"><li>jquery 中 addClass,removeClass,toggleClass 的使用。</li></ol><p>$(selector).addClass(class)：为每个匹配的元素添加指定的类名</p><p>$(selector).removeClass(class)：从所有匹配的元素中删除全部或者指定的类，删除 class 中某个值；</p><p>$(selector).toggleClass(class)：如果存在（不存在）就删除（添加）一个类</p><p>$(selector).removeAttr(class);删除 class 这个属性；</p><ol start="6"><li>JQuery 有几种选择器?</li></ol><p>(1)、基本选择器：#id，class,element,*;</p><p>(2)、层次选择器：parent &gt; child，prev + next ，prev ~ siblings</p><p>(3)、基本过滤器选择器：:first，:last ，:not ，:even ，:odd ，:eq ，:gt ，:lt</p><p>(4)、内容过滤器选择器： :contains ，:empty ，:has ，:parent</p><p>(5)、可见性过滤器选择器：:hidden ，:visible</p><p>(6)、属性过滤器选择器：[attribute] ，[attribute=value] ，[attribute!=value] ，[attribute^=value] ，[attribute$=value] ，[attribute*=value]</p><p>(7)、子元素过滤器选择器：:nth-child ，:first-child ，:last-child ，:only-child</p><p>(8)、表单选择器： :input ，:text ，:password ，:radio ，:checkbox ，:submit 等；</p><p>(9)、表单过滤器选择器：:enabled ，:disabled ，:checked ，:selected</p><ol start="7"><li>jQuery 中的 Delegate()函数有什么作用？</li></ol><p>delegate()会在以下两个情况下使用到：</p><p>1、如果你有一个父元素，需要给其下的子元素添加事件，这时你可以使用 delegate()了，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$(&quot;ul&quot;).delegate(&quot;li&quot;, &quot;click&quot;, function(){ $(this).hide(); });</span></span></code></pre></div><p>2、当元素在当前页面中不可用时，可以使用 delegate()</p><ol start="8"><li>$(document).ready()方法和 window.onload 有什么区别？</li></ol><p>(1)、window.onload 方法是在网页中所有的元素(包括元素的所有关联文件)完全加载到浏览器后才执行的。</p><p>(2)、$(document).ready() 方法可以在 DOM 载入就绪时就对其进行操纵，并调用执行绑定的函数。</p><ol start="9"><li>如何用 jQuery 禁用浏览器的前进后退按钮？</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script type=&quot;text/javascript&quot; language=&quot;javascript&quot;&gt;</span></span>
<span class="line"><span>　　$(document).ready(function() {</span></span>
<span class="line"><span>　　　　window.history.forward(1);</span></span>
<span class="line"><span>  　　　　//OR window.history.forward(-1);</span></span>
<span class="line"><span>　　});</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><ol start="10"><li>jquery 中$.get()提交和$.post()提交有区别吗？</li></ol><p>相同点：都是异步请求的方式来获取服务端的数据；</p><p>异同点：</p><p>1、请求方式不同：$.get() 方法使用 GET 方法来进行异步请求的。$.post() 方法使用 POST 方法来进行异步请求的。</p><p>2、参数传递方式不同：get 请求会将参数跟在 URL 后进行传递，而 POST 请求则是作为 HTTP 消息的实体内容发送给 Web 服务器的，这种传递是对用户不可见的。</p><p>3、数据传输大小不同：get 方式传输的数据大小不能超过 2KB 而 POST 要大的多</p><p>4、安全问题： GET 方式请求的数据会被浏览器缓存起来，因此有安全问题。</p><ol start="11"><li>写出一个简单的$.ajax()的请求方式？</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$.ajax({</span></span>
<span class="line"><span>    url:&#39;http://www.baidu.com&#39;,</span></span>
<span class="line"><span>    type:&#39;POST&#39;,</span></span>
<span class="line"><span>    data:data,</span></span>
<span class="line"><span>    cache:true,</span></span>
<span class="line"><span>    headers:{},</span></span>
<span class="line"><span>    beforeSend：function(){},</span></span>
<span class="line"><span>    success:function(){},</span></span>
<span class="line"><span>    error:function(){},</span></span>
<span class="line"><span>    complete:function(){}</span></span>
<span class="line"><span>});</span></span></code></pre></div><ol start="12"><li>jQuery 的事件委托方法 bind 、live、delegate、on 之间有什么区别？</li></ol><p>(1)、bind 【jQuery 1.3 之前】</p><p>定义和用法：主要用于给选择到的元素上绑定特定事件类型的监听函数；</p><p>语法：bind(type,[data],function(eventObject))；</p><p>特点：</p><p>(1)、适用于页面元素静态绑定。只能给调用它的时候已经存在的元素绑定事件，不能给未来新增的元素绑定事件。</p><p>(2)、当页面加载完的时候，你才可以进行 bind()，所以可能产生效率问题。</p><p>实例如下：$( &quot;#members li a&quot; ).bind( &quot;click&quot;, function( e ) {} );</p><p>(2)、live 【jQuery 1.3 之后】 定义和用法：主要用于给选择到的元素上绑定特定事件类型的监听函数；</p><p>语法：live(type, [data], fn);</p><p>特点：</p><p>(1)、live 方法并没有将监听器绑定到自己(this)身上，而是绑定到了 this.context 上了。</p><p>(2)、live 正是利用了事件委托机制来完成事件的监听处理，把节点的处理委托给了 document，新添加的元素不必再绑定一次监听器。</p><p>(3)、使用 live（）方法但却只能放在直接选择的元素后面，不能在层级比较深，连缀的 DOM 遍历方法后面使用，即$(“ul”&quot;).live...可以，但$(&quot;body&quot;).find(&quot;ul&quot;).live...不行；</p><p>实例如下：$( document ).on( &quot;click&quot;, &quot;#members li a&quot;, function( e ) {} );</p><p>(3)、delegate 【jQuery 1.4.2 中引入】 定义和用法：将监听事件绑定在就近的父级元素上</p><p>语法：delegate(selector,type,[data],fn)</p><p>特点：</p><p>(1)、选择就近的父级元素，因为事件可以更快的冒泡上去，能够在第一时间进行处理。</p><p>(2)、更精确的小范围使用事件代理，性能优于.live()。可以用在动态添加的元素上。</p><p>实例如下：</p><p>$(&quot;#info*table&quot;).delegate(&quot;td&quot;,&quot;click&quot;,function(){/*显示更多信息_/});</p><p>$(&quot;table&quot;).find(&quot;#info&quot;).delegate(&quot;td&quot;,&quot;click&quot;,function(){/<em>显示更多信息</em>/});</p><p>(4)、on 【1.7 版本整合了之前的三种方式的新事件绑定机制】 定义和用法：将监听事件绑定到指定元素上。</p><p>语法：on(type,[selector],[data],fn)</p><p>实例如下：$(&quot;#info*table&quot;).on(&quot;click&quot;,&quot;td&quot;,function(){/*显示更多信息_/});参数的位置写法与 delegate 不一样。</p><p>说明：on 方法是当前 JQuery 推荐使用的事件绑定方法，附加只运行一次就删除函数的方法是 one()。</p><p>总结：.bind(), .live(), .delegate(),.on()分别对应的相反事件为：.unbind(),.die(), .undelegate(),.off()</p><h1 id="html-css" tabindex="-1">HTML &amp;&amp; CSS <a class="header-anchor" href="#html-css" aria-label="Permalink to &quot;HTML &amp;&amp; CSS&quot;">​</a></h1><ol><li>什么是盒子模型？</li></ol><p>在网页中，一个元素占有空间的大小由几个部分构成，其中包括元素的内容（content），元素的内边距（padding），元素的边框（border），元素的外边距（margin）四个部分。这四个部分占有的空间中，有的部分可以显示相应的内容，而有的部分只用来分隔相邻的区域或区域。4 个部分一起构成了 css 中元素的盒模型。</p><ol start="2"><li>行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？</li></ol><p>行内元素：a、b、span、img、input、strong、select、label、em、button、textarea</p><p>块级元素：div、ul、li、dl、dt、dd、p、h1-h6、blockquote</p><p>空元素：即系没有内容的 HTML 元素，例如：br、meta、hr、link、input、img</p><ol start="3"><li>CSS 实现垂直水平居中</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;wrapper&quot;&gt;</span></span>
<span class="line"><span>     &lt;div class=&quot;content&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.wrapper {</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    width: 500px;</span></span>
<span class="line"><span>    height: 500px;</span></span>
<span class="line"><span>    border: 1px solid red;</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>.content{</span></span>
<span class="line"><span>    position: absolute;</span></span>
<span class="line"><span>    width: 200px;</span></span>
<span class="line"><span>    height: 200px;</span></span>
<span class="line"><span>    /*top、bottom、left和right 均设置为0*/</span></span>
<span class="line"><span>    top: 0;</span></span>
<span class="line"><span>    bottom: 0;</span></span>
<span class="line"><span>    left: 0;</span></span>
<span class="line"><span>    right: 0;</span></span>
<span class="line"><span>    /*margin设置为auto*/</span></span>
<span class="line"><span>    margin:auto;</span></span>
<span class="line"><span>    border: 1px solid green;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="4"><li>简述一下 src 与 href 的区别</li></ol><p>href 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。</p><p>src 是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片和 frame 等元素。</p><p>当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 js 脚本放在底部而不是头部。</p><ol start="5"><li>简述同步和异步的区别</li></ol><p>同步是阻塞模式，异步是非阻塞模式。</p><p>同步就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去；</p><p>异步是指进程不需要一直等下去，而是继续执行下面的操作，不管其他进程的状态。当有消息返回时系统会通知进程进行处理，这样可以提高执行的效率。</p><ol start="6"><li>px 和 em 的区别</li></ol><p>相同点：px 和 em 都是长度单位；</p><p>异同点：px 的值是固定的，指定是多少就是多少，计算比较容易。em 得值不是固定的，并且 em 会继承父级元素的字体大小。</p><p>浏览器的默认字体高都是 16px。所以未经调整的浏览器都符合: 1em=16px。那么 12px=0.75em, 10px=0.625em。</p><ol start="7"><li>浏览器的内核分别是什么?</li></ol><p>IE: trident 内核</p><p>Firefox：gecko 内核</p><p>Safari：webkit 内核</p><p>Opera：以前是 presto 内核，Opera 现已改用 Google Chrome 的 Blink 内核</p><p>Chrome：Blink(基于 webkit，Google 与 Opera Software 共同开发)</p><ol start="8"><li>什么叫优雅降级和渐进增强？</li></ol><p>渐进增强 progressive enhancement： 针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。</p><p>优雅降级 graceful degradation： 一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。</p><p>区别：</p><p>a. 优雅降级是从复杂的现状开始，并试图减少用户体验的供给</p><p>b. 渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要</p><p>c. 降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带</p><ol start="9"><li>sessionStorage 、localStorage 和 cookie 之间的区别</li></ol><p>共同点：用于浏览器端存储的缓存数据</p><p>不同点：</p><p>(1)、存储内容是否发送到服务器端：当设置了 Cookie 后，数据会发送到服务器端，造成一定的宽带浪费；</p><p>web storage,会将数据保存到本地，不会造成宽带浪费；</p><p>(2)、数据存储大小不同：Cookie 数据不能超过 4K,适用于会话标识；web storage 数据存储可以达到 5M;</p><p>(3)、数据存储的有效期限不同：cookie 只在设置了 Cookid 过期时间之前一直有效，即使关闭窗口或者浏览器；</p><p>sessionStorage,仅在关闭浏览器之前有效；localStorage,数据存储永久有效；</p><p>(4)、作用域不同：cookie 和 localStorage 是在同源同窗口中都是共享的；sessionStorage 不在不同的浏览器窗口中共享，即使是同一个页面；</p><ol start="10"><li>Web Storage 与 Cookie 相比存在的优势：</li></ol><p>(1)、存储空间更大：IE8 下每个独立的存储空间为 10M，其他浏览器实现略有不同，但都比 Cookie 要大很多。</p><p>(2)、存储内容不会发送到服务器：当设置了 Cookie 后，Cookie 的内容会随着请求一并发送的服务器，这对于本地存储的数据是一种带宽浪费。而 Web Storage 中的数据则仅仅是存在本地，不会与服务器发生任何交互。</p><p>(3)、更多丰富易用的接口：Web Storage 提供了一套更为丰富的接口，如 setItem,getItem,removeItem,clear 等,使得数据操作更为简便。cookie 需要自己封装。</p><p>(4)、独立的存储空间：每个域（包括子域）有独立的存储空间，各个存储空间是完全独立的，因此不会造成数据混乱。</p><ol start="11"><li>Ajax 的优缺点及工作原理？</li></ol><p>定义和用法:</p><p>AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。Ajax 是一种用于创建快速动态网页的技术。Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。</p><p>传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。</p><p>优点：</p><p>1.减轻服务器的负担,按需取数据,最大程度的减少冗余请求</p><p>2.局部刷新页面,减少用户心理和实际的等待时间,带来更好的用户体验</p><p>3.基于 xml 标准化,并被广泛支持,不需安装插件等,进一步促进页面和数据的分离</p><p>缺点：</p><p>1.AJAX 大量的使用了 javascript 和 ajax 引擎,这些取决于浏览器的支持.在编写的时候考虑对浏览器的兼容性.</p><p>2.AJAX 只是局部刷新,所以页面的后退按钮是没有用的.</p><p>3.对流媒体还有移动设备的支持不是太好等</p><p>AJAX 的工作原理：</p><p>1.创建 ajax 对象（XMLHttpRequest/ActiveXObject(Microsoft.XMLHttp)）</p><p>2.判断数据传输方式(GET/POST)</p><p>3.打开链接 open()</p><p>4.发送 send()</p><p>5.当 ajax 对象完成第四步（onreadystatechange）数据接收完成，判断 http 响应状态（status）200-300 之间或者 304（缓存）执行回调函数</p><ol start="12"><li>请指出 document load 和 document ready 的区别？</li></ol><p>共同点：这两种事件都代表的是页面文档加载时触发。</p><p>异同点：</p><p>ready 事件的触发，表示文档结构已经加载完成（不包含图片等非文字媒体文件）。</p><p>onload 事件的触发，表示页面包含图片等文件在内的所有元素都加载完成。</p><h2 id="正则表达式" tabindex="-1">正则表达式 <a class="header-anchor" href="#正则表达式" aria-label="Permalink to &quot;正则表达式&quot;">​</a></h2><ol><li>写一个 function，清除字符串前后的空格。（兼容所有浏览器）</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function trim(str) {</span></span>
<span class="line"><span>    if (str &amp;&amp; typeof str === &quot;string&quot;) {</span></span>
<span class="line"><span>        return str.replace(/(^\\s*)|(\\s*)$/g,&quot;&quot;); //去除前后空白符</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="2"><li>使用正则表达式验证邮箱格式</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> var reg = /^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w{2,3}){1,3})$/;</span></span>
<span class="line"><span> var email = &quot;example@qq.com&quot;;</span></span>
<span class="line"><span> console.log(reg.test(email));  // true</span></span></code></pre></div><h2 id="开发及性能优化" tabindex="-1">开发及性能优化 <a class="header-anchor" href="#开发及性能优化" aria-label="Permalink to &quot;开发及性能优化&quot;">​</a></h2><ol><li>规避 javascript 多人开发函数重名问题</li></ol><ul><li>命名空间</li><li>封闭空间</li><li>js 模块化 mvc（数据层、表现层、控制层）</li><li>seajs</li><li>变量转换成对象的属性</li><li>对象化</li></ul><ol start="2"><li>请说出三种减低页面加载时间的方法</li></ol><p>压缩 css、js 文件</p><p>合并 js、css 文件，减少 http 请求</p><p>外部 js、css 文件放在最底下</p><p>减少 dom 操作，尽可能用变量替代不必要的 dom 操作</p><ol start="3"><li>你所了解到的 Web 攻击技术</li></ol><p>（1）XSS（Cross-Site Scripting，跨站脚本攻击）：指通过存在安全漏洞的 Web 网站注册用户的浏览器内运行非法的 HTML 标签或者 JavaScript 进行的一种攻击。</p><p>（2）SQL 注入攻击</p><p>（3）CSRF（Cross-Site Request Forgeries，跨站点请求伪造）：指攻击者通过设置好的陷阱，强制对已完成的认证用户进行非预期的个人信息或设定信息等某些状态更新。</p><ol start="4"><li>web 前端开发，如何提高页面性能优化？</li></ol><p>内容方面：</p><p>(1). 减少 HTTP 请求 (Make Fewer HTTP Requests)</p><p>(2). 减少 DOM 元素数量 (Reduce the Number of DOM Elements)</p><p>(3). 使得 Ajax 可缓存 (Make Ajax Cacheable)</p><p>针对 CSS：</p><p>(1). 把 CSS 放到代码页上端 (Put Stylesheets at the Top)</p><p>(2). 从页面中剥离 JavaScript 与 CSS (Make JavaScript and CSS External)</p><p>(3). 精简 JavaScript 与 CSS (Minify JavaScript and CSS)</p><p>(4). 避免 CSS 表达式 (Avoid CSS Expressions)</p><p>针对 JavaScript ：</p><p>(1). 脚本放到 HTML 代码页底部 (Put Scripts at the Bottom)</p><p>(2). 从页面中剥离 JavaScript 与 CSS (Make JavaScript and CSS External)</p><p>(3). 精简 JavaScript 与 CSS (Minify JavaScript and CSS)</p><p>(4). 移除重复脚本 (Remove Duplicate Scripts)</p><p>面向图片(Image)：</p><p>(1). 优化图片</p><p>(2). 不要在 HTML 中使用缩放图片</p><p>(3). 使用恰当的图片格式</p><p>(4). 使用 CSS Sprites 技巧对图片优化</p><ol start="5"><li>前端开发中，如何优化图像？图像格式的区别？</li></ol><p>优化图像：</p><p>1、不用图片，尽量用 css3 代替。 比如说要实现修饰效果，如半透明、边框、圆角、阴影、渐变等，在当前主流浏览器中都可以用 CSS 达成。</p><p>2、 使用矢量图 SVG 替代位图。对于绝大多数图案、图标等，矢量图更小，且可缩放而无需生成多套图。现在主流浏览器都支持 SVG 了，所以可放心使用！</p><p>3.、使用恰当的图片格式。我们常见的图片格式有 JPEG、GIF、PNG。</p><p>基本上，内容图片多为照片之类的，适用于 JPEG。</p><p>而修饰图片通常更适合用无损压缩的 PNG。</p><p>GIF 基本上除了 GIF 动画外不要使用。且动画的话，也更建议用 video 元素和视频格式，或用 SVG 动画取代。</p><p>4、按照 HTTP 协议设置合理的缓存。</p><p>5、使用字体图标 webfont、CSS Sprites 等。</p><p>6、用 CSS 或 JavaScript 实现预加载。</p><p>7、WebP 图片格式能给前端带来的优化。WebP 支持无损、有损压缩，动态、静态图片，压缩比率优于 GIF、JPEG、JPEG2000、PG 等格式，非常适合用于网络等图片传输。</p><p>图像格式的区别：</p><p>矢量图：图标字体，如 font-awesome；svg</p><p>位图：gif,jpg(jpeg),png</p><p>区别：</p><p>1、gif:是是一种无损，8 位图片格式。具有支持动画，索引透明，压缩等特性。适用于做色彩简单(色调少)的图片，如 logo,各种小图标 icons 等。</p><p>2、JPEG 格式是一种大小与质量相平衡的压缩图片格式。适用于允许轻微失真的色彩丰富的照片，不适合做色彩简单(色调少)的图片，如 logo,各种小图标 icons 等。</p><p>3、png:PNG 可以细分为三种格式:PNG8，PNG24，PNG32。后面的数字代表这种 PNG 格式最多可以索引和存储的颜色值。</p><p>关于透明：PNG8 支持索引透明和 alpha 透明;PNG24 不支持透明;而 PNG32 在 24 位的 PNG 基础上增加了 8 位（256 阶）的 alpha 通道透明;</p><p>优缺点：</p><p>1、能在保证最不失真的情况下尽可能压缩图像文件的大小。</p><p>2、对于需要高保真的较复杂的图像，PNG 虽然能无损压缩，但图片文件较大，不适合应用在 Web 页面上。</p><ol start="6"><li>浏览器是如何渲染页面的？</li></ol><p>渲染的流程如下：</p><p>1.解析 HTML 文件，创建 DOM 树。</p><p>自上而下，遇到任何样式（link、style）与脚本（script）都会阻塞（外部样式不阻塞后续外部脚本的加载）。</p><p>2.解析 CSS。优先级：浏览器默认设置&lt;用户设置&lt;外部样式&lt;内联样式&lt;HTML 中的 style 样式；</p><p>3.将 CSS 与 DOM 合并，构建渲染树（Render Tree）</p><p>4.布局和绘制，重绘（repaint）和重排（reflow）</p><p>转：<a href="https://www.cnblogs.com/wdlhao/p/8290436.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/wdlhao/p/8290436.html</a></p>`,386)])])}const g=s(l,[["render",i]]);export{h as __pageData,g as default};
