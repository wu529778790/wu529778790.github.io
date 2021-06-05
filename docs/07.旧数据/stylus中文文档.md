---
title: stylus中文文档
date: 2021-06-05 16:06:21
permalink: /pages/ec0fac/
categories: 
  - 旧数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
---
title: stylus中文文档
date: 2017-04-20 09:52:55
categories:
tags: js
---


Stylus - 富有表现力的、动态的、健壮的CSS

<!--more-->

## 常见的css

    body {
      font: 12px Helvetica, Arial, sans-serif;
    }
    a.button {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }

## 花括号去掉

    body
      font: 12px Helvetica, Arial, sans-serif;
      
    a.button
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;

## 分号去掉

    body
      font: 12px Helvetica, Arial, sans-serif
      
    a.button
      -webkit-border-radius: 5px
      -moz-border-radius: 5px
      border-radius: 5px


## 冒号去掉

    body
      font 12px Helvetica, Arial, sans-serif
      
    a.button
      -webkit-border-radius 5px
      -moz-border-radius 5px
      border-radius 5px

## 函数类

    border-radius()
      -webkit-border-radius arguments
      -moz-border-radius arguments
      border-radius arguments
      
    body
      font 12px Helvetica, Arial, sans-serif
      
    a.button
      border-radius(5px)

## 混合书写

    border-radius()
      -webkit-border-radius arguments
      -moz-border-radius arguments
      border-radius arguments
      
    body
      font 12px Helvetica, Arial, sans-serif
      
    a.button
      border-radius 5px

## 引用

    @import 'vendor'

    body
      font 12px Helvetica, Arial, sans-serif
      
    a.button
      border-radius 5px

## 语言函数

    sum(nums...)
      sum = 0
      sum += n for n in nums
      
    sum(1 2 3 4)
    // => 10

## 所有的都是可以选择的

    fonts = helvetica, arial, sans-serif

    body {
      padding: 50px;
      font: 14px/1.4 fonts;
    }

## Stylus获取、安装

    $ npm install stylus

## Stylus的特征

    冒号可选
    分号可选
    逗号可选
    括号可选
    变量
    插值
    混合书写
    算术
    强制类型转换
    动态导入
    条件
    迭代
    嵌套选择
    父级参考
    变量函数调用
    词法作用域
    内置函数(>25)
    内部语言函数
    压缩可选
    图像内联可选
    可执行Stylus
    健壮的错误报告
    单行和多行注释
    CSS字面量
    字符转义
    TextMate捆绑
    以及其他更多

更多信息github：https://github.com/stylus/stylus