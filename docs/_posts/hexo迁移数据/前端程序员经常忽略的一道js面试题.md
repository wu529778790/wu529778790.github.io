---
title: 前端程序员经常忽略的一道js面试题
date: 2021-06-05 16:06:21
permalink: /pages/e14f75/
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
title: 前端程序员经常忽略的一道js面试题
date: 2017-04-12 11:02:24
categories:
tags: 面试
---


在网上看的这道面试题很经典，就转载过来记录一下，顺便加深自己的印象

<!--more-->

function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}
 
//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();



    这几道题经常碰见，但是没有好好研究过，今天看了一下，考查的内容确实很多，基本看出了js的综合能力，包含了变量定义提升，this指针指向，运算符优先级，原型，继承，全局变量污染，对象属性以及原型属性优先级等知识。

## 第一问
    先看此题的上半部分说了什么，首先是自定义了一个叫Foo的函数，之后为Foo创建了一个getName的静态属性储存了一个匿名函数，之后为Foo的原型对象新创建了一个叫getName的匿名函数。之后又通过函数变量表达式创建了一个getName的函数，最后再声明一个getName函数。

    第一问的Foo.getName自然是访问Foo函数上储存的静态属性，答案自然是2，这个很简单，没什么说的，但是我们来复习下基础知识

        function User(name) {
            var name = name ;//私有属性
            this.name = name ;//公有属性
            function getName() {//公有方法
                return name;
            }
        }
        User.prototype.getName = function() {
            return this.name;
        }
        User.name = 'Wscats';//静态属性
        User.getName = function(){//静态方法
            return this.name ;
        }
        var Wscat = new User('Wscats');//实例化

    注意下面这几点：
        * 调用公有方法，公有属性，我们必须先实例化对象，也就是用new操作符实例化对象，就可构造函数实例化对象的方法和属性，并且公有方法是不能调用私有方法和静态属性的
        * 静态方法和静态属性就是我们无需实例化就可以调用
        * 而对象的私有方法和属性，外部是不可以访问的
## 第二问
    直接调用getName函数，就是访问当前尚文作用域内的叫getName的函数，所以这里应该直接把关注点放在4和5上，跟123都没什么关系。此处有两个坑，一是变量生命提升，而是函数表达式和函数声明的区别。
    此处可以参考https://github.com/Wscats/Good-text-Share/issues/73

    https://github.com/Wscats/Good-text-Share/issues/86

    在js中，定义函数有两种类型

    ### 函数声明
        //函数声明
        function wacat(type){
            return type === 'wscat';
        }

    ### 函数表达式
        //函数表达式
        var oaoafly = function (type){
            return type ===  'oaoafly';
        }

        先来看一下下面这个问题，在一个程序里同时用函数声明和函数表达式定义一个名为getName的函数
            getName()//oaoafly
            var getName  = function () {
                console.log('wscat')
            }
            getName()//wscat
            function getName(){
                console.log('oaoafly')
            }
            getName()//wscat
        #### js解释器中存在一种变量声明被提升的机制，也就是说函数声明会被提升到作用域的最前面，即使写代码的时候是写在后面，也还是会被提升到前面
        #### 而用函数表达式创建的函数在运行时进行赋值，且要等到表达式赋值完成后才能调用

            var getName //变量被提升，此时为undefined

            getName();//oaoafly函数被提升，这里受函数声明的影响，虽然函数声明在最后可以被提升到最前面了
            var getName = function () {
                console.log('wacat')
            }//函数表达式此时才开始覆盖函数声明的定义
            getName()//wscat
            function getName () {
                console.log('oaoafly');
            }
            getName()//wscat 这里就执行了函数表达式的值
        
        所以可以分解为这两个简单的问题来看清楚区别的本质

            var getName ;
            console.log(getName)//undefined
            getName()//Uncaught TypeError: getName is not a function
            var getName = function () {
                console.log('wscat')
            }



            var getName ;
            console.log(getName);//function getName() {console.log('oaoafly')}
            getName()//oaoafly
            function getName(){
                console.log('oaoafly')
            }
        这个区别看似微不足道，但在某些情况下确实是一个难以察觉并且知名的陷阱。出现这个陷阱的本质原因体现在这两种类型在函数提升和运行时机上的差异。
        总结：
            #### js中函数声明和函数表达式是存在区别的，函数声明在js解析时进行函数提升，因此在同一个作用域内，不管函数声明在哪定义，该函数都可以进行调用，而函数表达式的值是在js运行时确定，并且在表达式赋值完成后，该函数才能调用。
            所以第二问的答案就是4，5的函数生命被4的函数表达式覆盖了
## 第三问
    Foo().getName();先执行了Foo函数，然后再调用Foo函数的返回值对象的getName属性函数
    Foo函数的第一句getName = function (){alert(1)}是一句函数赋值语句，注意他没有var声明，所以先向当前Foo函数作用域内寻找getName变量，没有的话，在想当前函数作用域上层，即外层作用域内寻找是否含有getNAme变量，找到了，也就是第二问种的alert(4)函数,将此变量的值赋值为function(){alert(1)}
    此处实际上是将外层作用域内的getName函数修改了。

    注意：此处若依然没有找到会一直向上查找到window对象，若window对象中也没有getName属性，就在window对象中创建一个getName变量。
    
    之后Foo函数的返回值是this，简单的讲，this的指向室友所在函数的调用方式决定的，而此处的直接调用方式，this指向window对象。所以Foo函数返回的是window对象，相当于执行window.getname(),而window种的getName已经被修改为alert(1),所以最终会输出1

        var name = 'wscat';//全局变量
        window.name = 'Wscats';//全局变量
        function getName () {
            name = 'Oaoafly'; //去掉var变成了全局变量
            var privateName = 'Stacsw';
            return function () {
                console.log(this);//window
                return privateName
            }
        }
        var getPrivate = getName('Hello');//当然传参是局部变量，但函数里面没有接受这个参数

        console.log(name);//Oaoafly
        console.log(getPrivate());//Stacsw

        因为js没有块级作用域，但是函数是能产生一个作用域的，函数内部不同定义值得方法会直接或间接影响到全局或者局部变量，函数内部的私有变量可以用闭包获取，函数还真是第一公民呀
        而关于this，this的志向是在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象
        所以第三问中实际上就是window在调用  Foo() 函数，所以this的指向是window

        window.Foo().getName()

## 第四问
    
    直接调用getName函数，相当于window.getName(),因为这个变量已经被Foo函数执行时修改了，所以结果与第三问相同，为1，也就是说Foo执行后把全局的getName函数给重写了一次，所以结果就是Foo()执行重写的拿个getName函数。

## 第五问

    第五问的 new Foo.getName() 此处考查的是js的运算符优先级问题
    js运算符的优先级问题，可以参考https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

    这道题首先看优先级的第18和第17都出现关于new的优先级，new(带参数列表)比new(无参数列表)高，跟成员访问同级
    
    new Foo.getName();的优先级是这样的
    相当于是：
        new (Foo.getName)();

        * 点的优先级(18)比new无序列表(17)优先级高
        * 当点运算完后又因为有个括号(),此时就是变成new有序列表(18)，所以直接执行new，当然也有可能有朋友会问，为什么遇到()不函数调用在new呢，那是因为函数调用(17)比new有参数列表(18)优先级低
    所以这里实际上将getName函数作为了构造函数来执行，所以是2

## 第六问
    这一题比上一题的区别就在Foo那里多了一个括号，这个有括号跟没括号在我们上疑问中就看出来优先级是有区别的

        (new Foo()).getName()

    首先new有参数列表(18)跟点的优先级(18)是同级，同级的话按照从左到右的执行顺序，所以先执行new有参数列表(18)在执行点的优先级(18),最后在函数调用(17)
        new有参数列表(18)->.成员访问(18)->()函数调用(17)
    这里还有一个知识点，Foo作为构造函数有返回值
    #### 构造函数的返回值
        在传统语言中， 构造函数不应该有返回值，实际执行的返回值就是此构造函数的实例化对象。而在js中构造函数可以有返回值也可以没有。
        1，没有返回值则按照其他语言一样返回实例化对象
            function Foo(name) {
                this.name = name;
            }
            console.log(new Foo('wscats'))

        2,若有返回值则检查其返回值是否为引用类型，如果是非引用类型，如基本类型(String.Number.Boolean.Null.Undefined)则于无返回值相同，实际返回其实例化对象

            function Foo(name) {
                this.name = name
                return 520
            }
            console.log(new Foo('wscats'))

        3,若返回值是引用类型，则实际返回值为这个引用类型

            function foo(name) {
                this.name = name
                return {
                    age:16
                }
            }
            console.log(new Foo('wscats'))


    原题中，由于返回的是this，而在this在构造函数中本来就代表当前实例化对象，最终Foo函数返回实例化对象
    之后调用实例化对象的getName函数，因为在Foo构造函数中没有实例化对象添加任何属性，当前对象的原型对象(prototype)中寻找getName函数。
    当然这里再拓展个题外话，如果构造函数和原型链都有相同的方法，如下面的代码，那么默认会拿构造函数的公有方法而不是原型链，这个知识点在原题中没有表现出来，后面改进版我已经加上

        function Foo(name) {
            this.name = name ;
            this.getName = function() {
                return this.name
            }
        }
        Foo.prototype.name = 'Oaoafly';
        Foo.prototype.getName = function () {
            return 'Oaoafly'
        }
        console.log((new Foo('Wscats')).name)//Wscats
        console.log((new Foo('Wscats')).getName)//Wscats

## 第七问

    new new Foo().getName(); 同样是运算符优先级问题

    实际上问的是 

        new ((new Foo()).getName)()
        new有参数列表(18)->new有参数列表(18)
    先初始化Foo的实例化对象，然后将原型上的getName函数作为构造函数再次new
##答案
        function Foo() {
            getName = function () { alert (1); };
            return this;
        }
        Foo.getName = function () { alert (2);};
        Foo.prototype.getName = function () { alert (3);};
        var getName = function () { alert (4);};
        function getName() { alert (5);}

        //答案：
        Foo.getName();//2
        getName();//4
        Foo().getName();//1
        getName();//1
        new Foo.getName();//2
        new Foo().getName();//3
        new new Foo().getName();//3

## 后续
    难度加大，在Foo函数里面加多一个公有方法getName

                function Foo() {
                    this.getName = function() {
                        console.log(3);
                        return {
                            getName: getName//这个就是第六问中涉及的构造函数的返回值问题
                        }
                    };//这个就是第六问中涉及到的，JS构造函数公有方法和原型链方法的优先级
                    getName = function() {
                        console.log(1);
                    };
                    return this
                }
                Foo.getName = function() {
                    console.log(2);
                };
                Foo.prototype.getName = function() {
                    console.log(6);
                };
                var getName = function() {
                    console.log(4);
                };

                function getName() {
                    console.log(5);
                } //答案：
                Foo.getName(); //2
                getName(); //4
                console.log(Foo())
                Foo().getName(); //1
                getName(); //1
                new Foo.getName(); //2
                new Foo().getName(); //3
                        //多了一问
                new Foo().getName().getName(); //3 1
                new new Foo().getName(); //3



转载自https://github.com/Wscats/Good-text-Share/issues/85