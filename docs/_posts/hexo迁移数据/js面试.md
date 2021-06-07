---
title: js面试
date: 2021-06-05 16:06:21
permalink: /pages/a8ffd3/
categories: 
  - hexo迁移数据
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
tags: 
  - 
---
title: js 面试
date: 2017-11-13 18:15:55
categories:
tags: 面试

---

# window.onload 和$(document).ready()区别

window.onload()是在页面中包含图片在内的所有元素全部加载完成在执行

$(document).ready()是 dom 树加载完之后执行，不包含图片，其他媒体文件

因此$(document).ready()快于 window.onload()执行

## 数组去重

```
const arr = ['a','bb','22','a','yuci','haha','22'];
```

1.  es6 数据结构 set

```
let unique = new Set(arr);
console.log(Array.from(unique))
```

2.  使用 push()

```
let arr2 = [];
for(let i = 0;i < arr.length;i++){
  if(arr2.indexOf(arr[i]) == -1){
    arr2.push(arr[i])
  }
}
console.log(arr2)
```

```
//如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组

let arr3 = [arr[0]];
for(let i = 1; i < arr.length; i++) {
    if(arr.indexOf(arr[i]) == i) {
        arr3.push(arr[i]);
    }
}
console.log(arr3);
```

3.  排序去除相邻重复元素

```
let arrSort = arr.sort();
let arr4 = [];
for(let i = 0; i< arrSort.length; i++) {
    if(arrSort[i] != arrSort[i+1]) {
        arr4.push(arrSort[i]);
    }
}
console.log(arr4);
```

4.  使用 splice()

```
let len = arr.length;
for(let i = 0; i < len; i++) {
    for(let j = i + 1; j < len; j++) {
        if(arr[i] === arr[j]) {
            arr.splice(i,1);
            len--;
            j--;
        }
    }
}
console.log(arr);
```

# 事件委托

得益于事件冒泡，当多个元素有相同的事件，将事件绑定在父元素

```
var oUl = document.getElementById('oul');
oUl.addEventListener('click', function(e) {
    var e = e||window.event;
    var tar = e.target;
    if(tar.nodeName === 'LI') {
        alert(tar.innerHTML);
    }
})
```

# 判断变量类型

- typeof()用于判断简单数据；
- 判断一个变量是对象还是数组使用 instanceof，constructor 或 Object.prototype.toString.call()；

https://blog.csdn.net/yucihent/article/details/79652913

# 同步和异步（简要阐述）

同步：由于 js 单线程，同步任务都在主线程上排队执行，前面任务没执行完成，后面的任务会一直等待；

异步：不进入主线程，进入任务队列，等待主线程任务执行完成，开始执行。最基础的异步操作 setTimeout 和 setInterval，等待主线程任务执行完，在开始执行里面的函数；

http://www.ruanyifeng.com/blog/2014/10/event-loop.html

# 返回 false 的几种情况

false，null，0，“”，undefined，NaN

# js 类型值得区别

存储地：

简单数据类型：存储在栈中；

引用数据类型：存储在堆中，在栈中存储了指针，指向存储在堆中的地址，解释器会先检索在栈中的地址，从堆中获得实体；

大小：

简单数据类型：大小固定，占用空间小，频繁使用，所以存储在栈中；

引用数据类型：大小不固定，占用空间大；

# 闭包

何为闭包：有权访问另一个作用域中变量的函数

闭包特性：可实现函数外访问函数内变量，外层变量可以不被垃圾回收机制回收

为什么？怎么解决？

```
for(var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```

输出结果都为 10，因为 for()循环过程中每次传值，匿名函数并没有执行，相当于执行 10 次 function(){console.log(i);}，循环结束 i 变为 10，所以输出全部为 10；

使用闭包，自执行匿名函数包裹:

```
for(var i = 0; i < 10; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);
        }, 1000);
    })(i);
}
```

外部匿名函数立即执行，把 i 作为参数，赋值给 j ，因为是立即执行，所以每次循环输出不同值。

引用外层变量不被回收，会相比其他函数占用更高内存，使用不当容易造成内存泄漏。

# this 的指向

全局范围：指向 window（严格模式下不存在全局变量，指向 undefined）;

普通函数调用：指向 window;

对象方法调用：指向最后调用它的对象；

构造函数调用：指向 new 出来的对象；

显示设置 this：call，apply 方法显示将 this 指向第一个参数指明的对象

# new 到底做了什么

全局范围：指向 window（严格模式下不存在全局变量，指向 undefined）;

普通函数调用：指向 window;

对象方法调用：指向最后调用它的对象；

构造函数调用：指向 new 出来的对象；

显示设置 this：call，apply 方法显示将 this 指向第一个参数指明的对象

# 原型和原型链

创建一个函数就会为其创建一个 prototype 属性，指向这个函数的原型对象，原型对象会自动获得 constructor 属性，指向 prototype 属性所在函数。

```
Function.prototype.a = "a";
Object.prototype.b = "b";
function Person(){}
console.log(Person);    //function Person()
let p = new Person();
console.log(p);         //Person {} 对象
console.log(p.a);       //undefined
console.log(p.b);       //b
```

```
p.__proto__ === Person.prototype；Person.prototype.constructor === Person
```

当调用某种方法或查找某种属性时，首先会在自身调用和查找，如果自身并没有该属性或方法，则会去它的**proto**属性中调用查找，也就是它构造函数的 prototype 中调用查找，如果构造函数中也没有该属性方法，则会去构造函数的隐式原型中查找，一直到 null，就这样形成原型链。

https://github.com/hezizi/Blog/issues/1

# 继承方式

原型链继承：

Child()的原型作为 Parent()的实例来继承 Parent()的方法属性

因为所有实例都继承原型方法属性，其中一个实例对原型属性值更改后，所有实例调用该属性的值全部更改

```
function Parent() {}
Parent.prototype.parentSay = function() {
    return 'i am parent';
}
function Child() {}
Child.prototype.childSay = function() {
    return 'i am child';
}
Child.prototype = new Parent();
var par = new Parent();
var kid = new Child();

console.log(kid.parentSay());           //i am parent
```

构造函数继承：

在子类的构造函数内部通过 call 或 apply 来调用父类构造函数

无法实现函数的复用

```
function People() {
    this.name = ['zhangsan','lisi','wangwu'];
}
function Person() {
    People.call(this);
}
var per1 = new Person();
per1.name.push('zhanliu');
console.log(per1.name);     //["zhangsan", "lisi", "wangwu", "zhanliu"]

var per2 = new Person();
console.log(per2.name);     //["zhangsan", "lisi", "wangwu"]
```

组合继承：

将原型链继承和构造函数继承结合，最常用的继承模式

原型链继承共享的属性和方法，构造函数继承实例属性

```
function People(num) {
    this.num = num;
    this.name = ['zhangsan','lisi','wangwu'];
}
People.prototype.numCount = function() {
    console.log(this.num);
}
function Person(num) {
    People.call(this, num);
}
//继承方式
Person.prototype = new People();
Person.prototype.constructor = Person;

var per1 = new Person(10);
per1.name.push('zhaoliu');
console.log(per1.name);     //["zhangsan", "lisi", "wangwu", "zhanliu"]
per1.numCount();            //10

var per2 = new Person(20);
console.log(per2.name);     //["zhangsan", "lisi", "wangwu"]
per2.numCount();            //20
```

https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance

# 数组的常用方法

改变原数组：

尾部删除 pop()，尾部添加 push()，头部删除 shift()，头部添加 unshift()，排序 sort()，颠倒数组元素 reverse()，删除或插入元素 splice();

不会改变元素组：

合并数组 concat()，拼接数组元素 join()，截取元素 slice()，indexOf()，lastIndexOf()，toString()

https://blog.csdn.net/yucihent/article/details/79685148

# 数据存储

Cookie：用于客户端与服务端通信，也具有本地存储的功能

localStorage，sessionStorage：专门用于存储

区别：

大小：Cookie 容量为 4K，因为用于客户端与服务端通信，所有 http 都携带，如果太大会降低效率； localStorage，sessionStorage 大小为 5M。

失效时间：Cookie 会在浏览器关闭时删除，除非主动设置删除时间；localStorage 一直都在直到用户主动删除或清除浏览器缓存；sessionStorage 在浏览器关闭时删除。
