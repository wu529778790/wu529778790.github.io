<p data-nodeid="7591" class="">前端生态有着与生俱来的混乱和与之抗衡的秩序，有着新生力量的崛起以及随之而来的规范约束。在这个背景下，正面来看，欣欣向荣的前端生态带来了广阔的发展前景，但也造成了一些困扰。比如，我们都经历过在前端基础设施建设中，被各种冗杂的配置项困扰，一不小心就是 Error，步履蹒跚。也许我们可以通过搜索引擎暂时解决问题，但是恍恍惚惚、难以洞悉问题本源。</p>
<p data-nodeid="7592">另一方面，前端生态的重要一环是公共库。公共库的模块化规范、编译标准，甚至压缩方式都有讲究，同时公共库与使用它们的业务项目也要密切配合，这样才能打造一个顺滑的基建结果。请你仔细审视手上的项目，编译构建过程是否做到了最高效，产出代码是否达到了最高级别的安全保障，是否做到了性能体验的最佳实践？</p>
<p data-nodeid="7593">这一讲，就让我们从公共库的角度出发，梳理当前前端生态，最终还原一个趋近完美的公共库设计标准。</p>
<h3 data-nodeid="7594">从一个公共库处理的问题，谈如何做好“扫雷人”</h3>
<p data-nodeid="7595">这一部分，让我们以一篇网红文章“<a href="https://juejin.im/post/6856815533749338125" data-nodeid="7749">报告老板，我们的 H5 页面在 iOS 11 系统上白屏了！</a>”开始，我先简单梳理和总结一下文章内容：</p>
<ul data-nodeid="7596">
<li data-nodeid="7597">
<p data-nodeid="7598">笔者发现某些机型上出现页面白屏情况；</p>
</li>
<li data-nodeid="7599">
<p data-nodeid="7600">出现在报错页面上的信息非常明显，即当前浏览器不支持<code data-backticks="1" data-nodeid="7753">...</code>扩展运算符；</p>
</li>
<li data-nodeid="7601">
<p data-nodeid="7602">出错的代码（使用了扩展运算符的代码）属于某个公共库代码，它没有使用 Babel 插件进行降级处理，因此线上源代码出现了<code data-backticks="1" data-nodeid="7756">...</code>扩展运算符。</p>
</li>
</ul>
<p data-nodeid="7603">现在问题找到了，或许直接将出现问题的公共库代码用 Babel 进行编译降级就可以了，但问题似乎还会更加复杂。在文中环境下，需要在<code data-backticks="1" data-nodeid="7759">vue.config.js</code>中加入对问题公共库<code data-backticks="1" data-nodeid="7761">module-name/library-name</code>的 Babel 编译流程：</p>
<pre class="lang-java" data-nodeid="7604"><code data-language="java">transpileDependencies: [
  <span class="hljs-string">'module-name/library-name'</span> <span class="hljs-comment">// 出现问题的那个库</span>
],
</code></pre>
<p data-nodeid="7605">vue-cli 对<a href="https://cli.vuejs.org/zh/config/#transpiledependencies" data-nodeid="7766">transpileDependencies</a> 也有如下说明：</p>
<blockquote data-nodeid="7606">
<p data-nodeid="7607">默认情况下 babel-loader 会忽略所有<code data-backticks="1" data-nodeid="7769">node_modules</code>中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。</p>
</blockquote>
<p data-nodeid="7608">按照上述操作，却得到了新的报错：<code data-backticks="1" data-nodeid="7772">Uncaught TypeError: Cannot assign to read only property 'exports' of object '#&lt;Object&gt;'</code>。究其原因，<code data-backticks="1" data-nodeid="7774">module-name/library-name</code>这个库对外输出的是 CommonJS 类型源码，而项目基础设施中 babel-transform-runtime 在编译时增加的 helper 代码，使用的是 import 引入。<strong data-nodeid="7780">最终编译结果出现了 ESM 包含 CommonJS 的情况，是不会被 Webpack 处理的</strong>。</p>
<p data-nodeid="7609">出现问题的原因总结如下：</p>
<ul data-nodeid="7610">
<li data-nodeid="7611">
<p data-nodeid="7612">plugin-transform-runtime 会根据 sourceType 选择注入 import 或者 require，sourceType 的默认值是 module，就会默认注入 import；</p>
</li>
<li data-nodeid="7613">
<p data-nodeid="7614">Webpack 不会处理包含 import/export 的文件中的 module.exports 导出，所以需要让 Babel 自动判断 sourceType，根据文件内是否存在 import/export 来决定注入什么样的代码。</p>
</li>
</ul>
<p data-nodeid="7615">为了适配上述问题，Babel 设置了<code data-backticks="1" data-nodeid="7785">sourceType</code>属性，<code data-backticks="1" data-nodeid="7787">sourceType：unambiguous</code>表示 Babel 会根据文件上下文（比如是否含有 import/export）来决定是否按照 ESM 语法处理文件。</p>
<p data-nodeid="7616">这时候就需要配置 Babel 内容了：</p>
<pre class="lang-java" data-nodeid="7617"><code data-language="java"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  ...  <span class="hljs-comment">// 省略的配置</span>
  sourceType: <span class="hljs-string">'unambiguous'</span>,
  ...  <span class="hljs-comment">// 省略的配置</span>
}
</code></pre>
<p data-nodeid="7618">但是这种做法在工程上并不推荐，上述更改方式对所有编译文件都生效，但也<strong data-nodeid="7801">增加了编译成本</strong>（因为设置<code data-backticks="1" data-nodeid="7795">sourceType：unambiguous</code>后，编译时需要做的事情更多），还有个<a href="https://babeljs.io/docs/en/options#sourcetype" data-nodeid="7799">潜在问题</a>：</p>
<blockquote data-nodeid="7619">
<p data-nodeid="7620">Unambiguous can be quite useful in contexts where the type is unknown, but it can lead to false matches because it's perfectly valid to have a module file that does not use import/export statements.</p>
</blockquote>
<p data-nodeid="7621">翻译过来，就是说并不是所有的 ESM 模块（这里指使用 ESNext 特性的文件）都含有 import/export，因此即便某个待编译文件属于 ESM 模块，也可能被 Babel 错误地判断为 CommonJS 模块而引发误判。</p>
<p data-nodeid="7622">基于这一点，一个更合适的做法是：只对目标第三方库<code data-backticks="1" data-nodeid="7807">'module-name/library-name'</code>使用<code data-backticks="1" data-nodeid="7809">sourceType：unambiguous</code>，这时，Babel <a href="https://babeljs.io/docs/en/options#overrides" data-nodeid="7813">overrides 属性</a>就派上用场了：</p>
<blockquote data-nodeid="7623">
<p data-nodeid="7624">Allows users to provide an array of options that will be merged into the current configuration one at a time. This feature is best used alongside the "test"/"include"/"exclude" options to provide conditions for which an override should apply.</p>
</blockquote>
<p data-nodeid="7625">具体使用方式：</p>
<pre class="lang-java" data-nodeid="7626"><code data-language="java"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
	...&nbsp;&nbsp;<span class="hljs-comment">//&nbsp;省略的配置</span>
	overrides:&nbsp;[
		{&nbsp;include:&nbsp;<span class="hljs-string">'./node_modules/module-name/library-name/name.common.js'</span>,&nbsp;&nbsp;<span class="hljs-comment">//&nbsp;使用的第三方库</span>
		sourceType:&nbsp;<span class="hljs-string">'unambiguous'</span>
		}
	],&nbsp;
	&nbsp;...&nbsp;&nbsp;<span class="hljs-comment">//&nbsp;省略的配置</span>
};
</code></pre>
<p data-nodeid="7627">至此，这个“iOS 11 系统白屏”问题就算告一段落了。我整理了解决路线，如下图所示：</p>
<p data-nodeid="7628"><img src="https://s0.lgstatic.com/i/image2/M01/04/A5/CgpVE1_0NWKAaju0AAMFDVpRq7Y221.png" alt="Lark20210105-174532.png" data-nodeid="7832"></p>
<p data-nodeid="7629">我们回过头再来看这个问题，实际上<strong data-nodeid="7838">业务方对线上测试回归不彻底</strong>是造成问题的直接原因，但问题其实出现在一个公共库上，因而前端生态的混乱和复杂也许是更本质的原因。这里涉及两方面问题：</p>
<ul data-nodeid="7630">
<li data-nodeid="7631">
<p data-nodeid="7632">作为公共库，我应该如何构建编译代码，让业务方更有保障地使用？</p>
</li>
<li data-nodeid="7633">
<p data-nodeid="7634">作为使用者，我应该如何处理第三方公共库，是否还需要对其进行额外编译和处理？</p>
</li>
</ul>
<p data-nodeid="7635">被动地发现问题、解决问题只会让我们被“牵着鼻子走”——这不是我们的目的。我们应该从更底层拆解问题，下面我们就来看看更底层的内容。</p>
<h3 data-nodeid="7636">应用项目构建和公共库构建的差异</h3>
<p data-nodeid="7637">首先我们要认清应用项目构建和公共库构建的差别。作为前端团队，我们构建了很多应用项目，对于一个应用项目来说，“只要能在需要兼容的环境中跑起来”就达到了基本目的。而对于一个公共库来说，我们的公共库可能被各种环境所引用或需要支持各种兼容需求，因此<strong data-nodeid="7848">公共库就要兼顾性能和易用性，要注重质量和广泛度</strong>。由此看来，公共库理论上构建机制就更加复杂。</p>
<p data-nodeid="7638">说到底，如果你能够设计好一个公共库，那么通常也能使用好一个公共库。因此，下面我们重点讨论如何设计并产出一个企业级公共库，以及如何在业务中更好地配合使用。</p>
<h3 data-nodeid="7639">制定一个企业级公共库的设计原则</h3>
<p data-nodeid="7640">这里说的企业级公共库主要是指在企业内复用的公共库，它可以被发布到 npm 上进行社区共享，也可以在企业内的私有 npm 中限定范围地共享。总之，企业级公共库是需要在业务中被使用的。我认为一个企业级公共库的设计原则应该包括以下几点。</p>
<ol data-nodeid="7641">
<li data-nodeid="7642">
<p data-nodeid="7643"><strong data-nodeid="7856">对于开发者共创公共库，最大化确保开发体验</strong>：</p>
</li>
</ol>
<ul data-nodeid="7644">
<li data-nodeid="7645">
<p data-nodeid="7646">最快地搭建调试和开发环境</p>
</li>
<li data-nodeid="7647">
<p data-nodeid="7648">安全地发版维护</p>
</li>
</ul>
<ol start="2" data-nodeid="7649">
<li data-nodeid="7650">
<p data-nodeid="7651"><strong data-nodeid="7863">对于使用者，最大化确保使用体验</strong>：</p>
</li>
</ol>
<ul data-nodeid="7652">
<li data-nodeid="7653">
<p data-nodeid="7654">公共库文档建设完善</p>
</li>
<li data-nodeid="7655">
<p data-nodeid="7656">公共库质量有保障</p>
</li>
<li data-nodeid="7657">
<p data-nodeid="7658">接入和使用负担最小</p>
</li>
</ul>
<p data-nodeid="7659">基于上述原则，在团队里，设计一个公共库前，你需要考虑：</p>
<ul data-nodeid="7660">
<li data-nodeid="7661">
<p data-nodeid="7662">自研公共库还是使用社区已有轮子；</p>
</li>
<li data-nodeid="7663">
<p data-nodeid="7664">公共库的运行环境是什么，这将决定公共库的编译构建目标；</p>
</li>
<li data-nodeid="7665">
<p data-nodeid="7666">公共库是偏向业务还是业务 free，这将决定公共库的职责和边界。</p>
</li>
</ul>
<p data-nodeid="7667">上述内容并非纯理论原则，而是直接决定了公共库实现的技术选型。比如，为了实现更完善的文档建设，尤其是 UI 组件类文档，可以考虑部署静态组件展示站点，进行组件展示以及用法说明。更智能、工程化的内容，我们可以考虑使用类似 <a href="https://github.com/jsdoc/jsdoc" data-nodeid="7874">JSDoc</a> 来实现 JavaScript API 文档生成，组件类公共库可以考虑 <a href="https://storybook.js.org/" data-nodeid="7878">Storybook</a> 或者 <a href="http://styleguides.io/" data-nodeid="7882">Styleguides</a> 作为标准接入方案。</p>
<p data-nodeid="7668">再比如，我们的<strong data-nodeid="7889">公共库适配环境</strong>是什么？一般来讲可能需要兼容：浏览器/Node.js/同构环境等。不同环境对应了不同的编译和打包标准，这就需要你进行思考：如果目标是浏览器环境，那么如何才能充分实现性能最优解？如帮助业务方实现 tree-shaking 等优化技术。</p>
<p data-nodeid="7669">同时，为了减轻业务使用负担，作为企业级公共库，以及对应使用这些企业级公共库的应用项目，可以指定标准规范的 babel-preset，保证编译产出的统一。这样一来，业务项目（即使用公共库方）可以以统一的接入标准引入。</p>
<p data-nodeid="7670">下面是我基于对目前前端生态的理解，草拟的一份 babel-preset（该 preset 设计方案具有时效性）。请继续阅读下文，我们来对 @lucas/babel-preset 一探究竟。</p>
<h3 data-nodeid="7671">制定一个统一标准化 babel-preset</h3>
<p data-nodeid="7672">企业中，所有公共库或应用项目都使用一套 @lucas/babel-xxx-preset，按照 @lucas/babel-xxx-preset 的编译要求进行编译，这样业务使用时，接入标准统一。</p>
<p data-nodeid="7673">原则上讲，这样的统一化能够有效避免本文开头的“线上问题”。同时这个 @lucas/babel-preset 应该能够适应各种项目需求，比如使用 TypeScript/Flow 等扩展语法的项目。</p>
<p data-nodeid="7674">这里给出一份设计方案，供你参考和讨论。</p>
<ol data-nodeid="7675">
<li data-nodeid="7676">
<p data-nodeid="7677">支持 NODE_ENV = 'development' | 'production' | 'test' 三种环境，并有对应的优化。</p>
</li>
<li data-nodeid="7678">
<p data-nodeid="7679">配置插件默认不开启 Babel<code data-backticks="1" data-nodeid="7916">loose: true</code>配置，让插件的行为尽可能地遵循规范，但对有较严重性能损耗或有兼容性问题的情况保留修改入口。</p>
</li>
<li data-nodeid="7680">
<p data-nodeid="7681">这份设计方案落地后产出，应该<strong data-nodeid="7923">支持应用编译和公共库编译</strong>，即可以按照 @lucas/babel-preset/app，@lucas/babel-preset/dependencies 和 @lucas/babel-preset/library，@lucas/babel-preset/library/compact 进行区分使用（具体不同预设集合的角色，下面会详细展开）。</p>
</li>
</ol>
<p data-nodeid="7682">@lucas/babel-preset/app，@lucas/babel-preset/dependencies 都可以作为编译应用项目的预设使用，但他们也有所差别，具体如下：</p>
<ul data-nodeid="7683">
<li data-nodeid="7684">
<p data-nodeid="7685">@lucas/babel-preset/app 负责编译除<code data-backticks="1" data-nodeid="7926">node_modules</code>外的业务代码；</p>
</li>
<li data-nodeid="7686">
<p data-nodeid="7687">@lucas/babel-preset/dependencies 编译<code data-backticks="1" data-nodeid="7929">node_modules</code>第三方代码；</p>
</li>
<li data-nodeid="7688">
<p data-nodeid="7689">@lucas/babel-preset/library 和 @lucas/babel-preset/library/compact 作为编译公共库使用的预设，他们也有所差别，@lucas/babel-preset/library 按照当前 Node 环境编译输出代码，而 @lucas/babel-preset/library/compact 会编译降级为 ES5。</p>
</li>
</ul>
<ol start="4" data-nodeid="7690">
<li data-nodeid="7691">
<p data-nodeid="7692">对于企业级公共库，建议使用标准 ES 特性发布；对 tree-shaking 有强烈需求的库，应同时发布 ES module 格式代码。</p>
</li>
<li data-nodeid="7693">
<p data-nodeid="7694">对于企业级公共库，发布的代码不包含 polyfills，由使用方统一处理。</p>
</li>
<li data-nodeid="7695">
<p data-nodeid="7696">对于应用编译，使用 @babel/preset-env 同时编译应用代码与第三方库代码。</p>
</li>
<li data-nodeid="7697">
<p data-nodeid="7698">对于应用编译，需要对<code data-backticks="1" data-nodeid="7936">node_modules</code>进行编译，并且为<code data-backticks="1" data-nodeid="7938">node_modules</code>配置<code data-backticks="1" data-nodeid="7940">sourceType: 'unambiguous'</code>，以确保第三方依赖包中的 CommonJS 模块能够被正确处理。</p>
</li>
<li data-nodeid="7699">
<p data-nodeid="7700">对于应用编译，启用 plugin-transform-runtime，避免同样的 helper 代码被重复注入多个文件，以缩减打包后文件的体积。同时自动注入 regenerator-runtime，避免污染全局变量。</p>
</li>
<li data-nodeid="7701">
<p data-nodeid="7702">注入绝对路径引用的 @babel/runtime 包中对应的 helper，以确保能够引用到正确版本的 @babel/runtime 包中的文件。</p>
</li>
</ol>
<p data-nodeid="7703">此外，第三方库可能通过 dependencies 依赖自己的 @babel/runtime，而 @babel/runtime 不同版本之间不能确保兼容 (比如 6.x 和 7.x 之间)，这就需要确保我们为<code data-backticks="1" data-nodeid="7945">node_modules</code>内代码经过 Babel 编译注入 runtime 时使用正确路径的 @babel/runtime 包。</p>
<p data-nodeid="7704">基于以上设计，对于 CSR 应用的 Babel 编译流程，预计业务方使用预设为：</p>
<pre class="lang-java" data-nodeid="7705"><code data-language="java"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  presets: [<span class="hljs-string">'@lucas/babel-preset/app'</span>],
}
<span class="hljs-comment">// 相关 webpack 配置</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: /\.js$/,
        oneOf: [
          {
            exclude: /node_modules/,
            loader: <span class="hljs-string">'babel-loader'</span>,
            options: {
              cacheDirectory: <span class="hljs-keyword">true</span>,
            },
          },
          {
            loader: <span class="hljs-string">'babel-loader'</span>,
            options: {
              cacheDirectory: <span class="hljs-keyword">true</span>,
              configFile: <span class="hljs-keyword">false</span>,
              <span class="hljs-comment">// 使用我们的 preset</span>
              presets: [<span class="hljs-string">'@lucas/babel-preset/dependencies'</span>],
              compact: <span class="hljs-keyword">false</span>,
            },
          },
        ],
      },
    ],
  },
}
</code></pre>
<p data-nodeid="7706">我们可以看到，上述使用方式按照<code data-backticks="1" data-nodeid="7949">node_modules</code>进行了区分，对于<code data-backticks="1" data-nodeid="7951">node_modules</code>我们开启 cacheDirectory 缓存。对于应用，我们直接使用 babel-loader 进行编译，并使用<code data-backticks="1" data-nodeid="7953">@lucas/babel-preset/dependencies</code>这个 Babel preset，其内容为：</p>
<pre class="lang-java" data-nodeid="7707"><code data-language="java"><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> {declare} = require(<span class="hljs-string">'@babel/helper-plugin-utils'</span>)
<span class="hljs-keyword">const</span> getAbsoluteRuntimePath = () =&gt; {
  <span class="hljs-keyword">return</span> path.dirname(require.resolve(<span class="hljs-string">'@babel/runtime/package.json'</span>))
}
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = ({
  targets,
  ignoreBrowserslistConfig = <span class="hljs-keyword">false</span>,
  forceAllTransforms = <span class="hljs-keyword">false</span>,
  transformRuntime = <span class="hljs-keyword">true</span>,
  absoluteRuntime = <span class="hljs-keyword">false</span>,
  supportsDynamicImport = <span class="hljs-keyword">false</span>,
} = {}) =&gt; {
  <span class="hljs-keyword">return</span> declare(
    (
      api,
      {modules = <span class="hljs-string">'auto'</span>, absoluteRuntimePath = getAbsoluteRuntimePath()},
    ) =&gt; {
      api.assertVersion(<span class="hljs-number">7</span>)
      <span class="hljs-comment">// 返回配置内容</span>
      <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// https://github.com/webpack/webpack/issues/4039#issuecomment-419284940</span>
        sourceType: <span class="hljs-string">'unambiguous'</span>,
        exclude: /<span class="hljs-meta">@babel</span>\/runtime/,
        presets: [
          [
            require(<span class="hljs-string">'@babel/preset-env'</span>).<span class="hljs-keyword">default</span>,
            {
              <span class="hljs-comment">// 统一 @babel/preset-env 配置</span>
              useBuiltIns: <span class="hljs-keyword">false</span>,
              modules,
              targets,
              ignoreBrowserslistConfig,
              forceAllTransforms,
              exclude: [<span class="hljs-string">'transform-typeof-symbol'</span>],
            },
          ],
        ],
        plugins: [
          transformRuntime &amp;&amp; [
            require(<span class="hljs-string">'@babel/plugin-transform-runtime'</span>).<span class="hljs-keyword">default</span>,
            {
              absoluteRuntime: absoluteRuntime ? absoluteRuntimePath : <span class="hljs-keyword">false</span>,
            },
          ],
          require(<span class="hljs-string">'@babel/plugin-syntax-dynamic-import'</span>).<span class="hljs-keyword">default</span>,
          !supportsDynamicImport &amp;&amp;
            !api.caller(caller =&gt; caller &amp;&amp; caller.supportsDynamicImport) &amp;&amp;
            require(<span class="hljs-string">'babel-plugin-dynamic-import-node'</span>),
          [
            require(<span class="hljs-string">'@babel/plugin-proposal-object-rest-spread'</span>).<span class="hljs-keyword">default</span>,
            {loose: <span class="hljs-keyword">true</span>, useBuiltIns: <span class="hljs-keyword">true</span>},
          ],
        ].filter(Boolean),
        env: {
          test: {
            presets: [
              [
                require(<span class="hljs-string">'@babel/preset-env'</span>).<span class="hljs-keyword">default</span>,
                {
                  useBuiltIns: <span class="hljs-keyword">false</span>,
                  targets: {node: <span class="hljs-string">'current'</span>},
                  ignoreBrowserslistConfig: <span class="hljs-keyword">true</span>,
                  exclude: [<span class="hljs-string">'transform-typeof-symbol'</span>],
                },
              ],
            ],
            plugins: [
              [
                require(<span class="hljs-string">'@babel/plugin-transform-runtime'</span>).<span class="hljs-keyword">default</span>,
                {
                  absoluteRuntime: absoluteRuntimePath,
                },
              ],
              require(<span class="hljs-string">'babel-plugin-dynamic-import-node'</span>),
            ],
          },
        },
      }
    },
  )
}
</code></pre>
<p data-nodeid="7708">基于以上设计，对于 SSR 应用的编译流程（需要编译适配 Node.js 环境）使用方法为：</p>
<pre class="lang-java" data-nodeid="7709"><code data-language="java"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> target = process.env.BUILD_TARGET <span class="hljs-comment">// 'web' | 'node'</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  target,
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: /\.js$/,
        oneOf: [
          {
            exclude: /node_modules/,
            loader: <span class="hljs-string">'babel-loader'</span>,
            options: {
              cacheDirectory: <span class="hljs-keyword">true</span>,
              presets: [[<span class="hljs-string">'@lucas/babel-preset/app'</span>, {target}]],
            },
          },
          {
            loader: <span class="hljs-string">'babel-loader'</span>,
            options: {
              cacheDirectory: <span class="hljs-keyword">true</span>,
              configFile: <span class="hljs-keyword">false</span>,
              presets: [[<span class="hljs-string">'@lucas/babel-preset/dependencies'</span>, {target}]],
              compact: <span class="hljs-keyword">false</span>,
            },
          },
        ],
      },
    ],
  },
}
</code></pre>
<p data-nodeid="7710">我们同样按照<code data-backticks="1" data-nodeid="7957">node_modules</code>进行了区分，对于<code data-backticks="1" data-nodeid="7959">node_modules</code>第三方依赖，使用<code data-backticks="1" data-nodeid="7961">@lucas/babel-preset/dependencies</code>预设，同时传入<code data-backticks="1" data-nodeid="7963">target</code>参数。对于非<code data-backticks="1" data-nodeid="7965">node_modules</code>的业务代码，使用<code data-backticks="1" data-nodeid="7967">@lucas/babel-preset/app</code>这个预设，同时设定相应环境 target，<code data-backticks="1" data-nodeid="7969">@lucas/babel-preset/app</code>内容为：</p>
<pre class="lang-java" data-nodeid="7711"><code data-language="java"><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> {declare} = require(<span class="hljs-string">'@babel/helper-plugin-utils'</span>)
<span class="hljs-keyword">const</span> getAbsoluteRuntimePath = () =&gt; {
  <span class="hljs-keyword">return</span> path.dirname(require.resolve(<span class="hljs-string">'@babel/runtime/package.json'</span>))
}
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = ({
  targets,
  ignoreBrowserslistConfig = <span class="hljs-keyword">false</span>,
  forceAllTransforms = <span class="hljs-keyword">false</span>,
  transformRuntime = <span class="hljs-keyword">true</span>,
  absoluteRuntime = <span class="hljs-keyword">false</span>,
  supportsDynamicImport = <span class="hljs-keyword">false</span>,
} = {}) =&gt; {
  <span class="hljs-keyword">return</span> declare(
    (
      api,
      {
        modules = <span class="hljs-string">'auto'</span>,
        absoluteRuntimePath = getAbsoluteRuntimePath(),
        react = <span class="hljs-keyword">true</span>,
        presetReactOptions = {},
      },
    ) =&gt; {
      api.assertVersion(<span class="hljs-number">7</span>)
      <span class="hljs-keyword">return</span> {
        presets: [
          [
            require(<span class="hljs-string">'@babel/preset-env'</span>).<span class="hljs-keyword">default</span>,
            {
              useBuiltIns: <span class="hljs-keyword">false</span>,
              modules,
              targets,
              ignoreBrowserslistConfig,
              forceAllTransforms,
              exclude: [<span class="hljs-string">'transform-typeof-symbol'</span>],
            },
          ],
          react &amp;&amp; [
            require(<span class="hljs-string">'@babel/preset-react'</span>).<span class="hljs-keyword">default</span>,
            {useBuiltIns: <span class="hljs-keyword">true</span>, runtime: <span class="hljs-string">'automatic'</span>, ...presetReactOptions},
          ],
        ].filter(Boolean),
        plugins: [
          transformRuntime &amp;&amp; [
            require(<span class="hljs-string">'@babel/plugin-transform-runtime'</span>).<span class="hljs-keyword">default</span>,
            {
              useESModules: <span class="hljs-string">'auto'</span>,
              absoluteRuntime: absoluteRuntime ? absoluteRuntimePath : <span class="hljs-keyword">false</span>,
            },
          ],
          <span class="hljs-comment">// https://github.com/facebook/create-react-app/issues/4263</span>
          [
            require(<span class="hljs-string">'@babel/plugin-proposal-class-properties'</span>).<span class="hljs-keyword">default</span>,
            {loose: <span class="hljs-keyword">true</span>},
          ],
          require(<span class="hljs-string">'@babel/plugin-syntax-dynamic-import'</span>).<span class="hljs-keyword">default</span>,
          !supportsDynamicImport &amp;&amp;
            !api.caller(caller =&gt; caller &amp;&amp; caller.supportsDynamicImport) &amp;&amp;
            require(<span class="hljs-string">'babel-plugin-dynamic-import-node'</span>),
          [
            require(<span class="hljs-string">'@babel/plugin-proposal-object-rest-spread'</span>).<span class="hljs-keyword">default</span>,
            {loose: <span class="hljs-keyword">true</span>, useBuiltIns: <span class="hljs-keyword">true</span>},
          ],
          require(<span class="hljs-string">'@babel/plugin-proposal-nullish-coalescing-operator'</span>).<span class="hljs-keyword">default</span>,
          require(<span class="hljs-string">'@babel/plugin-proposal-optional-chaining'</span>).<span class="hljs-keyword">default</span>,
        ].filter(Boolean),
        env: {
          development: {
            presets: [
              react &amp;&amp; [
                require(<span class="hljs-string">'@babel/preset-react'</span>).<span class="hljs-keyword">default</span>,
                {
                  useBuiltIns: <span class="hljs-keyword">true</span>,
                  development: <span class="hljs-keyword">true</span>,
                  runtime: <span class="hljs-string">'automatic'</span>,
                  ...presetReactOptions,
                },
              ],
            ].filter(Boolean),
          },
          test: {
            presets: [
              [
                require(<span class="hljs-string">'@babel/preset-env'</span>).<span class="hljs-keyword">default</span>,
                {
                  useBuiltIns: <span class="hljs-keyword">false</span>,
                  targets: {node: <span class="hljs-string">'current'</span>},
                  ignoreBrowserslistConfig: <span class="hljs-keyword">true</span>,
                  exclude: [<span class="hljs-string">'transform-typeof-symbol'</span>],
                },
              ],
              react &amp;&amp; [
                require(<span class="hljs-string">'@babel/preset-react'</span>).<span class="hljs-keyword">default</span>,
                {
                  useBuiltIns: <span class="hljs-keyword">true</span>,
                  development: <span class="hljs-keyword">true</span>,
                  runtime: <span class="hljs-string">'automatic'</span>,
                  ...presetReactOptions,
                },
              ],
            ].filter(Boolean),
            plugins: [
              [
                require(<span class="hljs-string">'@babel/plugin-transform-runtime'</span>).<span class="hljs-keyword">default</span>,
                {
                  useESModules: <span class="hljs-string">'auto'</span>,
                  absoluteRuntime: absoluteRuntimePath,
                },
              ],
              require(<span class="hljs-string">'babel-plugin-dynamic-import-node'</span>),
            ],
          },
        },
      }
    },
  )
}
</code></pre>
<p data-nodeid="7712">而对于一个公共库，使用方式为：</p>
<pre class="lang-java" data-nodeid="7713"><code data-language="java"><span class="hljs-comment">// babel.config.js</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  presets: [<span class="hljs-string">'@lucas/babel-preset/library'</span>],
}
</code></pre>
<p data-nodeid="7714">对应<code data-backticks="1" data-nodeid="7973">@lucas/babel-preset/library</code>内容为：</p>
<pre class="lang-java" data-nodeid="7715"><code data-language="java"><span class="hljs-keyword">const</span> create = require(<span class="hljs-string">'../app/create'</span>)
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = create({
  targets: {node: <span class="hljs-string">'current'</span>},
  ignoreBrowserslistConfig: <span class="hljs-keyword">true</span>,
  supportsDynamicImport: <span class="hljs-keyword">true</span>,
})
</code></pre>
<p data-nodeid="7716">这里的预设会将公共库按照当前 Node.js 环境标准编译。如果需要将该公共库编译降级到 ES5，需要使用<code data-backticks="1" data-nodeid="7976">@lucas/babel-preset/library/compact</code>内容为：</p>
<pre class="lang-java" data-nodeid="7717"><code data-language="java"><span class="hljs-keyword">const</span> create = require(<span class="hljs-string">'../app/create'</span>)
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = create({
  ignoreBrowserslistConfig: <span class="hljs-keyword">true</span>,
  supportsDynamicImport: <span class="hljs-keyword">true</span>,
})
</code></pre>
<p data-nodeid="7718">这里的<code data-backticks="1" data-nodeid="7979">../app/create.js</code>即为上述<code data-backticks="1" data-nodeid="7981">@lucas/babel-preset/app</code>内容。</p>
<p data-nodeid="7719">我们通过图示来表述整体架构：</p>
<p data-nodeid="7720"><img src="https://s0.lgstatic.com/i/image/M00/8C/C6/CgqCHl_0Bs2AS-oEABN0rwjVVsY144.png" alt="Drawing 1.png" data-nodeid="7986"></p>
<p data-nodeid="7721">需要说明以下内容。</p>
<p data-nodeid="7722"><strong data-nodeid="8011">1. @lucas/babel-preset/app：</strong><br>
应用项目使用，编译项目代码。SSR 项目可以配置参数 target: 'web' | 'node'。<strong data-nodeid="8012">默认支持 JSX 语法，并支持一些常用的语法提案</strong>(如 class properties)。</p>
<ul data-nodeid="7723">
<li data-nodeid="7724">
<p data-nodeid="7725">web：开启全部 transforms</p>
</li>
<li data-nodeid="7726">
<p data-nodeid="7727">node：编译到 node: 'current'</p>
</li>
</ul>
<p data-nodeid="7728"><strong data-nodeid="8042">2. @lucas/babel-preset/dependencies</strong>：应用项目使用，编译 node_modules。SSR 项目可以配置参数 target: 'web' | 'node'。<strong data-nodeid="8043">只支持当前 ES 规范包含的语法，不包含 JSX 语法及提案中的语法支持</strong>。</p>
<ul data-nodeid="7729">
<li data-nodeid="7730">
<p data-nodeid="7731">web：开启全部 transforms</p>
</li>
<li data-nodeid="7732">
<p data-nodeid="7733">node：编译到 node: 'current'</p>
</li>
</ul>
<p data-nodeid="7734"><strong data-nodeid="8065">3. @lucas/babel-preset/library：</strong> 公共库项目使用。用于 prepare 阶段的 Babel 编译。(如 ./src 通过 Babel 编译到 ./lib)。<strong data-nodeid="8066">默认支持 JSX 语法，并支持一些常用的语法提案</strong>(如 class properties)。编译到 node: 'current'。如果需要将 library 编译为 ES5，需要使用 @lucas/babel-preset/library/compat；library 打包编译为 UMD，使用 @lucas/babel-preset/app。</p>
<p data-nodeid="7735">上述设计，我参考了<a href="https://github.com/facebook/create-react-app/blob/master/packages/babel-preset-react-app/create.js" data-nodeid="8070">facebook/create-react-app</a>部分内容，建议你阅读源码，并结合注释理解其细节，比如<a href="https://github.com/facebook/create-react-app/blob/master/packages/babel-preset-react-app/create.js#L87" data-nodeid="8074">对于 transform-typeof-symbol 的编译</a>：</p>
<pre class="lang-java" data-nodeid="7736"><code data-language="java">(isEnvProduction || isEnvDevelopment) &amp;&amp; [
    <span class="hljs-comment">// 最新稳定的 ECMAScript 特性</span>
    require(<span class="hljs-string">'@babel/preset-env'</span>).<span class="hljs-keyword">default</span>,
    {
      useBuiltIns: <span class="hljs-string">'entry'</span>,
      corejs: <span class="hljs-number">3</span>,
      <span class="hljs-comment">// 排除 transform-typeof-symbol，这会让编译过慢</span>
      exclude: [<span class="hljs-string">'transform-typeof-symbol'</span>],
    },
  ],
</code></pre>
<p data-nodeid="7737">在使用<code data-backticks="1" data-nodeid="8077">@babel/preset-env</code>时，使用了<code data-backticks="1" data-nodeid="8079">useBuiltIns: 'entry'</code>设置 polyfills，同时将<code data-backticks="1" data-nodeid="8081">@babel/plugin-transform-typeof-symbol</code>排除在外，这是因为<code data-backticks="1" data-nodeid="8083">@babel/plugin-transform-typeof-symbol</code>会劫持 typeof 特性，使得代码运行时变慢。相关讨论可参见 <a href="https://github.com/facebook/create-react-app/pull/5278" data-nodeid="8087">issue</a>。</p>
<p data-nodeid="7738">最后，这里的预设规范并不代表完全的最佳实践，而是以 React 技术栈风格，统一一个企业级公共库和接入准则，Babel 编译预设可以按照实际项目和企业的需要进行设计，这里更多是一个启迪的作用。</p>
<h3 data-nodeid="7739">总结</h3>
<p data-nodeid="7740">这一讲我们从一个“线上问题”出发，剖析了公共库和应用方的不同编译理念，并通过设计一个万能 Babel 预设，阐明了公共库的编译和应用的使用需要密切配合，才能在当前前端生态中保障一个更合理的基础建设根基。相关知识并未完结，我们将在下一讲中，从零打造一个公共库来实践说明相关理论。</p>
<p data-nodeid="7741" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image2/M01/04/A4/Cip5yF_0OaOAPb48AAf5-twsvFI497.png" alt="前端基建 金句.png" data-nodeid="8094"></p>

---

### 精选评论

##### *鹏：
> 看完两眼一抹黑，懵逼了。 对babel零基础的应该先从哪下手？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 官网和社区资料

##### **用户7560：
> 为啥感觉这些东西没用过呢， 我们用的preset是 @babel/preset-env这个东西

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 都是 @babel/preset-env，里面配置有所区别

##### **0216：
> 老师讲的太好了，公共库开发体验有什么好的办法吗？最近就在写一个ui库，和业务方不是monorepo，就遇到了调试问题，现在用的方法是 nodemon 监控ui库文件变化，然后使用 yalc publish，业务方则用 yalc add modules 实现热更新调试。不过这个办法业务方取到的是编译后的 dist 文件，断点调试就很不方便

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 这么看一般使用 yarn/npm link 吧。这个问题不是 monorepo 的问题，是任何一个公共库都会遇见的问题。因此其实并不算一个问题，你作为库的开发者，应当保证发版后的可用性，而业务做或者不做相应的升级

##### **8621：
> 这篇太难了，目前水平看不太懂，好困惑，等我再学习学习babel再来……😨

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 加油~

##### **黎：
> 我刚看完这篇就遇到了一个ios10.2的白屏问题，秒解决😀

##### **黎：
> babel感觉自己很陌生，有什么好的学习资料吗？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 官网，官网吃透，你就比我强~

##### Darcy：
> 期待新章节

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 周1/3更新哈，下一讲也干货满满！

##### *俊：
> 作为前端工程化的内容很好，迫不及待看完

