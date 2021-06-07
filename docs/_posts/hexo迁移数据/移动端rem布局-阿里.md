---
title: 移动端rem布局-阿里
date: 2021-06-05 16:06:21
permalink: /pages/de97d6/
categories: 
  - hexo迁移数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
---
title: 移动端rem布局(阿里)
date: 2017-05-07 17:42:14
tags: 移动端 rem
---
一直在用阿里的flexible布局，但是从来没总结过，今天看到一篇总结的不错就搬过来记录下。
<!--more-->

使用起来很简单，把下面的js直接引入就好了  
https://github.com/amfe/lib-flexible  

## 代码原理  


这是阿里团队的高清方案布局，所谓高清方案就是根据设备屏幕的DPR（设备像素比，又称DPPX，比如dpr=2时，表示一个css像素由四个物理像素点组成。）  
动态设置html的font-size，同时根据设备的DPR调整页面的缩放值，进而达到效果。 


## 有何优势  

引用简单，布局简单  
根据设备屏幕的DPR，自动设置最合适的高清缩放。  
保证了不同设备下的视觉体验的一致性。  
有效解决移动端真实1px问题（这里的1px时设备屏幕下的物理像素）  

## 如何使用  

重要的事情说三遍！
绝不是每个地方都要用rem，rem只适用于固定尺寸！
绝不是每个地方都要用rem，rem只适用于固定尺寸！
绝不是每个地方都要用rem，rem只适用于固定尺寸！  

在相当数量的布局情境中（比如底部导航元素平分屏幕宽，大尺寸元素），你必须使用百分比或者flex才能完美布局！  

此方案也是默认 1rem = 100px，所以你布局的时候，完全可以按照设计师给你的效果图写各种尺寸啦。
比如你在效果图上量取的某个按钮元素长 55px, 宽37px ，那你直接可以这样写样式：

	.myBtn {
	   width: 0.55rem;
	   height: 0.37rem;
	}

## 常见问题说明  
1. 为啥手机网页效果图宽度是要640或者750的，我非得弄个666的不行咩？  
答：老实说当然可以，不过为了规范，640或者750是相对合适的。
拿Iphone 5s 举例，它的css像素宽度是320px，由于它的dpr=2，所以它的物理像素宽度为320 × 2 = 640px，这也就是为什么，你在5s上截了一张图，在电脑上打开，它的原始宽度是640px的原因。
那 iphone 6 的截图宽度呢？ 375 × 2 = 750
那 iphone 6 sp 的截图宽度呢？ 414 × 3 = 1242
以此类推，你现在能明白效果图为什么一般是 640 ，750 甚至是 1242 的原因了么？（真没有歧视安卓机的意思。。。）  
2. 宽度用rem写的情况下， 在 iphone6 上没问题， 在 iphone5上会有横向滚动条，何解？  
答：假设你的效果图宽度是750，在这个效果图上可能有一个宽度为7rem（高清方案默认 1rem = 100px）的元素。我们知道，高清方案的特点就是几乎完美还原效果图，也就是说，你写了一个宽度为 7rem 的元素，那么在目前主流移动设备上都是7rem。然而，iphone 5 的宽度为640，也就是6.4rem。于是横向滚动条不可避免的出现了。
怎么办呢？ 这是我目前推荐的比较安全的方式：如果元素的宽度超过效果图宽度的一半（效果图宽为640或750），果断使用百分比宽度，或者flex布局。就像把等屏宽的图片宽度设为100%一样。  
3. 不是 1rem = 100px吗，为什么我的代码写了一个宽度为3rem的元素，在电脑端的谷歌浏览器上宽度只有150px?  
答：先说高清方案代码，再次强调咱们的高清方案代码是根据设备的dpr动态设置html 的 font-size，
如果dpr=1(如电脑端），则html的font-size为50px，此时 1rem = 50px
如果dpr=2(如iphone 5 和 6），则html的font-size为100px，此时 1rem = 100px
如果dpr=3(如iphone 6 sp），则html的font-size为150px，此时 1rem = 150px
如果dpr为其他值，即便不是整数，如3.4 , 也是一样直接将dpr 乘以 50 。  
再来说说效果图，一般来讲，我们的效果图宽度要么是640，要么是750，无论哪一个，它们对应设备的dpr=2，此时，1 rem = 50 × 2 = 100px。这也就是为什么高清方案默认1rem = 100px。而将1rem默认100px也是好处多多，可以帮你快速换算单位，比如在750宽度下的效果图，某元素宽度为53px，那么css宽度直接设为53/100=0.53rem了。  
然而极少情况下，有设计师将效果图宽定为1242px，因为他手里只有一个iphone 6 sp (dpr = 3)，设计完效果图刚好可以在他的iphone 6 sp里查看调整。一切完毕之后，他将这个效果图交给你来切图。由于这个效果图对应设备的dpr=3，也就是1rem = 50 × 3 = 150px。所以如果你量取了一个宽度为90px的元素，它的css宽度应该为 90/150=0.6rem。由于咱们的高清方案默认1rem=100px，为了还原效果图，你需要这样换算。当然，一个技巧就是你可以直接修改咱们的高清方案的默认设置。在代码的最后 你会看到 flex(100, 1) ，将其修改成flex(66.66667, 1)就不用那么麻烦的换算了，此时那个90px的直接写成0.9rem就可以了。  
4. 高清方案在微信上，有时候字体会不受控制变的很大，怎么办？  
https://github.com/ant-design/ant-design-mobile/issues/732  

问题原因：  
在X5新内核Blink中，在排版页面的时候，会主动对字体进行放大，会检测页面中的主字体，当某一块字体在
我们的判定规则中，认为字号较小，并且是页面中的主要字体，就会采取主动放大的操作。然而这不是我们想要的，可以采取给最大高度解决    

后续：经过项目实践，还是决定给 max-height 一个具体数值比较好，之前给的是 100% ，但有自身的局限性，比如 antd 的轮播组件在 max-height:100% 的情况下就不能正常显示。  
5. 我在底部导航用的flex感觉更合适一些，请问这样子混着用可以吗？  
咱们的rem适合写固定尺寸。其余的根据需要换成flex或者百分比。源码示例中就有这三种的综合运用。  
6. 在高清方案下，一个标准的，较为理想的宽度为640的页面效果图应该是怎样的？  

![参考布局](http://cdn.attach.qdfuns.com/notes/pics/201705/05/165046bsdbcb1frrhfnbpp.png)  

7. 源码：  
	'use strict';

	/**
	 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
	 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
	 */
	const win = window;
	export default win.flex = (baseFontSize, fontscale) => {
	  const _baseFontSize = baseFontSize || 100;
	  const _fontscale = fontscale || 1;

	  const doc = win.document;
	  const ua = navigator.userAgent;
	  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
	  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
	  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
	  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
	  let dpr = win.devicePixelRatio || 1;
	  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
	    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
	    dpr = 1;
	  }
	  const scale = 1 / dpr;

	  let metaEl = doc.querySelector('meta[name="viewport"]');
	  if (!metaEl) {
	    metaEl = doc.createElement('meta');
	    metaEl.setAttribute('name', 'viewport');
	    doc.head.appendChild(metaEl);
	  }
	  metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
	  doc.documentElement.style.fontSize = `${_baseFontSize / 2 * dpr * _fontscale}px`;
	};  


demo：  

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Title</title>

	    <!-- 阿里高清方案 -->
	    <script>!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),l=o.match(/U3\/((\d+|\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector('meta[name="viewport"]');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);
	    flex(100, 1);</script>
	    <!-- 字形图标 -->
	    <script src="https://use.fontawesome.com/f47f4563cb.js"></script>
	    <style>
	        * {
	            box-sizing: border-box;
	        }

	        *:before, *:after {
	            box-sizing: border-box;
	        }

	        *, *:before, *:after {
	            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	        }

	        html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {
	            border: 0 none;
	            font-size: inherit;
	            color: inherit;
	            margin: 0;
	            padding: 0;
	            vertical-align: baseline;

	            /* 在X5新内核Blink中，在排版页面的时候，会主动对字体进行放大，会检测页面中的主字体，当某一块字体在我们的判定规则中，认为字号较小，并且是页面中的主要字体，就会采取主动放大的操作。然而这不是我们想要的，可以采取给最大高度解决 */
	            max-height: 100000px;
	        }

	        h1, h2, h3, h4, h5, h6 {
	            font-weight: normal;
	        }

	        em, strong {
	            font-style: normal;
	        }

	        ul, ol, li {
	            list-style: none;
	        }

	        body {
	            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
	            line-height: 1.5;
	            color: #333;
	            background-color: #f2f2f2;
	            font-size: 0.24rem;
	        }

	        a {
	            text-decoration: none;
	        }
	        .box {
	            position: relative;
	            max-width: 10rem;
	            margin: 0 auto;
	        }

	        .navRoot {
	            position: fixed;
	            z-index: 50;
	            bottom: 0;
	            left:0;
	            width: 100%;
	            height: 1rem;
	            display: -webkit-box;
	            display: -ms-flexbox;
	            display: flex;
	            border-top: 0.01rem solid #ccc;
	            background:#f2f2f2;
	        }

	        .navLink {
	            font-size: 0.42rem;
	            -webkit-box-flex: 1;
	            -ms-flex: auto;
	            flex: auto;
	            display: -webkit-box;
	            display: -ms-flexbox;
	            display: flex;
	            -webkit-box-orient: vertical;
	            -webkit-box-direction: normal;
	            -ms-flex-direction: column;
	            flex-direction: column;
	            -ms-flex-wrap: wrap;
	            flex-wrap: wrap;
	            -webkit-box-pack: center;
	            -ms-flex-pack: center;
	            justify-content: center;
	            -webkit-box-align: center;
	            -ms-flex-align: center;
	            align-items: center;
	            line-height: 1;
	            color: #666;
	        }
	        .navLink.active {
	            color: #1abc9c
	        }
	        .navLinkIco {
	            display: block;
	            margin-bottom: 0.1rem;
	        }

	        .navLinkText {
	            display: block;
	            line-height: 1;
	            font-size: 0.24rem;
	        }

	        .img-responsive {
	            width: 100%;
	        }
	    </style>
	</head>
	<body>

	<div class="box">
	   <div class="box-content">
	    <img src="http://temp.im/640x260/444/fff" class="img-responsive">
	    <ul style="font-size:0.3rem; padding: 0.2rem">
	        <li style="font-size:0.4rem"><a href="http://www.jianshu.com/p/985d26b40199">rem布局（进阶版）的一些说明</a></li>
	        <li>1，大家先把这个页面在不同设备模式下浏览下，感受下。</li>
	        <li>2，一般来说我们的手机端效果图是640px或750px。</li>
	        <li>3，对于上图这类需要等屏宽的图片，只需让其宽度设为 100% 即可。</li>
	        <li>4，该布局方案要求凡是涉及尺寸的，单位都是rem，比如，height width margin paddint top border-radius 等等。你只需要按照效果图上标注的尺寸布局即可。</li>
	    </ul>

	   </div>
	    <div class="navRoot">
	        <a href="#" class="navLink active">
	            <i class="fa fa-home navLinkIco" aria-hidden="true"></i>
	            <span class="navLinkText">首页</span>
	        </a>
	        <a href="#" class="navLink">
	            <i class="fa fa-home navLinkIco" aria-hidden="true"></i>
	            <span class="navLinkText">好店</span>
	        </a>
	        <a href="#" class="navLink">
	            <i class="fa fa-home navLinkIco" aria-hidden="true"></i>
	            <span class="navLinkText">简单</span>
	        </a>
	        <a href="#" class="navLink">
	            <i class="fa fa-home navLinkIco" aria-hidden="true"></i>
	            <span class="navLinkText">复杂</span>
	        </a>
	        <a href="#" class="navLink">
	            <i class="fa fa-home navLinkIco" aria-hidden="true"></i>
	            <span class="navLinkText">异步</span>
	        </a>
	    </div>
	</div>

	</body>
	</html>  


参考： http://www.jianshu.com/p/985d26b40199  
http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html  

