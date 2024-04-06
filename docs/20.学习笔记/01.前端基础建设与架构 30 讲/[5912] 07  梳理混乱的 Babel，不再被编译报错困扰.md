<p data-nodeid="21749" class="">今天我和你分享的话题和 Babel 相关。Babel 在前端中占有举足轻重的历史地位，几乎所有的大型前端应用项目都离不开 Babel 的支持。同时，Babel 不仅仅是一个工具，更是一个<strong data-nodeid="21755">工具链（toolchain）</strong>，是前端基建中绝对重要的一环。</p>






<p data-nodeid="24286">对于很多前端工程师来说，你可能配置过 Babel，也可能看过一些关于 Babel 插件或原理的文章。但我认为，“配置工程师”只是我们的起点，通过阅读几篇 Babel 插件编写的文章并不能让我们真正掌握 Babel 的设计思想和原理。</p>
<p data-nodeid="24287">对于 Babel 的学习，不能停留在配置层面，我们需要从更高的角度认识 Babel 在工程上的方方面面和设计思想。这一讲就让我们深入 Babel 生态，了解前端基建工程中最重要的一环。</p>




<h3 data-nodeid="14744">Babel 是什么</h3>
<p data-nodeid="14745">借用 Babel 官方的一句话简短介绍：</p>
<blockquote data-nodeid="14746">
<p data-nodeid="14747">Babel is a JavaScript compiler.</p>
</blockquote>
<p data-nodeid="14748">Babel 其实就是一个 JavaScript 的“编译器”。但是一个简单的编译器如何会成为影响前端项目的“大杀器”呢？究其原因，主要是前端语言特性和宿主（浏览器/Node.js 等）环境高速发展，但<strong data-nodeid="14913">宿主环境对新语言特性的支持无法做到即时，而开发者又需要兼容各种宿主环境</strong>，因此语言特性的降级成为刚需。</p>
<p data-nodeid="14749">另一方面，前端框架“<strong data-nodeid="14919">自定义 DSL</strong>”的风格越来越凸显，使得前端各种“姿势”的代码被编译为 JavaScript 的需求成为标配。因此 Babel 的职责半径越来越大，它需要完成以下内容：</p>
<ul data-nodeid="14750">
<li data-nodeid="14751">
<p data-nodeid="14752">语法转换，一般是高级语言特性的降级；</p>
</li>
<li data-nodeid="14753">
<p data-nodeid="14754">Polyfill（垫片/补丁）特性的实现和接入；</p>
</li>
<li data-nodeid="14755">
<p data-nodeid="14756">源码转换，比如 JSX 等。</p>
</li>
</ul>
<blockquote data-nodeid="14757">
<p data-nodeid="14758"><a href="https://babeljs.io/videos.html" data-nodeid="14925">更多需求，点击这里查看</a>。</p>
</blockquote>
<p data-nodeid="27448" class="">为了完成这些编译工作，Babel 不能大包大揽地实现一切，更不能用面条式毫无设计模式可言的方式来 Coding。因此，Babel 的设计，在工程化的角度上，需要秉承以下理念：</p>


<ul data-nodeid="29996">
<li data-nodeid="29997">
<p data-nodeid="29998"><strong data-nodeid="30007">可插拔</strong>（Pluggable），比如 Babel 需要有一套灵活的插件机制，召集第三方开发者力量，同时还需要方便接入各种工具；</p>
</li>
<li data-nodeid="29999">
<p data-nodeid="30000"><strong data-nodeid="30012">可调式</strong>（Debuggable），比如 Babel 在编译过程中，要提供一套 Source Map，来帮助使用者在编译结果和编译前源码之间建立映射关系，方便调试；</p>
</li>
<li data-nodeid="30001">
<p data-nodeid="30002" class=""><strong data-nodeid="30021">基于协定</strong>（Compact），Compact 可以简单翻译为基于协定，主要是指实现灵活的配置方式，比如你熟悉的 Babel<a href="https://2ality.com/2015/12/babel6-loose-mode.html" data-nodeid="30019">loose 模式</a>，Babel 提供 loose 选项，帮助开发者在“尽量还原规范”和“更小的编译产出体积”之间，找到平衡。</p>
</li>
</ul>


<p data-nodeid="14767">我们总结一下，<strong data-nodeid="14952">编译是 Babel 的核心目标</strong>，因此它自身的实现基于编译原理，深入 AST（抽象语法树）来生成目标代码；同时，Babel 需要工程化协作，需要和各种工具（如 Webpack）相互配合，因此 Babel 一定是庞大复杂的。</p>
<p data-nodeid="14768">接下来，我们继续深入 Babel，了解这个“庞然大物”的运作方式和实现原理。</p>
<h3 data-nodeid="14769">Babel Monorepo 架构包解析</h3>
<p data-nodeid="24920" class="">为了以最完美的方式支撑上述职责，Babel 的“家族”可谓枝繁叶茂。Babel 是一个使用 Lerna 构建的 Monorepo 风格的仓库，在其<a href="https://github.com/babel/babel/tree/main/packages" data-nodeid="24924"><code data-backticks="1" data-nodeid="24923">./packages</code></a>目录下有 140 多个包，这些包我经过整合分类，并按照重要性筛选出来，可以用下面这张图片简单概括：</p>

<p data-nodeid="14771"><img src="https://s0.lgstatic.com/i/image/M00/8C/84/CgqCHl_toZGAYAFJAAFicXOL898453.png" alt="Drawing 0.png" data-nodeid="14962"></p>
<p data-nodeid="14772">其中 Babel 部分包你可能见过或者使用过，但并不确定它们起到了什么作用；有些包，你可能都没有听说过。总的来说，可以分为两种情况：</p>
<ul data-nodeid="14773">
<li data-nodeid="14774">
<p data-nodeid="14775">Babel 一些包的意义是在工程上起作用，因此对于业务来说是不透明的，比如一些插件可能被 Babel preset 预设机制打包对外输出；</p>
</li>
<li data-nodeid="14776">
<p data-nodeid="14777">Babel 一些包是为了纯工程项目使用，或者运行目标在 Node.js 环境中，相对来讲你对这些会更熟悉。</p>
</li>
</ul>
<p data-nodeid="14778">下面，我会对一些“Babel 家族重点成员”进行梳理，并简单说说它们的基本原理。</p>
<p data-nodeid="14779"><a href="https://babeljs.io/docs/en/babel-core" data-nodeid="14969">@babel/core</a> <strong data-nodeid="14975">是 Babel 实现转换的核心</strong>，它可以根据配置，进行源码的编译转换：</p>
<pre class="lang-java" data-nodeid="14780"><code data-language="java"><span class="hljs-keyword">var</span> babel = require(<span class="hljs-string">"@babel/core"</span>);

babel.transform(code, options, function(err, result) {
  result; <span class="hljs-comment">// =&gt; { code, map, ast }</span>
});
</code></pre>
<p data-nodeid="14781"><a href="https://babeljs.io/docs/en/babel-cli" data-nodeid="14978">@babel/cli</a> <strong data-nodeid="14992">是 Babel 提供的命令行</strong>，它可以在终端中通过命令行方式运行，编译文件或目录。我们简单说一下它的实现原理：@babel/cli 使用了 <a href="https://github.com/babel/babel/blob/main/packages/babel-cli/package.json#L26" data-nodeid="14986">commander</a> 库搭建基本的命令行开发。以编译文件为例，其关键部分<a href="https://github.com/babel/babel/blob/main/packages/babel-cli/package.json#L26" data-nodeid="14990">源码如下</a>：</p>
<pre class="lang-java" data-nodeid="14782"><code data-language="java"><span class="hljs-keyword">import</span> * as util from <span class="hljs-string">"./util"</span>;
<span class="hljs-keyword">const</span> results = await Promise.all(
  _filenames.map(<span class="hljs-function">async <span class="hljs-title">function</span> <span class="hljs-params">(filename: string)</span>: Promise&lt;Object&gt; </span>{
    let sourceFilename = filename;
    <span class="hljs-keyword">if</span> (cliOptions.outFile) {
      sourceFilename = path.relative(
        path.dirname(cliOptions.outFile),
        sourceFilename,
      );
    }
    <span class="hljs-comment">// 获取文件名</span>
    sourceFilename = slash(sourceFilename);
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> await util.compile(filename, {
        ...babelOptions,
        sourceFileName: sourceFilename,
        <span class="hljs-comment">// 获取 sourceMaps 配置项</span>
        sourceMaps:
          babelOptions.sourceMaps === <span class="hljs-string">"inline"</span>
            ? <span class="hljs-keyword">true</span>
            : babelOptions.sourceMaps,
      });
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-keyword">if</span> (!cliOptions.watch) {
        <span class="hljs-keyword">throw</span> err;
      }
      console.error(err);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>;
    }
  }),
);
</code></pre>
<p data-nodeid="14783">在上述代码中，@babel/cli 使用了<code data-backticks="1" data-nodeid="14994">util.compile</code>方法执行关键的编译操作，而该方法定义在 <a href="https://github.com/babel/babel/blob/master/packages/babel-cli/src/babel/util.js#L80" data-nodeid="14998">babel-cli/src/babel/util.js</a> 中：</p>
<pre class="lang-java" data-nodeid="14784"><code data-language="java"><span class="hljs-keyword">import</span> * as babel from <span class="hljs-string">"@babel/core"</span>;
<span class="hljs-comment">// 核心编译方法</span>
<span class="hljs-function">export function <span class="hljs-title">compile</span><span class="hljs-params">(
  filename: string,
  opts: Object | Function,
)</span>: Promise&lt;Object&gt; </span>{
  <span class="hljs-comment">// 编译配置</span>
  opts = {
    ...opts,
    caller: CALLER,
  };
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise((resolve, reject) =&gt; {
    <span class="hljs-comment">// 调用 transformFile 方法执行编译过程</span>
    babel.transformFile(filename, opts, (err, result) =&gt; {
      <span class="hljs-keyword">if</span> (err) reject(err);
      <span class="hljs-keyword">else</span> resolve(result);
    });
  });
}
</code></pre>
<p data-nodeid="14785">由此可见，@babel/cli 负责获取配置内容，并最终依赖了 @babel/core 完成编译。</p>
<p data-nodeid="14786">事实上，我们可以在 @babel/cli 的 package.json 中找到线索：</p>
<pre class="lang-java" data-nodeid="14787"><code data-language="java"><span class="hljs-string">"peerDependencies"</span>: {
	<span class="hljs-string">"@babel/core"</span>: <span class="hljs-string">"^7.0.0-0"</span>
},
</code></pre>
<p data-nodeid="14788">这一部分的源码在 <a href="https://github.com/babel/babel/blob/master/packages/babel-cli/package.json#L39" data-nodeid="15005">peerDependencies</a> 当中，你可以课后再次学习。</p>
<p data-nodeid="14789">现在，你应该进一步体会到了 @babel/core 的作用，<strong data-nodeid="15018">作为 @babel/cli 的关键依赖，@babel/core 提供了基础的编译能力</strong>。至于为什么在 @babel/cli 中，使用<code data-backticks="1" data-nodeid="15012">peerDependencies</code>，你可以在 <a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=584#/detail/pc?id=5908" data-nodeid="15016">03 讲“CI 环境上的 npm 优化及更多工程化问题解析”</a>中找到答案。</p>
<p data-nodeid="14790">我们花时间梳理 @babel/cli 和 @babel/core 包，希望帮助你对于 Babel 各个包之间的协同分工有个整体感知，这也是 Monorepo 风格仓库常见的设计形式。接下来，我们再继续看更多“家族成员”。</p>
<p data-nodeid="14791"><a href="https://github.com/babel/babel/tree/main/packages/babel-standalone" data-nodeid="15022">@babel/standalone</a>这个包非常有趣，它可以在非 Node.js 环境（比如浏览器环境）自动编译含有 text/babel 或 text/jsx 的 type 值的 script 标签，并进行编译，如下面代码：</p>
<pre class="lang-java" data-nodeid="14792"><code data-language="java">&lt;script src="https://unpkg.com/@babel/standalone/babel.min.js"&gt;&lt;/script&gt;
&lt;script type="text/babel"&gt;
	const getMessage = () =&gt; "Hello World";
	document.getElementById('output').innerHTML = getMessage();
&lt;/script&gt;
</code></pre>
<p data-nodeid="14793">其工作原理藏在 <a href="https://github.com/babel/babel/tree/main/packages/babel-standalone" data-nodeid="15027">babel-standalone</a> 的<a href="https://github.com/babel/babel/blob/0641a15030565e7f47ef0c5ff25f36264c182b11/packages/babel-standalone/src/transformScriptTags.js#L132" data-nodeid="15031">核心源码</a>中，最后的编译行为由：</p>
<pre class="lang-java" data-nodeid="14794"><code data-language="java"><span class="hljs-keyword">import</span> {
  transformFromAst as babelTransformFromAst,
  transform as babelTransform,
  buildExternalHelpers as babelBuildExternalHelpers,
} from <span class="hljs-string">"@babel/core"</span>;
</code></pre>
<p data-nodeid="14795">来提供。因此，我们又看到了另一个基于 @babel/core 的应用：@babel/standalone。</p>
<p data-nodeid="14796"><strong data-nodeid="15046">@babel/standalone 可以在浏览器中直接执行</strong>，因此这个包对于<strong data-nodeid="15047">浏览器环境动态插入高级语言特性的脚本</strong>、<strong data-nodeid="15048">在线自动解析编译</strong>非常有意义。我们知道的 Babel 官网也用到了这个包，JSFiddle、JS Bin 等也都是 @babel/standalone 的受益者。</p>
<p data-nodeid="14797">我认为，在前端发展方向之一——Web IDE 和智能化方向上，相信类似的设计和技术将会有更多的施展空间，@babel/standalone 对于我们的现代化前端发展思路，应该有启发。</p>
<p data-nodeid="35098" class="te-preview-highlight">至此，我们看到了 @babel/core 被多个 Babel 包应用，而 @babel/core 的能力由更底层的 <strong data-nodeid="35116">@babel/parser</strong>、<strong data-nodeid="35117">@babel/code-frame</strong>、<strong data-nodeid="35118">@babel/generator</strong>、<strong data-nodeid="35119">@babel/traverse、@babel/types</strong>等包提供。这些“家族成员”提供了更基础的 AST 处理能力。</p>




<p data-nodeid="14799" class="">我们先看 <a href="https://babeljs.io/docs/en/babel-parser" data-nodeid="15075">@babel/parser</a>，它是 Babel 用来对 JavaScript 语言解析的解析器。</p>
<p data-nodeid="14800">@babel/parser 的实现主要依赖并参考了 <a href="https://github.com/acornjs/acorn" data-nodeid="15080">acorn</a> 和 <a href="https://github.com/acornjs/acorn-jsx" data-nodeid="15084">acorn-jsx</a>，典型用法：</p>
<pre class="lang-java" data-nodeid="14801"><code data-language="java">require(<span class="hljs-string">"@babel/parser"</span>).parse(<span class="hljs-string">"code"</span>, {
  sourceType: <span class="hljs-string">"module"</span>,
  plugins: [
    <span class="hljs-string">"jsx"</span>,
    <span class="hljs-string">"flow"</span>
  ]
});
</code></pre>
<p data-nodeid="14802">parse<a href="https://github.com/babel/babel/blob/main/packages/babel-parser/src/index.js#L18" data-nodeid="15089">源码实现</a>：</p>
<pre class="lang-java" data-nodeid="14803"><code data-language="java"><span class="hljs-function">export function <span class="hljs-title">parse</span><span class="hljs-params">(input: string, options?: Options)</span>: File </span>{
  <span class="hljs-keyword">if</span> (options?.sourceType === <span class="hljs-string">"unambiguous"</span>) {
    options = {
      ...options,
    };
    <span class="hljs-keyword">try</span> {
      options.sourceType = <span class="hljs-string">"module"</span>;
      <span class="hljs-comment">// 获取相应的编译器</span>
      <span class="hljs-keyword">const</span> parser = getParser(options, input);
      <span class="hljs-comment">// 使用编译器将源代码转为 ast</span>
      <span class="hljs-keyword">const</span> ast = parser.parse();
      <span class="hljs-keyword">if</span> (parser.sawUnambiguousESM) {
        <span class="hljs-keyword">return</span> ast;
      }
      <span class="hljs-keyword">if</span> (parser.ambiguousScriptDifferentAst) {
        <span class="hljs-keyword">try</span> {
          options.sourceType = <span class="hljs-string">"script"</span>;
          <span class="hljs-keyword">return</span> getParser(options, input).parse();
        } <span class="hljs-keyword">catch</span> {}
      } <span class="hljs-keyword">else</span> {
        ast.program.sourceType = <span class="hljs-string">"script"</span>;
      }
      <span class="hljs-keyword">return</span> ast;
    } <span class="hljs-keyword">catch</span> (moduleError) {
      <span class="hljs-keyword">try</span> {
        options.sourceType = <span class="hljs-string">"script"</span>;
        <span class="hljs-keyword">return</span> getParser(options, input).parse();
      } <span class="hljs-keyword">catch</span> {}
      <span class="hljs-keyword">throw</span> moduleError;
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> getParser(options, input).parse();
  }
}
</code></pre>
<p data-nodeid="14804">由此可见，<code data-backticks="1" data-nodeid="15092">require("@babel/parser").parse()</code>方法可以返回给我们一个针对源码编译得到的 AST，这里的 AST 符合<a href="https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md" data-nodeid="15096">Babel AST 格式</a>。</p>
<p data-nodeid="14805">有了 AST，我们<strong data-nodeid="15107">还需要对 AST 完成修改，才能产出编译后的代码</strong>。这就需要对 AST 进行遍历，此时 <a href="https://babeljs.io/docs/en/babel-traverse" data-nodeid="15105">@babel/traverse</a> 就派上用场了，使用方式如下：</p>
<pre class="lang-java" data-nodeid="14806"><code data-language="java">traverse(ast, {
  enter(path) {
    <span class="hljs-keyword">if</span> (path.isIdentifier({ name: <span class="hljs-string">"n"</span> })) {
      path.node.name = <span class="hljs-string">"x"</span>;
    }
  }
});
</code></pre>
<p data-nodeid="14807">遍历的同时，如何对 AST 上指定内容进行修改呢？这就又要引出另外一个“家族成员”，<a href="https://babeljs.io/docs/en/babel-types" data-nodeid="15111">@babel/types</a> <strong data-nodeid="15117">包提供了对具体的 AST 节点的修改能力</strong>。</p>
<p data-nodeid="14808">得到了编译后的 AST 之后，最后一步：使用 <a href="https://babeljs.io/docs/en/babel-generator" data-nodeid="15121">@babel/generator</a> <strong data-nodeid="15127">对新的 AST 进行聚合并生成 JavaScript 代码</strong>：</p>
<pre class="lang-java" data-nodeid="14809"><code data-language="java"><span class="hljs-keyword">const</span> output = generate(
  ast,
  {
    <span class="hljs-comment">/* options */</span>
  },
  code
);
</code></pre>
<p data-nodeid="14810">这样一个典型的 Babel 底层编译流程就出来了，如下图：</p>
<p data-nodeid="14811"><img src="https://s0.lgstatic.com/i/image/M00/8C/8A/CgqCHl_u4niAOtOmAAEw7EQpjEI596.png" alt="Lark20210101-165010.png" data-nodeid="15131"></p>
<div data-nodeid="14812"><p style="text-align:center">Babel 底层编译流程图</p></div>
<p data-nodeid="14813">上图也是 Babel 插件运作实现的基础。基于 AST 的操作，Babel 将上述所有能力开放给插件，让第三方能够更方便地操作 AST，并聚合成最后编译产出的代码。</p>
<p data-nodeid="14814">基于以上原理，Babel 具备了编译处理能力，但在工程中运用时，我们一般不会感知这些内容，你可能也很少直接操作 @babel/core、@babel/types 等，而应该对 @babel/preset-env 更加熟悉，毕竟 <a href="https://babeljs.io/docs/en/babel-preset-env" data-nodeid="15136">@babel/preset-env</a> <strong data-nodeid="15142">是直接暴露给开发者在业务中运用的包能力</strong>。</p>
<p data-nodeid="14815">在工程中，我们需要 Babel 做到的是编译降级，而这个编译降级一般通过 <a href="https://babeljs.io/docs/en/babel-preset-env" data-nodeid="15146">@babel/preset-env</a> 来配置。@babel/preset-env 允许我们配置需要支持的目标环境（一般是浏览器范围或 Node.js 版本范围），利用 <a href="https://babeljs.io/docs/en/babel-polyfill" data-nodeid="15150">babel-polyfill</a> 完成补丁的接入。结合上一讲内容，<strong data-nodeid="15160">@babel/polyfill 其实就是 core-js 和 regenerator-runtime 两个包的结合，@babel/polyfill 源码层面，通过 build-dist.sh 脚本，利用 browserify 进行打包</strong>，参考<a href="https://github.com/babel/babel/blob/main/packages/babel-polyfill/scripts/build-dist.sh" data-nodeid="15158">源码</a>：</p>
<pre class="lang-java" data-nodeid="14816"><code data-language="java">#!/bin/sh
set -ex
mkdir -p dist
yarn browserify lib/index.js \
  --insert-global-vars 'global' \
  --plugin bundle-collapser/plugin \
  --plugin derequire/plugin \
  &gt;dist/polyfill.js
yarn uglifyjs dist/polyfill.js \
  --compress keep_fnames,keep_fargs \
  --mangle keep_fnames \
  &gt;dist/polyfill.min.js
</code></pre>
<p data-nodeid="14817"><strong data-nodeid="15165">注意：@babel/polyfill 目前已经计划废弃</strong>，新的 Babel 生态（@babel/preset-env V7.4.0 版本）鼓励开发者直接在代码中引入 core-js 和 regenerator-runtime。但是不管直接导入 core-js 和 regenerator-runtime，还是直接导入 @babel/polyfill 都是引入了全量的 polyfills，@babel/preset-env 如何根据目标适配环境，按需引入业务中所需要的 polyfills 呢？</p>
<p data-nodeid="14818">事实上，@babel/preset-env 通过 <a href="https://babeljs.io/docs/en/babel-preset-env#targets" data-nodeid="15169">targets 参数</a>，按照 browserslist 规范，结 合<a href="https://www.npmjs.com/package/core-js-compat" data-nodeid="15173">core-js-compat</a>，筛选出适配环境所需的 polyfills（或 plugins），关键源码：</p>
<pre class="lang-java" data-nodeid="14819"><code data-language="java"><span class="hljs-function">export <span class="hljs-keyword">default</span> <span class="hljs-title">declare</span><span class="hljs-params">((api, opts)</span> </span>=&gt; {
  <span class="hljs-comment">// 规范参数</span>
  <span class="hljs-keyword">const</span> {
    bugfixes,
    configPath,
    debug,
    exclude: optionsExclude,
    forceAllTransforms,
    ignoreBrowserslistConfig,
    include: optionsInclude,
    loose,
    modules,
    shippedProposals,
    spec,
    targets: optionsTargets,
    useBuiltIns,
    corejs: { version: corejs, proposals },
    browserslistEnv,
  } = normalizeOptions(opts);
  let hasUglifyTarget = <span class="hljs-keyword">false</span>;
  <span class="hljs-comment">// 获取对应 targets</span>
  <span class="hljs-keyword">const</span> targets = getTargets(
    (optionsTargets: InputTargets),
    { ignoreBrowserslistConfig, configPath, browserslistEnv },
  );
  <span class="hljs-keyword">const</span> include = transformIncludesAndExcludes(optionsInclude);
  <span class="hljs-keyword">const</span> exclude = transformIncludesAndExcludes(optionsExclude);
  <span class="hljs-keyword">const</span> transformTargets = forceAllTransforms || hasUglifyTarget ? {} : targets;
  <span class="hljs-comment">// 获取需要兼容的内容</span>
  <span class="hljs-keyword">const</span> compatData = getPluginList(shippedProposals, bugfixes);
  <span class="hljs-keyword">const</span> modulesPluginNames = getModulesPluginNames({
    modules,
    transformations: moduleTransformations,
    shouldTransformESM: modules !== <span class="hljs-string">"auto"</span> || !api.caller?.(supportsStaticESM),
    shouldTransformDynamicImport:
      modules !== <span class="hljs-string">"auto"</span> || !api.caller?.(supportsDynamicImport),
    shouldTransformExportNamespaceFrom: !shouldSkipExportNamespaceFrom,
    shouldParseTopLevelAwait: !api.caller || api.caller(supportsTopLevelAwait),
  });
  <span class="hljs-comment">// 获取目标 plugin 名称</span>
  <span class="hljs-keyword">const</span> pluginNames = filterItems(
    compatData,
    include.plugins,
    exclude.plugins,
    transformTargets,
    modulesPluginNames,
    getOptionSpecificExcludesFor({ loose }),
    pluginSyntaxMap,
  );
  removeUnnecessaryItems(pluginNames, overlappingPlugins);
  <span class="hljs-keyword">const</span> polyfillPlugins = getPolyfillPlugins({
    useBuiltIns,
    corejs,
    polyfillTargets: targets,
    include: include.builtIns,
    exclude: exclude.builtIns,
    proposals,
    shippedProposals,
    regenerator: pluginNames.has(<span class="hljs-string">"transform-regenerator"</span>),
    debug,
  });
  <span class="hljs-keyword">const</span> pluginUseBuiltIns = useBuiltIns !== <span class="hljs-keyword">false</span>;
  <span class="hljs-comment">// 根据 pluginNames，返回一个 plugins 配置列表</span>
  <span class="hljs-keyword">const</span> plugins = Array.from(pluginNames)
    .map(pluginName =&gt; {
      <span class="hljs-keyword">if</span> (
        pluginName === <span class="hljs-string">"proposal-class-properties"</span> ||
        pluginName === <span class="hljs-string">"proposal-private-methods"</span> ||
        pluginName === <span class="hljs-string">"proposal-private-property-in-object"</span>
      ) {
        <span class="hljs-keyword">return</span> [
          getPlugin(pluginName),
          {
            loose: loose
              ? <span class="hljs-string">"#__internal__@babel/preset-env__prefer-true-but-false-is-ok-if-it-prevents-an-error"</span>
              : <span class="hljs-string">"#__internal__@babel/preset-env__prefer-false-but-true-is-ok-if-it-prevents-an-error"</span>,
          },
        ];
      }
      <span class="hljs-keyword">return</span> [
        getPlugin(pluginName),
        { spec, loose, useBuiltIns: pluginUseBuiltIns },
      ];
    })
    .concat(polyfillPlugins);
  <span class="hljs-keyword">return</span> { plugins };
});
</code></pre>
<p data-nodeid="14820">这部分内容你可以与上一讲“core-js 及垫片理念：设计一个‘最完美’的 Polyfill 方案”相结合，相信你会对前端“按需 polyfill”有一个更加清晰的认知。</p>
<p data-nodeid="14821">至于 Babel 家族的其他成员，相信你也一定见过 <a href="https://babeljs.io/docs/en/babel-plugin-transform-runtime" data-nodeid="15179">@babel/plugin-transform-runtime</a>，它可以<strong data-nodeid="15189">重复使用 Babel 注入的 helpers 函数</strong>，达到<strong data-nodeid="15190">节省代码大小</strong>的目的。</p>
<p data-nodeid="14822">比如，对于这样一段简单的代码：</p>
<pre class="lang-java" data-nodeid="14823"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span></span>{}
</code></pre>
<p data-nodeid="14824">Babel 在编译后，得到：</p>
<pre class="lang-java" data-nodeid="14825"><code data-language="java"><span class="hljs-function">function <span class="hljs-title">_instanceof</span><span class="hljs-params">(left, right)</span> </span>{ 
  <span class="hljs-keyword">if</span> (right != <span class="hljs-keyword">null</span> &amp;&amp; typeof Symbol !== <span class="hljs-string">"undefined"</span> &amp;&amp;   right[Symbol.hasInstance]) { 
    <span class="hljs-keyword">return</span> !!right[Symbol.hasInstance](left); 
  } 
  <span class="hljs-keyword">else</span> { 
    <span class="hljs-keyword">return</span> left <span class="hljs-keyword">instanceof</span> right; 
  } 
}
<span class="hljs-function">function <span class="hljs-title">_classCallCheck</span><span class="hljs-params">(instance, Constructor)</span> </span>{ 
  <span class="hljs-keyword">if</span> (!_instanceof(instance, Constructor)) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> TypeError(<span class="hljs-string">"Cannot call a class as a function"</span>); }
}
<span class="hljs-keyword">var</span> Person = <span class="hljs-function">function <span class="hljs-title">Person</span><span class="hljs-params">()</span> </span>{
  _classCallCheck(<span class="hljs-keyword">this</span>, Person);
};
</code></pre>
<p data-nodeid="14826">其中<code data-backticks="1" data-nodeid="15194">_instanceof</code>和<code data-backticks="1" data-nodeid="15196">_classCallCheck</code>都是 Babel 内置的 helpers 函数。如果每个 class 编译结果都在代码中植入这些 helpers 具体内容，对产出代码体积就会有明显恶化影响。在启用 @babel/plugin-transform-runtime 插件后，上述代码的编译结果可以变为：</p>
<pre class="lang-java" data-nodeid="14827"><code data-language="java"><span class="hljs-keyword">var</span> _interopRequireDefault = require(<span class="hljs-string">"@babel/runtime/helpers/interopRequireDefault"</span>);
<span class="hljs-keyword">var</span> _classCallCheck2 = _interopRequireDefault(require(<span class="hljs-string">"@babel/runtime/helpers/classCallCheck"</span>));
<span class="hljs-keyword">var</span> Person = <span class="hljs-function">function <span class="hljs-title">Person</span><span class="hljs-params">()</span> </span>{
  (<span class="hljs-number">0</span>, _classCallCheck2.<span class="hljs-keyword">default</span>)(<span class="hljs-keyword">this</span>, Person);
};
</code></pre>
<p data-nodeid="14828">从上述代码我们可以看到，_classCallCheck 作为模块依赖被引入文件中，基于打包工具的 cache 能力，从而减少了产出代码体积。需要注意的是，观察以上代码，_classCallCheck2 这个 helper 由 <a href="https://babeljs.io/docs/en/babel-runtime" data-nodeid="15205">@babel/runtime</a> 给出，这就又由一条线，牵出来了 Babel 家族的另一个包：@babel/runtime。</p>
<p data-nodeid="14829"><strong data-nodeid="15219">@babel/runtime</strong>含有 Babel 编译所需的一些运行时 helpers 函数，<strong data-nodeid="15220">供业务代码引入模块化的 Babel helpers 函数</strong>，同时它提供了 <a href="https://www.npmjs.com/package/regenerator-runtime" data-nodeid="15217">regenerator-runtime</a>，对 generator 和 async 函数进行编译降级。</p>
<p data-nodeid="14830">总结一下：</p>
<ul data-nodeid="14831">
<li data-nodeid="14832">
<p data-nodeid="14833">@babel/plugin-transform-runtime 需要和 @babel/runtime 配合使用；</p>
</li>
<li data-nodeid="14834">
<p data-nodeid="14835">@babel/plugin-transform-runtime 用于编译时，作为 devDependencies 使用；</p>
</li>
<li data-nodeid="14836">
<p data-nodeid="14837">@babel/plugin-transform-runtime 将业务代码编译，引用 @babel/runtime 提供的 helpers，达到缩减编译产出体积的目的；</p>
</li>
<li data-nodeid="14838">
<p data-nodeid="14839">@babel/runtime 用于运行时，作为 dependencies 使用。</p>
</li>
</ul>
<p data-nodeid="14840">另外，@babel/plugin-transform-runtime 和 @babel/runtime 结合还有一个作用：<strong data-nodeid="15231">它除了可以对产出代码瘦身以外，还能避免污染全局作用域</strong>。比如一个生成器函数：</p>
<pre class="lang-java" data-nodeid="14841"><code data-language="java">function* foo() {}
</code></pre>
<p data-nodeid="14842">正常经过 Babel 编译后，产出：</p>
<pre class="lang-java" data-nodeid="14843"><code data-language="java"><span class="hljs-keyword">var</span> _marked = [foo].map(regeneratorRuntime.mark);
<span class="hljs-function">function <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">return</span> regeneratorRuntime.wrap(
    function foo$(_context) {
      <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) {
        <span class="hljs-keyword">switch</span> ((_context.prev = _context.next)) {
          <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
          <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
            <span class="hljs-keyword">return</span> _context.stop();
        }
      }
    },
    _marked[<span class="hljs-number">0</span>],
    <span class="hljs-keyword">this</span>
  );
}
</code></pre>
<p data-nodeid="14844">其中 regeneratorRuntime 需要是一个全局变量，<strong data-nodeid="15238">上述编译后代码污染了全局空间</strong>。结合 @babel/plugin-transform-runtime 和 @babel/runtime，可以将上述代码转换为：</p>
<pre class="lang-java" data-nodeid="14845"><code data-language="java"><span class="hljs-comment">// 特别命名为 _regenerator 和 _regenerator2,避免污染命名空间</span>
<span class="hljs-keyword">var</span> _regenerator = require(<span class="hljs-string">"@babel/runtime/regenerator"</span>);
<span class="hljs-keyword">var</span> _regenerator2 = _interopRequireDefault(_regenerator);
<span class="hljs-function">function <span class="hljs-title">_interopRequireDefault</span><span class="hljs-params">(obj)</span> </span>{
  <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : { <span class="hljs-keyword">default</span>: obj };
}
<span class="hljs-keyword">var</span> _marked = [foo].map(_regenerator2.<span class="hljs-keyword">default</span>.mark);
<span class="hljs-comment">// 编译 await 为自执行的 generator 模式</span>
<span class="hljs-function">function <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">return</span> _regenerator2.<span class="hljs-keyword">default</span>.wrap(
    function foo$(_context) {
      <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) {
        <span class="hljs-keyword">switch</span> ((_context.prev = _context.next)) {
          <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
          <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
            <span class="hljs-keyword">return</span> _context.stop();
        }
      }
    },
    _marked[<span class="hljs-number">0</span>],
    <span class="hljs-keyword">this</span>
  );
}
</code></pre>
<p data-nodeid="14846">此时，regenerator 由 <code data-backticks="1" data-nodeid="15240">require("@babel/runtime/regenerator")</code>导出，且导出结果被赋值为一个文件作用域内的 _regenerator 变量，从而避免了污染。</p>
<p data-nodeid="14847">理清了这层关系，相信你在使用 Babel 家族成员时，能够更准确地从原理层面理解各项配置功能。</p>
<p data-nodeid="14848">最后，我们再梳理其他几个重要的 Babel 家族成员及其能力和实现原理。</p>
<ul data-nodeid="14849">
<li data-nodeid="14850">
<p data-nodeid="14851"><a href="https://babeljs.io/docs/en/plugins" data-nodeid="15248">@babel/plugin</a>是 Babel 插件集合。</p>
</li>
<li data-nodeid="14852">
<p data-nodeid="14853"><strong data-nodeid="15256">@babel/plugin-syntax-* 是 Babel 的语法插件</strong>。它的作用是扩展 @babel/parser 的一些能力，提供给工程使用。比如 @babel/plugin-syntax-top-level-await 插件，提供了使用 top level await 新特性的能力。</p>
</li>
<li data-nodeid="14854">
<p data-nodeid="14855"><strong data-nodeid="15263">@babel/plugin-proposal-* 用于编译转换在提议阶段的语言特性</strong>。</p>
</li>
<li data-nodeid="14856">
<p data-nodeid="14857"><strong data-nodeid="15270">@babel/plugin-transform-* 是 Babel 的转换插件</strong>。比如简单的 @babel/plugin-transform-react-display-name 插件，可以自动适配 React 组件 DisplayName，比如：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="14858"><code data-language="java"><span class="hljs-keyword">var</span> foo = React.createClass({}); <span class="hljs-comment">// React &lt;= 15</span>
<span class="hljs-keyword">var</span> bar = createReactClass({});  <span class="hljs-comment">// React 16+</span>
</code></pre>
<p data-nodeid="14859">上述调用，经过 @babel/plugin-transform-react-display-name，可以被编译为：</p>
<pre class="lang-java" data-nodeid="14860"><code data-language="java"><span class="hljs-keyword">var</span> foo = React.createClass({
  displayName: <span class="hljs-string">"foo"</span>
}); <span class="hljs-comment">// React &lt;= 15</span>
<span class="hljs-keyword">var</span> bar = createReactClass({
  displayName: <span class="hljs-string">"bar"</span>
}); <span class="hljs-comment">// React 16+</span>
</code></pre>
<ul data-nodeid="14861">
<li data-nodeid="14862">
<p data-nodeid="14863"><a href="https://babeljs.io/docs/en/babel-template" data-nodeid="15274">@babel/template</a> 封装了基于 AST 的模板能力，可以将字符串代码转换为 AST。比如在生成一些辅助代码（helper）时会用到这个库。</p>
</li>
<li data-nodeid="14864">
<p data-nodeid="14865">@<a href="https://babeljs.io/docs/en/babel-node" data-nodeid="15279">babel/node</a> 类似 Node.js Cli，@babel/node 提供在命令行执行高级语法的环境，也就是说，相比于 Node.js Cli，它加入了对更多特性的支持。</p>
</li>
<li data-nodeid="14866">
<p data-nodeid="14867"><a href="https://babeljs.io/docs/en/babel-register" data-nodeid="15283">@babel/register</a> 实际上是为 require 增加了一个 hook，使用之后，所有被 Node.js 引用的文件都会先被 Babel 转码。</p>
</li>
</ul>
<p data-nodeid="14868"><strong data-nodeid="15289">这里请注意</strong>@babel/node 和 @babel/register，都是在运行时进行编译转换，因此运行时性能上会有影响。在生产环境中，我们一般不直接使用。</p>
<p data-nodeid="14869">上述内容看似枯燥，涉及了一般对于业务开发者黑盒的编译产出、源码层面的实现原理、各个包直接的分工协调和组织，可能对于你来说，做到真正理解并非一夕之功。接下来，我们从更加宏观地角度来加深认识。</p>
<h3 data-nodeid="14870">Babel 工程生态架构设计和分层理念</h3>
<p data-nodeid="14871">了解了上述内容，也许你会想问，在平时开发中出镜率极高的 babel-loader 怎么没有看到？事实上，Babel 的生态是内聚的，也是开放的。我们通过 Babel 对代码的编译过程，可以从微观上缩小为前端基建的一个环节，这个环节融入整个工程中，也需要和其他环节相互配合。而 <a href="https://github.com/babel/babel-loader" data-nodeid="15295">babel-loader</a> <strong data-nodeid="15301">就是 Babel 结合 Webpack，融入整个基建环节的例子</strong>。</p>
<p data-nodeid="14872">在 Webpack 编译生命周期中，babel-loader 作为一个 Webpack loader，承担着文件编译职责。我们暂且将 babel-loader 放到 Babel 家族中，先来看看下面这张“全家福”。</p>
<p data-nodeid="14873"><img src="https://s0.lgstatic.com/i/image2/M01/04/5A/Cip5yF_tojyAfvQeAAMW8bbGBAY698.png" alt="Drawing 2.png" data-nodeid="15305"></p>
<div data-nodeid="14874"><p style="text-align:center">Babel 家族分层模型图</p></div>
<p data-nodeid="14875">如上图所示，Babel 生态基本按照：辅助层 → 基础层 → 胶水层 → 应用层，四级结构完成。其中部分环节角色的界定有些模糊，比如 @babel/highlight 也可以作为应用层工具出现。</p>
<p data-nodeid="14876"><strong data-nodeid="15315">基础层提供了基础的编译能力</strong>，完成分词、解析 AST、生成产出代码的工作。基础层中，我们将一些抽象能力下沉为辅助层，这些抽象能力被基础层使用。同时，在基础层之上，我们构建了如 @babel/preset-env 等预设/插件能力，这些类似“胶水”的包，完成了代码编译降级所需补丁的构建、运行时逻辑的模块化抽象等工作。在<strong data-nodeid="15316">最上层，Babel 生态提供了终端命令行</strong>、Webpack loader、浏览器端编译等应用级别的能力。</p>
<p data-nodeid="14877">分层的意义在于应用，下面我们从一个应用场景来具体分析，看看 Babel 工程化设计能够给我们带来什么样的启示。</p>
<h4 data-nodeid="14878">从 @babel/eslint-parser 看 Babel 工程化启示</h4>
<p data-nodeid="14879">相信你一定认识 <a href="https://github.com/eslint/eslint" data-nodeid="15322">ESLint</a>，它可以用来帮助我们<strong data-nodeid="15328">审查 ECMAScript/JavaScript 代码</strong>，其原理也是基于 AST 语法分析，进行规则校验。那这和我们的 Babel 有什么关联呢？</p>
<p data-nodeid="14880">试想一下，如果我们的业务代码使用了较多的试验性 ECMAScript 语言特性，那么 ESLint 如何识别这些新的语言特性，做到新特性的代码检查呢？</p>
<p data-nodeid="14881">事实上，<strong data-nodeid="15339">ESLint 的解析工具只支持最终进入 ECMAScript 语言标准的特性</strong>，如果想对试验性特性或者 Flow/TypeScript 进行代码检查，ESLint 提供了更换 parser 的能力。而 <a href="https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser" data-nodeid="15337">@babel/eslint-parser</a> 就是配合 ESLint 检验合法 Babel 代码的解析器。</p>
<p data-nodeid="14882">实现原理也很简单，ESLint 支持 <a href="https://eslint.org/docs/developer-guide/working-with-custom-parsers" data-nodeid="15343">custom-parser</a>，它允许我们使用自定义的第三方编译器，比如下面是一个使用了 espree 作为一个 custom-parser 的场景：</p>
<pre class="lang-java" data-nodeid="14883"><code data-language="java">{
    <span class="hljs-string">"parser"</span>: <span class="hljs-string">"./path/to/awesome-custom-parser.js"</span>
}
<span class="hljs-keyword">var</span> espree = require(<span class="hljs-string">"espree"</span>);
<span class="hljs-comment">// awesome-custom-parser.js</span>
<span class="hljs-keyword">exports</span>.parseForESLint = function(code, options) {
    <span class="hljs-keyword">return</span> {
        ast: espree.parse(code, options),
        services: {
            foo: function() {
                console.log(<span class="hljs-string">"foo"</span>);
            }
        },
        scopeManager: <span class="hljs-keyword">null</span>,
        visitorKeys: <span class="hljs-keyword">null</span>
    };
};
</code></pre>
<p data-nodeid="14884">@babel/eslint-parser<a href="https://github.com/babel/babel/blob/main/eslint/babel-eslint-parser/src/index.js" data-nodeid="15348">源码</a>的实现，保留了相同的模板，它通过自定的 parser，最终返回了 ESLint 所需要的 AST 内容，根据具体的 ESLint rules 进行代码审查：</p>
<pre class="lang-java" data-nodeid="14885"><code data-language="java"> <span class="hljs-function">export function <span class="hljs-title">parseForESLint</span><span class="hljs-params">(code, options = {})</span> </span>{
  <span class="hljs-keyword">const</span> normalizedOptions = normalizeESLintConfig(options);
  <span class="hljs-keyword">const</span> ast = baseParse(code, normalizedOptions);
  <span class="hljs-keyword">const</span> scopeManager = analyzeScope(ast, normalizedOptions);
  <span class="hljs-keyword">return</span> { ast, scopeManager, visitorKeys };
}
</code></pre>
<p data-nodeid="14886">上述代码中，ast 是 <a href="https://github.com/estree/estree" data-nodeid="15353">estree</a> 兼容的格式，可以被 ESLint 理解。<strong data-nodeid="15359">visitor Keys 定义了自定义的编译 AST 能力，ScopeManager 定义了新（试验）特性自定义的作用域</strong>。</p>
<p data-nodeid="14887">由此可见，Babel 生态和前端工程中的各个环节都是打通开放的。它<strong data-nodeid="15365">可以以 babel-loader 的形式和 Webpack 协作，也可以以 @babel/eslint-parser 的方式和 ESLint 合作</strong>。现代化的前端工程是一环扣一环的，作为工程链上的任意一环，插件化能力、协作能力将是设计的重点和关键。</p>
<h3 data-nodeid="14888">总结</h3>
<p data-nodeid="14889">作为前端开发者，你可能会被如何配置 Babel、Webpack 这些工具所困扰，出现“配置到自己的项目中，就各种报错”的问题。</p>
<p data-nodeid="14890">此时，你可能花费了一天的时间，通过 Google 找到了最终的配置解法，但是解决之道却没搞清楚，得过且过，今后依然被类似的困境袭扰；你可能看过一些关于 Babel 插件和原理的文章，自以为掌握了 AST、窥探了编译，但真正手写一个分词器 Tokenizer 就一头雾水。</p>
<p data-nodeid="14891">我们需要对 Babel 进行系统学习，学习目的是了解其工程化设计，方便我们在前端基建的过程中做到“最佳配置实践”，做到“不再被编译报错”所困扰。</p>
<p data-nodeid="14892"><img src="https://s0.lgstatic.com/i/image2/M01/04/5C/CgpVE1_tolmAct9gAAFdbBBSMZI815.png" alt="Drawing 3.png" data-nodeid="15372"></p>
<p data-nodeid="14893" class="">希望本讲能对大家的学习和工作带来一些启发，更多相关内容我们会在“从实战出发，从 0 到 1 构建一个符合标准的公共库”“如何理解 AST 实现和编译原理？”等小节中继续探索！</p>

---

### 精选评论

##### **0929：
> 内容质量很高，想问下老师babel相关的内容如何自学啊？比如traverse如何去操作ast

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 看官网，看源码。能把官网吃透，你就是个专家了，就比我强……

##### **伟：
> 看了后 我觉得我的webpack 太菜了

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 别担心，现在学也来得及，毕竟知识是慢慢积累来的~

##### *宁：
> 太高级了~~~

##### **1539：
> 用了babel理论上就能让代码在所有浏览器都能跑么

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 得看你降级到哪个兼容版本

##### **政：
> 内容很棒，师傅引进门修行看个人，后面需要参考这个思路来更细化的了解各个层级和包的功能了。原来visitorsKeys 是额外引入的包，我说怎么文章内的函数体内找不到这个变量。点开源码搜到了ps想问一下：为什么拉钩这里评论区精选留言筛选这么严格？感觉没有什么人在讨论

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 不是审核太过严格，所有小伙伴的评论、疑问都放出来了，但可能针对每一讲的评论只会在该讲出现，小编很委屈呐~

