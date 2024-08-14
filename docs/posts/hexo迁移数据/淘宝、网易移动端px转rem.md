---
title: 淘宝、网易移动端px转rem
date: 2017-06-06 16:06:21
permalink: /pages/7d84a3/
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

# 网易转换 rem 分析

首先网易的设计稿是基于 iPhone5 设计的也就是宽度 640px。（先不考虑 dpr 的问题下面会说）然后设置 1rem 等于 100px（ HTML font-size 为 100px），相当于 6.4rem = 100%宽度 = 设备的宽度。

由于是基于 6.4rem 开发。iPhone5 的物理像素是 320px（dpr 是 2.0），如果此时还想让 6.4rem 等于设备宽度只能调整 1rem 对应 font-size 的比例， 320 / 6.4 = 50 让 1rem=50px 就可以实现。如果想让 iPhone6 适配只需要 1rem = （375 / 6.4） = 58.59375px 就可以实现 iPhone6 的适配，这个方法可以适配市面上绝大多数的移动端设备。

只需要加下面这句话可以实现我上述效果。

```
document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
```

# 淘宝转换 rem 分析

这次咱们还是拿 iPhone5（640px）的设计稿举例，淘宝的思想是无论当前页面多宽，让 10rem = 页面宽度 = 100%，所以 1rem = 64px 然后通过 dpr 设置缩放整个页面，以达到高保真的效果。

iPhone5 的宽度是 640px，页面最终完成效果也是 640px，iPhone 的 dpr 是 2，所以设置 <meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"> 就可以了适配 iPhone5 了。当然这些东西 lib-flexible 都帮我们做好了。我只不过说一下，让好奇的小伙伴知道原理。

## Vue-cli 配合 lib-flexible 实现移动端自适应布局

```
cnpm intall lib-flexible  // 安装lib-flexible
import 'lib-flexible'     // 在 src\main.js 中引入 lib-flexible
```

完成上面代码就相当于实现了 rem 动态计算了，如果此时在 iPhone5 上有一个元素是宽 150px，高是 200px，想计算 rem 宽是 150/64 = 2.34375rem，高是 200/64 = 3.125rem。

至于 dpr 的缩放问题,那个就不用关心了。lib-flexible 已经帮你做好了。你只需要关心 dpr 转换 rem 即可。

## 使用 px2rem-loader 自动将 px 转换 rem

```
cnpm intall px2rem-loader  // 安装px2rem-loader
```

在 build\utils.js 修改成下面的代码。

```
 // 在 cssLoaders 方法内添加下列代码
  const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 64 //设计稿宽度/10
    }
  // 将 cssLoaders 方法内的generateLoaders的方法内的 loaders 变量添加 px2remLoader
  const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader, lessLoader ] : [cssLoader, px2remLoader, lessLoader ]
```

转：https://juejin.im/post/5afba3c5f265da0b9e653b6c
