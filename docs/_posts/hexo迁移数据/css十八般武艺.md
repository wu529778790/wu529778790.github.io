---
title: css十八般武艺
date: 2021-06-05 16:06:21
permalink: /pages/b47a5b/
categories: 
  - 旧数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
---
title: css十八般武艺
date: 2017-04-22 19:11:28
tags: css
---

水平居中，垂直居中，单列布局，多列布局

<!--more-->

## 常用居中方法

居中在布局中很常见，我们假设DOM文档节后如下，子元素要在父元素中居中

    <div class="parent">
        <div class="child"></div>
    </div>

### 水平居中

子元素为行内元素还是块状元素，宽度一定还是宽度未定，采取的布局方案不同

子元素为：

**行内元素：对父元素设置text-align:center,
**定宽块状元素：设置左右margin值为auto，
**不定宽块状元素：设置子元素为display：inline,然后在父元素上设置text-align:center,
**通用方案：flex布局，对父元素设置display:flex;justify-content:center;

### 垂直居中：

垂直居中对于子元素是单行内联文本、多行内联文本以及块状元素采用的方案是不同的。

**父元素一定，子元素为单行内联文本： 
设置父元素的height等于行高line-height
**父元素一定，子元素为多行内联文本： 
设置父元素的display：table-cell或inline-block，在设置vertical-align：middle；
**块状元素： 
设置子元素篇position:absolute并设置top、bottom为0，父元素要设置定位为static以外的值，margin:auto;
**通用方案：
flex布局，对父元素设置display：flex；align-items:center；

## 单列布局

![单行布局的两种形式](https://pic4.zhimg.com/v2-12cd0eddc97721987b9f6e41e5a1fc4b_b.png)

特征： 定宽、水平居中

常见的单列布局有两种：

    * 一种是header、content、footer宽度都相同，期一般不会占满浏览器的最宽宽度，但当浏览器宽度缩小低于最大宽度时，宽度会自适应。
    * 一种是header、footer宽度为浏览器宽度，但content以及header和footer里的内容却不会占满浏览器宽度。

对于第一种，对header、content、footer统一设置width或max-width，并通过margin:auto实现居中。

### DOM文档

    <div class="layout">
        <div class="header">头部</div>
        <div class="content">内容</div>
        <div class="footer">尾部</div>
    </div>

### css清单

    .layout{
    /*   width: 960px; *//*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/
    max-width: 960px;
    margin: 0 auto;
    } 

对于第二种，header，footer的内容宽度为100%，单header，footer的内容区以及content统一设置为width或者max-width，并通过margin：auto实现。

### DOM文档 

    <div id="header">
      <div class="layout">头部</div>
    </div>
    <div id="content" class="layout">内容</div>
    <div id="footer">
      <div class="layout">尾部</div>
    </div>

### css清单

    .layout{
    /*   width: 960px; *//*设置width当浏览器窗口宽度小于960px时，单列布局不会自适应。*/
    max-width: 960px;
    margin: 0 auto;
    }

## 二列&三列布局

1[二列三列布局](https://pic2.zhimg.com/v2-784022577a47ea5fc449b06de53c4651_b.png)

二列布局的特征是侧栏固定宽度，主栏自适应宽度。三列布局的特征是两侧两列固定宽度，中间列自适应宽度。

之所以将二列布局和三列布局写在一起，是因为二列布局可以看做是去掉一个侧栏的三列布局，其布局的思想有异曲同工之妙。对于传统的实现方法，主要讨论上图中前三种布局，经典的带有侧栏的二栏布局以及带有左右侧栏的三栏布局，对于flex布局，实现了上图的五种布局。

### a.float+margin

**原理说明： 设置两个侧栏分别向左向右浮动，中间列通过外边距给两个侧栏腾出空间，中间列的宽度根据浏览器窗口自适应。

#### DOM文档

    <div id="content">
        <div class="sub">sub</div>
        <div class="extra">extra</div>
        <div class="main">main</div>
    </div>

布局步骤：

1. 对两边侧栏分别设置宽度，并对左侧栏添加左浮动，右侧栏添加右浮动。
2. 对主面板设置左右外边距，margin-left的值为左侧栏的宽度，margin-right的值为有侧栏的宽度。

#### css清单

    .sub{
        width: 100px;
        float: left;
    }
    .extra{
        width: 200px;
        float: right;
    }
    .main{
        margin-left: 100px; 
        margin-right: 200px;
    }


#### 说明

* 注意dom文档的书写顺序，先写两侧栏，在写主面板，更换后则侧栏会被挤到下一列.
* 这种布局方式比较简单明了，单缺点是渲染师先渲染了侧边栏，而不是比较重要的主面板。

#### 两列的实现方法

如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的margin-right值，其他操作相同。反之亦然。

### b.position+margin

*原理说明：通过绝对定位将两个侧栏固定，同样通过外边距给两个侧栏腾出空间，中间列自适应。

#### DOM文档

    <div class="sub">left</div>
    <div class="main">main</div>
    <div class="extra">right</div>

布局步骤：

    1. 对两边侧栏分别设置宽度，设置定位方式为绝对定位。
    2. 设置两侧栏的top值都为0，设置左侧栏的left值为0，右侧栏的right为0.
    3. 对主面板设置左右外边距，margin-left的值为左侧栏的宽度，margin-right的值为有侧栏的宽度。

#### css清单

    .sub, .extra {
        position: absolute;
        top: 0; 
        width: 200px;
    }
    .sub { 
        left: 0;
    }
    .extra { 
        right: 0; 
    }
    .main { 
        margin: 0 200px;
    }

* 本方法不限制DOM书写顺序，先写主面板会使主面板部分优先渲染（一般主面板会比侧栏内容重要）。

* 与上一种方法相比，本种方法是通过定位来实现侧栏的位置固定。

* 如果中间栏含有最小宽度限制，或是含有宽度的内部元素，则浏览器窗口小到一定程度，主面板与侧栏会发生重叠。

#### 二列的实现方法

如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的margin-right值，其他操作相同。反之亦然。

### c.圣杯布局(float + 负margin)

#### 原理说明：

    主面板设置宽度为100%，主面板与两个侧栏都设置浮动，常见为左浮动，这时两个侧栏会被主面板挤下去。通过负边距将浮动的侧栏拉上来，左侧栏的负边距为100%，刚好是窗口的宽度，因此会从主面板下面的左边跑到与主面板对其的左边，右侧栏此时浮动在主面板下面的左边，设置负边距为负的自身宽度刚好浮动到主面板对齐的右边。为了避免侧栏遮挡住面板内容，在外层设置左右padding值为左右侧栏的宽度，给侧栏腾出空间，此时主面板的宽度减小。由于侧栏的负margin都是相对主面板的，两个侧栏并不会像我们想象中的停靠在左右两边，而是跟着缩小的主面板一起向中间靠拢。此时使用相对布局，调整两个侧栏到相应的位置。

#### DOM文档

    <div id="bd">
        <div class="main"></div>
        <div class="sub"></div>
        <div class="extra"></div>
    </div>

布局步骤：

1. 三者都设置想左浮动
2.设置main宽度为100%，设置两侧栏的宽度
3.设置负边距，sub设置负左边距100%，extra设置负左边距为负的自身高度
4.设置mian的padding值给左右两个子面板留出空间
5.设置两个字面板为相对定位，sub的left值为负的sub宽度，extra的right值为负的extra宽度。

#### css清单

    .main {        
    float: left;       
    width: 100%;   
    }  
    .sub {       
    float: left;        
    width: 190px;        
    margin-left: -100%;               
    position: relative;  
    left: -190px;  
    }   
    .extra {        
    float: left;        
    width: 230px;        
    margin-left: -230px; 
    position: relative; 
    right: -230px;  
    }
    #bd {        
    padding: 0 230px 0 190px;   
    }

#### 说明 
* dom元素的书写顺序不得更改
* 主面板部分优先渲染(一般主面板回避侧栏内容重要)
* 当面板的main内容部分比两边的子面板宽度小的时候，布局就会乱掉，可以通过设置main的mian-width属性或者使用双飞翼布局避免问题。

#### 二列的实现方法

如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的padding-right值，其他操作相同。反之亦然。

### d flex布局， 

这个主要看阮一峰老师的教程

语法篇： http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool

实例篇： http://www.ruanyifeng.com/blog/2015/07/flex-examples.html


总结： 统的布局方法基于盒状模型，依赖 display属性 + position属性 + float属性，逻辑相对复杂，对于实现一些特殊效果，例如垂直居中，尤其复杂繁琐。而flex布局中的flex容器可以根据实际可用空间动态调整子元素的宽高比和顺序，使元素能够尽可能地利用可用空间，同时也能通过缩小来避免超出。flex布局提供了一套简便、完整、响应式的布局方案。



转自：https://zhuanlan.zhihu.com/p/25565751