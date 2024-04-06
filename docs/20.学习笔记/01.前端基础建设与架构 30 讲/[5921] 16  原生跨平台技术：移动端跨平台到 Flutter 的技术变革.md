<p data-nodeid="185601" class="">跨平台其实是一个老生常谈的话题，技术方案也是历经变迁，但始终热点不断，究其原因有二：</p>
<ul data-nodeid="185602">
<li data-nodeid="185603">
<p data-nodeid="185604">首先，移动端原生技术需要配备 iOS 和 Android 两套团队和技术栈，且存在<strong data-nodeid="185720">发版周期限制</strong>，开发效率上存在天然缺陷；</p>
</li>
<li data-nodeid="185605">
<p data-nodeid="185606">其次，原生跨平台技术虽然“出道”较早，但是各方案都难以做到完美，因此也<strong data-nodeid="185726">没有大一统的技术垄断</strong>。</p>
</li>
</ul>
<p data-nodeid="185607">这一讲我们就从历史角度出发，剖析原生跨平台技术的原理，同时梳理相关技术热点，和你聊一聊 Flutter 背后的技术变革。</p>
<h3 data-nodeid="185608">移动端跨平台技术原理和变迁</h3>
<p data-nodeid="185609">移动端跨平台是一个美好的愿景。我们先来看一下移动端跨平台技术发展的时间线：</p>
<p data-nodeid="186015" class=""><img src="https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK5OADuyQAAIWqX8rFbk913.png" alt="Lark20210202-183723.png" data-nodeid="186018"></p>

<h4 data-nodeid="185611">基于 WebView 到 JSBridge 的 Hybrid 方案发展</h4>
<p data-nodeid="185612">最早的实践就是通过 WebView 双端运行 Web 代码。事实上，虽然 iOS 和 Android 系统难以统一，但是它们都对 Web 技术开放，于是有的人开玩笑：“不管是 Mac、Windows、Linux、iOS、Android 还是其他平台，只要给一个浏览器，连‘月球’上它都能跑。”因此，<strong data-nodeid="185743">Hybrid 方案</strong>算是最古老，但也是<strong data-nodeid="185744">最成熟、应用最为广泛</strong>的技术。</p>
<p data-nodeid="185613">在 iOS 和 Android 系统上运行 JavaScript 并不是一件难事儿，但是对于一个真正意义上的跨平台应用来说，还需要做到<strong data-nodeid="185750">H5（即 WebView 容器）和原生平台的交互</strong>，于是 JSBridge 技术就诞生了。</p>
<p data-nodeid="185614">JSBridge 原理很简单，我们知道，在原生平台中，JavaScript 代码是运行在一个单独的 JS Context 中（比如 WebView 的 WebKit 引擎、JavaSriptCore 等），这个独立的上下文和原生能力的交互过程是双向的，我们可以从两个方面简要分析。</p>
<ol data-nodeid="185615">
<li data-nodeid="185616">
<p data-nodeid="185617">JavaScript 调用 Native，方法有：</p>
<ul data-nodeid="185618">
<li data-nodeid="185619">
<p data-nodeid="185620">注入 APIs；</p>
</li>
<li data-nodeid="185621">
<p data-nodeid="185622">拦截 URL Scheme。</p>
</li>
</ul>
</li>
<li data-nodeid="185623">
<p data-nodeid="185624">Native 调用 JavaScript。</p>
</li>
</ol>
<p data-nodeid="185625">前端调用原生能力主要有两种方式，注入 APIs 其实就是原生平台通过 WebView 提供的接口，向 JavaScript Context 中（一般使用 Window 对象），注入相关方案和数据；另一种拦截 URL Scheme 就更加简单了，前端通过发送定义好的 URL Scheme 请求，并将相关数据放在请求体中，该请求被原生平台拦截后，由原生平台做出响应。</p>
<p data-nodeid="185626">Native 调用 JavaScript，实现起来也很简单。因为 Native 实际上是 WebView 的宿主，因此 Native 具有更大权限，故而<strong data-nodeid="185762">原生平台可以通过 WebView APIs 直接执行 JavaScript 代码</strong>。</p>
<p data-nodeid="185627">随着 JSBridge 这种方式实现跨平台技术的成熟，社区上出现了 Cordova、Ionic 等框架，它们<strong data-nodeid="185768">本质上都是使用 HTML、CSS 和 JavaScript 进行跨平台原生应用的开发</strong>。该方案说到底是在 iOS 和 Androd 上运行 Web 应用，因此也存在较多问题，比如：</p>
<ul data-nodeid="185628">
<li data-nodeid="185629">
<p data-nodeid="185630">JavaScript Context 和原生通信频繁，导致性能体验较差；</p>
</li>
<li data-nodeid="185631">
<p data-nodeid="185632">页面逻辑由前端负责，组件也是前端渲染，也造成了性能短板；</p>
</li>
<li data-nodeid="185633">
<p data-nodeid="185634">运行 JavaScript 的 WebView 内核在各平台上不统一；</p>
</li>
<li data-nodeid="185635">
<p data-nodeid="185636">国内厂商对于系统的深度定制，导致内核碎片化。</p>
</li>
</ul>
<p data-nodeid="185637">因此，新一代的 Hybrid 跨平台方式，以<strong data-nodeid="185782">React Native 为代表</strong>的方案就诞生了，这种方案主要思想是：开发者依然<strong data-nodeid="185783">使用 Web 语言（如 React 框架或其他 DSL），但渲染基本交给原生平台处理。</strong> 这样一来，在视图层面就可以摆脱 WebView 的束缚，保障了开发体验和效率，以及使用性能。我把这种技术叫作基于 OEM 的 Hybrid 方案。</p>
<p data-nodeid="185638">React Native 脱胎于 React 理念，它将数据与视图相隔离，<strong data-nodeid="185789">React Native 代码中的标签映射为虚拟节点，由原生平台解析虚拟节点并渲染出原生组件</strong>。美好的愿景是：开发者使用 React 语法，同时开发原生应用和 Web 应用，其中组件渲染、动画效果、网络请求等都由原生平台来负责。整体技术架构如下图：</p>
<p data-nodeid="186847" class=""><img src="https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK5-ASl0rAAMYrAXB4Po374.png" alt="Lark20210202-183726.png" data-nodeid="186851"></p>
<div data-nodeid="186848"><p style="text-align:center">React Native 技术架构图</p></div>


<p data-nodeid="185641">如上图，React Native 主要由：</p>
<ul data-nodeid="185642">
<li data-nodeid="185643">
<p data-nodeid="185644">JavaScript</p>
</li>
<li data-nodeid="185645">
<p data-nodeid="185646">C++ 适配层</p>
</li>
<li data-nodeid="185647">
<p data-nodeid="185648">iOS/Androd</p>
</li>
</ul>
<p data-nodeid="185649">三层组成，最重要的<strong data-nodeid="185810">C++ 层实现了动态链接库</strong>，起到了衔接适配前端和原生平台作用，这个衔接具体指：使用 JavaScriptCore 解析 JavaScript 代码（iOS 上不允许用自己的 JS Engine，iOS 7+ 默认使用 JavaScriptCore，Android 也默认使用 JavaScriptCore），通过 <a href="https://github.com/facebook/react-native/blob/master/Libraries/BatchedBridge/MessageQueue.js" data-nodeid="185804">MessageQueue.js</a> 实现双向通信，<strong data-nodeid="185811">实际上通信格式类似 JSON-RPC</strong>。</p>
<p data-nodeid="185650">这里我们以一个从 JavaScript 传递数据给原生平台 <a href="https://github.com/facebook/react-native/blob/master/ReactAndroid/src/main/java/com/facebook/react/uimanager/UIManagerModule.java" data-nodeid="185815">UIManager</a> 更新页面视图为例，了解下数据信息内容：</p>
<pre class="lang-java" data-nodeid="185651"><code data-language="java"><span class="hljs-number">2584</span> I ReactNativeJS: Running application <span class="hljs-string">"MoviesApp"</span> with appParams: {<span class="hljs-string">"initialProps"</span>:{},<span class="hljs-string">"rootTag"</span>:<span class="hljs-number">1</span>}. __DEV__ === <span class="hljs-keyword">false</span>, development-level warning are OFF, performance optimizations are ON
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">4</span>,<span class="hljs-string">"RCTView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"flex"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"overflow"</span>:<span class="hljs-string">"hidden"</span>,<span class="hljs-string">"backgroundColor"</span>:-<span class="hljs-number">1</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">5</span>,<span class="hljs-string">"RCTView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"flex"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"backgroundColor"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"overflow"</span>:<span class="hljs-string">"hidden"</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">6</span>,<span class="hljs-string">"RCTView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"pointerEvents"</span>:<span class="hljs-string">"auto"</span>,<span class="hljs-string">"position"</span>:<span class="hljs-string">"absolute"</span>,<span class="hljs-string">"overflow"</span>:<span class="hljs-string">"hidden"</span>,<span class="hljs-string">"left"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"right"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"bottom"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"top"</span>:<span class="hljs-number">0</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">7</span>,<span class="hljs-string">"RCTView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"flex"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"backgroundColor"</span>:-<span class="hljs-number">1</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">8</span>,<span class="hljs-string">"RCTView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"flexDirection"</span>:<span class="hljs-string">"row"</span>,<span class="hljs-string">"alignItems"</span>:<span class="hljs-string">"center"</span>,<span class="hljs-string">"backgroundColor"</span>:-<span class="hljs-number">5658199</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">56</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">9</span>,<span class="hljs-string">"RCTView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"nativeBackgroundAndroid"</span>:{<span class="hljs-string">"type"</span>:<span class="hljs-string">"ThemeAttrAndroid"</span>,<span class="hljs-string">"attribute"</span>:<span class="hljs-string">"selectableItemBackgroundBorderless"</span>},<span class="hljs-string">"accessible"</span>:<span class="hljs-keyword">true</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">10</span>,<span class="hljs-string">"RCTImageView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"width"</span>:<span class="hljs-number">24</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">24</span>,<span class="hljs-string">"overflow"</span>:<span class="hljs-string">"hidden"</span>,<span class="hljs-string">"marginHorizontal"</span>:<span class="hljs-number">8</span>,<span class="hljs-string">"shouldNotifyLoadEvents"</span>:<span class="hljs-keyword">false</span>,<span class="hljs-string">"src"</span>:[{<span class="hljs-string">"uri"</span>:<span class="hljs-string">"android_search_white"</span>}],<span class="hljs-string">"loadingIndicatorSrc"</span>:<span class="hljs-keyword">null</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">9</span>,[<span class="hljs-number">10</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">12</span>,<span class="hljs-string">"AndroidTextInput"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"autoCapitalize"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"autoCorrect"</span>:<span class="hljs-keyword">false</span>,<span class="hljs-string">"placeholder"</span>:<span class="hljs-string">"Search a movie..."</span>,<span class="hljs-string">"placeholderTextColor"</span>:-<span class="hljs-number">2130706433</span>,<span class="hljs-string">"flex"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"fontSize"</span>:<span class="hljs-number">20</span>,<span class="hljs-string">"fontWeight"</span>:<span class="hljs-string">"bold"</span>,<span class="hljs-string">"color"</span>:-<span class="hljs-number">1</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">50</span>,<span class="hljs-string">"padding"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"backgroundColor"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"mostRecentEventCount"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"onSelectionChange"</span>:<span class="hljs-keyword">true</span>,<span class="hljs-string">"text"</span>:<span class="hljs-string">""</span>,<span class="hljs-string">"accessible"</span>:<span class="hljs-keyword">true</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">13</span>,<span class="hljs-string">"RCTView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"alignItems"</span>:<span class="hljs-string">"center"</span>,<span class="hljs-string">"justifyContent"</span>:<span class="hljs-string">"center"</span>,<span class="hljs-string">"width"</span>:<span class="hljs-number">30</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">30</span>,<span class="hljs-string">"marginRight"</span>:<span class="hljs-number">16</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">14</span>,<span class="hljs-string">"AndroidProgressBar"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"animating"</span>:<span class="hljs-keyword">false</span>,<span class="hljs-string">"color"</span>:-<span class="hljs-number">1</span>,<span class="hljs-string">"width"</span>:<span class="hljs-number">36</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">36</span>,<span class="hljs-string">"styleAttr"</span>:<span class="hljs-string">"Normal"</span>,<span class="hljs-string">"indeterminate"</span>:<span class="hljs-keyword">true</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">13</span>,[<span class="hljs-number">14</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">8</span>,[<span class="hljs-number">9</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">15</span>,<span class="hljs-string">"RCTView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"height"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"backgroundColor"</span>:-<span class="hljs-number">1118482</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">16</span>,<span class="hljs-string">"RCTView"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"flex"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"backgroundColor"</span>:-<span class="hljs-number">1</span>,<span class="hljs-string">"alignItems"</span>:<span class="hljs-string">"center"</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">17</span>,<span class="hljs-string">"RCTText"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"marginTop"</span>:<span class="hljs-number">80</span>,<span class="hljs-string">"color"</span>:-<span class="hljs-number">7829368</span>,<span class="hljs-string">"accessible"</span>:<span class="hljs-keyword">true</span>,<span class="hljs-string">"allowFontScaling"</span>:<span class="hljs-keyword">true</span>,<span class="hljs-string">"ellipsizeMode"</span>:<span class="hljs-string">"tail"</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.createView([<span class="hljs-number">18</span>,<span class="hljs-string">"RCTRawText"</span>,<span class="hljs-number">1</span>,{<span class="hljs-string">"text"</span>:<span class="hljs-string">"No movies found"</span>}])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">17</span>,[<span class="hljs-number">18</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">16</span>,[<span class="hljs-number">17</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">7</span>,[<span class="hljs-number">8</span>,<span class="hljs-number">15</span>,<span class="hljs-number">16</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">6</span>,[<span class="hljs-number">7</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">5</span>,[<span class="hljs-number">6</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">4</span>,[<span class="hljs-number">5</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">3</span>,[<span class="hljs-number">4</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">2</span>,[<span class="hljs-number">3</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setChildren([<span class="hljs-number">1</span>,[<span class="hljs-number">2</span>]])
</code></pre>
<p data-nodeid="185652">下面数据是一个 touch 交互信息，JavaScriptCore 传递用户 touch 信息给原生平台：</p>
<pre class="lang-java" data-nodeid="185653"><code data-language="java"><span class="hljs-number">2584</span> I ReactNativeJS: N-&gt;JS : RCTEventEmitter.receiveTouches([<span class="hljs-string">"topTouchStart"</span>,[{<span class="hljs-string">"identifier"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"locationY"</span>:<span class="hljs-number">47.9301872253418</span>,<span class="hljs-string">"locationX"</span>:<span class="hljs-number">170.43936157226562</span>,<span class="hljs-string">"pageY"</span>:<span class="hljs-number">110.02542877197266</span>,<span class="hljs-string">"timestamp"</span>:<span class="hljs-number">2378613</span>,<span class="hljs-string">"target"</span>:<span class="hljs-number">26</span>,<span class="hljs-string">"pageX"</span>:<span class="hljs-number">245.4869842529297</span>}],[<span class="hljs-number">0</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : Timing.createTimer([<span class="hljs-number">18</span>,<span class="hljs-number">130</span>,<span class="hljs-number">1477140761852</span>,<span class="hljs-keyword">false</span>])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : Timing.createTimer([<span class="hljs-number">19</span>,<span class="hljs-number">500</span>,<span class="hljs-number">1477140761852</span>,<span class="hljs-keyword">false</span>])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.setJSResponder([<span class="hljs-number">23</span>,<span class="hljs-keyword">false</span>])
<span class="hljs-number">2584</span> I ReactNativeJS: N-&gt;JS : RCTEventEmitter.receiveTouches([<span class="hljs-string">"topTouchEnd"</span>,[{<span class="hljs-string">"identifier"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"locationY"</span>:<span class="hljs-number">47.9301872253418</span>,<span class="hljs-string">"locationX"</span>:<span class="hljs-number">170.43936157226562</span>,<span class="hljs-string">"pageY"</span>:<span class="hljs-number">110.02542877197266</span>,<span class="hljs-string">"timestamp"</span>:<span class="hljs-number">2378703</span>,<span class="hljs-string">"target"</span>:<span class="hljs-number">26</span>,<span class="hljs-string">"pageX"</span>:<span class="hljs-number">245.4869842529297</span>}],[<span class="hljs-number">0</span>]])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : UIManager.clearJSResponder([])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : Timing.deleteTimer([<span class="hljs-number">19</span>])
<span class="hljs-number">2584</span> I ReactNativeJS: JS-&gt;N : Timing.deleteTimer([<span class="hljs-number">18</span>])
</code></pre>
<p data-nodeid="185654">除了 UI 渲染、交互信息、网络调用等通信也都是通过 MessageQueue 来完成，如下数据， JavaScriptCore 传递网络请求信息给原生平台：</p>
<pre class="lang-java" data-nodeid="185655"><code data-language="java">5835 I ReactNativeJS: JS-&gt;N : Networking.sendRequest(["GET","http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz&amp;page_limit=20&amp;page=1",1,[],{"trackingName":"unknown"},"text",false,0])
5835 I ReactNativeJS: N-&gt;JS : RCTDeviceEventEmitter.emit(["didReceiveNetworkResponse",[1,200,{"Connection":"keep-alive","X-Xss-Protection":"1; mode=block","Content-Security-Policy":"frame-ancestors 'self' rottentomatoes.com *.rottentomatoes.com ;","Date":"Sat, 22 Oct 2016 13:58:53 GMT","Set-Cookie":"JSESSIONID=63B283B5ECAA9BBECAE253E44455F25B; Path=/; HttpOnly","Server":"nginx/1.8.1","X-Content-Type-Options":"nosniff","X-Mashery-Responder":"prod-j-worker-us-east-1b-115.mashery.com","Vary":"User-Agent,Accept-Encoding","Content-Language":"en-US","Content-Type":"text/javascript;charset=ISO-8859-1","X-Content-Security-Policy":"frame-ancestors 'self' rottentomatoes.com *.rottentomatoes.com ;"},"http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz&amp;page_limit=20&amp;page=1"]])
5835 I ReactNativeJS: N-&gt;JS : RCTDeviceEventEmitter.emit(["didReceiveNetworkData",[1,"{\"total\":128,\"movies\":[{\"id\":\"771419323\",\"title\":\"The Accountant\",\"year\":2016,\"mpaa_rating\":\"R\",\"runtime\":128,\"critics_consensus\":\"\",\"release_dates\":{\"theater\":\"2016-10-14\"},\"ratings\":{\"critics_rating\":\"Rotten\",\"critics_score\":50,\"audience_rating\":\"Upright\",\"audience_score\":86},\"synopsis\":\"Christian Wolff (Ben Affleck) is a math savant with more affinity for numbers than people. Behind the cover of a small-town CPA office, he works as a freelance accountant for some of the world's most dangerous criminal organizations. With the Treasury Department's Crime Enforcement Division, run by Ray King (J.K. Simmons), starting to close in, Christian takes on a legitimate client: a state-of-the-art robotics company where an accounting clerk (Anna Kendrick) has discovered a discrepancy involving millions of dollars. But as Christian uncooks the books and gets closer to the truth, it is the body count that starts to rise.\",\"posters\":{\"thumbnail\":\"https://resizing.flixster.com/r5vvWsTP7cdijsCrE5PSmzle-Zo=/54x80/v1.bTsxMjIyMzc0MTtqOzE3MTgyOzIwNDg7NDA1MDs2MDAw\",\"profile\":\"https://resizing.flixster.com/r5vvWsTP7cdijsCrE5PSmzle-Zo=/54x80/v1.bTsxMjIyMzc0MTtqOzE3MTgyOzIwNDg7NDA1MDs2MDAw\",\"detailed\":\"https://resizing.flixster.com/r5vvWsTP7cdijsCrE5PSmzle-Zo=/54x80/v1.bTsxMjIyMzc0MTtqOzE3MTgyOzIwNDg7NDA1MDs2MDAw\",\"original\":\"https://resizing.flixster.com/r5vvWsTP7cdijsCrE5PSmzle-Zo=/54x80/v1.bTsxMjIyMzc0MTtqOzE3MTgyOzIwNDg7NDA1MDs2MDAw\"},\"abridged_cast\":[{\"name\":\"Ben Affleck\",\"id\":\"162665891\",\"characters\":[\"Christian Wolff\"]},{\"name\":\"Anna Kendrick\",\"id\":\"528367112\",\"characters\":[\"Dana Cummings\"]},{\"name\":\"J.K. Simmons\",\"id\":\"592170459\",\"characters\":[\"Ray King\"]},{\"name\":\"Jon Bernthal\",\"id\":\"770682766\",\"characters\":[\"Brax\"]},{\"name\":\"Jeffrey Tambor\",\"id\":\"162663809\",\"characters\":[\"Francis Silverberg\"]}],\"links\":{\"self\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/771419323.json\",\"alternate\":\"http://www.rottentomatoes.com/m/the_accountant_2016/\",\"cast\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/771419323/cast.json\",\"reviews\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/771419323/reviews.json\",\"similar\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/771419323/similar.json\"}},{\"id\":\"771359360\",\"title\":\"Miss Peregrine's Home for Peculiar Children\",\"year\":2016,\"mpaa_rating\":\"PG-13\",\"runtime\":127,\"critics_consensus\":\"\",\"release_dates\":{\"theater\":\"2016-09-30\"},\"ratings\":{\"critics_rating\":\"Fresh\",\"critics_score\":64,\"audience_rating\":\"Upright\",\"audience_score\":65},\"synopsis\":\"From visionary director Tim Burton, and based upon the best-selling novel, comes an unforgettable motion picture experience. When Jake discovers clues to a mystery that spans different worlds and times, he finds a magical place known as Miss Peregrine's Home for Peculiar Children. But the mystery and danger deepen as he gets to know the residents and learns about their special powers...and their powerful enemies. Ultimately, Jake discovers that only his own special \\\"peculiarity\\\" can save his new friends.\",\"posters\":{\"thumbnail\":\"https://resizing.flixster.com/H1Mt4WpK-Mp431M7w0w7thQyfV8=/54x80/v1.bTsxMTcwODA4MDtqOzE3MTI1OzIwNDg7NTQwOzgwMA\",\"profile\":\"https://resizing.flixster.com/H1Mt4WpK-Mp431M7w0w7thQyfV8=/54x80/v1.bTsxMTcwODA4MDtqOzE3MTI1OzIwNDg7NTQwOzgwMA\",\"detailed\":\"https://resizing.flixster.com/H1Mt4WpK-Mp431M7w0w7thQyfV8=/54x80/v1.bTsxMTcwODA4MDtqOzE3MTI1OzIwNDg7NTQwOzgwMA\",\"original\":\"https://resizing.flixster.com/H1Mt4WpK-Mp431M7w0w7thQyfV8=/54x80/v1.bTsxMTcwODA4MDtqOzE3MTI1OzIwNDg7NTQwOzgwMA\"},\"abridged_cast\":[{\"name\":\"Eva Green\",\"id\":\"162652241\",\"characters\":[\"Miss Peregrine\"]},{\"name\":\"Asa Butterfield\",\"id\":\"770800323\",\"characters\":[\"Jake\"]},{\"name\":\"Chris O'Dowd\",\"id\":\"770684214\",\"char
5835 I ReactNativeJS: N-&gt;JS : RCTDeviceEventEmitter.emit(["didCompleteNetworkResponse",[1,null]])
</code></pre>
<p data-nodeid="185656">这样的效果显而易见，<strong data-nodeid="185832">通过前端能力，实现了原生应用的跨平台，快速编译、快速发布</strong>。但是缺点也比较明显：上述数据通信过程是异步的，<strong data-nodeid="185833">通信成本很高</strong>。除此之外，目前 React Native 仍有部分组件和 API 并没有实现平台统一，也在一定程度上需要开发者了解原生开发细节。正因如此，社区上也出现了著名文章<a href="https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c" data-nodeid="185830">《React Native at Airbnb》</a>，文中表示 Airbnb 团队在技术选型上将会放弃 React Native。</p>
<p data-nodeid="185657">在我看来，放弃 React Native，拥抱新的跨平台技术并不是每个团队都有实力和魄力施行的，而改造 React Native 是另外一些团队做出的选择。</p>
<p data-nodeid="185658">比如<strong data-nodeid="185844">携程的 CRN</strong>（Ctrip React Native）。它在 React Native 基础上，抹平了 iOS 和 Android 端组件开发差异，做了大量性能提升的工作。更重要的是，依托于 CRN，它在后续的产品 CRN-Web 也做了 Web 支持和接入。再比如，更加出名的<strong data-nodeid="185845">Alibaba 出品的 WEEX</strong>也是基于 React Native 思想进行的某种改造，只不过 WEEX 基于 Vue，除了支持原生平台，还支持了 Web 平台，实现了端上的大一统。WEEX 技术架构如下图（出自官网）：</p>
<p data-nodeid="188513" class=""><img src="https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK82AKeB3AADlYd3QMbY205.png" alt="Lark20210202-183709.png" data-nodeid="188517"></p>
<div data-nodeid="188514"><p style="text-align:center">WEEX 技术架构图</p></div>


<p data-nodeid="185661">话题再回到 React Native，针对一些固有缺陷，React Native 进行了技术上的重构，我认为这是基于 OEM Hybrid 方案的 2.0 演进，下面我们进一步探究。</p>
<h4 data-nodeid="185662">从 React Native 技术重构出发，分析原生跨平台技术栈方向</h4>
<p data-nodeid="185663">上文我们提到，React Native 通过数据通信架起了 Web 和原生平台的桥梁，而这个数据通信方式是异步的。React 工程经理 Sophie Alpert 将这种异步通信方式称为 Asynchronous Bridge，这样的设计获得了线程隔离的便利，具备了尽可能的灵活性，但是这也意味着 JavaScript 逻辑与原生能力永远无法处在同一个时空，无法共享一个内存空间。</p>
<p data-nodeid="185664">老架构图：</p>
<p data-nodeid="185665"><img src="https://s0.lgstatic.com/i/image/M00/94/8A/Ciqc1GAYzjeAD4rFAAxfnuLVOGI871.png" alt="Drawing 3.png" data-nodeid="185855"></p>
<p data-nodeid="185666">对比新的架构图：</p>
<p data-nodeid="185667"><img src="https://s0.lgstatic.com/i/image/M00/94/95/CgqCHmAYzj-ANDk6AAyPBuKOtmk965.png" alt="Drawing 4.png" data-nodeid="185859"></p>
<p data-nodeid="185668">基于这个问题，新的 React Native 技术架构将从三个方面进行革新。</p>
<ol data-nodeid="185669">
<li data-nodeid="185670">
<p data-nodeid="185671"><strong data-nodeid="185865">改变线程模型</strong>（Threading Model），以往 React Native 的 UI 更新需要在三个不同的线程进行，新的方案使具有高优先级更新的线程，直接同步调用 JavaScript；同时低优先级的 UI 更新任务不会占用主线程。这里提到的三个并行线程是：</p>
<ul data-nodeid="185672">
<li data-nodeid="185673">
<p data-nodeid="185674"><strong data-nodeid="185870">JavaScript 线程</strong>，在这个线程中，Metro 负责生成 JS bundles，JavaScriptCore 负责在应用运行时解析执行 JavaScript 代码；</p>
</li>
<li data-nodeid="185675">
<p data-nodeid="185676"><strong data-nodeid="185875">原生线程</strong>，这个线程负责用户界面，每当需要更新 UI 时，该线程将会与 JavaScript 线程通信，可以细分为原生模块和原生 UI；</p>
</li>
<li data-nodeid="185677">
<p data-nodeid="185678"><strong data-nodeid="185880">Shadow 线程</strong>，该线程负责计算布局，React Native 具体通过 Yoga 布局引擎来解析并计算 Flexbox 布局，并将结果发送回原生 UI 线程。</p>
</li>
</ul>
</li>
<li data-nodeid="185679">
<p data-nodeid="185680"><strong data-nodeid="185888">引入</strong><a href="https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html" data-nodeid="185886">异步渲染能力</a>，实现不同优先级的渲染，同时简化渲染数据信息。</p>
</li>
<li data-nodeid="185681">
<p data-nodeid="185682"><strong data-nodeid="185893">简化 Bridge 实现</strong>，使之更轻量可靠，使 JavaScript 和原生平台的调用更加高效。</p>
</li>
</ol>
<p data-nodeid="185683">举个例子，这些改造能够使得“<strong data-nodeid="185899">手势处理</strong>”——这个 React Native 老大难问题得到更好的解决，比如新的线程模型能够使手势触发的交互和 UI 渲染效率更高，减少异步通信更新 UI 成本，使视图尽快响应用户的交互。</p>
<p data-nodeid="185684">我们从更细节的角度来加深理解。上述重构的核心之一其实是使用基于 JavaScript Interface (JSI) 的新 Bridge 方案来取代之前的 Bridge 方案。</p>
<p data-nodeid="185685">新的 Bridge 方案由两部分组成：</p>
<ul data-nodeid="185686">
<li data-nodeid="185687">
<p data-nodeid="185688"><strong data-nodeid="185906">Fabric，新的 UIManager</strong>；</p>
</li>
<li data-nodeid="185689">
<p data-nodeid="185690"><strong data-nodeid="185911">TurboModules，新的原生模块</strong>。</p>
</li>
</ul>
<p data-nodeid="185691">其中 Fabric 运行 UIManager<strong data-nodeid="185921">直接用 C++ 生成 Shadow Tree</strong>，而不需要走一遍老架构的 React → Native → Shadow Tree → Native UI 路径。这就<strong data-nodeid="185922">减少了通信成本，提升交互性能</strong>。这个过程依赖于 JSI，JSI 并不和 JavaScriptCore 绑定，因此我们可以实现引擎互换（比如使用 V8，或任何其他版本的 JavaScriptCore）。</p>
<p data-nodeid="185692">同时，JSI 可以获取 C++ Host Objects，并调用 Host Objects 上的方法，这样能够完成<strong data-nodeid="185928">JavaScript 和原生平台的直接感知</strong>，达到“所有线程之间的互相调用操作”，因此我们就不再依赖“将传递消息序列化，并进行异步通信”了。这也就消除了异步通信带来的拥塞等问题。</p>
<p data-nodeid="185693">新的方案也允许 JavaScript 代码<strong data-nodeid="185934">仅在真正需要时加载每个模块</strong>，如果应用中并不需要使用 Native Modules（例如蓝牙功能），那么它就不会在程序打开时被加载，这样就可以提升应用的启动时间。</p>
<p data-nodeid="185694">总之，新的 React Native 架构将会在 Hybrid 思想上将性能优化做到极致，我们可以密切关注相关技术的发展。一条路优化到底是我们需要学习的，另辟蹊径也是我们需要掌握的，接下来，我们看看 Flutter 技术如何从另一个赛道出发，革新了跨平台技术方案。</p>
<h3 data-nodeid="185695">Flutter 新贵背后的技术变革</h3>
<p data-nodeid="185696">Flutter<strong data-nodeid="185952">采用了 Dart 编程语言</strong>，它在技术设计上不同于 React Native 的一个显著特点是：<strong data-nodeid="185953">Flutter 并非使用原生平台组件进行渲染</strong>。比如在 React Native 中，一个<code data-backticks="1" data-nodeid="185946">&lt;view&gt;</code>组件会被最终编译为 iOS 平台的 UIView Element 以及 Android 平台的 View Element，但在 Flutter 中，Flutter 自身提供一组组件集合，这些组件集合被 Flutter 框架和引擎直接接管。如下图（出自 <a href="https://www.codemag.com/Article/1909091/Cross-Platform-Mobile-Development-Using-Flutter" data-nodeid="185950">Cross-Platform Mobile Development Using Flutter</a>）：</p>
<p data-nodeid="187680" class=""><img src="https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK76AWfZpAApvFObEYiY127.png" alt="Lark20210202-183731.png" data-nodeid="187684"></p>
<div data-nodeid="187681"><p style="text-align:center">Flutter 工作原理图</p></div>


<p data-nodeid="185699">Flutter 组件依靠自身高性能的渲染引擎进行视图的渲染。具体来说，每一个组件会被渲染在 Skia 上，Skia 是一个 2D 的绘图引擎库，具有跨平台特点。Skia 唯一需要的就是<strong data-nodeid="185962">原生平台提供 Canvas 接口，实现绘制</strong>。我们再通过一个横向架构图来了解实现细节：</p>
<p data-nodeid="189346" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image/M00/94/AD/Ciqc1GAZK9iAVaYlAAna3hqvMhs586.png" alt="Lark20210202-183729.png" data-nodeid="189350"></p>
<div data-nodeid="189347"><p style="text-align:center">Flutter 技术方案架构图</p></div>


<p data-nodeid="185702">Flutter 技术方案主要分为三层：Framework、Engine、Embedder。其中<strong data-nodeid="185979">Framework 层由 Dart 语言实现，业务代码直接运行在这一层</strong>。框架的 Framework 层提供了 Material Design 风格的组件，以及<a href="https://flutterchina.club/widgets/cupertino/" data-nodeid="185973">适合 iOS 的 Cupertino 风格组件</a>。以 Cupertino 风格的 button 组件为例，其<a href="https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/cupertino/button.dart" data-nodeid="185977">源码</a>如下：</p>
<pre class="lang-java" data-nodeid="185703"><code data-language="java"><span class="hljs-comment">// 引入基础及组件</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'package:flutter/foundation.dart'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'package:flutter/widgets.dart'</span>;
<span class="hljs-comment">// 引入相关库</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'colors.dart'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'constants.dart'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'theme.dart'</span>;
<span class="hljs-keyword">const</span> EdgeInsets _kButtonPadding = EdgeInsets.all(<span class="hljs-number">16.0</span>);
<span class="hljs-keyword">const</span> EdgeInsets _kBackgroundButtonPadding = EdgeInsets.symmetric(
  vertical: <span class="hljs-number">14.0</span>,
  horizontal: <span class="hljs-number">64.0</span>,
);
<span class="hljs-comment">// 一个 Cupertino 风格的按钮组件，继承了 StatefulWidget</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CupertinoButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatefulWidget</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">const</span> <span class="hljs-title">CupertinoButton</span><span class="hljs-params">({
    Key? key,
    required <span class="hljs-keyword">this</span>.child,
    <span class="hljs-keyword">this</span>.padding,
    <span class="hljs-keyword">this</span>.color,
    <span class="hljs-keyword">this</span>.disabledColor = CupertinoColors.quaternarySystemFill,
    <span class="hljs-keyword">this</span>.minSize = kMinInteractiveDimensionCupertino,
    <span class="hljs-keyword">this</span>.pressedOpacity = <span class="hljs-number">0.4</span>,
    <span class="hljs-keyword">this</span>.borderRadius = <span class="hljs-keyword">const</span> BorderRadius.all(Radius.circular(<span class="hljs-number">8.0</span>)</span>),
    required <span class="hljs-keyword">this</span>.onPressed,
  }) : <span class="hljs-title">assert</span><span class="hljs-params">(pressedOpacity == <span class="hljs-keyword">null</span> || (pressedOpacity &gt;= <span class="hljs-number">0.0</span> &amp;&amp; pressedOpacity &lt;= <span class="hljs-number">1.0</span>)</span>),
       <span class="hljs-title">assert</span><span class="hljs-params">(disabledColor != <span class="hljs-keyword">null</span>)</span>,
       _filled </span>= <span class="hljs-keyword">false</span>,
       <span class="hljs-keyword">super</span>(key: key);
  <span class="hljs-keyword">const</span> CupertinoButton.filled({
    Key? key,
    required <span class="hljs-keyword">this</span>.child,
    <span class="hljs-keyword">this</span>.padding,
    <span class="hljs-keyword">this</span>.disabledColor = CupertinoColors.quaternarySystemFill,
    <span class="hljs-keyword">this</span>.minSize = kMinInteractiveDimensionCupertino,
    <span class="hljs-keyword">this</span>.pressedOpacity = <span class="hljs-number">0.4</span>,
    <span class="hljs-keyword">this</span>.borderRadius = <span class="hljs-keyword">const</span> BorderRadius.all(Radius.circular(<span class="hljs-number">8.0</span>)),
    required <span class="hljs-keyword">this</span>.onPressed,
  }) : <span class="hljs-keyword">assert</span>(pressedOpacity == <span class="hljs-keyword">null</span> || (pressedOpacity &gt;= <span class="hljs-number">0.0</span> &amp;&amp; pressedOpacity &lt;= <span class="hljs-number">1.0</span>)),
       <span class="hljs-keyword">assert</span>(disabledColor != <span class="hljs-keyword">null</span>),
       color = <span class="hljs-keyword">null</span>,
       _filled = <span class="hljs-keyword">true</span>,
       <span class="hljs-keyword">super</span>(key: key);
  <span class="hljs-keyword">final</span> Widget child;
  <span class="hljs-keyword">final</span> EdgeInsetsGeometry? padding;
  <span class="hljs-keyword">final</span> Color? color;
  <span class="hljs-keyword">final</span> Color disabledColor;
  <span class="hljs-keyword">final</span> VoidCallback? onPressed;
  <span class="hljs-keyword">final</span> <span class="hljs-keyword">double</span>? minSize;
  <span class="hljs-keyword">final</span> <span class="hljs-keyword">double</span>? pressedOpacity;
  <span class="hljs-keyword">final</span> BorderRadius? borderRadius;
  <span class="hljs-keyword">final</span> bool _filled;
  bool get enabled =&gt; onPressed != <span class="hljs-keyword">null</span>;
  <span class="hljs-meta">@override</span>
  <span class="hljs-function">_CupertinoButtonState <span class="hljs-title">createState</span><span class="hljs-params">()</span> </span>=&gt; _CupertinoButtonState();
  <span class="hljs-meta">@override</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">debugFillProperties</span><span class="hljs-params">(DiagnosticPropertiesBuilder properties)</span> </span>{
    <span class="hljs-keyword">super</span>.debugFillProperties(properties);
    properties.add(FlagProperty(<span class="hljs-string">'enabled'</span>, value: enabled, ifFalse: <span class="hljs-string">'disabled'</span>));
  }
}
<span class="hljs-comment">// _CupertinoButtonState 类，继承了 CupertinoButton，同时应用 mixin</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">_CupertinoButtonState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State</span>&lt;<span class="hljs-title">CupertinoButton</span>&gt; <span class="hljs-title">with</span> <span class="hljs-title">SingleTickerProviderStateMixin</span> </span>{
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> Duration kFadeOutDuration = Duration(milliseconds: <span class="hljs-number">10</span>);
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> Duration kFadeInDuration = Duration(milliseconds: <span class="hljs-number">100</span>);
  <span class="hljs-keyword">final</span> Tween&lt;<span class="hljs-keyword">double</span>&gt; _opacityTween = Tween&lt;<span class="hljs-keyword">double</span>&gt;(begin: <span class="hljs-number">1.0</span>);
  late AnimationController _animationController;
  late Animation&lt;<span class="hljs-keyword">double</span>&gt; _opacityAnimation;
  <span class="hljs-comment">// 初始化状态</span>
  <span class="hljs-meta">@override</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">initState</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">super</span>.initState();
    _animationController = AnimationController(
      duration: <span class="hljs-function"><span class="hljs-keyword">const</span> <span class="hljs-title">Duration</span><span class="hljs-params">(milliseconds: <span class="hljs-number">200</span>)</span>,
      value: 0.0,
      vsync: <span class="hljs-keyword">this</span>,
    )</span>;
    _opacityAnimation = _animationController
      .drive(CurveTween(curve: Curves.decelerate))
      .drive(_opacityTween);
    _setTween();
  }
  <span class="hljs-comment">// 相关生命周期</span>
  <span class="hljs-meta">@override</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">didUpdateWidget</span><span class="hljs-params">(CupertinoButton old)</span> </span>{
    <span class="hljs-keyword">super</span>.didUpdateWidget(old);
    _setTween();
  }
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">_setTween</span><span class="hljs-params">()</span> </span>{
    _opacityTween.end = widget.pressedOpacity ?? <span class="hljs-number">1.0</span>;
  }
  <span class="hljs-meta">@override</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">dispose</span><span class="hljs-params">()</span> </span>{
    _animationController.dispose();
    <span class="hljs-keyword">super</span>.dispose();
  }
  bool _buttonHeldDown = <span class="hljs-keyword">false</span>;
  <span class="hljs-comment">// 处理 tap down 事件</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">_handleTapDown</span><span class="hljs-params">(TapDownDetails event)</span> </span>{
    <span class="hljs-keyword">if</span> (!_buttonHeldDown) {
      _buttonHeldDown = <span class="hljs-keyword">true</span>;
      _animate();
    }
  }
  <span class="hljs-comment">// 处理 tap up 事件</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">_handleTapUp</span><span class="hljs-params">(TapUpDetails event)</span> </span>{
    <span class="hljs-keyword">if</span> (_buttonHeldDown) {
      _buttonHeldDown = <span class="hljs-keyword">false</span>;
      _animate();
    }
  }
  <span class="hljs-comment">// 处理 tap cancel 事件</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">_handleTapCancel</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span> (_buttonHeldDown) {
      _buttonHeldDown = <span class="hljs-keyword">false</span>;
      _animate();
    }
  }
  <span class="hljs-comment">// 相关动画处理</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">_animate</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span> (_animationController.isAnimating)
      <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">final</span> bool wasHeldDown = _buttonHeldDown;
    <span class="hljs-keyword">final</span> TickerFuture ticker = _buttonHeldDown
        ? _animationController.animateTo(<span class="hljs-number">1.0</span>, duration: kFadeOutDuration)
        : _animationController.animateTo(<span class="hljs-number">0.0</span>, duration: kFadeInDuration);
    ticker.then&lt;<span class="hljs-keyword">void</span>&gt;((<span class="hljs-keyword">void</span> value) {
      <span class="hljs-keyword">if</span> (mounted &amp;&amp; wasHeldDown != _buttonHeldDown)
        _animate();
    });
  }
  <span class="hljs-meta">@override</span>
  <span class="hljs-function">Widget <span class="hljs-title">build</span><span class="hljs-params">(BuildContext context)</span> </span>{
    <span class="hljs-keyword">final</span> bool enabled = widget.enabled;
    <span class="hljs-keyword">final</span> CupertinoThemeData themeData = CupertinoTheme.of(context);
    <span class="hljs-keyword">final</span> Color primaryColor = themeData.primaryColor;
    <span class="hljs-keyword">final</span> Color? backgroundColor = widget.color == <span class="hljs-keyword">null</span>
      ? (widget._filled ? primaryColor : <span class="hljs-keyword">null</span>)
      : CupertinoDynamicColor.resolve(widget.color, context);
    <span class="hljs-keyword">final</span> Color? foregroundColor = backgroundColor != <span class="hljs-keyword">null</span>
      ? themeData.primaryContrastingColor
      : enabled
        ? primaryColor
        : CupertinoDynamicColor.resolve(CupertinoColors.placeholderText, context);
    <span class="hljs-keyword">final</span> TextStyle textStyle = themeData.textTheme.textStyle.copyWith(color: foregroundColor);
    <span class="hljs-keyword">return</span> GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTapDown: enabled ? _handleTapDown : <span class="hljs-keyword">null</span>,
      onTapUp: enabled ? _handleTapUp : <span class="hljs-keyword">null</span>,
      onTapCancel: enabled ? _handleTapCancel : <span class="hljs-keyword">null</span>,
      onTap: widget.onPressed,
      child: Semantics(
        button: <span class="hljs-keyword">true</span>,
        child: ConstrainedBox(
          constraints: widget.minSize == <span class="hljs-keyword">null</span>
            ? <span class="hljs-function"><span class="hljs-keyword">const</span> <span class="hljs-title">BoxConstraints</span><span class="hljs-params">()</span>
            : <span class="hljs-title">BoxConstraints</span><span class="hljs-params">(
                minWidth: widget.minSize!,
                minHeight: widget.minSize!,
              )</span>,
          child: <span class="hljs-title">FadeTransition</span><span class="hljs-params">(
            opacity: _opacityAnimation,
            child: DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: widget.borderRadius,
                color: backgroundColor != <span class="hljs-keyword">null</span> &amp;&amp; !enabled
                  ? CupertinoDynamicColor.resolve(widget.disabledColor, context)</span>
                  : backgroundColor,
              ),
              child: <span class="hljs-title">Padding</span><span class="hljs-params">(
                padding: widget.padding ?? (backgroundColor != <span class="hljs-keyword">null</span>
                  ? _kBackgroundButtonPadding
                  : _kButtonPadding)</span>,
                child: <span class="hljs-title">Center</span><span class="hljs-params">(
                  widthFactor: <span class="hljs-number">1.0</span>,
                  heightFactor: <span class="hljs-number">1.0</span>,
                  child: DefaultTextStyle(
                    style: textStyle,
                    child: IconTheme(
                      data: IconThemeData(color: foregroundColor)</span>,
                      child: widget.child,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    )</span>;
  }
}
</code></pre>
<p data-nodeid="185704">通过上面代码，我们可以感知 Dart 语言风格以及设计一个组件的关键点：Flutter 组件分为两种类型，<strong data-nodeid="185989">StatelessWidget 无状态组件和 StatefulWidget 有状态组件</strong>。上面 button 显然是一个有状态组件，它包含了 _CupertinoButtonState 类，并继承 State<code data-backticks="1" data-nodeid="185987">&lt;CupertinoButton&gt;</code>。通常一个有状态组件的声明为：</p>
<pre class="lang-java" data-nodeid="185705"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyCustomStatefulWidget</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatefulWidget</span> </span>{
  <span class="hljs-comment">//---constructor with named // argument: country--- MyCustomStatefulWidget( {Key key, this.country}) : super(key: key);</span>
  <span class="hljs-comment">//---used in _DisplayState--- final String country;</span>
  <span class="hljs-meta">@override</span> <span class="hljs-function">_DisplayState <span class="hljs-title">createState</span><span class="hljs-params">()</span> </span>=&gt; _DisplayState();
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">_DisplayState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State</span>&lt;<span class="hljs-title">MyCustomStatefulWidget</span>&gt; </span>{
  <span class="hljs-meta">@override</span> <span class="hljs-function">Widget <span class="hljs-title">build</span><span class="hljs-params">(BuildContext context)</span> </span>{ 
    <span class="hljs-keyword">return</span> Center( 
      <span class="hljs-comment">//---country defined in StatefulWidget // subclass--- child: Text(widget.country), </span>
     ); 
  }
}
</code></pre>
<p data-nodeid="185706">Framework 的下一层是 Engine 层，这一层是<strong data-nodeid="185999">Flutter 内部核心</strong>，它主要由 C++ 实现，包含<strong data-nodeid="186000">Skia 图形处理函数库、Dart runtime、Garbage Collection（GC）以及 Text（文本渲染）</strong>。在这一层中，通过内置的 Dart 运行时，Flutter 提供了在 Debug 模式下的 JIT（Just in time）支持，以及在 Release 和 Profile 模式下的 AOT（Ahead of time）编译时编译成原生 ARM 代码的能力。</p>
<p data-nodeid="185707">最底层为 Embedder 嵌入层，在这一层中，Flutter 的主要工作是 Surface Setup、接入原生插件、设置线程等。也许你并不了解具体底层的知识，这里只需要清楚：Flutter 的 Embedder 层已经很低，<strong data-nodeid="186006">原生平台只需要提供画布，而 Flutter 处理了其余所有逻辑</strong>。正是因为这样，Flutter 有了更好的跨端一致性和稳定性，以及更高性能表现。</p>
<p data-nodeid="185708">目前来看，Flutter 具备其他跨平台方案所不具备的技术优势，加上 Dart 语言加持，未来前景大好。但作为后入场者，也存在生态小、学习成本高等障碍。作为前端开发者，对于 Flutter 技术的持续观察和深入学习并不矛盾，现在正是学习 Flutter 技术的良好时机。</p>
<h3 data-nodeid="185709">总结</h3>
<p data-nodeid="185710">大前端概念并不是虚无的。大前端的落地、纵向上依靠 Node.js 技术的发展，横向上依靠对端平台的深钻。上一讲我们介绍了小程序跨端的相关知识，这一讲我们分析了原生平台的跨端方案发展和技术设计。跨端这一技术也许会在未来由一个统一方案进行实现，相关话题也许会告一段落，但是深入该话题后学习到的端知识，将会是我们的宝贵财富。</p>
<p data-nodeid="185711">本讲内容如下：</p>
<p data-nodeid="185712"><img src="https://s0.lgstatic.com/i/image/M00/94/8A/Ciqc1GAYznaAGKheAAH7M50bq2I025.png" alt="Drawing 7.png" data-nodeid="186013"></p>
<p data-nodeid="185713" class="">从下一讲开始，我们将进入核心框架原理与代码设计模式的学习，下一讲我们将从设计一个请求库需要考虑的问题出发，带你学习 axios 的设计思想。今天的内容到这里就要结束了，如果有任何疑问欢迎在留言区和我互动，我们下一讲再见！</p>

---

### 精选评论

##### *浩：
> 跨平台的技术这一讲真是好。

