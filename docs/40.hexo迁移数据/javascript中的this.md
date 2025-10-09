---
title: javascript中的this
date: 2017-06-06 16:06:21
permalink: /pages/fee2ac/
categories:
  - hexo迁移数据
author:
  name: 神族九帝
  link: https://github.com/wu529778790
  permalink: null
  categories: null
sidebar: auto
tags:
  -
---

title: javascript 中的 this
date: 2017-04-23 16:09:09
tags: js

---

this 是函数内部的一个特殊对象，他引用的是函数据以执行的环境对象。

<!--more-->

## 全局环境下的 this

当在网页的全局作用域中调用函数时，this 对象引用的就是 window

    console.log(this);//window

    function f() {
        return this;
    }
    f();//window

函数 f()定义在全局作用域中，引用了 this 对象，调用函数之前，this 的值并不确定，可能会在代码执行过程中饮用不同的对象，在全局环境中调用函数 f()时，this 引用的就是全局对象 window.

## 对象中的 this

将一个函数赋给对象，通过对象调用这个函数，他们的 this 是调用该函数的对象  
 var o = {
color: 'blue',
sayColor: function () {
return this.color;
}  
 }

    o.sayColor();//blue

将函数 sayColor 赋值给对象 o,o.sayColor()被调用时，函数内部的 this 就被绑定到 o，我们也可以用如下方法：
  
 var o = {color:'blue'};
function sayColor(){
return this.color;
}
o.sayColor = sayColor;
o.sayColor();//blue  
函数的名字仅仅是一个包含着指针的变量，在何处定义调用函数不会影响到 this 的行为，全局的 sayColor()与 o.sayColor()指向的是同一个函数。

## 函数构造中的 this

函数或方法之前带有关键字 new，他就构成了构造函数调用。通过构造函数生成一个新的对象，this 指向新对象  
 function person(){
this.name = 'wuwei';
}
var o = new person();
console.log(o.name);//wuwei

## applly 和 call

每个函数都包含两个非继承而来的方法，apply()和 call().这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内 this 对象的值。首先 apply()方法接受两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以使 Array 实例，也可以是 arguments 对象。  
 function sum(num1, num2) {
return num1 + num2;
};
function callSum1(num1,num2){
return sum.apply(this, arguments);
};
function callSum2(num1, num2){
return sum.apply(this, [num1, num2]);
};
console.log(callSum1(10, 10));//20
console.log(callSum2(10, 10));//20
  
上边这个例子中，callSum1()在执行 sum()函数时传入了 this 作为 this 值(再作用域中调用的，传入的就是 window 对象)和 arguments 对象.而 callSum2()也调用了 sum()函数，但传入的是 this 和一个参数数组。

注：在严格模式下，未指定环境对象而调用函数，则 this 值不会被转型为 window，除非明确把函数添加到某个对象或者抵用 apply()或 call(),否则 this 值是 undefined.

call()和 apply()方法作用相同，区别仅仅在于接受参数方式不同，对 call()而言，第一个参数是 this 没有变化，不同的是其余参数都是直接传递给函数。换句话说，在使用 call()方法时，传递给函数的参数必须诸葛列举出来。

    function sum(num1, num2){
        return num1 + num2;
    };
    function callSum(num1, num2){
        return sum.call(this, num1, num2);
    };
    console.log(callSum(10, 10));//20

call()和 apply()真正强大的地方在于能扩充函数赖以运行的作用域。

    window.color = 'red';
    var o = { color:'blue'};
    function sayColor(){
        console.log(this.color);
    };
    sayColor();//red
    sayColor.call(this);//red
    sayColor.call(window);//red
    sayColor.call(o);//blue

使用 call()或者 apply()扩充作用域最大的好处，就是对象不需要与方法有人和耦合关系。

## bind

es5 还定义了 bind，这个方法会创建一个函数的实例，其 this 值会被绑定传给 bind()函数的值  
 window.color = 'red';
var o = { color:'blue' };
function sayColor() {
console.log(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor();//blue  
在 sayColor()调用 bind()并传入对象 o,创建了 objectSayColor()函数，该函数的 this 等于 o，因此即使在全局作用域中调用这个函数，也会看到 blue

## 闭包中的 this

闭包中使用 this 对象可能会导致一些问题，this 对象在运行时是基于函数的执行环境对象的：在全局函数中，this 等于 window，二挡函数被作为某个对象方法调用时，this 等于那个对象，匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window  
 var color = 'red';
var o = {
name:'blue',
sayColor: function(){
return function(){
return this.color;
}
}
}
console.log(o.sayColor()());//red
//改进
var o = {
color:'blue',
sayColor: function(){
var that = this;
return function(){
return that.color;
}
}
}
console.log(o.sayColor()());//blue

## es6 中箭头函数的 this

this 引用的是函数据以执行的环境对象。但是在使用箭头函数时，函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。箭头函数的使用参考：http://es6.ruanyifeng.com/#docs/function  
 function foo(){
setTimeout(() => {
console.log('id:', this.id);
}, 100)
}
var id = 21;
foo.call({ id: 42 });//id: 42

箭头函数中的 this 指向 foo 的 this，箭头函数中也不存在 arguments，指向外层函数 foo 对象的 arguments  
由于箭头函数没有自己的 this，所以也不能用 call()、apply()、bind()改变 this 的指向。

## 绑定 this

函数绑定运算符是::,双冒号是左边是一个对象，右边是一个函数，该运算符会自动将左边的对象作为上下文环境(this 对象)，绑定到右边的函数上。可参考阮老师的http://es6.ruanyifeng.com/#docs/function  
 foo::bar;
//等同于
bar.bind(foo);

在判断 this 指向时，要记住，在没有绑定 this 的情况下，this 动态绑定，指向运行时的环境，而非代码中的位置，只有箭头函数才是静态绑定，将 this 绑定到代码中的位置。
