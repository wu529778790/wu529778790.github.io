<p data-nodeid="1801" class="">这一讲，我们将对代码拆分和按需加载这一话题进行解析。</p>
<p data-nodeid="1802">随着 Webpack 等构建工具的能力越来越强，开发者在构建阶段可以随心所欲打造项目流程，代码拆分和按需加载技术在业界曝光量也越来越高。事实上，代码拆分和按需加载的设计决定着工程化构建的结果，这将直接影响应用的性能表现，因为合理的加载时机和代码拆分能够使初始代码体积更小，页面加载更快。因此，如何合理设计代码拆分和按需加载，是对一个项目架构情况的直接考量。</p>
<p data-nodeid="1803">下面我们从代码拆分和按需加载的场景入手，一同体会这一技术手段的必要性和业务价值。</p>
<h3 data-nodeid="1804">代码拆分和按需加载场景</h3>
<p data-nodeid="1805">我们来看一个案例。如下图所示场景：点击左图播放按钮后，页面出现视频列表浮层（如右侧图所示，类似单页应用，视频列表仍为同一页面）。视频列表浮层包含了滚动处理、视频播放等多项复杂逻辑，因此这个浮层对应的脚本在页面初始化时，不需要被加载。那么在工程上，我们需要对视频浮层脚本单独进行拆分，和初始化脚本进行分离。当用户点击浮层触发按钮后，执行某一单独部分脚本的请求。</p>
<p data-nodeid="1806"><img src="https://s0.lgstatic.com/i/image/M00/8D/42/Ciqc1F_9Bu2AB133AAluXVg4Mlw240.png" alt="Drawing 0.png" data-nodeid="1974"></p>
<p data-nodeid="1807">这其实是一个我接手并重构过的真实线上案例，通过后期对页面交互的统计数据分析发现，用户点击触发视频浮层出现按钮的概率只有 10% 左右。也就是说，大部分用户（90%）并不会看到这一浮层，也就不需要对相关脚本进行加载执行，因此延迟按需加载设计是有统计数据支持的。现在你已经了解了这个场景，下面我们从技术环节详细展开。</p>
<h3 data-nodeid="1808">代码拆分和按需技术实现</h3>
<h4 data-nodeid="1809">按需加载和按需打包区分</h4>
<p data-nodeid="1810">从技术角度介绍按需加载概念前，我们需要先和另外一个概念：<strong data-nodeid="1983">按需打包</strong>，进行区分。事实上，当前社区对于按需加载和按需打包并没有一个准确的命名上的划分约定。因此从两者命名上，难以区分其实际含义。</p>
<p data-nodeid="1811">其实，<strong data-nodeid="1993">按需加载表示代码模块在交互需要时，动态引入</strong>；而<strong data-nodeid="1994">按需打包针对第三方依赖库，及业务模块，只打包真正在运行时可能会需要的代码</strong>。</p>
<p data-nodeid="1812">我们不妨先说明按需打包的概念和实施方法，目前按需打包一般通过两种方式进行：</p>
<ul data-nodeid="1813">
<li data-nodeid="1814">
<p data-nodeid="1815">使用 ES Module 支持的 Tree Shaking 方案，在使用构建工具打包时，完成按需打包；</p>
</li>
<li data-nodeid="1816">
<p data-nodeid="1817">使用以<code data-backticks="1" data-nodeid="1998">babel-plugin-import</code>为主的 Babel 插件，实现自动按需打包 。</p>
</li>
</ul>
<p data-nodeid="1818"><strong data-nodeid="2003">Tree Shaking 实现按需打包</strong></p>
<p data-nodeid="1819">我们来看一个场景，假设业务中使用 antd 的 Button 组件：</p>
<pre class="lang-java" data-nodeid="1820"><code data-language="java"><span class="hljs-keyword">import</span> { Button } from <span class="hljs-string">'antd'</span>;
</code></pre>
<p data-nodeid="1821">这样的引用，会使得最终打包的代码中包含所有 antd 导出来的内容。假设应用中并没有使用 antd 提供的 TimePicker 组件，那么对于打包结果来说，无疑增加了代码体积。在这种情况下，如果组件库提供了 ES Module 版本，并开启了 Tree Shaking，我们就可以通过“摇树”特性，将不会被使用的代码在构建阶段移除。</p>
<p data-nodeid="1822">Webpack 可以在 package.json 中设置<code data-backticks="1" data-nodeid="2007">sideEffects: false</code>。我们在 <a href="https://github.com/ant-design/ant-design/blob/master/package.json#L38" data-nodeid="2011">antd 源码</a>当中可以找到（<a href="https://github.com/ant-design/ant-design/pull/10043" data-nodeid="2015">相关 chore commit</a>）：</p>
<pre class="lang-java" data-nodeid="1823"><code data-language="java"><span class="hljs-string">"sideEffects"</span>: [
	<span class="hljs-string">"dist/*"</span>,
	<span class="hljs-string">"es/**/style/*"</span>,
	<span class="hljs-string">"lib/**/style/*"</span>,
	<span class="hljs-string">"*.less"</span>
],
</code></pre>
<p data-nodeid="1824">指定副作用模块——这是一种值得推荐的开发习惯，建议你注意 Tree Shaking 的使用，最好实际观察一下打包结果。</p>
<p data-nodeid="1825"><strong data-nodeid="2021">学习编写 Babel 插件，实现按需打包</strong></p>
<p data-nodeid="1826">如果第三方库不支持 Tree Shaking，我们依然可以<strong data-nodeid="2027">通过 Babel 插件，改变业务代码中对模块的引用路径</strong>来实现按需打包。</p>
<p data-nodeid="1827">比如 <a href="https://github.com/ant-design/babel-plugin-import" data-nodeid="2031">babel-plugin-import</a> 这个插件，它是 antd 团队推出的一个 Babel 插件，我们通过一个例子来理解它的原理，比如：</p>
<pre class="lang-java" data-nodeid="1828"><code data-language="java"><span class="hljs-keyword">import</span> {Button as Btn,Input,TimePicker,ConfigProvider,Haaaa} from <span class="hljs-string">'antd'</span>
</code></pre>
<p data-nodeid="1829">这样的代码就可以被编译为：</p>
<pre class="lang-java" data-nodeid="1830"><code data-language="java"><span class="hljs-keyword">import</span> _ConfigProvider from <span class="hljs-string">"antd/lib/config-provider"</span>;
<span class="hljs-keyword">import</span> _Button from <span class="hljs-string">"antd/lib/button"</span>;
<span class="hljs-keyword">import</span> _Input from <span class="hljs-string">"antd/lib/input"</span>;
<span class="hljs-keyword">import</span> _TimePicker from <span class="hljs-string">"antd/lib/time-picker"</span>;
</code></pre>
<p data-nodeid="1831">编写一个类似的 Babel 插件也不是一件难事，Babel 插件核心依赖于对 AST 的解析和操作。它本质上就是一个函数，在 Babel 对 AST 语法树进行转换的过程中介入，通过相应的操作，最终让生成的结果发生改变。</p>
<p data-nodeid="1832">Babel 已经内置了几个核心分析、操作 AST 的工具集，Babel 插件通过<strong data-nodeid="2040">观察者 + 访问者模式</strong>，对 AST 节点统一遍历，因此具备了良好的扩展性和灵活性。比如这段代码：</p>
<pre class="lang-java" data-nodeid="1833"><code data-language="java">   <span class="hljs-keyword">import</span> {Button as Btn, Input} from <span class="hljs-string">'antd'</span>
</code></pre>
<p data-nodeid="1834">这样的代码，经过 Babel AST 分析后，得到结构：</p>
<pre class="lang-java" data-nodeid="1835"><code data-language="java">{
    <span class="hljs-string">"type"</span>: <span class="hljs-string">"ImportDeclaration"</span>,
    <span class="hljs-string">"specifiers"</span>: [
        {
            <span class="hljs-string">"type"</span>: <span class="hljs-string">"ImportSpecifier"</span>,
            <span class="hljs-string">"imported"</span>: {
                <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                <span class="hljs-string">"loc"</span>: {
                    <span class="hljs-string">"identifierName"</span>: <span class="hljs-string">"Button"</span>
                },
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"Button"</span>
            },
            <span class="hljs-string">"importKind"</span>: <span class="hljs-keyword">null</span>,
            <span class="hljs-string">"local"</span>: {
                <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                <span class="hljs-string">"loc"</span>: {
                    <span class="hljs-string">"identifierName"</span>: <span class="hljs-string">"Btn"</span>
                },
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"Btn"</span>
            }
        },
        {
            <span class="hljs-string">"type"</span>: <span class="hljs-string">"ImportSpecifier"</span>,
            <span class="hljs-string">"imported"</span>: {
                <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                <span class="hljs-string">"loc"</span>: {
                    <span class="hljs-string">"identifierName"</span>: <span class="hljs-string">"Input"</span>
                },
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"Input"</span>
            },
            <span class="hljs-string">"importKind"</span>: <span class="hljs-keyword">null</span>,
            <span class="hljs-string">"local"</span>: {
                <span class="hljs-string">"type"</span>: <span class="hljs-string">"Identifier"</span>,
                <span class="hljs-string">"start"</span>: <span class="hljs-number">23</span>,
                <span class="hljs-string">"end"</span>: <span class="hljs-number">28</span>,
                <span class="hljs-string">"loc"</span>: {
                    <span class="hljs-string">"identifierName"</span>: <span class="hljs-string">"Input"</span>
                },
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"Input"</span>
            }
        }
    ],
    <span class="hljs-string">"importKind"</span>: <span class="hljs-string">"value"</span>,
    <span class="hljs-string">"source"</span>: {
        <span class="hljs-string">"type"</span>: <span class="hljs-string">"StringLiteral"</span>,
        <span class="hljs-string">"value"</span>: <span class="hljs-string">"antd"</span>
    }
}
</code></pre>
<p data-nodeid="1836">通过上述结构，我们很容易实现遍历 specifiers 属性，至于更改最后代码的 import 部分，你可以参考 <a href="https://github.com/ant-design/babel-plugin-import/blob/master/src/Plugin.js" data-nodeid="2045">babel-plugin-import 相关处理逻辑</a>。</p>
<p data-nodeid="1837">首先通过<code data-backticks="1" data-nodeid="2048">buildExpressionHandler</code>方法对 import 路径进行改写：</p>
<pre class="lang-java" data-nodeid="1838"><code data-language="java">buildExpressionHandler(node, props, path, state) {
    <span class="hljs-comment">// 获取文件</span>
    <span class="hljs-keyword">const</span> file = (path &amp;&amp; path.hub &amp;&amp; path.hub.file) || (state &amp;&amp; state.file);
    <span class="hljs-keyword">const</span> { types } = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">const</span> pluginState = <span class="hljs-keyword">this</span>.getPluginState(state);
    <span class="hljs-comment">// 进行遍历</span>
    props.forEach(prop =&gt; {
      <span class="hljs-keyword">if</span> (!types.isIdentifier(node[prop])) <span class="hljs-keyword">return</span>;
      <span class="hljs-keyword">if</span> (
        pluginState.specified[node[prop].name] &amp;&amp;
        types.isImportSpecifier(path.scope.getBinding(node[prop].name).path)
      ) {
        <span class="hljs-comment">// 修改路径内容</span>
        node[prop] = <span class="hljs-keyword">this</span>.importMethod(pluginState.specified[node[prop].name], file, pluginState); <span class="hljs-comment">// eslint-disable-line</span>
      }
    });
}
</code></pre>
<p data-nodeid="1839"><code data-backticks="1" data-nodeid="2050">buildExpressionHandler</code>方法依赖<code data-backticks="1" data-nodeid="2052">importMethod</code>方法：</p>
<pre class="lang-java" data-nodeid="1840"><code data-language="java">importMethod(methodName, file, pluginState) {
    <span class="hljs-keyword">if</span> (!pluginState.selectedMethods[methodName]) {
      <span class="hljs-keyword">const</span> { style, libraryDirectory } = <span class="hljs-keyword">this</span>;
      <span class="hljs-comment">// 获取执行方法名</span>
      <span class="hljs-keyword">const</span> transformedMethodName = <span class="hljs-keyword">this</span>.camel2UnderlineComponentName <span class="hljs-comment">// eslint-disable-line</span>
        ? transCamel(methodName, <span class="hljs-string">'_'</span>)
        : <span class="hljs-keyword">this</span>.camel2DashComponentName
        ? transCamel(methodName, <span class="hljs-string">'-'</span>)
        : methodName;
      <span class="hljs-comment">// 获取相应路径</span>
      <span class="hljs-keyword">const</span> path = winPath(
        <span class="hljs-keyword">this</span>.customName
          ? <span class="hljs-keyword">this</span>.customName(transformedMethodName, file)
          : join(<span class="hljs-keyword">this</span>.libraryName, libraryDirectory, transformedMethodName, <span class="hljs-keyword">this</span>.fileName), <span class="hljs-comment">// eslint-disable-line</span>
      );
      pluginState.selectedMethods[methodName] = <span class="hljs-keyword">this</span>.transformToDefaultImport <span class="hljs-comment">// eslint-disable-line</span>
        ? addDefault(file.path, path, { nameHint: methodName })
        : addNamed(file.path, methodName, path);
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.customStyleName) {
        <span class="hljs-keyword">const</span> stylePath = winPath(<span class="hljs-keyword">this</span>.customStyleName(transformedMethodName));
        addSideEffect(file.path, `${stylePath}`);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.styleLibraryDirectory) {
        <span class="hljs-keyword">const</span> stylePath = winPath(
          join(<span class="hljs-keyword">this</span>.libraryName, <span class="hljs-keyword">this</span>.styleLibraryDirectory, transformedMethodName, <span class="hljs-keyword">this</span>.fileName),
        );
        addSideEffect(file.path, `${stylePath}`);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (style === <span class="hljs-keyword">true</span>) {
        addSideEffect(file.path, `${path}/style`);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (style === <span class="hljs-string">'css'</span>) {
        addSideEffect(file.path, `${path}/style/css`);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (typeof style === <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">const</span> stylePath = style(path, file);
        <span class="hljs-keyword">if</span> (stylePath) {
          addSideEffect(file.path, stylePath);
        }
      }
    }
    <span class="hljs-keyword">return</span> { ...pluginState.selectedMethods[methodName] };
}
</code></pre>
<p data-nodeid="1841"><code data-backticks="1" data-nodeid="2054">importMethod</code>方法调用了<code data-backticks="1" data-nodeid="2056">@babel/helper-module-imports</code>中的<code data-backticks="1" data-nodeid="2058">addSideEffect</code>方法执行路径的转换操作。<code data-backticks="1" data-nodeid="2060">addSideEffect</code>方法在源码中通过实例化一个 Import Injector，并调用实例方法完成了 AST 转换，具体源码可以参考：<a href="https://github.com/babel/babel/blob/eea156b2cb8deecfcf82d52aa1b71ba4995c7d68/packages/babel-helper-module-imports/src/index.js" data-nodeid="2064">babel-helper-module-imports</a>。</p>
<p data-nodeid="1842">现在我们已经看完了按需加载打包内容，接下来，我们看看动态导入以及按需加载这个重要概念。</p>
<h4 data-nodeid="1843">“重新认识” dynamic import（动态导入）</h4>
<p data-nodeid="1844">ES module 无疑在工程化方面给前端插上了一双起飞的翅膀。溯源历史我们发现：早期 import 是完全静态化的，而如今 dynamic import 的提案早已横空出世，目前已经进入了 stage 4 阶段。dynamic import 简单翻译为动态导入，从名字上看，我们就能知晓这个新特性和按需加载密不可分。但在深入讲解 dynamic import 之前，我想先从静态导入说起，以帮助你全方位地理解。</p>
<p data-nodeid="1845"><strong data-nodeid="2072">静态导入的性能优劣</strong></p>
<p data-nodeid="1846">标准用法的 import 属于静态导入，它只支持一个字符串类型的 module specifier（模块路径声明），这样的特性会使所有<strong data-nodeid="2078">被 import 的模块在加载时就被编译</strong>。从某些角度看，这种做法对于绝大多数场景来说性能是友好的，因为这意味着对工程代码的静态分析成为可能，进而使得类似 tree-shaking 的技术有了应用空间。</p>
<p data-nodeid="1847">但是对于一些特殊场景，静态导入也可能成为性能的短板，比如，当我们需要：</p>
<ul data-nodeid="1848">
<li data-nodeid="1849">
<p data-nodeid="1850">按需加载一个模块；</p>
</li>
<li data-nodeid="1851">
<p data-nodeid="1852">按运行事件选定一个模块。</p>
</li>
</ul>
<p data-nodeid="1853">此时，dynamic import 就变得尤为重要。比如在<strong data-nodeid="2087">浏览器侧，根据用户的系统语言选择加载不同的语言模块，根据用户的操作去加载不同的内容逻辑</strong>。</p>
<p data-nodeid="1854"><a href="https://developer.mozilla.org/en-us/docs/web/javascript/reference/statements/import" data-nodeid="2090">MDN 文档</a>中给出了 dynamic import 更具体的使用场景：</p>
<ul data-nodeid="8619">
<li data-nodeid="8620">
<p data-nodeid="8621">静态导入的模块很明显降低了代码的加载速度且被使用的可能性很低，或者并不需要马上使用它；</p>
</li>
<li data-nodeid="8622">
<p data-nodeid="8623">静态导入的模块很明显占用了大量系统内存且被使用的可能性很低；</p>
</li>
<li data-nodeid="8624">
<p data-nodeid="8625">被导入的模块在加载时并不存在，需要异步获取；</p>
</li>
<li data-nodeid="8626">
<p data-nodeid="8627">导入模块的说明符，需要动态构建（静态导入只能使用静态说明符）；</p>
</li>
<li data-nodeid="8628">
<p data-nodeid="8629" class="te-preview-highlight">被导入的模块有副作用（可以理解为模块中会直接运行的代码），这些副作用只有在触发某些条件时才被需要。</p>
</li>
</ul>




<p data-nodeid="1866"><strong data-nodeid="2100">深入理解 dynamic import（动态导入）</strong></p>
<p data-nodeid="1867">这里我们不再赘述 dynamic import 的标准用法，你可以从<a href="https://tc39.es/proposal-dynamic-import/#sec-import-calls" data-nodeid="2104">官方规范</a>和 <a href="https://github.com/tc39/proposal-dynamic-import" data-nodeid="2108">tc39 proposal</a> 中找到最全面和原始的内容。</p>
<p data-nodeid="1868">除了基础用法，我想从语言层面强调一个 Function-like 的概念。我们先看这样一段代码：</p>
<pre class="lang-java" data-nodeid="1869"><code data-language="java">// html 部分
&lt;nav&gt;
  &lt;a href="" data-script-path="books"&gt;Books&lt;/a&gt;
  &lt;a href="" data-script-path="movies"&gt;Movies&lt;/a&gt;
  &lt;a href="" data-script-path="video-games"&gt;Video Games&lt;/a&gt;
&lt;/nav&gt;
&lt;div id="content"&gt;
&lt;/div&gt;
// script 部分
&lt;script&gt;
  // 获取 element
  const contentEle = document.querySelector('#content');
  const links = document.querySelectorAll('nav &gt; a');
  // 遍历绑定点击逻辑
  for (const link of links) {
    link.addEventListener('click', async (event) =&gt; {
      event.preventDefault();
      try {
        const asyncScript = await import(`/${link.dataset.scriptPath}.js`);
        // 异步加载脚本
        asyncScript.loadContentTo(contentEle);
      } catch (error) {
        contentEle.textContent = `We got error: ${error.message}`;
      }
    });
  }
&lt;/script&gt;
</code></pre>
<p data-nodeid="1870">点击页面当中的 a 标签后，会动态加载一个模块，并调用模块定义的 loadContentTo 方法完成页面内容的填充。</p>
<p data-nodeid="1871">表面上看，await import() 的用法使得 import 像一个函数，该函数通过 () 操作符调用并返回一个 Promise。事实上，<strong data-nodeid="2117">dynamic import 只是一个 function like 的语法形式</strong>。在 ES class 特性中，super() 与 dynamic import 类似，也是一个 function like 语法形式。所以它和函数还是有着本质的区别，比如：</p>
<ul data-nodeid="1872">
<li data-nodeid="1873">
<p data-nodeid="1874">dynamic import 并非继承自 Function.prototype，因此不能使用 Function 构造函数原型上的方法 impoort.call(null, <code data-backticks="1" data-nodeid="2119">${path}</code>)，调用它是不合法的；</p>
</li>
<li data-nodeid="1875">
<p data-nodeid="1876">dynamic import 并非继承自 Object.prototype，因此不能使用 Object 构造函数原型上的方法。</p>
</li>
</ul>
<p data-nodeid="1877">虽然 dynamic import 并不是一个真正意义上的函数，但我们可以通过实现一个 dynamicImport 函数模式来实现 dynamic import，进一步加深对其语法特性的理解。</p>
<p data-nodeid="1878"><strong data-nodeid="2126">实现一个 dynamic import（动态导入）</strong></p>
<p data-nodeid="1879">dynamicImport 函数实现如下：</p>
<pre class="lang-java" data-nodeid="1880"><code data-language="java"><span class="hljs-keyword">const</span> importModule = url =&gt; {
  <span class="hljs-comment">// 返回一个新的 Promise 实例</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise((resolve, reject) =&gt; {
    <span class="hljs-comment">// 创建 script 标签</span>
    <span class="hljs-keyword">const</span> script = document.createElement(<span class="hljs-string">"script"</span>);

    <span class="hljs-keyword">const</span> tempGlobal = <span class="hljs-string">"__tempModuleLoadingVariable"</span> + Math.random().toString(<span class="hljs-number">32</span>).substring(<span class="hljs-number">2</span>);

    script.type = <span class="hljs-string">"module"</span>;
    script.textContent = `<span class="hljs-keyword">import</span> * as m from <span class="hljs-string">"${url}"</span>; window.${tempGlobal} = m;`;
    <span class="hljs-comment">// load 回调</span>
    script.onload = () =&gt; {
      resolve(window[tempGlobal]);
      delete window[tempGlobal];
      script.remove();
    };
    <span class="hljs-comment">// error 回调</span>
    script.onerror = () =&gt; {
      reject(<span class="hljs-keyword">new</span> Error(<span class="hljs-string">"Failed to load module script with URL "</span> + url));
      delete window[tempGlobal];
      script.remove();
    };
    document.documentElement.appendChild(script);
  });
}
</code></pre>
<p data-nodeid="1881">这里，我们通过动态插入一个 script 标签实现对目标 script url 的加载，并通过将模块导出内容赋值给 window 对象。我们使用<code data-backticks="1" data-nodeid="2129">__tempModuleLoadingVariable" + Math.random().toString(32).substring(2) key</code>保证模块导出对象的命名不会出现冲突。</p>
<p data-nodeid="1882">至此，我们对 dynamic import 的分析告一段落。总之，代码拆分和按需加载并不完全是工程化的实施，同时也要求对语言深刻掌握。</p>
<h3 data-nodeid="1883">Webpack 赋能代码拆分和按需加载</h3>
<p data-nodeid="1884">通过前面的学习，我们了解了代码拆分和按需加载，学习了动态导入这一特性。接下来，我想请你思考，如何在代码中安全地使用动态导入而不用去过多关心浏览器的兼容情况，如何在工程环境中实现代码拆分和按需加载呢？</p>
<p data-nodeid="1885">以最常见、最典型的前端构建工具——Webpack 为例，我们来分析如何在 Webpack 环境下支持代码拆分和按需加载。</p>
<p data-nodeid="1886">总的来说，Webpack 提供了三种相关能力：</p>
<ul data-nodeid="1887">
<li data-nodeid="1888">
<p data-nodeid="1889"><strong data-nodeid="2139">通过入口配置手动分割代码；</strong></p>
</li>
<li data-nodeid="1890">
<p data-nodeid="1891"><strong data-nodeid="2143">动态导入支持；</strong></p>
</li>
<li data-nodeid="1892">
<p data-nodeid="1893"><strong data-nodeid="2148">通过 splitChunk 插件提取公共代码（公共代码分割）</strong>。</p>
</li>
</ul>
<p data-nodeid="1894">其中第一种是通过配置 Entry 来由开发者手动进行代码项目打包，与我们这节内容主题并不相关，就不展开讲解了。下面我们从动态导入和 splitChunk 插件进行详细解析。</p>
<h4 data-nodeid="1895">Webpack 对 dynamic import 能力支持</h4>
<p data-nodeid="1896">事实上，在 Webpack 早期版本中，提供了 require.ensure() 能力。请注意这是 Webpack 特有的实现：<strong data-nodeid="2156">require.ensure() 能够将其参数对应的文件拆分到一个单独的 bundle 中，此 bundle 会被异步加载</strong>。</p>
<p data-nodeid="1897">目前 require.ensure() 已经被符合 ES 规范的 dynamic import 取代。调用 import()，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。值得学习的是，Webpack 对于 import() 的支持和处理非常“巧妙”，我们知道 ES 中关于 dynamic import 的规范，只接受一个参数，表示模块的路径：</p>
<pre class="lang-java" data-nodeid="1898"><code data-language="java"><span class="hljs-keyword">import</span>(`${path}`) -&gt; Promise
</code></pre>
<p data-nodeid="1899">但是 Webpack 是一个构建工具，Webpack 中对于 import() 的处理，可以通过注释接收一些特殊的参数，无须破坏 ES 对于 dynamic import 规定。比如：</p>
<pre class="lang-java" data-nodeid="1900"><code data-language="java"><span class="hljs-keyword">import</span>(
  <span class="hljs-comment">/* webpackChunkName: "chunk-name" */</span>
  <span class="hljs-comment">/* webpackMode: "lazy" */</span>
  <span class="hljs-string">'module'</span>
);
</code></pre>
<p data-nodeid="3155" class="">Webpack 在构建时，可以读取到 import 参数，即便是参数内的注释部分，Webpack 也可以获取并处理。如上述代码，<code data-backticks="1" data-nodeid="3157">webpackChunkName: "chunk-name"</code>表示自定义新 chunk 名称；<code data-backticks="1" data-nodeid="3159">webpackMode: "lazy"</code>表示每个 import() 导入的模块，会生成一个可延迟加载（lazy-loadable） chunk。此外，webpackMode 的取值还可以是 lazy-once、eager、weak，具体含义可参考：<a href="https://www.webpackjs.com/api/module-methods/#import-" data-nodeid="3163">Webpack import()</a>。</p>


<p data-nodeid="1902">你可能很好奇：Webpack 在编译构建时，会如何处理代码中的 dynamic import 呢？下面，我们一探究竟。</p>
<p data-nodeid="1903">index.js 文件：</p>
<pre class="lang-java" data-nodeid="1904"><code data-language="java"><span class="hljs-keyword">import</span>(<span class="hljs-string">'./module'</span>).then((data) =&gt; {
  console.log(data)
});
</code></pre>
<p data-nodeid="1905">module.js 文件：</p>
<pre class="lang-java" data-nodeid="1906"><code data-language="java"><span class="hljs-keyword">const</span> <span class="hljs-keyword">module</span> = {
	value: <span class="hljs-string">'moduleValue'</span>
}
export <span class="hljs-keyword">default</span> <span class="hljs-keyword">module</span>
</code></pre>
<p data-nodeid="1907">我们配置入口文件为 index.js，输出文件为 bundle.js，简单的 Webpack 配置信息（webpack@4.44.2）：</p>
<pre class="lang-java" data-nodeid="1908"><code data-language="java"><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  mode: <span class="hljs-string">'development'</span>,
  entry: <span class="hljs-string">'./index.js'</span>,
  output: {
    filename: <span class="hljs-string">'bundle.js'</span>,
    path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
  },
};
</code></pre>
<p data-nodeid="1909">运行构建命令后，得到两个文件：</p>
<ul data-nodeid="1910">
<li data-nodeid="1911">
<p data-nodeid="1912">0.bundle.js</p>
</li>
<li data-nodeid="1913">
<p data-nodeid="1914">bundle.js</p>
</li>
</ul>
<p data-nodeid="1915">bundle.js 中对 index.js dynamic import 编译结果为：</p>
<pre class="lang-java" data-nodeid="1916"><code data-language="java"><span class="hljs-comment">/******/</span> ({
<span class="hljs-comment">/***/</span> <span class="hljs-string">"./index.js"</span>:
<span class="hljs-comment">/*!******************!*\
  !*** ./index.js ***!
  \******************/</span>
<span class="hljs-comment">/*! no static exports found */</span>
<span class="hljs-comment">/***/</span> (function(<span class="hljs-keyword">module</span>, <span class="hljs-keyword">exports</span>, __webpack_require__) {
eval(<span class="hljs-string">"__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./module */ \"./module.js\")).then((data) =&gt; {\n  console.log(data)\n});\n\n//# sourceURL=webpack:///./index.js?"</span>);
<span class="hljs-comment">/***/</span> })
<span class="hljs-comment">/******/</span> });
</code></pre>
<p data-nodeid="1917">由此可知，Webpack 对于业务中写到的 dynamic import 代码，会转换成了 Webpack 自己自定义的 webpack_require.e 函数，这个函数返回了一个 promise 数组，最终模拟出了动态导入的效果，webpack_require.e 源码如下：</p>
<pre class="lang-java" data-nodeid="1918"><code data-language="java"><span class="hljs-comment">/******/</span> 	<span class="hljs-comment">// This file contains only the entry chunk.</span>
<span class="hljs-comment">/******/</span> 	<span class="hljs-comment">// The chunk loading function for additional chunks</span>
<span class="hljs-comment">/******/</span> 	__webpack_require__.e = <span class="hljs-function">function <span class="hljs-title">requireEnsure</span><span class="hljs-params">(chunkId)</span> </span>{
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">var</span> promises = [];
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span> 		<span class="hljs-comment">// JSONP chunk loading for javascript</span>
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">var</span> installedChunkData = installedChunks[chunkId];
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">if</span>(installedChunkData !== <span class="hljs-number">0</span>) { <span class="hljs-comment">// 0 means "already installed".</span>
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span> 			<span class="hljs-comment">// a Promise means "currently loading".</span>
<span class="hljs-comment">/******/</span> 			<span class="hljs-keyword">if</span>(installedChunkData) {
<span class="hljs-comment">/******/</span> 				promises.push(installedChunkData[<span class="hljs-number">2</span>]);
<span class="hljs-comment">/******/</span> 			} <span class="hljs-keyword">else</span> {
<span class="hljs-comment">/******/</span> 				<span class="hljs-comment">// setup Promise in chunk cache</span>
<span class="hljs-comment">/******/</span> 				<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> Promise(function(resolve, reject) {
<span class="hljs-comment">/******/</span> 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
<span class="hljs-comment">/******/</span> 				});
<span class="hljs-comment">/******/</span> 				promises.push(installedChunkData[<span class="hljs-number">2</span>] = promise);
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span> 				<span class="hljs-comment">// start chunk loading</span>
<span class="hljs-comment">/******/</span> 				<span class="hljs-keyword">var</span> script = document.createElement(<span class="hljs-string">'script'</span>);
<span class="hljs-comment">/******/</span> 				<span class="hljs-keyword">var</span> onScriptComplete;
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span> 				script.charset = <span class="hljs-string">'utf-8'</span>;
<span class="hljs-comment">/******/</span> 				script.timeout = <span class="hljs-number">120</span>;
<span class="hljs-comment">/******/</span> 				<span class="hljs-keyword">if</span> (__webpack_require__.nc) {
<span class="hljs-comment">/******/</span> 					script.setAttribute(<span class="hljs-string">"nonce"</span>, __webpack_require__.nc);
<span class="hljs-comment">/******/</span> 				}
<span class="hljs-comment">/******/</span> 				script.src = jsonpScriptSrc(chunkId);
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span> 				<span class="hljs-comment">// create error before stack unwound to get useful stacktrace later</span>
<span class="hljs-comment">/******/</span> 				<span class="hljs-keyword">var</span> error = <span class="hljs-keyword">new</span> Error();
<span class="hljs-comment">/******/</span> 				onScriptComplete = function (event) {
<span class="hljs-comment">/******/</span> 					<span class="hljs-comment">// avoid mem leaks in IE.</span>
<span class="hljs-comment">/******/</span> 					script.onerror = script.onload = <span class="hljs-keyword">null</span>;
<span class="hljs-comment">/******/</span> 					clearTimeout(timeout);
<span class="hljs-comment">/******/</span> 					<span class="hljs-keyword">var</span> chunk = installedChunks[chunkId];
<span class="hljs-comment">/******/</span> 					<span class="hljs-keyword">if</span>(chunk !== <span class="hljs-number">0</span>) {
<span class="hljs-comment">/******/</span> 						<span class="hljs-keyword">if</span>(chunk) {
<span class="hljs-comment">/******/</span> 							<span class="hljs-keyword">var</span> errorType = event &amp;&amp; (event.type === <span class="hljs-string">'load'</span> ? <span class="hljs-string">'missing'</span> : event.type);
<span class="hljs-comment">/******/</span> 							<span class="hljs-keyword">var</span> realSrc = event &amp;&amp; event.target &amp;&amp; event.target.src;
<span class="hljs-comment">/******/</span> 							error.message = <span class="hljs-string">'Loading chunk '</span> + chunkId + <span class="hljs-string">' failed.\n('</span> + errorType + <span class="hljs-string">': '</span> + realSrc + <span class="hljs-string">')'</span>;
<span class="hljs-comment">/******/</span> 							error.name = <span class="hljs-string">'ChunkLoadError'</span>;
<span class="hljs-comment">/******/</span> 							error.type = errorType;
<span class="hljs-comment">/******/</span> 							error.request = realSrc;
<span class="hljs-comment">/******/</span> 							chunk[<span class="hljs-number">1</span>](error);
<span class="hljs-comment">/******/</span> 						}
<span class="hljs-comment">/******/</span> 						installedChunks[chunkId] = undefined;
<span class="hljs-comment">/******/</span> 					}
<span class="hljs-comment">/******/</span> 				};
<span class="hljs-comment">/******/</span> 				<span class="hljs-keyword">var</span> timeout = setTimeout(function(){
<span class="hljs-comment">/******/</span> 					onScriptComplete({ type: <span class="hljs-string">'timeout'</span>, target: script });
<span class="hljs-comment">/******/</span> 				}, <span class="hljs-number">120000</span>);
<span class="hljs-comment">/******/</span> 				script.onerror = script.onload = onScriptComplete;
<span class="hljs-comment">/******/</span> 				document.head.appendChild(script);
<span class="hljs-comment">/******/</span> 			}
<span class="hljs-comment">/******/</span> 		}
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">return</span> Promise.all(promises);
<span class="hljs-comment">/******/</span> 	};
</code></pre>
<p data-nodeid="1919">代码已经非常直观，webpack_require.e 主要做了如下内容：</p>
<ul data-nodeid="1920">
<li data-nodeid="1921">
<p data-nodeid="1922">定义一个 promise 数组 promises，最终以 Promise.all(promises) 形式返回；</p>
</li>
<li data-nodeid="1923">
<p data-nodeid="1924">通过 installedChunkData 变量判断当前模块是否已经被加载，如果已经加载过，将模块内容 push 到 promises 数组中；</p>
</li>
<li data-nodeid="1925">
<p data-nodeid="1926">如果当前模块没有被加载过，则先定义一个 promise，然后创建一个 script 标签，加载模块内容，并定义此 script 的 onload 和 onerror 回调；</p>
</li>
<li data-nodeid="1927">
<p data-nodeid="1928">最终对新增 script 标签对应的 promise （resolve/reject）处理定义在 webpackJsonpCallback 函数中。</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="1929"><code data-language="java"><span class="hljs-comment">/******/</span> 	<span class="hljs-function">function <span class="hljs-title">webpackJsonpCallback</span><span class="hljs-params">(data)</span> </span>{
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">var</span> chunkIds = data[<span class="hljs-number">0</span>];
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">var</span> moreModules = data[<span class="hljs-number">1</span>];
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span> 		<span class="hljs-comment">// add "moreModules" to the modules object,</span>
<span class="hljs-comment">/******/</span> 		<span class="hljs-comment">// then flag all "chunkIds" as loaded and fire callback</span>
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">var</span> moduleId, chunkId, i = <span class="hljs-number">0</span>, resolves = [];
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">for</span>(;i &lt; chunkIds.length; i++) {
<span class="hljs-comment">/******/</span> 			chunkId = chunkIds[i];
<span class="hljs-comment">/******/</span> 			<span class="hljs-keyword">if</span>(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) &amp;&amp; installedChunks[chunkId]) {
<span class="hljs-comment">/******/</span> 				resolves.push(installedChunks[chunkId][<span class="hljs-number">0</span>]);
<span class="hljs-comment">/******/</span> 			}
<span class="hljs-comment">/******/</span> 			installedChunks[chunkId] = <span class="hljs-number">0</span>;
<span class="hljs-comment">/******/</span> 		}
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">for</span>(moduleId in moreModules) {
<span class="hljs-comment">/******/</span> 			<span class="hljs-keyword">if</span>(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
<span class="hljs-comment">/******/</span> 				modules[moduleId] = moreModules[moduleId];
<span class="hljs-comment">/******/</span> 			}
<span class="hljs-comment">/******/</span> 		}
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">if</span>(parentJsonpFunction) parentJsonpFunction(data);
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span> 		<span class="hljs-keyword">while</span>(resolves.length) {
<span class="hljs-comment">/******/</span> 			resolves.shift()();
<span class="hljs-comment">/******/</span> 		}
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span> 	};
</code></pre>
<p data-nodeid="1930">完整的源码内容我们不再一一粘贴，你可以参考下图的整个处理流程：</p>
<p data-nodeid="1931"><img src="https://s0.lgstatic.com/i/image2/M01/05/28/Cip5yF_9BziALsMpAAFUvdp7KoQ251.png" alt="Drawing 1.png" data-nodeid="2191"></p>
<div data-nodeid="1932"><p style="text-align:center">webpack_require.e 处理流程图</p></div>
<h4 data-nodeid="1933">Webpack 中 splitChunk 插件和代码分割</h4>
<p data-nodeid="1934">你可能对 Webpack 4.0 版本推出的 splitChunk 插件并不陌生。这里需要注意的是，<strong data-nodeid="2206">代码分割区别于动态加载，它们本质上是两个概念</strong>。前文介绍到的 dynamic import（动态导入）技术本质上一种是懒加载——<strong data-nodeid="2207">按需加载</strong>，即只有在需要的时候，才加载代码。而以 splitChunk 插件为代表的代码分割，是一种<strong data-nodeid="2208">代码拆包</strong>技术，与代码合并打包是一个相逆的过程。</p>
<p data-nodeid="1935">代码分割的核心意义在于<strong data-nodeid="2214">避免重复打包以及提升缓存利用率，进而提升访问速度</strong>。比如，我们将不常变化的第三方依赖库进行代码拆分，方便对第三方依赖库缓存，同时抽离公共逻辑，减少单个文件的 size 大小。</p>
<p data-nodeid="1936">了解了代码分割的概念，那么就很好理解 Webpack splitChunk 插件满足下述条件时，自动进行代码分割：</p>
<ul data-nodeid="4972">
<li data-nodeid="4973">
<p data-nodeid="4974">可以被共享的（即重复被引用的）模块或者 node_modules 中的模块；</p>
</li>
<li data-nodeid="4975">
<p data-nodeid="4976" class="">在压缩前体积大于 30KB 的模块；</p>
</li>
<li data-nodeid="4977">
<p data-nodeid="4978">在按需加载模块时，并行加载的模块不得超过 5 个；</p>
</li>
<li data-nodeid="4979">
<p data-nodeid="4980">在页面初始化加载时，并行加载的模块不得超过 3 个。</p>
</li>
</ul>


<p data-nodeid="1946">当然，上述配置数据是完全可以由开发者掌握主动权，并根据项目实际情况进行调整的。更多内容可以参考：<a href="https://www.webpackjs.com/plugins/split-chunks-plugin/" data-nodeid="2225">split-chunks-plugin</a>。不过需要注意的是，关于 splitChunk 插件的默认参数是 Webpack 团队所设定的通用性优化手段，是经过“千挑万选”确定的，因此适用于多数开发场景。<strong data-nodeid="2231">如果在没有实践测量的情况下，不建议开发者手动优化这些参数</strong>。</p>
<p data-nodeid="1947">另外， Webpack splitChunk 插件也支持上文提到的“按需加载”，即可以和 dynamic import 搭配使用。比如，page1 和 page2 页面里动态引入 async.js，即 page1.js 和 page2.js 都有这样的逻辑：</p>
<pre class="lang-java" data-nodeid="1948"><code data-language="java"><span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "async.js" */</span><span class="hljs-string">"./async"</span>).then(common =&gt; {
 console.log(common);
})
</code></pre>
<p data-nodeid="1949">在进行构建后，async.js 会被单独打包。如果进一步在 async.js 文件中引入 module.js 模块，即 async.js 中的代码如下所示：</p>
<pre class="lang-java" data-nodeid="1950"><code data-language="java"><span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "module.js" */</span><span class="hljs-string">"./module.js"</span>).then(<span class="hljs-keyword">module</span> =&gt; {
 console.log(<span class="hljs-keyword">module</span>);
})
</code></pre>
<p data-nodeid="1951">依赖关系图如下图所示：</p>
<p data-nodeid="1952"><img src="https://s0.lgstatic.com/i/image/M00/8D/58/CgqCHl_9YFqAKybyAAGp092kEyI435.png" alt="Lark20210112-163942.png" data-nodeid="2237"></p>
<div data-nodeid="1953"><p style="text-align:center">三重依赖关系图</p></div>
<p data-nodeid="1954">最终打包结果会按需动态引入 async.js，同时 module.js 也被成功单独拆分出来。</p>
<h3 data-nodeid="1955">总结</h3>
<p data-nodeid="1956">这一讲我们就代码拆分和按需加载这一话题进行了分析：</p>
<ul data-nodeid="1957">
<li data-nodeid="1958">
<p data-nodeid="1959">首先从代码拆分和按需加载的业务场景入手，分析了这一技术手段的必要性和业务价值；</p>
</li>
<li data-nodeid="1960">
<p data-nodeid="1961">接着，我们从 ES 规范入手，深入解读了 dynamic import 动态加载这一核心语言特性，同时从 Tree Shaking 和编写 Babel 插件的角度，在较深层的语法和工程理念上对比了按需打包这一话题；</p>
</li>
<li data-nodeid="1962">
<p data-nodeid="1963">最后，我们通过对 Webpack 能力的探究，剖析了如何在工程中实现代码拆分和按需加载。</p>
</li>
</ul>
<p data-nodeid="1964"><img src="https://s0.lgstatic.com/i/image2/M01/05/34/CgpVE1_9YDyAVOWwAAel8VpUNt4885.png" alt="Lark20210112-163852.png" data-nodeid="2246"></p>
<p data-nodeid="1965">在实际工作中，我希望你能利用本节内容，并结合项目实际情况，排查代码拆分和按需加载是否合理；如果有不合理之处，可以动手实践、实验，进行论证。</p>
<p data-nodeid="1966" class="">本节内容既有理论内容，又有工程实践，只要你有“庖丁解牛”的决心，相信很快就有“入木三分”的理解。</p>

---

### 精选评论

##### *浩：
> 有庖丁解牛的决心很快就会有入木三分的理解，

##### cxl：
> 这篇很深入人心！

##### *俊：
> 赞👍🏻

