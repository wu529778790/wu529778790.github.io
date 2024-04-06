<p data-nodeid="19802" class="">前端工程化离不开 npm（node package manager） 或者 Yarn 这些管理工具。npm 或 Yarn 在工程项目中，除了负责依赖的安装和维护以外，还能通过 npm scripts 串联起各个职能部分，让独立的环节自动运转起来。</p>
<p data-nodeid="19803">无论是 npm 还是 Yarn，它们的体系都非常庞大，在使用过程中你很可能产生如下疑问：</p>
<ul data-nodeid="19804">
<li data-nodeid="19805">
<p data-nodeid="19806">项目依赖出现问题时，删除大法好，即删除 node_modules 和 lockfiles，再重新 install，这样操作是否存在风险？</p>
</li>
<li data-nodeid="19807">
<p data-nodeid="19808">把所有依赖都安装到 dependencies 中，不区分 devDependencies 会有问题吗？</p>
</li>
<li data-nodeid="19809">
<p data-nodeid="19810">我们的应用依赖了公共库 A 和公共库 B，同时公共库 A 也依赖了公共库 B，那么公共库 B 会被多次安装或重复打包吗？</p>
</li>
<li data-nodeid="19811">
<p data-nodeid="19812">一个项目中，既有人用 npm，也有人用 Yarn，这会引发什么问题？</p>
</li>
<li data-nodeid="19813">
<p data-nodeid="19814">我们是否应该提交 lockfiles 文件到项目仓库呢？</p>
</li>
</ul>
<p data-nodeid="19815">接下来的 01 ~ 03 讲我们就进一步聊一聊这些问题！</p>
<h3 data-nodeid="19816">npm 内部机制和核心原理</h3>
<p data-nodeid="19817">我们先来看看 npm 的核心目标：</p>
<blockquote data-nodeid="19818">
<p data-nodeid="19819">Bring the best of open source to you, your team and your company.<br>
给你和你的团队、你的公司带来最好的开源库和依赖。</p>
</blockquote>
<p data-nodeid="19820">通过这句话，我们可以知道 npm 最重要的一环是安装和维护依赖。在平时开发中，“<strong data-nodeid="19974">删除 node_modules，重新 npm install</strong>”是一个百试不爽的解决 npm 安装类问题的方法。但是其中的作用原理是什么？这样的操作是否规范呢？</p>
<p data-nodeid="19821">这一讲，我们就先从 npm 内部机制出发来剖析此类问题。了解完安装机制和原理，我相信你对于工程中依赖的问题，将有一个更加体系化的认知。</p>
<h4 data-nodeid="19822">npm 的安装机制和背后思想</h4>
<p data-nodeid="19823">npm 的安装机制非常值得探究。Ruby 的 Gem、Python 的 pip 都是全局安装，但是 npm 的安装机制秉承了不同的设计哲学。</p>
<p data-nodeid="19824">它会优先安装依赖包到当前项目目录，使得不同应用项目的依赖各成体系，同时还减轻了包作者的 API 兼容性压力，<strong data-nodeid="19987">但这样做的缺陷也很明显</strong>：如果我们的项目 A 和项目 B，都依赖了相同的公共库 C，那么公共库 C 一般都会在项目 A 和项目 B 中，各被安装一次。这就说明，<strong data-nodeid="19988">同一个依赖包可能在我们的电脑上进行多次安装</strong>。</p>
<p data-nodeid="19825">当然，对于一些工具模块比如 supervisor 和 gulp，你仍然可以使用全局安装模式，这样方便注册 path 环境变量，我们可以在任何地方直接使用 supervisor、 gulp 这些命令。（不过，一般还是建议不同项目维护自己局部的 gulp 开发工具以适配不同项目需求。）</p>
<p data-nodeid="19826">下面，言归正传，我们通过流程图来分析 npm install 的安装机制。</p>
<p data-nodeid="19827"><img src="https://s0.lgstatic.com/i/image2/M01/02/A9/Cip5yF_axkqAclTFAAJmlxGYSmI551.png" alt="068739612.png" data-nodeid="19993"></p>
<div data-nodeid="19828"><p style="text-align:center">npm install 安装流程图</p></div>
<p data-nodeid="19829">npm install 执行之后，首先，检查并获取 npm 配置，<strong data-nodeid="19999">这里的优先级为：项目级的 .npmrc 文件 &gt; 用户级的 .npmrc 文件&gt; 全局级的 .npmrc 文件 &gt; npm 内置的 .npmrc 文件</strong>。</p>
<p data-nodeid="19830">然后检查项目中是否有 package-lock.json 文件。</p>
<p data-nodeid="19831">如果有，则检查 package-lock.json 和 package.json 中声明的依赖是否一致：</p>
<ul data-nodeid="19832">
<li data-nodeid="19833">
<p data-nodeid="19834">一致，直接使用 package-lock.json 中的信息，从缓存或网络资源中加载依赖；</p>
</li>
<li data-nodeid="19835">
<p data-nodeid="19836">不一致，按照 npm 版本进行处理（不同 npm 版本处理会有不同，具体处理方式如图所示）。</p>
</li>
</ul>
<p data-nodeid="19837">如果没有，则根据 package.json 递归构建依赖树。然后按照构建好的依赖树下载完整的依赖资源，在下载时就会检查是否存在相关资源缓存：</p>
<ul data-nodeid="19838">
<li data-nodeid="19839">
<p data-nodeid="19840">存在，则将缓存内容解压到 node_modules 中；</p>
</li>
<li data-nodeid="19841">
<p data-nodeid="19842">否则就先从 npm 远程仓库下载包，校验包的完整性，并添加到缓存，同时解压到 node_modules。</p>
</li>
</ul>
<p data-nodeid="19843">最后生成 package-lock.json。</p>
<p data-nodeid="19844">构建依赖树时，当前依赖项目不管其是直接依赖还是子依赖的依赖，都应该按照扁平化原则，优先将其放置在 node_modules 根目录（最新版本 npm 规范）。在这个过程中，遇到相同模块就判断已放置在依赖树中的模块版本是否符合新模块的版本范围，如果符合则跳过；不符合则在当前模块的 node_modules 下放置该模块（最新版本 npm 规范）。</p>
<p data-nodeid="19845">我给出的流程图中有标注更细节的内容，这里就不再赘述了。<strong data-nodeid="20022">你要格外注意图中标明的 npm 不同版本的不同处理情况，并学会从这种“历史问题”中总结 npm 使用的团队最佳实践：同一个项目团队，应该保证 npm 版本的一致</strong>。</p>
<p data-nodeid="19846">前端工程中，依赖嵌套依赖，一个中型项目中 node_moduels 安装包可能就已经是海量的了。如果安装包每次都通过网络下载获取，无疑会增加安装时间成本。对于这个问题，<strong data-nodeid="20030">缓存</strong>始终是一个好的解决思路，我们接下来看看 npm 自己的缓存机制。</p>
<h4 data-nodeid="19847">npm 缓存机制</h4>
<p data-nodeid="19848"><strong data-nodeid="20036">对于一个依赖包的同一版本进行本地化缓存，是当代依赖包管理工具的一个常见设计</strong>。使用时要先执行以下命令：</p>
<pre class="lang-plain" data-nodeid="19849"><code data-language="plain">npm config get cache
</code></pre>
<p data-nodeid="19850">得到配置缓存的根目录在 /Users/cehou/.npm（ Mac OS 中，npm 默认的缓存位置） 当中。我们 cd 进入 /Users/cehou/.npm 中可以发现<code data-backticks="1" data-nodeid="20038">_cacache</code>文件。事实上，在 npm v5 版本之后，缓存数据均放在根目录中的<code data-backticks="1" data-nodeid="20040">_cacache</code>文件夹中。</p>
<div data-nodeid="19851"><p data-nodeid="289906" class=""><img src="https://s0.lgstatic.com/i/image/M00/84/9D/CgqCHl_TbUSAZ8CsAAF3O01IL9Q887.png" alt="Drawing 1.png" data-nodeid="289909"></p><p style="text-align:center">（<code data-backticks="1" data-nodeid="289912">_cacache</code>文件）</p></div>
<p data-nodeid="19852">我们可以使用以下命令清除 /Users/cehou/.npm/_cacache 中的文件：</p>
<pre class="lang-plain" data-nodeid="19853"><code data-language="plain"> npm cache clean --force
</code></pre>
<blockquote data-nodeid="19854">
<p data-nodeid="19855">你可以点击<a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" data-nodeid="20048">这里</a>看看其中对应的 npm 源码。</p>
</blockquote>
<p data-nodeid="19856">接下来打开<code data-backticks="1" data-nodeid="20051">_cacache</code>文件，看看 npm 缓存了哪些东西，一共有 3 个目录：</p>
<ul data-nodeid="19857">
<li data-nodeid="19858">
<p data-nodeid="19859">content-v2</p>
</li>
<li data-nodeid="19860">
<p data-nodeid="19861">index-v5</p>
</li>
<li data-nodeid="19862">
<p data-nodeid="19863">tmp</p>
</li>
</ul>
<p data-nodeid="19864">其中 content-v2 里面基本都是一些二进制文件。为了使这些二进制文件可读，我们把二进制文件的扩展名改为 .tgz，然后进行解压，得到的结果其实就是我们的 npm 包资源。</p>
<p data-nodeid="19865">而 index-v5 文件中，我们采用跟刚刚一样的操作就可以获得一些描述性的文件，事实上这些内容就是 content-v2 里文件的索引。</p>
<p data-nodeid="19866">这些缓存如何被储存并被利用的呢？</p>
<p data-nodeid="19867">这就和 npm install 机制联系在了一起。当 npm install 执行时，通过<a href="https://www.npmjs.com/package/pacote" data-nodeid="20062">pacote</a>把相应的包解压在对应的 node_modules 下面。npm 在下载依赖时，先下载到缓存当中，再解压到项目 node_modules 下。pacote 依赖<a href="https://github.com/npm/npm-registry-fetch#npm-registry-fetch" data-nodeid="20070">npm-registry-fetch</a>来下载包，npm-registry-fetch 可以通过设置 cache 属性，在给定的路径下根据<a href="https://datatracker.ietf.org/doc/rfc7234/" data-nodeid="20074">IETF RFC 7234</a>生成缓存数据。</p>
<p data-nodeid="19868">接着，在每次安装资源时，根据 package-lock.json 中存储的 integrity、version、name 信息生成一个唯一的 key，这个 key 能够对应到 index-v5 目录下的缓存记录。如果发现有缓存资源，就会找到 tar 包的 hash，根据 hash 再去找缓存的 tar 包，并再次通过<a href="https://www.npmjs.com/package/pacote" data-nodeid="20079">pacote</a>把对应的二进制文件解压到相应的项目 node_modules 下面，省去了网络下载资源的开销。</p>
<p data-nodeid="19869"><strong data-nodeid="20089">注意，这里提到的缓存策略是从 npm v5 版本开始的。在 npm v5 版本之前，每个缓存的模块在 ~/.npm 文件夹中以模块名的形式直接存储，储存结构是：{cache}/{name}/{version}</strong>。</p>
<p data-nodeid="19870">了解这些相对底层的内容可以直接帮助开发者排查 npm 相关问题，这也是区别一般程序员和架构师的细节之一。能不能在理论内容上多走一步，也决定了我们的技术能力能不能更上一层楼。这里我们进行了初步学习，我希望这也可以成为你探究底层的开始。</p>
<h3 data-nodeid="19871">npm 不完全指南</h3>
<p data-nodeid="19872">接下来，我想介绍几个实用的 npm 小技巧，这些技巧并不包括“npm 快捷键”等常见内容，主要是从工程开发角度，聚焦更广泛的内容。这里我不会花大量篇幅讲解 npm 命令内容，这些知识你可以直接通过 <a href="https://docs.npmjs.com/cli-documentation/" data-nodeid="20095">npm cli 官方文档</a>获得。</p>
<p data-nodeid="19873">下面，我将从 npm 使用技巧以及一些常见使用误区来展开。</p>
<h4 data-nodeid="19874">自定义 npm init</h4>
<p data-nodeid="19875">npm 支持我们自定义 npm init，快速创建一个符合自己需求的自定义项目。想象一下，<strong data-nodeid="20104">npm init 命令本身并不复杂，它其实就是调用 shell 脚本输出一个初始化的 package.json 文件</strong>。那么相应地，我们要自定义 npm init 命令，就是写一个 node 脚本而已，它的 module.exports 即为 package.json 配置内容。</p>
<p data-nodeid="19876">为了实现更加灵活的自定义功能，我们可以使用 prompt() 方法，获取用户输入并动态产生的内容：</p>
<pre class="lang-java" data-nodeid="19877"><code data-language="java"><span class="hljs-keyword">const</span> desc = prompt(<span class="hljs-string">'请输入项目描述'</span>, <span class="hljs-string">'项目描述...'</span>)
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  key: <span class="hljs-string">'value'</span>,
  name: prompt(<span class="hljs-string">'name?'</span>, process.cwd().split(<span class="hljs-string">'/'</span>).pop()),
  version: prompt(<span class="hljs-string">'version?'</span>, <span class="hljs-string">'0.0.1'</span>),
  description: desc,
  main: <span class="hljs-string">'index.js'</span>,
  repository: prompt(<span class="hljs-string">'github repository url'</span>, <span class="hljs-string">''</span>, function (url) {
    <span class="hljs-keyword">if</span> (url) {
      run(<span class="hljs-string">'touch README.md'</span>);
      run(<span class="hljs-string">'git init'</span>);
      run(<span class="hljs-string">'git add README.md'</span>);
      run(<span class="hljs-string">'git commit -m "first commit"'</span>);
      run(`git remote add origin ${url}`);
      run(<span class="hljs-string">'git push -u origin master'</span>);
    }
    <span class="hljs-keyword">return</span> url;
  })
}
</code></pre>
<p data-nodeid="19878">假设该脚本名为 .npm-init.js，我们执行下述命令来确保 npm init 所对应的脚本指向正确的文件：</p>
<pre class="lang-java" data-nodeid="19879"><code data-language="java">npm config set init-<span class="hljs-keyword">module</span> ~\.npm-init.js
</code></pre>
<blockquote data-nodeid="19880">
<p data-nodeid="19881">更多信息可见：<a href="https://docs.npmjs.com/cli/init" data-nodeid="20110">npm-init</a>。</p>
</blockquote>
<p data-nodeid="19882">我们也可以通过配置 npm init 默认字段来自定义 npm init 的内容：</p>
<pre class="lang-java" data-nodeid="19883"><code data-language="java">npm config set init.author.name <span class="hljs-string">"Lucas"</span>
npm config set init.author.email <span class="hljs-string">"lucasXXXXXX@gmail.com"</span>
npm config set init.author.url <span class="hljs-string">"lucasXXXXX.com"</span>
npm config set init.license <span class="hljs-string">"MIT"</span>
</code></pre>
<blockquote data-nodeid="19884">
<p data-nodeid="19885">更多信息见：<a href="https://docs.npmjs.com/cli-commands/config.html" data-nodeid="20116">npm-config</a>。</p>
</blockquote>
<h4 data-nodeid="19886">利用 npm link，高效率在本地调试以验证包的可用性</h4>
<p data-nodeid="19887">当我们开发一个公共包时，总会有这样的困扰：假如我开发一个组件库，某个组件开发完成之后，如何验证该组件能在我的业务项目中正常运行呢？</p>
<p data-nodeid="19888">除了写一个完备的测试以外，常见的思路就是<strong data-nodeid="20125">在组件库开发中，设计 examples 目录或者一个 playground，启动一个开发服务，以验证组件的运行情况</strong>。</p>
<p data-nodeid="19889">然而真实应用场景是多种多样的，如果能在某个项目中率先尝试就太好了。但我们又不能发布一个不安全的包版本供业务项目使用。另一个“笨”方法是，手动复制粘贴组件并打包产出到业务项目的 node_modules 中进行验证，但是这种做法既不安全也会使得项目混乱，变得难以维护，同时过于依赖手工执行，这种操作非常原始。</p>
<p data-nodeid="19890">那么如何<strong data-nodeid="20142">高效率在本地调试以验证包的可用性</strong>呢？这个时候，我们就可以<strong data-nodeid="20143">使用 npm link</strong>。简单来说，它可以<strong data-nodeid="20144">将模块链接到对应的业务项目中运行</strong>。</p>
<p data-nodeid="19891">我们来看一个具体场景，假设你正在开发项目 project 1，其中有个包 package 1，对应 npm 模块包名称是 npm-package-1，我们在 package 1 项目中加入了新功能 feature A，现在要验证在 project 1 项目中能否正常使用 package 1 的 feature A，你应该怎么做？</p>
<p data-nodeid="19892">我们先在 package 1 目录中，执行 npm link，这样 npm link 通过链接目录和可执行文件，实现 npm 包命令的全局可执行。</p>
<p data-nodeid="19893">然后在 project 1 中创建链接，执行 npm link npm-package-1 命令时，它就会去 /usr/local/lib/node_modules/ 这个路径下寻找是否有这个包，如果有就建立软链接。</p>
<p data-nodeid="19894">这样一来，我们就可以在 project 1 的 node_module 中会看到链接过来的模块包 npm-package-1，此时的 npm-package-1 就带有最新开发的 feature A，这样一来就可以在 project 1 中正常开发调试 npm-package-1。当然别忘了，调试结束后可以执行 npm unlink 以取消关联。</p>
<p data-nodeid="19895">从工作原理上总结，npm link 的本质就是软链接，它主要做了两件事：</p>
<ul data-nodeid="19896">
<li data-nodeid="19897">
<p data-nodeid="19898">为目标 npm 模块（npm-package-1）创建软链接，将其链接到全局 node 模块安装路径 /usr/local/lib/node_modules/ 中；</p>
</li>
<li data-nodeid="19899">
<p data-nodeid="19900">为目标 npm 模块（npm-package-1）的可执行 bin 文件创建软链接，将其链接到全局 node 命令安装路径 /usr/local/bin/ 中。</p>
</li>
</ul>
<p data-nodeid="19901">通过刚才的场景，你可以看到：<strong data-nodeid="20163">npm link 能够在工程上解决依赖包在任何一个真实项目中进行调试的问题，并且操作起来更加方便快捷</strong>。</p>
<h4 data-nodeid="19902">npx 的作用</h4>
<p data-nodeid="19903">npx 由 npm v5.2 版本引入，解决了 npm 的一些使用快速开发、调试，以及项目内使用全局模块的痛点。</p>
<p data-nodeid="19904"><strong data-nodeid="20174">在传统 npm 模式下</strong>，如果我们需要使用代码检测工具 <a href="https://eslint.bootcss.com/" data-nodeid="20172">ESLint</a>，就要先通过 npm install 安装：</p>
<pre class="lang-java" data-nodeid="19905"><code data-language="java">npm install eslint --save-dev
</code></pre>
<p data-nodeid="19906">然后在项目根目录下执行：</p>
<pre class="lang-java" data-nodeid="19907"><code data-language="java">./node_modules/.bin/eslint --init
./node_modules/.bin/eslint yourfile.js
</code></pre>
<p data-nodeid="19908">或者通过项目脚本和 package.json 的 npm scripts 字段调用 ESLint。</p>
<p data-nodeid="19909">而使用 npx 就简单多了，你只需要下面 2 个操作步骤：</p>
<pre class="lang-java" data-nodeid="19910"><code data-language="java">npx eslint --init
npx eslint yourfile.js
</code></pre>
<p data-nodeid="19911">为什么 npx 操作起来如此便捷呢？</p>
<p data-nodeid="19912">这是因为它可以直接执行 node_modules/.bin 文件夹下的文件。在运行命令时，npx 可以自动去 node_modules/.bin 路径和环境变量 $PATH 里面检查命令是否存在，而不需要再在 package.json 中定义相关的 script。</p>
<p data-nodeid="19913"><strong data-nodeid="20188">npx 另一个更实用的好处是：npx 执行模块时会优先安装依赖，但是在安装执行后便删除此依赖，这就避免了全局安装模块带来的问题</strong>。</p>
<p data-nodeid="19914">运行如下命令后，npx 会将 create-react-app 下载到一个临时目录，使用以后再删除：</p>
<pre class="lang-java" data-nodeid="19915"><code data-language="java">npx create-react-app cra-project
</code></pre>
<p data-nodeid="19916">更多关于 npx 的介绍你可以去<a href="https://www.npmjs.com/package/npx" data-nodeid="20193">官网</a>进一步查看。</p>
<p data-nodeid="19917">现在，你已经对 npm 有了一个初步了解，我们接下来一同看看 npm 实操部分：多源镜像和企业级部署私服原理。</p>
<h3 data-nodeid="19918">npm 多源镜像和企业级部署私服原理</h3>
<p data-nodeid="19919"><strong data-nodeid="20201">npm 中的源（registry），其实就是一个查询服务</strong>。以 npmjs.org 为例，它的查询服务网址是 https://registry.npmjs.org/。这个网址后面跟上模块名，就会得到一个 JSON 对象，里面是该模块所有版本的信息。比如，访问 https://registry.npmjs.org/react，就会看到 react 模块所有版本的信息。</p>
<p data-nodeid="19920">我们可以通过<code data-backticks="1" data-nodeid="20203">npm config set</code>命令来设置安装源或者某个 scope 对应的安装源，很多企业也会搭建自己的 npm 源。我们常常会碰到需要使用多个安装源的项目，这时就可以通过 npm-preinstall 的钩子，通过 npm 脚本，在安装公共依赖前自动进行源切换：</p>
<pre class="lang-java" data-nodeid="19921"><code data-language="java"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"preinstall"</span>: <span class="hljs-string">"node ./bin/preinstall.js"</span>
}
</code></pre>
<p data-nodeid="19922">其中 preinstall.js 脚本内容，具体逻辑为通过 node.js 执行<code data-backticks="1" data-nodeid="20206">npm config set</code>命令，代码如下：</p>
<pre class="lang-java" data-nodeid="19923"><code data-language="java">require(<span class="hljs-string">' child_process'</span>).exec(<span class="hljs-string">'npm config get registry'</span>, function(error, stdout, stderr) {
  <span class="hljs-keyword">if</span> (!stdout.toString().match(/registry\.x\.com/)) {
    exec(<span class="hljs-string">'npm config set @xscope:registry https://xxx.com/npm/'</span>)
  }
})
</code></pre>
<p data-nodeid="19924">国内很多开发者使用的 <a href="https://www.npmjs.com/package/nrm" data-nodeid="20211">nrm</a>（npm registry manager）是 npm 的镜像源管理工具，使用它可以快速地在 npm 源间切换，这当然也是一种选择。</p>
<p data-nodeid="19925">你的公司是否也正在部署一个私有 npm 镜像呢？你有没有想过公司为什么要这样做呢？</p>
<p data-nodeid="19926">虽然 npm 并没有被屏蔽，但是下载第三方依赖包的速度依然较缓慢，这严重影响 CI/CD 流程或本地开发效率。部署镜像后，一般可以<strong data-nodeid="20227">确保高速、稳定的 npm 服务</strong>，而且<strong data-nodeid="20228">使发布私有模块更加安全</strong>。除此之外，审核机制也可以<strong data-nodeid="20229">保障私服上的 npm 模块质量和安全</strong>。</p>
<p data-nodeid="19927">那么，如何部署一个私有 npm 镜像呢？</p>
<p data-nodeid="19928">现在社区上主要有 3 种工具来搭建 npm 私服：nexus、verdaccio 以及 cnpm。</p>
<p data-nodeid="19929">它们的工作原理相同，我们可以通过 nexus 的架构示例简单了解一下：</p>
<p data-nodeid="19930"><img src="https://s0.lgstatic.com/i/image/M00/84/9D/CgqCHl_Tba6AcJj0AAGPl9HW2qg745.png" alt="Drawing 2.png" data-nodeid="20235"></p>
<div data-nodeid="19931"><p style="text-align:center">nexus 架构示例图</p></div>
<p data-nodeid="19932">nexus 工作在 client 和外部 npm 之间，并通过 group repository 合并 npm 仓库以及私有仓库，这样就起到了代理转发的作用。</p>
<p data-nodeid="19933">了解了 npm 私服的原理，我们就不畏惧任何“雷区”。这部分我也总结了两个社区上常见的问题。</p>
<p data-nodeid="19934"><strong data-nodeid="20241">npm 配置作用优先级</strong></p>
<p data-nodeid="19935">npm 可以通过默认配置帮助我们预设好 npm 对项目的影响动作，但是 npm 的配置优先级需要开发者确认了解。</p>
<p data-nodeid="19936">如下图所示，优先级从左到右依次降低。我们在使用 npm 时需要了解 npm 的设置作用域，排除干扰范围，以免一顿骚操作之后，并没有找到相应的起作用配置。</p>
<p data-nodeid="19937"><img src="https://s0.lgstatic.com/i/image/M00/84/9D/CgqCHl_TbZCAanocAADUyWa5fV4429.png" alt="Drawing 3.png" data-nodeid="20246"></p>
<div data-nodeid="19938"><p style="text-align:center">优先级排序示意图</p></div>
<p data-nodeid="19939"><strong data-nodeid="20250">npm 镜像和安装问题</strong></p>
<p data-nodeid="19940">另外一个常见的问题就是 npm 镜像和依赖安装，关于 npm 镜像和依赖安装问题，归根到底还是网络环境导致的，建议有条件的情况下还是<strong data-nodeid="20256">从网络层面解决问题</strong>。</p>
<p data-nodeid="19941">如果没有条件，也不要紧，办法总比困难多，可以通过设置安装源镜像来解决，这就需要紧跟社区方案，刨根究底了。这里推荐一篇文章：<a href="https://mp.weixin.qq.com/s/2ntKGIkR3Uiy9cQfITg2NQ" data-nodeid="20260">聊聊 npm 镜像那些险象环生的坑</a>，文章中有更详细的内容，你可以看看。</p>
<h3 data-nodeid="19942">结语</h3>
<p data-nodeid="19943">关于 npm 的核心理念及安装机制，我们暂且分析到这里。这一讲，我们梳理了 npm 安装逻辑，在了解其安装原理的基础上，对 npm 一些常见使用误区以及使用技巧进行了分析；另外我们也具体了解了 npm 多源镜像和企业级部署私服原理。</p>
<p data-nodeid="19944"><img src="https://s0.lgstatic.com/i/image2/M01/00/68/CgpVE1_XAHWAOTwZAAa8HJHvldA513.png" alt="01.png" data-nodeid="20266"></p>
<p data-nodeid="19945">各种环节并不复杂，但是却往往被开发者忽略，导致项目中开发受阻或者架构混乱。本课时，我们也深入多处源码内容，希望对你设计一个完整的工程流程机制有所启发。这里我也给大家留一个思考题：cnpm 是什么，它有什么意义？欢迎你在留言区分享你的观点。</p>
<p data-nodeid="19946">关于 npm 和 Yarn 的更多内容，我们将在下一讲中继续进行，欢迎你继续阅读。</p>
<hr data-nodeid="19947">
<p data-nodeid="19948"><a href="https://shenceyun.lagou.com/t/mka" data-nodeid="20273"><img src="https://s0.lgstatic.com/i/image2/M01/00/66/CgpVE1_W_x2AaW0rAAdqMM6w3z0145.png" alt="大前端引流.png" data-nodeid="20272"></a></p>
<p data-nodeid="19949" class="te-preview-highlight">对标阿里P7技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。<a href="https://shenceyun.lagou.com/t/mka" data-nodeid="20277">点此链接，快来领取！</a></p>

---

### 精选评论

##### *野：
> 以前做RN开发时，需要直接修改node_modules文件夹中个别包代码，这样协同开发的时候，每次装新包，都要重复一遍复制粘贴覆盖自动安装的包，费时费力，后来公司自建了npm源，把修改后的包放在自建源中，之后安装会优先从自建源中加载，方便多了

##### *野：
> 之前使用`npm config get cache`查看npm缓存的时候，偶然看到了缓存包，在_chache文件夹中很好奇，为啥没有想象中以包名为文件夹名的文件夹，反而是01，02这种文件夹，现在知道了使用编码是为了提高npm包缓存匹配的速度

##### *强：
> cnpm 是一个 npmjs.org 的完整只读镜像，可以快速安装 npm 依赖，支持除 npm publish 命令之外的所有命令。

##### **用户0115：
> 请问一下老师,依赖版本规范是什么一个概念,具体的机制是什么样子的

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; https://semver.org/lang/zh-CN/，具体内容可以参考一下~

##### **丰：
> 老师你好。我最近想在公司搭建一个私有的npm.但没想到之前公司已经搭建过了。是用Nexus搭建的.但我在网上看的搭建方法一般是cnpm.org和verdaccio。不知道老师有没有了解过nexus搭建npm。 我好奇的一点是nexus与市面上流行的cnpm和verdaccio搭建的差异是什么

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 没有本质差别，条条大路通罗马

##### *岭：
> npm 在下载依赖时，先下载到缓存当中，再解压到项目 node_modules 下。与npm安装依赖图 下载资源》检查完整性=》【添加到缓存、解压到node_modules】这里是不是矛盾， 上图流程是否应该是： 下载资源》 检查完整性》 添加到缓存》 解压到node_modules中？还有个问题如果下载时 检查资源完整性如果是失败或者不完整的情况下，处理机制是什么？ 重新下载？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 添加到缓存、解压到node_modules 是由先后顺序的，理解一致即可；下载依赖时，你把网关了，试试不就知道了～可以思考「如何设计一个有效的 retry 机制」？

##### **彪：
> cnpm是npmjs.org的一个完整镜像，作用就是为开发者解决下载不畅的问题，它会保持和官方的及时同步。

##### **荣：
> 实际开发中，当修改npm link包后，使用端需要重启服务才能获取更新的包，但是重启服务可能比较长或者频繁更新，请教下有什么方案可以避免吗

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 得优化你的重启服务和频繁更新，比如局部更新等。这个得实际看你的项目。否则，monorepo 吧

##### xcc：
> 你好，请问在平时团队合作中，怎么保证项目成员的环境保持一致，比如npm，node版本，编辑器配置之类的，有什么强制的约束手段或者方式么

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 主要是协约保持一致，但是可以通过 script 脚本来 check 做到强制

##### *仔：
> 老师我想请教一个问题本地开发环境 npm 6.14.10，node10.22.1，项目本地运行正常前端项目里面 package-lock.json 文件会上传到git仓库，但是在自己打包环境 linux 机器上 npm 5.4.1，node 8.11.4，npm install 经常遇到 完整性校验不一致的问题（是偶发，不是百分之百重现）例如：npm ERR! sha512-MKiLiV+I1AA596t9w1sQJ8jkiSr5+ZKi0WKrYGUn6d1Fx+Ij4tIj+m2WMQSGczs5jZVxV339chE8iwk6F64wjA== integrity checksum failed when using sha512: wanted sha512-MKiLiV+I1AA596t9w1sQJ8jkiSr5+ZKi0WKrYGUn6d1Fx+Ij4tIj+m2WMQSGczs5jZVxV339chE8iwk6F64wjA== but got sha512-WXI95kpJrxw4Nnx8vVI90PuUhrQjnNgghBl5tn54rUNKZYbxv+4ACxUzPVpJEtWxKmeDwnQrzjc0C2bYmRJVKg==. (65117 bytes)每次遇到这种情况我都只能在本地 删除package-lock.json 推送到仓库，再去打包环境执行 npm cache clean --force 和 npm install请问为什么会有这种问题，一般排障可以从哪些方面考虑？1.真的是某个npm依赖包hash变了2.网路问题导致下载的npm依赖包不完整3.npm缓存

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 首先对齐一下 CI 机器上和本地的各环境版本，包括 node npm 等

##### **锋：
> 老师，为什么我还是不能理解为什么我删掉node_modules再重新安装，能解决一些安装报错的问题？是我那个知识点没有get到吗

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 重新安装可能会改变依赖版本

##### **0929：
> 老师您好，有两个问题想请教下:1、project 依赖packageA和packageB，他们共同依赖公共包C，但是包A依赖C的2.0版本，包B依赖C的3.0版本; 如果扁平化之后，包A C 会平级，但是C的版本不同，这时C会生成两个文件夹吗？2、知识获取的方式，有了上面这种疑问后，我在哪能查到想要的东西(npm相关内容该怎么学)再次感谢老师

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 会的，其中一个在 A 或 B package 的 node_modules 中，另一个在项目的一级 node_modules 中，这个后面有介绍的。
知识获取方式：看源码，看官网，去 GitHub 提 issue/pr，多参与国际社区讨论，国内毕竟面比较有限

##### *林：
> 不同源的包安装通过配置 .npmr  registryc 感觉要比 preinstall更方便一些

##### **贤：
> 高价值的专栏，昨天刚学完，今天就利用这节课的知识解决了 jenkins 部署的问题。

##### **男：
> r m -r f node_modules实际上删除不掉缓存？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 删掉的当前项目下的依赖，看你怎么理解缓存了

##### **是：
> 想问问老师一般要不要把•lock文件上传到仓库中？

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 仔细学习下面的内容吧，后面文中会给你答案

##### **用户7560：
> 请问大佬这么课更新频率是咋样的

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 每周更新2篇。每周一、三更新

##### **用户7560：
> 打卡

