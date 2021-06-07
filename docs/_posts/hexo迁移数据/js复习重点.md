---
title: js复习重点
date: 2021-06-05 16:06:21
permalink: /pages/c691ba/
categories: 
  - hexo迁移数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
---
title: js复习重点
date: 2017-04-11 11:30:42
categories:
tags:
---


1.闭包的概念及其应用
http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures
 <!--more-->
2.原型链/继承，构造对象的方法
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
http://www.cnblogs.com/TomXu/archive/2012/01/05/2305453.html
https://blog.oyanglul.us/javascript/understand-prototype.html
这一部分 js高级程序设计上面讲的挺好的
 
3.bom/dom(重点是dom)
https://segmentfault.com/a/1190000000654274（这个说的挺详细）
http://www.itxueyuan.org/view/6299.html
http://blog.csdn.NET/xiao__gui/article/details/8315148
 
4.获取元素的方法，queryselector()（get---byid，byclassname。。。。。）
http://blog.csdn.Net/mydeman/article/details/2078107
https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector
 
5.nodelist和array
https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList
http://www.cnblogs.com/jeffwongishandsome/archive/2010/07/07/1773144.html
 
6.数组的常规操作
http://www.cnblogs.com/ahthw/p/4279642.html
熟悉一下一下基本的算法，排序，逆置什么的。
7.apply/call
http://www.cnblogs.com/fighting_cp/archive/2010/09/20/1831844.html
call和apply是为了动态改变this而出现的，当一个object没有某个方法，但是其他的有，我们可以借助call或apply用其它对象的方法来操作。用的比较多的，通过document.getElementsByTagName选择的dom 节点是一种类似array的array。它不能应用Array下的push,pop等方法。我们可以通过：var domNodes =  Array.prototype.slice.call(document.getElementsByTagName("*"));这样domNodes就可以应用Array下的所有方法了。
8.string对象的操作
http://itbilu.com/javascript/js/EymJA6WY.html
 
9.五种基本类型（数字，字符串，undefined，null，boolearn）以及复合类型（array，object，function），他们二者的判别方法
http://www.xiabingbao.com/javascript/2015/07/04/javascript-type/
10.事件流（冒泡，捕获）
http://segmentfault.com/a/1190000003497939
 
11.事件的添加，删除
http://blog.csdn.net/jaylongli/article/details/4038042
结合事件流选择合适的元素进行事件添加可以适当的优化性能，也就是事件委托
 
12.事件委托
http://www.cnblogs.com/owenChen/archive/2013/02/18/2915521.html
13.this
http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html
 
14.new
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new
http://blog.csdn.net/hy6688_/article/details/22453043
 
15.js跨域
http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html
js的类库看一下jQuery，有时间浏览一下源码，$符的实现原理