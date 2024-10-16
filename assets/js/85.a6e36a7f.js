(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{421:function(t,a,s){"use strict";s.r(a);var n=s(4),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("CSRF(Cross-site request forgery), 即跨站请求伪造，指的是黑客诱导用户点击链接，打开黑客的网站，然后黑客利用用户目前的登录状态发起跨站请求")]),t._v(" "),a("ul",[a("li",[t._v("自动发送 get 请求")]),t._v(" "),a("li",[t._v("自动发送 post 请求")]),t._v(" "),a("li",[t._v("诱导点击发送 get 请求")])]),t._v(" "),a("h3",{attrs:{id:"自动发送-get-请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动发送-get-请求"}},[t._v("#")]),t._v(" 自动发送 get 请求")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://xxx.com/info?user=hhh&count=100"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("img")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("进入页面后自动发送 get 请求，值得注意的是，这个请求会自动带上关于 xxx.com 的 cookie 信息(这里是假定你已经在 xxx.com 中登录过)。")]),t._v(" "),a("p",[t._v("假如服务器端没有相应的验证机制，它可能认为发请求的是一个正常的用户，因为携带了相应的 cookie，然后进行相应的各种操作，可以是转账汇款以及其他的恶意操作。")]),t._v(" "),a("h3",{attrs:{id:"自动发送-post-请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动发送-post-请求"}},[t._v("#")]),t._v(" 自动发送 post 请求")]),t._v(" "),a("p",[t._v("黑客可能自己填了一个表单，写了一段自动提交的脚本")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("form")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("hacker-form"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("action")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://xxx.com/info"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("method")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("POST"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("hidden"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("hhh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("hidden"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("100"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("form")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n  document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hacker-form"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("submit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("同样也会携带相应的用户 cookie 信息，让服务器误以为是一个正常的用户在操作，让各种恶意的操作变为可能。")]),t._v(" "),a("h3",{attrs:{id:"诱导用户点击发送-get-请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#诱导用户点击发送-get-请求"}},[t._v("#")]),t._v(" 诱导用户点击发送 get 请求")]),t._v(" "),a("p",[t._v("在黑客的网站上，可能会放上一个链接，驱使你来点击")]),t._v(" "),a("h3",{attrs:{id:"小结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),a("p",[t._v("这就是 CSRF 攻击的原理。和 XSS 攻击对比，CSRF 攻击并不需要将恶意代码注入用户当前页面的 html 文档中，而是跳转到新的页面，利用服务器的验证漏洞和用户之前的登录状态来模拟用户进行操作")]),t._v(" "),a("h2",{attrs:{id:"防范措施"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#防范措施"}},[t._v("#")]),t._v(" 防范措施")]),t._v(" "),a("h3",{attrs:{id:"利用-cookie-的-samesite-属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#利用-cookie-的-samesite-属性"}},[t._v("#")]),t._v(" 利用 Cookie 的 SameSite 属性")]),t._v(" "),a("p",[t._v("CSRF 攻击中重要的一环就是自动发送目标站点下的 Cookie,然后就是这一份 Cookie 模拟了用户的身份。因此在 Cookie 上面下文章是防范的不二之选。")]),t._v(" "),a("p",[t._v("恰好，在 Cookie 当中有一个关键的字段，可以对请求中 Cookie 的携带作一些限制，这个字段就是 SameSite。")]),t._v(" "),a("p",[t._v("SameSite 可以设置为三个值，Strict、Lax 和 None。")]),t._v(" "),a("p",[t._v("a. 在 Strict 模式下，浏览器完全禁止第三方请求携带 Cookie。比如请求 shenzjd.com 网站只能在 shenzjd.com 域名当中请求才能携带 Cookie，在其他网站请求都不能。")]),t._v(" "),a("p",[t._v("b. 在 Lax 模式，就宽松一点了，但是只能在 get 方法提交表单况或者 a 标签发送 get 请求的情况下可以携带 Cookie，其他情况均不能。")]),t._v(" "),a("p",[t._v("c. 在 None 模式下，也就是默认模式，请求会自动携带上 Cookie")]),t._v(" "),a("h3",{attrs:{id:"验证来源站点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#验证来源站点"}},[t._v("#")]),t._v(" 验证来源站点")]),t._v(" "),a("p",[t._v("这就需要要用到请求头中的两个字段: Origin 和 Referer。")]),t._v(" "),a("p",[t._v("其中，Origin 只包含域名信息，而 Referer 包含了具体的 URL 路径。")]),t._v(" "),a("p",[t._v("当然，这两者都是可以伪造的，通过 Ajax 中自定义请求头即可，安全性略差")]),t._v(" "),a("h3",{attrs:{id:"csrf-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#csrf-token"}},[t._v("#")]),t._v(" CSRF Token")]),t._v(" "),a("p",[t._v("浏览器向服务器发送请求时，服务器生成一个字符串，将其植入到返回的页面中。然后浏览器如果要发送请求，就必须带上这个字符串，然后服务器来验证是否合法，如果不合法则不予响应。这个字符串也就是 CSRF Token，通常第三方站点无法拿到这个 token, 因此也就是被服务器给拒绝")]),t._v(" "),a("p",[t._v("Django 作为 Python 的一门后端框架，用它开发过的同学就知道，在它的模板(template)中, 开发表单时，经常会附上这样一行代码:")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" csrf_token "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("p",[t._v("CSRF(Cross-site request forgery), 即跨站请求伪造，指的是黑客诱导用户点击链接，打开黑客的网站，然后黑客利用用户目前的登录状态发起跨站请求")]),t._v(" "),a("p",[t._v("CSRF 攻击一般会有三种方式:")]),t._v(" "),a("ul",[a("li",[t._v("自动 GET 请求")]),t._v(" "),a("li",[t._v("自动 POST 请求")]),t._v(" "),a("li",[t._v("诱导点击发送 GET 请求。")])]),t._v(" "),a("p",[t._v("防范措施: 利用 Cookie 的 SameSite 属性、验证来源站点和 CSRF Token")]),t._v(" "),a("h2",{attrs:{id:"参考链接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[t._v("#")]),t._v(" 参考链接")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://sanyuan0704.top/my_blog/blogs/browser/browser-security/002.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://sanyuan0704.top/my_blog/blogs/browser/browser-security/002.html"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);