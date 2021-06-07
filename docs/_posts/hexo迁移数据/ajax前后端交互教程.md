---
title: ajax前后端交互教程
date: 2021-06-05 16:06:21
permalink: /pages/ac9563/
categories: 
  - hexo迁移数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
---
title: ajax前后端交互教程
date: 2016-09-21 15:52:06
tags: ajax
---


一直都是写的前端，没关心过后端是怎么处理的，看个小案例，了解下。

<!--more-->

直接上代码，制作个登录框，用来输入账号密码

    <div class="login">
        <p class="loginTitle">登录</p>
        <span class="loginSpan">账号
            <input type="text" id="userName" value="输入你的账号">
            <span></span>//装一个√或×，提示是否输入正确
            <br>
            <span>0</span><br> //账号是否正确输入的状态字
            <img src="" class="xbtn">
            密码
            <input type="password" id="password">
            <span></span>
            <br>
            <span></span>
        </span>
        <input type="button" value="登录">
        </span>
    </div>


这是登录框html，下面js

    $.ajax({
        'type': post,
        'url': 'login.php',
        'dataType': json,
        'data': {
            "username": $('#userName').val(),
            "password": $('#password').val()
        },
        'success': function(data){
            switch(data.type){
                case 0 : alert('账户不存在');break;
                case 1 : {
                    $('#userMsg').children('li').eq(2).find('span').html(' '+data.gouwuchenum+' '); 
                    $('#loginMsg li').eq(1).empty().html('<span>'+data.name+'</span>'); 
                    $('#loginMsg li').eq(2).empty().html('<a href="javascript:tuichu()">退出</a>');
                    $('.login').animate({right:-180,opacity:0},400,function(){ $(this).css('display','none'); }); break;
                };
                case 2:alert('密码错误');break;
            }
        }
    })

//下面来看，php脚本是如何接受数据，处理数据，返回数据的
    <?php
        $username=$_POST['username'];
        $password=$_POST['password'];//根据不同的方法，php会把接收的数据储存在$_POST/$_GET这样的全局变量中，前面的ajax我们用的是post方法，所以这里用$_POST接收数据
        $usermsg =array(
            'fhw7328126' => '7328126',
            'fhwlmmz' => 'feng7328126',
            'dearmmz' => '123456',
            'rooter' => 'dd',
        );
        $gouwuche=array(
            'fhw7328126' => 2,
            'fhwlovemmz' => 3,
            'dearmmz' => 8,
            'rooter' => 123,
        );
        $name=array(
            'fhw7328126' => '鱼鱼风',
            'fhwmmz' => '黄翔',
            'dearmmz' => '明珠',
            'rooter' => '管理员',
        );//这里我定义了3个数组，分别储存有用户的帐号密码购物车信息和昵称，事实上，一般这样的数据都是储存在数据库中，PHP可以与数据库交互，获得这些数据表。由于我还没有掌握如何使用数据库，这里就直接用偷懒的方法定义好数据表；
        $type=0;//定义一个变量，用来代表php处理数据的不同结果，默认0
        $gouwuchenum=0;//定义一个变量，用来装用户购物车数量信息，默认0
        $name2=0;//定义一个变量，用来装用户的昵称，默认0
        foreach($usermsg as $key => $value){//遍历数组
            if($username==$key and $password==$value){//如果帐号存在，且密码匹配
                $type=1;//状态字赋值为1；
                $gouwuchenum=$gouwuche[$key];//获取当前用户的购物车信息；
                $name2=$name[$key];//获取当前用户的昵称
                break;//跳出遍历
            }
            else if($username==$key and $password!=$value){//如果帐号存在但密码不匹配
                $type=2;//状态字赋值为2；
                break;
            }
        }
        $response=array(//定义php要返回的数据，这里先定义成数组类型
            'type' => $type,//返回状态字
            'gouwuchenum' =>$gouwuchenum,//返回购物车信息
            'name' => $name2,//返回昵称
        );
        echo json_encode($response);//将要返回的数组转化成json数据，打印出来。注意，PHP打印出什么，那么前端接收的数据就是什么。通篇浏览这个php文件，只有最后一行打印了一个json数据，所以前端得到的数据就是这个json。
    ?>


这个php脚本，让大家知道了，后端如何接收数据，处理数据，以及返回数据。

//success函数，表示前端收到数据成功后，要做什么
    'success':function(data){//这里的data储存有后端php返回的json数据
            switch(data.type){//以data.type为switch-case关键字，分类处理
                case 0:alert('账户不存在');break;//如果type=0，说明帐号密码都不匹配
                case 1:{//type=1，说明匹配成功，登录成功
                    $('#userMsg').children('li').eq(2).find('span').html(' '+data.gouwuchenum+' ');//更新购物车数量
                    $('#loginMsg li').eq(1).empty().html('<span>'+data.name+'</span>');//登录按钮更换为用户昵称；
                    $('#loginMsg li').eq(2).empty().html('<a href="javascript:tuichu()">退出</a>');//注册按钮更换为退出按钮；
                    $('.login').animate({right:-180,opacity:0},400,function(){//登录框隐藏
                        $(this).css('display','none');
                    });
                    break;
                }
                case 2:alert('密码错误');break;//type=2，表示用户存在但是密码不匹配
            }
        }


转自：http://www.imooc.com/article/10371

