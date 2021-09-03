# Promise

+ fs 文件操作

```js
require('fs').readFile('./index.html',(err,data)=>{})
```

+ 数据操作
+ AJAX

```js
$.get('/server', data=>{})
```

+ 定时器

```js
setTimeout(()=>{},200)
```

## 1、Promise的理解

### 1.1、理解

==ES6中新引入的异步编程解决方案，从语法上来说是构造函数，可以实例化对象，封装异步操作，获取成功和失败结果。==

### 1.2、promise状态改变

实例对象中的一个属性  ***PromiseState***

+ pending 未决定的

+ pending 变为 resolved / fulfilled
+ pending 变为 rejected

说明：只有这2种，且一个promise对象只能改变一次

​	1.无论变为成功还是失败，都会有一个结果数据

2. 成功的结果数据一般称为value，失败的结果数据一般称为reason

### 1.3、promise对象的值

实例对象中的一个属性  ***PromiseResult***

保存着异步任务 成功/失败 的结果

**resolve和reject函数可对结果进行操作**

![image-20210814095513198](C:\Users\mygod\AppData\Roaming\Typora\typora-user-images\image-20210814095513198.png)

## 2、为什么要用Promise

### 2.1、指定回调函数的方式更加灵活

1. 旧的：必须在启动异步任务前指定
2. promise：异步启动任务 => 返回 promise对象 => 给promise对象绑定回调函数（甚至可以在异步任务结束后指定/多个）

### 2.2、支持链式调用，可以解决回调地狱问题

1. 什么是回调地狱？
   1. 回调函数嵌套使用，外部回调函数异步执行的结果是嵌套的回调执行的条件
2. 回调地狱的缺点？
   1. 不便于阅读
   2. 不便于异常处理
3. 解决方案？
   1. promise链式调用
   2. 用来解决回调地狱问题，但是`只是简单的改变格式`，并没有彻底解决上面的问题真正要解决上述问题，一定要利用promise再加上await和async关键字实现异步传同步
4. 终极解决方案？
   1. promise + async + await

## 3、如何使用Promise

### 3.1、API

1. Promise构造函数：Promise(executor){}
   1. executor函数：执行器 （resolve, reject）=> {}
   2. resolve函数：内部定义成功时我们调用的函数 value => {}
   3. reject函数： 内部定义失败时我们调用的函数 reason => {}
   4. **说明：executor会在Promise内部立即同步调用，异步操作在执行器中执行**
2. Promise.prototype.then 方法： (onResolved, onRejected) => {}
   1. onResolved函数：成功的回调函数 (value) => {}
   2. onRejected函数：失败的回调函数 (reason) => {}
   3. **说明：指定用于得到成功value 的成功回调和用于得到失败reason的失败回调 都会返回一个新的Promise对象**
3. Promise.prototype.catch 方法： (onRejected) => {}
   1. onRejected函数：失败的回调函数 (reason) => {}
4. Promise.resolve 方法：(resolve) => {}
   1. resolve：成功的结果
   2. **说明：返回一个成功的Promise对象**
5. Promise.reject 方法：(reason) => {}
   1. reason：失败的原因
   2. **说明：返回一个失败的Promise对象**

6. Promise.all 方法：(promises) => {}
   1. promises: 包含n个promise的数组
   2. **说明：返回一个新的Promise对象，全成功才成功，返回值是成功的数据的数组，一个失败都失败，返回值是失败的原因，只返回第一个失败的原因**

7. Promise.race 方法： (promises) => {}
   1. promises: 包含n个promise的数组
   2. **说明：返回一个新的Promise对象，第一个完成的Promise的状态结果就是最终结果状态**

### 3.2、Promise的几个关键问题

#### 3.2.1、如何改变Promise的状态？

1. resolve(value)：如果当前是pending就会变成resolved
2. reject(reason)：如果当前是pending就会变成rejected
3. 抛出异常：如果当前是pending就会变成rejected

#### 3.2.2、一个promise指定(then)多个成功/失败回调函数，都会调用吗？

当Promise改变为对应状态时都会调用，前提调用``resolve()``或`reject()`

#### 3.2.3、改变Promise状态和指定回调函数谁先谁后？

1. 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再指定回调
2. 如何先改状态指定回调？
   1. 在执行器中直接调用`resolve()/reject()`
   2. 延迟更长时间才调用`then()`
3. 什么时候才能得到数据？
   1. 如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
   2. 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

#### 3.2.4、Promise实例对象中then()返回的新Promise对象的结果状态是由什么决定？

1. 简单表达：由`then()`指定的回调函数执行的结果决定
2. 详细表达：
   1. 如果抛出异常，新Promise状态变为`rejected`，`reason`为抛出的异常
   2. 如果返回的是非Promise的任意值，新Promise变为`resolved`，`value`为返回的值
   3. 如果返回的是另一个新Promise，此Promise的结果就会成为新Promise的结果

#### 3.2.5、Promise如何连串多个操作任务？

1. Promise的实例对象的`then()`返回一个新的Promise对象，可以看成`then()`的链式调用
2. 通过`then()`的链式调用串联多个同步/异步任务

#### 3.2.6、Promise异常穿透

1. 当使用Promise实例对象的`then()`链式调用时，可以在最后指定失败的回调
2. 前面任务操作出了异常，都会传到最后失败的回调中处理

#### 3.2.7、中断Promise链

1. 当使用Promise实例对象的`then()`链式调用时，在中间中断，不再调用后面的回到函数
2. 办法：在回调函数中返回一个pending状态的Promise对象  `new Promise(()=>{})`

## 4、async与await

### 4.1、mdn文档

https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Async_await

### 4.2、async 函数

1. 函数的返回值为`Promise`对象
2. `Promise`对象的结果为`async`函数执行的返回值决定

### 4.3、await表达式

1. `await`右侧表达式一般为`Promise`对象，但也可以是其它的值
2. 如果表达式是`Promise`对象，`await`返回的是`Promise`成功的值
3. 如果表达式是其他值，直接将此值作为`await`的返回值

### 4.4、注意

1. `await`必须写在`async`函数中，但`async`函数中可以没有`await`
2. 如果`await`的`Promise`失败了，就会抛出异常，需要通过`try...catch`捕获处理







