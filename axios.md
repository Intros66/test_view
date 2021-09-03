# axios

## 一、使用

### 1、简介

> 1. 前端最流行的 ajax 请求库
> 2. react/vue 官方都推荐使用 axios 发 ajax 请求
> 3. 文档: https://github.com/axios/axios

### 2、特点

> 1. 基于 xhr + promise 的异步 ajax 请求库
> 2. 浏览器端/node 端都可以使用
> 3. 支持请求／响应拦截器
> 4. 支持请求取消
> 5. 请求/响应数据转换
> 6. 批量发送多个请求

### 3、常用语法

> 1. axios(config): `通用/最本质`的发任意类型请求的方式
> 2. axios(url[, config]): 可以只指定 url 发 get 请求
> 3. axios.request(config): 等同于 axios(config)
> 4. axios.get(url[, config]): 发 get 请求
> 5. axios.delete(url[, config]): 发 delete 请求
> 6. axios.post(url[, data, config]): 发 post 请求
> 7. axios.put(url[, data, config]): 发 put 请求
> 8. axios.defaults.xxx: 请求的默认全局配置
> 9. axios.interceptors.request.use(): 添加请求拦截器
> 10. axios.interceptors.response.use(): 添加响应拦截器
> 11. axios.create([config]): 创建一个新的 axios(它没有下面的功能)
> 12. axios.Cancel(): 用于创建取消请求的错误对象
> 13. axios.CancelToken(): 用于创建取消请求的 token 对象
> 14. axios.isCancel(): 是否是一个取消请求的错误
> 15. axios.all(promises): 用于批量执行多个异步请求
> 16. axios.spread(): 用来指定接收所有成功数据的回调函数的方法

### 4、原理图

![Axios系统学习笔记原理图](https://gitee.com/hongjilin/hongs-study-notes/raw/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/Ajax%E3%80%81Axios%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/Axios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90%E7%AC%94%E8%AE%B0%E4%B8%AD%E7%9A%84%E5%9B%BE%E7%89%87/Axios%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E5%8E%9F%E7%90%86%E5%9B%BE.png)

### 5、请求设置

```js
{
    url: '/user'
    method: 'get',
    baseURL: 'http://some-domain.com/api/',
        
    //对请求的数据做处理，将处理后的结果发送给服务器
    transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    return data;
    }],
        
     //对响应的结果做处理，之后我们再用自定义回调对结果进行处理
	 transformResponse: [function (data) {
    // Do whatever you want to transform the data
    return data;
    }],
    
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    
    //设置url携带参数
    params: {
    	ID: 12345
  	},
    
    //参数序列化，将参数转成字符串或其他格式，之后发送给服务器
    paramsSerializer: function (params) {
    	return Qs.stringify(params, {arrayFormat: 'brackets'})
  	},
        
    //请求体设置
    data: {
   	 	firstName: 'Fred'
  	},
    data:'Country=Brasil&City=Belo Horizonte',
	
    //超时时间，超时该请求就会取消
     timeout: 1000, 
         
    //跨域请求时是否携带cookie
    withCredentials: false, 
    
    //请求适配器设置 1.ajax  2.nodejs中http
    adapter: function (config) {
    	/* ... */
 	},
        
    //对请求的验证设置用户名密码
    auth: {
        username: 'janedoe',
        password: 's00pers3cret'
    },
        
    //响应体类型设置
    responseType: 'json',
        
    //字符集设置
    responseEncoding: 'utf8', 
   
    //跨站安全设置
    xsrfCookieName: 'XSRF-TOKEN', // default

    xsrfHeaderName: 'X-XSRF-TOKEN', // default、
        
    //上传回调
    onUploadProgress: function (progressEvent) {
    	// Do whatever you want with the native progress event
 	},
        
    //下载事件设置
    onDownloadProgress: function (progressEvent) {
    	// Do whatever you want with the native progress event
    },
    
    //http响应体最大长度，字节
    maxContentLength: 2000,
        
    //请求体最大长度
    maxBodyLength: 2000,
        
    //对响应结果的成功设置
    validateStatus: function (status) {
    	return status >= 200 && status < 300; // default
    },
        
    //最大重定向次数设置 nodejs
    maxRedirects: 5,
    
    //设置scoket文件位置，向docker守护进程发请求，数据转发，如果同时设置socketPath和proxy，则优先socketPath
    socketPath: null, 
    
    //设置http/https客户端
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
        
    //设置代理服务器
    proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
  	},
        
    //取消ajax请求
    cancelToken: new CancelToken(function (cancel) {
 	}),
        
    //对响应结果是否解压 nodejs
    decompress: true,
        
    //
    transitional: {
    
    silentJSONParsing: true, // default value for the current Axios version

    // try to parse the response string as JSON even if `responseType` is not 'json'
    forcedJSONParsing: true;
    
    // throw ETIMEDOUT error instead of generic ECONNABORTED on request timeouts
    clarifyTimeoutError: false,
  }
}
```

### 6、创建实例对象发送请求

```js
const service = axios.create({
            baseURL: 'https://api.apiopen.top',
            timeout: 3000
})

service.get('/getJoke').then(res=>{
            console.log(res.data);
})
```

### 7、拦截器

**多个请求拦截器，最后一个请求拦截器先执行，多个响应拦截器，第一个响应拦截器先执行。**

```js
		//设置请求拦截器
        axios.interceptors.request.use(function (config) {
            console.log('请求拦截器 成功1');
            config.params = {a:100}
            return config;
        }, function (error) {
            console.log('请求拦截器 失败1');
            return Promise.reject(error);
        });

        axios.interceptors.request.use(function (config) {
            console.log('请求拦截器 成功2');
            config.timeout = 2000
            return config;
        }, function (error) {
            console.log('请求拦截器 失败2');
            return Promise.reject(error);
        });

        // 设置响应拦截器
        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功1');
            return response.data;
        }, function (error) {
            console.log('响应拦截器 失败1');
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功2');
            return response;
        }, function (error) {
            console.log('响应拦截器 失败2');
            return Promise.reject(error);
        });
        //发送请求
        axios({
            method: 'GET',
            url: 'http://localhost:3000/posts'
        }).then(res => {
            console.log('自定义处理结果');
            console.log(res);
        }).catch(err => {
            console.log('自定义失败回调');
        })
```

### 8、取消请求

通过axios的CancelToken方法，判断cancel实现

```js
		const btns = document.querySelectorAll('button')
         //2.声明全局变量
         var cancel = null;
         btns[0].onclick = function(){
             //检测上一次请求是否已经完成
             if(cancel !== null){
                 //取消上一次请求
                 cancel()
             }
             axios({
                 method: 'GET',
                 url: 'http://localhost:3000/posts',
                 //1.添加配置对象的属性
                 cancelToken: new axios.CancelToken(function(c){
                     //3. 将c的值赋值给cancel
                    cancel = c
                 })
             }).then(res=> {
                 console.log(res);
                 cancel = null

             })
         }

         btns[1].addEventListener('click',function(){
             cancel()
         })
```

## 二、源码分析

### 1、目录结构


├── /dist/ # 项目输出目录 

│ ├── /lib/ # 项目源码目录

│ │ ├── /adapters/ # 定义请求的适配器 xhr、http 

│ │ ├── http.js # 实现 http 适配器(包装 http 包) 

│ │ └── **xhr.js** **# 实现 xhr 适配器(包装 xhr 对象)** 

│ ├── /cancel/ # 定义取消功能 

│ ├── /core/ # 一些核心功能

│ │ ├── **Axios.js** **# axios 的核心主类**

│ │ ├── **dispatchRequest.js** **# 用来调用 http 请求适配器方法发送请求的函数** 

│ │ ├── InterceptorManager.js # 拦截器的管理器 

│ │ └── settle.js # 根据 http 响应状态，改变 Promise 的状态 

│ ├── /helpers/ # 一些辅助方法 

│ ├── axios.js # 对外暴露接口 

│ ├── defaults.js # axios 的默认配置 

│ └── utils.js # 公用工具 

├── package.json # 项目信息 

├── index.d.ts # 配置 TypeScript 的声明文件 

└── index.js # 入口文件

### 2、axios创建过程

```js
// axios.js
// 1. 通过配置创建axios函数  defaults属性为配置对象
var axios = createInstance(defaults);

// 2.创建一个实例化对象 context
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig); //context不能当函数使用
    //                👇
    //   3.        Axios.js  
    function Axios(instanceConfig) {//instanceConfig为创建axios函数传入的defaults配置对象
        //实例对象上的defaults属性为配置对象
      this.defaults = instanceConfig; 
        //实例对象上有 interceptors 属性用来设置响应和请求拦截器
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    // 4. 将方法添加至Axios原型上  Axios.js
    Axios.prototype.request = function request(config){...}
    Axios.prototype.getUri = function getUri(config){...}
    // 4.遍历数组，将方法添加至Axios原型上  Axios.js
    utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method){...}
    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method){...}
    
  // 将 request 方法的 this 指向 context 并返回新函数， instance 可以用作函数使用，且返回的是一个函数，函数内容是 Axios.prototype.request，作用与 Axios.prototype.request 一致，发送请求
  // request 去调用 Axios.js 中的 dispatchRequest，dispatchRequest 再调用 xhr/http.js
  var instance = bind(Axios.prototype.request, context);

  // 将 Axios.prototype 的方法都添加到 instance 函数身上  此时 instance只是一个函数
  utils.extend(instance, Axios.prototype, context);

  // 将实例对象的方法和属性复制到 instance 函数身上 context实例对象身上有 defaults和interceptors
  // 默认配置对象和拦截器属性
  utils.extend(instance, context);
  // 首先instance是一个函数，也可以当对象去使用
  return instance;
}  
```

![image-20210817201129875](C:\Users\mygod\AppData\Roaming\Typora\typora-user-images\image-20210817201129875.png)

### 3、模拟实现axios创建过程

```js
 function Axios(config) {
            //初始化
            this.defaults = config //为了创建defaults默认属性
            this.interceptors = {
                request: {},
                response: {}
            }
        }

        //原型添加相关的方法
        Axios.prototype.request = function (config) {
            console.log('发送Ajax请求 请求的类型为：' + config.method);
        }
        Axios.prototype.get = function (config) {
            return this.request({
                method: 'GET'
            })
        }
        Axios.prototype.post = function (config) {
            return this.request({
                method: 'POST'
            })
        }

        //声明函数
        function createIntance(config) {
            //实例化一个对象
            let context = new Axios(config) // context.get()  context.post()  但是不能当作函数使用 context()
            //创建请求函数
            let instance = Axios.prototype.request.bind(context) // instance是一个函数，并且可以调用 instance({}) 但是不能当作对象使用 instance.get
            //将Axios.prototype对象中的方法添加到instance函数对象中
            Object.keys(Axios.prototype).forEach(key => {
                instance[key] = Axios.prototype[key].bind(context) // this.defaults
            })   
            //为instance函数对象添加属性 defaults,interceptors
            Object.keys(context).forEach(key => {
                instance[key] = context[key]
            })
            return instance
        }
       
        let axios = createIntance()
        //发送请求
        // axios({method: 'post'})
        axios.post({})
```

### 4、发送请求过程详解

****

**整体流程: request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)**

**xhrAdapter(config)的返回结果决定了dispatchRequest(config) 的返回结果**

**dispatchRequest(config的返回结果决定了request(config)的返回结果**

****

#### 1、Axios.js

```js
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // 判断配置对象类型
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }
  //将用户定义的配置对象覆盖默认配置对象
  config = mergeConfig(this.defaults, config);

  // 设置请求方法  如果没有设置，默认get
  if (config.method) {
      //请求方法小写
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // 创建拦截器中间件，第一个参数用来发送请求，第二个为 undefined 用来补位
  var chain = [dispatchRequest, undefined];
  // 创建一个成功的promise 且成功的值为合并后的请求配置
  var promise = Promise.resolve(config);
  // 遍历实例对象的请求拦截器
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    	// 将请求拦截器压入数组的最前面
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    	// 将响应拦截器压入数组的最尾部
      chain.push(interceptor.fulfilled, interceptor.rejected);
  });

    //如果链条长度不为0
  while (chain.length) {
      //依次取出chian的回调函数，并执行
      //第一个chain.shift()弹出dispatchRequest， 进入dispatchRequest.js
      //dispatchRequest的返回结果决定了promise的结果
    promise = promise.then(chain.shift(), chain.shift());
  }  
  return promise; //request函数执行完毕，意味着axios函数执行完毕
};
```

#### 2、dispatchRequest.js

```js
module.exports = function dispatchRequest(config) {
    //如果被取消的请求被发出去，抛出错误
  throwIfCancellationRequested(config);
	// 确保头信息存在
  // Ensure headers exist
  config.headers = config.headers || {};

  // 对请求数据进行初始化转化
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // 合并一切其他头信息的配置项，三种方法  公共/单独设置/对象
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

    //因为在上面已经进行合并，所以这里删除头信息中的方法的配置项
  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );
	//获取适配器对象
  var adapter = config.adapter || defaults.adapter;
	//发送请求，返回请求后 promise 对象  http/xhr 函数  进入xhrAdapter.js 
    // xhrAdapter的返回结果决定了dispathRequest的返回结果
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // 响应结果进行格式化
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );
	//返回响应体对象
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};
```

#### 3、xhr.js

```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};
```

#### 4、模拟发送过程

```js
 // axios 发送请求  axios => 源头Axios.prototype.request   
//1. 声明构造函数
function Axios(config){
    this.config = config
}
Axios.prototype.request = function(config){
    //发送请求
    //合并配置
    // config = mergeConfig(this.config, config);
    //创建一个 promise 对象
    let promise = Promise.resolve(config)
    //声明一个数组
    let chains = [dispatchRequest, undefined] // undefined作用就是占位
    //循环处理数组 调用then方法指定回调
    while(chains.length){
        promise = promise.then(chains.shift(),chains.shift())
    }
    //返回promise的结果
    return promise
}

//2. dispatchRequest 函数
function dispatchRequest(config){
    console.log('dispatchRequest函数');
    //调用适配器发送请求
    return xhrAdapter(config).then(res => {
        //对响应的结果进行转换处理
        return res
    }, err => {
        throw 'error';
    })
}

//3. adapetr 适配器
function xhrAdapter(config){
    console.log('xhrAdapter函数执行');
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest()
        xhr.open(config.method,config.url)
        xhr.send()
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    resolve({
                        config: config,
                        data: xhr.response,
                        headers: xhr.getAllResponseHeaders(), //字符串的， axios内部做了格式化，转成了对象
                        //xhr的请求对象
                        request: xhr,
                        //响应状态码
                        status: xhr.status,
                        //响应状态字符串
                        statusText: xhr.statusText
                    })
                }else{
                    new Error()
                }
            }
        }
    })
}

//4. 创建 axios 函数
let axios = Axios.prototype.request.bind(null)

axios({
    method: 'GET',
    url: 'http://localhost:3000/posts'
}).then(res => {
    console.log(res);
})
```

### 5、拦截器工作原理

#### Axios.js中创建拦截器初始化`InterceptorManager`函数

```js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

//遍历拦截器数组，将请求拦截器往前放，并返回一个新的拦截器数组
this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
});
//遍历拦截器数组，将响应拦截器往后放，并返回一个新的拦截器数组 
 this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
 });
 //最终以循环的方式以跳板的方式执行
 while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
 }

[请求拦截器成功1,请求拦截器失败1,请求拦截器成功2,请求拦截器失败2,响应拦截器成功1,响应拦截器失败1,响应拦截器成功2，响应拦截器失败2,dispatchRequest,undefined]
 						                 ↓↓
[请求拦截器成功2,请求拦截器失败2,请求拦截器成功1,请求拦截器失败1，dispatchRequest,undefined,响应拦截器成功1,响应拦截器失败1,响应拦截器成功2，响应拦截器失败2]    				
```

#### InterceptorManager.js

```js
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
    //创建一个属性
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
// 往栈中添加一个新的拦截器，以待后续执行，返回拦截器的编号，编号为当前拦截器综合数减一 handlers.push
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
// 从栈中移除指定ID的拦截器
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
//遍历
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

```

### 6、axios拦截器模拟实现

```js
//构造函数
function Axios(config) {
    this.config = config
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager(),
    }
}
//发送请求 难点与重点
Axios.prototype.request = function (config) {
    //创建一个promise对象
    let promise = Promise.resolve(config)
    //创建一个数组
    const chains = [dispatchRequest, undefined]
    //处理拦截器
    //请求拦截器 将请求拦截器的回调 压入 chains 的前面
    this.interceptors.request.handlers.forEach(item => {
        chains.unshift(item.fulfilled,item.rejected)
    })
    //响应拦截器
    this.interceptors.response.handlers.forEach(item => {
        chains.push(item.fulfilled,item.rejected)
    })
    console.log(chains);
    while(chains.length){
        promise = promise.then(chains.shift(),chains.shift())
    }
    return promise
}

function dispatchRequest(config){
    return new Promise((resolve, reject) => {
        resolve({
            status: 200,
            statusText: 'OK'
        })
    })
}


//创建实例
let context = new Axios({})
//创建axios函数 将 axios 中的 this 指向 context
let axios = Axios.prototype.request.bind(context)
//将 context 属性 config interceptors 添加至 axios函数对象
Object.keys(context).forEach(key => {
    axios[key] = context[key]
})



//拦截器管理器构造函数
function InterceptorManager() {
    this.handlers = []
}

InterceptorManager.prototype.use = function (fulfilled, rejected) {
    this.handlers.push({
        fulfilled,
        rejected
    })
}

//以下为功能测试代码
//设置请求拦截器
axios.interceptors.request.use(function one(config) {
    console.log('请求拦截器 成功1');
    config.params = {
        a: 100
    }
    return config;
}, function one(error) {
    console.log('请求拦截器 失败1');
    return Promise.reject(error);
});

axios.interceptors.request.use(function two(config) {
    console.log('请求拦截器 成功2');
    config.timeout = 2000
    return config;
}, function two(error) {
    console.log('请求拦截器 失败2');
    return Promise.reject(error);
});

// 设置响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器 成功1');
    return response;
}, function (error) {
    console.log('响应拦截器 失败1');
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    console.log('响应拦截器 成功2');
    return response;
}, function (error) {
    console.log('响应拦截器 失败2');
    return Promise.reject(error);
});


//发送请求
axios({
    method: 'GET',
    url: 'http://localhost:3000/posts'
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log('自定义失败回调');
})
```

### 7、取消请求

axios设置cancelToken配置对象，走CancelToken.js，CancelToken的实例对象上的 promise 对象状态发生改变，就走xhr.js中的回调，取消请求，并改变promise对象的状态，reject(cencel)，就是你传入函数中的参数 c   `new axios.CancelToken(function (c){ cancel = c})`

#### 页面

```js
//2.声明全局变量
var cancel = null;
btns[0].onclick = function () {
    //检测上一次请求是否已经完成
    if (cancel !== null) {
        //取消上一次请求
        cancel()
    }
    let cancelToken = new axios.CancelToken(function (c) {
        //3. 将c的值赋值给cancel
        cancel = c
    })
    axios({
        method: 'GET',
        url: 'http://localhost:3000/posts',
        //1.添加配置对象的属性
        cancelToken
    }).then(res => {
        console.log(res);
        cancel = null

    })
}

btns[1].addEventListener('click', function () {
    cancel()
})
```

#### CancelToken.js

```js
// 调用 CancelToken回调
var Cancel = require('./Cancel');

function CancelToken(executor) {
  //执行器函数必须是一个函数
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  //声明一个变量
  var resolvePromise; // resolvePromise()，将promise对象的成功的值传给 resolvePromise。
   					  // 如果 resolvePromise() 调用，则 this.promise = resolve()
  //实例对象身上添加 promise 属性
  this.promise = new Promise(function promiseExecutor(resolve) {
    //将修改 promise 对象成功状态的函数暴露出去
    resolvePromise = resolve;
  });

  // token 指向当前的实例对象
  var token = this;
  // 将修改 promise 状态的函数暴露出去，通过 cancel = c 可以将函数赋值为 cancel
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

```

#### xhr.js

```js
if (config.cancelToken) {
    // Handle cancellation
    config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
            return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
    });
}
```

### 8、取消请求模拟实现-简化

如果运行了`cancel()`，相当于`c`运行了，相当于内部的`resolvePromise()`运行了，相当于运行了`resolve`内部的函数，这时`CancelToken`原型上的`promise`属性就变为`成功`状态，`promise`属性绑定了一个`成功回调`，就是`取消请求`，xhr.js中的取消请求不一定会执行，只有当我们去自定义去调用`cancel()`时，才会执行！

#### CancelToken.js

```js
function CancelToken(executor) {
    executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}		


// 此时， 参数 c = function cancel(message){
//		if (token.reason) {
	// Cancellation has already been requested
//      return;
//    }
//    token.reason = new Cancel(message);
//    resolvePromise(token.reason);   //重点 让 resolvePromise()执行，改变CancelToken原型											                           上的promise的状态，为成功
//    })

// xhr.js 判断是否有cancelToken，
if (config.cancelToken) {
    // 通过cancelToken对象身上的promise状态，调用取消回调。
    config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
            return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
    });
}

// 将 函数cancel(message){..}赋值给 参数 cancel，就可以调用 cancel()
new axios.CancelToken(function (c) {
    cancel = c
})
```

![image-20210818215116266](C:\Users\mygod\AppData\Roaming\Typora\typora-user-images\image-20210818215116266.png)

![image-20210818215612598](C:\Users\mygod\AppData\Roaming\Typora\typora-user-images\image-20210818215612598.png)

#### 模拟

```js
// 1.构造函数
function Axios(config) {
    this.config = config
    this.interceptors = {
        resolved: 'fulfilled',
        rejected: 'rejected'
    }

}
//原型 request 方法
Axios.prototype.request = function (config) {
    // 省略了拦截器中间件 循环处理拦截器
    return dispatchRequest(config)
}
// dispatchRequest函数
function dispatchRequest(config) {
    console.log('dispatchRequest函数');
    //数据转换，字符串转对象
    // .....
    return xhrAdapter(config).then(res => {
        return res
    }, err => {
        throw '请求失败-dispatch'
    })

}

function xhrAdapter(config) {
    return new Promise((resolve, reject) => {
        //头部信息校验，数据处理
        // ......
        //实例化对象
        let xhr = new XMLHttpRequest()
        //初始化
        xhr.open(config.method, config.url)
        //发送
        xhr.send()
        //处理响应结果 每当readyState 改变时,就会触发 onreadystatechange 事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        config: config,
                        data: xhr.response,
                        status: xhr.status,
                        statusText: xhr.statusText
                    })
                } else {
                    reject(new Error('请求失败！'))
                }
            }
        }

        //关于取消请求的处理
        if(config.cancelToken){
            // 对 cancelToken 对象身上的 promise 对象指定成功的回调
            config.cancelToken.promise.then(value => {
                xhr.abort()
                //将整体结果设置为失败
                reject(new Error('请求取消'))
            })
        }

    })

}

//声明函数
//let context = new Axios({})
function createIntance(config) {
    //实例化对象  可以使用context.get()，不能context()
    let context = new Axios(config)
    //创建请求函数，并将this指向context  可以使用instance()，不能instance.get()
    let instance = Axios.prototype.request.bind(context)
    //将context对象上的原型属性拿到
    Object.keys(context).forEach(key => {
        instance[key] = context[key]
    });
    return instance
}

//CancelToken 构造函数
function CancelToken(executor) {
    //声明一个变量
    var resolvePromise;
    //为实例对象添加属性
    this.promise = new Promise(resolve => {
        //将 resolve 赋值给 resolvePromise
        // 只要调用 resolvePromise()，promise属性的值就会是 成功状态
        resolvePromise = resolve
    })
    //调用 executor 函数
    executor(function cancel(){
        // 将 this.promise 对象状态改为成功
        resolvePromise()
    })
}

let axios = createIntance()
console.dir(axios)

const btns = document.querySelectorAll('button')
//2.声明全局变量
var cancel = null;
btns[0].onclick = function () {
    //检测上一次请求是否已经完成
    if (cancel !== null) {
        //取消上一次请求
        cancel()
    }
    //创建 cancelToken 的值
    let cancelToken = new CancelToken(function (c) {
        // 将执行器函数中的 cancel()函数 赋值给 cancel
        cancel = c
    })
    axios({
        method: 'GET',
        url: 'http://localhost:3000/posts',
        //1.添加配置对象的属性
        cancelToken
    }).then(res => {
        console.log(res);
        cancel = null

    })
}

btns[1].addEventListener('click', function () {
    cancel()
})
```

## 三、总结

### 1、axios与Axios的关系？

1. 从语法上来说：`axios`不是`Axios`的实例
2. 从功能上来说：`axios`是`Axios`的实例
3. `axios`是`Axios.prototype.request`函数`bind()`返回的函数
4. `axios`作为对象有`Axios`原型对象上的所有方法，有`Axios`对象上所有的属性

### 2、instance与axios的区别？

1. 相同：
   1. 都是一个能发任意请求的函数：`request(config)`
   2. 都有发特定请求的各种方法：`get()/post()`
   3. 都有默认配置和拦截器的属性：`defaults/interceptors`
2. 不同
   1. 默认配置很可能不一样
   2. `instance`没有`axios`后续添加的一些方法：`create()/CancelToken()/all()`

```js
//通过 createIntance 创建的 instance ，虽然既能当函数也能当对象，但是没有新添加的属性

//创建默认配置的axios
var axios = createInstance(defaults);

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
```

### 3、axios运行的整体流程？

![Axios系统学习流程图](https://gitee.com/hongjilin/hongs-study-notes/raw/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/Ajax%E3%80%81Axios%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/Axios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90%E7%AC%94%E8%AE%B0%E4%B8%AD%E7%9A%84%E5%9B%BE%E7%89%87/Axios%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

**整体流程: request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)**

### 4、axios的请求/响应拦截器是什么？

![image-20210818222149335](C:\Users\mygod\AppData\Roaming\Typora\typora-user-images\image-20210818222149335.png)

1. 请求拦截器：
   1. 在真正发送请求前执行的回调函数
   2. 可以对请求进行检查或配置进行特定处理
   3. 成功的回调函数，传递的默认是`config`(也必须是)
   4. 失败的回调函数，传递的默认是`error`

2. 响应拦截器
   1. 在请求得到响应后执行的回调函数
   2. 可以对响应数据进行特定处理
   3. 成功的回调函数，传递的默认是`response`
   4. 失败的回调函数，传递的默认是`error`

### 5、axios的请求/响应数据转换器是什么？

其实完全可以放在请求/响应拦截器中进行操作

1. 请求转换器：对请求头和请求体数据进行特定处理的函数

```js
if (utils.isObject(data)) {
    setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
    return JSON.stringify(data);
}
```

2. 响应转换器：将响应体`json`字符串解析为`js`对象或数组的函数

```js
response.data = JSON.parse(data);
```

### 6、response的整体结构

```js
{
    data,
    status,
    statusText,
    headers,
    config,
    request
}
```

### 7、error的整体结构

```js
{
    message,
    response,
    request
}
```

### 8、如何取消未完成的请求？

1. 当配置了`cancelToken`对象时，保存`cancel()`函数
   1. 创建一个用于将来中断请求的`cancelPromise`，暴露`cancelPromise`
   2. 并定义了一个用于取消请求的`cancel()`函数
   3. 将`cancel()`函数传递出来
2. 调用`cancel()`取消请求
   1. 执行`cancel()`函数，传入错误信息`message`
   2. 内部会让`cancelPromise`变为成功，且成功的值为一个`Cancel`对象
   3. 在`cancelPromise`的成功回调中 中断请求，并让发送请求的`promise`失败，失败的`reason`为`Cancel`对象

**`cancelToken`内部维护一个`promise`对象，默认状态是`pending`，将改变该对象状态的变量，它的执行作为函数暴露出去**

**再将接收到函数赋值到一个位置，在需要的时候执行，整个`promise`状态改变**



