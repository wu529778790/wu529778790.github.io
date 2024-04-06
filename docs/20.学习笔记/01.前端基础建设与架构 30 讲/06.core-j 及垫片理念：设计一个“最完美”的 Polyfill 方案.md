<p data-nodeid="1485" class="">即便你不知道 <a href="https://github.com/zloirock/core-js" data-nodeid="1597">core-js</a>，也一定在项目中直接或间接地使用过它。core-js 是一个 JavaScript 标准库，它包含了 ECMAScript 2020 在内的多项特性的 polyfills，以及 ECMAScript 在 proposals 阶段的特性、WHATWG/W3C 新特性等。因此它是一个现代化前端项目的“标准套件”。</p>
<p data-nodeid="1486">除了 core-js 本身的重要性，它的实现理念、设计方式都值得我们学习。事实上，core-js 是一扇大门：</p>
<ul data-nodeid="1487">
<li data-nodeid="1488">
<p data-nodeid="1489">通过 core-js，我们可以窥见<strong data-nodeid="1605">前端工程化</strong>的方方面面；</p>
</li>
<li data-nodeid="1490">
<p data-nodeid="1491">core-js 又和 Babel 深度绑定，因此学习 core-js，也能帮助开发者<strong data-nodeid="1611">更好地理解 babel 生态</strong>，进而加深对前端生态的理解；</p>
</li>
<li data-nodeid="1492">
<p data-nodeid="1493">通过对 core-js 的解析，我们正好可以梳理前端一个极具特色的概念——<strong data-nodeid="1617">polyfill（垫片/补丁）</strong>。</p>
</li>
</ul>
<p data-nodeid="1494">这一讲，就让我们深入谈谈以上内容。</p>
<h3 data-nodeid="1495">core-js 工程一览</h3>
<p data-nodeid="1496">core-js 是一个由 <a href="https://github.com/lerna/lerna" data-nodeid="1623">Lerna</a> 搭建的 Monorepo 风格的项目，在它的 <a href="https://github.com/zloirock/core-js/tree/master/packages" data-nodeid="1627">packages</a> 中，我们能看到五个相关包：</p>
<ul data-nodeid="1497">
<li data-nodeid="1498">
<p data-nodeid="1499">core-js</p>
</li>
<li data-nodeid="1500">
<p data-nodeid="1501">core-js-pure</p>
</li>
<li data-nodeid="1502">
<p data-nodeid="1503">core-js-compact</p>
</li>
<li data-nodeid="1504">
<p data-nodeid="1505">core-js-builder</p>
</li>
<li data-nodeid="1506">
<p data-nodeid="1507">core-js-bundle</p>
</li>
</ul>
<p data-nodeid="1508">我们先从 core-js 入手。<strong data-nodeid="1639">core-js 实现的基础垫片能力，是整个 core-js 的逻辑核心</strong>。</p>
<p data-nodeid="1509">比如我们可以按照如下代码引入全局 polyfills：</p>
<pre class="lang-java" data-nodeid="1510"><code data-language="java"><span class="hljs-keyword">import</span> <span class="hljs-string">'core-js'</span>;
</code></pre>
<p data-nodeid="1511">或者按照：</p>
<pre class="lang-java" data-nodeid="1512"><code data-language="java"><span class="hljs-keyword">import</span> <span class="hljs-string">'core-js/features/array/from'</span>;
</code></pre>
<p data-nodeid="1513">的方式，按需在业务项目的入口引入某些 polyfills。</p>
<p data-nodeid="1514">core-js 为什么有这么多的 packages 呢？实际上，它们各司其职，又紧密配合，接下来我们来具体分析。</p>
<p data-nodeid="1515"><strong data-nodeid="1648">core-js-pure 提供了不污染全局变量的垫片能力</strong>，比如我们可以按照：</p>
<pre class="lang-java" data-nodeid="1516"><code data-language="java"><span class="hljs-keyword">import</span> _from from <span class="hljs-string">'core-js-pure/features/array/from'</span>;
<span class="hljs-keyword">import</span> _flat from <span class="hljs-string">'core-js-pure/features/array/flat'</span>;
</code></pre>
<p data-nodeid="1517">的方式，来实现独立的导出命名空间，进而避免全局变量的污染。</p>
<p data-nodeid="1518"><strong data-nodeid="1660">core-js-compact 维护了按照</strong><a href="https://github.com/browserslist/browserslist" data-nodeid="1655">browserslist</a><strong data-nodeid="1661">规范的垫片需求数据</strong>，来帮助我们找到“符合目标环境”的 polyfills 需求集合，比如以下代码：</p>
<pre class="lang-java" data-nodeid="1519"><code data-language="java"><span class="hljs-keyword">const</span> {
  list, <span class="hljs-comment">// array of required modules</span>
  targets, <span class="hljs-comment">// object with targets for each module</span>
} = require(<span class="hljs-string">'core-js-compat'</span>)({
  targets: <span class="hljs-string">'&gt; 2.5%'</span>
});
</code></pre>
<p data-nodeid="1520">就可以筛选出全球使用份额大于 2.5% 的浏览器范围，并提供在这个范围下需要支持的垫片能力。</p>
<p data-nodeid="1521"><strong data-nodeid="1667">core-js-builder 可以结合 core-js-compact 以及 core-js，并利用 webpack 能力，根据需求打包出 core-js 代码</strong>。比如：</p>
<pre class="lang-java" data-nodeid="1522"><code data-language="java">require(<span class="hljs-string">'core-js-builder'</span>)({
  targets: <span class="hljs-string">'&gt; 0.5%'</span>,
  filename: <span class="hljs-string">'./my-core-js-bundle.js'</span>,
}).then(code =&gt; {}).<span class="hljs-keyword">catch</span>(error =&gt; {});
</code></pre>
<p data-nodeid="1523">将会把符合需求的 core-js 垫片打包到<code data-backticks="1" data-nodeid="1669">my-core-js-bundle.js</code>文件当中。整个流程可以用代码演示为：</p>
<pre class="lang-java" data-nodeid="1524"><code data-language="java">require(<span class="hljs-string">'./packages/core-js-builder'</span>)({ filename: <span class="hljs-string">'./packages/core-js-bundle/index.js'</span> }).then(done).<span class="hljs-keyword">catch</span>(error =&gt; {
  <span class="hljs-comment">// eslint-disable-next-line no-console</span>
  console.error(error);
  process.exit(<span class="hljs-number">1</span>);
});
</code></pre>
<p data-nodeid="1525">总之，根据分包的设计，我们能发现，<strong data-nodeid="1676">core-js 将自身能力充分解耦，提供出的多个包都可以被其他项目所依赖</strong>。比如：</p>
<ul data-nodeid="1526">
<li data-nodeid="1527">
<p data-nodeid="1528">core-js-compact 可以被 Babel 生态使用，由 Babel 分析出根据环境需要按需加载的垫片；</p>
</li>
<li data-nodeid="1529">
<p data-nodeid="1530">core-js-builder 可以被 Node.js 服务使用，构建出不同场景的垫片包。</p>
</li>
</ul>
<p data-nodeid="1531">宏观上的设计，体现了工程复用能力。下面我们通过一个微观 polyfill 案例，从一个具体的垫片实现，进一步加深理解。</p>
<h3 data-nodeid="1532">如何复用一个 Polyfill 实现</h3>
<p data-nodeid="1533"><a href="https://tc39.es/ecma262/#sec-array.prototype.every" data-nodeid="1683">Array.prototype.every</a> 是一个常见且常用的数组原型上的方法。该方法用于测试一个数组内所有元素是否都能通过某个指定函数的测试，并最终返回一个布尔值来表示测试是否通过。它的浏览器兼容性<a href="https://www.caniuse.com/?search=array.prototype.every" data-nodeid="1687">如下图</a>所示：</p>
<p data-nodeid="1534"><img src="https://s0.lgstatic.com/i/image/M00/8C/4F/Ciqc1F_q7bKAcYXcAALU37lw2JY310.png" alt="Drawing 0.png" data-nodeid="1691"></p>
<p data-nodeid="1535">Array.prototype.every 的函数签名如下：</p>
<pre class="lang-java" data-nodeid="1536"><code data-language="java">arr.every(callback(element[, index[, array]])[, thisArg])
</code></pre>
<p data-nodeid="1537">对于一个有经验的前端程序员来说，如果浏览器不支持 Array.prototype.every，手写实现一个 Array.prototype.every 的 polyfill 并不困难，下面是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every" data-nodeid="1696">MDN</a> 的一个实现：</p>
<pre class="lang-java" data-nodeid="1538"><code data-language="java"><span class="hljs-keyword">if</span> (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    <span class="hljs-string">'use strict'</span>;
    <span class="hljs-keyword">var</span> T, k;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> == <span class="hljs-keyword">null</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> TypeError(<span class="hljs-string">'this is null or not defined'</span>);
    }
    <span class="hljs-keyword">var</span> O = Object(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">var</span> len = O.length &gt;&gt;&gt; <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (typeof callbackfn !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> TypeError();
    }
    <span class="hljs-keyword">if</span> (arguments.length &gt; <span class="hljs-number">1</span>) {
      T = thisArg;
    }
    k = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">while</span> (k &lt; len) {
      <span class="hljs-keyword">var</span> kValue;
      <span class="hljs-keyword">if</span> (k in O) {
        kValue = O[k];
        <span class="hljs-keyword">var</span> testResult = callbackfn.call(T, kValue, k, O);
        <span class="hljs-keyword">if</span> (!testResult) {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
        }
      }
      k++;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
  };
}
</code></pre>
<p data-nodeid="1539">核心思路很好理解：我们通过遍历数组，对数组的每一项调用 CALLBACK 求值进行返回是否通过测试。但是站在工程化的角度，从 core-js 这样一个大型项目的视角出发，就不是这么简单了。比如，我们知道 core-js-pure 不同于 core-js，它提供了<strong data-nodeid="1707">不污染命名空间</strong>的引用方式，因此上述 Array.prototype.every 的 polyfill 核心逻辑实现，就需要被 core-js-pure 和 core-js 同时引用，只要<strong data-nodeid="1708">区分最后导出的方式</strong>即可，那么按照这个思路，我们如何实现最大限度的复用呢？</p>
<p data-nodeid="1540">实际上，Array.prototype.every 的 polyfill 核心逻辑实现在<code data-backticks="1" data-nodeid="1710">./packages/core-js/modules/es.array.every.js</code>中，<a href="https://github.com/zloirock/core-js/blob/master/packages/core-js/modules/es.array.every.js" data-nodeid="1714">源码</a>如下：</p>
<pre class="lang-java" data-nodeid="1541"><code data-language="java"><span class="hljs-string">'use strict'</span>;
<span class="hljs-keyword">var</span> $ = require(<span class="hljs-string">'../internals/export'</span>);
<span class="hljs-keyword">var</span> $every = require(<span class="hljs-string">'../internals/array-iteration'</span>).every;
<span class="hljs-keyword">var</span> arrayMethodIsStrict = require(<span class="hljs-string">'../internals/array-method-is-strict'</span>);
<span class="hljs-keyword">var</span> arrayMethodUsesToLength = require(<span class="hljs-string">'../internals/array-method-uses-to-length'</span>);
<span class="hljs-keyword">var</span> STRICT_METHOD = arrayMethodIsStrict(<span class="hljs-string">'every'</span>);
<span class="hljs-keyword">var</span> USES_TO_LENGTH = arrayMethodUsesToLength(<span class="hljs-string">'every'</span>);
$({ target: <span class="hljs-string">'Array'</span>, proto: <span class="hljs-keyword">true</span>, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  every: <span class="hljs-function">function <span class="hljs-title">every</span><span class="hljs-params">(callbackfn <span class="hljs-comment">/* , thisArg */</span>)</span> </span>{
    <span class="hljs-comment">// 调用 $every 方法</span>
    <span class="hljs-keyword">return</span> $every(<span class="hljs-keyword">this</span>, callbackfn, arguments.length &gt; <span class="hljs-number">1</span> ? arguments[<span class="hljs-number">1</span>] : undefined);
  }
});
</code></pre>
<p data-nodeid="1542">对应<code data-backticks="1" data-nodeid="1717">$every</code><a href="https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/array-iteration.js#L58" data-nodeid="1720">源码</a>：</p>
<pre class="lang-java" data-nodeid="1543"><code data-language="java"><span class="hljs-keyword">var</span> bind = require(<span class="hljs-string">'../internals/function-bind-context'</span>);
<span class="hljs-keyword">var</span> IndexedObject = require(<span class="hljs-string">'../internals/indexed-object'</span>);
<span class="hljs-keyword">var</span> toObject = require(<span class="hljs-string">'../internals/to-object'</span>);
<span class="hljs-keyword">var</span> toLength = require(<span class="hljs-string">'../internals/to-length'</span>);
<span class="hljs-keyword">var</span> arraySpeciesCreate = require(<span class="hljs-string">'../internals/array-species-create'</span>);
<span class="hljs-keyword">var</span> push = [].push;
<span class="hljs-comment">// 对 `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` 等方法进行接模拟和接入</span>
<span class="hljs-keyword">var</span> createMethod = function (TYPE) {
  <span class="hljs-comment">// 通过魔法数字来表示具体需要对哪种方法进行模拟</span>
  <span class="hljs-keyword">var</span> IS_MAP = TYPE == <span class="hljs-number">1</span>;
  <span class="hljs-keyword">var</span> IS_FILTER = TYPE == <span class="hljs-number">2</span>;
  <span class="hljs-keyword">var</span> IS_SOME = TYPE == <span class="hljs-number">3</span>;
  <span class="hljs-keyword">var</span> IS_EVERY = TYPE == <span class="hljs-number">4</span>;
  <span class="hljs-keyword">var</span> IS_FIND_INDEX = TYPE == <span class="hljs-number">6</span>;
  <span class="hljs-keyword">var</span> NO_HOLES = TYPE == <span class="hljs-number">5</span> || IS_FIND_INDEX;
  <span class="hljs-keyword">return</span> function ($<span class="hljs-keyword">this</span>, callbackfn, that, specificCreate) {
    <span class="hljs-keyword">var</span> O = toObject($<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">var</span> self = IndexedObject(O);
    <span class="hljs-comment">// 通过 bind 方法创建一个 boundFunction，保留 this 指向</span>
    <span class="hljs-keyword">var</span> boundFunction = bind(callbackfn, that, <span class="hljs-number">3</span>);
    <span class="hljs-keyword">var</span> length = toLength(self.length);
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> create = specificCreate || arraySpeciesCreate;
    <span class="hljs-keyword">var</span> target = IS_MAP ? create($<span class="hljs-keyword">this</span>, length) : IS_FILTER ? create($<span class="hljs-keyword">this</span>, <span class="hljs-number">0</span>) : undefined;
    <span class="hljs-keyword">var</span> value, result;
   &nbsp;<span class="hljs-comment">// 遍历循环并执行回调方法</span>
    <span class="hljs-keyword">for</span> (;length &gt; index; index++) <span class="hljs-keyword">if</span> (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      <span class="hljs-keyword">if</span> (TYPE) {
        <span class="hljs-keyword">if</span> (IS_MAP) target[index] = result; <span class="hljs-comment">// map</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (result) <span class="hljs-keyword">switch</span> (TYPE) {
          <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>: <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;              <span class="hljs-comment">// some</span>
          <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>: <span class="hljs-keyword">return</span> value;             <span class="hljs-comment">// find</span>
          <span class="hljs-keyword">case</span> <span class="hljs-number">6</span>: <span class="hljs-keyword">return</span> index;             <span class="hljs-comment">// findIndex</span>
          <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>: push.call(target, value); <span class="hljs-comment">// filter</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (IS_EVERY) <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;  <span class="hljs-comment">// every</span>
      }
    }
    <span class="hljs-keyword">return</span> IS_FIND_INDEX ? -<span class="hljs-number">1</span> : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  forEach: createMethod(<span class="hljs-number">0</span>),
  map: createMethod(<span class="hljs-number">1</span>),
  filter: createMethod(<span class="hljs-number">2</span>),
  some: createMethod(<span class="hljs-number">3</span>),
  every: createMethod(<span class="hljs-number">4</span>),
  find: createMethod(<span class="hljs-number">5</span>),
  findIndex: createMethod(<span class="hljs-number">6</span>)
};
</code></pre>
<p data-nodeid="1544">同样是使用了遍历的方式，并由<code data-backticks="1" data-nodeid="1723">../internals/function-bind-context</code>提供 this 绑定能力，用魔法常量处理<code data-backticks="1" data-nodeid="1725">forEach、map、filter、some、every、find、findIndex</code>这些数组原型方法的不同方法。</p>
<p data-nodeid="1545">重点来了，在 core-js 中，作者通过<code data-backticks="1" data-nodeid="1728">../internals/export</code>方法导出实现原型，<a href="https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/export.js" data-nodeid="1732">源码</a>如下：</p>
<pre class="lang-java" data-nodeid="1546"><code data-language="java"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = function (options, source) {
  <span class="hljs-keyword">var</span> TARGET = options.target;
  <span class="hljs-keyword">var</span> GLOBAL = options.global;
  <span class="hljs-keyword">var</span> STATIC = options.stat;
  <span class="hljs-keyword">var</span> FORCED, target, key, targetProperty, sourceProperty, descriptor;
  <span class="hljs-keyword">if</span> (GLOBAL) {
    target = global;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } <span class="hljs-keyword">else</span> {
    target = (global[TARGET] || {}).prototype;
  }
  <span class="hljs-keyword">if</span> (target) <span class="hljs-keyword">for</span> (key in source) {
    sourceProperty = source[key];
    <span class="hljs-keyword">if</span> (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor &amp;&amp; descriptor.value;
    } <span class="hljs-keyword">else</span> targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? <span class="hljs-string">'.'</span> : <span class="hljs-string">'#'</span>) + key, options.forced);
    <span class="hljs-keyword">if</span> (!FORCED &amp;&amp; targetProperty !== undefined) {
      <span class="hljs-keyword">if</span> (typeof sourceProperty === typeof targetProperty) <span class="hljs-keyword">continue</span>;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    <span class="hljs-keyword">if</span> (options.sham || (targetProperty &amp;&amp; targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, <span class="hljs-string">'sham'</span>, <span class="hljs-keyword">true</span>);
    }
    redefine(target, key, sourceProperty, options);
  }
};
</code></pre>
<p data-nodeid="1547">对应我们的 Array.prototype.every<a href="https://github.com/zloirock/core-js/blob/master/packages/core-js/modules/es.array.every.js" data-nodeid="1737">源码</a>，参数为：<code data-backticks="1" data-nodeid="1739">target: 'Array', proto: true</code>，表明 coe-js 需要在数组 Array 的原型上，以“污染数组原型”的方式来扩展方法。</p>
<p data-nodeid="1548">而 core-js-pure 则单独维护了一份 export 镜像<code data-backticks="1" data-nodeid="1742">../internals/export</code>，其<a href="https://github.com/zloirock/core-js/blob/master/packages/core-js-pure/override/internals/export.js" data-nodeid="1746">源码</a>我在这里不做过多讲解，你可以在本节内容学习后进一步查看。</p>
<p data-nodeid="1549">同时，core-js-pure 包中的 Override 文件，实际上是在构建阶段，复制了 packages/core-js/ 内的核心逻辑（<a href="https://github.com/zloirock/core-js/blob/master/Gruntfile.js#L73" data-nodeid="1751">源码在这里</a>），同时提供了复写这些核心 polyfills 逻辑的能力，也是通过构建流程，进行 core-js-pure/override 替换覆盖：</p>
<pre class="lang-java" data-nodeid="1550"><code data-language="java">{
	expand: <span class="hljs-keyword">true</span>,
	cwd: <span class="hljs-string">'./packages/core-js-pure/override/'</span>,
	src: <span class="hljs-string">'**'</span>,
	dest: <span class="hljs-string">'./packages/core-js-pure'</span>,
}
</code></pre>
<p data-nodeid="1551">这是一种非常巧妙的“利用构建能力，实现复用”的方案。但我认为，既然是 Monorepo 风格的仓库，也许一种更好的设计是将<strong data-nodeid="1758">core-js 核心 polyfills 再单独拆到一个包中，core-js 和 core-js-pure 分别进行引用</strong>——这种方式更能利用 Monorepo 能力，且减少了构建过程中的魔法处理。</p>
<h3 data-nodeid="1552">寻找最佳 Polyfill 方案</h3>
<p data-nodeid="1553">前文多次提到了 polyfill/垫片/补丁（下文混用这三种说法），这里我们正式对 polyfill 进行一个定义：</p>
<blockquote data-nodeid="1554">
<p data-nodeid="1555">A polyfill, or polyfiller, is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively. Flattening the API landscape if you will.</p>
</blockquote>
<p data-nodeid="1556">简单来说，<strong data-nodeid="1767">polyfill 就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性</strong>。</p>
<p data-nodeid="1557">随着前端的发展，尤其是 ECMAScript 的迅速成长以及浏览器的频繁更新换代，前端使用 polyfills 技术的情况屡见不鲜。<strong data-nodeid="1778">那么如何能在工程中，寻找并设计一个“最完美”的 polyfill 方案呢？<strong data-nodeid="1777">注意，这里的完美指的是</strong>侵入性最小，工程化、自动化程度最高，业务影响最低</strong>。</p>
<p data-nodeid="1558">第一种方案：<strong data-nodeid="1784">手动打补丁</strong>。这种方式最为简单直接，也能天然做到“按需打补丁”，但是这不是一种工程化的解决方式，方案原始而难以维护，同时对于 polyfill 的实现要求较高。</p>
<p data-nodeid="1559">于是，es5-shim 和 es6-shim 等“轮子”出现了，它们伴随着前端开发走过了一段艰辛岁月。但 es5-shim 和 es6-shim 这种笨重的方案很快被 babel-polyfill 取代，babel-polyfill 融合了 core-js 和 regenerator-runtime。</p>
<p data-nodeid="1560">但如果粗暴地使用 babel-polyfill 一次性全量导入到项目中，不和 @babel/preset-env 等方案结合，babel-polyfill 会将其所包含的所有补丁都应用在项目当中，这样直接造成了项目 size 过大的问题，且存在污染全局变量的潜在问题。</p>
<p data-nodeid="1561">于是，<strong data-nodeid="1792">babel-polyfill 结合 @babel/preset-env + useBuiltins（entry） + preset-env targets 的方案</strong>如今更为流行，@babel/preset-env 定义了 Babel 所需插件预设，同时由 Babel 根据 preset-env targets 配置的支持环境，自动按需加载 polyfills，使用方式如下：</p>
<pre class="lang-java" data-nodeid="1562"><code data-language="java">{
  <span class="hljs-string">"presets"</span>: [
    [<span class="hljs-string">"@babel/env"</span>, {
      useBuiltIns: <span class="hljs-string">'entry'</span>,
      targets: { chrome: <span class="hljs-number">44</span> }
    }]
  ]
}
</code></pre>
<p data-nodeid="1563">这样我们在工程代码入口处的：</p>
<pre class="lang-java" data-nodeid="1564"><code data-language="java"><span class="hljs-keyword">import</span> <span class="hljs-string">'@babel/polyfill'</span>;
</code></pre>
<p data-nodeid="1565">会被编译为：</p>
<pre class="lang-java" data-nodeid="1566"><code data-language="java"><span class="hljs-keyword">import</span> <span class="hljs-string">"core-js/XXXX/XXXX"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"core-js/XXXX/XXXXX"</span>;
</code></pre>
<p data-nodeid="1567">这样的方式省力省心。也是 core-js 和 Babel 深度绑定并结合的典型案例。</p>
<p data-nodeid="1568">上文提到了 babel-polyfill 融合了 core-js 和 regenerator-runtime，既然如此，我们也可以不使用 babel-polyfill，而直接使用 core-js。这里我根据 <a href="https://www.npmtrends.com/babel-polyfill-vs-core-js-vs-es5-shim-vs-es6-shim" data-nodeid="1799">babel-polyfill vs core-js vs es5-shim vs es6-shim</a> 的使用频率情况，进行比对，如下图所示：</p>
<p data-nodeid="1569"><img src="https://s0.lgstatic.com/i/image/M00/8C/4F/Ciqc1F_q7dKAanOXAAHwZCycIb4392.png" alt="Drawing 1.png" data-nodeid="1803"></p>
<div data-nodeid="1570"><p style="text-align:center">babel-polyfill vs core-js vs es5-shim vs es6-shim 使用频率对比图</p></div>
<p data-nodeid="1571">我们看到，<strong data-nodeid="1809">core-js 使用最多</strong>，这是因为它既可以在项目中单独使用，也可以和 Babel 绑定，作为更低层的依赖出现。</p>
<p data-nodeid="1572">我们再思考一个问题：如果某个业务代码中，并没有用到配置环境填充的 polyfills，那么这些 polyfills 的引入依然出现了引用浪费的情况。实际上环境需要是一回事儿，代码是否需要却是另一回事儿。比如，我的 MPA（多页面应用）项目需要提供 Promise Polyfill，但是某个业务页面中，并没有使用 Promise 特性，理想情况并不需要在当前页面中引入 Promise Polyfill bundle。</p>
<p data-nodeid="2612" class="te-preview-highlight">针对这个问题，@babel/preset-env + useBuiltins（usage） + preset-env targets 方案就出现了，<strong data-nodeid="2622">注意这里的 useBuiltins 配置为 usage，它可以真正根据代码情况，分析 AST（抽象语法树）进行更细粒度的按需引用</strong>。但是这种基于静态编译的按需加载补丁也是相对的，因为 JavaScript 是一种弱规则的动态语言，比如这样的代码：<code data-backticks="1" data-nodeid="2618">foo.includes(() =&gt; {//...})</code>，我们无法判断出这里的 <code data-backticks="1" data-nodeid="2620">includes</code> 是数组原型方法还是字符串原型方法，因此一般做法只能将数组原型方法和字符串原型方法同时打包为 polyfill bundle。</p>


<p data-nodeid="1574">除了在打包构建阶段植入 polyfill 以外，另外一个思路是“在线动态打补丁”，这种方案以 <a href="https://polyfill.io/v3/" data-nodeid="1824">Polyfill.io</a> 为代表，它提供了 CDN 服务，使用者可以按照所需环境，<a href="https://polyfill.io/v3/url-builder/" data-nodeid="1828">生成打包链接</a>：</p>
<p data-nodeid="1575"><img src="https://s0.lgstatic.com/i/image/M00/8C/5A/Ciqc1F_r6aWAUh6OAAGLnnSGGnY780.png" alt="Lark20201230-104425.png" data-nodeid="1832"></p>
<p data-nodeid="1576">如<code data-backticks="1" data-nodeid="1834">https://polyfill.io/v3/polyfill.min.js?features=es2015</code>，在业务中我们可以直接引入 polyfills bundle：</p>
<pre class="lang-java" data-nodeid="1577"><code data-language="java">&lt;script src="https://polyfill.io/v3/polyfill.min.js?features=es2015"&gt;&lt;/script&gt;
</code></pre>
<p data-nodeid="1578"><strong data-nodeid="1840">在高版本浏览器上，可能会返回空内容，因为该浏览器已经支持了 ES2015 特性。如果在低版本浏览器上，将会得到真实的 polyfills bundle</strong>。</p>
<p data-nodeid="1579">从工程化的角度来说，<strong data-nodeid="1846">一个趋于完美的 polyfill 设计应该满足的核心原则是按需加载补丁</strong>，这个按需加载主要包括两方面：</p>
<ul data-nodeid="1580">
<li data-nodeid="1581">
<p data-nodeid="1582">按照用户终端环境</p>
</li>
<li data-nodeid="1583">
<p data-nodeid="1584">按照业务代码使用情况</p>
</li>
</ul>
<p data-nodeid="1585">因为按需加载补丁，意味着更小的 bundle size，直接决定了应用的性能。</p>
<h3 data-nodeid="1586">总结</h3>
<p data-nodeid="1587">从对前端项目的影响来讲，core-js 不只是一个 polyfill 仓库；从前端技术设计的角度来看，core-js 也能让我们获得更多启发和灵感。这一讲我们分析了 core-js 的设计实现，并由此延展出了工程中 polyfill 设计的方方面面。但依然留下了几个问题：</p>
<ul data-nodeid="1588">
<li data-nodeid="1589">
<p data-nodeid="1590">core-js 和 Babel 生态绑定在一起，它们到底有什么联系，如何实现密切配合？</p>
</li>
<li data-nodeid="1591">
<p data-nodeid="1592">core-js 如何和 @babel/preset-env + useBuiltins（usage）配合，并利用 AST 技术，实现代码级别的按需引入？</p>
</li>
</ul>
<p data-nodeid="1593" class="">前端基础建设和工程化，每一个环节都相互关联，我们将会在“梳理混乱的 Babel，不再被编译报错困扰”一讲中，继续进行更多探索。</p>

---

### 精选评论

##### xcc：
> 大佬讲的真好。虽然很多问题接触过，不过自己不会站在那个高度看待问题

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 经验是积累出来的，继续学习，相信你会有更多收获！

##### *浩：
> 感觉前端是一个大杂烩，有好多东西需要学，好多都看不懂啊😂

 ###### &nbsp;&nbsp;&nbsp; 编辑回复：
> &nbsp;&nbsp;&nbsp; 多学习学习就好喽~

##### *浩：
> 是真的牛逼

##### *俊：
> lucas 给大家开了个门，门里面的东西得大家用手一个个摸，期待后面的东西

##### Tvinsh：
> 真棒

