---
title: typeof-undefined-undefined-成立吗？
date: 2021-06-05 16:06:21
permalink: /pages/6c2d26/
categories:
  - 旧数据
tags:
  - 
---
title: typeof(undefined) == undefined 成立吗？
date: 2017-06-20 16:36:14
tags: js
---

工作中一直没用到的面试常常拍死，好吧，还是自己菜，不是面试官吹毛求疵。

<!--more-->

1、问题：在JavaScript中，typeof(undefined) == undefined成立吗？
答案：不成立，全局函数 typeof()返回值类型为字符串类型，六个可能值： "number"， "string"， "boolean"， "object" ，"function"， 和 "undefined"。

只有

typeof(undefined) =="undefined";

才是成立的。  
2、typeof(null) == ‘undefined’成立吗？

答案：不成立，null是Object类型的数据，故typeof(null) == 'object'成立。  
3、typeof([1,2]) == 'array'成立吗？

答案：不成立，typeof()返回值没有"array" 类型，同样也没有“date”类型。"object"  
4、undefined == undefined成立吗？

答案：成立。  
5、null == null成立吗？

答案：成立。  
6、NaN == NaN成立吗？

答案：不成立。NaN 不与任何值相等，包括其本身。要检测值是否为 NaN，请使用 isNaN 函数。  
7、typeof(NaN) == 'number'成立吗？

答案：成立。NaN是属于Number类型的数据。  
终上所述，null是Object类型的数据，NaN是Number类型的数据，undefined则是undefined类型的数据，即没有定义，找不到该对象或对象的属性和方法。  
