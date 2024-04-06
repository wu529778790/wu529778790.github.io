<p data-nodeid="2">前面几讲我们从编程思维的角度分析了软件设计哲学。从这一讲开始，我们将深入数据结构这个话题。</p>
<p data-nodeid="3">数据结构是计算机中组织和存储数据的特定方式，它的目的是方便且高效地对数据进行访问和修改。数据结构体现了数据之间的关系，以及操作数据的一系列方法。数据又是程序的基本单元，因此无论哪种语言、哪种领域，都离不开数据结构；另一方面，数据结构是算法的基础，其本身也包含了算法的部分内容。也就是说，想要掌握算法，有一个坚固的数据结构基础是必要条件。</p>
<p data-nodeid="4">下面我们用 JavaScript 实现几个常见的数据结构。</p>
<h3 data-nodeid="5">数据结构介绍</h3>
<p data-nodeid="6">我通常将数据结构分为八大类。</p>
<ul data-nodeid="7">
<li data-nodeid="8">
<p data-nodeid="9">数组：Array</p>
</li>
<li data-nodeid="10">
<p data-nodeid="11">堆栈：Stack</p>
</li>
<li data-nodeid="12">
<p data-nodeid="13">队列：Queue</p>
</li>
<li data-nodeid="14">
<p data-nodeid="15">链表：Linked Lists</p>
</li>
<li data-nodeid="16">
<p data-nodeid="17">树：Trees</p>
</li>
<li data-nodeid="18">
<p data-nodeid="19">图：Graphs</p>
</li>
<li data-nodeid="20">
<p data-nodeid="21">字典树：Trie</p>
</li>
<li data-nodeid="22">
<p data-nodeid="23">散列表（哈希表）：Hash Tables</p>
</li>
</ul>
<p data-nodeid="24">我们可以先大体感知一下各种数据结构之间的关系：</p>
<ul data-nodeid="25">
<li data-nodeid="26">
<p data-nodeid="27">栈和队列是类似数组的结构，非常多的初级题目要求用数组实现栈和队列，它们在插入和删除的方式上和数组有所差异，但是实现还是非常简单的；</p>
</li>
<li data-nodeid="28">
<p data-nodeid="29">链表、树和图这种数据结构的特点是，其节点需要引用其他节点，因此在增/删时，需要注意对<strong data-nodeid="258">相关前驱和后继节点</strong>的影响；</p>
</li>
<li data-nodeid="30">
<p data-nodeid="31">可以从堆栈和队列出发，构建出链表；</p>
</li>
<li data-nodeid="32">
<p data-nodeid="33">树和图最为复杂，但它们本质上扩展了链表的概念；</p>
</li>
<li data-nodeid="34">
<p data-nodeid="35">散列表的关键是<strong data-nodeid="266">理解散列函数</strong>，明白依赖散列函数实现保存和定位数据的过程；</p>
</li>
<li data-nodeid="36">
<p data-nodeid="37">直观上认为，链表适合记录和存储数据；哈希表和字典树在检索数据以及搜索方面有更大的应用场景。</p>
</li>
</ul>
<p data-nodeid="38">以上这些“直观感性”的认知并不是“恒等式”，我们将在下面的学习中去印证这些“认知”，这两讲中，你将会看到熟悉的 React、Vue 框架的部分实现，将会看到典型的算法场景，也请你做好相关基础知识的储备。</p>
<h3 data-nodeid="39">堆栈和队列</h3>
<p data-nodeid="40">栈和队列是一种<strong data-nodeid="275">操作受限的线性结构</strong>，它们非常简单，虽然 JavaScript 并没有原生内置这样的数据结构，但是我们可以轻松地模拟出来。</p>
<p data-nodeid="41">栈的实现，后进先出 LIFO（Last in、First out）：</p>
<pre class="lang-java" data-nodeid="42"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Stack</span> </span>{
  constructor(...args) {
  	 <span class="hljs-comment">// 使用数组进行模拟</span>
    <span class="hljs-keyword">this</span>.stack = [...args]
  }
  push(...items) {
  	 <span class="hljs-comment">// 入栈</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.stack.push(... items)
  }
  pop() {
  	<span class="hljs-comment">// 出栈，从数组尾部弹出一项</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.stack.pop()
  }
  peek() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.isEmpty() 
        ? undefined
        : <span class="hljs-keyword">this</span>.stack[<span class="hljs-keyword">this</span>.size() - <span class="hljs-number">1</span>]
  }
  isEmpty() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.size() == <span class="hljs-number">0</span>
  }
  size() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.stack.length
  }
}
</code></pre>
<p data-nodeid="43">队列的实现，先进先出 FIFO（First in、First out），“比葫芦画瓢”即可：</p>
<pre class="lang-java" data-nodeid="44"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Queue</span> </span>{
  constructor(...args) {
  	 <span class="hljs-comment">// 使用数组进行模拟</span>
    <span class="hljs-keyword">this</span>.queue = [...args]
  }
  enqueue(...items) {
    <span class="hljs-comment">// 入队</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.queue.push(... items)
  }
  dequeue() {
    <span class="hljs-comment">// 出队</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.queue.shift()
  }
  front() { 
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.isEmpty()
        ? undefined
        : <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>]
  }
  back() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.isEmpty()
        ? undefined
        : <span class="hljs-keyword">this</span>.queue[<span class="hljs-keyword">this</span>.size() - <span class="hljs-number">1</span>]
  }
  isEmpty() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.size() == <span class="hljs-number">0</span>
  }
  size() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.queue.length
  }
}
</code></pre>
<p data-nodeid="45">我们可以看到不管是栈还是队列，都是用数组进行模拟的。数组是最基本的数据结构，但是它的价值是惊人的。我们会在下一讲，进一步介绍栈和队列的应用场景。</p>
<h3 data-nodeid="46">链表（单向链表和双向链表）</h3>
<p data-nodeid="47">堆栈和队列都可以利用数组实现，链表和数组一样，也实现了按照一定的顺序存储元素，不同的地方在于链表不能像数组一样通过下标访问，而是<strong data-nodeid="289">每一个元素都能够通过“指针”指向下一个元素</strong>。我们可以直观地得出结论：<strong data-nodeid="290">链表不需要一段连续的存储空间</strong>，“指向下一个元素”的方式能够更大限度地利用内存。</p>
<p data-nodeid="48">根据上述内容，我们可以总结出链表的优点在于：</p>
<ul data-nodeid="49">
<li data-nodeid="50">
<p data-nodeid="51">链表的插入和删除操作的时间复杂度是常数级的，我们只需要改变相关节点的指针指向即可；</p>
</li>
<li data-nodeid="52">
<p data-nodeid="53">链表可以像数组一样顺序访问，查找元素的时间复杂度是线性的。</p>
</li>
</ul>
<p data-nodeid="54">要想实现链表，我们需要先对链表进行分类，常见的有<strong data-nodeid="299">单链表和双向链表</strong>。</p>
<ul data-nodeid="2077">
<li data-nodeid="2078">
<p data-nodeid="2079">单链表：单链表是维护一系列节点的数据结构，其特点是：每个节点包含了数据，同时包含指向链表中下一个节点的指针。</p>
</li>
<li data-nodeid="2080">
<p data-nodeid="2081">双向链表：不同于单链表，双向链表特点：每个节点分支除了包含其数据以外，还包含了分别指向其前驱和后继节点的指针。</p>
</li>
<li data-nodeid="2082" class=""></li>
</ul>
<p data-nodeid="2971" class=""><img src="https://s0.lgstatic.com/i/image6/M01/04/F5/CioPOWAvYtuAEfl-AAIhGegvMJU666.png" alt="图片12.png" data-nodeid="2974"></p>



<p data-nodeid="61">首先，根据双向链表的特点，我们实现一个节点构造函数（节点类），如下代码：</p>
<pre class="lang-java" data-nodeid="62"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Node</span> </span>{
    constructor(data) {
        <span class="hljs-comment">// data 为当前节点储存的数据</span>
        <span class="hljs-keyword">this</span>.data = data
        <span class="hljs-comment">// next 指向下一个节点</span>
        <span class="hljs-keyword">this</span>.next = <span class="hljs-keyword">null</span>
        <span class="hljs-comment">// prev 指向前一个节点</span>
        <span class="hljs-keyword">this</span>.prev = <span class="hljs-keyword">null</span>
    }
}
</code></pre>
<p data-nodeid="63">有了节点类，我们来初步实现双向链表类，如下代码：</p>
<pre class="lang-java" data-nodeid="64"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DoublyLinkedList</span> </span>{
    constructor() {
        <span class="hljs-comment">// 双向链表开头</span>
        <span class="hljs-keyword">this</span>.head = <span class="hljs-keyword">null</span>
        <span class="hljs-comment">// 双向链表结尾</span>
      	 <span class="hljs-keyword">this</span>.tail = <span class="hljs-keyword">null</span>
    }
    <span class="hljs-comment">// ...</span>
}
</code></pre>
<p data-nodeid="65">接下来，需要实现双向链表原型上的一些方法，这些方法包括以下几种。</p>
<ul data-nodeid="66">
<li data-nodeid="67">
<p data-nodeid="68">add：在链表尾部添加一个新的节点，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="69"><code data-language="java">add(item) {
  <span class="hljs-comment">// 实例化一个节点</span>
  let node = <span class="hljs-keyword">new</span> Node(item)
  <span class="hljs-comment">// 如果当前链表还没有头</span>
  <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.head) {
    <span class="hljs-keyword">this</span>.head = node
    <span class="hljs-keyword">this</span>.tail = node
  }
  
  <span class="hljs-comment">// 如果当前链表已经有了头，只需要在尾部加上该节点</span>
  <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 把当前的尾部作为新节点的 prev</span>
    node.prev = <span class="hljs-keyword">this</span>.tail
    <span class="hljs-comment">// 把当前的尾部的 next 指向为新节点 node</span>
    <span class="hljs-keyword">this</span>.tail.next = node
    <span class="hljs-keyword">this</span>.tail = node
  }
}
</code></pre>
<ul data-nodeid="70">
<li data-nodeid="71">
<p data-nodeid="72">addAt：在链表指定位置添加一个新的节点，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="73"><code data-language="java">addAt(index, item) {
   let current = <span class="hljs-keyword">this</span>.head
   
   <span class="hljs-comment">// 维护查找时当前节点的索引</span>
   let counter = <span class="hljs-number">1</span>
   let node = <span class="hljs-keyword">new</span> Node(item)
   <span class="hljs-comment">// 如果在头部插入</span>
   <span class="hljs-keyword">if</span> (index === <span class="hljs-number">0</span>) {
     <span class="hljs-keyword">this</span>.head.prev = node
     node.next = <span class="hljs-keyword">this</span>.head
     <span class="hljs-keyword">this</span>.head = node
   } 
   
   <span class="hljs-comment">// 非头部插入，需要从头开始，找寻插入位置</span>
   <span class="hljs-keyword">else</span> {
     <span class="hljs-keyword">while</span>(current) {
      current = current.<span class="hljs-function">next
      <span class="hljs-title">if</span><span class="hljs-params">( counter === index)</span> </span>{
        node.prev = current.prev
        current.prev.next = node
        node.next = current
        current.prev = node
      }
      counter++
    }
  }
}
</code></pre>
<ul data-nodeid="74">
<li data-nodeid="75">
<p data-nodeid="76">remove：删除链表指定数据项节点，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="77"><code data-language="java">remove(item) {
  let current = <span class="hljs-keyword">this</span>.<span class="hljs-function">head
  <span class="hljs-title">while</span> <span class="hljs-params">(current)</span> </span>{
       <span class="hljs-comment">// 找到了目标节点</span>
    <span class="hljs-keyword">if</span> (current.data === item ) {
      <span class="hljs-comment">// 目标链表只有当前目标项，即目标节点即是链表头又是链表尾</span>
      <span class="hljs-keyword">if</span> (current == <span class="hljs-keyword">this</span>.head &amp;&amp; current == <span class="hljs-keyword">this</span>.tail) {
        <span class="hljs-keyword">this</span>.head = <span class="hljs-keyword">null</span>
        <span class="hljs-keyword">this</span>.tail = <span class="hljs-keyword">null</span>
      } 
      <span class="hljs-comment">// 目标节点为链表头</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (current == <span class="hljs-keyword">this</span>.head ) {
        <span class="hljs-keyword">this</span>.head = <span class="hljs-keyword">this</span>.head.next
        <span class="hljs-keyword">this</span>.head.prev = <span class="hljs-keyword">null</span>
      } 
      <span class="hljs-comment">// 目标节点为链表尾部</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (current == <span class="hljs-keyword">this</span>.tail ) {
        <span class="hljs-keyword">this</span>.tail = <span class="hljs-keyword">this</span>.tail.prev;
        <span class="hljs-keyword">this</span>.tail.next = <span class="hljs-keyword">null</span>;
      } 
      <span class="hljs-comment">// 目标节点在链表首尾之间，中部</span>
      <span class="hljs-keyword">else</span> {
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
   }
   current = current.next
  }
}
</code></pre>
<ul data-nodeid="78">
<li data-nodeid="79">
<p data-nodeid="80">removeAt：删除链表指定位置节点，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="81"><code data-language="java">removeAt(index) {
  <span class="hljs-comment">// 都是从“头”开始遍历</span>
  let current = <span class="hljs-keyword">this</span>.head
  let counter = <span class="hljs-number">1</span>
  <span class="hljs-comment">// 删除链表头部</span>
  <span class="hljs-keyword">if</span> (index === <span class="hljs-number">0</span> ) {
   <span class="hljs-keyword">this</span>.head = <span class="hljs-keyword">this</span>.head.next
   <span class="hljs-keyword">this</span>.head.prev = <span class="hljs-keyword">null</span>
  } 
  <span class="hljs-keyword">else</span> {
   <span class="hljs-keyword">while</span>(current) {
    current = current.next
    <span class="hljs-comment">// 如果目标节点在链表尾</span>
    <span class="hljs-keyword">if</span> (current == <span class="hljs-keyword">this</span>.tail) {
     <span class="hljs-keyword">this</span>.tail = <span class="hljs-keyword">this</span>.tail.prev
     <span class="hljs-keyword">this</span>.tail.next = <span class="hljs-keyword">null</span>
    } 
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (counter === index) {
     current.prev.next = current.next
     current.next.prev = current.prev
     <span class="hljs-keyword">break</span>
    }
    counter++
   }
  }
}
</code></pre>
<ul data-nodeid="82">
<li data-nodeid="83">
<p data-nodeid="84">reverse：翻转链表，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="85"><code data-language="java">reverse() {
  let current = <span class="hljs-keyword">this</span>.head
  let prev = <span class="hljs-function"><span class="hljs-keyword">null</span>
  <span class="hljs-title">while</span> <span class="hljs-params">(current)</span> </span>{
   let next = current.next
   <span class="hljs-comment">// 前后倒置</span>
   current.next = prev
   current.prev = next
   prev = current
   current = next
  }
  <span class="hljs-keyword">this</span>.tail = <span class="hljs-keyword">this</span>.head
  <span class="hljs-keyword">this</span>.head = prev
}
</code></pre>
<ul data-nodeid="86">
<li data-nodeid="87">
<p data-nodeid="88">swap：交换两个节点数据，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="89"><code data-language="java">swap(index1, index2) {
  <span class="hljs-comment">// 使 index1 始终小于 index2，方便后面查找交换</span>
  <span class="hljs-keyword">if</span> (index1 &gt; index2) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.swap(index2, index1)
  }
  let current = <span class="hljs-keyword">this</span>.head
  let counter = <span class="hljs-number">0</span>
  <span class="hljs-function">let firstNode
  <span class="hljs-title">while</span><span class="hljs-params">(current !== <span class="hljs-keyword">null</span>)</span> </span>{
    <span class="hljs-comment">// 找到第一个节点，先存起来</span>
    <span class="hljs-keyword">if</span> (counter === index1 ){
        firstNode = current
    } 
    <span class="hljs-comment">// 找到第二个节点，进行数据交换</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (counter === index2) {
      <span class="hljs-comment">// ES 提供了更为简洁的交换数据的方式，这里我们用传统方式实现，更为直观</span>
      let temp = current.data
      current.data = firstNode.data
      firstNode.data = temp
    }
    current = current.next
    counter++
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>
}
</code></pre>
<ul data-nodeid="90">
<li data-nodeid="91">
<p data-nodeid="92">isEmpty：查询链表是否为空，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="93"><code data-language="java">isEmpty() {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.length() &lt; <span class="hljs-number">1</span>
}
</code></pre>
<ul data-nodeid="94">
<li data-nodeid="95">
<p data-nodeid="96">length：查询链表长度，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="97"><code data-language="java">length() {
  let current = <span class="hljs-keyword">this</span>.head
  let counter = <span class="hljs-number">0</span>
  <span class="hljs-comment">// 完整遍历一遍链表</span>
  <span class="hljs-keyword">while</span>(current !== <span class="hljs-keyword">null</span>) {
    counter++
    current = current.next
  }
  <span class="hljs-keyword">return</span> counter
}
</code></pre>
<ul data-nodeid="98">
<li data-nodeid="99">
<p data-nodeid="100">traverse：遍历链表，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="101"><code data-language="java">traverse(fn) {
  let current = <span class="hljs-keyword">this</span>.<span class="hljs-function">head
  
  <span class="hljs-title">while</span><span class="hljs-params">(current !== <span class="hljs-keyword">null</span>)</span> </span>{
    <span class="hljs-comment">// 执行遍历时回调 </span>
    fn(current)
    current = current.next
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>
}
</code></pre>
<p data-nodeid="102">如上代码，有了上面 length 方法的遍历实现，traverse 也就不难理解了，它接受一个遍历执行函数，在 while 循环中进行调用。</p>
<ul data-nodeid="103">
<li data-nodeid="104">
<p data-nodeid="105">find：查找某个节点的索引，实现如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="106"><code data-language="java">find(item) {
  let current = <span class="hljs-keyword">this</span>.head
  let counter = <span class="hljs-number">0</span>
  <span class="hljs-keyword">while</span>( current ) {
    <span class="hljs-keyword">if</span>( current.data == item ) {
      <span class="hljs-keyword">return</span> counter
    }
    current = current.next
    counter++
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
}
</code></pre>
<p data-nodeid="107">至此，我们就实现了所有双向链表（DoublyLinkedList）的方法。仔细分析整个实现过程，你可以发现：双向链表的实现并不复杂，在手写过程中，需要开发者做到心中有“表”，考虑到当前节点的 next 和 prev 取值，逻辑上还是很简单的。</p>
<h3 data-nodeid="108">树</h3>
<p data-nodeid="109">前端开发者应该对树这个数据结构丝毫不陌生，不同于之前介绍的所有数据结构，<strong data-nodeid="334">树是非线性的</strong>。因为树决定了其存储的数据直接有明确的层级关系，因此对于维护具有层级特性的数据，树是一个天然良好的选择。</p>
<p data-nodeid="110">事实上，树有很多种分类，但是它们都具有以下特性：</p>
<ul data-nodeid="111">
<li data-nodeid="112">
<p data-nodeid="113">除了根节点以外，所有的节点都有一个父节点；</p>
</li>
<li data-nodeid="114">
<p data-nodeid="115">每一个节点都可以有若干子节点，如果没有子节点，则称此节点为叶子节点；</p>
</li>
<li data-nodeid="116">
<p data-nodeid="117">一个节点所拥有的叶子节点的个数，称之为该节点的度，因此叶子节点的度为 0；</p>
</li>
<li data-nodeid="118">
<p data-nodeid="119">所有节点中，最大的度为整棵树的度；</p>
</li>
<li data-nodeid="120">
<p data-nodeid="121">树的最大层次称为树的深度。</p>
</li>
</ul>
<p data-nodeid="122">我们这里对二叉搜索树展开分析。二叉树算是最基本的树，因为它的结构最简单，每个节点至多包含两个子节点。二叉树又非常有用，因为根据二叉树，我们可以延伸出二叉搜索树（BST）、平衡二叉搜索树（AVL）、红黑树（R/B Tree）等。</p>
<p data-nodeid="123">二叉搜索树有以下特性：</p>
<ul data-nodeid="124">
<li data-nodeid="125">
<p data-nodeid="126">左子树上所有结点的值均小于或等于它的根结点的值；</p>
</li>
<li data-nodeid="127">
<p data-nodeid="128">右子树上所有结点的值均大于或等于它的根结点的值；</p>
</li>
<li data-nodeid="129">
<p data-nodeid="130">左、右子树也分别为二叉搜索树。</p>
</li>
</ul>
<p data-nodeid="131">根据其特性，我们实现二叉搜索树还是应该先构造一个节点类，如下代码：</p>
<pre class="lang-java" data-nodeid="132"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Node</span> </span>{ 
  constructor(data) { 
    <span class="hljs-keyword">this</span>.left = <span class="hljs-keyword">null</span>
    <span class="hljs-keyword">this</span>.right = <span class="hljs-keyword">null</span>
    <span class="hljs-keyword">this</span>.value = data
  } 
} 
</code></pre>
<p data-nodeid="133">然后我们实现二叉搜索树的以下方法。</p>
<ul data-nodeid="134">
<li data-nodeid="135">
<p data-nodeid="136">insertNode：根据一个父节点，插入一个子节点，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="137"><code data-language="java">insertNode(root, newNode) {
  <span class="hljs-comment">// 根据待插入节点的值的大小，递归调用 this.insertNode</span>
  <span class="hljs-keyword">if</span> (newNode.value &lt; root.value) {
    (!root.left) ? root.left = newNode : <span class="hljs-keyword">this</span>.insertNode(root.left, newNode)
  } <span class="hljs-keyword">else</span> {
    (!root.right) ? root.right = newNode : <span class="hljs-keyword">this</span>.insertNode(root.right, newNode)
  }
}
</code></pre>
<ul data-nodeid="138">
<li data-nodeid="139">
<p data-nodeid="140">insert：插入一个新节点，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="141"><code data-language="java">insert(value) {
    let newNode = <span class="hljs-keyword">new</span> Node(value)
    <span class="hljs-comment">// 判读是否是根节点</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.root) {
      <span class="hljs-keyword">this</span>.root = newNode
    } <span class="hljs-keyword">else</span> {
    	<span class="hljs-comment">// 不是根结点，则直接调用 this.insertNode 方法</span>
      <span class="hljs-keyword">this</span>.insertNode(<span class="hljs-keyword">this</span>.root, newNode)
    }
}
</code></pre>
<p data-nodeid="142">理解这两个方法是理解二叉搜索树的关键，如果你理解了这两个方法，下面的其他方法也就“不在话下”。</p>
<p data-nodeid="143">我们可以看到，insertNode 方法先判断目标父节点和插入节点的值，如果插入节点的值更小，则考虑放到父节点的左边，接着递归调用 this.insertNode(root.left, newNode)；如果插入节点的值更大，以此类推即可。insert 方法只是多了一步构造 Node 节点实例，接下来区分有无父节点的情况，调用 this.insertNode 方法即可。</p>
<ul data-nodeid="144">
<li data-nodeid="145">
<p data-nodeid="146">removeNode：根据一个父节点，移除一个子节点，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="147"><code data-language="java">removeNode(root, value) {
    <span class="hljs-keyword">if</span> (!root) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>
    }
    <span class="hljs-keyword">if</span> (value &lt; root.value) {
      root.left = <span class="hljs-keyword">this</span>.removeNode(root.left, value)
      <span class="hljs-keyword">return</span> root
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (value &gt; root.value) {
      root.right = tis.removeNode(root.right, value)
      <span class="hljs-keyword">return</span> root
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 找到了需要删除的节点 </span>
      <span class="hljs-comment">// 如果当前 root 节点无左右子节点</span>
      <span class="hljs-keyword">if</span> (!root.left &amp;&amp; !root.right) {
        root = <span class="hljs-keyword">null</span>
        <span class="hljs-keyword">return</span> root
      }
      <span class="hljs-comment">// 只有左节点</span>
      <span class="hljs-keyword">if</span> (root.left &amp;&amp; !root.right) {
        root = root.left
        <span class="hljs-keyword">return</span> root
      } 
      <span class="hljs-comment">// 只有右节点</span>
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (root.right) {
        root = root.right
        <span class="hljs-keyword">return</span> root
      }
      <span class="hljs-comment">// 有左右两个子节点</span>
      let minRight = <span class="hljs-keyword">this</span>.findMinNode(root.right)
      root.value = minRight.value
      root.right = <span class="hljs-keyword">this</span>.removeNode(root.right, minRight.value)
      <span class="hljs-keyword">return</span> root
    }
  }
</code></pre>
<ul data-nodeid="148">
<li data-nodeid="149">
<p data-nodeid="150">remove：移除一个节点，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="151"><code data-language="java">remove(value) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.root) {
      <span class="hljs-keyword">this</span>.removeNode(<span class="hljs-keyword">this</span>.root, value)
    }
}
<span class="hljs-comment">// 找到最小的节点</span>
<span class="hljs-comment">// 该方法不断递归，直到找到最左叶子节点即可</span>
findMinNode(root) {
    <span class="hljs-keyword">if</span> (!root.left) {
      <span class="hljs-keyword">return</span> root
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.findMinNode(root.left)
    }
}
</code></pre>
<p data-nodeid="152">上述代码不难理解，唯一需要说明的是：当需要删除的节点含有左右两个子节点时，因为我们要把当前节点删除，就需要找到合适的“补位”节点，<strong data-nodeid="359">这个“补位”节点一定在该目标节点的右侧树当中</strong>，因为这样才能保证“补位”节点的值一定大于该目标节点的左侧树所有节点，而该目标节点的左侧树不需要调整；同时为了保证“补位”节点的值一定要小于该目标节点的右侧树值，因此要找的“补位”节点其实就是该目标节点的右侧树当中最小的那个节点。</p>
<ul data-nodeid="153">
<li data-nodeid="154">
<p data-nodeid="155">searchNode：根据一个父节点，查找子节点，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="156"><code data-language="java">searchNode(root, value) {
    <span class="hljs-keyword">if</span> (!root) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>
    }
    <span class="hljs-keyword">if</span> (value &lt; root.value) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.searchNode(root.left, value)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (value &gt; root.value) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.searchNode(root.right, value)
    }
    <span class="hljs-keyword">return</span> root
}
</code></pre>
<ul data-nodeid="157">
<li data-nodeid="158">
<p data-nodeid="159">search：查找节点，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="160"><code data-language="java">search(value) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.root) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
    }
    <span class="hljs-keyword">return</span> Boolean(<span class="hljs-keyword">this</span>.searchNode(<span class="hljs-keyword">this</span>.root, value))
}
</code></pre>
<ul data-nodeid="161">
<li data-nodeid="162">
<p data-nodeid="163">preOrder：前序遍历，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="164"><code data-language="java">preOrder(root) {
    <span class="hljs-keyword">if</span> (root) {
      console.log(root.value)
      <span class="hljs-keyword">this</span>.preOrder(root.left)
      <span class="hljs-keyword">this</span>.preOrder(root.right)
    }
}
</code></pre>
<ul data-nodeid="165">
<li data-nodeid="166">
<p data-nodeid="167">InOrder：中序遍历，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="168"><code data-language="java">inOrder(root) {
    <span class="hljs-keyword">if</span> (root) {
      <span class="hljs-keyword">this</span>.inOrder(root.left)
      console.log(root.value)
      <span class="hljs-keyword">this</span>.inOrder(root.right)
    }
}
</code></pre>
<ul data-nodeid="169">
<li data-nodeid="170">
<p data-nodeid="171">PostOrder：后续遍历，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="172"><code data-language="java">postOrder(root) {
    <span class="hljs-keyword">if</span> (root) {
      <span class="hljs-keyword">this</span>.postOrder(root.left)
      <span class="hljs-keyword">this</span>.postOrder(root.right)
      console.log(root.value)
    }
}
</code></pre>
<p data-nodeid="173">上述前、中、后序遍历的区别其实就在于<strong data-nodeid="370">console.log(root.value) 方法执行的位置</strong>。</p>
<h3 data-nodeid="174">图</h3>
<p data-nodeid="175">图是由具有边的节点集合组成的数据结构，图可以是定向的或不定向的。图也是应用最广泛的数据结构之一，真实场景中处处有图。当然更多概念还是需要你先进行了解，尤其是图的几种基本元素。</p>
<ul data-nodeid="176">
<li data-nodeid="177">
<p data-nodeid="178">节点：Node</p>
</li>
<li data-nodeid="179">
<p data-nodeid="180">边：Edge</p>
</li>
<li data-nodeid="181">
<p data-nodeid="182">|V|：图中顶点（节点）的总数</p>
</li>
<li data-nodeid="183">
<p data-nodeid="184">|E|：图中的连接总数（边）</p>
</li>
</ul>
<p data-nodeid="185">这里我们主要实现一个有向图，Graph 类，如下代码：</p>
<pre class="lang-java" data-nodeid="186"><code data-language="java"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Graph</span> </span>{
  constructor() {
  	 <span class="hljs-comment">// 使用 Map 数据结构表述图中顶点关系</span>
    <span class="hljs-keyword">this</span>.AdjList = <span class="hljs-keyword">new</span> Map()
  }
}
</code></pre>
<p data-nodeid="187">我们先通过创建节点，来创建一个图，如下代码：</p>
<pre class="lang-java" data-nodeid="188"><code data-language="java">let graph = <span class="hljs-keyword">new</span> Graph();
graph.addVertex(<span class="hljs-string">'A'</span>)
graph.addVertex(<span class="hljs-string">'B'</span>)
graph.addVertex(<span class="hljs-string">'C'</span>)
graph.addVertex(<span class="hljs-string">'D'</span>)
</code></pre>
<ul data-nodeid="189">
<li data-nodeid="190">
<p data-nodeid="191">添加顶点：addVertex，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="192"><code data-language="java">addVertex(vertex) {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.AdjList.has(vertex)) {
    <span class="hljs-keyword">this</span>.AdjList.set(vertex, [])
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-string">'vertex already exist!'</span>
  }
}
</code></pre>
<p data-nodeid="193">这时候，A、B、C、D 顶点都对应一个数组，如下代码所示：</p>
<pre class="lang-java" data-nodeid="194"><code data-language="java">  <span class="hljs-string">'A'</span> =&gt; [],
  <span class="hljs-string">'B'</span> =&gt; [],
  <span class="hljs-string">'C'</span> =&gt; [],
  <span class="hljs-string">'D'</span> =&gt; []
</code></pre>
<p data-nodeid="195">数组将用来存储边。我们设计图预计得到如下关系：</p>
<pre class="lang-java" data-nodeid="196"><code data-language="java">Map {
  <span class="hljs-string">'A'</span> =&gt; [<span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>, <span class="hljs-string">'D'</span>],
  <span class="hljs-string">'B'</span> =&gt; [],
  <span class="hljs-string">'C'</span> =&gt; [<span class="hljs-string">'B'</span>],
  <span class="hljs-string">'D'</span> =&gt; [<span class="hljs-string">'C'</span>]
}
</code></pre>
<p data-nodeid="197">根据以上描述，其实已经可以把图画出来了。addEdge 需要两个参数：一个是顶点，一个是连接对象 Node。我们看看添加边是如何实现的。</p>
<ul data-nodeid="198">
<li data-nodeid="199">
<p data-nodeid="200">添加边：addEdge，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="201"><code data-language="java"> addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if (this.AdjList.has(node)){
        let arr = this.AdjList.get(vertex)
        if (!arr.includes(node)){
          arr.push(node)
        }
      } else {
        throw `Can't add non-existing vertex -&gt;'${node}'`
      }
    } else {
      throw `You should add '${vertex}' first`
    }
}
</code></pre>
<p data-nodeid="202">理清楚数据关系，我们就可以打印图了，其实就是一个很简单的 for…of 循环：</p>
<ul data-nodeid="203">
<li data-nodeid="204">
<p data-nodeid="205">打印图：print，如下代码：</p>
</li>
</ul>
<pre class="lang-java" data-nodeid="206"><code data-language="java">print() {
  <span class="hljs-comment">// 使用 for of 遍历并打印 this.AdjList</span>
  <span class="hljs-keyword">for</span> (let [key, value] of <span class="hljs-keyword">this</span>.AdjList) {
    console.log(key, value)
  }
}
</code></pre>
<p data-nodeid="207">剩下的内容就是遍历图了。遍历分为广度优先算法（BFS）和深度优先搜索算法（DFS）。我们先来看下广度优先算法（BFS）。</p>
<p data-nodeid="208">广度优先算法遍历，如下代码：</p>
<pre class="lang-java" data-nodeid="209"><code data-language="java">createVisitedObject() {
  let map = {}
  <span class="hljs-keyword">for</span> (let key of <span class="hljs-keyword">this</span>.AdjList.keys()) {
    arr[key] = <span class="hljs-keyword">false</span>
  }
  <span class="hljs-keyword">return</span> map
}
bfs (initialNode) {
  <span class="hljs-comment">// 创建一个已访问节点的 map</span>
  let visited = <span class="hljs-keyword">this</span>.createVisitedObject()
  <span class="hljs-comment">// 模拟一个队列</span>
  let queue = []
  <span class="hljs-comment">// 第一个节点已访问</span>
  visited[initialNode] = <span class="hljs-keyword">true</span>
  <span class="hljs-comment">// 第一个节点入队列</span>
  queue.push(initialNode)
  <span class="hljs-keyword">while</span> (queue.length) {
    let current = queue.shift()
    console.log(current)
     <span class="hljs-comment">// 获得该节点的其他节点关系</span>
    let arr = <span class="hljs-keyword">this</span>.AdjList.get(current)
    <span class="hljs-keyword">for</span> (let elem of arr) {
      <span class="hljs-comment">// 如果当前节点没有访问过</span>
      <span class="hljs-keyword">if</span> (!visited[elem]) {
        visited[elem] = <span class="hljs-keyword">true</span>
        queue.push(elem)
      }
    }
  }
}
</code></pre>
<p data-nodeid="210">如上代码所示，我们来进行简单总结。广度优先算法（BFS），是一种<strong data-nodeid="393">利用队列实现的搜索算法</strong>。对于图来说，就是从起点出发，对于每次出队列的点，都要遍历其四周的点。</p>
<p data-nodeid="211">因此 BFS 的实现步骤：</p>
<ul data-nodeid="212">
<li data-nodeid="213">
<p data-nodeid="214">起始节点作为起始，并初始化一个空对象——visited；</p>
</li>
<li data-nodeid="215">
<p data-nodeid="216">初始化一个空数组，该数组将模拟一个队列；</p>
</li>
<li data-nodeid="217">
<p data-nodeid="218">将起始节点标记为已访问；</p>
</li>
<li data-nodeid="219">
<p data-nodeid="220">将起始节点放入队列中；</p>
</li>
<li data-nodeid="221">
<p data-nodeid="222">循环直到队列为空。</p>
</li>
</ul>
<p data-nodeid="223">深度优先算法，如下代码：</p>
<pre class="lang-java" data-nodeid="224"><code data-language="java">createVisitedObject() {
  let map = {}
  <span class="hljs-keyword">for</span> (let key of <span class="hljs-keyword">this</span>.AdjList.keys()) {
    arr[key] = <span class="hljs-keyword">false</span>
  }
  <span class="hljs-keyword">return</span> map
}
 <span class="hljs-comment">// 深度优先算法</span>
 dfs(initialNode) {
    let visited = <span class="hljs-keyword">this</span>.createVisitedObject()
    <span class="hljs-keyword">this</span>.dfsHelper(initialNode, visited)
  }
  dfsHelper(node, visited) {
    visited[node] = <span class="hljs-keyword">true</span>
    console.log(node)
    let arr = <span class="hljs-keyword">this</span>.AdjList.get(node)
    <span class="hljs-comment">// 遍历节点调用 this.dfsHelper</span>
    <span class="hljs-keyword">for</span> (let elem of arr) {
      <span class="hljs-keyword">if</span> (!visited[elem]) {
        <span class="hljs-keyword">this</span>.dfsHelper(elem, visited)
      }
    }
  }
}
</code></pre>
<p data-nodeid="225">如上代码，对于深度优先搜索算法（DFS），我把它总结为：“不撞南墙不回头”，从起点出发，先把一个方向的点都遍历完才会改变方向。换成程序语言就是：“<strong data-nodeid="406">DFS 是利用递归实现的搜索算法</strong>”。因此 DFS 的实现过程：</p>
<ul data-nodeid="226">
<li data-nodeid="227">
<p data-nodeid="228">起始节点作为起始，创建访问对象；</p>
</li>
<li data-nodeid="229">
<p data-nodeid="230">调用辅助函数递归起始节点。</p>
</li>
</ul>
<p data-nodeid="231">BFS 的实现重点在于队列，而 DFS 的重点在于递归，这是它们的本质区别。</p>
<h3 data-nodeid="232">总结</h3>
<p data-nodeid="233">这一讲我们介绍了和前端最为贴合的几种数据结构，事实上数据结构更重要的是应用，我希望你能够做到：在需要的场景，能够想到最为适合的数据结构处理问题。请你务必掌握好这些内容，接下来的几讲都需要对数据结构有一个较为熟练的掌握和了解。我们马上进入数据结构的应用学习。</p>
<p data-nodeid="234">本讲内容总结如下：</p>
<p data-nodeid="3789" class="te-preview-highlight"><img src="https://s0.lgstatic.com/i/image6/M00/04/F5/CioPOWAvYweAUX2mAAHhvq_M9XU847.png" alt="如何利用 JavaScript 实现经典数据结构？.png" data-nodeid="3792"></p>

<p data-nodeid="236">随着需求的复杂度上升，前端工程师越来越离不开数据结构。是否能够掌握这个难点内容，将是进阶的重要考量。下一讲，我们将解析数据结构在前端中的具体应用场景，来帮助你加深理解，做到灵活应用。</p>

---

### 精选评论

##### **宇：
> bfs dfs其实就是层序遍历和前序遍历，树是一种特殊的有向图

##### *聪：
> 【createVisitedObject() { let map = {} for (let key of this.AdjList.keys()) { arr[key] = false } return map}】-------这里arr[key] = false，应是 map[key] = false ？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 是，这里是个 typo

##### *聪：
> 老师，文中【这个“补位”节点一定在该目标节点的右侧树当中】是不是不一定？既然可以选右侧最小的节点，那我要选左侧最大的节点也行吧？

 ###### &nbsp;&nbsp;&nbsp; 讲师回复：
> &nbsp;&nbsp;&nbsp; 右侧 > 左侧

