---
title: jsonp的一点笔记
date: 2021-06-05 16:06:21
permalink: /pages/7505b8/
categories: 
  - 旧数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
---
title: jsonp的一点笔记
date: 2017-05-20 16:55:32
tags: jsonp
---

  总有些东西不清不楚，总有些只是不够系统。今天你的不努力，导致明天你的后悔不已！

<!--more-->

## 同源策略  
同源策略(Same origin policy)，它是由Netscape提出的一个著名的安全策略。现在所有支持JavaScript的浏览器都会使用这个策略。所谓同源是指，域名，协议，端口相同。[2] 同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。[3]

如果非同源，共有三种行为受到限制:  
1. Cookie、LocalStorage 和 IndexDB 无法读取。
2. DOM 无法获得。
3. AJAX请求不能发送。  
## AJAX  
Asynchronous JavaScript and XML (Ajax) Ajax 允许在不干扰 Web 应用程序的显示和行为的情况下在后台进行数据检索。使用 XMLHttpRequest 函数获取数据，它是一种 API，允许客户端 JavaScript 通过 HTTP 连接到远程服务器。用JSON来传数据，靠JSONP来跨域。  
## JSON  
(JavaScript Object Notation) 是一种轻量级的数据交换格式。JSON 依赖于 JavaScript 开发人员，因为它是 JavaScript 对象的字符串表示。例如，假设有一个含两个属性的 ticker 对象：symbol 和 price。这是在 JavaScript 中定义 ticker 对象的方式：  
  var ticker = {symbol: 'IBM', price: 91.42};  
并且这是它的 JSON 表示方式：  
  {symbol: 'IBM', price: 91.42}  
  有关 JSON 和将其作为数据内部交换格式的信息。清单 1 定义了一个 JavaScript 函数，调用该函数时会显示 IBM 的股价。

  清单 1. 定义 showPrice 函数  
  function showPrice(data) {
    alert("Symbol: " + data.symbol + ", Price: " + data.price);
  }  
可以将 JSON 数据作为参数传递，以调用该函数：  
  showPrice({symbol: 'IBM', price: 91.42}); // alerts: Symbol: IBM, Price: 91.42    
现在准备将这两个步骤包含到 Web 页面，如清单 2 所示。清单 2. 在 Web 页面中包含 showPrice 函数和参数  
  <script type="text/javascript">
  function showPrice(data) {
    alert("Symbol: " + data.symbol + ", Price: " + data.price);
  }
  </script>
  <script type="text/javascript">showPrice({symbol: 'IBM', price: 91.42});</script>
至此，本文已展示了如何将静态 JSON 数据作为参数调用 JavaScript 函数。不过，通过在函数调用中动态包装 JSON 数据可以用动态数据调用函数，这是一种动态 JavaScript 插入的技术。要查看其效果，将下面一行放入名为 ticker.js 的独立 JavaScript 文件中。  
  showPrice({symbol: 'IBM', price: 91.42});  
现在改变 Web 页面中的脚本，使其和清单 3 一样。清单 3. 动态 JavaScript 插入代码  
  <script type="text/javascript">
  // This is our function to be called with JSON data
  function showPrice(data) {
      alert("Symbol: " + data.symbol + ", Price: " + data.price);
  }
  var url = “ticker.js”; // URL of the external script
  // this shows dynamic script insertion
  var script = document.createElement('script');
  script.setAttribute('src', url);

  // load the script
  document.getElementsByTagName('head')[0].appendChild(script);
  </script>  
在清单 3 所示的例子中，动态插入的 JavaScript 代码位于 ticker.js 文件中，它将真正的 JSON 数据作为参数调用 showPrice()函数。
前面已经提到，同源策略不阻止将动态脚本元素插入文档中。也就是说，可以动态插入来自不同域的 JavaScript，并且这些域都携带 JSON 数据。这其实是真正的 JSONP（JSON with Padding）：打包在函数调用中的 JSON 数据。注意，为了完成该操作，Web 页面必须在插入时具有已经定义好的回调函数，也就是我们例子中的 showPrice()。
不过，所谓的 JSONP 服务（或 Remote JSON Service）是一种带有附加功能的 Web 服务，该功能支持在特定于用户的函数调用中打包返回的 JSON 数据。这种方法依赖于接受回调函数名作为请求参数的远程服务。然后该服务生成对该函数的调用，将 JSON 数据作为参数传递，在到达客户端时将其插入 Web 页面并开始执行。  

## JSONP  
是JSON with Padding的略称。它是一个非官方的跨域数据交互协议协议，它允许在服务器端集成Script tags返回至客户端，通过javascript callback的形式实现跨域访问（这仅仅是JSONP简单的实现形式）  
## JSONP是怎样产生的  
通俗的阐释：

1、一个众所周知的问题，Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准；

2、不过我们又发现，Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有"src"这个属性的标签都拥有跨域的能力，比如<script>、<img>、<iframe>）；

3、于是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、属于未来的HTML5之Websocket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理；

4、恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据；

5、这样子解决方案就呼之欲出了，web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。

6、客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。

7、为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了  

JSONP是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。

在“跨域”的问题上，我们发现src 属性并没有受到相关的限制，比如 img / script 等。  

JSONP的基本思想是，网页通过添加一个<script>标签，设置这个script标签的src属性用于向服务器请求JSON数据 ，src属性的查询字符串一定要加一个callback函数，用来指定回调函数的名字 。而这个函数是在资源加载之前就已经在前端定义好的，这个函数接受一个参数并利用这个参数做一些事情。向服务器请求后，服务器会将JSON数据放在一个指定名字的回调函数里作为其参数传回来。这时，因为函数已经在前端定义好了，所以会直接调用。  

首先，网页动态插入<script>元素，由它向跨源网址发出请求。   

  function addScriptTag(src) {
    var script = document.createElement('script');
    script.setAttribute("type","text/javascript");
    script.src = src;
    document.body.appendChild(script);
  }

  window.onload = function () {
    addScriptTag('http://example.com/ip?callback=foo');//请求服务器数据并规定回调函数为foo
  }

  function foo(data) {
    console.log('Your public IP address is: ' + data.ip);
  };   
上面代码通过动态添加<script>元素，向服务器example.com发出请求。注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的。
服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。  

  foo({
  "ip": "8.8.8.8"
  });  

由于<script>元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了foo函数，该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用JSON.parse的步骤。  
## Jquery对JSONP的实现  
jQuery 拥有对 JSONP 回调的本地支持。如果指定了 JSONP 回调，就可以加载位于另一个域的 JSON 数据，回调的语法为：url?callback=?。
jQuery 自动将 ? 替换为要调用的生成函数名。清单 4 显示了该代码。
清单 4. 使用 JSONP 回调  
  jQuery.getJSON(url+"&callback=?", function(data) {
      alert("Symbol: " + data.symbol + ", Price: " + data.price);
  });  
为此，jQuery 将一个全局函数附加到插入脚本时需要调用的窗口对象。另外，jQuery 也能优化非跨域调用。如果向同一个域发出请求，jQuery 就将其转化为普通 Ajax 请求。  
jQuery框架也当然支持JSONP，可以使用$.getJSON(url,[data],[callback])方法。  
http://api.jquery.com/jQuery.getJSON/  
要注意的是在url的后面必须添加一个callback参数，这样getJSON方法才会知道是用JSONP方式去访问服务，callback后面的那个问号是内部自动生成的一个回调函数名。  

## 使用JSONP支持的示例服务  
在上一个例子中，使用了静态文件（ticker.js）将 JavaScript 动态插入到 Web 页面中。尽管返回了 JSONP 回复，但它不允许您在 URL 中定义回调函数名。这不是 JSONP 服务。因此，如何才能将其转换为真正的 JSONP 服务呢？可使用的方法很多。这里我们将分别使用 PHP 和 Java 展示两个示例。首先，假设您的服务在所请求的 URL 中接受了一个名为 callback 的参数。（参数名不重要，但是客户和服务器必须都同 意该名称）。另外假设向服务发送的请求是这样的：  
  http://www.yourdomain.com/jsonp/ticker?symbol=IBM&callback=showPrice
在这种情况下，symbol 是表示请求 ticker symbol 的请求参数，而 callback 是 Web 应用程序的回调函数的名称。使用清单 5 所示的代码可以通过 jQuery 的 JSONP 支持调用该服务。清单 5. 调用回调服务  
  jQuery.getJSON("http://www.yourdomain.com/jsonp/ticker?symbol=IBM&callback=?",
  function(data) {
      alert("Symbol: " + data.symbol + ", Price: " + data.price);
  });  
注意，我们使用 ? 作为回调函数名，而非真实的函数名。因为 jQuery 会用生成的函数名替换 ?。所以您不用定义类似于 showPrice() 的函数。  
## 现成的 JSONP 服务  
Digg API：来自 Digg 的头条新闻：

  http://services.digg.com/stories/top?appkey=http%3A%2F%2Fmashup.com&type=javascript
  &callback=?
Geonames API：邮编的位置信息：

  http://www.geonames.org/postalCodeLookupJSON?postalcode=10504&country=US&callback=?
Flickr API：来自 Flickr 的最新猫图片：

  http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any
  &format=json&jsoncallback=?  
## 使用$.ajax方法来实现  
http://api.jquery.com/jQuery.ajax  
## CORS  
(Cross-Origin Resource Sharing ) 跨来源资源共享（CORS）是一份浏览器技术的规范，提供了 Web 服务从不同网域传来沙盒脚本的方法，以避开浏览器的同源策略，是 JSONP 模式的现代版。与 JSONP 只能发GET要求不同，CORS 允许任何类型请求。用 CORS 可以让网页设计师用一般的 XMLHttpRequest，这种方式的错误处理比 JSONP 要来的好。另一方面，JSONP 可以在不支持 CORS 的老旧浏览器上运作。现代的浏览器都支持 CORS。  

1.http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
2.baidu
3.MDN
4.wiki
5.https://www.ibm.com/developerworks/cn/web/wa-aj-jsonp1/
6.http://www.cnblogs.com/dowinning/archive/2012/04/19/json-jsonp-jquery.html
7.https://segmentfault.com/a/1190000009844037#articleHeader0
