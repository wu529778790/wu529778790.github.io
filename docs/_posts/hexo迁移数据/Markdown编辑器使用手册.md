---
title: Markdown编辑器使用手册
date: 2019-01-15 10:22:14
categories: 教程
permalink: /pages/8e0c1c/
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
tags: 
  - 
---

markdown编辑器使用手册，来源于掘金

<!-- more -->

### 用掘金－Markdown 编辑器写文章

欢迎使用 掘金－Markdown 编辑器撰写技术文章，只专注于内容和技术，不再费心排版的问题。这是一份简要的 Markdown 引导指南，希望可以帮助您顺利的开始使用 Markdown 编辑器。

### 丰富的快捷键

本 Markdown 编辑器支持丰富的格式快捷键，可以非常便捷、轻松的使用 Markdown 语言，形成优美的排版和内容格式。

支持的快捷键有：

* 加粗： `Ctrl/Cmd + B`
* 标题： `Ctrl/Cmd + H`
* 插入链接： `Ctrl/Cmd + K`
* 插入代码： `Ctrl/Cmd + Shift + C`
* 行内代码： `Ctrl/Cmd + Shift + K`
* 插入图片： `Ctrl/Cmd + Shift + I`
* 无序列表： `Ctrl/Cmd + Shift + L`
* 撤销： `Ctrl/Cmd + Z`

### 常用语法

#### 标题

> 语法格式：** '#'+'空格'+'文本' **

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

#### 列表

> 无序列表语法格式：** '-' + '空格' ＋ '文本' **

- 文本一
- 文本二
- 文本三

> 有序列表语法格式：** '数字' + '.' + '空格' + '文本' **

1. 文本一
2. 文本二
3. 文本三

> 任务列表语法格式：** '-' + '空格' + '[ ]' + '文本' **

- [x] 文本一
- [ ] 文本二
- [ ] 文本三

#### 链接和图片

在 Markdown 中插入链接不需要其他按钮，你只需要使用`［显示文本］(链接地址)`这样的格式语法即可。例如：
[稀土掘金](https://gold.xitu.io)
插入图片的语法与插入链接的语法很像，只是前面多了一个 `!`.语法如下：
`![图片的标注](图片链接地址)`

#### 引用

> 语法：** '>'+'空格'+'文本' **


例如：

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。

#### 代码

如下是代码段的语法：

<pre>
```编程语言
 这是代码段
```
</pre>

例如：

``` python
def bubbleSort(alist):
 for passnum in range(len(alist)-1,0,-1):
 #print alist,passnum
 for i in range(passnum):
 if alist[i]>alist[i+1]:
 temp = alist[i]
 alist[i] = alist[i+1]
 alist[i+1] = temp
 return alist
```

#### 表格

**Markdown　Extra**　表格语法：

项目 | 价格
-------- | ---
iPhone | $560
iPad | $780
iMac | $1000

可以使用冒号来定义对齐方式：

| 项目 | 价格 | 数量 |
| :-------- | --------:| :--: |
| iPhone | 6000 元 | 5 |
| iPad | 3800 元 | 12 |
| iMac | 10000 元 | 234 |


#### 结语

以上是最常见的 Markdown 的语法和格式，如果你还希望深入的学习 Markdown，可以参考这里[Markdown语法](https://www.appinn.com/markdown/)，非常感谢使用** 掘金－Markdown 编辑器**,希望为您提供舒适的写作体验。

