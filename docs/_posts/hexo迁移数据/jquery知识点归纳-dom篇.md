---
title: jquery知识点归纳-dom篇
date: 2021-06-05 16:06:21
permalink: /pages/2ebd55/
categories: 
  - hexo迁移数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
---
title: jquery知识点归纳--dom篇
date: 2017-04-18 14:00:01
categories:
tags: jquery
---
jquery——dom篇

<!--more-->

## 创建节点和节点属性

通过JavaScript可以很方便的获取DOM节点，从而进行一系列的DOM操作。但实际上一般开发者都习惯性的先定义好HTML结构，但这样就非常不灵活了。
试想下这样的情况：如果我们通过AJAX获取到数据之后然后才能确定结构的话，这种情况就需要动态的处理节点了
流程中涉及的一点方法：
创建元素：document.createElement
设置属性：setAttribute
添加文本：innerHTML
加入文档：appendChild
jquery创建节点
$("html结构")就是$("<div></div>")／$("<div>我是文本节点</div>")／$("<div id='test' class='aaron'>我是文本节点</div>")

## dom节点的插入

### append()和appendTo()
    
动态创建的元素是不够的，它只是临时存放在内存中，最终我们需要放到页面文档并呈现出来。那么问题来了，怎么放到文档上？这里就涉及到一个位置关系，常见的就是把这个新创建的元素，当作页面某一个元素的子元素放到其内部。针对这样的处理，jQuery就定义2个操作的方法
append()前面是被插入的对象，后面是要在对象内插入的元素内容
appendTo()前面是要插入的元素内容，而后面是被插入的对象

###　after()与before()

before与after都是用来对相对选中元素外部增加相邻的兄弟节点
2个方法都是都可以接收HTML字符串，DOM 元素，元素数组，或者jQuery对象，用来插入到集合中每个匹配元素的前面或者后面
2个方法都支持多个参数传递after(div1,div2,....)

### prepend()与prependTo()

.prepend()方法将指定元素插入到匹配元素里面作为它的第一个子元素 (如果要作为最后一个子元素插入用.append()).

.prepend()和.prependTo()实现同样的功能，主要的不同是语法，插入的内容和目标的位置不同
对于.prepend() 而言，选择器表达式写在方法的前面，作为待插入内容的容器，将要被插入的内容作为方法的参数

而.prependTo() 正好相反，将要被插入的内容写在方法的前面，可以是选择器表达式或动态创建的标记，待插入内容的容器作为参数。

### insertAfter()与insertBefore()

.before()和.insertBefore()实现同样的功能。主要的区别是语法——内容和目标的位置。 对于before()选择表达式在函数前面，内容作为参数，而.insertBefore()刚好相反，内容在方法前面，它将被放在参数里元素的前面

.after()和.insertAfter() 

实现同样的功能。主要的不同是语法——特别是（插入）内容和目标的位置。 对于after()选择表达式在函数的前面，参数是将要插入的内容。对于 .insertAfter(), 刚好相反，内容在方法前面，它将被放在参数里元素的后面
before、after与insertBefore。insertAfter的除了目标与位置的不同外，后面的不支持多参数处理

## dom结点的删除

### empty()

empty 顾名思义，清空方法，但是与删除又有点不一样，因为它只移除了 指定元素中的所有子节点。

### remove()

remove与empty一样，都是移除元素的方法，但是remove会将元素自身移除，同时也会移除元素内部的一切，包括绑定的事件及与该元素相关的jQuery数据。

### 保留数据的删除操作detach()

这个方法不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。与remove()不同的是，所有绑定的事件、附加的数据等都会保留下来。$("div").detach()这一句会移除对象，仅仅是显示效果没有了。但是内存中还是存在的。当你append之后，又重新回到了文档流中。就又显示出来了。

## DOM节点的复制与替换

### clone()

.clone()方法深度 复制所有匹配的元素集合，包括所有匹配元素、匹配元素的下级元素、文字节点。
clone方法比较简单就是克隆节点，但是需要注意，如果节点有事件或者数据之类的其他处理，我们需要通过clone(ture)传递一个布尔值ture用来指定，这样不仅仅只是克隆单纯的节点结构，还要把附带的事件与数据给一并克隆了

### replaceWith()和replaceAll()

.replaceWith( newContent )：用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合
$("p:eq(1)").replaceWith('<a style="color:red">替换第二段的内容</a>')
$('<a style="color:red">替换第二段的内容</a>').replaceAll('p:eq(1)')

### 包裹wrap()方法

.wrap( wrappingElement )：在集合中匹配的每个元素周围包裹一个HTML结构
.wrap()函数可以接受任何字符串或对象，可以传递给$()工厂函数来指定一个DOM结构。这种结构可以嵌套了好几层深，但应该只包含一个核心的元素。每个匹配的元素都会被这种结构包裹。该方法返回原始的元素集，以便之后使用链式方法。

### 包裹wrapAll()方法

.wrapAll( wrappingElement )：给集合中匹配的元素增加一个外面包裹HTML结构
.wrapAll()函数可以接受任何字符串或对象，可以传递给$()工厂函数来指定一个DOM结构。这种结构可以嵌套多层，但是最内层只能有一个元素。所有匹配元素将会被当作是一个整体，在这个整体的外部用指定的 HTML 结构进行包裹。

### 包裹wrapInner()方法

.wrapInner( wrappingElement )：给集合中匹配的元素的内部，增加包裹的HTML结构
## 遍历

### children()方法

代码如果是$("div").children()，那么意味着只能找到ul，因为div与ul是父子关系，li与div是祖辈关系，因此无法找到。


### find()方法

此时可以用find()方法，这也是开发使用频率很高的方法。这里要注意 children与find方法的区别，children是父子关系查找，find是后代关系（包含父子关系）

### parent()方法

parent()方法允许我们能够在DOM树中搜索到这些元素的父级元素，从有序的向上匹配元素，并根据匹配的元素创建一个新的 jQuery 对象

### parents()方法

jQuery是一个合集对象，如果想快速查找合集里面的每一个元素的所有祖辈元素，此时可以用parents()方法
其实也类似find与children的区别，parent只会查找一级，parents则会往上一直查到查找到祖先节点
### closest()方法

从元素本身开始，在DOM 树上逐级向上级元素匹配，并返回最先匹配的祖先元素
起始位置不同：.closest开始于当前元素 .parents开始于父元素
遍历的目标不同：.closest要找到指定的目标，.parents遍历到文档根元素，closest向上查找，直到找到一个匹配的就停止查找，parents一直查找到根元素，并将匹配的元素加入集合
结果不同：.closest返回的是包含零个或一个元素的jquery对象，parents返回的是包含零个或一个或多个元素的jquery对象

### next()

jQuery是一个合集对象，如果想快速查找指定元素集合中每一个元素紧邻的后面同辈元素的元素集合，此时可以用next()方法

### prev()方法

jQuery是一个合集对象，如果想快速查找指定元素集合中每一个元素紧邻的前面同辈元素的元素集合，此时可以用prev()方法

### siblings()

jQuery是一个合集对象，如果想快速查找指定元素集合中每一个元素的同辈元素，此时可以用siblings()方法
### add()

jQuery是一个合集对象，通过$()方法找到指定的元素合集后可以进行一系列的操作。$()之后就意味着这个合集对象已经是确定的，如果后期需要再往这个合集中添加一新的元素要如何处理？jQuery为此提供add方法，用来创建一个新的jQuery对象 ，元素添加到匹配的元素集合中

### each()

.each() 方法就是一个for循环的迭代器，它会迭代jQuery对象合集中的每一个DOM元素。每次回调函数执行时，会传递当前循环次数作为参数(从0开始计数

链接：http://www.imooc.com/article/17456

