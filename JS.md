# JS

## 数据类型

### 1. 数据类型

八种数据类型：7种基本数据类型，1种引用数据类型，string, number, boolean, null, undefined, symbol, bigint, object

```js
console.log(typeof '2');   //string
console.log(typeof 2);      // number
console.log(typeof true);   // boolean
console.log(typeof Symbol(1));  // symbol  不能用new，因为时原始数据类型，不是对象。 表示独一无二的值，最大用法是定义对象中唯一属性名
console.log(typeof BigInt(3));  // bigint 
console.log(typeof undefined);  // undefined
console.log(typeof null);   // object
console.log(typeof {});     // object
console.log(typeof function(){});   // function
```

**string number boolean null undefined symbol bigint  存在栈中**
**object   对象的地址值存在栈中，内容存在堆中**

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。
  - 当使用 BigInt 时，带小数的运算会被取整。
  - 对任何 BigInt 值使用 JSON.stringify() 都会引发 TypeError，因为默认情况下 BigInt 值不会在 JSON 中序列化，但是可以在BigInt的原型上添加toJSON方法实现序列化
- 栈
  - 原始数据类型
    - string
    - number
    - boolean
    - null
    - undefined
    - symbol
    - bigint
- 堆
  - 引用数据类型
    - 对象
    - 数组
    - 函数

两种类型的区别在于**存储位置的不同：**

+ **原始数据类型**是直接存储在**栈**中的简单数据段，占据空间小，大小固定，署于被频繁使用数据，所以放入栈中存储。
+ **引用数据类型**是存储在**堆**中的对象，占据空间大，大小不固定。如果存储在栈中，会影响程序运行的性能。引用数据类型在栈中存储了指针(地址)，用于指向该对象的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

**堆和栈**

+ 在数据结构中
  + 后进先出
+ 在操作系统中，分为栈区和堆区
  + 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。
  + 堆区内存一般由开发者分配释放，若开发者不释放，程序结束时，可能由垃圾回收机制回收。

### 2. 数据类型检测的方式

#### 1、typeof

```js
console.log(typeof '2');   //string
console.log(typeof 2);      // number
console.log(typeof true);   // boolean
console.log(typeof Symbol(1));  // symbol 
console.log(typeof BigInt(3));  // bigint 
console.log(typeof undefined);  // undefined
console.log(typeof null);   // object
console.log(typeof {});     // object
console.log(typeof function(){});   // function
```

**其中，数组、对象、null都会被判断为object，其他正确**

#### 2、instanceof

**用于检测构造函数的原型属性是否在实例对象的原型链上，简单点说就是判断对象类型的**

**内部运行机制是判断其原型链上能否找到该类型的原型。**

```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false 
 
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

`instanceof`**只能正确判断引用数据类型**

#### 3、constructor

```js
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
```

`constructor`有两个作用，一是判断数据的类型，二是对象实例通过

`constrcutor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了：

```js
function Fn(){};
 
Fn.prototype = new Array();
 
var f = new Fn();
 
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true
```

#### 4、Object.prototype.toString.call()

要想区分对象、数组、函数、单纯使用`typeof`是不行的。可以通过`Object.prototype.toString`方法，判断某个对象之属于哪种内置类型。
分为`null`、`string`、`boolean`、`number`、`undefined`、`array`、`function`、`object`、`date`、`math`

```js
console.log(Object.prototype.toString.call(new Date())); // [object Date]
console.log(Object.prototype.toString.call(function(){})); // [object Function]
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call(/\.js$/)); // [object RegExp]
console.log(Object.prototype.toString.call(Math.random())); // [object number]
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call('1')); // [object string]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]
```

同样是检测对象`obj`调用`toString`方法，`obj.toString()`的结果和`Object.prototype.toString.call(obj)`的结果不一样，这是为什么？

这是因为`toString`是`Object`的原型方法，而`Array`、`function`等**类型作为Object的实例，都重写了toString方法**。

不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…）而不会去调用Object上原型toString方法（返回对象的具体类型）所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object原型上的toString方法。

### 3. 判断数组的方式有哪些？

#### 1、通过`Object.prototype.toString.call()`判断

```js
var obj = [1, 2, 3, 4, 5]
console.log(Object.prototype.toString.call(obj).slice(8, -1) === 'Array');
```

#### 2、通过原型链判断

```js
console.log(obj.__proto__ === Array.prototype);
```

#### 3、通过ES6的Array.isArray()判断

```js
console.log(Array.isArray(obj));
```

#### 4、通过instanceof判断

```js
console.log(obj instanceof Array);
```

### 4. null和undefined区别

null和undefined都是基本数据类型，都只有一个值，null和undefined

undefined代表的含义是**未定义**，null代表的含义是**空对象**，一般变量声明了但是没有定义(赋值)的时候会返回undefined，null主要用于赋值给一些可能返回对象的变量，作为初始化。

对于这两种类型使用`typeof`进行判断时，`null`类型会返回`object`，当使用双等号堆两种类型的值进行比较时会返回true，三个等号时返回false.

### 5. typeof null的结果是什么，为什么？

typeof null 的结果时Object。

在JS的第一个版本，js中的值是由一个表示类型的标签和实际数据值来表示的，共有五个数据类型

```js
000: object   - 当前存储的数据指向一个对象。
  1: int      - 当前存储的数据是一个 31 位的有符号整数。
010: double   - 当前存储的数据指向一个双精度的浮点数。
100: string   - 当前存储的数据指向一个字符串。
110: boolean  - 当前存储的数据是布尔值。

有 2 个值比较特殊：
undefined：(-2)30(一个超出整数范围的数字)。

null：对应机器码的 NULL指针，一般是全零。
```

由于 `null` 代表的是空指针（大多数平台下值为 0x00）因此，null 的类型标签是 0，`typeof null` 也因此返回 `"object"`.

### 6. instanceof实现原理

**instanceof用于判断构造函数是否在该实例对象的原型链上**

```js
function myInstanceof(left, right){
    // 获取对象原型
    
}
```

### 7. 为什么0.1+0.2 !== 0.3，如何让其相等

```js
let n1 = 0.1, n2 = 0.2
console.log(n1 + n2)  // 0.30000000000000004
```

这里得到的不是想要的结果，要想等于0.3，就要把它进行转化：

```js
(n1 + n2).toFixed(2) // 注意，toFixed为四舍五入
```

`toFixed(num)` 方法可把 Number 四舍五入为指定小数位数的数字。那为什么会出现这样的结果呢？

计算机是通过二进制的方式存储数据的，所以在执行0.1+0.2时，实际上算的是两个数的二进制的和。0.1和0.2的二进制都是无限循环的。

怎么解决？**设置一个误差范围**

**`Number.EPSILON`** 属性表示 1 与[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)可表示的大于 1 的最小的浮点数之间的差值。

```
EPSILON` 属性的值接近于 `2.2204460492503130808472633361816E-16`，或者 `2-52。
```

只要判断`0.1+0.2-0.3`是否小于`Number.EPSILON`，如果小于，就可以判断为0.1+0.2 ===0.3

```js
// Math.abs(x) 函数返回指定数字 “x“ 的绝对值
function numberepsilon(arg1,arg2){                   
  return Math.abs(arg1 - arg2) < Number.EPSILON;        
}        
console.log(numberepsilon(0.1 + 0.2, 0.3)); // true
```

### 8. 如何获取安全的undefined值？

可以通过表达式void，void并不改变表达式的结果，只是让表达式不返回值。因此可以用**`void 0`** 来获得undefined

### 9. typeof NaN 的结果是什么？

NaN 指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。

```js
typeof NaN; // "number"
```

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。

而 NaN !== NaN 为 true。

### 10. isNaN和Number.isNaN函数的区别？

- 函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。

```js
console.log(isNaN(3)); // false
console.log(isNaN('str')); // true
console.log(Number.isNaN(3)); // false
console.log(Number.isNaN('str')); // false
```

### 11. ==操作符的强制类型转换规则

对于`==`来说，如果对比双方的类型**不一样**，就会进行**类型转换**。假设对比`x`和`y`是否相同，就会进行如下判断流程：

+ 首先会判断两者类型是否**相同，**相同的话就比较两者的大小；
+ 类型不相同的话，就会进行类型转换；
+ 会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`
+ 判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`

```js
1 == '1'
      ↓
1 ==  1
```

+ 判断其中一方是否为 `boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断

```js
'1' == true
        ↓
'1' ==  1
        ↓
 1  ==  1
```

+ 判断其中一方是否为 `object` 且另一方为 `string`、`number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断

```js
'1' == { name: 'js' }       
↓
'1' == '[object Object]'
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c451c19e23dd4726b3f36223b6c18a1e~tplv-k3u1fbpfcp-watermark.awebp)

### 12. 其他值到字符串的转换规则

- Null 和 undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"
- Boolean 类型，true 转换为 "true"，false 转换为 "false"
- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式
- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误
- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值

### 13. 其他值到数字值的转换规则

- Undefined 类型的值转换为 NaN
- Null类型的值转换为0
- String类型的值转换如同使用Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0
- Symbol 类型的值不能转换为数字，会报错
- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字

### 14. 其他值到布尔类型的值的转换规则？

以下这些是假值：

 • undefined

 • null

 • false

 • +0、-0 和 NaN

 • ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

```js
console.log('string----');
console.log(String(null)); // 'null'
console.log(String(undefined)); // 'undefined'
console.log(String(1)); // '1'
console.log(String(1100000000000000001545540)); // '1.1e+24'
console.log(String(Symbol(name))); // 'Symbol(name)',只允许显式强制类型转换，隐式会报错
console.log(String({})); // '[object Object]'

console.log('number----');
console.log(Number(NaN)); // NaN
console.log(Number(null)); // 0
// console.log(Number(Symbol(1))); // Cannot convert a Symbol value to a number
console.log(Number(true)); // true: 1  false: 0
console.log(Number({})); // NaN
console.log(Number(['1'])); // 1 

console.log('boolean-----');
console.log(Boolean(undefined)); // false
console.log(Boolean(null));
console.log(Boolean(false));
console.log(Boolean(+0));
console.log(Boolean(-0));
console.log(Boolean(NaN));
console.log(Boolean(""));
console.log(Boolean(1)); // true
```

### 15. || 和 && 操作符的返回值？

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先强制转换为布尔类型，然后再执行条件判断。

- 对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。
- && 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

**|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果**

### 16. Object.is() 与比较操作符 “== =”、“==” 的区别？

+ 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
+ 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
+ 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

== = 严格相等，==非严格相等，Object.is(同值相等)

```js
var num = 1
var str = '1'
console.log(num == str);  // true
console.log(num === str); // false
console.log(Object.is(num, str)); // false
console.log(Object.is(-0, +0)); // false
console.log(Object.is(NaN, NaN)); // true
```

### 17. JavaScript 中如何进行隐式类型转换？

首先要介绍**ToPrimitive**方法，这是Javascript中每个值隐含的自带的方法，用来将值（无论是基本类型值还是对象）转换成基本类型值。如果值为基本类型，则直接返回值本身，如果值为对象：

```js
/**
* @obj 需要转换的对象
* @type 期望的结果类型   type的值为number或string
*/
ToPrimitive(obj,type)
```

`type`的值为`number`或者`string`。

**（1）当**`type`**为**`number`**时规则如下：**

- 调用`obj`的`valueOf`方法，如果为原始值，则返回，否则下一步；
- 调用`obj`的`toString`方法，后续同上；
- 抛出`TypeError` 异常。

**（2）当**`type`**为**`string`**时规则如下：**

- 调用`obj`的`toString`方法，如果为原始值，则返回，否则下一步；
- 调用`obj`的`valueOf`方法，后续同上；
- 抛出`TypeError` 异常。

可以看出两者的主要区别在于调用`toString`和`valueOf`的先后顺序。默认情况下：

- 如果对象为 Date 对象，则`type`默认为`string`；
- 其他情况下，`type`默认为`number`。

总结上面的规则，对于 Date 以外的对象，转换为基本类型的大概规则可以概括为一个函数：

```js
var objToNumber = value => Number(value.valueOf().toString())
objToNumber([]) === 0
objToNumber({}) === NaN
```

而 JavaScript 中的隐式类型转换主要发生在`+、-、*、/`以及`==、>、<`这些运算符之间。而这些运算符只能操作基本类型值，所以在进行这些运算前的第一步就是将两边的值用`ToPrimitive`转换成基本类型，再进行操作。

以下是基本类型的值在不同操作符的情况下隐式转换的规则 （对于对象，其会被`ToPrimitive`转换成基本类型，所以最终还是要应用基本类型转换规则）：

+ `+`**操作符**

`+`操作符的两边有至少一个`string`类型变量时，两边的变量都会被隐式转换为字符串；其他情况下两边的变量都会被转换为数字。

```js
1 + '23' // '123'
1 + false // 1 
1 + Symbol() // Uncaught TypeError: Cannot convert a Symbol value to a number
'1' + false // '1false'
false + true // 1

```

+ `-`、`*`、`\`**操作符**

`NaN`也是一个数字

```js
1 * '23' // 23
 1 * false // 0
 1 / 'aa' // NaN
```

+ **对于**`==`**操作符**

操作符两边的值都尽量转成`number`：

```js
3 == true // false, 3 转为number为3，true转为number为1
'0' == false //true, '0'转为number为0，false转为number为0
'0' == 0 // '0'转为number为0
```

+ **对于**`<`**和**`>`**比较符**

如果两边都是字符串，则比较字母表顺序：

```js
'ca' < 'bd' // false
'a' < 'b' // true
```

其他情况下，转换为数字再比较：

```js
'12' < 13 // true
false > -1 // true
```

以上说的是基本类型的隐式转换，而对象会被`ToPrimitive`转换为基本类型再进行转换：

```js
var a = {}
a > 2 // false
```

其对比过程如下：

```js
// valueof() 返回值为该对象的原始值
a.valueOf() // {}, 上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步
a.toString() // "[object Object]"，现在是一个字符串了
Number(a.toString()) // NaN，根据上面 < 和 > 操作符的规则，要转换成数字
NaN > 2 //false，得出比较结果
```

又比如：

```js
var a = {name:'Jack'}
var b = {age: 18}
a + b // "[object Object][object Object]"
```

运算过程如下：

```js
a.valueOf() // {}，上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步
a.toString() // "[object Object]"
b.valueOf() // 同理
b.toString() // "[object Object]"
a + b // "[object Object][object Object]"
```

### 19. `+` 操作符什么时候用于字符串的拼接？

根据 ES5 规范，如果某个操作数是字符串或者能够通过以下步骤转换为字符串的话，+ 将进行拼接操作。如果其中一个操作数是对象（包括数组），则首先对其调用 ToPrimitive 抽象操作，该抽象操作再调用 [[DefaultValue]]，以数字作为上下文。如果不能转换为字符串，则会将其转换为数字类型来进行计算。

简单来说就是，如果 + 的其中一个操作数是字符串（或者通过以上步骤最终得到字符串），则执行字符串拼接，否则执行数字加法。

那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字。

### 21. object.assign和扩展运算法是深拷贝还是浅拷贝，两者区别

扩展运算符：

```js
let outObj = {
  inObj: {a: 1, b: 2}
}
let newObj = {...outObj}
newObj.inObj.a = 2
console.log(outObj) // {inObj: {a: 2, b: 2}}
```

Object.assign():

```js
let outObj = {
  inObj: {a: 1, b: 2}
}
let newObj = Object.assign({}, outObj)
newObj.inObj.a = 2
console.log(outObj) // {inObj: {a: 2, b: 2}}
```

可以看到，两者都是浅拷贝。

+ Object.assign()方法接收的第一个参数作为目标对象，后面的所有参数作为源对象。然后把所有的源对象合并到目标对象中。它会修改了一个对象，因此会触发 ES6 setter。
+ 扩展操作符（…）使用它时，数组或对象中的每一个值都会被拷贝到一个新的数组或对象中。它不复制继承的属性或类的属性，但是它会复制ES6的 symbols 属性。

## 基础

### 1. new操作符的实现原理

**new操作符的执行过程：**

+ 创建一个新的空对象
+ 设置原型，将构造函数的显式原型属性赋值给实例对象的隐式原型属性
+ 让构造函数的this指向这个对象，为这个对象添加新的属性/方法
+ 判断构造函数的返回值类型，如果是值类型，返回创建的实例对象。如果是引用类型，就返回这个引用类型的实例对象。

```js
 function objectFactory() {
     let newObject = null;
     let constructor = Array.prototype.shift.call(arguments);
     let result = null;
     // 判断参数是否是一个函数
     if (typeof constructor !== "function") {
         console.error("type error");
         return;
     }
     // 1. 新建一个空对象，对象的原型为构造函数的 prototype 对象
     newObject = Object.create(constructor.prototype);
     // 2. 将 this 指向新建对象，并执行函数
     result = constructor.apply(newObject, arguments);
     // 3. 判断返回对象
     let flag = result && (typeof result === "object" || typeof result === "function");
     // 4. 判断返回结果
     return flag ? result : newObject;
 }
// 使用方法
objectFactory(构造函数, 初始化参数);
```

### 2. map和Object的区别

|          |                             Map                              |                            Object                            |
| -------- | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 意外的键 |        Map默认情况不包含任何键，只包含显式插入的键。         | Object 有一个原型, 原型链上的键名有可能和自己在对象上的设置的键名产生冲突。 |
| 键的类型 |     Map的键可以是任意值，包括函数、对象或任意基本类型。      |            Object 的键必须是 String 或是Symbol。             |
| 键的顺序 | Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。 |                     Object 的键是无序的                      |
| size     |         Map 的键值对个数可以轻易地通过size 属性获取          |               Object 的键值对个数只能手动计算                |
| 迭代     |           Map 是 iterable 的，所以可以直接被迭代。           | 迭代Object需要以某种方式获取它的键然后才能迭代。（Object.keys(obj)） |
| 性能     |              在频繁增删键值对的场景下表现更好。              |          在频繁添加和删除键值对的场景下未作出优化。          |

**map**

- Map.prototype.size
  - size是可访问属性，用于返回一个Map对象的成员数量
- Map.prototype.clear()
  - 移除Map对象中的所有元素
- Map.prototype.delete()
  - 移除Map对象中的指定元素
- Map.prototype.entries()
  - 返回一个新的包含[key, value]的`Iterator`对象，返回的迭代器插入顺序与Map对象的插入顺序相同
- Map.prototype.forEach()
  - 按照插入顺序依次对Map中每个键/值对执行一次给定的函数
- Map.prototype.get()
  - 返回某个Map对象中的一个指定元素
- Map.prototype.has()
  - 返回一个boolean值，表明map中是否含有该元素
- Map.prototype.keys()
  - 返回一个引用的`Iterator`对象，包含按照插入顺序Map对象中每个元素的key值
- Map.prototype.set()
  - 为Map对象添加或更新一个指定了key和value的新键值对
- Map.prototype.values()
  - 返回一个新的`Iterator`对象，包含按顺序插入Map对象中每个元素的value值

```js
 const maps = new Map()
 maps.set('0', 'one');
maps.set('0', '2');
maps.set('1', 'two');
maps.set('2', 'three');
maps.set('3', 'four');
maps.set('4', 'five');
maps.set('5', 'six');

// size 查看Map的成员数量
console.log(maps.size); // 6
// 获取指定元素的值
console.log(maps.get('0')); // 2
// 添加/修改指定key的value 并返回修改后的Map对象
console.log(maps.set('1', 'NiHao')); // {"0" => "2", "1" => "NiHao"}
// 删除指定元素 返回boolean
console.log(maps.delete('0'));
// 遍历value
maps.forEach(map => {
    console.log(map);
})
// 返回一个迭代器对象，包含key 和 value
console.log(maps.entries().next().value); // ["1", "NiHao"]
// 返回一个迭代器对象
console.log(maps.keys().next().value) // 1
// 返回一个迭代器对象
console.log(maps.values().next().value); // 'NiHao'
// 判断是否包含某个元素
console.log(maps.has('3')); // true
// 清空Map成员
maps.clear();
console.log(maps); // Map(0){}

const obj = { name: 'tom', age: 12}
console.log(Object.keys(obj)); //  ["name", "age"]
console.log(Object.values(obj)); // ["tom", 12]
console.log(obj.hasOwnProperty('1')); // false
```

### 3. map和weakMap的区别

- Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

- WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。

### 7. JavaScript脚本延迟加载的方式有哪些？

+ **defer 属性：** 给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
+ **async属性：**给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。

- **动态创建 DOM 方式：** 动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

- **使用 setTimeout 延迟方法：** 设置一个定时器来延迟加载js脚本文件。
- **让 JS 最后加载：** 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

### 8. JavaScript 类数组对象的定义？

一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个数。

常见的类数组转换为数组的方法有这样几种：

（1）通过 call 调用数组的 slice 方法来实现转换

```js
Array.prototype.slice.call(arrayLike);
```

（2）通过 call 调用数组的 splice 方法来实现转换

```javascript
Array.prototype.splice.call(arrayLike, 0);
```

（3）通过 apply 调用数组的 concat 方法来实现转换

```javascript
Array.prototype.concat.apply([], arrayLike);
```

（4）通过 Array.from 方法来实现转换

```javascript
Array.from(arrayLike);
```

### 9. 数组有哪些原生方法？

![img](https://img-blog.csdn.net/20170410171830454?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvemh4aDAzNzY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



![img](https://img-blog.csdn.net/20170410171848705?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvemh4aDAzNzY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

![img](https://img-blog.csdn.net/20170410171910895?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvemh4aDAzNzY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

![img](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages5.10qianwan.com%2F10qianwan%2F20200623%2Fb_0_202006231657052749.png&refer=http%3A%2F%2Fimages5.10qianwan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633160440&t=f77bf0af59c0acc136268dea72bfa049)



### 12. 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?

`arguments`是一个对象，它的属性是从 0 开始依次递增的数字，还有`callee`和`length`等属性，与数组相似；但是它却没有数组常见的方法属性，如`forEach`, `reduce`等，所以叫它们类数组。

（1）将数组的方法应用到类数组上，这时候就可以使用`call`和`apply`方法，如：

```js
function foo(){ 
  Array.prototype.forEach.call(arguments, a => console.log(a))
}
```

（2）使用Array.from方法将类数组转化成数组：‌

```js
function foo(){ 
  const arrArgs = Array.from(arguments) 
  arrArgs.forEach(a => console.log(a))
}
```

（3）使用展开运算符将类数组转化成数组

```js
function foo(){ 
    const arrArgs = [...arguments] 
    arrArgs.forEach(a => console.log(a)) 
}
```

### 13. 什么是 DOM 和 BOM？

+ DOM指的是文档对象模型，它指的是把文档当作一个对象，这个对象主要定义了处理网页内容的方法和接口。
+ BOM指的是浏览器对象模型，它指的是把浏览器当作一个对象来对待，这个对象主要定义了与浏览器进行交互的方法接口。**BOM的核心是window，而window对象具有双重角色，既是js访问浏览器窗口的一个接口，又是一个Global对象**。这意味着再网页中定义任何的对象，变量和函数，都作为全局对象的一个属性或方法存在。window对象含有**location**对象、**navigator**对象、**screen**对象等子对象，并且DOM的最根本的对象**document**对象也是BOM的window对象的子对象。

### 15. escape、encodeURI、encodeURIComponent 的区别

+ encodeURI 是对整个 URI 进行转义，将 URI 中的非法字符转换为合法字符，所以对于一些在 URI 中有特殊意义的字符不会进行转义。
+ encodeURIComponent 是对 URI 的组成部分进行转义，所以一些特殊字符也会得到转义。
+ escape 和 encodeURI 的作用相同，不过它们对于 unicode 编码为 0xff 之外字符的时候会有区别，escape 是直接在字符的 unicode 编码前加上 %u，而 encodeURI 首先会将字符转换为 UTF-8 的格式，再在每个字节前加上 %。

### 16. 对AJAX的理解，实现一个AJAX请求

AJAX是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

创建AJAX请求的步骤：

+ **创建一个XMLHttpRequest对象**
+ 在这个对象上**使用open方法创建一个HTTP请求**，open方法需要的参数是请求的方法，地址，是否异步和用户的认证信息。
+ 在发请求前，可以**添加一些信息和监听函数**。比如通过setRequestHeader方法来为请求添加头信息。还可以添加一个状态监听函数。一个XMLHttpRequest对象一共有5个状态，当它的状态发生改变时，就会触发onreadystatechange事件，通过设置监听函数，来处理请求成功后的结果。当对象readyState变为4的时候，代表服务器返回的数据接收完成，这个时候通过判断状态码，2xx | 304，就可以通过response中的数据对页面更新了。
+ 当对象的属性和监听函数设置完成后，最后**调用send方法来向服务器发送请求**，可以传入参数作为发送的数据体。

```js
const SERVER_URL = "/server";
let xhr = new XMLHttpRequest();
// 创建 Http 请求
xhr.open("GET", url, true);
// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};
// 设置请求头信息
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
// 发送 Http 请求
xhr.send(null);
```



### 17. JavaScript为什么要进行变量提升，它导致了什么问题？

变量提升的表现是，无论在函数中何处位置声明的变量，好像都被提升到了函数的首部，可以在变量声明前访问到而不会报错。

**本质原因**是 js 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。

首先要知道，JS在拿到一个变量或者一个函数的时候，会有两步操作，即解析和执行。

+ **在解析阶段**，JS会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined，函数先声明好可使用。在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this、arguments和函数的参数。
  + 全局上下文：变量定义，函数声明
  + 函数上下文：变量定义，函数声明，this，arguments
+ **在执行阶段**，就是按照代码的顺序依次执行。

那为什么会进行变量提升呢？主要有以下两个原因：

- 提高性能
- 容错性更好

**（1）提高性能** 

+ 在JS代码执行之前，会进行语法检查和预编译，并且这一操作只进行一次。这么做就是为了提高性能，如果没有这一步，那么每次执行代码前都必须重新解析一遍该变量（函数），而这是没有必要的，因为变量（函数）的代码并不会改变，解析一遍就够了。
+ 在解析过程中，还会为函数生成与编译代码。在预编译时，会统计声明了哪些变量、创建了哪些函数，并对函数的代码进行压缩，去除注释及不必要的空白等。这样做的好处就是每次执行函数时，都可以直接为该函数分配栈空间，并且因为代码压缩的原因，代码执行更快。

**（2）容错性更好**

**总结：**

- 解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
- 声明提升还可以提高JS代码的容错性，使一些不规范的代码也可以正常执行

**导致问题：同名变量会覆盖，函数内部定义的同名变量会覆盖全局上下文中的变量，导致undefined**

### 18. 什么是尾调用，使用尾调用有什么好处？

尾调用指的是函数的最后一步调用另一个函数。代码执行是基于执行栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

### 19. **ES6**模块与**CommonJS**模块有什么异同？

+ CommonJS是对模块的浅拷贝，ES6 Module是对模块的引用，即ES6 Module只存只读，不能改变其值。
+ import的接口时read-only，不能修改变量值。即不能修改其变量的指针指向，但可以改变变量内部指针指向，可以对CommonJS重新赋值（改变变量内部指针指向），但是对ES6 Module赋值会编译报错。
+ ES6 Module和CommonJS模块的共同点：
  + CommonJS和ES6 Module都可以对引入的对象进行赋值，即对对象内部属性的值进行改变。

### 20. 常见的DOM操作有哪些

#### 1）DOM 节点的获取

```js
getElementById // 按照 id 查询
getElementsByTagName // 按照标签名查询
getElementsByClassName // 按照类名查询
querySelectorAll // 按照 css 选择器查询
```

#### 2）DOM 节点的创建

**创建一个新节点，并把它添加到指定节点的后面。**

```js
<html>
  <head>
    <title>DEMO</title>
  </head>
  <body>
    <div id="container"> 
      <h1 id="title">我是标题</h1>
    </div>   
  </body>
</html>


<!-- 要求添加一个有内容的 span 节点到 id 为 title 的节点后面  -->
// 首先获取父节点
var container = document.getElementById('container')
// 创建新节点
var targetSpan = document.createElement('span')
// 设置 span 节点的内容
targetSpan.innerHTML = 'hello world'
// 把新创建的元素塞进父节点里去
container.appendChild(targetSpan)
```

#### 3）DOM 节点的删除

**删除指定的 DOM 节点**

```js
<html>
  <head>
    <title>DEMO</title>
  </head>
  <body>
    <div id="container"> 
      <h1 id="title">我是标题</h1>
    </div>   
  </body>
</html>

// 需要删除 id 为 title 的元素
// 获取目标元素的父元素
var container = document.getElementById('container')
// 获取目标元素
var targetNode = document.getElementById('title')
// 删除目标元素
container.removeChild(targetNode)

//或者通过子节点数组来完成删除：
//获取目标元素的父元素
var container = document.getElementById('container')
//获取目标元素
var targetNode = container.childNodes[1]
// 删除目标元素
container.removeChild(targetNode)
```

#### 4）修改 DOM 元素

修改 DOM 元素这个动作可以分很多维度，比如说移动 DOM 元素的位置，修改 DOM 元素的属性等。

**将指定的两个 DOM 元素交换位置**

```js
<html>
  <head>
    <title>DEMO</title>
  </head>
  <body>
    <div id="container"> 
      <h1 id="title">我是标题</h1>
      <p id="content">我是内容</p>
    </div>   
  </body>
</html>

//现在需要调换 title 和 content 的位置，可以考虑 insertBefore 或者 appendChild：
// 获取父元素
var container = document.getElementById('container')   
 
// 获取两个需要被交换的元素
var title = document.getElementById('title')
var content = document.getElementById('content')
// 交换两个元素，把 content 置于 title 前面
container.insertBefore(content, title)
```

### 21. use strict是什么意思 ? 使用它区别是什么？

use strict 是一种 ECMAscript5 添加的（严格模式）运行模式，这种模式使得 Javascript 在更严格的条件下运行。设立严格模式的目的如下：

- 消除 Javascript 语法的不合理、不严谨之处，减少怪异行为;
- 消除代码运行的不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 Javascript 做好铺垫。

区别：

+ 禁止使用 with 语句。
+ 禁止 this 关键字指向全局对象。
+ 对象不能有重名的属性。

### 22. 如何判断一个对象是否属于某个类？

- 第一种方式，使用 instanceof 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
- 第二种方式，通过对象的 constructor 属性来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。
- 第三种方式，如果需要判断的是某个内置的引用类型的话，可以使用 Object.prototype.toString() 方法来打印对象的[[Class]] 属性来进行判断。

### 23. 强类型语言和弱类型语言的区别

+ **强类型语言**：强类型语言也称为强类型定义语言，是一种总是强制类型定义的语言，要求变量的使用要严格符合定义，所有变量都必须先定义后使用。Java和C++等语言都是强制类型定义的，也就是说，一旦一个变量被指定了某个数据类型，如果不经过强制转换，那么它就永远是这个数据类型了。例如你有一个整数，如果不显式地进行转换，你不能将其视为一个字符串。
+ **弱类型语言**：弱类型语言也称为弱类型定义语言，与强类型定义相反。JavaScript语言就属于弱类型语言。简单理解就是一种变量类型可以被忽略的语言。比如JavaScript是弱类型定义的，在JavaScript中就可以将字符串'12'和整数3进行连接得到字符串'123'，在相加的时候会进行强制类型转换。

两者对比：强类型语言在速度上可能略逊色于弱类型语言，但是强类型语言带来的严谨性可以有效地帮助避免许多错误。

### 24. 解释型语言和编译型语言的区别

（1）解释型语言 使用专门的解释器对源程序逐行解释成特定平台的机器码并立即执行。

其特点总结如下

- 解释型语言每次运行都需要将源代码解释称机器码并执行，效率较低；
- 只要平台提供相应的解释器，就可以运行源代码，所以可以方便源程序移植；
- JavaScript、Python等属于解释型语言。

（2）编译型语言 使用专门的编译器，针对特定的平台，将高级语言源代码一次性的编译成可被该平台硬件执行的机器码，并包装成该平台所能识别的可执行性程序的格式。在编译型语言写的程序执行之前，需要一个专门的编译过程，把源代码编译成机器语言的文件，如exe格式的文件，以后要再运行时，直接使用编译结果即可，如直接运行exe文件。因为只需编译一次，以后运行时不需要编译，所以编译型语言执行效率高。java文件依赖于javac编译。

- 一次性的编译成平台相关的机器语言文件，运行时脱离开发环境，运行效率高；
- 与特定平台相关，一般无法移植到其他平台；（java移植性依赖JVM，不同操作系统有不同版本的JVM）
- C、C++等属于编译型语言。

**两者主要区别在于：** 前者源程序编译后即可在该平台运行，后者是在运行期间才编译。所以前者运行速度快，后者跨平台性好。

### 25. for...in和for...of的区别

for…of 是ES6新增的遍历方式，允许遍历一个含有iterator接口的数据结构（数组、对象等）并且返回各项的值，和ES3中的for…in的区别如下：

- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

**总结：** for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

### 26. 如何使用for...of遍历对象

如果需要遍历的对象是类数组对象，用Array.from转成数组即可。

```js
var obj = {
    0:'one',
    1:'two',
    length: 2
};
obj = Array.from(obj);
for(var k of obj){
    console.log(k)
}
```

如果不是类数组对象，就给对象添加一个[Symbol.iterator]属性，并指向一个迭代器即可。

```js
//方法一：
var obj = {
    a:1,
    b:2,
    c:3
};

obj[Symbol.iterator] = function(){
	var keys = Object.keys(this);
	var count = 0;
	return {
		next(){
			if(count<keys.length){
				return {value: obj[keys[count++]],done:false};
			}else{
				return {value:undefined,done:true};
			}
		}
	}
};

for(var k of obj){
	console.log(k);
}


// 方法二
var obj = {
    a:1,
    b:2,
    c:3
};
obj[Symbol.iterator] = function*(){
    var keys = Object.keys(obj);
    for(var k of keys){
        yield [k,obj[k]]
    }
};

for(var [k,v] of obj){
    console.log(k,v);
}

// 方法三
// Reflect.ownKeys
// 静态方法 Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。
const obj = {
    name: 'tom',
    age: 12,
    gender: '男',
    class: {
        subject: '英语',
        lesson: 20
    }
}
const objToArr = Reflect.ownKeys(obj)
for (const iterator of objToArr) {
    console.log(iterator);
}
```

### 27. ajax、axios、fetch的区别

#### （1）AJAX

Ajax 即“AsynchronousJavascriptAndXML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。它是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。其缺点如下：

- 本身是针对MVC编程，不符合前端MVVM的浪潮
- 基于原生XHR开发，XHR本身的架构不清晰
- 不符合关注分离（Separation of Concerns）的原则
- 配置和调用方式非常混乱，而且基于事件的异步模型不友好。

#### （2）Fetch

fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多。**fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象**。

fetch优点：

- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 async/await
- 更加底层，提供的API丰富（request, response）
- 脱离了XHR，是ES规范里新的实现方式

fetch缺点：

+ fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
+ fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
+ fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
+ fetch没有办法原生监测请求的进度，而XHR可以

#### （3）Axios

Axios 是一种基于Promise封装的HTTP客户端，其特点如下：

- 浏览器端发起XMLHttpRequests请求
- node端发起http请求
- 支持Promise API
- 监听请求和返回
- 对请求和返回进行转化
- 取消请求
- 自动转换json数据
- 客户端支持抵御XSRF攻击

### 28. 数组的遍历方法有哪些

+ forEach()
+ map()
+ filter()
+ for .. of
+ every()和some()
+ find()个findIndex()
+ reduce()和reduceRight()

### 29. forEach和map方法有什么区别

这方法都是用来遍历数组的，两者区别如下：

- forEach()方法会针对每一个元素执行提供的函数，对数据的操作会改变原数组，该方法没有返回值；
- map()方法不会改变原数组的值，返回一个新数组，新数组中的值为原数组调用函数处理之后的值；
























### 内置对象

#### 1、Reflect

**Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与`proxy handlers`的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。

`Reflect`的所有属性和方法都是静态的（就像[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)对象）。

+ **Reflect.apply**(target, thisArgument, argumentsList)
  + 对一个函数进行调用操作，同时可以传入一个数组作为调用参数和 `Function.prototype.apply()` 功能类似。
+ **Reflect.construct**(target, argumentsList[, newTarget\])
  + 对构造函数进行 `new`操作，相当于执行 `new target(...args)`。

+ **Reflect.defineProperty**(target, propertyKey, attributes)
  + 和 `Object.defineProperty()` 类似。如果设置成功就会返回 `true`

+ Reflect.deleteProperty(target, propertyKey)
  + 作为函数的`delete操作符`，相当于执行 `delete target[name]`。

+ **Reflect.get**(target, propertyKey[, receiver\])
  + 获取对象身上某个属性的值，类似于 `target[name]。`

+ **Reflect.getOwnPropertyDescriptor**(target, propertyKey)
  + 类似于 `Object.getOwnPropertyDescriptor()`。如果对象中存在该属性，则返回对应的属性描述符, 否则返回 `undefined`

+ **Reflect.getPrototypeOf**(target)
  + 类似于 [`Object.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)。

+ **Reflect.has**(target, propertyKey)
  + 判断一个对象是否存在某个属性，和 [`in` 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 的功能完全相同。

+ **Reflect.isExtensible**(target)
  + 类似于 [`Object.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible).

+ **Reflect.ownKeys**(target)
  + 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), 但不会受`enumerable影响`).

+ **Reflect.preventExtensions**(target)
  + 类似于 [`Object.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)。返回一个[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)。

+ **Reflect.set**(target, propertyKey, value[, receiver\])
  + 将值分配给属性的函数。返回一个[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)，如果更新成功，则返回`true`。

+ **Reflect.setPrototypeOf**(target, prototype)
  + 设置对象原型的函数. 返回一个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)， 如果更新成功，则返回`true。`





















































