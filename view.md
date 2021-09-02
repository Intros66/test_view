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

























## Vue

### 1、data与el的两种写法

```javascript
# el
1、 const vm=new Vue({
           el:'#app',
           data:{
               name: '尚'
           },
           methods:{}
        });
	data：{
              name: '尚',
           },

2、 vm.$mount("#app")
    data(){
        return{
            name: '尚',
        }
   },



```

**切记：data函数不用箭头函数，箭头函数没有自己的函数，要往外找**

```javascript
# this指vue实例对象 
data(){
               console.log(this);
                return{
                    name: '尚',
                }
},

    
# this指全局window对象
 data:()=>{
               console.log(this);
                return{
                    name: '尚',
                }
           },
```

### 2、MVVM

![image-20210727091136595](assets/mvvm%E6%A8%A1%E5%9E%8B.png)

MVVM模型

+ M：Model：data中的数据
+ V：View：模板代码
+ VM：ViewModel：Vue实例

data中所有的属性，最后都出现在vm身上。

vm身上的所有属性及Vue原型上所有属性，在Vue模板中都可以直接使用。

### 3、数据代理

**Object.defineProperty**

**数据发生变化，setter方法调用，setter中的调用能重新解析模板，生成新的虚拟DOM，新旧DOM对比，更新页面。**

![image-20210728085915915](assets/%E6%95%B0%E6%8D%AE%E4%BB%A3%E7%90%86.png)

### 4、事件处理

事件修饰符

+ prevent
  + 阻止默认事件
+ stop
  + 阻止事件冒泡
+ once
  + 事件只触发一次
+ capture
  + 使用事件的捕获模式
+ self
  + 只有event.target是当前操作的元素时才触发事件
+ passive
  +  

事件处理流程：捕获(由外向内)--->冒泡(由内向外)



### 5、时间处理第三方库

![image-20210728165741726](assets/dayjs.png)

![image-20210728165804644](assets/momentjs.png)

### 6、生命周期

![生命周期](assets/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

### 7、组件

![image-20210802143017166](assets/%E7%BB%84%E4%BB%B6%E5%86%85%E7%BD%AE%E5%85%B3%E7%B3%BB.png)





















