## ES6

### 1.let、const、var的区别

**（1）块级作用域：**块作用域由`{ }`包括，let和const具有块级作用域，var 不存在块级作用域。块级作用域解决了ES5中的两个问题：

+ 内层变量可能覆盖外层变量
+ 用来计数的循环变量泄露为全局变量

**（2）变量提升：**var存在变量提升，let和const不存在变量提升，即变量只能在声明之后使用，否则会报错

**（3）给全局添加属性：**浏览器的全局对象是window，Node的全局对象是global。var声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是let和const不会。

**（4）重复声明：**var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的变量。const和let不允许重复声明变量。

**（5）暂时性死区：**在使用let、const命令声明变量之前，该变量都是不可用的。这在语法上称为 **暂时性死区**。使用var声明的变量不存在暂时性死区。

**（6）初始值设置：**在声明变量时，var和let可以不用设置初始值。而const声明变量必须设置初始值。

**（7）指针指向：**let和const都是ES6新增的用于创建变量的语法。let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向。

| **区别**           | **var** | **let** | **const** |
| ------------------ | ------- | ------- | --------- |
| 是否有块级作用域   | ×       | ✔️       | ✔️         |
| 是否存在变量提升   | ✔️       | ×       | ×         |
| 是否添加全局属性   | ✔️       | ×       | ×         |
| 能否重复声明变量   | ✔️       | ×       | ×         |
| 是否存在暂时性死区 | ×       | ✔️       | ✔️         |
| 是否必须设置初始值 | ×       | ×       | ✔️         |
| 能否改变指针指向   | ✔️       | ✔️       | ×         |

```js
// 1.块作用域
   {
    let x = 1
    var a = 10
    }
console.log(a); // 10 
console.log(x); // x is not defined

// 2.变量提升
//console.log(m)
console.log(n)
console.log(b); // Cannot access 'b' before initialization
var n
let b ;
const m; // Missing initializer in const declaration

// 3.是否添加全局属性
b = 1;
const m = 3;
console.log(window); // 没有m 和 b 

// 4.重复声明变量
let b = 2  // Identifier 'b' has already been declared
const m = 4 // Identifier 'm' has already been declared

// 5.暂时性死区
// const和let定义变量之前，该变量无法使用

// 6.初始化
// 只有const必须设置初始值

// 7.能否改变指针指向
var obj1 = {}
let obj2 = {}
const obj3 = {}
obj1 = {name:'Tom'}
obj2 = {age: 12}
obj3 = {gender: '男'} // Assignment to constant variable.
console.log(obj1);
console.log(obj2);
console.log(obj3);
```



### 2. const对象的属性可以修改吗

const保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据（字符串、数值、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。

但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，const只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。

```js
const obj3 = {}
obj3 = {gender: '男'} // Assignment to constant variable.

const arr = [1,2,3]
arr.shift()
console.log(arr); // [2,3]
```

### 3. 如果new一个箭头函数的会怎么样

箭头函数是ES6中提出来的，它没有`prototype`，也没有自己的this指向，更不可以使用`arguments`参数，所以不能new一个箭头函数。

new：创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

new操作符的实现步骤：

+ 创建一个对象
+ 将构造函数的作用域赋给新对象（将实例对象的`__proto__`指向构造函数的`prototype`属性）
+ 指向构造函数中的代码，构造函数中的`this`指向该对象（为这个对象添加属性和方法）
+ 返回新的对象

所以，上面的第二、三步，箭头函数都是没有办法执行的

### 4. 箭头函数与普通函数的区别

#### （1）箭头函数比普通函数更简洁

+ 如果没有参数，直接写一个空括号即可
+ 如果只有一个参数，可以省去参数的括号
+ 如果有多个参数，用逗号分隔
+ 如果函数体的返回值只有一句，可以省略大括号
+ 如果函数体不需要返回值，且只有一句话，可以在这个语句前面加一个void关键字。

```js
// 没有参数
const fn1 = ()=> {console.log('我是没有参数的箭头函数', this);}
// 只有一个参数
const fn2 = x => {console.log(x);}
// 多个参数
const fn3 = (x, y, z) => {console.log(x, y, z);}
// 返回值只有一句
const fn4 = ()=> console.log('我是只有一句返回值的箭头函数');
// 不需要返回值，且只有一句话
//const fn5 = ()=> void doesNotReturn();
const fn5 = ()=> void console.log('不需要返回值，且只有一句话的箭头函数');;

// 没有自身this，只会继承上一层作用域中的this
// 所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变
fn1()
fn2(2)
fn3(4, 5, 6)
fn4()
fn5()
```

#### （2）箭头函数没有自身的this

箭头函数不会创建自己的this， 所以它没有自己的this，它只会在自己作用域的上一层继承this。所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。

#### （3）箭头函数继承来的this指向永远不会改变

```js
var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};
obj.a();    // 'OBJ'
obj.b();    // 'GLOBAL'
new obj.a()  // undefined
new obj.b()  // Uncaught TypeError: obj.b is not a constructor
```

对象obj的方法b是使用箭头函数定义的，这个函数中的this就永远指向它定义时所处的全局执行环境中的this，即便这个函数是作为对象obj的方法调用，this依旧指向Window对象。需要注意，定义对象的大括号`{}`是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。

#### （4）call()、apply()、bind()等方法不能改变箭头函数中this的指向

```js
var id = 'Global';
let fun1 = () => {
    console.log(this.id)
};
fun1();                     // 'Global'
fun1.call({id: 'Obj'});     // 'Global'
fun1.apply({id: 'Obj'});    // 'Global'
fun1.bind({id: 'Obj'})();   // 'Global'
```

#### （5）箭头函数不能作为构造函数使用

构造函数在new的步骤在上面已经说过了，实际上第二步就是将函数中的this指向该对象。 但是由于箭头函数时没有自己的this的，且this指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。

#### （6）箭头函数没有自己的arguments

箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是它外层函数的arguments值。

#### （7）箭头函数没有prototype

#### （8）箭头函数不能用作Generator函数，不能使用yeild关键字

### 5. 箭头函数的**this**指向哪里？

箭头函数不同于传统Javascript中的函数，箭头函数并没有属于自己的this，它所谓的this是捕获其所在上下文的this值，作为自己的this值，并且由于没有属于自己的this，所以是不会被new调用的，这个所谓的this也不会改变。

可以用Babel理解下箭头函数：

```js
// ES6 
const obj = { 
  getArrow() { 
    return () => { 
      console.log(this === obj); 
    }; 
  } 
}
```

转化后：

```js
var obj = {
    getArrow: function getArrow(){
        var _this = this
        return function(){
            console.log(_this === obj);
        };
    }
};
```

### 6. 扩展运算符的作用及使用场景

#### （1）对象扩展运算符

对象的扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象中。

```js
let bar = { a: 1, b: 2};
let baz = { ...bar, c: 3}; // {a: 1, n: 2, c: 3}
```

上述方法实际上等价于：

```js
let bar = { a: 1, b: 2};
let ba = Object.assign({}, bar, {c: 3})
console.log(ba); // {a: 1, n: 2, c: 3}
```

**`Object.assign`**方法用与对象的合并，将源对象**（`source`）**的所有可枚举属性，复制到目标对象 **（`target`）就是第一个参数**。**`Object.assign`**方法的第一个参数是目标对象，后面的参数都是源对象。（**如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性**）。

同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

```js
let x = { x: 1, y: 2}
let y = { ...x, y: 3}
console.log(y); // {x: 1, y: 3}
```

**注意：扩展运算符对对象实例的拷贝属于浅拷贝！**

#### （2）数组扩展运算符

数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组。

```js
console.log(...[1, 2, 3])
// 1 2 3
console.log(...[1, [2, 3, 4], 5])
// 1 [2, 3, 4] 5
```

应用：

+ ##### 将数组转换为参数序列

```js
function add(x, y){
    return x + y;
}
const numbers = [1, 2];
console.log(add(...numbers));  // 3
```

+ ##### 复制数组

```js
const arr1 = [1, 2]
const arr2 = [ ...arr1 ]  // [1, 2]
```

**注意：扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象中，**这里参数是个数组，数组里面的所有对象都是基础数据类型，将所有基础数据类型重新拷贝到新的数组中。

+ ##### 合并数组

如果想在数组内合并数组，可以这样：

```js
const arr1 = ['two', 'three'];
const arr2 = ['one', ...arr1, 'four', 'five'];
// ["one", "two", "three", "four", "five"]
```

+ 扩展运算符与解构赋值结合，用于生成数组

```js
const [first, ...rest] = [1, 2, 3, 4, 5]; // first 1    rest [2, 3, 4, 5]
```

**注意：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错**

```js
const [...arrs, last] = [1, 2, 3, 4] //  Rest element must be last element
```

+ ##### 将字符串转为真正的数组

```js
const strToArr = [...'hello'] // ["h", "e", "l", "l", "o"]
```

+ ##### 任何Iterator接口的对象，都可以用扩展运算符转为真正的数组

比较常见的应用是可以将某些数据结构转为数组：

```js
// arguments对象
function foo(){
    const args = [...arguments];
}
```

用于替换`es5`中的`Array.prototype.slice.call(arguments)`写法。

+ ##### 使用`Math`函数获取数组中特定的值

```js
const numbers = [9, 4, 7, 1];
Math.min(...numbers); // 1
Math.mmax(...numbers); // 9
```

### 7. Proxy 可以实现什么功能？

在Vue3.0中通过`Proxy` 来替换原本的 `Object.defineProperty` 来实现数据响应式。

Proxy是ES6中新增的功能，它可以用来自定义对象中的操作。

```js
// target 代表需要代理的对象，handler用来自定义对象中的操作，比如可以用来自定义set或get函数   
// let p = new Proxy(target, handler)
var x = {name: '张三'}
let p = new Proxy(x, {
       /* 
             get方法用于拦截对象的读取属性操作
             @target 目标对象
             @property  被获取的属性名 symbol类型
             @receiver   Proxy或者继承Proxy的对象
        */
    get: function(target, property, receiver) {
        console.log('属性：' + property, receiver );
        return 10
    },
      /* 
          set方法是设置属性值操作的捕获器
          @target 目标对象
          @property  将被设置的属性名或 Symbol
          @value      新属性值
          @receiver   最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）*/
    set: function(target, property, value, receiver){
        target[property] = value;
        console.log('property set: ' + property + ' = ' + value);
        return true
    }

})
console.log(p.name);
console.log(p.age = 12);
```

下面来通过 `Proxy` 来实现一个数据响应式：

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}
let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```

在上述代码中，通过自定义`set` 和 `get` 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。

当然这是简单版的响应式实现，如果需要实现一个Vue中的响应式，需要在`get`中收集依赖，在`set`派发更新，之所以Vue3.0要使用`Proxy`替代原本的API，原因在于`Proxy`无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能更好，并且原本的实现有些数据更新监听不到(数组的添加)，但是`Proxy`可以完美监听到任何方式的数据改变，唯一缺陷就是浏览器的兼容性不好。

### 8. 对对象与数组的解构的理解

解构是ES6提供的一种新的提取数据的模式，这种模式能够从对象或数组中有针对性地拿到想要的值。

#### （1）数组的解构

在解构数组时，以元素的位置为匹配条件来提取想要的数据的：

```js
const [a, b, c] = [1, 2, 3]
const [d, , e] = [4, 5, 6]
```

#### （2）对象的解构

在解构对象时，是以属性的名称为匹配条件，来提取想要的数据的。

```js
const obj = {
    name: 'tom',
    age: 24
}
const { name, age } = obj
```

注意，对象解构严格以属性名作为定位依据，所以就算调换了 name 和 age 的位置，结果也是一样的：

```js
const { age, name } = obj
```

```js
const school = {
    class: {
        student: {
            gender : '男',
            age: 22
        }
    }
}
const { class: { student: { gender } } } = school
```

### 10. 对 rest 参数的理解

扩展运算符被用在函数形参上时，**它还可以把一个分离的参数序列整合成一个数组**：

```js
function mutiple(...args){
    let result = 1
    for(var val of args){
        result *= val
    }
    console.log(result);
    return result
}

mutiple(1, 2, 3); // 6
```

这里，传入 mutiple 的是三个分离的参数，但是如果在 mutiple 函数里尝试输出 args 的值，会发现它是一个数组：

```js
function mutiple(...args){
	console.log(args)
}
mutiple(1, 2, 3)  // [1, 2, 3]
```

这就是rest运算符的又一层威力了，它可以把函数的多个入参收敛进一个数组里。这一点

**经常用于获取函数的多余参数，或者像上面这样处理函数参数个数不确定的情况。**

### 11. ES6中模板语法与字符串处理

ES6 提出了“模板语法”的概念。在 ES6 以前，拼接字符串是很麻烦的事情：

```js
var name = 'css'   
var career = 'coder' 
var hobby = ['coding', 'writing']
var finalString = 'my name is ' + name + ', I work as a ' + career + ', I love ' + hobby[0] + ' and ' + hobby[1]
```

```js
var name = 'css'   
var career = 'coder' 
var hobby = ['coding', 'writing']
var finalString = `my name is ${name}, I work as a ${career} I love ${hobby[0]} and ${hobby[1]}`
```

这就是模板字符串的第一个优势——允许用${}的方式嵌入变量。但这还不是问题的关键，模板字符串的关键优势有两个：

+ 在模板字符串中，空格、缩进、换行都会被保留
+ 模板字符串完全支持“运算”式的表达式，可以在${}里完成一些计算。

```js
let list = `
	<ul>
		<li>列表项1</li>
		<li>列表项2</li>
	</ul>
`;
console.log(message); // 正确输出，不存在报错

```

基于第二点，可以把一些简单的计算和调用丢进 ${} 来做：

```js
function add(a, b) {
  const finalString = `${a} + ${b} = ${a+b}`
  console.log(finalString)
}
add(1, 2) // 输出 '1 + 2 = 3'
```

除了模板语法外， ES6中还新增了一系列的字符串方法用于提升开发效率：

（1）**存在性判定**：在过去，当判断一个字符/字符串是否在某字符串中时，只能用 indexOf > -1 来做。现在 ES6 提供了三个方法：**includes、startsWith、endsWith**，它们都会返回一个布尔值来告诉你是否存在。

+ **includes**：判断字符串与子串的包含关系：

```js
const son = 'aaa'
const father = 'aaabbb'
console.log(father.includes(son)); // true
```

+ **startsWith**：判断字符串是否以某个/某字符串开头：

```js
const first = '你好'
const content = '你好，我是新客户'
console.log(content.startsWith(first)); // true
```

+ **endsWith**：判断字符串是否以某个/某字符串结尾：

```js
const end = '再见'
const bye = '那就再见吧'
console.log(bye.endsWith(end)); // false
```

（2）**自动重复**：可以使用`repeat`方法来使同一个字符串输出多次(被连续复制多次)

```js
const sourceCode = 'repeat for 3 times'
const repeated = sourceCode.repeat(3)
console.log(repeated); // repeat for 3 timesrepeat for 3 timesrepeat for 3 times
```