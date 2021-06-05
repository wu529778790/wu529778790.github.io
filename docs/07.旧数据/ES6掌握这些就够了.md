---
title: ES6掌握这些就够了
date: 2021-06-05 16:06:21
permalink: /pages/d62082/
categories: 
  - 旧数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
---
title: ES6掌握这些就够了
date: 2017-06-21 21:02:58
tags: ES6
---
刚开始用vue或者react，很多时候我们都会把ES6这个大兄弟加入我们的技术栈中。但是ES6那么多那么多特性，我们需要全部都掌握吗？秉着二八原则，掌握好常用的，有用的这个可以让我们快速起飞。

<!--more-->
# 变量声明const和let  
我们都是知道在es6之前，var关键字声明变量。无论生命在何处，都会被视为声明在函数的最顶部(不在函数内即在全局作用域的最顶部)。这就是函数变量提升。例如：
  function aa() {
    if(bool) {
      var test = 'hello man'
    }else {
      console.log(test)
    }
  }  

以上的代码实际是：  
  function aa() {
    var test //变量提升
    if(bool) {
      test = 'hello man'
    }else {
      //此处访问test值为undefined
      console.log(test)
    }
    //此处访问test值为undefined
  }  
所以不用关心bool是否为true or false。实际上，无论如何test都会被创建声明。  
接下来es6主角登场：  
我们通常用let和const来声明，let表示变量、const表示常量。let和cosnt都是块级作用域。怎么理解这个块级作用域？  

* 在一个函数内部  
* 在一个代码块内部  
  说白了{}大括号内的代码块即为let和const的作用域。  
看一下代码：  
  function aa() {
    if(bool) {
      let test = 'hello man'
    }else {
      //test 在此处访问不到
      console.log(test)
    }
  }  
let的作用域是在它所在当前代码块，但不会被提升到当前函数的最顶部。  
再来说说const。  
  const name = 'lux'
  name = 'joe' //再次赋值时会报错  
说一道面试题  
  var funcs = []
  for (var i = 0;i < 10;i++) {
    funcs.push(function () {
      console.log(i)
    })
  }
  funcs.forEach(function(func) {
    func()
  })  
这样的面试题非常常见，很多同学一看就知道输出10十次  
但是如果我们想依次输出0到9呢？两种解决办法。直接上代码。  
  //es5告诉我们可以利用闭包解决这个问题
  var funcs = []
  for (var i = 0; i < 10;i++) {
    funcs.push((function(value) {
      return function() {
        console.log(value)
      }
    }(i))
  }
  // es6  
  for (let i = 0; i < 10; i++) {
    funcs.push(function() {
      console.log(i)
      })
  }  
达到相同的效果，es6简洁。  
# 模板字符串  
es6模板字符串简直就是开发者的福音啊，解决了es5在字符串功能上的痛点。  
第一个用途，基本的字符串格式化。将表达式嵌入字符串中进行拼接。用${}来界定。
  //es5  
  var name = 'lux'
  console.log('hello' + name)
  //es6
  const name = 'lux'
  console.log(`hello ${name}`) //hello lux  
第二个用途，在es5时我们通过反斜杠(\)来做多行字符串或者字符串一行行拼接。es6反引号(``)直接搞定。
  //es5
  var msg = "Hi \
  man!
  "
  //es6
  const template = `<div>
    <span>hello world</span>
    </div>`  
对于字符串es6当然也提供了很多厉害的方法。说几个常用的。
  //1.includes: 判断是否包含后直接返回布尔值  
  let str = 'hahay'
  console.log(str.includes('y'))  //true
  //2.repeat: 获取字符串重复n次  
  let s = 'he'
  console.log(s.repeat(3))  //'hehehe'
  //如果你带入小数，Math.floor(num)来处理  
# 函数  
在es5我们给函数定义参数默认值是怎么样？  
  function action(num) {
    num = num || 200
    //当传入num时，num为传入的值
    //当没传入参数时，num即有了默认值200
    return num
  }  
但细心观察的同学们肯定会发现，num传入为0的时候就是false，此时num = 200 与我们的实际要的效果明显不一样  
es6为参数提供了默认值。在定义函数时便初始化了这个参数，以便在参数没有被传递进去时使用。
  function action(num = 200) {
    console.log(num)
  }

  action() //200
  action(300)  //300
#箭头函数  
es6很有意思的一部分就是函数的快捷写法。也就是箭头函数。
箭头函数最直观的三个特点。
* 不需要function关键字来创建函数  
* 省略return关键字  
* 继承当前上下文的this关键字
  //例如  
  [1,2,3].map(x = > x + 1)
  //等同于：
  [1,2,3].map((function(x){
    return x + 1
    }).bind(this))  
# 说个小细节  
当你的函数有且仅有一个参数的时候，是可以省略掉括号的。当你函数返回有且仅有一个表达式的时候可以省略{};例如：
  var people = name = > 'hello' + name
  //参数name就没有括号  
作为参考：
  var people = (name, age) = > {
    const fullName = 'h' + name
    return fullName
  }
# 扩展的对象功能  
对象初始化简写  
es5我们对于对象都是以键值对的形式书写，是有可能出现键值对重命名的。例如：
  function people(name, age) {
    return {
      name: name,
      age: age
    }
  }
键值对重名，es6可以简写如下：
  function people(name, age){
    return {
      name,
      age
    }
  }
es6同样改进了为对象字面量方法赋值的语法。es5为对象添加方法：  
  const people = {
    name: 'lux',
    getNAme: function() {
      console.log(this.name)
    }
  }  
es6通过省略冒号与function关键字，将这个语法变得更简洁  
  const people = {
    name: 'lux',
    getName () {
      console.log(this.name)
    }
  }
es6对象提供了Object.assign()这个方法来实现浅复制。Object.assign()可以吧任意多个源对象自身可枚举的属性拷贝给目标对象，然后返回目标对象。第一个参数即为目标对象。在实际项目中，我们为了不改变源对象。一般会把目标对象传为{}  
  cosnt obj = Object.assign({}, objA, objB)  
# 更方便的数据访问--解构  
数组和对象是js中最常用也是最重要表示形式。为了简化提取信息，es6新增了解构，这将是一个数据结构分解为更小的部分的过程。
es5我们提取对象中的信息形式如下：  
  const people = {
    name: 'lux',
    age: 20
  }
  const name = people.name
  const age = people.age
  console.log(name + '---' + age)  
是不是感觉很熟悉，没错，在es6之前我们就是这样获取对象的信息的，一个一个获取。现在，解构能让我们从对象或者数组里面取出数据村委变量，例如：
  //对象
  cosnt people = {
    name: 'lux',
    age: 20
  }
  const { name, age } = people
  console.log(`${name} --- ${age}`)
  //数组
  const color = ['red', 'blue']
  const [first, second] = color
  console.log(first) //'red'
  console.log(second) //'blue'  
# Spread Operator 展开运算符
es6中另外一个好玩的特性就是Spread Operator 也是三个点儿...接下来就展示一下它的用途。
组装对象或者数组  
  //数组  
  const color = ['red', 'yellow']
  const colorful = [...color, 'green', 'pink']
  console.log(colorgful)  //[red, yellow, green, pink]

  //对象
  const alp = { first: 'a', second: 'b'}
  const alphabets = { ...alp, third: 'c'}
  console.log(alphabets) //{ "first": "a", "second": "b", "third": "c"}
有时候我们想获取数组或者对象除了前几项或者除了某几项的其他项  
  //数组  
  const number = [1,2,3,4,5]
  const [first, ...rest] = number
  console.log(rest) //2,3,4,5
  //对象  
  const user = {
    username: 'lux',
    gender: 'female',
    age: 19,
    address: 'peking'
  }
  const { username, ...rest } = uer
  console.log(rest) //{ "address": "peking", "age": 19, "gender": "female"}
对于Object而言，还可以用于组合新的Object。(ES2017 stage-2 proposal) 当然如果有重复的属性名，右边覆盖左边。  
  const first = {
    a: 1,
    b: 2,
    c: 6
  }
  const second = {
    c: 3,
    d: 4
  }
  const total = { ...first, ...second }
  console.log(total) //{ a: 1, b: 2, c: 3, d: 4 }
# import和export
import导入模块、export导出模块
  //全部导入
  import people from './example'
  //有一种特殊情况，即允许你将整个模块当做单一对象进行导入
  //该模块的所有导出都会作为对象的属性存在  
  import * as example from "./example.js"
  console.log(example.name)
  console.log(example.age)
  console.log(example.getName())

  //导入部分
  import { name, age } from './example'

  //导出默认，有且只有一个默认
  export default App

  //部分导出  
  export class App extend Component {} ;
以前有人问我，导入的时候有没有大括号的区别是什么：
  1.当用export default people导出时，就用 import people 导入（不带大括号）

  2.一个文件里，有且只能有一个export default。但可以有多个export。

  3.当用export name 时，就用import { name }导入（记得带上大括号）

  4.当一个文件里，既有一个export default people, 又有多个export name 或者 export age时，导入就用 import people, { name, age }

  5.当一个文件里出现n多个 export 导出很多模块，导入时除了一个一个导入，也可以用import * as example  
# Promise  
在promise之前代码过多的回调或者嵌套，可读性差，耦合度高，扩展性低。通过Promise机制，扁平化的代码机构，大大提高了代码可读性；用同步编程的方式来编写异步代码，保存现行的代码逻辑，极大地降低了代码耦合性而提高了程序的可扩展性。  

说白了就是用同步的方式去写异步代码。

发起异步请求  
  fetch('/api/todos')
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(err => ({ err }));
今天看到一篇关于面试题的很有意思。  
  setTimeout(function() {
    console.log(1)
  }, 0);
  new Promise(function executor(resolve) {
    console.log(2);
    for( var i=0 ; i<10000 ; i++ ) {
      i == 9999 && resolve();
    }
    console.log(3);
  }).then(function() {
    console.log(4);
  });
  console.log(5);  
https://zhuanlan.zhihu.com/p/25407758  
当然以上promise的知识点，这个只是冰山一角。需要更多地去学习应用。  
# Generators  
生成器（ generator）是能返回一个迭代器的函数。生成器函数也是一种函数，最直观的表现就是比普通的function多了个星号*，在其函数体内可以使用yield关键字,有意思的是函数会在每个yield后暂停。
这里生活中有一个比较形象的例子。咱们到银行办理业务时候都得向大厅的机器取一张排队号。你拿到你的排队号，机器并不会自动为你再出下一张票。也就是说取票机“暂停”住了，直到下一个人再次唤起才会继续吐票。  
OK。说说迭代器。当你调用一个generator时，它将返回一个迭代器对象。这个迭代器对象拥有一个叫做next的方法来帮助你重启generator函数并得到下一个值。next方法不仅返回值，它返回的对象具有两个属性：done和value。value是你获得的值，done用来表明你的generator是否已经停止提供值。继续用刚刚取票的例子，每张排队号就是这里的value，打印票的纸是否用完就这是这里的done。  
  // 生成器
  function *createIterator() {
      yield 1;
      yield 2;
      yield 3;
  }

  // 生成器能像正规函数那样被调用，但会返回一个迭代器
  let iterator = createIterator();

  console.log(iterator.next().value); // 1
  console.log(iterator.next().value); // 2
  console.log(iterator.next().value); // 3  
那生成器和迭代器又有什么用处呢？  
围绕着生成器的许多兴奋点都与异步编程直接相关。异步调用对于我们来说是很困难的事，我们的函数并不会等待异步调用完再执行，你可能会想到用回调函数，（当然还有其他方案比如Promise比如Async/await）。  
生成器可以让我们的代码进行等待。就不用嵌套的回调函数。使用generator可以确保当异步调用在我们的generator函数运行一下行代码之前完成时暂停函数的执行。  
那么问题来了，咱们也不能手动一直调用next()方法，你需要一个能够调用生成器并启动迭代器的方法。就像这样子的  
  function run(taskDef) { //taskDef即一个生成器函数

      // 创建迭代器，让它在别处可用
      let task = taskDef();

      // 启动任务
      let result = task.next();

      // 递归使用函数来保持对 next() 的调用
      function step() {

          // 如果还有更多要做的
          if (!result.done) {
              result = task.next();
              step();
          }
      }

      // 开始处理过程
      step();

  }  
生成器与迭代器最有趣、最令人激动的方面，或许就是可创建外观清晰的异步操作代码。你不必到处使用回调函数，而是可以建立貌似同步的代码，但实际上却使用 yield 来等待异步操作结束。  
# 总结
ES6的特性远不止于此，但对于我们日常的开发开说。这已经是够够的了。还有很多有意思的方法。比如findIndex...等等。包括用set来完成面试题常客数组去重问题。我和我的小伙伴们都惊呆了!



http://www.jianshu.com/p/287e0bb867ae
