---
title: js轮播图透明度切换
date: 2021-06-05 16:06:21
permalink: /pages/e90101/
categories: 
  - hexo迁移数据
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
  permalink: null
  categories: null
sidebar: auto
---
title: js轮播图透明度切换
date: 2016-04-25 10:22:16
tags: js
---

js轮播图透明度切换（带上下页和底部圆点切换）

<!--more-->

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>js轮播图透明度切换</title>
        <style type="text/css">
            * {
                margin: 0;
                padding: 0;
                border: none;
            }
            li {
                list-style: none;
            }
            #box {
                height: 340px;
                width: 790px;
                position: relative;
                margin: 100px auto;
            }
            #box #list1 {
                height: 340px;
                width: 790px;
            }
            #box #list1 li {
                position: absolute;
                font-size: 80px;
                text-align: center;
                height: 340px;
                width: 790px;
                left: 0;
                top: 0;
                opacity: 0;
                filter: alpha(opacity=0);
            }
            #box #list1 li img {
                height: 340px;
                width: 790px;
            }
            #shang,#xia {
                height: 80px;
                width: 50px;
                color: #212121;
                background: #ccc;
                font-size: 60px;
                font-weight: bold;
                line-height: 80px;
                text-align: center;
                position: absolute;
                top: 130px;
                opacity: 0.8;
                filter: alpha(opacity=80);
                cursor: pointer;
            }
            #shang {
                left: 0;
            }
            #xia {
                right: 0;
            }
            #box #list2 {
                height: 20px;
                width: 195px;
                position: absolute;
                left: 297px;
                bottom: 25px;
                opacity: 0.8;
                filter: alpha(opacity=80);
            }
            #box #list2 li {
                height: 20px;
                width: 20px;
                background: #ccc;
                border-radius: 50%;
                float: left;
                margin-right: 5px;
                cursor: pointer;
            }
            #box #list2 li.active {
                background: black;
            }
        </style>
    </head>
    <body>
        <div id="box">
            <ul id="list1">
                <li style="background: red;">1</li>
                <li style="background: yellow;">2</li>
                <li style="background: green;">3</li>
                <li style="background: blue;">4</li>
                <li style="background: blueviolet;">5</li>
                <li style="background: brown;">6</li>
                <li style="background: orangered;">7</li>
                <li style="background: palevioletred;">8</li>               
            </ul>
            <ul id="list2">
                <li class="active"></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li style="margin-right:0px;"></li>
            </ul>
            <div id="shang">
                &lt;
            </div>
            <div id="xia">
                &gt;
            </div>
        </div>
        <script type="text/javascript">
            onload = function(){
                var oBox = document.getElementById('box');
                var oList1 = document.getElementById('list1');
                var aLi1 = oList1.getElementsByTagName('li');
                var oList2 = document.getElementById('list2');
                var aLi2 = oList2.getElementsByTagName('li');
                var oShang = document.getElementById('shang');
                var oXia = document.getElementById('xia');
                aLi1[0].style.opacity = 1;
                aLi1[0].style.filter = 'alpha(opacity=100)';
                var size = aLi1.length;
                var i = 0;
                var timer = setInterval(function(){
                    i++;
                    move();
                },2000);
                function move(){
                    if (i >= size ) {
                        i = 0;
                    }
                    if (i < 0 ) {
                        i = size - 1;
                    }
                    for (var j = 0; j < aLi1.length; j++) {
                        if (j == i) {
                            animate(aLi1[j],{opacity:100});
                            aLi2[j].className = 'active';
                        }else{
                            animate(aLi1[j],{opacity:0});
                            aLi2[j].className = '';
                        }
                    }
                }
                //前一张
                oShang.onclick = function(e){
                    var evt = e || event;
                    evt.preventDefault();
                    i--;
                    move();
                }
                //后一张
                oXia.onclick = function(e){
                    var evt = e || event;
                    evt.preventDefault();
                    i ++;
                    move();
                }
                //下面的圆点
                for(var k = 0;k < aLi2.length; k ++){
                    aLi2[k].index = k;
                    aLi2[k].onmouseenter = function(){
                        i = this.index;
                        move();
                    }
                }
                oBox.onmouseenter = function(){
                    clearInterval(timer);
                }
                oBox.onmouseleave = function(){
                    timer = setInterval(function(){
                        i ++;
                        move();
                    },2000);
                }








    /*************************缓冲运动可封装留着以后备用^_^*************************/
                function getStyleAttr(obj, attr){
                    if (window.getComputedStyle){
                        return getComputedStyle(obj, null)[attr]; 
                    }
                    else {
                        return obj.currentStyle[attr];  
                    }
                }
                function animate(obj, json, fn){
                    clearInterval(obj.timer); 
                    obj.timer = setInterval(function(){
                        var bStop = true; 
                        for (var attr in json){
                            var iTarget = json[attr]; 
                            var current;
                            if (attr == "opacity"){ 
                                current = parseFloat(getStyleAttr(obj, attr))*100;
                                current = Math.round(current);
                            }
                            else { 
                                current = parseFloat(getStyleAttr(obj, attr));
                                current = Math.round(current);
                            }
                            var speed = (iTarget-current)/8;    (400-393)/8
                            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
                            if (current != iTarget){
                                bStop = false; 
                            }
                            if (attr == "opacity"){ 
                                obj.style[attr] = (current+speed)/100;
                                obj.style.filter = "alpha(opacity=" + (current+speed) + ")";
                            }
                            else { 
                                obj.style[attr] = current+speed + "px";
                            }
                        }
                        if (bStop){
                            console.log("停止运动");
                            clearInterval(obj.timer); 
                            if (fn) {
                                fn(); 
                            }
                        }
                    }, 30);
                }
            }

        </script>
    </body>
    </html>