(window.webpackJsonp=window.webpackJsonp||[]).push([[288],{624:function(n,t,e){"use strict";e.r(t);var i=e(4),a=Object(i.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("h2",{attrs:{id:"title-js轮播图透明度切换date-2016-04-25-10-22-16tags-js"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#title-js轮播图透明度切换date-2016-04-25-10-22-16tags-js"}},[this._v("#")]),this._v(" title: js轮播图透明度切换\ndate: 2016-04-25 10:22:16\ntags: js")]),this._v(" "),n("p",[this._v("js轮播图透明度切换（带上下页和底部圆点切换）")]),this._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[this._v('<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>js轮播图透明度切换</title>\n    <style type="text/css">\n        * {\n            margin: 0;\n            padding: 0;\n            border: none;\n        }\n        li {\n            list-style: none;\n        }\n        #box {\n            height: 340px;\n            width: 790px;\n            position: relative;\n            margin: 100px auto;\n        }\n        #box #list1 {\n            height: 340px;\n            width: 790px;\n        }\n        #box #list1 li {\n            position: absolute;\n            font-size: 80px;\n            text-align: center;\n            height: 340px;\n            width: 790px;\n            left: 0;\n            top: 0;\n            opacity: 0;\n            filter: alpha(opacity=0);\n        }\n        #box #list1 li img {\n            height: 340px;\n            width: 790px;\n        }\n        #shang,#xia {\n            height: 80px;\n            width: 50px;\n            color: #212121;\n            background: #ccc;\n            font-size: 60px;\n            font-weight: bold;\n            line-height: 80px;\n            text-align: center;\n            position: absolute;\n            top: 130px;\n            opacity: 0.8;\n            filter: alpha(opacity=80);\n            cursor: pointer;\n        }\n        #shang {\n            left: 0;\n        }\n        #xia {\n            right: 0;\n        }\n        #box #list2 {\n            height: 20px;\n            width: 195px;\n            position: absolute;\n            left: 297px;\n            bottom: 25px;\n            opacity: 0.8;\n            filter: alpha(opacity=80);\n        }\n        #box #list2 li {\n            height: 20px;\n            width: 20px;\n            background: #ccc;\n            border-radius: 50%;\n            float: left;\n            margin-right: 5px;\n            cursor: pointer;\n        }\n        #box #list2 li.active {\n            background: black;\n        }\n    </style>\n</head>\n<body>\n    <div id="box">\n        <ul id="list1">\n            <li style="background: red;">1</li>\n            <li style="background: yellow;">2</li>\n            <li style="background: green;">3</li>\n            <li style="background: blue;">4</li>\n            <li style="background: blueviolet;">5</li>\n            <li style="background: brown;">6</li>\n            <li style="background: orangered;">7</li>\n            <li style="background: palevioletred;">8</li>               \n        </ul>\n        <ul id="list2">\n            <li class="active"></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li style="margin-right:0px;"></li>\n        </ul>\n        <div id="shang">\n            &lt;\n        </div>\n        <div id="xia">\n            &gt;\n        </div>\n    </div>\n    <script type="text/javascript">\n        onload = function(){\n            var oBox = document.getElementById(\'box\');\n            var oList1 = document.getElementById(\'list1\');\n            var aLi1 = oList1.getElementsByTagName(\'li\');\n            var oList2 = document.getElementById(\'list2\');\n            var aLi2 = oList2.getElementsByTagName(\'li\');\n            var oShang = document.getElementById(\'shang\');\n            var oXia = document.getElementById(\'xia\');\n            aLi1[0].style.opacity = 1;\n            aLi1[0].style.filter = \'alpha(opacity=100)\';\n            var size = aLi1.length;\n            var i = 0;\n            var timer = setInterval(function(){\n                i++;\n                move();\n            },2000);\n            function move(){\n                if (i >= size ) {\n                    i = 0;\n                }\n                if (i < 0 ) {\n                    i = size - 1;\n                }\n                for (var j = 0; j < aLi1.length; j++) {\n                    if (j == i) {\n                        animate(aLi1[j],{opacity:100});\n                        aLi2[j].className = \'active\';\n                    }else{\n                        animate(aLi1[j],{opacity:0});\n                        aLi2[j].className = \'\';\n                    }\n                }\n            }\n            //前一张\n            oShang.onclick = function(e){\n                var evt = e || event;\n                evt.preventDefault();\n                i--;\n                move();\n            }\n            //后一张\n            oXia.onclick = function(e){\n                var evt = e || event;\n                evt.preventDefault();\n                i ++;\n                move();\n            }\n            //下面的圆点\n            for(var k = 0;k < aLi2.length; k ++){\n                aLi2[k].index = k;\n                aLi2[k].onmouseenter = function(){\n                    i = this.index;\n                    move();\n                }\n            }\n            oBox.onmouseenter = function(){\n                clearInterval(timer);\n            }\n            oBox.onmouseleave = function(){\n                timer = setInterval(function(){\n                    i ++;\n                    move();\n                },2000);\n            }\n\n\n\n\n\n\n\n\n/*************************缓冲运动可封装留着以后备用^_^*************************/\n            function getStyleAttr(obj, attr){\n                if (window.getComputedStyle){\n                    return getComputedStyle(obj, null)[attr]; \n                }\n                else {\n                    return obj.currentStyle[attr];  \n                }\n            }\n            function animate(obj, json, fn){\n                clearInterval(obj.timer); \n                obj.timer = setInterval(function(){\n                    var bStop = true; \n                    for (var attr in json){\n                        var iTarget = json[attr]; \n                        var current;\n                        if (attr == "opacity"){ \n                            current = parseFloat(getStyleAttr(obj, attr))*100;\n                            current = Math.round(current);\n                        }\n                        else { \n                            current = parseFloat(getStyleAttr(obj, attr));\n                            current = Math.round(current);\n                        }\n                        var speed = (iTarget-current)/8;    (400-393)/8\n                        speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);\n                        if (current != iTarget){\n                            bStop = false; \n                        }\n                        if (attr == "opacity"){ \n                            obj.style[attr] = (current+speed)/100;\n                            obj.style.filter = "alpha(opacity=" + (current+speed) + ")";\n                        }\n                        else { \n                            obj.style[attr] = current+speed + "px";\n                        }\n                    }\n                    if (bStop){\n                        console.log("停止运动");\n                        clearInterval(obj.timer); \n                        if (fn) {\n                            fn(); \n                        }\n                    }\n                }, 30);\n            }\n        }\n\n    <\/script>\n</body>\n</html>')])])])])}),[],!1,null,null,null);t.default=a.exports}}]);