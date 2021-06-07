---
title: js通过Ajax异步操作后端xml数据的基本原理
date: 2021-06-05 16:06:21
permalink: /pages/68eaaf/
categories: 
  - hexo迁移数据
author: 
  name: 神族九帝
  link: https://github.com/wu529778790
sidebar: auto
tags: 
  - 
---
title: js通过Ajax异步操作后端xml数据的基本原理
date: 2016-05-30 12:20:31
categories: Ajax
tags: Ajax
---

      

       Ajax的核心操作对象是xmlHttpRequest

       
　　  简化操作步骤：实例化一个xmlHttpRequest对象 ==> 发送请求 ==> 接受响应 ==> 执行回调

<!--more-->
实例化对象

　　考虑到兼容问题,非IE5/IE6 使用 => new XMLHttpRequest();

　　IE5/IE6使用 => new ActiveXObject(Microsoft.XMLHTTP);    ☯神呐，请带走IE吧！

 

发送请求

　　使用 XMLHttpRequest 对象的 open('GET',url,async) 和 send() 方法：

　　❶ open() 有三个参数：

　　　　分别为http请求方式(get/post) ==》与 POST 相比，GET 更简单也更快，POST 没有数据量限制，不会缓存，相对安全

　　　　http请求地址 ==》url(统一资源定位符)文件所在服务器的地址

　　　　async：true（异步）或 false（同步）

　　❷send(string)   string：仅用于 POST 请求

 

接受响应，执行回调

　　当readyState的值发生改变时，触发readystatechange事件，事件中就可以为所欲为了

　　readyState==4  =>请求加载完成  /    http的状态为200 =>响应成功

	<!DOCTYPE html>
	<html>
	 
	    <head>
	        <meta charset="UTF-8">
	        <title>异步操作集合啦</title>
	        <script type="text/javascript">
	            /*
	             * Ajax的核心操作对象是xmlHttpRequest
	             *    简化操作步骤：实例化一个xmlHttpRequest对象  ==> 发送请求  ==> 接受响应 ==> 执行回调
	             */
	            var jsAjax = function() {
	                var xmlHttpR = null;
	                if(window.ActiveXObject) {
	                    //IE5/IE6把xmlHttpRequest封装在window的子对象ActiveXObject中
	                    xmlHttpR = new ActiveXObject(Microsoft.XMLHTTP);
	                } else if(window.XMLHttpRequest) {
	                    //非IE5、IE6
	                    xmlHttpR = new XMLHttpRequest();
	                }
	 
	                if(xmlHttpR) {
	                    xmlHttpR.open("GET", "ajax.xml", true);
	                    xmlHttpR.onreadystatechange = function(e) {
	                        if(xmlHttpR.readyState == 4) {
	                            if(xmlHttpR.status == 200) {
	                                console.log(xmlHttpR.responseText);
	                            }
	                        }
	                    }
	                    xmlHttpR.send(null);
	                }
	            }
	        </script>
	    </head>
	 
	    <body>
 
    </body>
	</html>

	01
		<?xml version="1.0" encoding="utf-8"?>
	02
		<bookstore>
	03
	    <book category="COOKING">
	04
	        <title lang="en">Everyday Italian</title>
	05
	        <author>Giada De Laurentiis</author>
	06
	        <year>2005</year>
	07
	        <price>30.00</price>
	08
	    </book>
	09
	    <book category="CHILDREN">
	10
	        <title lang="en">Harry Potter</title>
	11
	        <author>J K. Rowling</author>
	12
	        <year>2005</year>
	13
	        <price>29.99</price>
	14
	    </book>
	15
	    <book category="WEB">
	16
	        <title lang="en">Learning XML</title>
	17
	        <author>Erik T. Ray</author>
	18
	        <year>2003</year>
	19
	        <price>39.95</price>
	20
	    </book>
	21
		</bookstore>  
### js中几种实用的跨域方法原理详解  
 [参考博客](http://www.cnblogs.com/2050/p/3191744.html)  
### ajax的简单发送    
前段代码  

	<!DOCTYPE HTML>
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Demo</title>
	<style>
	body, input, select, button, h1 {
		font-size: 28px;
		line-height:1.7;
	}
	</style>	
	</head>
	
	<body>
	
	<h1>员工查询</h1>
	
	<label>请输入员工编号：</label>
	<input type="text" id="keyword" />
	<button id="search">查询</button>
	<p id="searchResult"></p>
	
	<h1>员工新建</h1>
	<label>请输入员工姓名：</label>
	<input type="text" id="staffName" /><br>
	<label>请输入员工编号：</label>
	<input type="text" id="staffNumber" /><br>
	<label>请选择员工性别：</label>
	<select id="staffSex">
	<option>女</option>
	<option>男</option>
	</select><br>
	<label>请输入员工职位：</label>
	<input type="text" id="staffJob" /><br>
	<button id="save">保存</button>
	<p id="createResult"></p>
	
	<script>
	document.getElementById("search").onclick = function() { 
		var request = new XMLHttpRequest();
		request.open("GET", "server.php?number=" + document.getElementById("keyword").value);
		request.send();
		request.onreadystatechange = function() {
			if (request.readyState===4) {
				if (request.status===200) { 
					document.getElementById("searchResult").innerHTML = request.responseText;
				} else {
					alert("发生错误：" + request.status);
				}
			} 
		}
	}

	document.getElementById("save").onclick = function() { 
		var request = new XMLHttpRequest();
		request.open("POST", "server.php");
		var data = "name=" + document.getElementById("staffName").value 
		                  + "&number=" + document.getElementById("staffNumber").value 
		                  + "&sex=" + document.getElementById("staffSex").value 
		                  + "&job=" + document.getElementById("staffJob").value;
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		request.send(data);
		request.onreadystatechange = function() {
			if (request.readyState===4) {
				if (request.status===200) { 
					document.getElementById("createResult").innerHTML = request.responseText;
				} else {
					alert("发生错误：" + request.status);
				}
			} 
		}
	}
	</script>
	</body>
	</html>  
后台php代码：    

	<?php
	//设置页面内容是html编码格式是utf-8
	header("Content-Type: text/plain;charset=utf-8"); 
	//header("Content-Type: application/json;charset=utf-8"); 
	//header("Content-Type: text/xml;charset=utf-8"); 
	//header("Content-Type: text/html;charset=utf-8"); 
	//header("Content-Type: application/javascript;charset=utf-8"); 
	
	//定义一个多维数组，包含员工的信息，每条员工信息为一个数组
	$staff = array
		(
			array("name" => "洪七", "number" => "101", "sex" => "男", "job" => "总经理"),
			array("name" => "郭靖", "number" => "102", "sex" => "男", "job" => "开发工程师"),
			array("name" => "黄蓉", "number" => "103", "sex" => "女", "job" => "产品经理")
		);
	
	//判断如果是get请求，则进行搜索；如果是POST请求，则进行新建
	//$_SERVER是一个超全局变量，在一个脚本的全部作用域中都可用，不用使用global关键字
	//$_SERVER["REQUEST_METHOD"]返回访问页面使用的请求方法
	if ($_SERVER["REQUEST_METHOD"] == "GET") {
		search();
	} elseif ($_SERVER["REQUEST_METHOD"] == "POST"){
		create();
	}
	
	//通过员工编号搜索员工
	function search(){
		//检查是否有员工编号的参数
		//isset检测变量是否设置；empty判断值为否为空
		//超全局变量 $_GET 和 $_POST 用于收集表单数据
		if (!isset($_GET["number"]) || empty($_GET["number"])) {
			echo "参数错误";
			return;
		}
		//函数之外声明的变量拥有 Global 作用域，只能在函数以外进行访问。
		//global 关键词用于访问函数内的全局变量
		global $staff;
		//获取number参数
		$number = $_GET["number"];
		$result = "没有找到员工。";
		
		//遍历$staff多维数组，查找key值为number的员工是否存在，如果存在，则修改返回结果
		foreach ($staff as $value) {
			if ($value["number"] == $number) {
				$result = "找到员工：员工编号：" . $value["number"] . "，员工姓名：" . $value["name"] . 
				                  "，员工性别：" . $value["sex"] . "，员工职位：" . $value["job"];
				break;
			}
		}
	    echo $result;
	}
	
	//创建员工
	function create(){
		//判断信息是否填写完全
		if (!isset($_POST["name"]) || empty($_POST["name"])
			|| !isset($_POST["number"]) || empty($_POST["number"])
			|| !isset($_POST["sex"]) || empty($_POST["sex"])
			|| !isset($_POST["job"]) || empty($_POST["job"])) {
			echo "参数错误，员工信息填写不全";
			return;
		}
		//TODO: 获取POST表单数据并保存到数据库
		
		//提示保存成功
		echo "员工：" . $_POST["name"] . " 信息保存成功！";
	}  
### ajaxjson数据格式  
HTML：  

	<!DOCTYPE HTML>
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Demo</title>
	<style>
	body, input, select, button, h1 {
		font-size: 28px;
		line-height:1.7;
	}
	</style>	
	</head>
	
	<body>
	
	<h1>员工查询</h1>
	
	<label>请输入员工编号：</label>
	<input type="text" id="keyword" />
	<button id="search">查询</button>
	<p id="searchResult"></p>
	
	<h1>员工新建</h1>
	<label>请输入员工姓名：</label>
	<input type="text" id="staffName" /><br>
	<label>请输入员工编号：</label>
	<input type="text" id="staffNumber" /><br>
	<label>请选择员工性别：</label>
	<select id="staffSex">
	<option>女</option>
	<option>男</option>
	</select><br>
	<label>请输入员工职位：</label>
	<input type="text" id="staffJob" /><br>
	<button id="save">保存</button>
	<p id="createResult"></p>
	
	<script>
	document.getElementById("search").onclick = function() { 
		var request = new XMLHttpRequest();
		request.open("GET", "serverjson.php?number=" + document.getElementById("keyword").value);
		request.send();
		request.onreadystatechange = function() {
			if (request.readyState===4) {
				if (request.status===200) { 
					var data = JSON.parse(request.responseText);
					if (data.success) { 
						document.getElementById("searchResult").innerHTML = data.msg;
					} else {
						document.getElementById("searchResult").innerHTML = "出现错误：" + data.msg;
					}
				} else {
					alert("发生错误：" + request.status);
				}
			} 
		}
	}
	
	document.getElementById("save").onclick = function() { 
		var request = new XMLHttpRequest();
		request.open("POST", "serverjson.php");
		var data = "name=" + document.getElementById("staffName").value 
		                  + "&number=" + document.getElementById("staffNumber").value 
		                  + "&sex=" + document.getElementById("staffSex").value 
		                  + "&job=" + document.getElementById("staffJob").value;
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		request.send(data);
		request.onreadystatechange = function() {
			if (request.readyState===4) {
				if (request.status===200) { 
					var data = JSON.parse(request.responseText);
					if (data.success) { 
						document.getElementById("createResult").innerHTML = data.msg;
					} else {
						document.getElementById("createResult").innerHTML = "出现错误：" + data.msg;
					}
				} else {
					alert("发生错误：" + request.status);
				}
			} 
		}
	}
	</script>
	</body>
	</html>  
ajaxjson php：  

	<?php
	//设置页面内容是html编码格式是utf-8
	header("Content-Type: text/plain;charset=utf-8"); 
	//header("Content-Type: application/json;charset=utf-8"); 
	//header("Content-Type: text/xml;charset=utf-8"); 
	//header("Content-Type: text/html;charset=utf-8"); 
	//header("Content-Type: application/javascript;charset=utf-8"); 
	
	//定义一个多维数组，包含员工的信息，每条员工信息为一个数组
	$staff = array
		(
			array("name" => "洪七", "number" => "101", "sex" => "男", "job" => "总经理"),
			array("name" => "郭靖", "number" => "102", "sex" => "男", "job" => "开发工程师"),
			array("name" => "黄蓉", "number" => "103", "sex" => "女", "job" => "产品经理")
		);
	
	//判断如果是get请求，则进行搜索；如果是POST请求，则进行新建
	//$_SERVER是一个超全局变量，在一个脚本的全部作用域中都可用，不用使用global关键字
	//$_SERVER["REQUEST_METHOD"]返回访问页面使用的请求方法
	if ($_SERVER["REQUEST_METHOD"] == "GET") {
		search();
	} elseif ($_SERVER["REQUEST_METHOD"] == "POST"){
		create();
	}
	
	//通过员工编号搜索员工
	function search(){
		//检查是否有员工编号的参数
		//isset检测变量是否设置；empty判断值为否为空
		//超全局变量 $_GET 和 $_POST 用于收集表单数据
		if (!isset($_GET["number"]) || empty($_GET["number"])) {
			echo '{"success":false,"msg":"参数错误"}';
			return;
		}
		//函数之外声明的变量拥有 Global 作用域，只能在函数以外进行访问。
		//global 关键词用于访问函数内的全局变量
		global $staff;
		//获取number参数
		$number = $_GET["number"];
		$result = '{"success":false,"msg":"没有找到员工。"}';
		
		//遍历$staff多维数组，查找key值为number的员工是否存在，如果存在，则修改返回结果
		foreach ($staff as $value) {
			if ($value["number"] == $number) {
				$result = '{"success":true,"msg":"找到员工：员工编号：' . $value["number"] . 
								'，员工姓名：' . $value["name"] . 
								'，员工性别：' . $value["sex"] . 
								'，员工职位：' . $value["job"] . '"}';
				break;
			}
		}
	    echo $result;
	}
	
	//创建员工
	function create(){
		//判断信息是否填写完全
		if (!isset($_POST["name"]) || empty($_POST["name"])
			|| !isset($_POST["number"]) || empty($_POST["number"])
			|| !isset($_POST["sex"]) || empty($_POST["sex"])
			|| !isset($_POST["job"]) || empty($_POST["job"])) {
			echo '{"success":false,"msg":"参数错误，员工信息填写不全"}';
			return;
		}
		//TODO: 获取POST表单数据并保存到数据库
		
		//提示保存成功
		echo '{"success":true,"msg":"员工：' . $_POST["name"] . ' 信息保存成功！"}';
	}
	
	?>  

### jqueryajax  
HTML：    

	<!DOCTYPE HTML>
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Demo</title>
	<style>
	body, input, select, button, h1 {
		font-size: 28px;
		line-height:1.7;
	}
	</style>	
	</head>
	
	<body>
	
	<h1>员工查询</h1>
	
	<label>请输入员工编号：</label>
	<input type="text" id="keyword" />
	<button id="search">查询</button>
	<p id="searchResult"></p>
	
	<h1>员工新建</h1>
	<label>请输入员工姓名：</label>
	<input type="text" id="staffName" /><br>
	<label>请输入员工编号：</label>
	<input type="text" id="staffNumber" /><br>
	<label>请选择员工性别：</label>
	<select id="staffSex">
	<option>女</option>
	<option>男</option>
	</select><br>
	<label>请输入员工职位：</label>
	<input type="text" id="staffJob" /><br>
	<button id="save">保存</button>
	<p id="createResult"></p>
	
	<script src="jquery-3.1.1.js"></script>
	<script>
	$(document).ready(function(){ 
		$("#search").click(function(){ 
			$.ajax({ 
			    type: "GET", 	
				url: "http://127.0.0.1:80/ajax/serverjQueryjson.php?number=" + $("#keyword").val(),
				dataType: "json",
				success: function(data) {
					if (data.success) { 
						$("#searchResult").html(data.msg);
					} else {
						$("#searchResult").html("出现错误：" + data.msg);
					}  
				},
				error: function(jqXHR){     
				   alert("发生错误：" + jqXHR.status);  
				},     
			});
		});
		
		$("#save").click(function(){ 
			$.ajax({ 
			    type: "POST", 	
				url: "serverjson.php",
				data: {
					name: $("#staffName").val(), 
					number: $("#staffNumber").val(), 
					sex: $("#staffSex").val(), 
					job: $("#staffJob").val()
				},
				dataType: "json",
				success: function(data){
					if (data.success) { 
						$("#createResult").html(data.msg);
					} else {
						$("#createResult").html("出现错误：" + data.msg);
					}  
				},
				error: function(jqXHR){     
				   alert("发生错误：" + jqXHR.status);  
				},     
			});
		});
	});
	</script>
	</body>
	</html>
jquery 后台 php：  


	<?php
	//设置页面内容是html编码格式是utf-8
	//header("Content-Type: text/plain;charset=utf-8"); 
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST,GET');
	header('Access-Control-Allow-Credentials:true'); 
	header("Content-Type: application/json;charset=utf-8"); 
	//header("Content-Type: text/xml;charset=utf-8"); 
	//header("Content-Type: text/html;charset=utf-8"); 
	//header("Content-Type: application/javascript;charset=utf-8"); 
	
	//定义一个多维数组，包含员工的信息，每条员工信息为一个数组
	$staff = array
		(
			array("name" => "洪七", "number" => "101", "sex" => "男", "job" => "总经理"),
			array("name" => "郭靖", "number" => "102", "sex" => "男", "job" => "开发工程师"),
			array("name" => "黄蓉", "number" => "103", "sex" => "女", "job" => "产品经理")
		);
	
	//判断如果是get请求，则进行搜索；如果是POST请求，则进行新建
	//$_SERVER是一个超全局变量，在一个脚本的全部作用域中都可用，不用使用global关键字
	//$_SERVER["REQUEST_METHOD"]返回访问页面使用的请求方法
	if ($_SERVER["REQUEST_METHOD"] == "GET") {
		search();
	} elseif ($_SERVER["REQUEST_METHOD"] == "POST"){
		create();
	}
	
	//通过员工编号搜索员工
	function search(){
		//检查是否有员工编号的参数
		//isset检测变量是否设置；empty判断值为否为空
		//超全局变量 $_GET 和 $_POST 用于收集表单数据
		if (!isset($_GET["number"]) || empty($_GET["number"])) {
			echo '{"success":false,"msg":"参数错误"}';
			return;
		}
		//函数之外声明的变量拥有 Global 作用域，只能在函数以外进行访问。
		//global 关键词用于访问函数内的全局变量
		global $staff;
		//获取number参数
		$number = $_GET["number"];
		$result = '{"success":false,"msg":"没有找到员工。"}';
		
		//遍历$staff多维数组，查找key值为number的员工是否存在，如果存在，则修改返回结果
		foreach ($staff as $value) {
			if ($value["number"] == $number) {
				$result = '{"success":true,"msg":"找到员工：员工编号：' . $value["number"] . 
								'，员工姓名：' . $value["name"] . 
								'，员工性别：' . $value["sex"] . 
								'，员工职位：' . $value["job"] . '"}';
				break;
			}
		}
	    echo $result;
	}
	
	//创建员工
	function create(){
		//判断信息是否填写完全
		if (!isset($_POST["name"]) || empty($_POST["name"])
			|| !isset($_POST["number"]) || empty($_POST["number"])
			|| !isset($_POST["sex"]) || empty($_POST["sex"])
			|| !isset($_POST["job"]) || empty($_POST["job"])) {
			echo '{"success":false,"msg":"参数错误，员工信息填写不全"}';
			return;
		}
		//TODO: 获取POST表单数据并保存到数据库
		
		//提示保存成功
		echo '{"success":true,"msg":"员工：' . $_POST["name"] . ' 信息保存成功！"}';
	}
	
	?>
### jQueryjsonp：
HTML：   

	<!DOCTYPE HTML>
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Demo</title>
	<style>
	body, input, select, button, h1 {
		font-size: 28px;
		line-height:1.7;
	}
	</style>	
	</head>
	
	<body>
	
	<h1>员工查询</h1>
	
	<label>请输入员工编号：</label>
	<input type="text" id="keyword" />
	<button id="search">查询</button>
	<p id="searchResult"></p>
	
	<h1>员工新建</h1>
	<label>请输入员工姓名：</label>
	<input type="text" id="staffName" /><br>
	<label>请输入员工编号：</label>
	<input type="text" id="staffNumber" /><br>
	<label>请选择员工性别：</label>
	<select id="staffSex">
	<option>女</option>
	<option>男</option>
	</select><br>
	<label>请输入员工职位：</label>
	<input type="text" id="staffJob" /><br>
	<button id="save">保存</button>
	<p id="createResult"></p>
	
	<script src="jquery-3.1.1.js"></script>
	<script>
	$(document).ready(function(){ 
		$("#search").click(function(){ 
			$.ajax({ 
			    type: "GET", 	
				url: "http://127.0.0.1:80/ajax/serverjQueryjsonp.php?number=" + $("#keyword").val(),
				dataType: "jsonp",
				jsonp: "callback",
				success: function(data) {
					if (data.success) {
						$("#searchResult").html(data.msg);
					} else {
						$("#searchResult").html("出现错误：" + data.msg);
					}  
				},
				error: function(jqXHR){     
				   alert("发生错误：" + jqXHR.status);  
				},     
			});
		});
		
		$("#save").click(function(){ 
			$.ajax({ 
			    type: "POST", 	
				url: "http://127.0.0.1:8000/ajaxdemo/serverjsonp.php",
				data: {
					name: $("#staffName").val(), 
					number: $("#staffNumber").val(), 
					sex: $("#staffSex").val(), 
					job: $("#staffJob").val()
				},
				dataType: "json",
				success: function(data){
					if (data.success) { 
						$("#createResult").html(data.msg);
					} else {
						$("#createResult").html("出现错误：" + data.msg);
					}  
				},
				error: function(jqXHR){     
				   alert("发生错误：" + jqXHR.status);  
				},     
			});
		});
	});
	</script>
	</body>
	</html>
jqueryjsonp php：  

	<?php
	//设置页面内容是html编码格式是utf-8
	//header("Content-Type: text/plain;charset=utf-8"); 
	header("Content-Type: application/json;charset=utf-8"); 
	//header("Content-Type: text/xml;charset=utf-8"); 
	//header("Content-Type: text/html;charset=utf-8"); 
	//header("Content-Type: application/javascript;charset=utf-8"); 
	
	//定义一个多维数组，包含员工的信息，每条员工信息为一个数组
	$staff = array
		(
			array("name" => "洪七", "number" => "101", "sex" => "男", "job" => "总经理"),
			array("name" => "郭靖", "number" => "102", "sex" => "男", "job" => "开发工程师"),
			array("name" => "黄蓉", "number" => "103", "sex" => "女", "job" => "产品经理")
		);
	
	//判断如果是get请求，则进行搜索；如果是POST请求，则进行新建
	//$_SERVER是一个超全局变量，在一个脚本的全部作用域中都可用，不用使用global关键字
	//$_SERVER["REQUEST_METHOD"]返回访问页面使用的请求方法
	if ($_SERVER["REQUEST_METHOD"] == "GET") {
		search();
	} elseif ($_SERVER["REQUEST_METHOD"] == "POST"){
		create();
	}
	
	//通过员工编号搜索员工
	function search(){
		$jsonp = $_GET["callback"];
		//检查是否有员工编号的参数
		//isset检测变量是否设置；empty判断值为否为空
		//超全局变量 $_GET 和 $_POST 用于收集表单数据
		if (!isset($_GET["number"]) || empty($_GET["number"])) {
			echo $jsonp . '({"success":false,"msg":"参数错误"})';
			return;
		}
		//函数之外声明的变量拥有 Global 作用域，只能在函数以外进行访问。
		//global 关键词用于访问函数内的全局变量
		global $staff;
		//获取number参数
		$number = $_GET["number"];
		$result = $jsonp . '({"success":false,"msg":"没有找到员工。"})';
		
		//遍历$staff多维数组，查找key值为number的员工是否存在，如果存在，则修改返回结果
		foreach ($staff as $value) {
			if ($value["number"] == $number) {
				$result = $jsonp . '({"success":true,"msg":"找到员工：员工编号：' . $value["number"] .
								'，员工姓名：' . $value["name"] . 
								'，员工性别：' . $value["sex"] . 
								'，员工职位：' . $value["job"] . '"})';
				break;
			}
		}
	    echo $result;
	}
	
	//创建员工
	function create(){
		//判断信息是否填写完全
		if (!isset($_POST["name"]) || empty($_POST["name"])
			|| !isset($_POST["number"]) || empty($_POST["number"])
			|| !isset($_POST["sex"]) || empty($_POST["sex"])
			|| !isset($_POST["job"]) || empty($_POST["job"])) {
			echo '{"success":false,"msg":"参数错误，员工信息填写不全"}';
			return;
		}
		//TODO: 获取POST表单数据并保存到数据库
		
		//提示保存成功
		echo '{"success":true,"msg":"员工：' . $_POST["name"] . ' 信息保存成功！"}';
	}
	
	?>



