(window.webpackJsonp=window.webpackJsonp||[]).push([[277],{609:function(n,e,t){"use strict";t.r(e);var o=t(4),r=Object(o.a)({},(function(){var n=this,e=n._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("p",[n._v("刚开始用 vue 或者 react，很多时候我们都会把 ES6 这个大兄弟加入我们的技术栈中。但是 ES6 那么多那么多特性，我们需要全部都掌握吗？秉着二八原则，掌握好常用的，有用的这个可以让我们快速起飞。")]),n._v(" "),e("h2",{attrs:{id:"变量声明-const-和-let"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#变量声明-const-和-let"}},[n._v("#")]),n._v(" 变量声明 const 和 let")]),n._v(" "),e("p",[n._v("我们都是知道在 es6 之前，var 关键字声明变量。无论生命在何处，都会被视为声明在函数的最顶部(不在函数内即在全局作用域的最顶部)。这就是函数变量提升。例如：\nfunction aa() {\nif(bool) {\nvar test = 'hello man'\n}else {\nconsole.log(test)\n}\n}")]),n._v(" "),e("p",[n._v("以上的代码实际是："),e("br"),n._v("\nfunction aa() {\nvar test //变量提升\nif(bool) {\ntest = 'hello man'\n}else {\n//此处访问 test 值为 undefined\nconsole.log(test)\n}\n//此处访问 test 值为 undefined\n}"),e("br"),n._v("\n所以不用关心 bool 是否为 true or false。实际上，无论如何 test 都会被创建声明。"),e("br"),n._v("\n接下来 es6 主角登场："),e("br"),n._v("\n我们通常用 let 和 const 来声明，let 表示变量、const 表示常量。let 和 cosnt 都是块级作用域。怎么理解这个块级作用域？")]),n._v(" "),e("ul",[e("li",[n._v("在一个函数内部")]),n._v(" "),e("li",[n._v("在一个代码块内部"),e("br"),n._v("\n说白了{}大括号内的代码块即为 let 和 const 的作用域。"),e("br"),n._v("\n看一下代码："),e("br"),n._v("\nfunction aa() {\nif(bool) {\nlet test = 'hello man'\n}else {\n//test 在此处访问不到\nconsole.log(test)\n}\n}"),e("br"),n._v("\nlet 的作用域是在它所在当前代码块，但不会被提升到当前函数的最顶部。"),e("br"),n._v("\n再来说说 const。"),e("br"),n._v("\nconst name = 'lux'\nname = 'joe' //再次赋值时会报错"),e("br"),n._v("\n说一道面试题"),e("br"),n._v("\nvar funcs = []\nfor (var i = 0;i < 10;i++) {\nfuncs.push(function () {\nconsole.log(i)\n})\n}\nfuncs.forEach(function(func) {\nfunc()\n})"),e("br"),n._v("\n这样的面试题非常常见，很多同学一看就知道输出 10 十次"),e("br"),n._v("\n但是如果我们想依次输出 0 到 9 呢？两种解决办法。直接上代码。"),e("br"),n._v("\n//es5 告诉我们可以利用闭包解决这个问题\nvar funcs = []\nfor (var i = 0; i < 10;i++) {\nfuncs.push((function(value) {\nreturn function() {\nconsole.log(value)\n}\n}(i))\n}\n// es6"),e("br"),n._v("\nfor (let i = 0; i < 10; i++) {\nfuncs.push(function() {\nconsole.log(i)\n})\n}"),e("br"),n._v("\n达到相同的效果，es6 简洁。")])]),n._v(" "),e("h2",{attrs:{id:"模板字符串"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#模板字符串"}},[n._v("#")]),n._v(" 模板字符串")]),n._v(" "),e("p",[n._v("es6 模板字符串简直就是开发者的福音啊，解决了 es5 在字符串功能上的痛点。"),e("br"),n._v("\n第一个用途，基本的字符串格式化。将表达式嵌入字符串中进行拼接。用${}来界定。\n//es5\nvar name = 'lux'\nconsole.log('hello' + name)\n//es6\nconst name = 'lux'\nconsole.log("),e("code",[n._v("hello ${name}")]),n._v(") //hello lux"),e("br"),n._v('\n第二个用途，在 es5 时我们通过反斜杠()来做多行字符串或者字符串一行行拼接。es6 反引号(``)直接搞定。\n//es5\nvar msg = "Hi '),e("br"),n._v('\nman!\n"\n//es6\nconst template = '),e("code",[n._v("<div> <span>hello world</span> </div>")]),e("br"),n._v("\n对于字符串 es6 当然也提供了很多厉害的方法。说几个常用的。\n//1.includes: 判断是否包含后直接返回布尔值"),e("br"),n._v("\nlet str = 'hahay'\nconsole.log(str.includes('y')) //true\n//2.repeat: 获取字符串重复 n 次"),e("br"),n._v("\nlet s = 'he'\nconsole.log(s.repeat(3)) //'hehehe'\n//如果你带入小数，Math.floor(num)来处理")]),n._v(" "),e("h2",{attrs:{id:"函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#函数"}},[n._v("#")]),n._v(" 函数")]),n._v(" "),e("p",[n._v("在 es5 我们给函数定义参数默认值是怎么样？"),e("br"),n._v("\nfunction action(num) {\nnum = num || 200\n//当传入 num 时，num 为传入的值\n//当没传入参数时，num 即有了默认值 200\nreturn num\n}"),e("br"),n._v("\n但细心观察的同学们肯定会发现，num 传入为 0 的时候就是 false，此时 num = 200 与我们的实际要的效果明显不一样"),e("br"),n._v("\nes6 为参数提供了默认值。在定义函数时便初始化了这个参数，以便在参数没有被传递进去时使用。\nfunction action(num = 200) {\nconsole.log(num)\n}")]),n._v(" "),e("p",[n._v("action() //200\naction(300) //300 ##箭头函数"),e("br"),n._v("\nes6 很有意思的一部分就是函数的快捷写法。也就是箭头函数。\n箭头函数最直观的三个特点。")]),n._v(" "),e("ul",[e("li",[n._v("不需要 function 关键字来创建函数")]),n._v(" "),e("li",[n._v("省略 return 关键字")]),n._v(" "),e("li",[n._v("继承当前上下文的 this 关键字\n//例如"),e("br"),n._v("\n[1,2,3].map(x = > x + 1)\n//等同于：\n[1,2,3].map((function(x){\nreturn x + 1\n}).bind(this))")])]),n._v(" "),e("h2",{attrs:{id:"说个小细节"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#说个小细节"}},[n._v("#")]),n._v(" 说个小细节")]),n._v(" "),e("p",[n._v("当你的函数有且仅有一个参数的时候，是可以省略掉括号的。当你函数返回有且仅有一个表达式的时候可以省略{};例如：\nvar people = name = > 'hello' + name\n//参数 name 就没有括号"),e("br"),n._v("\n作为参考：\nvar people = (name, age) = > {\nconst fullName = 'h' + name\nreturn fullName\n}")]),n._v(" "),e("h2",{attrs:{id:"扩展的对象功能"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#扩展的对象功能"}},[n._v("#")]),n._v(" 扩展的对象功能")]),n._v(" "),e("p",[n._v("对象初始化简写"),e("br"),n._v("\nes5 我们对于对象都是以键值对的形式书写，是有可能出现键值对重命名的。例如：\nfunction people(name, age) {\nreturn {\nname: name,\nage: age\n}\n}\n键值对重名，es6 可以简写如下：\nfunction people(name, age){\nreturn {\nname,\nage\n}\n}\nes6 同样改进了为对象字面量方法赋值的语法。es5 为对象添加方法："),e("br"),n._v("\nconst people = {\nname: 'lux',\ngetNAme: function() {\nconsole.log(this.name)\n}\n}"),e("br"),n._v("\nes6 通过省略冒号与 function 关键字，将这个语法变得更简洁"),e("br"),n._v("\nconst people = {\nname: 'lux',\ngetName () {\nconsole.log(this.name)\n}\n}\nes6 对象提供了 Object.assign()这个方法来实现浅复制。Object.assign()可以吧任意多个源对象自身可枚举的属性拷贝给目标对象，然后返回目标对象。第一个参数即为目标对象。在实际项目中，我们为了不改变源对象。一般会把目标对象传为{}"),e("br"),n._v("\ncosnt obj = Object.assign({}, objA, objB)")]),n._v(" "),e("h2",{attrs:{id:"更方便的数据访问-解构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#更方便的数据访问-解构"}},[n._v("#")]),n._v(" 更方便的数据访问--解构")]),n._v(" "),e("p",[n._v("数组和对象是 js 中最常用也是最重要表示形式。为了简化提取信息，es6 新增了解构，这将是一个数据结构分解为更小的部分的过程。\nes5 我们提取对象中的信息形式如下："),e("br"),n._v("\nconst people = {\nname: 'lux',\nage: 20\n}\nconst name = people.name\nconst age = people.age\nconsole.log(name + '---' + age)"),e("br"),n._v("\n是不是感觉很熟悉，没错，在 es6 之前我们就是这样获取对象的信息的，一个一个获取。现在，解构能让我们从对象或者数组里面取出数据村委变量，例如：\n//对象\ncosnt people = {\nname: 'lux',\nage: 20\n}\nconst { name, age } = people\nconsole.log("),e("code",[n._v("${name} --- ${age}")]),n._v(")\n//数组\nconst color = ['red', 'blue']\nconst [first, second] = color\nconsole.log(first) //'red'\nconsole.log(second) //'blue'")]),n._v(" "),e("h2",{attrs:{id:"spread-operator-展开运算符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#spread-operator-展开运算符"}},[n._v("#")]),n._v(" Spread Operator 展开运算符")]),n._v(" "),e("p",[n._v("es6 中另外一个好玩的特性就是 Spread Operator 也是三个点儿...接下来就展示一下它的用途。\n组装对象或者数组"),e("br"),n._v("\n//数组"),e("br"),n._v("\nconst color = ['red', 'yellow']\nconst colorful = [...color, 'green', 'pink']\nconsole.log(colorgful) //[red, yellow, green, pink]")]),n._v(" "),e("p",[n._v('//对象\nconst alp = { first: \'a\', second: \'b\'}\nconst alphabets = { ...alp, third: \'c\'}\nconsole.log(alphabets) //{ "first": "a", "second": "b", "third": "c"}\n有时候我们想获取数组或者对象除了前几项或者除了某几项的其他项'),e("br"),n._v("\n//数组"),e("br"),n._v("\nconst number = [1,2,3,4,5]\nconst [first, ...rest] = number\nconsole.log(rest) //2,3,4,5\n//对象"),e("br"),n._v('\nconst user = {\nusername: \'lux\',\ngender: \'female\',\nage: 19,\naddress: \'peking\'\n}\nconst { username, ...rest } = uer\nconsole.log(rest) //{ "address": "peking", "age": 19, "gender": "female"}\n对于 Object 而言，还可以用于组合新的 Object。(ES2017 stage-2 proposal) 当然如果有重复的属性名，右边覆盖左边。'),e("br"),n._v("\nconst first = {\na: 1,\nb: 2,\nc: 6\n}\nconst second = {\nc: 3,\nd: 4\n}\nconst total = { ...first, ...second }\nconsole.log(total) //{ a: 1, b: 2, c: 3, d: 4 }")]),n._v(" "),e("h2",{attrs:{id:"import-和-export"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#import-和-export"}},[n._v("#")]),n._v(" import 和 export")]),n._v(" "),e("p",[n._v("import 导入模块、export 导出模块\n//全部导入\nimport people from './example'\n//有一种特殊情况，即允许你将整个模块当做单一对象进行导入\n//该模块的所有导出都会作为对象的属性存在"),e("br"),n._v('\nimport * as example from "./example.js"\nconsole.log(example.name)\nconsole.log(example.age)\nconsole.log(example.getName())')]),n._v(" "),e("p",[n._v("//导入部分\nimport { name, age } from './example'")]),n._v(" "),e("p",[n._v("//导出默认，有且只有一个默认\nexport default App")]),n._v(" "),e("p",[n._v("//部分导出"),e("br"),n._v("\nexport class App extend Component {} ;\n以前有人问我，导入的时候有没有大括号的区别是什么： 1.当用 export default people 导出时，就用 import people 导入（不带大括号）")]),n._v(" "),e("p",[n._v("2.一个文件里，有且只能有一个 export default。但可以有多个 export。")]),n._v(" "),e("p",[n._v("3.当用 export name 时，就用 import { name }导入（记得带上大括号）")]),n._v(" "),e("p",[n._v("4.当一个文件里，既有一个 export default people, 又有多个 export name 或者 export age 时，导入就用 import people, { name, age }")]),n._v(" "),e("p",[n._v("5.当一个文件里出现 n 多个 export 导出很多模块，导入时除了一个一个导入，也可以用 import * as example")]),n._v(" "),e("h2",{attrs:{id:"promise"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#promise"}},[n._v("#")]),n._v(" Promise")]),n._v(" "),e("p",[n._v("在 promise 之前代码过多的回调或者嵌套，可读性差，耦合度高，扩展性低。通过 Promise 机制，扁平化的代码机构，大大提高了代码可读性；用同步编程的方式来编写异步代码，保存现行的代码逻辑，极大地降低了代码耦合性而提高了程序的可扩展性。")]),n._v(" "),e("p",[n._v("说白了就是用同步的方式去写异步代码。")]),n._v(" "),e("p",[n._v("发起异步请求"),e("br"),n._v("\nfetch('/api/todos')\n.then(res => res.json())\n.then(data => ({ data }))\n.catch(err => ({ err }));\n今天看到一篇关于面试题的很有意思。"),e("br"),n._v("\nsetTimeout(function() {\nconsole.log(1)\n}, 0);\nnew Promise(function executor(resolve) {\nconsole.log(2);\nfor( var i=0 ; i<10000 ; i++ ) {\ni == 9999 && resolve();\n}\nconsole.log(3);\n}).then(function() {\nconsole.log(4);\n});\nconsole.log(5);"),e("br"),n._v("\nhttps://zhuanlan.zhihu.com/p/25407758"),e("br"),n._v("\n当然以上 promise 的知识点，这个只是冰山一角。需要更多地去学习应用。")]),n._v(" "),e("h2",{attrs:{id:"generators"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#generators"}},[n._v("#")]),n._v(" Generators")]),n._v(" "),e("p",[n._v("生成器（ generator）是能返回一个迭代器的函数。生成器函数也是一种函数，最直观的表现就是比普通的 function 多了个星号*，在其函数体内可以使用 yield 关键字,有意思的是函数会在每个 yield 后暂停。\n这里生活中有一个比较形象的例子。咱们到银行办理业务时候都得向大厅的机器取一张排队号。你拿到你的排队号，机器并不会自动为你再出下一张票。也就是说取票机“暂停”住了，直到下一个人再次唤起才会继续吐票。"),e("br"),n._v("\nOK。说说迭代器。当你调用一个 generator 时，它将返回一个迭代器对象。这个迭代器对象拥有一个叫做 next 的方法来帮助你重启 generator 函数并得到下一个值。next 方法不仅返回值，它返回的对象具有两个属性：done 和 value。value 是你获得的值，done 用来表明你的 generator 是否已经停止提供值。继续用刚刚取票的例子，每张排队号就是这里的 value，打印票的纸是否用完就这是这里的 done。"),e("br"),n._v("\n// 生成器\nfunction *createIterator() {\nyield 1;\nyield 2;\nyield 3;\n}")]),n._v(" "),e("p",[n._v("// 生成器能像正规函数那样被调用，但会返回一个迭代器\nlet iterator = createIterator();")]),n._v(" "),e("p",[n._v("console.log(iterator.next().value); // 1\nconsole.log(iterator.next().value); // 2\nconsole.log(iterator.next().value); // 3"),e("br"),n._v("\n那生成器和迭代器又有什么用处呢？"),e("br"),n._v("\n围绕着生成器的许多兴奋点都与异步编程直接相关。异步调用对于我们来说是很困难的事，我们的函数并不会等待异步调用完再执行，你可能会想到用回调函数，（当然还有其他方案比如 Promise 比如 Async/await）。"),e("br"),n._v("\n生成器可以让我们的代码进行等待。就不用嵌套的回调函数。使用 generator 可以确保当异步调用在我们的 generator 函数运行一下行代码之前完成时暂停函数的执行。"),e("br"),n._v("\n那么问题来了，咱们也不能手动一直调用 next()方法，你需要一个能够调用生成器并启动迭代器的方法。就像这样子的"),e("br"),n._v("\nfunction run(taskDef) { //taskDef 即一个生成器函数")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[n._v("  // 创建迭代器，让它在别处可用\n  let task = taskDef();\n\n  // 启动任务\n  let result = task.next();\n\n  // 递归使用函数来保持对 next() 的调用\n  function step() {\n\n      // 如果还有更多要做的\n      if (!result.done) {\n          result = task.next();\n          step();\n      }\n  }\n\n  // 开始处理过程\n  step();\n")])])]),e("p",[n._v("}"),e("br"),n._v("\n生成器与迭代器最有趣、最令人激动的方面，或许就是可创建外观清晰的异步操作代码。你不必到处使用回调函数，而是可以建立貌似同步的代码，但实际上却使用 yield 来等待异步操作结束。")]),n._v(" "),e("h2",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[n._v("#")]),n._v(" 总结")]),n._v(" "),e("p",[n._v("ES6 的特性远不止于此，但对于我们日常的开发开说。这已经是够够的了。还有很多有意思的方法。比如 findIndex...等等。包括用 set 来完成面试题常客数组去重问题。我和我的小伙伴们都惊呆了!")]),n._v(" "),e("p",[n._v("http://www.jianshu.com/p/287e0bb867ae")])])}),[],!1,null,null,null);e.default=r.exports}}]);