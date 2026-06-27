import{_ as a,o as r,c as n,a2 as t}from"./chunks/framework.m9rfQn3T.js";const b=JSON.parse('{"title":"stylus中文文档","description":"","frontmatter":{"title":"stylus中文文档","date":"2017-06-06T16:06:21.000Z","permalink":"/pages/ec0fac/","categories":["hexo迁移数据"],"author":{"name":"神族九帝","link":"https://github.com/wu529778790","permalink":null,"categories":null},"sidebar":"auto","tags":[null]},"headers":[],"relativePath":"20.笔记/1000.hexo迁移数据/stylus中文文档.md","filePath":"20.笔记/1000.hexo迁移数据/stylus中文文档.md","lastUpdated":1782538095000}'),o={name:"20.笔记/1000.hexo迁移数据/stylus中文文档.md"};function s(d,e,i,l,u,c){return r(),n("div",null,[...e[0]||(e[0]=[t(`<p>Stylus - 富有表现力的、动态的、健壮的 CSS</p><p>&lt;!--more--&gt;</p><h2 id="常见的-css" tabindex="-1">常见的 css <a class="header-anchor" href="#常见的-css" aria-label="Permalink to &quot;常见的 css&quot;">​</a></h2><pre><code>body {
  font: 12px Helvetica, Arial, sans-serif;
}
a.button {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
</code></pre><h2 id="花括号去掉" tabindex="-1">花括号去掉 <a class="header-anchor" href="#花括号去掉" aria-label="Permalink to &quot;花括号去掉&quot;">​</a></h2><pre><code>body
  font: 12px Helvetica, Arial, sans-serif;

a.button
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
</code></pre><h2 id="分号去掉" tabindex="-1">分号去掉 <a class="header-anchor" href="#分号去掉" aria-label="Permalink to &quot;分号去掉&quot;">​</a></h2><pre><code>body
  font: 12px Helvetica, Arial, sans-serif

a.button
  -webkit-border-radius: 5px
  -moz-border-radius: 5px
  border-radius: 5px
</code></pre><h2 id="冒号去掉" tabindex="-1">冒号去掉 <a class="header-anchor" href="#冒号去掉" aria-label="Permalink to &quot;冒号去掉&quot;">​</a></h2><pre><code>body
  font 12px Helvetica, Arial, sans-serif

a.button
  -webkit-border-radius 5px
  -moz-border-radius 5px
  border-radius 5px
</code></pre><h2 id="函数类" tabindex="-1">函数类 <a class="header-anchor" href="#函数类" aria-label="Permalink to &quot;函数类&quot;">​</a></h2><pre><code>border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments

body
  font 12px Helvetica, Arial, sans-serif

a.button
  border-radius(5px)
</code></pre><h2 id="混合书写" tabindex="-1">混合书写 <a class="header-anchor" href="#混合书写" aria-label="Permalink to &quot;混合书写&quot;">​</a></h2><pre><code>border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments

body
  font 12px Helvetica, Arial, sans-serif

a.button
  border-radius 5px
</code></pre><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><pre><code>@import &#39;vendor&#39;

body
  font 12px Helvetica, Arial, sans-serif

a.button
  border-radius 5px
</code></pre><h2 id="语言函数" tabindex="-1">语言函数 <a class="header-anchor" href="#语言函数" aria-label="Permalink to &quot;语言函数&quot;">​</a></h2><pre><code>sum(nums...)
  sum = 0
  sum += n for n in nums

sum(1 2 3 4)
// =&gt; 10
</code></pre><h2 id="所有的都是可以选择的" tabindex="-1">所有的都是可以选择的 <a class="header-anchor" href="#所有的都是可以选择的" aria-label="Permalink to &quot;所有的都是可以选择的&quot;">​</a></h2><pre><code>fonts = helvetica, arial, sans-serif

body {
  padding: 50px;
  font: 14px/1.4 fonts;
}
</code></pre><h2 id="stylus-获取、安装" tabindex="-1">Stylus 获取、安装 <a class="header-anchor" href="#stylus-获取、安装" aria-label="Permalink to &quot;Stylus 获取、安装&quot;">​</a></h2><pre><code>$ npm install stylus
</code></pre><h2 id="stylus-的特征" tabindex="-1">Stylus 的特征 <a class="header-anchor" href="#stylus-的特征" aria-label="Permalink to &quot;Stylus 的特征&quot;">​</a></h2><pre><code>冒号可选
分号可选
逗号可选
括号可选
变量
插值
混合书写
算术
强制类型转换
动态导入
条件
迭代
嵌套选择
父级参考
变量函数调用
词法作用域
内置函数(&gt;25)
内部语言函数
压缩可选
图像内联可选
可执行Stylus
健壮的错误报告
单行和多行注释
CSS字面量
字符转义
TextMate捆绑
以及其他更多
</code></pre><p>更多信息 github：<a href="https://github.com/stylus/stylus" target="_blank" rel="noreferrer">https://github.com/stylus/stylus</a></p>`,25)])])}const h=a(o,[["render",s]]);export{b as __pageData,h as default};
