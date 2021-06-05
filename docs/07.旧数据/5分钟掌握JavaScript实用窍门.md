---
title: 5分钟掌握JavaScript实用窍门
date: 2021-06-05 16:06:21
permalink: /pages/9067d8/
categories: 
  - 旧数据
tags: 
  - null
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
---

# 删除数组尾部元素

一个简单方法是改变数组的 length 值

```
const arr = [11, 22, 33, 44, 55, 66];
// truncanting
arr.length = 3;
console.log(arr); //=> [11, 22, 33]
// clearing
arr.length = 0;
console.log(arr); //=> []
console.log(arr[2]); //=> undefined
```

# 使用对象解构（object destructuring）来模拟命名参数

如果需要将一系列可选项作为参数传入函数，你很可能会使用对象（Object）来定义配置（Config）

```
doSomething({ foo: 'Hello', bar: 'Hey!', baz: 42 });
function doSomething(config) {
  const foo = config.foo !== undefined ? config.foo : 'Hi';
  const bar = config.bar !== undefined ? config.bar : 'Yo!';
  const baz = config.baz !== undefined ? config.baz : 13;
  // ...
}
```

不过这是一个比较老的方法了，它模拟了 JavaScript 中的命名参数。

在 ES 2015 中，你可以直接使用对象解构：

```
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
  // ...
}
```

让参数可选也很简单：

```
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
  // ...
}
```

# 使用对象解构来处理数组

可以使用对象解构的语法来获取数组的元素：

```
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');
```

# 在 Switch 语句中使用范围值

```
function getWaterState(tempInCelsius) {
  let state;

  switch (true) {
    case (tempInCelsius <= 0):
      state = 'Solid';
      break;
    case (tempInCelsius > 0 && tempInCelsius < 100):
      state = 'Liquid';
      break;
    default:
      state = 'Gas';
  }
  return state;
}
```

# await 多个 async 函数

在使用 async/await 的时候，可以使用 Promise.all 来 await 多个 async 函数

```
await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])
```

# 创建 Pure objects

你可以创建一个 100% pure object，它不从 Object 中继承任何属性或则方法（比如 constructor, toString()等）

```
const pureObject = Object.create(null);
console.log(pureObject); //=> {}
console.log(pureObject.constructor); //=> undefined
console.log(pureObject.toString); //=> undefined
console.log(pureObject.hasOwnProperty); //=> undefined
```

http://www.codeceo.com/article/yahoo-pure-css.html

# 格式化 JSON 代码

JSON.stringify 除了可以将一个对象字符化，还可以格式化输出 JSON 对象

```
const obj = {
  foo: { bar: [11, 22, 33, 44], baz: { bing: true, boom: 'Hello' } }
};
// The third parameter is the number of spaces used to
// beautify the JSON output.
JSON.stringify(obj, null, 4);
// =>"{
// =>    "foo": {
// =>        "bar": [
// =>            11,
// =>            22,
// =>            33,
// =>            44
// =>        ],
// =>        "baz": {
// =>            "bing": true,
// =>            "boom": "Hello"
// =>        }
// =>    }
// =>}"
```

# 数组去重(new Set)

通过使用集合语法和 Spread 操作，可以很容易将重复的元素移除：

```
const removeDuplicateItems = arr => [...new Set(arr)];
removeDuplicateItems([42, 'foo', 42, 'foo', true, true]);
//=> [42, "foo", true]
```

# 平铺多维数组

使用 Spread 操作平铺嵌套多维数组：

```
const arr = [11, [22, 33], [44, 55], 66];
const flatArr = [].concat(...arr); //=> [11, 22, 33, 44, 55, 66]
```

不过上面的方法仅适用于二维数组，但是通过递归，就可以平铺任意维度的嵌套数组了：

```
function flattenArray(arr) {
  const flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ?
    flattenArray(flattened) : flattened;
}

const arr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
const flatArr = flattenArray(arr);
//=> [11, 22, 33, 44, 55, 66, 77, 88, 99]
```
