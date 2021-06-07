---
title: javascript中的this
date: 2021-06-05 16:06:21
permalink: /pages/fee2ac/
categories: 
  - hexo迁移数据
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
tags: 
  - 
---
title: javascript中的this
date: 2017-04-23 16:09:09
tags: js
---

this是函数内部的一个特殊对象，他引用的是函数据以执行的环境对象。

<!--more-->

## 全局环境下的this  
当在网页的全局作用域中调用函数时，this对象引用的就是window

    console.log(this);//window

    function f() {
        return this;
    }
    f();//window  
函数f()定义在全局作用域中，引用了this对象，调用函数之前，this的值并不确定，可能会在代码执行过程中饮用不同的对象，在全局环境中调用函数f()时，this引用的就是全局对象window.  
## 对象中的this    
将一个函数赋给对象，通过对象调用这个函数，他们的this是调用该函数的对象   
    var o = {
        color: 'blue',
        sayColor: function () {
            return this.color;
        }     
    }

    o.sayColor();//blue  
将函数sayColor赋值给对象o,o.sayColor()被调用时，函数内部的this就被绑定到o，我们也可以用如下方法：
    
    var o = {color:'blue'};
    function sayColor(){
        return this.color;
    }
    o.sayColor = sayColor;
    o.sayColor();//blue  
函数的名字仅仅是一个包含着指针的变量，在何处定义调用函数不会影响到this的行为，全局的sayColor()与o.sayColor()指向的是同一个函数。  
## 函数构造中的this  
函数或方法之前带有关键字new，他就构成了构造函数调用。通过构造函数生成一个新的对象，this指向新对象  
    function person(){
        this.name = 'wuwei';
    }
    var o = new person();
    console.log(o.name);//wuwei  
## applly和call    
每个函数都包含两个非继承而来的方法，apply()和call().这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。首先apply()方法接受两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以使Array实例，也可以是arguments对象。  
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
    
上边这个例子中，callSum1()在执行sum()函数时传入了this作为this值(再作用域中调用的，传入的就是window对象)和arguments对象.而callSum2()也调用了sum()函数，但传入的是this和一个参数数组。  

注：在严格模式下，未指定环境对象而调用函数，则this值不会被转型为window，除非明确把函数添加到某个对象或者抵用apply()或call(),否则this值是undefined.  

call()和apply()方法作用相同，区别仅仅在于接受参数方式不同，对call()而言，第一个参数是this没有变化，不同的是其余参数都是直接传递给函数。换句话说，在使用call()方法时，传递给函数的参数必须诸葛列举出来。  

    function sum(num1, num2){
        return num1 + num2;
    };
    function callSum(num1, num2){
        return sum.call(this, num1, num2);
    };
    console.log(callSum(10, 10));//20  

call()和apply()真正强大的地方在于能扩充函数赖以运行的作用域。

    window.color = 'red';
    var o = { color:'blue'};
    function sayColor(){
        console.log(this.color);
    };
    sayColor();//red
    sayColor.call(this);//red
    sayColor.call(window);//red
    sayColor.call(o);//blue  

使用call()或者apply()扩充作用域最大的好处，就是对象不需要与方法有人和耦合关系。  
## bind  
es5还定义了bind，这个方法会创建一个函数的实例，其this值会被绑定传给bind()函数的值  
    window.color = 'red';
    var o = { color:'blue' };
    function sayColor() {
        console.log(this.color);
    }
    var objectSayColor = sayColor.bind(o);
    objectSayColor();//blue  
在sayColor()调用bind()并传入对象o,创建了objectSayColor()函数，该函数的this等于o，因此即使在全局作用域中调用这个函数，也会看到blue  
## 闭包中的this  
闭包中使用this对象可能会导致一些问题，this对象在运行时是基于函数的执行环境对象的：在全局函数中，this等于window，二挡函数被作为某个对象方法调用时，this等于那个对象，匿名函数的执行环境具有全局性，因此其this对象通常指向window  
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

## es6中箭头函数的this  
this引用的是函数据以执行的环境对象。但是在使用箭头函数时，函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。箭头函数的使用参考：http://es6.ruanyifeng.com/#docs/function  
    function foo(){
        setTimeout(() => {
            console.log('id:', this.id);
        }, 100)
    }
    var id = 21;
    foo.call({ id: 42 });//id: 42  

箭头函数中的this指向foo的this，箭头函数中也不存在arguments，指向外层函数foo对象的arguments  
由于箭头函数没有自己的this，所以也不能用call()、apply()、bind()改变this的指向。  

## 绑定this  
函数绑定运算符是::,双冒号是左边是一个对象，右边是一个函数，该运算符会自动将左边的对象作为上下文环境(this对象)，绑定到右边的函数上。可参考阮老师的http://es6.ruanyifeng.com/#docs/function  
    foo::bar;
    //等同于
    bar.bind(foo);
  
在判断this指向时，要记住，在没有绑定this的情况下，this动态绑定，指向运行时的环境，而非代码中的位置，只有箭头函数才是静态绑定，将this绑定到代码中的位置。
