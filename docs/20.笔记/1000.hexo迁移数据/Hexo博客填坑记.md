---
title: Hexo博客填坑记
date: 2015-03-06 21:59:34
categories: null
permalink: /pages/d1795f/
author:
  name: 神族九帝
  link: https://github.com/wu529778790
  permalink: null
  categories: null
sidebar: auto
tags:
  -
---

> 博客搭建的流程这里就不多说了，都是各种填坑吧，网上的教程数不胜数，但是都是千篇一律，这里主要写下我自己的填坑过程吧。  
> ps：本人不是文科生，也不是什么作家，写作水平有限，就是简单的当个日记，记录下曾经填过的坑！

<!-- more -->

## hexo 在 hexo 上面的托管

> 刚开始在本地搭建博客之后，是直接托管到 hexo 上面的，但是由于博客多了在 github 上面的文件越来越多，不便于管理，所以要在创建一个分支，专门用来托管 hexo 的配置文件，这样就算是换了电脑，也可以进行 clone 操作，直接操作我们的博客了。

> Hexo 部署到 GitHub 上的文件，是.md（你的博文）转化之后的.html（静态网页）。因此，当你重装电脑或者想在不同电脑上修改博客时，就不可能了（除非你自己写 html o(^▽^)o ）。
> 其实，Hexo 生成的网站文件中有.gitignore 文件，因此它的本意也是想我们将 Hexo 生成的网站文件存放到 GitHub 上进行管理的。这样，不仅解决了上述的问题，还可以通过 git 的版本控制追踪你的博文的修改过程，是极赞的。　　　　　  
> 但是，如果每一个 GitHub Pages 都需要创建一个额外的仓库来存放 Hexo 网站文件，我感觉很麻烦。  
> 所以，我利用了分支！！！
> 简单地说，每个想建立 GitHub Pages 的仓库，起码有两个分支，一个用来存放 Hexo 网站的文件，一个用来发布网站。
> 下面以我的博客作为例子详细地讲述。

## 我的博客搭建流程

#### 本地搭建流程

首先确定你的电脑上安装了 Node.js 和 git，然后用 npm 进行安装 hexo

    $ npm install -g hexo-cli

下面就是建站了：

    $ hexo init
    $ npm install
    $ hexo generate
    $ hexo server

现在打开本地的 localhost:4000 就可以看到 hexo 的界面了。

#### github 网站流程

1,创建仓库，wu529778790.github.io；  
2,创建两个分支：master 与 hexo；  
3,设置 hexo 为默认分支（因为我们只需要手动管理这个分支上的 Hexo 网站文件）；  
4,使用 git clone git@github.com:wu529778790/wu529778790.github.io.git 拷贝仓库；  
5,在本地 wu529778790.github.io 文件夹下通过 Git bash 依次执行 npm install hexo、hexo init、npm install 和 npm install hexo-deployer-git（此时当前分支应显示为 hexo）;  
6,修改\_config.yml 中的 deploy 参数，分支应为 master；  
7,依次执行 git add .、git commit -m “…”、git push origin hexo 提交网站相关的文件；  
8,执行 hexo generate -d 生成网站并部署到 GitHub 上。  
9,这样一来，在 GitHub 上的 wu529778790.github.io 仓库就有两个分支，一个 hexo 分支用来存放网站的原始文件，一个 master 分支用来存放生成的静态网页。完美( •̀ ω •́ )y！

### 填坑记录

首先是没有安装 git 部署的插件

    $ npm install hexo-deployer-git --save

然后执行下面的指令即可完成部署

    $ hexo generate
    $ hexo deploy

最后要说的是 git 提交的时候遇见的问题了，不得不总结一下，这次的坑太大，当天应是没解决。提交 hexo 分支到 github 上的时候一直报错，百度了各种解决办法还是不行，按照下面的办法终于实现了把配置上传到 hexo 分支，而自己的文章页面在 master 分支。

    git remote add origin git@github.com:wu529778790/wu529778790.github.io.git
    git add *
    git push origin hexo

好了，此次博客就更新到这吧，感觉也没人可以看懂吧，就是我自己的笔记，啥时候忘了自己来看看，O(∩_∩)O 哈哈~
