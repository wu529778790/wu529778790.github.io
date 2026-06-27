import{_ as e,o as t,c as a,a2 as o}from"./chunks/framework.m9rfQn3T.js";const m=JSON.parse('{"title":"js判断移动端是否安装app，若安装，则打开，未安装则跳转到下载页面","description":"","frontmatter":{"title":"js判断移动端是否安装app，若安装，则打开，未安装则跳转到下载页面","date":"2017-06-06T16:06:21.000Z","permalink":"/pages/1bf7e8/","categories":["hexo迁移数据"],"author":{"name":"神族九帝","link":"https://github.com/wu529778790","permalink":null,"categories":null},"sidebar":"auto","tags":[null]},"headers":[],"relativePath":"20.笔记/1000.hexo迁移数据/js判断移动端是否安装app，若安装，则打开，未安装则跳转到下载页面.md","filePath":"20.笔记/1000.hexo迁移数据/js判断移动端是否安装app，若安装，则打开，未安装则跳转到下载页面.md","lastUpdated":1782538095000}'),i={name:"20.笔记/1000.hexo迁移数据/js判断移动端是否安装app，若安装，则打开，未安装则跳转到下载页面.md"};function r(c,n,p,l,s,d){return t(),a("div",null,[...n[0]||(n[0]=[o(`<p>近期公司需要针对分享流程进行优化，其中一点就是前端 H5 检测是否安装应用，来进行不同的判断（下载或直接跳转到 app 中）。原理很简单：创建一个 iframe 去打开 uri。如果打开 app 成功网页进入后台，再切换回来时间会超过 2.5s。利用时间去检测。下面来看具体实现过程：</p><p>&lt;!--more--&gt;</p><h2 id="你可能会遇到的问题" tabindex="-1">你可能会遇到的问题 <a class="header-anchor" href="#你可能会遇到的问题" aria-label="Permalink to &quot;你可能会遇到的问题&quot;">​</a></h2><ul><li>什么是 uri，获取 uri 需要哪些帮助？</li><li>安卓中应用切换到后台， 计时器仍会不断运行有什么解决方法？</li><li>微信中不支持第三方 uri,下载应用。怎么解决来完成跳转到自身 app。</li></ul><h2 id="uri-获取" tabindex="-1">uri 获取 <a class="header-anchor" href="#uri-获取" aria-label="Permalink to &quot;uri 获取&quot;">​</a></h2><p>这里的 uri,指得就是通过 Url scheme 来实现的 H5 与安卓、苹果应用之间的跳转链接。</p><p>我们需要找到客户端的同事，来获取如下格式的链接。</p><pre><code>xx://&#39;跳转页面&#39;/&#39;携带参数&#39;
</code></pre><p>url 就是我们平常理解的链接。 scheme 是指 url 链接中的最初位置，就是上边链接中 ‘xx’的位置。 详细介绍可以看这里：<a href="https://sspai.com/post/31500" target="_blank" rel="noreferrer">https://sspai.com/post/31500</a></p><p>用这个链接我们可以跳转到 应用中的某个页面,并可以携带一定的参数。这个是我们实现这个功能的前提哟。</p><h2 id="具体实现" tabindex="-1">具体实现 <a class="header-anchor" href="#具体实现" aria-label="Permalink to &quot;具体实现&quot;">​</a></h2><h3 id="第一步-通过-iframe-打开-app" tabindex="-1">第一步：通过 iframe 打开 App <a class="header-anchor" href="#第一步-通过-iframe-打开-app" aria-label="Permalink to &quot;第一步：通过 iframe 打开 App&quot;">​</a></h3><pre><code>Android平台则各个app厂商差异很大，比如Chrome从25及以后就不再支持通过js触发（非用户点击），所以这里使用iframe src地址等来触发scheme。

//在iframe 中打开APP
var ifr = document.createElement(&#39;iframe&#39;);
ifr.src = openUrl;
ifr.style.display = &#39;none&#39;;
</code></pre><h3 id="第二步-判断是否安装某应用" tabindex="-1">第二步：判断是否安装某应用 <a class="header-anchor" href="#第二步-判断是否安装某应用" aria-label="Permalink to &quot;第二步：判断是否安装某应用&quot;">​</a></h3><pre><code>原理：若通过url scheme 打开app成功，那么当前h5会进入后台，通过计时器会有明显延迟。利用时间来判断。

//检查app是否打开
function checkOpen(cb){
    var _clickTime = +(new Date());
    function check(elsTime) {
        if ( elsTime &gt; 3000 || document.hidden || document.webkitHidden) {
            cb(1);
        } else {
            cb(0);
        }
    }
    //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
    var _count = 0, intHandle;
    intHandle = setInterval(function(){
        _count++;
        var elsTime = +(new Date()) - _clickTime;
        if (_count&gt;=100 || elsTime &gt; 3000 ) {
            clearInterval(intHandle);
            check(elsTime);
        }
    }, 20);
}
</code></pre><p>注意： _由于安卓手机,页面进入后台，定时器 setTimeout 仍会不断运行，所以这里使用 setInterval,较小间隔时间重复多次。来根据累计时间判断 _ cb 为回调函数，根据返回 0 or 1 来判断是否安装。 * document.hidden 对大于 4.4webview 支持很好，为页面可见性 api。</p><h3 id="第三步-微信中实现打开-or-下载应用效果" tabindex="-1">第三步：微信中实现打开 or 下载应用效果 <a class="header-anchor" href="#第三步-微信中实现打开-or-下载应用效果" aria-label="Permalink to &quot;第三步：微信中实现打开 or 下载应用效果&quot;">​</a></h3><pre><code>这里使用的是应用宝微链接实现。

if (callback) {
  //客户端检测微信直接跳应用宝链接
  var browser = BrowserInfo();
  //使用微链接
  var encodeUri = encodeURIComponent(&#39;你的uri&#39;);

  if (browser.isWeixin) {
    window.location.href = &#39;你的微链url&amp;android_schema=&#39;+encodeUri;

  }else{
    checkOpen(function(opened){
        callback &amp;&amp; callback(opened);
    });

  }
}
</code></pre><p>注意点： _微链接是应用宝提供的，可以在后台获取。 _ 使用微链接必须做 encodeURIComponent 转义。 * 链接地址在微链接后拼接一个 android_schema 参数加你的 uri。</p><p>完整函数：</p><pre><code>export const openApp = function(openUrl, callback) {
    //检查app是否打开
    function checkOpen(cb){
        var _clickTime = +(new Date());
        function check(elsTime) {
            if ( elsTime &gt; 3000 || document.hidden || document.webkitHidden) {
                cb(1);
            } else {
                cb(0);
            }
        }
        //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
        var _count = 0, intHandle;
        intHandle = setInterval(function(){
            _count++;
            var elsTime = +(new Date()) - _clickTime;
            if (_count&gt;=100 || elsTime &gt; 3000 ) {
                clearInterval(intHandle);
                check(elsTime);
            }
        }, 20);
    }

    //在iframe 中打开APP
    var ifr = document.createElement(&#39;iframe&#39;);
    ifr.src = openUrl;
    ifr.style.display = &#39;none&#39;;

    if (callback) {
      //客户端检测微信直接跳应用宝链接
      var browser = BrowserInfo();
      //使用微链接
      var encodeUri = encodeURIComponent(openUrl);

      if (browser.isWeixin) {
        window.location.href = &#39;你的微链url&amp;android_schema=&#39;+encodeUri;
      }else{
        checkOpen(function(opened){
            callback &amp;&amp; callback(opened);
        });

      }
    }

    document.body.appendChild(ifr);
    setTimeout(function() {
        document.body.removeChild(ifr);
    }, 2000);

}
</code></pre><p>其他： 函数中调用的 BrowserInfo 是一个简单的客户端检测。具体如下：</p><pre><code>/**
 * 客户端检测
 */
export const BrowserInfo = function() {
  var json = {
    userAgent: navigator.userAgent.toLowerCase(),
    isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
    isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
    isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
    isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
  }

  return json;
}
</code></pre><p>回调函数的使用：</p><pre><code>页面中可以通过传递回调函数，来获取返回值；并通过是否传这个参数来做进入页面检测。









&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;initial-scale=1.0,user-scalable=no&quot;&gt;
    &lt;title&gt;Js判定移动端是否安装app,若已安装，则打开，未安装则跳转到下载页面&lt;/title&gt;
    &lt;meta name=&#39;apple-itunes-app&#39; content=&#39;app-id=1221201728&#39;&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;a href=&quot;javascript:;&quot; id=&quot;openApp&quot;&gt;点击打开安装app&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    document.getElementById(&#39;openApp&#39;).onclick = function(e){

        if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))
           {
            window.location.href = &quot;com.baidu.tieba://&quot;;//ios app协议(如：com.baidu.tieba://)
            window.setTimeout(function() {
                window.location.href = &quot;https://itunes.apple.com/cn/app/id477927812&quot;; //跳转到App store
            }, 2000)
           }
        if(navigator.userAgent.match(/android/i))
        {
            window.location.href = &quot;com.baidu.tieba://app&quot;;//android app协议(如：com.baidu.tieba://app)
            window.setTimeout(function() {
                window.location.href = &quot;https://****.apk&quot;;//android 下载地址
            }, 2000)
        }
    };
&lt;/script&gt;
</code></pre>`,25)])])}const h=e(i,[["render",r]]);export{m as __pageData,h as default};
