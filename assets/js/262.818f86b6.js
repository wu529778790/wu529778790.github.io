(window.webpackJsonp=window.webpackJsonp||[]).push([[262],{599:function(t,a,r){"use strict";r.r(a);var s=r(4),e=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("ninja 搭建成功")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211103231255.png",alt:"20211103231255"}})]),t._v(" "),a("h2",{attrs:{id:"宝塔面板安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#宝塔面板安装"}},[t._v("#")]),t._v(" 宝塔面板安装")]),t._v(" "),a("p",[t._v("宝塔服务器面板，一键全能部署及管理，送你 3188 元礼包，点我领取"),a("a",{attrs:{href:"https://www.bt.cn/?invite_code=MV9pcnVna28",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.bt.cn/?invite_code=MV9pcnVna28"),a("OutboundLink")],1),t._v("=")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.bt.cn/bbs/thread-19376-1-1.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.bt.cn/bbs/thread-19376-1-1.html"),a("OutboundLink")],1)]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("yum "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-y")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-O")]),t._v(" install.sh http://download.bt.cn/install/install_6.0.sh "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sh")]),t._v(" install.sh\n")])])]),a("h2",{attrs:{id:"安装青龙"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装青龙"}},[t._v("#")]),t._v(" 安装青龙")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/whyour/qinglong",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/whyour/qinglong"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211103231542.png",alt:"20211103231542"}})]),t._v(" "),a("p",[t._v("首先宝塔面板里安装 docker")]),t._v(" "),a("p",[t._v("docker pull whyour/qinglong:latest")]),t._v(" "),a("p",[t._v("部署镜像（预留 sillyGirl、xdd-plus、xdd、ninja）")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-dit")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/config:/ql/config    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/db:/ql/db    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/repo:/ql/repo    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/raw:/ql/raw    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/scripts:/ql/scripts    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/log:/ql/log    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/jbot:/ql/jbot    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/ninja:/ql/ninja    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/xdd:/ql/xdd    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/xdd-plus:/ql/xdd-plus    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v("/ql/sillyGirl:/ql/sillyGirl    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-p")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5700")]),t._v(":5700    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-p")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5701")]),t._v(":5701    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("ENABLE_HANGUP")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("true    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("ENABLE_TG_BOT")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("true    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("ENABLE_WEB_PANEL")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("true    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--name")]),t._v(" qinglong   "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--hostname")]),t._v(" qinglong    "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--restart")]),t._v(" always whyour/qinglong:latest\n")])])]),a("h2",{attrs:{id:"安装-ninja"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-ninja"}},[t._v("#")]),t._v(" 安装 ninja")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/MoonBegonia/ninja/tree/main",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/MoonBegonia/ninja/tree/main"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("切换到 main 分支，master 分支隐藏了")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20211103231039.png",alt:"20211103231039"}})]),t._v(" "),a("h2",{attrs:{id:"安装-dailycheckin"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-dailycheckin"}},[t._v("#")]),t._v(" 安装 dailycheckin")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://sitoi.github.io/dailycheckin/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://sitoi.github.io/dailycheckin/"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("必须指定具体的 python 版本号")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://stackoverflow.com/questions/69860233/cant-install-python-package-on-alpine-docker-anymore",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://stackoverflow.com/questions/69860233/cant-install-python-package-on-alpine-docker-anymore"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"安装-nvjdc"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-nvjdc"}},[t._v("#")]),t._v(" 安装 nvjdc")]),t._v(" "),a("p",[t._v("由于大佬已经删除跑路，一键脚本不能使用")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://w.a-zw.com/1689.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://w.a-zw.com/1689.html"),a("OutboundLink")],1)]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拉源码")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 国内服务器")]),t._v("\ngit clone https"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("ghproxy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("https"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("github"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("fzls"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nvjdcdocker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("git "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("root"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nolanjdc\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 国外服务器")]),t._v("\ngit clone https"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("github"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("fzls"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nvjdcdocker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("git "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("root"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nolanjdc\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拉取基础镜像")]),t._v("\ndocker pull shifanga"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nolanhzy"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("latest\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个目录放配置")]),t._v("\ncd "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("root"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nolanjdc\nmkdir "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("p  Config "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" cd Config\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 回到nolanjdc目录创建chromium文件夹并进入")]),t._v("\ncd "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("root"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nolanjdc "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" mkdir "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("p  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("local"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("chromium"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("Linux"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("884014")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" cd "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("local"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("chromium"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("Linux"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("884014")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 下载 chromium")]),t._v("\nwget https"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("mirrors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("huaweicloud"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("chromium"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("browser"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("snapshots"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("Linux_x64"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("884014")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("chrome"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("linux"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("zip "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" unzip chrome"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("linux"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("zip\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 删除刚刚下载的压缩包")]),t._v("\nrm  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("f chrome"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("linux"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("zip\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 回到刚刚创建的目录")]),t._v("\ncd  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("root"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nolanjdc\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 启动镜像")]),t._v("\nsudo docker run   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("name nolanjdc "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("p "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5703")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("d  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("v  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"$(pwd)"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("app \\\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("v "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("etc"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("localtime"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("etc"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("localtime"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("ro \\\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("it "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("privileged"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" shifanga"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nolanhzy"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("latest\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 编辑文件:/root/nolanjdc/Config里面的文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 重启容器，开放端口:5703")]),t._v("\n")])])]),a("h2",{attrs:{id:"脚本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#脚本"}},[t._v("#")]),t._v(" 脚本")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/zero205/JD_tencent_scf",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/zero205/JD_tencent_scf"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/shufflewzc/faker2",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/shufflewzc/faker2"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/he1pu/JDHelp",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/he1pu/JDHelp"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.matools.com/cron",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.matools.com/cron"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/rubyangxg/sillyGirl",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/rubyangxg/sillyGirl"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/julyguazi/xdd",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/julyguazi/xdd"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/KingRan/JDJB",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/KingRan/JDJB"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/764763903a/xdd-plus",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/764763903a/xdd-plus"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://h4w.gitee.io/2021/10/13/%E5%AE%89%E8%A3%85xdd-plus%E6%9C%BA%E5%99%A8%E4%BA%BA/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://h4w.gitee.io/2021/10/13/安装xdd-plus机器人/"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"教程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#教程"}},[t._v("#")]),t._v(" 教程")]),t._v(" "),a("p",[t._v("参考妖友的 B 站视频教程")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://www.yanyuwangluo.cn/239/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.yanyuwangluo.cn/239/"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.yanyuwangluo.cn/209/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.yanyuwangluo.cn/209/"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.bilibili.com/read/cv13786687",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.bilibili.com/read/cv13786687"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.bilibili.com/read/cv13788680",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.bilibili.com/read/cv13788680"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);