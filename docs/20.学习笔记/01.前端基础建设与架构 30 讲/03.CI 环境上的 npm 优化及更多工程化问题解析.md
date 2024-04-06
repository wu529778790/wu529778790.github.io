<p data-nodeid="1701" class="">前两讲，我们围绕着 npm 和 Yarn 的核心原理展开了讲解，实际上 npm 和 Yarn 涉及项目的方方面面，加之本身设计复杂度较高，这一讲我将继续讲解 CI 环境上的 npm 优化以及更多工程化相关问题。希望通过这一讲的学习你能够学习到 CI 环境上使用包管理工具的方方面面，并能够解决非本地环境下（一般是在容器上）使用包管理工具解决相关问题。</p>
<h3 data-nodeid="1702">CI 环境上的 npm 优化</h3>
<p data-nodeid="1703">CI 环境下的 npm 配置和开发者本地 npm 操作有些许不同，接下来我们一起看看 CI 环境上的 npm 相关优化。</p>
<h4 data-nodeid="1704">合理使用 npm ci 和 npm install</h4>
<p data-nodeid="1705">顾名思义，npm ci 就是专门为 CI 环境准备的安装命令，相比 npm install 它的不同之处在于：</p>
<ul data-nodeid="1706">
<li data-nodeid="1707">
<p data-nodeid="1708">npm ci 要求项目中必须存在 package-lock.json 或 npm-shrinkwrap.json；</p>
</li>
<li data-nodeid="1709">
<p data-nodeid="1710">npm ci 完全根据 package-lock.json 安装依赖，这可以保证整个开发团队都使用版本完全一致的依赖；</p>
</li>
<li data-nodeid="1711">
<p data-nodeid="1712">正因为 npm ci 完全根据 package-lock.json 安装依赖，在安装过程中，它不需要计算求解依赖满足问题、构造依赖树，因此安装过程会更加迅速；</p>
</li>
<li data-nodeid="1713">
<p data-nodeid="1714">npm ci 在执行安装时，会先删除项目中现有的 node_modules，然后全新安装；</p>
</li>
<li data-nodeid="1715">
<p data-nodeid="1716">npm ci 只能一次安装整个项目所有依赖包，无法安装单个依赖包；</p>
</li>
<li data-nodeid="1717">
<p data-nodeid="1718">如果 package-lock.json 和 package.json 冲突，那么 npm ci 会直接报错，并非更新 lockfiles；</p>
</li>
<li data-nodeid="1719">
<p data-nodeid="1720">npm ci 永远不会改变 package.json 和 package-lock.json。</p>
</li>
</ul>
<p data-nodeid="1721">基于以上特性，<strong data-nodeid="1898">我们在 CI 环境使用 npm ci 代替 npm install，一般会获得更加稳定、一致和迅速的安装体验</strong>。</p>
<blockquote data-nodeid="1722">
<p data-nodeid="1723">更多 npm ci 的内容你也可以在<a href="https://docs.npmjs.com/cli/ci.html" data-nodeid="1902">官网</a>查看。</p>
</blockquote>
<h4 data-nodeid="1724">使用 package-lock.json 优化依赖安装时间</h4>
<p data-nodeid="1725">上面提到过，对于应用项目，建议上传 package-lock.json 到仓库中，以保证依赖安装的一致性。事实上，如果项目中使用了 package-lock.json 一般还可以显著加速依赖安装时间。这是因为<strong data-nodeid="1910">package-lock.json 中已经缓存了每个包的具体版本和下载链接，你不需要再去远程仓库进行查询，即可直接进入文件完整性校验环节，减少了大量网络请求</strong>。</p>
<p data-nodeid="1726">除了上面所述内容，CI 环境上，缓存 node_modules 文件也是企业级使用包管理工具常用的优化做法。</p>
<h3 data-nodeid="1727">更多工程化相关问题解析</h3>
<p data-nodeid="1728">下面这部分，我将通过剖析几个问题，来加深你对这几讲学习概念的理解，以及对工程化中可能遇到的问题进行预演。</p>
<h4 data-nodeid="1729">为什么要 lockfiles，要不要提交 lockfiles 到仓库？</h4>
<p data-nodeid="1730">从 npm v5 版本开始，增加了 package-lock.json 文件。我们知道<strong data-nodeid="1924">package-lock.json 文件的作用是锁定依赖安装结构，目的是保证在任意机器上执行 npm install 都会得到完全相同的 node_modules 安装结果</strong>。</p>
<p data-nodeid="1731">你需要明确，为什么单一的 package.json 不能确定唯一的依赖树：</p>
<ul data-nodeid="1732">
<li data-nodeid="1733">
<p data-nodeid="1734">不同版本的 npm 的安装依赖策略和算法不同；</p>
</li>
<li data-nodeid="1735">
<p data-nodeid="1736">npm install 将根据 package.json 中的 semver-range version 更新依赖，某些依赖项自上次安装以来，可能已发布了新版本。</p>
</li>
</ul>
<p data-nodeid="1737">因此，<strong data-nodeid="1933">保证能够完整准确地还原项目依赖</strong>，就是 lockfiles 出现的原因。</p>
<p data-nodeid="1738">首先我们了解一下 package-lock.json 的作用机制。上一讲中我们已经解析了 yarn.lock 文件结构，这里我们看下 package-lock.json 的内容举例：</p>
<pre class="lang-java te-preview-highlight" data-nodeid="9785"><code data-language="java"><span class="hljs-string">"@babel/core"</span>: {
	  <span class="hljs-string">"version"</span>: <span class="hljs-string">"7.2.0"</span>,
	  <span class="hljs-string">"resolved"</span>: <span class="hljs-string">"http://www.npm.com/@babel%2fcore/-/core-7.2.0.tgz"</span>,
	  <span class="hljs-string">"integrity"</span>: <span class="hljs-string">"sha1-pN04FJAZmOkzQPAIbphn/voWOto="</span>,
	  <span class="hljs-string">"dev"</span>: <span class="hljs-keyword">true</span>,
	  <span class="hljs-string">"requires"</span>: {
	    <span class="hljs-string">"@babel/code-frame"</span>: <span class="hljs-string">"^7.0.0"</span>,
	    <span class="hljs-comment">// ...</span>
	  },
	  <span class="hljs-string">"dependencies"</span>: {
	    <span class="hljs-string">"@babel/generator"</span>: {
	      <span class="hljs-string">"version"</span>: <span class="hljs-string">"7.2.0"</span>,
	      <span class="hljs-string">"resolved"</span>: <span class="hljs-string">"http://www.npm.com/@babel%2fgenerator/-/generator-7.2.0.tgz"</span>,
	      <span class="hljs-string">"integrity"</span>: <span class="hljs-string">"sha1-6vOCH6AwHZ1K74jmPUvMGbc7oWw="</span>,
	      <span class="hljs-string">"dev"</span>: <span class="hljs-keyword">true</span>,
	      <span class="hljs-string">"requires"</span>: {
	        <span class="hljs-string">"@babel/types"</span>: <span class="hljs-string">"^7.2.0"</span>,
	        <span class="hljs-string">"jsesc"</span>: <span class="hljs-string">"^2.5.1"</span>,
	        <span class="hljs-string">"lodash"</span>: <span class="hljs-string">"^4.17.10"</span>,
	        <span class="hljs-string">"source-map"</span>: <span class="hljs-string">"^0.5.0"</span>,
	        <span class="hljs-string">"trim-right"</span>: <span class="hljs-string">"^1.0.1"</span>
	      }
	    },
	    <span class="hljs-comment">// ...</span>
	  }
	},
	<span class="hljs-comment">// ...</span>
}
</code></pre>










<p data-nodeid="1740">通过上述代码示例，我们看到：一个 package-lock.json 的 dependency 主要由以下部分构成。</p>
<ul data-nodeid="1741">
<li data-nodeid="1742">
<p data-nodeid="1743">Version：依赖包的版本号</p>
</li>
<li data-nodeid="1744">
<p data-nodeid="1745">Resolved：依赖包安装源（可简单理解为下载地址）</p>
</li>
<li data-nodeid="1746">
<p data-nodeid="1747">Integrity：表明包完整性的 Hash 值</p>
</li>
<li data-nodeid="1748">
<p data-nodeid="1749">Dev：表示该模块是否为顶级模块的开发依赖或者是一个的传递依赖关系</p>
</li>
<li data-nodeid="1750">
<p data-nodeid="1751">requires：依赖包所需要的所有依赖项，对应依赖包 package.json 里 dependencies 中的依赖项</p>
</li>
<li data-nodeid="1752">
<p data-nodeid="1753">dependencies：依赖包 node_modules 中依赖的包（特殊情况下才存在）</p>
</li>
</ul>
<p data-nodeid="1754">事实上，<strong data-nodeid="1951">并不是所有的子依赖都有 dependencies 属性，只有子依赖的依赖和当前已安装在根目录的 node_modules 中的依赖冲突之后，才会有这个属性</strong>。这就涉及嵌套情况的依赖管理，我已经在前文做了说明。</p>
<p data-nodeid="1755">至于要不要提交 lockfiles 到仓库？这就需要看项目定位决定了。</p>
<ul data-nodeid="1756">
<li data-nodeid="1757">
<p data-nodeid="1758">如果开发一个应用，我建议把 package-lock.json 文件提交到代码版本仓库。这样可以保证项目组成员、运维部署成员或者 CI 系统，在执行 npm install 后，能得到完全一致的依赖安装内容。</p>
</li>
<li data-nodeid="1759">
<p data-nodeid="1760">如果你的目标是开发一个给外部使用的库，那就要谨慎考虑了，因为<strong data-nodeid="1959">库项目一般是被其他项目依赖的，在不使用 package-lock.json 的情况下，就可以复用主项目已经加载过的包，减少依赖重复和体积</strong>。</p>
</li>
<li data-nodeid="1761">
<p data-nodeid="1762">如果我们开发的库依赖了一个精确版本号的模块，那么提交 lockfiles 到仓库可能会造成同一个依赖不同版本都被下载的情况。如果作为库开发者，真的有使用某个特定版本依赖的需要，一个更好的方式是<strong data-nodeid="1965">定义 peerDependencies</strong>。</p>
</li>
</ul>
<p data-nodeid="1763">因此，一个推荐的做法是：<strong data-nodeid="1971">把 package-lock.json 一起提交到代码库中，不需要 ignore。但是执行 npm publish 命令，发布一个库的时候，它应该被忽略而不是直接发布出去</strong>。</p>
<p data-nodeid="1764">理解上述概念并不够，对于 lockfiles 的处理，你需要更加精细。这里我列出几条建议供你参考。</p>
<ol data-nodeid="1765">
<li data-nodeid="1766">
<p data-nodeid="1767">早期 npm 锁定版本的方式是使用 npm-shrinkwrap.json，它与 package-lock.json 不同点在于：npm 包发布的时候默认将 npm-shrinkwrap.json 发布，因此类库或者组件需要慎重。</p>
</li>
<li data-nodeid="1768">
<p data-nodeid="1769">使用 package-lock.json 是 npm v5.x 版本新增特性，而 npm v5.6 以上才逐步稳定，在 5.0 - 5.6 中间，对 package-lock.json 的处理逻辑进行过几次更新。</p>
</li>
<li data-nodeid="1770">
<p data-nodeid="1771">在 npm v5.0.x 版本中，npm install 时都会根据 package-lock.json 文件下载，不管 package.json 内容究竟是什么。</p>
</li>
<li data-nodeid="1772">
<p data-nodeid="1773">npm v5.1.0 版本到 npm v5.4.2，npm install 会无视 package-lock.json 文件，会去下载最新的 npm 包并且更新 package-lock.json。</p>
</li>
<li data-nodeid="1774">
<p data-nodeid="1775">npm 5.4.2 版本后：</p>
</li>
</ol>
<ul data-nodeid="1776">
<li data-nodeid="1777">
<p data-nodeid="1778">如果项目中只有 package.json 文件，npm install 之后，会根据它生成一个 package-lock.json 文件；</p>
</li>
<li data-nodeid="1779">
<p data-nodeid="1780">如果项目中存在 package.json 和 package-lock.json 文件，同时 package.json 的 semver-range 版本 和 package-lock.json 中版本兼容，即使此时有新的适用版本，npm install 还是会根据 package-lock.json 下载；</p>
</li>
<li data-nodeid="1781">
<p data-nodeid="1782">如果项目中存在 package.json 和 package-lock.json 文件，同时 package.json 的 semver-range 版本和 package-lock.json 中版本不兼容，npm install 时 package-lock.json 将会更新到兼容 package.json 的版本；</p>
</li>
<li data-nodeid="1783">
<p data-nodeid="1784">如果 package-lock.json 和 npm-shrinkwrap.json 同时存在于项目根目录，package-lock.json 将会被忽略。</p>
</li>
</ul>
<p data-nodeid="1785">以上内容你可以结合 01 讲中 npm 安装流程进一步理解。</p>
<h4 data-nodeid="1786">为什么有 xxxDependencies？</h4>
<p data-nodeid="1787">npm 设计了以下几种依赖类型声明：</p>
<ul data-nodeid="1788">
<li data-nodeid="1789">
<p data-nodeid="1790">dependencies 项目依赖</p>
</li>
<li data-nodeid="1791">
<p data-nodeid="1792">devDependencies 开发依赖</p>
</li>
<li data-nodeid="1793">
<p data-nodeid="1794">peerDependencies 同版本依赖</p>
</li>
<li data-nodeid="1795">
<p data-nodeid="1796">bundledDependencies 捆绑依赖</p>
</li>
<li data-nodeid="1797">
<p data-nodeid="1798">optionalDependencies 可选依赖</p>
</li>
</ul>
<p data-nodeid="1799">它们起到的作用和声明意义各不相同。dependencies 表示项目依赖，这些依赖都会成为线上生产环境中的代码组成部分。当它关联的 npm 包被下载时，<strong data-nodeid="1995">dependencies 下的模块也会作为依赖，一起被下载</strong>。</p>
<p data-nodeid="1800"><strong data-nodeid="2000">devDependencies 表示开发依赖，不会被自动下载</strong>，因为 devDependencies 一般只在开发阶段起作用或只是在开发环境中需要用到。比如 Webpack，预处理器 babel-loader、scss-loader，测试工具 E2E、Chai 等，这些都是辅助开发的工具包，无须在生产环境使用。</p>
<p data-nodeid="1801">这里需要特别说明的是：<strong data-nodeid="2010">并不是只有在 dependencies 中的模块才会被一起打包，而在 devDependencies 中的依赖一定不会被打包</strong>。实际上，依赖是否被打包，<strong data-nodeid="2011">完全取决于项目里是否被引入了该模块</strong>。dependencies 和 devDependencies 在业务中更多的只是一个规范作用，我们自己的应用项目中，使用 npm install 命令安装依赖时，dependencies 和 devDependencies 内容都会被下载。</p>
<p data-nodeid="1802">peerDependencies 表示同版本依赖，简单来说就是：如果你安装我，那么你最好也安装我对应的依赖。举个例子，假设 react-ui@1.2.2 只提供一套基于 React 的 UI 组件库，它需要宿主环境提供指定的 React 版本来搭配使用，因此我们需要在 React-ui 的 package.json 中配置：</p>
<pre class="lang-java" data-nodeid="1803"><code data-language="java"><span class="hljs-string">"peerDependencies"</span>: {
    <span class="hljs-string">"React"</span>: <span class="hljs-string">"^17.0.0"</span>
}
</code></pre>
<p data-nodeid="1804">举一个场景实例，对于插件类 (Plugin) 项目，比如我开发一个 Koa 中间件，很明显这类插件或组件脱离（Koa）本体是不能单独运行且毫无意义的，但是这类插件又无须声明对本体（Koa）的依赖声明，更好的方式是使用宿主项目中的本体（Koa）依赖。这就是<strong data-nodeid="2018">peerDependencies 主要的使用场景</strong>。这类场景有以下特点：</p>
<ul data-nodeid="1805">
<li data-nodeid="1806">
<p data-nodeid="1807"><strong data-nodeid="2022">插件不能单独运行</strong></p>
</li>
<li data-nodeid="1808">
<p data-nodeid="1809"><strong data-nodeid="2026">插件正确运行的前提是核心依赖库必须先下载安装</strong></p>
</li>
<li data-nodeid="1810">
<p data-nodeid="1811"><strong data-nodeid="2030">我们不希望核心依赖库被重复下载</strong></p>
</li>
<li data-nodeid="1812">
<p data-nodeid="1813"><strong data-nodeid="2034">插件 API 的设计必须要符合核心依赖库的插件编写规范</strong></p>
</li>
<li data-nodeid="1814">
<p data-nodeid="1815"><strong data-nodeid="2038">在项目中，同一插件体系下，核心依赖库版本最好相同</strong></p>
</li>
</ul>
<p data-nodeid="1816">bundledDependencies 和 npm pack 打包命令有关。假设 package.json 中有如下配置：</p>
<pre class="lang-java" data-nodeid="1817"><code data-language="java">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"test"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"dep"</span>: <span class="hljs-string">"^0.0.2"</span>,
    ...
  },
  <span class="hljs-string">"devDependencies"</span>: {
    ...
    <span class="hljs-string">"devD1"</span>: <span class="hljs-string">"^1.0.0"</span>
  },
  <span class="hljs-string">"bundledDependencies"</span>: [
    <span class="hljs-string">"bundleD1"</span>,
    <span class="hljs-string">"bundleD2"</span>
  ]
}
</code></pre>
<p data-nodeid="1818">在执行 npm pack 时，就会产出一个 test-1.0.0.tgz 压缩包，且该压缩包中包含了 bundle D1 和 bundle D2 两个安装包。业务方使用 npm install test-1.0.0.tgz 命令时，也会安装 bundle D1 和 bundle D2。</p>
<p data-nodeid="1819">这里你需要注意的是：<strong data-nodeid="2046">在 bundledDependencies 中指定的依赖包，必须先在 dependencies 和 devDependencies 声明过，否则在 npm pack 阶段会进行报错</strong>。</p>
<p data-nodeid="1820">optionalDependencies 表示可选依赖，就是说即使对应依赖项安装失败了，也不会影响整个安装过程。一般我们很少使用到它，这里<strong data-nodeid="2052">我也不建议大家使用，因为它大概率会增加项目的不确定性和复杂性</strong>。</p>
<p data-nodeid="1821">学习了以上内容，现在你已经知道 npm 规范中的相关依赖声明含义了，接下来我们再谈谈版本规范，帮助你进一步解析依赖库锁版本行为。</p>
<h4 data-nodeid="1822">再谈版本规范——依赖库锁版本行为解析</h4>
<p data-nodeid="1823">npm 遵循 SemVer 版本规范，具体内容你可以参考<a href="https://semver.org/lang/zh-CN/" data-nodeid="2058">语义化版本 2.0.0</a>，这里不再展开。这部分内容我希望聚焦到工程建设的一个细节点上——依赖库锁版本行为。</p>
<p data-nodeid="1824"><a href="https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE" data-nodeid="2062">Vue 官方有这样的内容</a>：</p>
<blockquote data-nodeid="1825">
<p data-nodeid="1826">每个 vue 包的新版本发布时，一个相应版本的 vue-template-compiler 也会随之发布。编译器的版本必须和基本的 vue 包保持同步，这样 vue-loader 就会生成兼容运行时的代码。这意味着你每次升级项目中的 vue 包时，也应该匹配升级 vue-template-compiler。</p>
</blockquote>
<p data-nodeid="1827">据此，我们需要考虑的是：作为库开发者，如何保证依赖包之间的强制最低版本要求？</p>
<p data-nodeid="1828">我们先看看 create-react-app 的做法，在 create-react-app 的核心 react-script 当中，它利用 verify PackageTree 方法，对业务项目中的依赖进行比对和限制。<a href="https://github.com/facebook/create-react-app/blob/37712374bcaa6ccb168eeaf4fe8bd52d120dbc58/packages/react-scripts/scripts/utils/verifyPackageTree.js#L19" data-nodeid="2069">源码</a>如下：</p>
<pre class="lang-java" data-nodeid="1829"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">verifyPackageTree</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">const</span> depsToCheck = [
    <span class="hljs-string">'babel-eslint'</span>,
    <span class="hljs-string">'babel-jest'</span>,
    <span class="hljs-string">'babel-loader'</span>,
    <span class="hljs-string">'eslint'</span>,
    <span class="hljs-string">'jest'</span>,
    <span class="hljs-string">'webpack'</span>,
    <span class="hljs-string">'webpack-dev-server'</span>,
  ];
  <span class="hljs-keyword">const</span> getSemverRegex = () =&gt;
    /\bv?(?:<span class="hljs-number">0</span>|[<span class="hljs-number">1</span>-<span class="hljs-number">9</span>]\d*)\.(?:<span class="hljs-number">0</span>|[<span class="hljs-number">1</span>-<span class="hljs-number">9</span>]\d*)\.(?:<span class="hljs-number">0</span>|[<span class="hljs-number">1</span>-<span class="hljs-number">9</span>]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/gi;
  <span class="hljs-keyword">const</span> ownPackageJson = require(<span class="hljs-string">'../../package.json'</span>);
  <span class="hljs-keyword">const</span> expectedVersionsByDep = {};
  depsToCheck.forEach(dep =&gt; {
    <span class="hljs-keyword">const</span> expectedVersion = ownPackageJson.dependencies[dep];
    <span class="hljs-keyword">if</span> (!expectedVersion) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(<span class="hljs-string">'This dependency list is outdated, fix it.'</span>);
    }
    <span class="hljs-keyword">if</span> (!getSemverRegex().test(expectedVersion)) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(
        `The ${dep} <span class="hljs-keyword">package</span> should be pinned, instead got version ${expectedVersion}.`
      );
    }
    expectedVersionsByDep[dep] = expectedVersion;
  });

  let currentDir = __dirname;
 
  <span class="hljs-keyword">while</span> (<span class="hljs-keyword">true</span>) {
    <span class="hljs-keyword">const</span> previousDir = currentDir;
    currentDir = path.resolve(currentDir, <span class="hljs-string">'..'</span>);
    <span class="hljs-keyword">if</span> (currentDir === previousDir) {
      <span class="hljs-comment">// We've reached the root.</span>
      <span class="hljs-keyword">break</span>;
    }
    <span class="hljs-keyword">const</span> maybeNodeModules = path.resolve(currentDir, <span class="hljs-string">'node_modules'</span>);
    <span class="hljs-keyword">if</span> (!fs.existsSync(maybeNodeModules)) {
      <span class="hljs-keyword">continue</span>;
    }
    depsToCheck.forEach(dep =&gt; {
      <span class="hljs-keyword">const</span> maybeDep = path.resolve(maybeNodeModules, dep);
      <span class="hljs-keyword">if</span> (!fs.existsSync(maybeDep)) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">const</span> maybeDepPackageJson = path.resolve(maybeDep, <span class="hljs-string">'package.json'</span>);
      <span class="hljs-keyword">if</span> (!fs.existsSync(maybeDepPackageJson)) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">const</span> depPackageJson = JSON.parse(
        fs.readFileSync(maybeDepPackageJson, <span class="hljs-string">'utf8'</span>)
      );
      <span class="hljs-keyword">const</span> expectedVersion = expectedVersionsByDep[dep];
      <span class="hljs-keyword">if</span> (!semver.satisfies(depPackageJson.version, expectedVersion)) {
        console.error(<span class="hljs-comment">//...);</span>
        process.exit(<span class="hljs-number">1</span>);
      }
    });
  }
}
</code></pre>
<p data-nodeid="1830">根据上述代码，我们不难发现，create-react-app 会对项目中的 babel-eslint、babel-jest、babel-loader、ESLint、Jest、webpack、webpack-dev-server 这些核心依赖进行检索——是否符合 create-react-app 对这些核心依赖的版本要求。<strong data-nodeid="2076">如果不符合依赖版本要求，那么 create-react-app 的构建过程会直接报错并退出</strong>。</p>
<p data-nodeid="1831">create-react-app 这么做的理由是：<strong data-nodeid="2082">需要上述依赖项的某些确定版本，以保障 create-react-app 源码的相关功能稳定</strong>。</p>
<p data-nodeid="1832">我认为这样做看似强硬且无理由，实则是对前端社区、npm 版本混乱现象的一种妥协。这种妥协确实能保证 create-react-app 的正常构建工作。因此现阶段来看，也不失为一种值得推荐的做法。而作为 create-react-app 的使用者，我们依然可以<strong data-nodeid="2096">通过 SKIP_PREFLIGHT_CHECK 这个环境变量，跳过核心依赖版本检查</strong>，对应<a href="https://github.com/facebook/create-react-app/blob/5bd6e73047ef0ccd2f31616255c79a939d6402c4/packages/react-scripts/scripts/start.js#L27" data-nodeid="2094">源码</a>：</p>
<pre class="lang-java" data-nodeid="1833"><code data-language="java"><span class="hljs-keyword">const</span> verifyPackageTree = require(<span class="hljs-string">'./utils/verifyPackageTree'</span>);
<span class="hljs-keyword">if</span> (process.env.SKIP_PREFLIGHT_CHECK !== <span class="hljs-string">'true'</span>) {
  verifyPackageTree();
}
</code></pre>
<p data-nodeid="1834">create-react-app 的锁版本行为无疑彰显了目前前端社区中工程依赖问题的方方面面，从这个细节管中窥豹，希望能引起你更深入的思考。</p>
<h3 data-nodeid="1835">最佳实操建议</h3>
<p data-nodeid="1836">前面我们讲了很多 npm 的原理和设计理念，理解了这些内容，你应该能总结出一个适用于团队的最佳实操建议。对于实操我有以下想法，供你参考。</p>
<ol data-nodeid="1837">
<li data-nodeid="1838">
<p data-nodeid="1839">优先使用 npm v5.4.2 以上的 npm 版本，以保证 npm 的最基本先进性和稳定性。</p>
</li>
<li data-nodeid="1840">
<p data-nodeid="1841">项目的第一次搭建使用 npm install 安装依赖包，并提交 package.json、package-lock.json，而不提交 node_modules 目录。</p>
</li>
<li data-nodeid="1842">
<p data-nodeid="1843">其他项目成员首次 checkout/clone 项目代码后，执行一次 npm install 安装依赖包。</p>
</li>
<li data-nodeid="1844">
<p data-nodeid="1845">对于升级依赖包的需求：</p>
</li>
</ol>
<ul data-nodeid="1846">
<li data-nodeid="1847">
<p data-nodeid="1848">依靠 npm update 命令升级到新的小版本；</p>
</li>
<li data-nodeid="1849">
<p data-nodeid="1850">依靠 npm install @ 升级大版本；</p>
</li>
<li data-nodeid="1851">
<p data-nodeid="1852">也可以手动修改 package.json 中版本号，并执行 npm install 来升级版本；</p>
</li>
<li data-nodeid="1853">
<p data-nodeid="1854">本地验证升级后新版本无问题，提交新的 package.json、package-lock.json 文件。</p>
</li>
</ul>
<ol start="5" data-nodeid="1855">
<li data-nodeid="1856">
<p data-nodeid="1857">对于降级依赖包的需求：执行 npm install @ 命令，验证没问题后，提交新的 package.json、package-lock.json 文件。</p>
</li>
<li data-nodeid="1858">
<p data-nodeid="1859">删除某些依赖：</p>
</li>
</ol>
<ul data-nodeid="1860">
<li data-nodeid="1861">
<p data-nodeid="1862">执行 npm uninstall 命令，验证没问题后，提交新的 package.json、package-lock.json 文件；</p>
</li>
<li data-nodeid="1863">
<p data-nodeid="1864">或者手动操作 package.json，删除依赖，执行 npm install 命令，验证没问题后，提交新的 package.json、package-lock.json 文件。</p>
</li>
</ul>
<ol start="7" data-nodeid="1865">
<li data-nodeid="1866">
<p data-nodeid="1867">任何团队成员提交 package.json、package-lock.json 更新后，其他成员应该拉取代码后，执行 npm install 更新依赖。</p>
</li>
<li data-nodeid="1868">
<p data-nodeid="1869">任何时候都不要修改 package-lock.json。</p>
</li>
<li data-nodeid="1870">
<p data-nodeid="1871">如果 package-lock.json 出现冲突或问题，建议将本地的 package-lock.json 文件删除，引入远程的 package-lock.json 文件和 package.json，再执行 npm install 命令。</p>
</li>
</ol>
<p data-nodeid="1872">如果以上建议你都能理解，并能够解释其中缘由，那么这三讲内容，你已经大致掌握了。</p>
<h3 data-nodeid="1873">总结</h3>
<p data-nodeid="1874">通过本讲学习，相信你已经掌握了在 CI 环境中优化包管理器的方法以及更多、更全面的 npm 设计规范。希望不管是在本地开发，还是 CI 环境中，你在面对包管理方面的问题时能够游刃有余，轻松面对。</p>
<p data-nodeid="1875"><img src="https://s0.lgstatic.com/i/image/M00/8B/B0/CgqCHl_cia2AQRQXAAcD3Dx5TgQ135.png" alt="前端基建 金句.png" data-nodeid="2122"></p>
<p data-nodeid="1876">随着前端的发展，npm/Yarn 也在互相借鉴，不断改进，比如 npm v7 会带来一流的 Monorepo 支持。历史总是螺旋式前进，其间可能出现困局和曲折，但是对前端从业人员来说，时刻保持对工程化理念的学习，抽丝剥茧、理清概念，必能从中受益。</p>
<p data-nodeid="1877">npm/Yarn 相关的话题不是一个独立的点，它是成体系的一个面，甚至可以算得上是一个完整的生态。这部分知识我们虽没有面面俱到，但是聚焦在依赖管理、安装机制、CI 提效等话题上。更多 npm 的内容，比如 npm scripts、公共库相关设计、npm 发包、npm 安全、package.json 等话题我会在后面章节中也会继续讲解，希望你能坚持学习。</p>
<p data-nodeid="1878" class="">不管是本地开发环境还是 CI 环境，不管是使用 npm 还是 Yarn，都离不开构建工具。下一讲我会带你对比主流构建工具，继续深入工程化和基建的深水区。我们下一讲再见。</p>

---

### 精选评论

##### *仔：
> 老师，看了你的文章有一个问题想咨询一下，项目仓库里面有 package-lock.json；本地开发环境（node10+,npm6+）npm install 不会没有报错;但是在 Jenkins 打包环境（node8+,npm5+） npm install 偶尔会出现下面这种类型的错误;   npm ERR! code EINTEGRITYnpm ERR! sha512-MKiLiV+I1AA596t9w1sQJ8jkiSr5+ZKi0WKrYGUn6d1Fx+Ij4tIj+m2WMQSGczs5jZVxV339chE8iwk6F64wjA== integrity checksum failed when using sha512: wanted sha512-MKiLiV+I1AA596t9w1sQJ8jkiSr5+ZKi0WKrYGUn6d1Fx+Ij4tIj+m2WMQSGczs5jZVxV339chE8iwk6F64wjA== but got sha512-WXI95kpJrxw4Nnx8vVI90PuUhrQjnNgghBl5tn54rUNKZYbxv+4ACxUzPVpJEtWxKmeDwnQrzjc0C2bYmRJVKg==. (65117 bytes) npm ERR! A complete log of this run can be found in:npm ERR!     /home/ubuntu/.npm/_logs/2017-11-29T05_33_52_182Z-debug.log想问一下老师，这种情况一般从哪些方向思考：1.网络不稳定导致下载的依赖不完整？2.npm 版本不同导致？3.本地开发是 window10，打包服务器是 ubuntu，系统不同 npm 根据 package-lock.json ji计算依赖包的 hash 不同导致？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 首先对齐一下 CI 机器上和本地的各环境版本，包括 node npm 等

##### **茏：
> 可以讲讲pnpm吗，感觉挺好用的，下载也比较可观，但还是不太敢在项目开发中使用

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; pnpm 非常不错，npm7 和 pnpm 其实是我认为设计上目前最好的了，纯设计上。可以大胆在项目中尝试下。

##### **宇：
> 如果我们开发的库依赖了一个精确版本号的模块，那么提交 lockfiles 到仓库可能会造成同一个依赖不同版本都被下载的情况。如果作为库开发者，真的有使用某个特定版本依赖的需要，一个更好的方式是定义 peerDependencies。这样做的话如果遇到了不符合规则的 peerDenpendencies，npm 也会正常安装使用，那怎么确保版本号精确

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 会有 warning，业务方处理

##### *滨：
> 摘录：历史总是螺旋式前进，其间可能出现困局和曲折，但是对前端从业人员来说，时刻保持对工程化理念的学习，抽丝剥茧、理清概念，必能从中受益。赞

##### *鑫：
> 怎么看待yarn v2的巨大变化😀

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 正向进化

##### **的小叶酱：
> 现在项目里，yarn和npm都在使用，请问更推荐使用哪个呢

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 目前看区别不大，我个人喜欢 yarn

##### L：
> bundledDependencies 的意义是什么？如果只是需要这个依赖得话，那为什么不直接使用 dependencies 呢？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 恰好这里有个人跟你疑问一样：https://stackoverflow.com/questions/11207638/advantages-of-bundleddependencies-over-normal-dependencies-in-npm 简单来说 使用 bundledDependencies，直接把我的依赖打包进来，这是最安全的——不管 npm 机制怎么变，我都是最安全的，直接打包我的依赖

##### **3335：
> 我们的CI/CD环境，能缓存上次构建的node_modules目录。那如果换成npm ci 安装，先删除 node_modules。会不会反而减慢了下载依赖的速度？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是存在这种可能的，一般缓存肯定会更快，如果单纯从头安装的话，CI 依赖确定的依赖树，会有速度优势

