(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{267:function(t,a,e){},291:function(t,a,e){"use strict";e(267)},317:function(t,a,e){"use strict";e.r(a);var i={data:()=>({articleInfo:{}}),created(){this.articleInfo=this.getPageInfo()},watch:{"$route.path"(){this.articleInfo=this.getPageInfo()}},methods:{getPageInfo(){const t=this.$page,{relativePath:a}=t,{sidebar:e}=this.$themeConfig,i=a.split("/"),o=i[0].split("."),s=o.length>1?o[1]:o[0],r=i.length>2?i[1].split(".")[1]:void 0,l=i.length>3?i[2].split(".")[1]:void 0,c=e&&e.catalogue?e.catalogue[s]:void 0,n=this.$frontmatter.author||this.$themeConfig.author;let f=(t.frontmatter.date||"").split(" ")[0];const{categories:I}=this.$frontmatter;return{date:f,classify1:s,classify2:r,classify3:l,cataloguePermalink:c,author:n,categories:I}}}},o=(e(291),e(4)),s=Object(o.a)(i,(function(){var t=this,a=t._self._c;return a("div",{staticClass:"articleInfo-wrap"},[a("div",{staticClass:"articleInfo"},[t.articleInfo.classify1&&"_posts"!==t.articleInfo.classify1?a("ul",{staticClass:"breadcrumbs"},[a("li",[a("router-link",{staticClass:"iconfont icon-home",attrs:{to:"/",title:"首页"}})],1),t._v(" "),a("li",[t.articleInfo.cataloguePermalink?a("router-link",{attrs:{to:t.articleInfo.cataloguePermalink,title:t.articleInfo.classify1+"-目录页"}},[t._v(t._s(t.articleInfo.classify1))]):!1!==t.$themeConfig.category?a("router-link",{attrs:{to:"/categories/?category="+encodeURIComponent(t.articleInfo.classify1),title:"分类"}},[t._v(t._s(t.articleInfo.classify1))]):a("span",[t._v(t._s(t.articleInfo.classify1))])],1),t._v(" "),t.articleInfo.classify2?a("li",[t.articleInfo.cataloguePermalink?a("router-link",{attrs:{to:t.articleInfo.cataloguePermalink+"/#"+t.articleInfo.classify2,title:t.articleInfo.classify1+"#"+t.articleInfo.classify2}},[t._v(t._s(t.articleInfo.classify2))]):!1!==t.$themeConfig.category?a("router-link",{attrs:{to:"/categories/?category="+encodeURIComponent(t.articleInfo.classify2),title:"分类"}},[t._v(t._s(t.articleInfo.classify2))]):a("span",[t._v(t._s(t.articleInfo.classify2))])],1):t._e(),t._v(" "),t.articleInfo.classify3?a("li",[t.articleInfo.cataloguePermalink?a("router-link",{attrs:{to:t.articleInfo.cataloguePermalink+"/#"+t.articleInfo.classify3,title:t.articleInfo.classify1+"#"+t.articleInfo.classify3}},[t._v(t._s(t.articleInfo.classify3))]):!1!==t.$themeConfig.category?a("router-link",{attrs:{to:"/categories/?category="+encodeURIComponent(t.articleInfo.classify3),title:"分类"}},[t._v(t._s(t.articleInfo.classify3))]):a("span",[t._v(t._s(t.articleInfo.classify3))])],1):t._e()]):t._e(),t._v(" "),a("div",{staticClass:"info"},[t.articleInfo.author?a("div",{staticClass:"author iconfont icon-touxiang",attrs:{title:"作者"}},[t.articleInfo.author.href||t.articleInfo.author.link&&"string"==typeof t.articleInfo.author.link?a("a",{staticClass:"beLink",attrs:{href:t.articleInfo.author.href||t.articleInfo.author.link,target:"_blank",title:"作者"}},[t._v(t._s(t.articleInfo.author.name))]):a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.articleInfo.author.name||t.articleInfo.author))])]):t._e(),t._v(" "),t.articleInfo.date?a("div",{staticClass:"date iconfont icon-riqi",attrs:{title:"创建时间"}},[a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.articleInfo.date))])]):t._e(),t._v(" "),!1===t.$themeConfig.category||t.articleInfo.classify1&&"_posts"!==t.articleInfo.classify1||!t.articleInfo.categories?t._e():a("div",{staticClass:"date iconfont icon-wenjian",attrs:{title:"分类"}},t._l(t.articleInfo.categories,(function(e,i){return a("router-link",{key:i,attrs:{to:"/categories/?category="+encodeURIComponent(e)}},[t._v(t._s(e+" "))])})),1)])])])}),[],!1,null,"071ed482",null);a.default=s.exports}}]);