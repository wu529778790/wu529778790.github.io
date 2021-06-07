---
title: css规范总结
date: 2021-06-05 16:06:21
permalink: /pages/13dbe4/
categories:
  - hexo迁移数据
tags:
  - null
author:
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
---

### CSS 文件的分类和引用顺序

通常，一个项目我们只引用一个 CSS，但是对于较大的项目，我们需要把 CSS 文件进行分类。

我们按照 CSS 的性质和用途，将 CSS 文件分成“公共型样式”、“特殊型样式”、“皮肤型样式”，并以此顺序引用（按需求决定是否添加版本号）。

<!-- more -->

1.公共型样式：包括了以下几个部分：“标签的重置和设置默认值”、“统一调用背景图和清除浮动或其他需统一处理的长样式”、“网站通用布局”、“通用模块和其扩展”、“元件和其扩展”、“功能类样式”、“皮肤类样式”。

2.特殊型样式：当某个栏目或页面的样式与网站整体差异较大或者维护率较高时，可以独立引用一个样式：“特殊的布局、模块和元件及扩展”、“特殊的功能、颜色和背景”，也可以是某个大型控件或模块的独立样式。

3.皮肤型样式：如果产品需要换肤功能，那么我们需要将颜色、背景等抽离出来放在这里。

### CSS 内部的分类及其顺序

1.重置（reset）和默认（base）（tags）：消除默认样式和浏览器差异，并设置部分标签的初始样式，以减少后面的重复劳动！你可以根据你的网站需求设置！

2.统一处理：建议在这个位置统一调用背景图（这里指多个布局或模块或元件共用的图）和清除浮动（这里指通用性较高的布局、模块、元件内的清除）等统一设置处理的样式！

3.布局（grid）（.g-）：将页面分割为几个大块，通常有头部、主体、主栏、侧栏、尾部等！

4.模块（module）（.m-）：通常是一个语义化的可以重复使用的较大的整体！比如导航、登录、注册、各种列表、评论、搜索等！

5.元件（unit）（.u-）：通常是一个不可再分的较为小巧的个体，通常被重复用于各种模块中！比如按钮、输入框、loading、图标等！

6.功能（function）（.f-）：为方便一些常用样式的使用，我们将这些使用率较高的样式剥离出来，按需使用，通常这些选择器具有固定样式表现，比如清除浮动等！不可滥用！

7.皮肤（skin）（.s-）：如果你需要把皮肤型的样式抽离出来，通常为文字色、背景色（图）、边框色等，非换肤型网站通常只提取文字色！非换肤型网站不可滥用此类！

8.状态（.z-）：为状态类样式加入前缀，统一标识，方便识别，她只能组合使用或作为后代出现（.u-ipt.z-dis{}，.m-list li.z-sel{}），具体详见命名规则的扩展相关项。

    全局：global.css

全局样式为全站公用，为页面样式基础，页面中必须包含。

    结构：layout.css

页面结构类型复杂，并且公用类型较多时使用。多用在首页级页面和产品类页面中。

    私有：style.css

独立页面所使用的样式文件，页面中必须包含。

    模块 module.css

产品类页面应用，将可复用类模块进行剥离后，可与其它样式配合使用。

    主题 themes.css

实现换肤功能时应用。

    补丁 mend.css

功能类和皮肤类样式为表现化的样式，请不要滥用！以上顺序可以按需求适当调整。

    /* 重置 */
    div,p,ul,ol,li{margin:0;padding:0;}
    /* 默认 */
    strong,em{font-style:normal;font-weight:bold;}
    /* 统一调用背景图 */
    .m-logo a,.m-nav a,.m-nav em{background:url(images/sprite.png) no-repeat 9999px 9999px;}
    /* 统一清除浮动 */
    .g-bdc:after,.m-dimg ul:after,.u-tab:after{display:block;visibility:hidden;clear:both;height:0;overflow:hidden;content:'.';}
    .g-bdc,.m-dimg ul,.u-tab{zoom:1;}
    /* 布局 */
    .g-sd{float:left;width:300px;}
    /* 模块 */
    .m-logo{width:200px;height:50px;}
    /* 元件 */
    .u-btn{height:20px;border:1px solid #333;}
    /* 功能 */
    .f-tac{text-align:center;}
    /* 皮肤 */
    .s-fc,a.s-fc:hover{color:#fff;}

### 选择器顺序

请综合考虑以下顺序依据：

- 从大到小（以选择器的范围为准）
- 从低到高（以等级上的高低为准）
- 从先到后（以结构上的先后为准）
- 从父到子（以结构上的嵌套为准）

以下仅为简单示范：

    /* 从大到小 */
    .m-list p{margin:0;padding:0;}
    .m-list p.part{margin:1px;padding:1px;}
    /* 从低到高 */
    .m-logo a{color:#f00;}
    .m-logo a:hover{color:#fff;}
    /* 从先到后 */
    .g-hd{height:60px;}
    .g-bd{height:60px;}
    .g-ft{height:60px;}
    /* 从父到子 */
    .m-list{width:300px;}
    .m-list .itm{float:left;}

### 最佳选择器写法（模块）

```css
/* 这是某个模块 */
.m-nav {
} /* 模块容器 */
.m-nav li,
.m-nav a {
} /* 先共性  优化组合 */
.m-nav li {
} /* 后个性  语义化标签选择器 */
.m-nav a {
} /* 后个性中的共性 按结构顺序 */
.m-nav a.a1 {
} /* 后个性中的个性 */
.m-nav a.a2 {
} /* 后个性中的个性 */
.m-nav .z-crt a {
} /* 交互状态变化 */
.m-nav .z-crt a.a1 {
}
.m-nav .z-crt a.a2 {
}
.m-nav .btn {
} /* 典型后代选择器 */
.m-nav .btn-1 {
} /* 典型后代选择器扩展 */
.m-nav .btn-dis {
} /* 典型后代选择器扩展（状态） */
.m-nav .btn.z-dis {
} /* 作用同上，请二选一（如果可以不兼容IE6时使用） */
.m-nav .m-sch {
} /* 控制内部其他模块位置 */
.m-nav .u-sel {
} /* 控制内部其他元件位置 */
.m-nav-1 {
} /* 模块扩展 */
.m-nav-1 li {
}
.m-nav-dis {
} /* 模块扩展（状态） */
.m-nav.z-dis {
} /* 作用同上，请二选一（如果可以不兼容IE6时使用） */
```

### 统一语义理解和命名

#### 布局（.g-）

    语义	命名	简写
    文档	doc	doc
    头部	head	hd
    主体	body	bd
    尾部	foot	ft
    主栏	main	mn
    主栏子容器	mainc	mnc
    侧栏	side	sd
    侧栏子容器	sidec	sdc
    盒容器	wrap/box	wrap/box

#### 模块（.m-）、元件（.u-）

    语义	命名	简写
    导航	nav	nav
    子导航	subnav	snav
    面包屑	crumb	crm
    菜单	menu	menu
    选项卡	tab	tab
    标题区	head/title	hd/tt
    内容区	body/content	bd/ct
    列表	list	lst
    表格	table	tb
    表单	form	fm
    热点	hot	hot
    排行	top	top
    登录	login	log
    标志	logo	logo
    广告	advertise	ad
    搜索	search	sch
    幻灯	slide	sld
    提示	tips	tips
    帮助	help	help
    新闻	news	news
    下载	download	dld
    注册	regist	reg
    投票	vote	vote
    版权	copyright	cprt
    结果	result	rst
    标题	title	tt
    按钮	button	btn
    输入	input	ipt

#### 功能（.f-）

    语义	命名	简写
    浮动清除	clearboth	cb
    向左浮动	floatleft	fl
    向右浮动	floatright	fr
    内联块级	inlineblock	ib
    文本居中	textaligncenter	tac
    文本居右	textalignright	tar
    文本居左	textalignleft	tal
    垂直居中	verticalalignmiddle	vam
    溢出隐藏	overflowhidden	oh
    完全消失	displaynone	dn
    字体大小	fontsize	fs
    字体粗细	fontweight	fw
    皮肤（.s-）
    语义	命名	简写
    字体颜色	fontcolor	fc
    背景	background	bg
    背景颜色	backgroundcolor	bgc
    背景图片	backgroundimage	bgi
    背景定位	backgroundposition	bgp
    边框颜色	bordercolor	bdc

#### 状态（.z-）

    语义	命名	简写
    选中	selected	sel
    当前	current	crt
    显示	show	show
    隐藏	hide	hide
    打开	open	open
    关闭	close	close
    出错	error	err
    不可用	disabled	dis

### CSS 命名规范(规则)常用的 CSS 命名规则

    　　头：header
    　　内容：content/container
    　　尾：footer
    　　导航：nav
    　　侧栏：sidebar
    　　栏目：column
    　　页面外围控制整体佈局宽度：wrapper
    　　左右中：left right center
    　　登录条：loginbar
    　　标志：logo
    　　广告：banner
    　　页面主体：main
    　　热点：hot
    　　新闻：news
    　　下载：download
    　　子导航：subnav
    　　菜单：menu
    　　子菜单：submenu
    　　搜索：search
    　　友情链接：friendlink
    　　页脚：footer
    　　版权：copyright
    　　滚动：scroll
    　　内容：content
    　　标签：tags
    　　文章列表：list
    　　提示信息：msg
    　　小技巧：tips
    　　栏目标题：title
    　　加入：joinus
    　　指南：guide
    　　服务：service
    　　注册：regsiter
    　　状态：status
    　　投票：vote
    　　合作伙伴：partner

#### 注释的写法:

    　　/* Header */
    　　内容区
    　　/* End Header */

#### Id 的命名:

##### 1)页面结构

    　　容器: container
    　　页头：header
    　　内容：content/container
    　　页面主体：main
    　　页尾：footer
    　　导航：nav
    　　侧栏：sidebar
    　　栏目：column
    　　页面外围控制整体佈局宽度：wrapper
    　　左右中：left right center

##### (2)导航

    　　导航：nav
    　　主导航：mainnav
    　　子导航：subnav
    　　顶导航：topnav
    　　边导航：sidebar
    　　左导航：leftsidebar
    　　右导航：rightsidebar
    　　菜单：menu
    　　子菜单：submenu
    　　标题: title
    　　摘要: summary

##### (3)功能

    　　标志：logo
    　　广告：banner
    　　登陆：login
    　　登录条：loginbar
    　　注册：register
    　　搜索：search
    　　功能区：shop
    　　标题：title
    　　加入：joinus
    　　状态：status
    　　按钮：btn
    　　滚动：scroll
    　　标籤页：tab
    　　文章列表：list
    　　提示信息：msg
    　　当前的: current
    　　小技巧：tips
    　　图标: icon
    　　注释：note
    　　指南：guild
    　　服务：service
    　　热点：hot
    　　新闻：news
    　　下载：download
    　　投票：vote
    　　合作伙伴：partner
    　　友情链接：link
    　　版权：copyright

#### CSS 样式表文件命名

    　　主要的 master.css
    　　模块 module.css
    　　基本共用 base.css
    　　布局、版面 layout.css
    　　主题 themes.css
    　　专栏 columns.css
    　　文字 font.css
    　　表单 forms.css
    　　补丁 mend.css
    　　打印 print.css
