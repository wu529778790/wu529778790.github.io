---
title: if-else
date: 2021-06-05 16:06:21
permalink: /pages/ce894a/
categories: 
  - 旧数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
---
title: if-else
date: 2017-11-11 18:15:55
categories:
tags:

---

# look-up 表代替 if-else

比如大家可能会遇到类似下面的需求：比如某平台的信用分数评级，超过 700-950，就是信用极好，650-700 信用优秀，600-650 信用良好，550-600 信用中等，350-550 信用较差。

```
function showGrace(grace) {
    let graceForLevel=[700,650,600,550];
    let levelText=['信用极好','信用优秀','信用良好','信用中等','信用较差'];
    for(let i=0;i<graceForLevel.length;i++){
        if(grace>=graceForLevel[i]){
            return levelText[i];
        }
    }
    //如果不存在，那么就是分数很低，返回最后一个
    return levelText[levelText.length-1];
}
```

如果还想灵活一些，可以封装一个稍微通用一点的 look-up 函数。

```
function showGrace(grace,level,levelForGrace) {
    for(let i=0;i<level.length;i++){
        if(grace>=level[i]){
            return levelForGrace[i];
        }
    }
    //如果不存在，那么就是分数很低，返回最后一个
    return levelForGrace[levelForGrace.length-1];
}
let graceForLevel=[700,650,600,550];
let levelText=['信用极好','信用优秀','信用良好','信用中等','信用较差'];
```

# 配置对象代替 switch

比如有一个需求：传入 cash，check，draft，zfb，wx_pay，对应输出：现金，支票，汇票，支付宝，微信支付。

需求也很简单，就一个 switch 就搞定了

```
function getPayChanne(tag){
    switch(tag){
        case 'cash':return '现金';
        case 'check':return '支票';
        case 'draft':return '汇票';
        case 'zfb':return '支付宝';
        case 'wx_pay':return '微信支付';
    }
}
```

但是这个的硬伤还是和上面一样，万一下次又要多加一个如：bank_trans 对应输出银行转账呢，代码又要改。类似的问题，同样的解决方案，配置数据和业务逻辑分离。代码如下。

```
function getPayChanne(tag){
    let payChanneForChinese = {
        'cash': '现金',
        'check': '支票',
        'draft': '汇票',
        'zfb': '支付宝',
        'wx_pay': '微信支付',
    };
    return payChanneForChinese[tag];
}
```

同理，如果想封装一个通用的，也可以的

```
let payChanneForChinese = {
    'cash': '现金',
    'check': '支票',
    'draft': '汇票',
    'zfb': '支付宝',
    'wx_pay': '微信支付',
};
function getPayChanne(tag,chineseConfig){
    return chineseConfig[tag];
}
getPayChanne('cash',payChanneForChinese);
```

这里使用对象代替 switch 好处就在于

- 使用对象不需要 switch 逐个 case 遍历判断。
- 使用对象，编写业务逻辑可能更灵活
- 使用对象可以使得配置数据和业务逻辑分离。

https://juejin.im/post/5b4b73e7f265da0f96287f0a?utm_source=gold_browser_extension
