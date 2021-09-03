# Ajax

## 第一章：原生Ajax

### 1.1、Ajax简介

> Ajax称为 Asynchronous Javascript And XML，就是异步的JS和XML。
>
> 通过Ajax可以在浏览器中向服务器发送异步请求，最大的优势：==无刷新获取数据。==
>
> Ajax不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

### 1.2、XML简介

> XML可扩展标记语言。
>
> XML被设计用来传输和存储数据。
>
> XML和HTML类似，不同的是HTML中都是预定义标签，而XML中没有预定义标签，全都是自定义标签，用来表示一些数据。

```xml
比如说我有一些学生数据：
	name="孙";age=18;gender="男"
	<student>
        <name>孙</name>
        <age>18</age>
        <gender>男</gender>
	</student>
```

现在已经被JSON取代。

```json
{"name":"孙","age":18,"gender":"男"}
```

### 1.3、Ajax特点

#### 1.3.1、优点

+ 可以无刷新页面与服务器端进行通信。
+ 允许你根据用户事件来更新部分页面内容。

#### 1.3.2、缺点

+ 没有浏览历史，不能回退
+ 存在跨域问题(同源)
+ SEO(搜索引擎优化)不友好

### 1.4、Ajax使用

#### HTTP

###### 1、请求报文

```
行    POST  /s?ie=utf-8  HTTP/1.1
头	 Host: baidu.com
	  Cookie：name=xx
	  Content-type: application/x-www-form-urlencoded
	  User-Agent: Chrome 83
	  
空行 
体     username=admin&password=admin
```

###### 2、响应报文

```
行	HTTP/1.1  200 OK

头	 Content-type: text/html;charset=utf-8
	  Content-length: 2048
	  Content-encoding: gzip
空行

体	<html>
		<head>
		</head>
		<body>
			<h1></h1>
	</html>

404
401
403
500
200
```

#### 使用步骤

**DOM0  element.onclick = function(){}**

**DOM2 element.addEventListener('click',function(){})**

```js
 //1.创建对象
const xhr = new XMLHttpRequest()
//2.初始化
xhr.open('POST', 'http://127.0.0.1:8000/server')
//设置请求头
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
xhr.setRequestHeader('name','baidu')
//3.发送
xhr.send('a=100')
//4.事件绑定 处理服务端返回结果
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status < 300){
            result.innerText = xhr.response
        }else {
            xhr.status
        }
    }
}
```

 `crossorigin="anonymous"`发送请求时不会携带当前域名下的`cookie`

### 属性

```shell
`XMLHttpRequest.onreadystatechange    当 readyState 属性发生变化时，调用的 event handler。

`XMLHttpRequest.readyState 
0	UNSENT	代理被创建，但尚未调用 open() 方法。
1	OPENED	open() 方法已经被调用。
2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
3	LOADING	下载中； responseText 属性已经包含部分数据。
4	DONE	下载操作已完成。

`XMLHttpRequest.response 响应体，服务端返回的数据
返回一个 ArrayBuffer、Blob、Document，或 DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应实体（response entity body）。

`XMLHttpRequest.responseText  返回给前端的字符串数据

`XMLHttpRequest.responseType   设置响应类型， xhr.responseType('json')

`XMLHttpRequest.responseURL  初始化请求中的URL

`XMLHttpRequest.responseXML 
如果服务器没有明确指出 Content-Type 头是 "text/xml" 还是 "application/xml", 你可以使用XMLHttpRequest.overrideMimeType() 强制 XMLHttpRequest 解析为 XML

`XMLHttpRequest.status  请求的响应状态。

`XMLHttpRequest.statusText 完整的响应状态文本（例如，"200 OK"）。
```

### 方法

```
abort()  如果请求已被发出，则立刻中止请求。
getAllResponseHeaders()  获取所有响应头
getResponseHeader()	  获取指定响应头
open()    初始化请求
send()	  发送请求
setRequestHeader()  设置HTTP请求头的值
```



## 第二章：jQuery中的Ajax

### get请求

```js
 $('button').eq(0).click(function(){
            $.get('http://127.0.0.1:8000/jquery-server',{a:100, b:200}, function(data){
                console.log(data);
            },'json')
 })
```

### post请求

```js
 $('button').eq(1).click(function(){
            $.post('http://127.0.0.1:8000/jquery-server',{a:100, b:200}, function(data){
                console.log(data);
            })
 })
```

### 通用型

```js
	$('button').eq(2).click(function(){
            $.ajax({
                //url
                url: 'http://127.0.0.1:8000/jquery-server',
                //参数
                data: {a:100, b:200},
                //请求类型
                type: 'GET',
                //响应体结果
                dataType: 'json',
                //成功回调
                success: function(data){
                    console.log(data);
                },
                //超时时间
                timeout: 2000,
                //失败回调
                error: function(){
                    console.log('出错了');
                },
                //头信息
                headers: {
                    Authentication: 'auth'
                }
            })
        })
```

## Axios

**返回一个Promise对象**

```js
 const btns = document.querySelectorAll('button')
        //配置baseURL
        axios.defaults.baseURL = 'http://127.0.0.1:8000'

        btns[0].onclick = function () {
            //GET请求
            axios.get('/axios-server', {
                params: {
                    id: 100
                },
                headers: {
                    name: 'baidu'
                }
            }).then(res => {
                console.log(res);
            })
        }

        btns[1].onclick = function () {
            const data = {
                username: 'admin',
                password: '123456'
            }
            //POST请求
            axios.get('/axios-server', data, {
                params: {
                    id: 100
                },
                headers: {
                    name: 'baidu'
                }

            }).then(res => {
                console.log(res.data);
            })
        }
    
        btns[2].onclick = function () {
            axios({
                //请求方法
                method: 'POST',
                url: '/axios-server',
                //url参数
                params: {
                    vip: 30
                },
                //头信息
                headers: {
                    a: 100
                },
                //请求体参数
                data: {
                    username: 'admin'
                }
            }).then(res => {
                console.log(res);
            })
        }
```

## fetch

**返回一个Promise对象**

```js
fetch('http://127.0.0.1:8000/fetch-server', {
                //请求方法
                method: 'POST',
                //请求头
                headers: {
                    width: 100
                },
                //请求体
                body: {
                    name:'张三',
                    age: 19
                }
            }).then(res => {
                console.log(res);
                return res.json()
            }).then(res => {
                console.log(res);
            })
```

## 第三章：跨域

### 3.1、同源策略

同源策略(Same-Origin Policy)最早由 Netscape 公司提出，是浏览器的一种安全策略。

同源： 协议、域名、端口号 必须完全相同。 违背同源策略就是跨域

### 3.2、如何解决跨域

1) JSONP 是什么 JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明 才智开发出来，只支持 get 请求。 
2) JSONP 怎么工作的？ 在网页有一些标签天生具有跨域能力，比如：img link iframe script。 JSONP 就是利用 script 标签的跨域能力来发送请求的。
3) JSONP使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>原理演示</title>
    <style>
        #result {
            width: 300px;
            height: 100px;
            border: 1px solid #18a
        }
    </style>
</head>

<body>
    <div id="result"></div>
    <script>
        //处理数据
        function handleData(data) {
            //获取result元素
            const result = document.getElementById('result')
            result.innerHTML = data.name
        }
    </script>
    <!-- <script src="http://127.0.0.1:5500/ajax/6-%E8%B7%A8%E5%9F%9F/2-JSONP/js/app.js"></script> -->
    <script src="http://127.0.0.1:8000/jsonp-server"></script>
</body>

</html>
```

```js
//jsonp服务
app.all('/jsonp-server', (req,res)=> {
    // res.send('console.log("hello jsonp-server")')
    const data = {
        name: 'at'
    }
    let str = JSON.stringify(data)
    res.end(`handleData(${str})`)
})
```

==通过返回一个前端定义的函数实现跨域。==

### 3.3、jQuery实现JSONP

利用jQuery中的callback实现

```html
<button>点击发送jsonp请求</button>
    <div id="result">

    </div>
    <script>
       $('button').eq(0).click(function(){
           $.getJSON('http://127.0.0.1:8000/jquery-json-server?callback=?', function(data){
                $('#result').html(`
                名称：${data.name}<br/>
                城市：${data.city}
                `)
           })
       })
    </script>
```

```js
//jQuery-json服务
app.all('/jquery-json-server', (req,res)=> {
    const data = {
        name: '尚',
        city: ['北京','上海','杭州']
    }
    let str = JSON.stringify(data)
    //接收callback
    let cb = req.query.callback

    res.end(`${cb}(${str})`)
})
```

### CORS

[`Access-Control-Allow-Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)

指示请求的资源能共享给哪些域。

[`Access-Control-Allow-Credentials`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)

指示当请求的凭证标记为 true 时，是否响应该请求。

[`Access-Control-Allow-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)

用在对预请求的响应中，指示实际的请求中可以使用哪些 HTTP 头。

[`Access-Control-Allow-Methods`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)

指定对预请求的响应中，哪些 HTTP 方法允许访问请求的资源。

[`Access-Control-Expose-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers)

指示哪些 HTTP 头的名称能在响应中列出。

[`Access-Control-Max-Age`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age)

指示预请求的结果能被缓存多久。

[`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers)

用于发起一个预请求，告知服务器正式请求会使用那些 HTTP 头。

[`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method)

用于发起一个预请求，告知服务器正式请求会使用哪一种 [HTTP 请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)。

[`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin)

指示获取资源的请求是从什么域发起的。

























