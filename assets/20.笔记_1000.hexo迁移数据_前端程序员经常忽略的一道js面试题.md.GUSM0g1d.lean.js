import{_ as a,o as t,c as r,j as e,a2 as s,a as o}from"./chunks/framework.m9rfQn3T.js";const d=JSON.parse('{"title":"前端程序员经常忽略的一道js面试题","description":"","frontmatter":{"title":"前端程序员经常忽略的一道js面试题","date":"2017-06-06T16:06:21.000Z","permalink":"/pages/e14f75/","categories":["hexo迁移数据"],"author":{"name":"神族九帝","link":"https://github.com/wu529778790","permalink":null,"categories":null},"sidebar":"auto","tags":[null]},"headers":[],"relativePath":"20.笔记/1000.hexo迁移数据/前端程序员经常忽略的一道js面试题.md","filePath":"20.笔记/1000.hexo迁移数据/前端程序员经常忽略的一道js面试题.md","lastUpdated":1782538095000}'),m={name:"20.笔记/1000.hexo迁移数据/前端程序员经常忽略的一道js面试题.md"};function c(i,n,l,g,N,u){return t(),r("div",null,[...n[0]||(n[0]=[e("p",null,"在网上看的这道面试题很经典，就转载过来记录一下，顺便加深自己的印象",-1),e("p",null,"<!--more-->",-1),e("p",{alert:"","(5);":""},"function Foo() { getName = function () { alert (1); }; return this; } Foo.getName = function () { alert (2);}; Foo.prototype.getName = function () { alert (3);}; var getName = function () { alert (4);}; function getName()",-1),s("",16),e("p",{alert:"","(5);":""},"##答案 function Foo() { getName = function () { alert (1); }; return this; } Foo.getName = function () { alert (2);}; Foo.prototype.getName = function () { alert (3);}; var getName = function () { alert (4);}; function getName()",-1),e("pre",null,[e("code",null,`    //答案：
    Foo.getName();//2
    getName();//4
    Foo().getName();//1
    getName();//1
    new Foo.getName();//2
    new Foo().getName();//3
    new new Foo().getName();//3
`)],-1),e("h2",{id:"后续",tabindex:"-1"},[o("后续 "),e("a",{class:"header-anchor",href:"#后续","aria-label":'Permalink to "后续"'},"​")],-1),e("pre",null,[e("code",null,`难度加大，在Foo函数里面加多一个公有方法getName

            function Foo() {
                this.getName = function() {
                    console.log(3);
                    return {
                        getName: getName//这个就是第六问中涉及的构造函数的返回值问题
                    }
                };//这个就是第六问中涉及到的，JS构造函数公有方法和原型链方法的优先级
                getName = function() {
                    console.log(1);
                };
                return this
            }
            Foo.getName = function() {
                console.log(2);
            };
            Foo.prototype.getName = function() {
                console.log(6);
            };
            var getName = function() {
                console.log(4);
            };

            function getName() {
                console.log(5);
            } //答案：
            Foo.getName(); //2
            getName(); //4
            console.log(Foo())
            Foo().getName(); //1
            getName(); //1
            new Foo.getName(); //2
            new Foo().getName(); //3
                    //多了一问
            new Foo().getName().getName(); //3 1
            new new Foo().getName(); //3
`)],-1),e("p",null,[o("转载自"),e("a",{href:"https://github.com/Wscats/Good-text-Share/issues/85",target:"_blank",rel:"noreferrer"},"https://github.com/Wscats/Good-text-Share/issues/85")],-1)])])}const w=a(m,[["render",c]]);export{d as __pageData,w as default};
