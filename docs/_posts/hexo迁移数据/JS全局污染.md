---
title: JS全局污染
date: 2021-06-05 16:06:21
permalink: /pages/901047/
categories: 
  - hexo迁移数据
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
  permalink: null
  categories: null
sidebar: auto
---
title: JS全局污染
date: 2016-02-16 11:37:45
categories:	js
tags:	js
---
## 原则

1.用匿名函数将脚本包起来；

2.使用多级命名空间。

这第二条“使用多级命名空间”这个，我觉得并不是很完美的好主意。因为如果级数太多的话会造成变量名字变得长的一逼。

<!--more-->

## 改进过程

### 原始代码

没有做过任何优化的满目疮痍的代码。a.js 和 b.js 都有全局变量 window.a ，导致冲突，全局变量属于 window 作用域下的。

	//a.js
	<script type="text/javascript">
	    //都什么时代了，script标签还写type属性呢？黄牌警告！下次绝逼不写了。
	    var a = 123, b = "hello world";
	</script>
	
	//b.js
	<script>
	    //看！这把没有写了吧~就是这么任性，上面的那个写了的也绝逼不改！
	    var a, c = "abc";
	</script>

### 使用匿名函数

通过匿名函数改变了a.js 和 b.js 中的变量 a 的作用域，使得他们都不再是全局变量了，但是在 b.js 中无法访问在 a.js 中的变量 a， 换而言之，他们之间没办法通信了。

	//a.js
	(function() {
	    var a = 123, b = "hello world";
	})();
	
	//b.js
	(function() {
	    var a, c = "abc";
	})();

### 使用全局变量进行通信

	var str;
	//a.js
	(function() {
	    var a = 123,
	    b = "hello world";
	    window.str = a;
	})();
	
	//b.js
	(function() {
	    var a, c = "abc";
	    alert(window.str);
	})();

使用 window.str 这种全局全局变量作为通信的媒介其实并不是一个好办法，这样做会导致全局变量越来越多，反而不好维护。

### 使用命名空间

	var GLOBAL = {};
	//a.js
	(function() {
	    var a = 123,
	    b = "hello world";
	    GLOBAL.A.a = a;
	})();
	
	//b.js
	(function() {
	    var a, c = "abc";
	    alert(GLOBAL.A.a);
	})();

使用单一的全局变量 GlOBAL ，匿名空间里需要保存的属性都在全局变量 GLOBAL 的基础上使用命名空间的方式进行拓展。这里给命名空间起名字也需要很讲究，好的命名规则会对团队协同合作有很大的帮助

## js一些常用的封装  
----------------------解决兼容性方法-----------------------  
### 获取元素的计算后样式属性
	function getStyle(element,attr) {
		if (element.currentStyle) {
			return element.currentStyle[attr];
		}else{
			return window.getComputedStyle(element,null){
				return window.getComputedStyle(element,null)[attr];
			}
		}
	}

### scroll().top or scroll().left获取已经滚动到元素的左边界或上边界的像素数  
	function scroll() {
			return {
				top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollLeft || 0,
				left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
			};
		}
### 获取可视窗口的大小
		function client() {
			return {
				width:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth ||0,
				height:window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
			};
		}
### event兼容  
	//event兼容
	var eventCompatible = {
	    //event兼容
	    getEvent: function(event) {
	        return event || window.event;
	    },
	
	    //阻止冒泡事件
	    stopPropagation: function(event) {
	        var event = event || window.event;
	        if(event && event.stopPropagation) {
	            return event.stopPropagation();
	        } else {
	            return event.cancelBubble = true;
	        }
	    },
	
	    //event.target 事件的目标 (事件委托)
	    getTarget: function(event) {
	        var event = event || window.event;
	        return event.target ? event.target : event.srcElement;
	    },
	
	    //鼠标页面坐标
	    page: function(event) {
	        var event = event || window.event;
	        return {
	            x: event.pageX || event.clientX + document.documentElement.scrollLeft,
	            y: event.pageY || event.clientY + document.documentElement.scrollTop
	        };
	    },
	
	    //阻止默认行为
	    prevent: function(event){
	        var event = event || window.event;
	        if (event.preventDefault) {
	            return event.preventDefault();
	        }else{
	            return event.returnValue = false;
	        }
	    }
	};
### 监听事件兼容处理  
	function eventListener(obj, type, handler, unbind) {
	    if(unbind === true) {
	        if(obj.removeEventListener) {
	            obj.removeEventListener(type, handler);
	        } else {
	            obj.detachEvent("on" + type, handler);
	        };
	    } else {
	        if(obj.addEventListener) {
	            obj.addEventListener(type, handler);
	        } else {
	            obj.attachEvent("on" + type, handler);
	        };
	    };
	};
### 清楚选择  
	function clearSelection() {
    	return window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	}
##-------------------自定义的方法---------------------------

###  trim去掉字符串两端的空格

	function trim(str) {
    	return str.replace(/^\s+|\s+$/g, "");
	}


### 十进制转其他进制 type类型有"bit"、"oct"、"hex"

	function changeFromDec(type, value) {
	    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]    
		var scale = 0;
	    var sys = "";
	    if(!/^[\d]*$/g.test(value)) {
	        return "";
	    }
	    if(!value) {
	        return "";
	    }
	    if(type === "bit") {
	        scale = 2;
	    } else if(type === "oct") {
	        scale = 8;
	    } else if(type === "hex") {
	        scale = 16;
	        while(true) {
	            sys = arr[value % 16] + sys;
	            value = parseInt(value / 16);
	            if(!value) {
	                break;
	            }
	        }
	        return sys;
	    }
	    while(true) {
	        sys = value % scale + sys;
	        value = parseInt(value / scale);
	        if(!value) {
	            break;
	        }
	    }
	    return sys;
	}


### 二进制、八进制、十六进制转十进制;


	function toDec(type, value) {
	    if(typeof value === "number") value += "";
	    var scale = 0;
	    var flag = false;
	    if(type === "bit") {
	        flag = /^[01]*$/g.test(value);
	        scale = 2;
	    } else if(type === "oct") {
	        flag = /^[0-7]*$/g.test(value)
	        scale = 8;
	    } else if(type === "hex") {
	        flag = /^[0-9a-fA-F]*$/g.test(value)
	        scale = 16;
	    }
	    if(!flag || !value) return;
	    var arr = value.split("");
	    var dec = 0;
	    for(var i = 0; i < arr.length; i++) {
	        if(isNaN(parseInt(arr[i]))) {
	            var charCode = arr[i].charCodeAt(0);
	            if(charCode > 64 && charCode < 71) {
	                dec += (charCode - 55) * Math.pow(scale, arr.length - 1 - i)
	            } else if(charCode > 96 && charCode < 103) {
	                dec += (charCode - 87) * Math.pow(scale, arr.length - 1 - i)
	            }
	        } else {
	            dec += arr[i] * Math.pow(scale, arr.length - 1 - i);
	        }
	    }
	    return dec;
	}


### 转动时钟

	function clock() {
	    var d = new Date();
	    var ms = d.getMilliseconds();
	    var s = d.getSeconds() + ms / 1000;
	    var m = d.getMinutes() + s / 60;
	    var h = d.getHours() + m / 60;
	    second.style.transform = "rotate(" + s * 6 + "deg)";
	    minute.style.transform = "rotate(" + m * 6 + "deg)";
	    hour.style.transform = "rotate(" + h * 30 + "deg)";
	}


### 匀速动画

	function animate(obj, attr, distance) {
	    var step = 20;
	    var leader = parseInt(getStyle(obj, attr)) || 0
	    clearInterval(obj.atimer);
	    obj.atimer = setInterval(function() {
	        distance > leader ? leader += step : leader -= step;
	        if(Math.abs(distance - leader) > step) {
	            obj.style[attr] = leader + "px";
	        } else {
	            obj.style[attr] = distance + "px";
	            clearInterval(obj.atimer);
	        }
	    }, 15);
	}


### 缓动动画(单个数值属性)

	function slowSpeedAnimate(element, attr, distance) {
	    clearInterval(element.timer);
	    element.timer = setInterval(function() {
	        var removing = parseInt(getStyle(element, attr)) || 0; //element.offsetLeft;
	        var step = (distance - removing) / 20;
	        step = step > 0 ? Math.ceil(step) : Math.floor(step);
	        removing = removing + step;
	        element.style[attr] = removing + "px";
	        if(removing == distance) {
	            clearInterval(element.timer);
	        }
	    }, 15)
	}


### 缓动动画(多个数值属性)

	function moreAnimate(element, json, interval, fn) {
	    clearInterval(element.timer);
	    element.timer = setInterval(function() {
	        var flag = true;
	        for(var k in json) {
	            if(k === "opacity") {
	                var removing = getStyle(element, k) * 100; //element.offsetLeft;
	                var distance = json[k] * 100;
	                var step = (distance - removing) / interval;
	                step = step > 0 ? Math.ceil(step) : Math.floor(step);
	                removing = removing + step;
	                element.style[k] = removing / 100;
	            } else {
	                var removing = parseInt(getStyle(element, k)) || 0; //element.offsetLeft;
	                var distance = json[k];
	                var step = (distance - removing) / interval;
	                step = step > 0 ? Math.ceil(step) : Math.floor(step);
	                removing = removing + step;
	                element.style[k] = removing + "px";
	            }
	            if(removing != distance) {
	                flag = false;
	            }
	        }
	        if(flag) {
	            clearInterval(element.timer);
	            if(fn) {
	                fn();
	            }
	        }
	
	    }, 15)
	}


### 进度条

		function Progress(id, width, height, outClass, inClass) {
	    this.width = width;
	    this.height = height;
	    this.color = "#fff";
	    this.progress = document.createElement("div");
	    this.percentage = document.createElement("div");
	    this.filler = document.createElement("div");
	    var element = document.getElementById(id);
	    if(width) {
	        this.progress.style.width = this.width + "px";
	    } else {
	        this.progress.style.width = "200px";
	    }
	    if(height) {
	        this.progress.style.height = this.height + "px";
	    } else {
	        this.progress.style.height = "20px";
	    }
	    if(typeof outClass === "string" && (/^[a-zA-Z](\w|[-])+$/g.test(outClass))) {
	        this.progress.className = outClass;
	    } else {
	        this.progress.style.border = "1px solid #cccccc";
	        this.progress.style.backgroundImage = "linear-gradient(to bottom, #ccc 0%, #fff 40%, #ccc 100%)";
	        this.progress.style.borderRadius = "10px";
	    }
	    this.progress.style.overflow = "hidden";
	    this.progress.style.position = "relative";
	    element.appendChild(this.progress);
	    //
	    this.progress.appendChild(this.percentage);
	    this.percentage.style.width = "100%";
	    this.percentage.style.height = "100%";
	    this.percentage.style.textAlign = "center";
	    this.percentage.style.position = "absolute";
	    this.percentage.innerHTML = "0%";
	    //
	    this.progress.appendChild(this.filler);
	    this.filler.style.height = "100%";
	    this.filler.style.width = 0;
	    if(typeof inClass === "string" && (/^[a-zA-Z](\w|[-])+$/g.test(inClass))) {
	        this.filler.className = inClass;
	    } else {
	        this.filler.style.backgroundColor = "#DC7BBE";
	        this.filler.style.backgroundImage = "linear-gradient(to bottom, #0AF 0%, #0ff 40%, #0AF 100%)";
	    }
	}
	Progress.prototype.fill = function(value) {
	    if(value) {
	        this.percentage.innerHTML = value + "%";
	        this.percentage.style.color = this.color;
	        value = (this.progress.offsetWidth - 2) / 100 * value;
	        this.filler.style.width = value + "px";
	    } else {
	        this.filler.style.width = 0;
	        this.percentage.innerHTML = "0%";
	    }
	}


### ajax封装

	function ajax(a, b) { 
		//type, url, async, dataType, data, fn
	    var xhr = null,
	        type = "get",
	        url = "#",
	        async = true,
	        dataType = "text",
	        data = "",
	        jsonp = "",
	        jsonpCallback = "",
	        methodName = "",
	        c = null;
	    if(typeof a === "string") {
	        url = a;
	    }
	    if(typeof a === "object") {
	        c = a;
	    } else if(typeof b == "object") {
	        c = b;
	    }
	    if(c) {
	        if(c.type && typeof c.type === "string") {
	            type = c.type;
	        };
	        if(c.url && typeof c.url === "string") {
	            url = c.url;
	        };
	        if(c.async && typeof c.async === "boolean") {
	            async = c.async;
	        };
	        if(c.dataType && typeof c.dataType === "string") {
	            dataType = c.dataType;
	        };
	        if(c.data && typeof c.data === "object") {
	            var arr = [];
	            for(k in c.data) {
	                arr.push(k + "=" + c.data[k]);
	            }
	            data = arr.join("&");
	        };
	        if(c.jsonp && typeof c.jsonp === "string") {
	            if(!c.dataType) {
	                dataType = "jsonp";
	            }
	            jsonp = c.jsonp;
	            if(data) {
	                data += "&";
	            }
	        } else {
	            jsonp = "callback";
	        }
	        if(c.jsonpCallback && typeof c.jsonpCallback === "string") {
	            methodName = c.jsonpCallback;
	        } else {
	            methodName = "jquery" + new Date().getTime() + "_" + (Math.random() + "").substr(2);
	        }
	    };
	    if(dataType == "jsonp") {
	        data += jsonp + "=" + methodName;
	        window[methodName] = function(data) {
	            c.success(data);
	        }
	        var script = document.createElement("script");
	        script.src = url + "?" + data;
	        var head = document.getElementsByTagName("head")[0];
	        head.appendChild(script);
	    } else {
	        //ajax部分
	        if(window.XMLHttpRequest) {
	            xhr = new XMLHttpRequest();
	        } else {
	            xhr = ActiveXObject("Microsoft.XMLHTTP");
	        }
	        if(type == "get") {
	            if(data) {
	                url += encodeURI("?" + data);
	            }
	            data = null;
	        };
	        xhr.open(type, url, async);
	        if(type == "post") {
	            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        };
	        xhr.send(data);
	        xhr.onreadystatechange = function() {
	            if(xhr.readyState == 4 && xhr.status == 200) {
	                var obj = {
	                    text: xhr.responseText,
	                    json: JSON.parse(xhr.responseText),
	                };
	                var data = obj[dataType];
	                if(typeof c.success === "function") {
	                    c.success(data);
	                }
	            }
	        }
	    }
	}


### millisec是距离 GMT 时间 1970 年 1 月 1 日午夜的毫秒数 (解析通过ajax返回的数据中的毫秒数值的日期)

	function getFullDate(millisec, lang) {
	    var data = new Date();
	    data.setTime(millisec);
	    var year = data.getFullYear(),
	        month = data.getMonth(),
	        day = data.getDate(),
	        week = data.getDay(),
	        hour = data.getHours(),
	        minute = data.getMinutes(),
	        second = data.getSeconds(),
	        am = "am",
	        pm = "pm",
	        enWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	        cnWeek = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	        enMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	        cnMonth = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	        cnDay = ["廿", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]    if(lang == "cn") {
	        am = "上午";
	        pm = "下午";
	    };
	    day = day < 10 ? "0" + day : day;
	    var obj = {
	        year: year,
	        month: lang ? (lang == "cn" ? cnMonth[month] : enMonth[month]) : (month < 10 ? "0" + (month + 1) : (month + 1)),
	        day: day,
	        week: lang == "en" ? enWeek[week] : cnWeek[week],
	        hour: hour < 10 ? "0" + hour : hour,
	        minute: minute < 10 ? "0" + minute : minute,
	        second: second < 10 ? "0" + second : second,
	        ms: data.getMilliseconds(),
	        am: am,
	        pm: pm,
	        Hour: hour + minute / 60 > 12 ? (hour == 12 ? pm + hour : pm + hour % 12) : am + hour,
	    };
	    return obj;
	}


### 右键菜单

	function RightMenu(area) {
	    this.area = area;
	    this.menu = null;
	}

### 根据传入的值获取目标
	RightMenu.prototype.target = function(area) {
	    if(typeof area === "string") {
	        return document.getElementById(area);
	    } else if(typeof area === "object") {
	        return area;
	    }
	}

	RightMenu.prototype.init = function(data,defaultStyle, userStyle, hoverStyle) {
	    this.createMenu(data, defaultStyle, userStyle, hoverStyle);
	    this.showMenu();
	}

	RightMenu.prototype.createMenu = function(data, defaultStyle, userStyle, hoverStyle) {
	    if(typeof defaultStyle == "string" && !defaultStyle) {
	        hoverStyle = userStyle;
	        userStyle = defaultStyle;
	        defaultStyle = true;
	    }
	    //创建菜单及样式
	    this.menu = document.createElement("ul");
	    this.menu.style.position = "absolute";
	    this.menu.style.margin = 0;
	    this.menu.style.padding = "2px";
	    this.menu.style.listStyle = "none";
	    this.menu.style.display = "none";
	    if(!defaultStyle) {
	        this.menu.style.border = "1px solid #DDDDDD";
	        this.menu.style.backgroundColor = "#CCCCCC";
	        this.menu.style.boxShadow = "5px 5px 5px #ccc";
	    } else {
	        this.menu.className = userStyle;
	    }
	    //选中项样式
	    var hover = document.createElement("span");
	    hover.style.display = "block";
	    hover.style.position = "absolute"
	    hover.style.top = 0;
	    hover.style.left = 0;
	    hover.style.boxSizing = "border-box";
	    hover.style.width = "100%";
	    hover.style.height = "100%";
	    if((!defaultStyle) || (defaultStyle && !hoverStyle)) {
	        hover.style.border = "1px solid #aaa";
	        hover.style.borderRadius = "5px";
	        hover.style.backgroundImage = "linear-gradient(to bottom,rgba(255,255,255,0.5)0%,rgba(255,255,255,0.1)50%,rgba(255,255,255,0.1)100%)";
	
	    } else {
	        hover.className = hoverStyle;
	    }
	    //创建菜单项
	    for(var item in data) {
	        var li = document.createElement("li");
	        li.style.position = "relative";
	        li.style.padding = "5px 10px";
	        li.style.cursor = "pointer";
	        //绑定事件
	        li.addEventListener("mouseenter", function() {
	            this.appendChild(hover);
	        });
	        li.addEventListener("mouseleave", function() {
	            this.removeChild(hover);
	        });
	        var itemData = data[item]        for(var obj in itemData) {
	            if(typeof itemData[obj] === "string") {
	                li.innerHTML = itemData[obj];
	            } else if(typeof itemData[obj] === "object") {
	                var handlerData = itemData[obj];
	                for(var type in handlerData) {
	                    li.addEventListener(type, handlerData[type]);
	                }
	            }
	        }
	        this.menu.appendChild(li);
	    }
	    this.target(this.area).appendChild(this.menu);
	}

	RightMenu.prototype.showMenu = function() {
	    var that = this;
	    this.menu.parentNode.oncontextmenu = function(ev) {
	        that.menu.style.display = "block";
	        that.menu.style.left = ev.pageX + "px";
	        that.menu.style.top = ev.pageY + "px";
	        if(that.menu.parentNode.offsetWidth < that.menu.offsetLeft + that.menu.offsetWidth) {
	            that.menu.style.left = ev.pageX - that.menu.offsetWidth + "px";
	        };
	        if(that.menu.parentNode.offsetHeight < that.menu.offsetTop + that.menu.offsetHeight) {
	            that.menu.style.top = ev.pageY - that.menu.offsetHeight + "px";
	        };
	        return false;
	    }
	    this.menu.parentNode.onclick = function() {
	        that.menu.style.display = "none";
	    }
	    document.onkeydown = function(e) {
	        if(e.keyCode == 18 || e.keyCode == 27) {
	            that.menu.style.display = "none";
	        }
	    }
	}


### 拖拽

	function Drag(target, area) {
        this.target = target;
        this.area = area;
    }

    //根据传入的值获取目标
    Drag.prototype.dragTarget = function(target) {
        if(typeof target === "string") {
            return document.getElementById(target);
        } else if(typeof target === "object") {
            return target;
        }
    }

    Drag.prototype.init = function() {
        this.target = this.dragTarget(this.target);
        this.target.style.position = "absolute";
        this.target.setAttribute("draggable","true");
        this.dragEvent();
    }

    Drag.prototype.dragEvent = function() {
        var that = this;
        this.target.onmousedown = function(e) {
            e = e || window.event;
            that.disX = e.clientX - that.target.offsetLeft;
            that.disY = e.clientY - that.target.offsetTop;
            document.onmousemove = function(e) {
                that.moveEvent(e);
            }
            document.onmouseup = function(){
                that.target.style.opacity = "1";
                document.onmousemove = document.onmouseup = null;
            }
            return false;
        }
    }
    Drag.prototype.moveEvent = function(e) {
        var limitX = e.clientX - this.disX;
        var limitY = e.clientY - this.disY;
        //没有指定区域则用document

        if (!this.area) {
            this.area = document.documentElement;
        }
        if(limitX < this.area.offsetLeft) {
            limitX = this.area.offsetLeft;
        } else if(limitX > this.area.clientWidth + this.area.offsetLeft - this.target.offsetWidth) {
            limitX =  this.area.clientWidth + this.area.offsetLeft - this.target.offsetWidth;
        }
        if(limitY < this.area.offsetTop) {
            limitY = this.area.offsetTop;
        } else if(limitY > this.area.clientHeight + this.area.offsetTop - this.target.offsetHeight) {
            limitY = this.area.clientHeight + this.area.offsetTop - this.target.offsetHeight;
        }
        this.target.style.left = limitX + "px";
        this.target.style.top = limitY + "px";
        this.target.style.opacity = "0.8";
    }