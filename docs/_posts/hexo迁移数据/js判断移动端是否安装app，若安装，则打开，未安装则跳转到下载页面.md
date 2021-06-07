---
title: js判断移动端是否安装app，若安装，则打开，未安装则跳转到下载页面
date: 2021-06-05 16:06:21
permalink: /pages/1bf7e8/
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
title: js判断移动端是否安装app，若安装，则打开，未安装则跳转到下载页面
date: 2017-04-19 17:29:48
categories:
tags: js
---

近期公司需要针对分享流程进行优化，其中一点就是前端H5检测是否安装应用，来进行不同的判断（下载或直接跳转到app中）。原理很简单：创建一个iframe去打开uri。如果打开app成功网页进入后台，再切换回来时间会超过2.5s。利用时间去检测。下面来看具体实现过程：

<!--more-->
## 你可能会遇到的问题

* 什么是uri，获取uri需要哪些帮助？
* 安卓中应用切换到后台， 计时器仍会不断运行有什么解决方法？
* 微信中不支持第三方uri,下载应用。怎么解决来完成跳转到自身app。

## uri获取

这里的uri,指得就是通过 Url scheme 来实现的H5与安卓、苹果应用之间的跳转链接。

我们需要找到客户端的同事，来获取如下格式的链接。

    xx://'跳转页面'/'携带参数'

url 就是我们平常理解的链接。
scheme 是指url链接中的最初位置，就是上边链接中 ‘xx’的位置。
详细介绍可以看这里：https://sspai.com/post/31500

用这个链接我们可以跳转到 应用中的某个页面,并可以携带一定的参数。这个是我们实现这个功能的前提哟。

## 具体实现

### 第一步：通过iframe打开App

    Android平台则各个app厂商差异很大，比如Chrome从25及以后就不再支持通过js触发（非用户点击），所以这里使用iframe src地址等来触发scheme。

    //在iframe 中打开APP
    var ifr = document.createElement('iframe');
    ifr.src = openUrl;
    ifr.style.display = 'none';

### 第二步：判断是否安装某应用

    原理：若通过url scheme 打开app成功，那么当前h5会进入后台，通过计时器会有明显延迟。利用时间来判断。

    //检查app是否打开
    function checkOpen(cb){
        var _clickTime = +(new Date());
        function check(elsTime) {
            if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
                cb(1);
            } else {
                cb(0);
            }
        }
        //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
        var _count = 0, intHandle;
        intHandle = setInterval(function(){
            _count++;        
            var elsTime = +(new Date()) - _clickTime;
            if (_count>=100 || elsTime > 3000 ) {
                clearInterval(intHandle);
                check(elsTime);
            }
        }, 20);
    }

注意：
    * 由于安卓手机,页面进入后台，定时器setTimeout仍会不断运行，所以这里使用setInterval,较小间隔时间重复多次。来根据累计时间判断
    * cb为回调函数，根据返回0 or 1来判断是否安装。
    * document.hidden对大于4.4webview支持很好，为页面可见性api。

### 第三步：微信中实现打开or下载应用效果

    这里使用的是应用宝微链接实现。

    if (callback) {
      //客户端检测微信直接跳应用宝链接
      var browser = BrowserInfo();
      //使用微链接
      var encodeUri = encodeURIComponent('你的uri');

      if (browser.isWeixin) {
        window.location.href = '你的微链url&android_schema='+encodeUri;
      
      }else{
        checkOpen(function(opened){
            callback && callback(opened);
        });
     
      }
    }

注意点：
    * 微链接是应用宝提供的，可以在后台获取。
    * 使用微链接必须做encodeURIComponent转义。
    * 链接地址在微链接后拼接一个android_schema参数加你的uri。

完整函数：


    export const openApp = function(openUrl, callback) {
        //检查app是否打开
        function checkOpen(cb){
            var _clickTime = +(new Date());
            function check(elsTime) {
                if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
                    cb(1);
                } else {
                    cb(0);
                }
            }
            //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
            var _count = 0, intHandle;
            intHandle = setInterval(function(){
                _count++;        
                var elsTime = +(new Date()) - _clickTime;
                if (_count>=100 || elsTime > 3000 ) {
                    clearInterval(intHandle);
                    check(elsTime);
                }
            }, 20);
        }
       
        //在iframe 中打开APP
        var ifr = document.createElement('iframe');
        ifr.src = openUrl;
        ifr.style.display = 'none';

        if (callback) {
          //客户端检测微信直接跳应用宝链接
          var browser = BrowserInfo();
          //使用微链接
          var encodeUri = encodeURIComponent(openUrl);

          if (browser.isWeixin) {
            window.location.href = '你的微链url&android_schema='+encodeUri;
          }else{
            checkOpen(function(opened){
                callback && callback(opened);
            });
         
          }
        }
        
        document.body.appendChild(ifr);      
        setTimeout(function() {
            document.body.removeChild(ifr);
        }, 2000);  

    }


其他：
    函数中调用的BrowserInfo是一个简单的客户端检测。具体如下：

    /**
     * 客户端检测
     */
    export const BrowserInfo = function() {
      var json = {
        userAgent: navigator.userAgent.toLowerCase(),
        isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
        isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
        isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
        isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
      }
      
      return json;
    }

回调函数的使用：

    页面中可以通过传递回调函数，来获取返回值；并通过是否传这个参数来做进入页面检测。









    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="initial-scale=1.0,user-scalable=no">
        <title>Js判定移动端是否安装app,若已安装，则打开，未安装则跳转到下载页面</title>
        <meta name='apple-itunes-app' content='app-id=1221201728'>
    </head>
    <body>
        <a href="javascript:;" id="openApp">点击打开安装app</a>
    </body>
    </html>
    <script type="text/javascript">
        document.getElementById('openApp').onclick = function(e){
            
            if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))
               {
                window.location.href = "com.baidu.tieba://";//ios app协议(如：com.baidu.tieba://)
                window.setTimeout(function() {
                    window.location.href = "https://itunes.apple.com/cn/app/id477927812"; //跳转到App store
                }, 2000)
               }
            if(navigator.userAgent.match(/android/i))
            {
                window.location.href = "com.baidu.tieba://app";//android app协议(如：com.baidu.tieba://app)
                window.setTimeout(function() {
                    window.location.href = "https://****.apk";//android 下载地址
                }, 2000)    
            }
        };
    </script>



