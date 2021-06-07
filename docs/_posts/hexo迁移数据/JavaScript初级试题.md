---
title: JavaScript初级试题
date: 2021-06-05 16:06:21
permalink: /pages/959eb0/
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
title: JavaScript初级试题
date: 2017-04-10 10:27:55
categories:
tags:
---


今天在网上看了几个初级的试题，没想到竟然后好几个不确定答案的，所以就在此记录下
<!-- more -->
1,输出下面的值
        var a = 10, b = 20, c = (a++,b++,100);
        console.log(c); 
运算符的优先级，这里的运算符逗号是多重求值，不论多少个逗号，都是返回最后一个逗号后面的值
2,判断是否为质数
        function isZhuShu(m){
            if( m <= 1 || m%1 !== 0){
                return false;
            }
            var n = 2;
            while(n<m){
                if(m%n==0){
                    return false;
                }else{
                    n++;
                    continue;
                }
            }
            return true
        }
下面的是优化算法：
        function isPrime(number){
            if (typeof number !== 'number' || number < 2){
                //不是数字或者字数小于2
                return false;
            }

            if (number === 2){
                //2是质数
                return true 
            } else if (number % 2 === 0){
                //排除偶数
                return true
            } 
            var squareRoot = Math.sqrt(number);
            for(var i = 3; i <= squareRoot; i+=2){
                //因为2已经验证过，所以从三开始，且已经排除偶数，所以每次加2
                if(number % i === 0){
                    return false;
                }
            }
            return true;
        }
3,获取斐波那契数列的第n个值，如果n不是有限的数字，则返回undefined
        function getFBN(n){
            if(typeof n !== 'number'){
                return 
            }
            if(n < 0){
                return 1
            }
            else if (n <= 2){
                return 2
            }
            return getFBN(n-1) + getFBN(n-2);
        }
        console.log(getFBN(3))
4,计算从10到100中能被3或者5整除的数的和
        function getSum(){
            var sum = 0;
            for(var i = 10;i<=100;i++){
                sum += (i%3 === 0 || i%5 === 0) && i
            }
            return sum
        }
        console.log(getSum)
5,将传入的字符串翻转输出，如果不是字符串输出undefined

        function getReverse(str){
            var result = '';
            if(typeof str !== 'string'){
                return 
            }
            for(var len = str.length,i=len-1;i>=0;i--){
                result += str[i]
            }
            return result
        }

下面是简便的方法
        function getReverse(str){
            if(typeof str !== 'string'){
                return null
            }
            return str.split('').reverse().join('')
        }

6,写一个函数，来实现判断一个字符串是否为回文（忽略大小写）
        function isHuiWen(str){
            if(typeof str !== 'string' || str.constructor !== String){
                return false;
            }
            for(var i = 0,len=(str.length+1)/2;i<len;i++){
                if(str[i] !== str[str.length-i-1]){
                    return false;
                }
            }
        }
   
7,去除字符串中重复的字符
        function getNoRepeat(str){
            var tempObj = {},result = '';
            if(typeof str !== 'string' || str.constructor !== String){
                return false;
            }
            for(var i = 0,len =str.length;i<len;i++){
                if(!tempObj[str[i]]){
                    result += str[i];
                    tempObj[str[i]] = true
                }
            }
            return result
        } 
8, 输出1000内水仙花数水仙花数是指一个 n 位数 ( n≥3 )，它的每个位上的数字的 n 次幂之和等于它本身。（例如：1^3 + 5^3+ 3^3 = 153）三位的水仙花数共有4个：153，370，371，407
        //先封装一个简易版的Math.pow封装
    //先封装一个简易版的Math.pow封装
        function posPow(n,x){
            var result = n;
            if(x===0){
                return 1
            }
            if(x < 0){
                //只运算乘方
                return null
            }
            while(x>1){
                result = result*n;
                x--;
            }
            return result;
        }

    //最终函数
        function narc(max){
            var resultList = [],
                maxDigit=3, //max的位数
                tempResult=0;
            if(max <= 100){
                return null;
            }else if(typeof max !== 'number'){
                return null
            }
            //取得max的位数
            maxDigit = max.toString().length+1;

            //第一层对于位数进行循环，从3位开始
            for(var digit = 3; digit <= maxDigit; digit++){
                //第二层循环从 0到 Max
                for(var i = 100; i < max; i++){
                    tempResult = 0;
                    //第三层循环，从i的第0位到最后一位
                    for(var j=0;j<digit-1; j++){
                        tempResult += posPow(i.toString()[j], digit-1)
                    }
                    (tempResult === i) && (resultList[resultList.length]  = i)
                }
            }

            return resultList;
        }

        console.log(narc(1000))
        console.log(narc(10000))
        console.log(narc(8209))

9,以下js代码会输出什么
        console.log(1 + "2" + "2");//122
        console.log(1 +  + "2" + "2");//32  空格加字符串变成数字，隐式转换
        console.log(+ "1" + "1" + "2");//112
        console.log( "A" - "B" + "2");//NAN2   "A" - "B" 会返回 NaN，因为 "A" 和 "B" 无法转成数字进行运算，这里不要以为 "A" 和 "B" 能转为 ASCII码 进行运算（这个和C语言是不同的，不要搞乱了）。而 NaN 和字符串相加，会转成 "NaN" 和字符串去拼接，所以，倒数第二问是 NAN+"2",为 NAN2，NaN 和任何数字相加结果还是 NaN。
        console.log( "A" - "B" + 2 ); //NAN

10,以下js输出结果为
        var length = 10;
        function fn(){
            alert(this.length);
        }
        var obj = {
            length: 5,
            method: function(fn){
                fn();
                arguments[0]();
            }   
        }   
        obj.method(fn);

这个主要是考arguments，对象属于除了点操作符还可以用中括号，这里fn的scope是arguments，即fn内的this===arguments，调用时仅传了一个参数fn，因此length为1。

11，
        var a = 1;
        function func(){
            a = b = 2;
        }   
        func();
        alert(a); //2
        alert(b); //2
js中不用var声明的变量默认是全局变量，所以b是全聚德，所以func是可以对外进行访问的

12，简述readyonly与disabled的区别
   1、Readonly只针对input(text/password)和textarea有效，而disabled对于所有的表单元素有效，包括select,radio,checkbox,button等。
   2、在表单元素使用了disabled后，我们将表单以POST或者GET的方式提交的话，这个元素的值不会被传递出去，而readonly会将该值传递出去