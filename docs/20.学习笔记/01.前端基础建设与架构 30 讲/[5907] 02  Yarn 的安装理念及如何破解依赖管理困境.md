<p data-nodeid="1645" class="">01 讲我们讲了 npm 的技巧和原理，但其实在前端工程化这个主题上除了 npm，还有不可忽视的 Yarn。</p>
<p data-nodeid="1646">Yarn 是一个由 Facebook、Google、Exponent 和 Tilde 构建的新的 JavaScript 包管理器。它的出现是为了解决历史上 npm 的某些不足（比如 npm 对于依赖的完整性和一致性保障，以及 npm 安装速度过慢的问题等），虽然 npm 目前经过版本迭代汲取了 Yarn 一些优势特点（比如一致性安装校验算法等），但我们依然有必要关注 Yarn 的思想和理念。</p>
<p data-nodeid="1647">Yarn 和 npm 的关系，有点像当年的 Io.js 和 Node.js，殊途同归，都是为了进一步解放和优化生产力。这里需要说明的是，<strong data-nodeid="1782">不管是哪种工具，你应该做的就是全面了解其思想，优劣胸中有数，这样才能驾驭它，为自己的项目架构服务</strong>。</p>
<p data-nodeid="1648">当 npm 还处在 v3 时期时，一个叫作 Yarn 的包管理方案横空出世。2016 年，npm 还没有 package-lock.json 文件，安装速度很慢，稳定性也较差，而 Yarn 的理念很好地解决了以下问题。</p>
<ul data-nodeid="1649">
<li data-nodeid="1650">
<p data-nodeid="1651"><strong data-nodeid="1792">确定性</strong>：通过 yarn.lock 等机制，保证了确定性。即不管安装顺序如何，相同的依赖关系在任何机器和环境下，都可以以相同的方式被安装。（在 npm v5 之前，没有 package-lock.json 机制，只有默认并不会使用的<a href="https://docs.npmjs.com/cli/shrinkwrap" data-nodeid="1790">npm-shrinkwrap.json</a>。）</p>
</li>
<li data-nodeid="1652">
<p data-nodeid="1653"><strong data-nodeid="1797">采用模块扁平安装模式</strong>：将依赖包的不同版本，按照一定策略，归结为单个版本，以避免创建多个副本造成冗余（npm 目前也有相同的优化）。</p>
</li>
<li data-nodeid="1654">
<p data-nodeid="1655"><strong data-nodeid="1802">网络性能更好</strong>：Yarn 采用了请求排队的理念，类似并发连接池，能够更好地利用网络资源；同时引入了更好的安装失败时的重试机制。</p>
</li>
<li data-nodeid="1656">
<p data-nodeid="1657"><strong data-nodeid="1807">采用缓存机制，实现了离线模式</strong>（npm 目前也有类似实现）。</p>
</li>
</ul>
<p data-nodeid="1658">我们先来看看 yarn.lock 结构：</p>
<pre class="lang-java" data-nodeid="1659"><code data-language="java"><span class="hljs-string">"@babel/cli@^7.1.6"</span>, <span class="hljs-string">"@babel/cli@^7.5.5"</span>:
  version <span class="hljs-string">"7.8.4"</span>
  resolved <span class="hljs-string">"http://npm.in.zhihu.com/@babel%2fcli/-/cli-7.8.4.tgz#505fb053721a98777b2b175323ea4f090b7d3c1c"</span>
  integrity sha1-UF+wU3IamHd7KxdTI+pPCQt9PBw=
  dependencies:
    commander <span class="hljs-string">"^4.0.1"</span>
    convert-source-map <span class="hljs-string">"^1.1.0"</span>
    fs-readdir-recursive <span class="hljs-string">"^1.1.0"</span>
    glob <span class="hljs-string">"^7.0.0"</span>
    lodash <span class="hljs-string">"^4.17.13"</span>
    make-dir <span class="hljs-string">"^2.1.0"</span>
    slash <span class="hljs-string">"^2.0.0"</span>
    source-map <span class="hljs-string">"^0.5.0"</span>
  optionalDependencies:
    chokidar <span class="hljs-string">"^2.1.8"</span>
</code></pre>
<p data-nodeid="1660">该结构整体和 package-lock.json 结构类似，只不过 yarn.lock 并没有使用 JSON 格式，而是采用了一种自定义的标记格式，新的格式仍然保持了较高的可读性。</p>
<p data-nodeid="1661"><strong data-nodeid="1816">相比 npm，Yarn 另外一个显著区别是 yarn.lock 中子依赖的版本号不是固定版本</strong>。这就说明单独一个 yarn.lock 确定不了 node_modules 目录结构，还需要和 package.json 文件进行配合。</p>
<p data-nodeid="1662">其实，不管是 npm 还是 Yarn，说到底它们都是一个包管理工具，在项目中如果想进行 npm/Yarn 切换，并不是一件麻烦的事情。<strong data-nodeid="1826">甚至还有一个专门的 <a href="https://github.com/imsnif/synp" data-nodeid="1822">synp</a> 工具，它可以将 yarn.lock 转换为 package-lock.json</strong>，反之亦然。</p>
<p data-nodeid="1663">关于 Yarn 缓存，我们可以通过这个命令查看缓存目录，并通过目录查看缓存内容：</p>
<pre class="lang-java" data-nodeid="1664"><code data-language="java">yarn cache dir
</code></pre>
<p data-nodeid="1665"><img src="https://s0.lgstatic.com/i/image/M00/84/9F/CgqCHl_TbhOAEFfxAAFJ2o762gM476.png" alt="Drawing 0.png" data-nodeid="1830"></p>
<p data-nodeid="1666">值得一提的是，Yarn 默认使用 prefer-online 模式，即优先使用网络数据。如果网络数据请求失败，再去请求缓存数据。</p>
<p data-nodeid="1667">最后，我们来看一看一些区别于 npm，Yarn 所独有的命令：</p>
<pre class="lang-java" data-nodeid="1668"><code data-language="java">yarn <span class="hljs-keyword">import</span>
yarn licenses
yarn pack
yarn why
yarn autoclean
</code></pre>
<p data-nodeid="1669">npm 独有的命令是：<code data-backticks="1" data-nodeid="1834">npm rebuild</code>。</p>
<p data-nodeid="1670">现在，你已经对 Yarn 有了一个初步了解，接下来我们来分析一下 Yarn 的安装机制和思想。</p>
<h3 data-nodeid="1671">Yarn 安装机制和背后思想</h3>
<p data-nodeid="1672">上一讲我们已经介绍过了 npm 安装机制，这里我们再来看一下 Yarn 的安装理念。简单来说，Yarn 的安装过程主要有以下 5 大步骤：</p>
<p data-nodeid="1673">检测（checking）→ 解析包（Resolving Packages） → 获取包（Fetching Packages）→ 链接包（Linking Packages）→ 构建包（Building Packages）</p>
<p data-nodeid="1674"><img src="https://s0.lgstatic.com/i/image/M00/8A/17/CgqCHl_ZflCANVu8AAJJZZYzwhs026.png" alt="图片14.png" data-nodeid="1842"></p>
<div data-nodeid="1675"><p style="text-align:center">Yarn 安装流程图</p></div>
<p data-nodeid="1676"><strong data-nodeid="1846">检测包（checking）</strong></p>
<p data-nodeid="1677">这一步主要是<strong data-nodeid="1856">检测项目中是否存在一些 npm 相关文件</strong>，比如 package-lock.json 等。如果有，会提示用户注意：这些文件的存在可能会导致冲突。在这一步骤中，<strong data-nodeid="1857">也会检查系统 OS、CPU 等信息</strong>。</p>
<p data-nodeid="1678"><strong data-nodeid="1861">解析包（Resolving Packages）</strong></p>
<p data-nodeid="1679">这一步会解析依赖树中每一个包的版本信息。</p>
<p data-nodeid="1680">首先获取当前项目中 package.json 定义的 dependencies、devDependencies、optionalDependencies 的内容，这属于首层依赖。</p>
<p data-nodeid="1681">接着<strong data-nodeid="1869">采用遍历首层依赖的方式获取依赖包的版本信息</strong>，以及递归查找每个依赖下嵌套依赖的版本信息，并将解析过和正在解析的包用一个 Set 数据结构来存储，这样就能保证同一个版本范围内的包不会被重复解析。</p>
<ul data-nodeid="1682">
<li data-nodeid="1683">
<p data-nodeid="1684">对于没有解析过的包 A，首次尝试从 yarn.lock 中获取到版本信息，并标记为已解析；</p>
</li>
<li data-nodeid="1685">
<p data-nodeid="1686">如果在 yarn.lock 中没有找到包 A，则向 Registry 发起请求获取满足版本范围的已知最高版本的包信息，获取后将当前包标记为已解析。</p>
</li>
</ul>
<p data-nodeid="1687">总之，在经过解析包这一步之后，我们就确定了所有依赖的具体版本信息以及下载地址。</p>
<p data-nodeid="1688"><img src="https://s0.lgstatic.com/i/image/M00/84/9F/CgqCHl_TbimACnDOAAFMC14gP8I289.png" alt="Drawing 2.png" data-nodeid="1875"></p>
<div data-nodeid="1689"><p style="text-align:center">解析包获取流程图</p></div>
<p data-nodeid="1690"><strong data-nodeid="1879">获取包（Fetching Packages）</strong></p>
<p data-nodeid="1691">这一步我们首先需要检查缓存中是否存在当前的依赖包，同时将缓存中不存在的依赖包下载到缓存目录。说起来简单，但是还是有些问题值得思考。</p>
<p data-nodeid="1692">比如：如何判断缓存中是否存在当前的依赖包？<strong data-nodeid="1888">其实 Yarn 会根据 cacheFolder+slug+node_modules+pkg.name 生成一个 path，判断系统中是否存在该 path，如果存在证明已经有缓存，不用重新下载。这个 path 也就是依赖包缓存的具体路径</strong>。</p>
<p data-nodeid="1693">对于没有命中缓存的包，Yarn 会维护一个 fetch 队列，按照规则进行网络请求。如果下载包地址是一个 file 协议，或者是相对路径，就说明其指向一个本地目录，此时调用 Fetch From Local 从离线缓存中获取包；否则调用 Fetch From External 获取包。最终获取结果使用 fs.createWriteStream 写入到缓存目录下。</p>
<p data-nodeid="1694"><img src="https://s0.lgstatic.com/i/image/M00/84/94/Ciqc1F_TbjKAThkOAAEsp0sOHUc622.png" alt="Drawing 3.png" data-nodeid="1892"></p>
<div data-nodeid="1695"><p style="text-align:center">获取包流程图</p></div>
<p data-nodeid="1696"><strong data-nodeid="1896">链接包（Linking Packages）</strong></p>
<p data-nodeid="1697">上一步是将依赖下载到缓存目录，这一步是将项目中的依赖复制到项目 node_modules 下，同时遵循扁平化原则。在复制依赖前，Yarn 会先解析 peerDependencies，如果找不到符合 peerDependencies 的包，则进行 warning 提示，并最终拷贝依赖到项目中。</p>
<p data-nodeid="1698">这里提到的扁平化原则是核心原则，我也会在后面内容进行详细的讲解。</p>
<p data-nodeid="1699"><img src="https://s0.lgstatic.com/i/image/M00/84/94/Ciqc1F_Tbj2AWiPOAADyaZB-wGw502.png" alt="Drawing 4.png" data-nodeid="1903"></p>
<div data-nodeid="1700"><p style="text-align:center">链接包解析流程图</p></div>
<p data-nodeid="1701"><strong data-nodeid="1907">构建包（Building Packages）</strong></p>
<p data-nodeid="1702">如果依赖包中存在二进制包需要进行编译，会在这一步进行。</p>
<p data-nodeid="1703">了解了 npm 和 Yarn 的安装原理还不是“终点”，因为一个应用项目的依赖错综复杂。接下来我将从“依赖地狱”说起，帮助你加深对依赖机制相关内容的理解，以便在开发生产中灵活运用。</p>
<h3 data-nodeid="1704">破解依赖管理困境</h3>
<p data-nodeid="1705">早期 npm（npm v2）的设计非常简单，在安装依赖时将依赖放到项目的 node_modules 文件中；同时如果某个直接依赖 A 还依赖其他模块 B，作为间接依赖，模块 B 将会被下载到 A 的 node_modules 文件夹中，依此递归执行，最终形成了一颗巨大的依赖模块树。</p>
<p data-nodeid="1706">这样的 node_modules 结构，的确简单明了、符合预期，但对大型项目在某些方面却不友好，比如可能有很多重复的依赖包，而且会形成“嵌套地狱”。</p>
<p data-nodeid="1707">那么如何理解“嵌套地狱”呢？</p>
<ul data-nodeid="1708">
<li data-nodeid="1709">
<p data-nodeid="1710">项目依赖树的层级非常深，不利于调试和排查问题；</p>
</li>
<li data-nodeid="1711">
<p data-nodeid="1712">依赖树的不同分支里，可能存在同样版本的相同依赖。比如直接依赖 A 和 B，但 A 和 B 都依赖相同版本的模块 C，那么 C 会重复出现在 A 和 B 依赖的 node_modules 中。</p>
</li>
</ul>
<p data-nodeid="2044" class="">这种重复问题使得<strong data-nodeid="2052">安装结果浪费了较大的空间资源，也使得安装过程过慢，甚至会因为目录层级太深导致文件路径太长，最终在 Windows 系统下删除 node_modules 文件夹出现失败情况</strong>。</p>

<p data-nodeid="1714">因此 npm v3 之后，node_modules 的结构改成了扁平结构，按照上面的例子（项目直接依赖模块 A，A 还依赖其他模块 B），我们得到下面的图示：</p>
<p data-nodeid="1715"><img src="https://s0.lgstatic.com/i/image/M00/8A/0C/Ciqc1F_ZfoKACluCAADJ2SvodGg411.png" alt="图片10.png" data-nodeid="1937"></p>
<div data-nodeid="1716"><p style="text-align:center">npm 不同版本的安装结构图 ①</p></div>
<p data-nodeid="1717" class="">当项目新添加了 C 依赖，而它依赖另一个版本的 B v2.0。这时候版本要求不一致导致冲突，B v2.0 没办法放在项目平铺目录下的 node_moduls 文件当中，npm v3 会把 C 依赖的 B v2.0 安装在 C 的 node_modules 下：</p>
<p data-nodeid="1718"><img src="https://s0.lgstatic.com/i/image/M00/8A/0D/Ciqc1F_Zf1eAWVhcAADO_4H0sjA082.png" alt="图片9.png" data-nodeid="1945"></p>
<div data-nodeid="1719"><p style="text-align:center">npm 不同版本的安装结构图 ②</p></div>
<p data-nodeid="1720">接下来，在 npm v3 中，假如我们的 App 现在还需要依赖一个 D，而 D 也依赖 B v2.0 ，我们会得到如下结构：</p>
<p data-nodeid="1721"><img src="https://s0.lgstatic.com/i/image2/M01/01/EB/Cip5yF_Zf2mABSwEAAC-YH5jkcQ965.png" alt="图片17.png" data-nodeid="1949"></p>
<div data-nodeid="1722"><p style="text-align:center">npm 安装结构图 ①</p></div>
<p data-nodeid="9323" class="te-preview-highlight">这里我想请你思考一个问题：<strong data-nodeid="9333">为什么 B v1.0 出现在项目顶层 node_modules，而不是 B v2.0 出现在 node_modules 顶层呢</strong>？</p>









<p data-nodeid="1724">其实这取决于模块 A 和 C 的安装顺序。因为 A 先安装，所以 A 的依赖 B v1.0 率先被安装在顶层 node_modules 中，接着 C 和 D 依次被安装，C 和 D 的依赖 B v2.0 就不得不安装在 C 和 D 的 node_modules 当中了。因此，<strong data-nodeid="1971">模块的安装顺序可能影响 node_modules 内的文件结构</strong>。</p>
<p data-nodeid="1725">我们继续依赖工程化之旅。假设这时候项目又添加了一个依赖 E ，E 依赖了 B v1.0 ，安装 E 之后，我们会得到这样一个结构：</p>
<p data-nodeid="1726"><img src="https://s0.lgstatic.com/i/image2/M01/01/EC/CgpVE1_Zf4aADdDJAADNnUsWnlc423.png" alt="图片6.png" data-nodeid="1975"></p>
<div data-nodeid="1727"><p style="text-align:center">npm 安装结构图 ②</p></div>
<p data-nodeid="1728">此时对应的 package.json 中，依赖包的顺序如下：</p>
<pre class="lang-java" data-nodeid="1729"><code data-language="java">{
    A: <span class="hljs-string">"1.0"</span>,
    C: <span class="hljs-string">"1.0"</span>,
    D: <span class="hljs-string">"1.0"</span>,
    E: <span class="hljs-string">"1.0"</span>
}
</code></pre>
<p data-nodeid="1730">如果我们想更新模块 A 为 v2.0，而模块 A v2.0 依赖了 B v2.0，npm v3 会怎么处理呢？</p>
<p data-nodeid="1731">整个过程是这样的：</p>
<ul data-nodeid="1732">
<li data-nodeid="1733">
<p data-nodeid="1734">删除 A v1.0；</p>
</li>
<li data-nodeid="1735">
<p data-nodeid="1736">安装 A v2.0；</p>
</li>
<li data-nodeid="1737">
<p data-nodeid="1738">留下 B v1.0 ，因为 E v1.0 还在依赖；</p>
</li>
<li data-nodeid="1739">
<p data-nodeid="1740">把 B v2.0 安装在 A v2.0 下，因为顶层已经有了一个 B v1.0。</p>
</li>
</ul>
<p data-nodeid="1741">它的结构如下：</p>
<p data-nodeid="1742"><img src="https://s0.lgstatic.com/i/image2/M01/01/EB/Cip5yF_Zf6iAClRIAADSW-XFvzA495.png" alt="图片5.png" data-nodeid="1986"></p>
<div data-nodeid="1743"><p style="text-align:center">npm 安装结构图 ③</p></div>
<p data-nodeid="1744">这时模块 B v2.0 分别出现在了 A、C、D 模块下——重复存在了。</p>
<p data-nodeid="1745">通过这一系列操作我们可以看到：<strong data-nodeid="1995">npm 包的安装顺序对于依赖树的影响很大。模块安装顺序可能影响 node_modules 内的文件数量</strong>。</p>
<p data-nodeid="1746">这里一个更理想的依赖结构理应是：</p>
<p data-nodeid="1747"><img src="https://s0.lgstatic.com/i/image2/M01/01/EC/CgpVE1_Zf76ADk3NAADVWLHAHTo908.png" alt="图片4.png" data-nodeid="1999"></p>
<div data-nodeid="1748"><p style="text-align:center">npm 安装结构图 ④</p></div>
<p data-nodeid="1749">过了一段时间，模块 E v2.0 发布了，并且 E v2.0 也依赖了模块 B v2.0 ，npm v3 更新 E 时会怎么做呢？</p>
<ul data-nodeid="1750">
<li data-nodeid="1751">
<p data-nodeid="1752">删除 E v1.0；</p>
</li>
<li data-nodeid="1753">
<p data-nodeid="1754">安装 E v2.0；</p>
</li>
<li data-nodeid="1755">
<p data-nodeid="1756">删除 B v1.0；</p>
</li>
<li data-nodeid="1757">
<p data-nodeid="1758">安装 B v2.0 在顶层 node_modules 中，因为现在顶层没有任何版本的 B 了。</p>
</li>
</ul>
<p data-nodeid="1759">此时得到图：</p>
<p data-nodeid="1760"><img src="https://s0.lgstatic.com/i/image/M00/8A/0D/Ciqc1F_Zf82Abr7LAADYStAX7VU318.png" alt="图片3.png" data-nodeid="2010"></p>
<div data-nodeid="1761"><p style="text-align:center">npm 安装结构图 ⑤</p></div>
<p data-nodeid="1762">这时候，你可以明显看到出现了较多重复的依赖模块 B v2.0。我们可以删除 node_modules，重新安装，利用 npm 的依赖分析能力，得到一个更清爽的结构。</p>
<p data-nodeid="1763">实际上，更优雅的方式是使用 npm dedupe 命令，得到：</p>
<p data-nodeid="1764"><img src="https://s0.lgstatic.com/i/image/M00/8A/19/CgqCHl_Zf-WAb-BnAADAe1GD0YY021.png" alt="图片2.png" data-nodeid="2017"></p>
<div data-nodeid="1765"><p style="text-align:center">npm 安装结构图 ⑥</p></div>
<p data-nodeid="1766">实际上，Yarn 在安装依赖时会自动执行 dedupe 命令。<strong data-nodeid="2023">整个优化的安装过程，就是上一讲提到的扁平化安装模式，也是需要你掌握的关键内容</strong>。</p>
<h3 data-nodeid="1767">结语</h3>
<p data-nodeid="1768">这一讲我们解析了 Yarn 安装原理。</p>
<p data-nodeid="1769"><img src="https://s0.lgstatic.com/i/image/M00/8A/19/CgqCHl_ZgAuAIfWbAAc_D0oluIE175.png" alt="前端基建 金句.png" data-nodeid="2028"></p>
<p data-nodeid="1770">通过本讲内容，你可以发现包安装并不只是从远程下载文件那么简单，这其中涉及缓存、系统文件路径，更重要的是还涉及了安装依赖树的解析、安装结构算法等。</p>
<p data-nodeid="1771">最后，给大家布置一个思考题，<a href="https://github.blog/2020-10-13-presenting-v7-0-0-of-the-npm-cli/" data-nodeid="2033">npm v7</a> 在 2020 年 10 月刚刚发布，请你总结一下它的新特性，并思考一下为什么要引入这些新的特性？这些新特性背后是如何实现的？欢迎在留言区分享你的观点。</p>
<hr data-nodeid="1772">
<p data-nodeid="1773"><a href="https://shenceyun.lagou.com/t/mka" data-nodeid="2039"><img src="https://s0.lgstatic.com/i/image2/M01/00/66/CgpVE1_W_x2AaW0rAAdqMM6w3z0145.png" alt="大前端引流.png" data-nodeid="2038"></a></p>
<p data-nodeid="1774" class="">对标阿里P7技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。<a href="https://shenceyun.lagou.com/t/mka" data-nodeid="2043">点此链接，快来领取！</a></p>

---

### 精选评论

##### *强：
> 了解了 npm 的安装依赖的原理，还有 npm dedupe 命令，学到了！😎

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 加油~

##### **的小叶酱：
> 找了一下官方的文档，好像没有内部原理相关的内容。想请教一下大佬的学习方法🙋

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 看源码其实是个很好的方式，没有文档，总有源码呀

##### **欣：
> `其实 Yarn 会根据 cacheFolder+slug+node_modules+pkg.name 生成一个 path，判断系统中是否存在该 path，如果存在证明已经有缓存，不用重新下载` 和 `Yarn 默认使用 prefer-online 模式，即优先使用网络数据。如果网络数据请求失败，再去请求缓存数据。` 这2段话是不是冲突了啊

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 第一段表述其实有个前提： prefer-online 如果关闭了，那么在走缓存时，「`其实 Yarn 会根据 cacheFolder+slug+node_modules+pkg.name 生成一个 path，判断系统中是否存在该 path，如果存在证明已经有缓存，不用重新下载」

##### *舒：
> 这一讲下来，我的感触是 是不是yarn是当时历史的产物，现在 npm 的功能已经比较完善了，不太需要 yarn 了

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 目前来看，两者并驾齐驱，取决于团队技术选型

##### **彪：
> “相比 npm，Yarn 另外一个显著区别是 yarn.lock 中子依赖的版本号不是固定版本。这就说明单独一个 yarn.lock 确定不了 node_modules 目录结构，还需要和 package.json 文件进行配合。”npm的node_modules目录结构不也是通过lock和package.json一起决定的吗？希望予以解答，谢谢~

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 这里的差别在于  yarn.lock 和 package-lock

##### **航：
> 为什么npm不在安装或者更新依赖时自动执行npm dedupe

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; npm dedupe 还是要留给开发者应用，毕竟它并不完全可靠，按你说的，npm 就很难有一致性可靠性了

##### **彪：
> npm v7更新：1. Workspaces: npm CLI的一组功能，可支持从单个顶级软件包中管理多个软件包2.">自动安装peerDependencies3. package-lock v2和对yarn.lock的支持

##### **宇：
> 为什么b1.0和b2.0不能设计成平级，根据不同版本号区分

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 历史的坑，最开始方案就不支持，如果只区分 major 那么 patch 和 fix 版本号还平级吗？平级的话，size 太大了，不平级，那区别也不多

##### *腾：
> 想问一下侯大有调试yarn源码的技巧吗

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 和调试其他源码没什么特别的地方，唯一需要注意的是，可以结合实践分析

##### 无：
> 请教侯大阅读 yarn 源码的技巧，是生读源码还是配合调试工具进行的呢？研究 yarn install 部分的源码时，发觉基于 gulp 打包至 lib 的流程似乎难以实现源码逐行调试，有些疑惑🤔

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 这个看自己喜好吧。我是遇见了问题，去翻源码。不会直接看源码

##### **鑫：
> 这个示例项目同时依赖了两个不同版本的依赖 B v1.0 和 C 依赖的 B v2.0, 那么项目打包的时候是两个版本的 B 都被打包进项目了吗?

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是否都被打包，取决于业务上是否都有直接或间接应用

##### **飞：
> 为啥不讲 npm v6 而是讲 v3

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; v3 开始加入的某些新特性，v6 一直在沿用，对比新旧特性，就提到了 v3 这个本质不冲突啊，注意：v3 开始加入的某些新特性，v6 一直在沿用，沿用到现在，都一起讲了啊。那我为啥不讲新出的 v7...v7 也有些新特性，留在了思考题阶段

##### *帅：
> 请问如果一个项目里，混用npm和yarn会产生什么影响呢

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 锁版本机制不一样

##### **4299：
> 受益匪浅，感谢老师，讲的太好了，深知自己的不足。

