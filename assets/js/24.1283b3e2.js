(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{293:function(t,e,n){},325:function(t,e,n){"use strict";n(293)},345:function(t,e,n){"use strict";n.r(e);var i=n(11),s={data:()=>({bgImg:"",opacity:.5}),mounted(){let{bodyBgImg:t,bodyBgImgOpacity:e}=this.$themeConfig;if("string"===Object(i.n)(t))this.bgImg=t;else if("array"===Object(i.n)(t)){let e=0,n=null;this.bgImg=t[e],clearInterval(n),n=setInterval(()=>{++e>=t.length&&(e=0),this.bgImg=t[e]},15e3)}void 0!==e&&(this.opacity=e)}},c=(n(325),n(4)),o=Object(c.a)(s,(function(){return(0,this._self._c)("div",{staticClass:"body-bg",style:`background: url(${this.bgImg}) center center / cover no-repeat;opacity:${this.opacity}`})}),[],!1,null,null,null);e.default=o.exports}}]);