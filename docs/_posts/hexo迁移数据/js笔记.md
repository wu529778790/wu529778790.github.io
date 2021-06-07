---
title: js笔记
date: 2021-06-05 16:06:21
permalink: /pages/243981/
categories: 
  - 旧数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
---
title: js笔记
date: 2016-3-14 15:17:43
categories:
tags: js笔记
---
### js位置篇之窗口

<!--more-->

	//屏幕大小
    window.screen.width;
    window.screen.height;

    //视图
    window.innerWidth;
    window.innerHeight;
    document.documentElement.clientWidth;
    document.documentElement.clientHeight;

    //页面的大小
    document.documentElement.offsetWidth;
    document.documentElement.offsetHeight;
    document.body.clientWidth;
    document.body.clientHeight;

    //滚动条的位置
    document.documentElement.scrollLeft;
    document.documentElement.scrollTop;
    document.body.scrollTop;
    document.body.scrollLeft;

    //跨浏览器获取滚动条的位置
    function getScroll(){
        return {
            top : document.documentElement.scrollTop || document.body.scrollTop,
            left : document.documentElement.scrollLeft || document.body.scrollLeft
        }
    }
    var scroll = getScroll();
    scroll.top;
    scroll.left;


### location  
    //修改当前地址
    //location.href='http://www.baidu.com';
    //刷新当前页面
    //location.reload();  
    //确认取消框
    // var result = window.confirm('您的URL地址不对，请重新输入');  
    //输入框
    //第一个参数是提示文字，第二个参数是默认值
    //window.prompt('请输入一个数字',0);  
    //打开一个窗口
    //open接收三个参数，第一个参数是跳转的URL，第二个参数可以指定窗口名称
    //第三个参数width,height,top,left,location,menubar可以设置窗口属性
    //window.open('http://www.baidu.com','baidu','width=300,height=400,top=500,left=300,location=true,menubar=true');  
    // 250
    // //怎么用循环的方式获取到每位的值
    // (250 / 100)
    // (250 % 100) / 10
    // 250 % 10  
### Array内置方法  
    var list1 = [3,4,1,2,5,7,6];
    var list2 = [7,8,9,10,11,12];
    //获取数组值
    // var result = list1.valueOf();
    // console.log(result);//[3,4,1,2,5,7,6]
    //分割成指定分隔符的字符串
    // var result = list1.join('!');
    // console.log(result);//3!4!1!2!5!7!6
    //在前面添加一个元素,返回的是数组的长度
    // list1.unshift(0);
    // console.log(list1);//[0, 3, 4, 1, 2, 5, 7, 6]
    //在前面删除一个元素
    // list1.shift(0);
    // console.log(list1);
    //颠倒位置
    //var result = list1.reverse();
    //console.log(result);
    //sort排序, 正向排序
    // var result = list2.sort();
    // console.log(result);//[10, 11, 12, 7, 8, 9]
    //连接数组
    // var result = list1.concat(list2);
    // console.log(result);//[3, 4, 1, 2, 5, 7, 6, 7, 8, 9, 10, 11, 12]
    //删除或者替换数组内容
    //splice(位置,删除的个数,替换的内容)
    // var result = list1.splice(0,2,10);
    // console.log(list1);//[10, 1, 2, 5, 7, 6]  
###  date对象的学习    

	var today = new Date();
    //获取当前时间的毫秒数
    var hm = today.getTime();
    console.log(hm);
    var year = today.getFullYear();
    console.log(year);
    var month = today.getMonth();
    console.log(month);
    //获取日期
    var day = today.getDate();
    console.log(day);
    var week = today.getDay();
    console.log(week);
    var hour = today.getHours();
    console.log(hour);
    var min = today.getMinutes();
    console.log(min);
    var second = today.getSeconds();
    console.log(second);
    //获取毫秒
    var milsecond = today.getMilliseconds();
    console.log(milsecond);  
### string类型内置方法  
    var str1 = '我是新创建的第一个字符串';
    var str2 = '我是创建的第二个字符串';
    // var result = [];
    // for(var i=0;i<str1.length;i++){

    //     //选取每一个字符对应的数组下标
    //     var index = i;
    //     result.push(str1[index] + '0');
    // }
    // alert(result);
    // alert(str1);

    // // 返回指定位置的字符
    // var result = str1.charAt(2);
    // console.log(result);
    // //返回指定位置的字符，但是是以unicode格式返回的
    // var result = str1.charCodeAt(2);
    // console.log(result);
    // //连接字符串的
    // result = str1.concat(str2);
    // console.log(result);
    // //三个截取字符串的函数slice,substring,substr
    // //一个参数的情况
    // var result = str1.slice(2);
    // console.log(result);
    // var result = str1.substring(2);
    // console.log(result);
    // var result = str1.substr(2);
    // console.log(result);
    // var result = str1.slice(-1);
    // console.log(result);
    // var result = str1.substr(-1);
    // console.log(result);
    // //substring负数情况不允许
    // var result = str1.substring(-3);
    // console.log(result);

    //两个参数的情况
    //slice和substring是截取的从N开始M结束之间的字符串
    //substr它是截取从N开始,M个字符串
    var result = str1.slice(1,4);
    console.log(result);
    var result = str1.substring(1,4);
    console.log(result);
    //从1开始，截取四个
    var result = str1.substr(0,4);
    console.log(result);
    //返回索引值
    var result = str1.indexOf('的');
    console.log(result);
    //lastIndexOf返回最后一个字符串出现的位置
    var result = str1.lastIndexOf('的');
    console.log(result);
    //tolowercase,touppercase分别是转化大小写的
    var str3 = 'HELLO';
    var str4 = 'world';
    console.log(str3.toLowerCase());
    document.write(str4.toUpperCase());