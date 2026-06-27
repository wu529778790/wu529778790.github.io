import{_ as e,o,c as t,a2 as a}from"./chunks/framework.m9rfQn3T.js";const h=JSON.parse('{"title":"ES6常用基础集合","description":"","frontmatter":{"title":"ES6常用基础集合","date":"2017-06-06T16:06:21.000Z","permalink":"/pages/48ca67/","categories":["hexo迁移数据"],"author":{"name":"神族九帝","link":"https://github.com/wu529778790","permalink":null,"categories":null},"sidebar":"auto","tags":[null]},"headers":[],"relativePath":"20.笔记/1000.hexo迁移数据/ES6常用基础集合.md","filePath":"20.笔记/1000.hexo迁移数据/ES6常用基础集合.md","lastUpdated":1782538095000}'),r={name:"20.笔记/1000.hexo迁移数据/ES6常用基础集合.md"};function s(p,n,c,l,i,d){return o(),t("div",null,[...n[0]||(n[0]=[a(`<p>ES6 彻底改变了前端的编码风格，可以说对于前端的影响非常巨大。</p><blockquote><p>在学习之前，推荐大家使用 babel 官方提供的在线编译工具，编写自己的 demo，会在右侧实时显示出编译之后的代码，以供参考学习 <a href="http://babeljs.io/repl/" target="_blank" rel="noreferrer">http://babeljs.io/repl/</a></p></blockquote><p>&lt;!--more--&gt;</p><h2 id="新的变量声明方式-let-const" tabindex="-1">新的变量声明方式 let/const <a class="header-anchor" href="#新的变量声明方式-let-const" aria-label="Permalink to &quot;新的变量声明方式 let/const&quot;">​</a></h2><p>与 var 不同，新的变量声明方式带来了一些不一样的特性，其中最重要的两个特性就是提供了块级作用域与不再具备变量提升。</p><p>通过 2 个简单的例子来说明这两点。</p><pre><code>{
    let a = 20;
}

console.log(a);  // a is not defined
</code></pre><p>而这个简单的例子，会被编译为：</p><pre><code>{
    let _a = 20;
}

console.log(a);  // a is not defined


// ES5
console.log(a);   // undefined
var a = 20;

// ES6
console.log(a); // a is not defined
let a = 20;
</code></pre><p>当然，如果你的代码编译成为了 ES5 之后，仍然会存在变量提升，因此这一点只需要我们记住即可。我们在实际使用中，也需要尽量避免使用变量提升的特性带来的负面影响。对于变量提升的滥用，只存在与面试题中。</p><p>使用 ES6，我们需要全面使用 let/const 替换 var，那么什么时候用 let，什么时候用 const 就成为了一个大家要熟练区分的一个知识点。</p><h3 id="我们常常使用-let-来声明一个值会被改变的变量-而使用-const-来声明一个值不会被改变的变量" tabindex="-1">我们常常使用 let 来声明一个值会被改变的变量，而使用 const 来声明一个值不会被改变的变量 <a class="header-anchor" href="#我们常常使用-let-来声明一个值会被改变的变量-而使用-const-来声明一个值不会被改变的变量" aria-label="Permalink to &quot;我们常常使用 let 来声明一个值会被改变的变量，而使用 const 来声明一个值不会被改变的变量&quot;">​</a></h3><p>当值为基础数据类型时，那么这里的值，就是指值本身。 而当值对应的为引用数据类型时，那么我这里说的值，则表示指向该对象的引用。这里需要注意，正因为该值为一个引用，重要保证引用不变就可以，我们仍然可以改变该引用所指向的对象。</p><p>当我们试图改变 const 声明的变量时，则会报错:</p><pre><code>let a = null;
a = 20;


const obDev = {
    a: 20,
    b: 30
}


obDev.a = 30;

console.log(obDev); // Object {a: 30, b: 30}


const fn = function() {}
const a = obDev.a;
... ...
</code></pre><p>只要抓住上面我说的特性，那么在使用 let/const 时就会显得游刃有余。 根据我自己的经验，使用 const 的场景要比使用 let 的场景多很多。</p><h2 id="箭头函数的使用" tabindex="-1">箭头函数的使用 <a class="header-anchor" href="#箭头函数的使用" aria-label="Permalink to &quot;箭头函数的使用&quot;">​</a></h2><p>之前我说 ES6 颠覆了 js 的编码习惯，箭头函数的使用占了很大一部分。</p><p>首先是写法上的不同:</p><pre><code>// es5
var fn = function(a, b) {
    return a + b;
}

// es6 箭头函数写法，当函数直接被return时
const fn = (a, b) =&gt; a + b;

// es5
var foo = function() {
    var a = 20；
    var b = 30;
    return a + b;
}

// es6
const foo = () =&gt; {
   const a = 20;
   const b = 30;
   return a + b;
}
</code></pre><blockquote><p>箭头函数可以替换函数表达式，但是不能替换函数声明</p></blockquote><p>其次还有一个至关重要的一点，那就是箭头函数中，没有 this。如果你在箭头函数中使用了 this，那么该 this 一定就是外层的 this。</p><p>也正是因为箭头函数中没有 this，因此我们也就无从谈起用 call/apply/bind 来改变 this 指向。记住这个特性，能让你在 react 组件之间传值时少走无数弯路。</p><pre><code>var person = {
    name: &#39;tom&#39;,
    getName: function() {
        return this.name;
    }
}

// 我们试图用ES6的写法来重构上面的对象
const person = {
    name: &#39;tom&#39;,
    getName: () =&gt; this.name
}

// 但是编译结果却是
var person = {
    name: &#39;tom&#39;,
    getName: function getName() {
        return undefined.name;
    }
};
</code></pre><p>在 ES6 中，会默认采用严格模式，因此 this 也不会自动指向 window 对象了，而箭头函数本身并没有 this，因此 this 就只能是 undefined，这一点，在使用的时候，一定要慎重慎重再慎重，不然踩了坑你都不知道自己错在哪！这种情况，如果你还想用 this，就不用使用箭头函数的写法。</p><pre><code>// 可以稍做改动
const person = {
    name: &#39;tom&#39;,
    getName: function() {
        return setTimeout(() =&gt; this.name, 1000);
    }
}

// 编译之后变成
var person = {
    name: &#39;tom&#39;,
    getName: function getName() {
        var _this = this;  // 使用了我们在es5时常用的方式保存this引用

        return setTimeout(function () {
            return _this.name;
        }, 1000);
    }
};
</code></pre><p>先记住箭头函数的写法，并留意箭头函数中关于 this 的特殊性，更过实践与注意事项我们在封装 react 组件时再慢慢来感受</p><h2 id="模板字符串" tabindex="-1">模板字符串 <a class="header-anchor" href="#模板字符串" aria-label="Permalink to &quot;模板字符串&quot;">​</a></h2><p>模板字符串是为了解决使用+号拼接字符串的不便利而出现的。它的功能非常强大，但是我们大多数时候使用它则非常简单。看一个例子大家就明白怎么使用了。</p><pre><code>// es6
const a = 20;
const b = 30;
const string = \`\${a}+\${b}=\${a+b}\`;

// es5
var a = 20;
var b = 30;
var string = a + &quot;+&quot; + b + &quot;=&quot; + (a + b);
</code></pre><p>使用 整个字符串包裹起来，而在其中使用 \${} 来包裹一个变量或者一个表达式。</p><p>当然模板字符串还支持换行等强大的功能，更多的大家可通过参考资料进一步学习</p><h2 id="解析结构" tabindex="-1">解析结构 <a class="header-anchor" href="#解析结构" aria-label="Permalink to &quot;解析结构&quot;">​</a></h2><p>解析结构是一种全新的写法，我们只需要使用一个例子，大家就能够明白解析结构到底是怎么一回事儿。</p><pre><code>// 首先有这么一个对象
const props = {
    className: &#39;tiger-button&#39;,
    loading: false,
    clicked: true,
    disabled: &#39;disabled&#39;
}
</code></pre><p>当我们想要取得其中的 2 个值：loading 与 clicked 时：</p><pre><code>// es5
var loading = props.loading;
var clicked = props.clicked;

// es6
const { loading, clicked } = props;

// 给一个默认值，当props对象中找不到loading时，loading就等于该默认值
const { loading = false, clicked } = props;
</code></pre><p>是不是简单了许多？正是由于解析结构大大减少了代码量，因此它大受欢迎，在很多代码中它的影子随处可见。</p><pre><code>// 比如
// section1
import React, { Component } from &#39;react&#39;;

// section2
export { default } from &#39;./Button&#39;;

// section3
const { click, loading } = this.props;
const { isCheck } = this.state;

// more  任何获取对象属性值的场景都可以使用解析结构来减少我们的代码量
</code></pre><p>另外，数组也有属于自己的解析结构。</p><pre><code>// es6
const arr = [1, 2, 3];
const [a, b, c] = arr;

// es5
var arr = [1, 2, 3];
var a = arr[0];
var b = arr[1];
var c = arr[2];
</code></pre><p>数组以序列号一一对应，这是一个有序的对应关系。 而对象根据属性名一一对应，这是一个无序的对应关系。 根据这个特性，使用解析结构从对象中获取属性值更加具有可用性。</p><h2 id="函数默认参数" tabindex="-1">函数默认参数 <a class="header-anchor" href="#函数默认参数" aria-label="Permalink to &quot;函数默认参数&quot;">​</a></h2><p>之前我们不能直接为函数指定默认参数，因此很多时候为了保证传入的参数具备一个默认值，我们常常使用如下的方法：</p><pre><code>function add(x, y) {
    var x = x || 20;
    var y = y || 30;
    return x + y;
}

console.log(add()); // 50
</code></pre><p>这种方式并不是没有缺点，比如当我传入一个 x 值为 false，这个时候任然会取到默认值，就不是我们的本意了。</p><p>来看看 ES6 的默认值写法：</p><pre><code>function add(x = 20, y = 30) {
    return x + y;
}

console.log(add());
</code></pre><p>在实际开发中给参数添加适当的默认值，可以让我们堆函数的参数类型有一个直观的认知</p><p>const ButtonGroupProps = { size: &#39;normal&#39;, className: &#39;xxxx-button-group&#39;, borderColor: &#39;#333&#39; }</p><p>export default function ButtonGroup(props = ButtonGroupProps) { ... ... }</p><h2 id="展开运算符" tabindex="-1">展开运算符 <a class="header-anchor" href="#展开运算符" aria-label="Permalink to &quot;展开运算符&quot;">​</a></h2><p>在 ES6 中用...来表示展开运算符，它可以将数组方法或者对象进行展开。先来看一个例子它是如何使用的。</p><pre><code>const arr1 = [1, 2, 3];
const arr2 = [...arr1, 10, 20, 30];

// 这样，arr2 就变成了[1, 2, 3, 10, 20, 30];
</code></pre><p>当然，展开对象数据也是可以得到类似的结果</p><pre><code>const obj1 = {
  a: 1,
  b: 2,
  c: 3
}

const obj2 = {
  ...obj1,
  d: 4,
  e: 5,
  f: 6
}

// 结果类似于 const obj2 = Object.assign({}, obj1, {d: 4})
</code></pre><p>展开运算符还常常运用在解析结构之中，例如我们在 Raect 封装组件的时候常常不确定 props 到底还有多少数据会传进来，就会利用展开运算符来处理剩余的数据。</p><pre><code>// 这种方式在react中十分常用
const props = {
  size: 1,
  src: &#39;xxxx&#39;,
  mode: &#39;si&#39;
}


const { size, ...others } = props;

console.log(others)

// 然后再利用暂开运算符传递给下一个元素，再以后封装react组件时会大量使用到这种方式，正在学习react的同学一定要搞懂这种使用方式
&lt;button&gt;&lt;/button&gt;
</code></pre><p>展开运算符还用在函数的参数中，来表示函数的不定参。只有放在最后才能作为函数的不定参，否则会报错。</p><pre><code>// 所有参数之和
const add = (a, b, ...more) =&gt; {
    return more.reduce((m, n) =&gt; m + n) + a + b
}

console.log(add(1, 23, 1, 2, 3, 4, 5)) // 39
</code></pre><p>展开运算符的运用可以大大提高我们的代码效率，但是在刚开始使用的时候比较绕脑，掌握好了用起来还是非常爽的，记住这些使用场景，平时在用的时候可以刻意多运用就行了。</p><p>更多信息参考阮一峰老师的入门教程：<a href="http://es6.ruanyifeng.com/" target="_blank" rel="noreferrer">http://es6.ruanyifeng.com/</a></p>`,62)])])}const b=e(r,[["render",s]]);export{h as __pageData,b as default};
