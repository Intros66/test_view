## JS

### 数据类型

#### 1. 数据类型

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

#### 2. 数据类型检测的方式

##### 1、typeof

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

##### 2、instanceof

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

##### 3、constructor

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

##### 4、Object.prototype.toString.call()

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

#### 3. 判断数组的方式有哪些？

##### 1、通过`Object.prototype.toString.call()`判断

```js
var obj = [1, 2, 3, 4, 5]
console.log(Object.prototype.toString.call(obj).slice(8, -1) === 'Array');
```

##### 2、通过原型链判断

```js
console.log(obj.__proto__ === Array.prototype);
```

##### 3、通过ES6的Array.isArray()判断

```js
console.log(Array.isArray(obj));
```

##### 4、通过instanceof判断

```js
console.log(obj instanceof Array);
```

#### 4. null和undefined区别

null和undefined都是基本数据类型，都只有一个值，null和undefined

undefined代表的含义是**未定义**，null代表的含义是**空对象**，一般变量声明了但是没有定义(赋值)的时候会返回undefined，null主要用于赋值给一些可能返回对象的变量，作为初始化。

对于这两种类型使用`typeof`进行判断时，`null`类型会返回`object`，当使用双等号堆两种类型的值进行比较时会返回true，三个等号时返回false.

#### 5. typeof null的结果是什么，为什么？

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

#### 6. instanceof实现原理

**instanceof用于判断构造函数是否在该实例对象的原型链上**

```js
function myInstanceof(left, right){
    // 获取对象原型
    
}
```

#### 7. 为什么0.1+0.2 !== 0.3，如何让其相等

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

#### 8. 如何获取安全的undefined值？

可以通过表达式void，void并不改变表达式的结果，只是让表达式不返回值。因此可以用**`void 0`** 来获得undefined

#### 9. typeof NaN 的结果是什么？

NaN 指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。

```js
typeof NaN; // "number"
```

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。

而 NaN !== NaN 为 true。

#### 10. isNaN和Number.isNaN函数的区别？

- 函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。

```js
console.log(isNaN(3)); // false
console.log(isNaN('str')); // true
console.log(Number.isNaN(3)); // false
console.log(Number.isNaN('str')); // false
```

#### 11. ==操作符的强制类型转换规则

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

#### 12. 其他值到字符串的转换规则

- Null 和 undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"
- Boolean 类型，true 转换为 "true"，false 转换为 "false"
- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式
- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误
- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值

#### 13. 其他值到数字值的转换规则

- Undefined 类型的值转换为 NaN
- Null类型的值转换为0
- String类型的值转换如同使用Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0
- Symbol 类型的值不能转换为数字，会报错
- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字

#### 14. 其他值到布尔类型的值的转换规则？

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

#### 15. || 和 && 操作符的返回值？

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先强制转换为布尔类型，然后再执行条件判断。

- 对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。
- && 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

**|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果**

#### 16. Object.is() 与比较操作符 “== =”、“==” 的区别？

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

#### 17. JavaScript 中如何进行隐式类型转换？

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

#### 19. `+` 操作符什么时候用于字符串的拼接？

根据 ES5 规范，如果某个操作数是字符串或者能够通过以下步骤转换为字符串的话，+ 将进行拼接操作。如果其中一个操作数是对象（包括数组），则首先对其调用 ToPrimitive 抽象操作，该抽象操作再调用 [[DefaultValue]]，以数字作为上下文。如果不能转换为字符串，则会将其转换为数字类型来进行计算。

简单来说就是，如果 + 的其中一个操作数是字符串（或者通过以上步骤最终得到字符串），则执行字符串拼接，否则执行数字加法。

那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字。

#### 21. object.assign和扩展运算法是深拷贝还是浅拷贝，两者区别

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





### 原型链

![在这里插入图片描述](assets/原型链.png)
















































