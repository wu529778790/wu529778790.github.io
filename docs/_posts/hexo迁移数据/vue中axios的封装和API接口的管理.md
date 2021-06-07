---
title: vue中axios的封装和API接口的管理
date: 2021-06-05 16:06:21
permalink: /pages/94d41f/
categories: 
  - hexo迁移数据
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
  permalink: null
  categories: null
sidebar: auto
---
title: axios
date: 2017-11-13 18:19:55
categories:
tags:

---

# 优点

拦截请求和响应、取消请求、转换 json、客户端防御 XSRF

# 引入

一般我会在项目的 src 目录中，新建一个 request 文件夹，然后在里面新建一个 http.js 和一个 api.js 文件。http.js 文件用来封装我们的 axios，api.js 用来统一管理我们的接口。

```
// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Toast } from 'vant';
```

# 环境的切换

我们的项目环境可能有开发环境、测试环境和生产环境。我们通过 node 的环境变量来匹配我们的默认的接口 url 前缀。axios.defaults.baseURL 可以设置 axios 的默认请求地址就不多说了。

```
// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'https://www.baidu.com';}
else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'https://www.production.com';
}
```

# post 请求头的设置

```
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
```

# 请求拦截

```
// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写
import store from '@/store/index';

// 请求拦截器axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
})
```

这里说一下 token，一般是在登录完成之后，将用户的 token 通过 localStorage 或者 cookie 存在本地，然后用户每次在进入页面的时候（即在 main.js 中），会首先从本地存储中读取 token，如果 token 存在说明用户已经登陆过，则更新 vuex 中的 token 状态。然后，在每次请求接口的时候，都会在请求的 header 中携带 token，后台人员就可以根据你携带的 token 来判断你的登录是否过期，如果没有携带，则说明没有登录过。这时候或许有些小伙伴会有疑问了，就是每个请求都携带 token，那么要是一个页面不需要用户登录就可以访问的怎么办呢？其实，你前端的请求可以携带 token，但是后台可以选择不接收啊！

# 相应的拦截

```
// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                     Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;

                // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
});
```

响应拦截器很好理解，就是服务器返回给我们的数据，我们在拿到之前可以对他进行一些处理。例如上面的思想：如果后台返回的状态码是 200，则正常返回数据，否则的根据错误的状态码类型进行一些我们需要的错误，其实这里主要就是进行了错误的统一处理和没登录或登录过期后调整登录页的一个操作。要注意的是，上面的 Toast()方法，是我引入的 vant 库中的 toast 轻提示组件，你根据你的 ui 库，对应使用你的一个提示组件。

# 封装 get 方法和 post 方法

get 方法：我们通过定义一个 get 函数，get 函数有两个参数，第一个参数表示我们要请求的 url 地址，第二个参数是我们要携带的请求参数。get 函数返回一个 promise 对象，当 axios 其请求成功时 resolve 服务器返回 值，请求失败时 reject 错误值。最后通过 export 抛出 get 函数。

```
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
    })
});}
```

post 方法：原理同 get 基本一样，但是要注意的是，post 方法必须要使用对提交从参数对象进行序列化的操作，所以这里我们通过 node 的 qs 模块来序列化我们的参数。这个很重要，如果没有序列化操作，后台是拿不到你提交的数据的。这就是文章开头我们 import QS from 'qs';的原因

```
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
```

这里有个小细节说下，axios.get()方法和 axios.post()在提交数据时参数的书写方式还是有区别的。区别就是，get 的第二个参数是一个{}，然后这个对象的 params 属性值是一个参数对象的。而 post 的第二个参数就是一个参数对象。

# axios 的封装基本就完成了，下面再简单说下 api 的统一管理

首先我们在 api.js 中引入我们封装的 get 和 post 方法

```
/**
 * api接口统一管理
 */
import { get, post } from './http'
```

现在，例如我们有这样一个接口，是一个 post 请求：

```
export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);
```

我们定义了一个 apiAddress 方法，这个方法有一个参数 p，p 是我们请求接口时携带的参数对象。而后调用了我们封装的 post 方法，post 方法的第一个参数是我们的接口地址，第二个参数是 apiAddress 的 p 参数，即请求接口时携带的参数对象。最后通过 export 导出 apiAddress。然后在我们的页面中可以这样调用我们的 api 接口：

```
import { apiAddress } from '@/request/api';// 导入我们的api接口
export default {
    name: 'Address',
    created () {
        this.onLoad();
    },
    methods: {
        // 获取数据
        onLoad() {
            // 调用api接口，并且提供了两个参数
            apiAddress({
                type: 0,
                sort: 1
            }).then(res => {
                // 获取数据成功后的其他操作
                ………………
            })
        }
    }
}
```

其他的 api 接口，就在 pai.js 中继续往下面扩展就可以了。友情提示，为每个接口写好注释哦！！！api 接口管理的一个好处就是，我们把 api 统一集中起来，如果后期需要修改接口，我们就直接在 api.js 中找到对应的修改就好了，而不用去每一个页面查找我们的接口然后再修改会很麻烦。关键是，万一修改的量比较大，就规格 gg 了。还有就是如果直接在我们的业务代码修改接口，一不小心还容易动到我们的业务代码造成不必要的麻烦。

完成的 axios 封装代码

```
/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';import QS from 'qs';
import { Toast } from 'vant';
import store from '../store/index'

// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://api.123dailu.com/';
}

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}
```

本来最近打算写一篇关于 axios 封装的博客，看到你的实践，发现和我们的实践方式几乎一样，但有几点不同：

1.  我们不是通过 node 环境变量来改变 baseURL 的，而是通过 ES6 的类对 axios 基于进行了一次再封装，export 出去封装的 Ajax 类，然后 在 main.js 里 new Ajax(baseURL, access_token)，并把创建的实例挂到 Vue 的原型上。而在构造函数里借助 axios.create 创建新的 axios 实例，之后的自定义 header 和 拦截器也会在这个新的 axios 实例上操作，包含 token，loading，toast 等统一封装的东西（当然我们的 loading 和 toast 是可以通过实例的 toggle 方法开启和关闭的，毕竟有些特殊的接口失败是不一定需要 toast ）。这么做的原因在于我们公司的客户是学校，一套系统卖出去部署到学校，内网部署的服务器不同，所以 baseURL 也是不同的。
2.  我们会发布到 npm 上，可以大家统一安装使用，因为公司前端较多，一旦出现 BUG 也方便统一更新修复。
3.  自定义的 header 传递 token ,我们发现在安卓 6.0 和 IOS9 之前的手机，特别是华为手机里，会导致后端无法接收自定义的 header , 所以我们移动端的固定参数封装如 token ，放在 params 里。
4.  axios 的 get post 等方法本身就会返回 Promise ,你不需要再 return 一个 Promise 实例。
5.  关于统一 api 管理，我之前和其他前端也讨论过，感觉封装的有点过头的。到处 import export 导致实际开发中一个 ajax 绕来绕去，有点繁琐，不如直接 this.$ajax 来的简单实用，当然我不否认这么做的集中维护的优势，而且也看过不少其他人这么实践。

https://juejin.im/post/5b55c118f265da0f6f1aa354?utm_source=gold_browser_extension#heading-9
