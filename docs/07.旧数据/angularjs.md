---
title: angularjs
date: 2021-06-05 16:06:21
permalink: /pages/ca2653/
categories:
  - 旧数据
tags:
  - 
---
title: angularjs
date: 2016-03-06 18:22:39
categories:
tags: angular
---
## jQuery：用更少的代码，实现更强悍的功能
托互联网日新月异发展的福，浏览器变成了人们接入互联网的入口，而JavaScript 这个曾经的小语种，终于成功地站到了舞台的中央，唤起了开发者的兴趣。<!--more-->
浏览器里原生的JavaScript有点像汇编语言，不同的浏览器就像不同的CPU架构， 汇编语言各有千秋，这让前端开发者很恼火。聪明人很快发现了这个痛点，于是， 抹平浏览器差异的jQuery库出现了。   
jQuery由一小撮对浏览器极其熟稔的极客负责抹平不同浏览器的差异，其他开发 者只需要基于jQuery进行开发，可以更好地关注业务实现，而不是把时间花在 适配不同的浏览器上。  
这样的分工符合经济学原理，开启了一个不可忽视的jQuery时代
## 满眼的全是DOM
jQuery使得开发无刷新动态页面（AJAX）或者单页应用（SPA）变得 相当简单。
标准的HTML页面是静态的，被浏览器渲染后就产生了一个DOM树：
![](http://o9xxj2r73.bkt.clouddn.com/angularjs/1.png)
jQuery让静态的文档动起来，通过提供一系列的选择符，jQuery使开发者能够 极其方便地选中一组DOM节点，对其进行操作。  
这就是jQuery的开发范式。jQuery没有引入什么新的概念，只是朴素地，让你能够更简单 地、低成本地操作DOM：  
1.用选择符选定一组DOM节点  
2.操作选中的DOM节点，比如：修改文本、改变属性、挂接事件监听函数、变换DOM等等。  
3.基本不用考虑跨浏览器的兼容性

jQuery的API符合大多数开发者的预期，因此，很容易上手。
## jQuery缺失的环节

jQuery有点像C语言，威力很大，不过要弄出点像样的前端界面，还得花不少功夫 处理琐碎的事情。
还能再简单些吗？Misko Hevery认为在某些应用场景下可以。于是，AngularJS诞生了：

AngularJS引入了三个主要的概念，期望让前端开发更系统化一些：  
<b>1.声明式界面开发  
2.双向数据绑定  
3.使用依赖注入解耦  </b>  
很多人在初次接触AngularJS时，都有些吃惊，因为它把前端开发搞的突然严肃起来 了。考虑到Misko曾经是一个Java程序员，这一切就好理解了。
Java程序员擅长引入复杂的架构来解决简单的问题，对吧？
<!---more--->
## 库 vs. 框架
![](http://o9xxj2r73.bkt.clouddn.com/angularjs/2.png)
jQuery是一个库，库总是被动的，就像工具，应用的开发逻辑是你的，在 某一点上需要用一下工具，就用好了。  
框架则非常不同，这意味着AngularJS为应用已经搭起了一个架子，约定了 一些组成部分，并且实现了这些部分的拼装运行。换句话说， 应用的开发逻辑是AngularJS的，你得跟着它走。  
所以，AngularJS难学一些，因为它有一个架子在那，你不了解这个架子， 基本没法下手。  
## 重写示例：模板、指令和视图
AngularJS最显著的特点是用静态的HTML文档，就可以生成具有动态行为的页面。  
还是前面的小时钟示例，我们使用AngularJS模板来重写，示例已经嵌入→_→：
HTML文件看起来像普通的HTML，只是其中多了一些特别的标记 （比如：ng-app,ez-clock等等）。在Angular中，这个HTML文件被称为模板。  
ng-app这样的标记我们称之为指令。模板通过指令指示AngularJS进行必要的操作。 比如：ng-app指令用来通知AngularJS自动引导应用；ez-clock 指令用来通知AngularJS生成指定的时钟组件。  
当AngularJS启动应用时，它会通过一个编译器解析处理这个模板文件，生成的结果就是： 视图：
![](http://o9xxj2r73.bkt.clouddn.com/angularjs/3.png)

我们定义了两个部件：模板（包含指令的HTML文件）和指令实现 （JavaScript文件），AngularJS将这两部分拼装起来，生成了最终的视图。
有点理解框架的含义了吗？

	angular.module("ezstuff",[])//创建模块ezstuff
	.directive("ezClock",function(){//在模块上注册指令ezClock的类工厂
		return {
			restrict : "E",
			replace : true,
			template : "<div class='clock'></div>",
			link : function(scope,element,attrs){
				setInterval(function(){
					//获取当前时间
					var d = new Date();
	
					//element对应引用该指令的DOM对象的jqLite封装
					element.text(d.toString());
				},1000);
			}
		}
	})

## 使用指令封装JavaScript代码

我们在模板中使用了一个自定义的标签ez-clock，而他变成了一个会动的时钟，这期间发生了什么呢？

可以肯定的是这肯定不是浏览器干的，他不认识ez-block是什么东西，angularjs引入了基本的angularjs库，他会在浏览器载入html文档并且建立好DOM树后，执行以下操作：
	
1，找到有ng-app属性的DOM节点

2，以这个节点为根节点，搜索自定义指令，发现ez-clock

3，调用ez-clock指令的实现函数（指令类工厂）进行展开我们的定义，ez-clock的展开操作如下：

	1 使用一个div元素替换这个自定义标签
	2 创建一个定时器，在定时器触发时刷新div元素的innerText
ez-clock这样的非html标准的标签，在angularjs中之所以称之为指令/directive，就是只看到它时，基础框架需要对其进行解释，以便展开成浏览器可以理解的东西，而这个解释的过程称之为：编译。

可见，angularjs框架要求将HTML文档和JavaScript代码分割的更清晰，通常混杂在HTML文档中的JavaScript代码，需要一直领的形式进行封装，而模板、指令实现代码这两个不见，则有基础框架负责拼装运行。

## 起点：声明化
基于前面的实例，我们很容易感受到angularjs进行应用开发的一个重要的思维模式：葱构造声明式界面入手。

事实上，这也是misko开发angularjs最初的动机吧。
![](http://o9xxj2r73.bkt.clouddn.com/angularjs/4.png)

在使用angularjs进行开发时，始终应该从构造函数声明式界面模板开始，如果现在的指令不够，那么就定义自己的指令，实现自己的指令、实现自己的指令。这是一个选代的过程。

记住：指令是新型的API，用界面的声明化作为需求，来指导我们的代码封装。

## 层级的作用域

在angularjs中，ng-app开始的DOM子树上，每个DOM对象都有一个对应的scope对象。比如，在我们的实例中，body对象对应一个scope对象，因为body这时候有ng-app属性，所以这个scope就是$rootscope对象，ez-clock对象也对应有一个scope对象........
![](http://o9xxj2r73.bkt.clouddn.com/angularjs/5.png)

在默认情况下，一个DOM子元素不会创建新的作用域，也就是说，这个子元素所对应的scope对象，其实就是它的最近一级的祖先对象对应的scope对象。比如，在我们的例子上，ez-namecard对应的scope对象，就是它的父对象即body对象的scope对象，恰好也就是$rootScope对象；而ez-namecard有三个div子元素对应的scope对象，也就是$rootScope对象。

有些指令会导致创建新的作用域，比如ng-controller。如果在一个DOM对象上创建了新的作用域，那么这个scope对象的原型是其最近一级的组件对象的scope对象。

比如在我们的例子中，如果在ez-namecard上使用ng-controller指令，那么ez-namecard对应的scope对象就不会是body对应的$rootScope对象，但是由于原型继承，所以通过这个scope依然可以访问sb变量。

## 监听数据的变化

我们已经实现了将数据显示到界面上，不过这还不够。
由于编译仅仅在启动引导时执行一次，这就意味着我们的link函数只会被调用一次，那么，如果数据变化，在界面上将不会有任何反馈，所以我们要监听数据的变化。

	$watch(watchExpression listener ,[objecEquality])
$watch 方法又三个参数：
	1，watchExpression - 要监听的表达式
	2，listener - 变化发生时的回调函数，angularjs将这个函数传入新值和旧值
	3，objectEquality - 如果要监听表达式的值是一个对象，应当将这个参数置为true

## 数据变化的传播

数据绑定有两个方向：


数据到界面：我们使用scope对象的$watch()方法监听数据的变化，来更新界面。

界面到数据：我们在界面的DOM对象上监听变化时间，来更新数据，并通过$apply()方法传播变化。
![](http://o9xxj2r73.bkt.clouddn.com/angularjs/6.png)
上面的图中，我们把ez-namecard和ez-namecard-editor都绑定到同一个sb对象上，那么在 ez-namecard-editor上进行编辑，将导致sb对象发生变化；由于ez-namecard监听了这个变化， 所以，ez-namecard的显示也应该变化。