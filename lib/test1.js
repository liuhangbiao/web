 // 类型强制转换----------------------
 // string强制转换为数字
'32' * 1            // 32
'ds' * 1            // NaN
null * 1            // 0
undefined * 1    // NaN
1  * { valueOf: ()=>'3' }        // 3
+ '123'            // 123
+ 'ds'               // NaN
+ ''                    // 0
+ null              // 0
+ undefined    // NaN
+ { valueOf: ()=>'3' }    // 3

// object强制转化为string
'the Math object:' + Math                // "the Math object:[object Math]"
'the JSON object:' + JSON              // "the JSON object:[object JSON]"

2  * { valueOf: ()=>'3' }                // 6
'J' + { toString: ()=>'S' }                // "JS"
'' + {toString:()=>'S',valueOf:()=>'J'}                // J

// 使用Boolean过滤数组中的所有假值(过滤假值：false，null，0，""，undefined，NaN)
const compact = arr => arr.filter(Boolean)
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])             // [ 1, 2, 3, 'a', 's', 34 ]

// 双位运算符 ~~
Math.floor(4.9) === 4      //true
// 简写为：
~~4.9 === 4      //true
~~4.5            // 4
Math.floor(4.5)        // 4
~~-4.5        // -4
Math.floor(-4.5)        // -5

// 短路运算符
let param1 = expr1 && expr2
let param2 = expr1 || expr2
let variable1
let variable2 = variable1  || 'foo'    
let variable = param && param.prop


// 取整 | 0（对一个数字| 0可以取整，负数也同样适用，num | 0）
1.3 | 0         // 1
-1.9 | 0        // -1

// 判断奇偶数 & 1 （对一个数字& 1可以判断奇偶数，负数也同样适用，num & 1）
const num=3;
!!(num & 1)					// true
!!(num % 2)				    // true

// 函数----------------
// 函数默认值
func = (l, m = 3, n = 4 ) => (l * m * n);
func(2)             //output: 24

// 强制参数
mandatory = ( ) => {
  throw new Error('Missing parameter!');
}
foo = (bar = mandatory( )) => {            // 这里如果不传入参数，就会执行manadatory函数报出错误
  return bar;
}


// 隐式返回值
function calcCircumference(diameter) {
  return Math.PI * diameter
}
// 简写为：
calcCircumference = diameter => (
  Math.PI * diameter;
)

// 惰性载入函数
function foo(){
    if(a !== b){
        console.log('aaa')
    }else{
        console.log('bbb')
    }
}

// 优化后
function foo(){
    if(a != b){
        foo = function(){
            console.log('aaa')
        }
    }else{
        foo = function(){
            console.log('bbb')
        }
    }
    return foo();
}


// 一次性函数
var sca = function() {
    console.log('msg')
    sca = function() {
        console.log('foo')
    }
}
sca()        // msg
sca()        // foo
sca()        // foo


// 代码复用----------------
// Object [key]
function validate(values) {
  if(!values.first)
    return false;
  if(!values.last)
    return false;
  return true;
}
console.log(validate({first:'Bruce',last:'Wayne'})); // true


// object validation rules
const schema = {
  first: {
    required:true
  },
  last: {
    required:true
  }
}
// universal validation function
const validate = (schema, values) => {
  for(field in schema) {
    if(schema[field].required) {
      if(!values[field]) {
        return false;
      }
    }
  }
  return true;
}
console.log(validate(schema, {first:'Bruce'})); // false
console.log(validate(schema, {first:'Bruce',last:'Wayne'})); // true



// 数字-----------
// 不同进制表示法（ES6中新增了不同进制的书写格式，在后台传参的时候要注意这一点。）
29            // 10进制
035            // 8进制29      原来的方式
0o35            // 8进制29      ES6的方式
0x1d            // 16进制29
0b11101            // 2进制29

// 精确到指定位数的小数
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
round(1.345, 2) 				// 1.35
round(1.345, 1) 				// 1.3


// 数字补0操作
const addZero1 = (num, len = 2) => (`0${num}`).slice(-len)
const addZero2 = (num, len = 2) => (`${num}`).padStart(len , '0')
addZero1(3) // 03
addZero2(32,4)  // 0032

// 数组--------------
// reduce方法同时实现map和filter
const numbers = [10, 20, 30, 40];
const doubledOver50 = numbers.reduce((finalList, num) => {
  num = num * 2;
  if (num > 50) {
    finalList.push(num);
  }
  return finalList;
}, []);
doubledOver50;            // [60, 80]

// 统计数组中相同项的个数
var cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
var carsObj = cars.reduce(function (obj, name) {
  obj[name] = obj[name] ? ++obj[name] : 1;
  return obj;
}, {});
carsObj; // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }


// 使用解构来交换参数数值
let param1 = 1;
let param2 = 2;
[param1, param2] = [param2, param1];
console.log(param1) // 2
console.log(param2) // 1

var temp = a; a = b; b = temp                
b = [a, a = b][0]                         
a = a + b; b = a - b; a = a - b


// 接收函数返回的多个结果
async function getFullPost(){
  return await Promise.all([
     fetch('/post'),
     fetch('/comments')
  ]);
}
const [post, comments] = getFullPost();

// 将数组平铺到指定深度
const flatten = (arr, depth = 1) =>
  depth != 1
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), []);
flatten([1, [2], 3, 4]);                    		 // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2);           // [1, 2, 3, [4, 5], 6, 7, 8]


// 数组的对象解构
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');

country			// US
state			// New Yourk


// 对象--------
// 使用解构删除不必要属性
let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:"secret", tooBig:{}, el2: '2', el3: '3'};

console.log(cleanObject);                         // {el1: '1', el2: '2', el3: '3'}


// 在函数参数中解构嵌套对象
var car = {
  model: 'bmw 2018',
  engine: {
    v6: true,
    turbo: true,
    vin: 12345
  }
}
const modelAndVIN = ({model, engine: {vin}}) => {
  console.log(`model: ${model} vin: ${vin}`);
}
modelAndVIN(car); // => model: bmw 2018  vin: 12345




// 取整： |
num | 0
1.3 | 0 //1

// 取半： >>
num >> 1
//=>> 例：求 50 的 1/2
50 >> 1 //25

有除号 / 干嘛不用呢？多好呀： 50/2 //25


// 成长值评级： ||
需求1：
成长值为5是1星；
成长值为10是2星；
成长值为12是3星；
成长值为15是4星；
其他都是0星。

({'5':1,'10':2,'12':3,'15':4}[val] || 0);

val 成长值。

// 判断奇偶： &
num & 1

num 整数
例：

var num=3;
if (num & 1) {
    console.log("num是奇数"); //num是奇数
} else {
    console.log("num是偶数");
}

// 交换两个数字的值： ^=
使用位运行符：

var num1 = 1, num2 = 2;
num1 ^= num2;
num2 ^= num1;
num1 ^= num2;
console.log(num1,num2); //2 1
使用数组：

var num1 = 1, num2 = 2;
num1 = [num2, num2 = num1][0];
console.log(num1,num2); //2 1

// 2的n次方： << 和 **
1 << n-1
使用位运行符：

2的n次方
例：2的3次方：1<<3 //8

使用幂运行符：

个人觉得这个不如直接使用 幂 的方式好。

x的y次方： x**y

例：2的3次方：2**3 //8

方法比较：

使用 << 的方式可以支持负数，** 需要用括号否则出错。
使用 ** 比较直观，没研究过 << 方法的任意数的任意次方的规律。

1<<3 //8
2**3 //8
-1<<3 //-8
-2**3 // 报错
-(2**3) //-8
3<<2 //12 错误
3**2 //9 正确

// 是否是指定字符串开头： ! 和 ^
!str1.indexOf("str2")
例：

var str1='abc';
var str2='a';
if(!str1.indexOf(str2)){
  console.log('是开头')
}else{
  console.log('不是开头')
}
使用正则方式

/^a/.test('abc') //a开头，true
/c$/.test('abc') //c结尾，true

// 字符串转数字： +
+str
例：

var str='123';
typeof(str) //string
typeof(+str) //number

// 转为 Boolean 值： !!
!!obj
例：

!!'text' //true



//  如果针对的是不断运行的代码，不应该使用setTimeout，而应该是用setInterval，因为setTimeout每一次都会初始化一个定时器，而setInterval只会在开始的时候初始化一个定时器
var timeoutTimes = 0;
function timeout() {
    timeoutTimes++;
    if (timeoutTimes < 10) {
        setTimeout(timeout, 10);
    }
}
timeout();
//可以替换为：
var intervalTimes = 0;
function interval() {
    intervalTimes++;
    if (intervalTimes >= 10) {
        clearInterval(interv);
    }
}
var interv = setInterval(interval, 10);


// 字符串连接 如果要连接多个字符串，应该少使用+=，如
s+=a;
s+=b;
s+=c;
应该写成s+=a + b + c；


var buf = [];
for (var i = 0; i < 100; i++) {
    buf.push(i.toString());
}
var all = buf.join("");


// 能不使用with语句的时候尽量不要使用with语句
with (a.b.c.d) {
    property1 = 1;
    property2 = 2;
}
//可以替换为：
var obj = a.b.c.d;
obj.property1 = 1;
obj.property2 = 2;


// 数字转换成字符串  般最好用"" + 1来将数字转换成字符串，虽然看起来比较丑一点，但事实上这个效率是最高的，性能上来说：
("" +) > String() > .toString() > new String()


// 浮点数转换成整型 parseInt()是用于将字符串转换成数
Math.floor()或者Math.round()


// 各种类型转换
var myVar = "3.14159",
str = "" + myVar, //  to string  
i_int = ~ ~myVar,  //  to integer  
f_float = 1 * myVar,  //  to float  
b_bool = !!myVar,  /*  to boolean - any string with length 
                        and any number except 0 are true */
array = [myVar];  //  to array


// 插入迭代器 如:
var name=values[i]; i++;
var name=values[i++] //前面两条语句可以写成


// 使用直接量
var aTest = new Array(); //替换为
var aTest = [];
var aTest = new Object; //替换为
var aTest = {};
var reg = new RegExp(); //替换为
var reg = /../;
//如果要创建具有一些特性的一般对象，也可以使用字面量，如下：
var oFruit = new O;
oFruit.color = "red";
oFruit.name = "apple";
//前面的代码可用对象字面量来改写成这样：
var oFruit = { color: "red", name: "apple" };

// 使用DocumentFragment优化多次append
for (var i = 0; i < 1000; i++) {
    var el = document.createElement('p');
    el.innerHTML = i;
    document.body.appendChild(el);
}
//可以替换为：
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
    var el = document.createElement('p');
    el.innerHTML = i;
    frag.appendChild(el);
}
document.body.appendChild(frag);


// 使用一次innerHTML赋值代替构建dom元素
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
    var el = document.createElement('p');
    el.innerHTML = i;
    frag.appendChild(el);
}
document.body.appendChild(frag);
//可以替换为：
var html = [];
for (var i = 0; i < 1000; i++) {
    html.push('<p>' + i + '</p>');
}
document.body.innerHTML = html.join('');


// 通过模板元素clone，替代createElement
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
    var el = document.createElement('p');
    el.innerHTML = i;
    frag.appendChild(el);
}
document.body.appendChild(frag);
//替换为：
var frag = document.createDocumentFragment();
var pEl = document.getElementsByTagName('p')[0];
for (var i = 0; i < 1000; i++) {
    var el = pEl.cloneNode(false);
    el.innerHTML = i;
    frag.appendChild(el);
}
document.body.appendChild(frag);


// 重复使用的调用结果，事先保存到局部变量
//避免多次取值的调用开销
var h1 = element1.clientHeight + num1;
var h4 = element1.clientHeight + num2;
//可以替换为：
var eleHeight = element1.clientHeight;
var h1 = eleHeight + num1;
var h4 = eleHeight + num2;


// 优化循环
var list = document.getElementsByTagName('p');
for (var i = 0; i < list.length; i++) {
    //……
}
//替换为：
var list = document.getElementsByTagName('p');
for (var i = 0, l = list.length; i < l; i++) {
    //……
}

// while循环的效率要优于for(;;)
// 使用后测试循环
var arr = [1, 2, 3, 4, 5, 6, 7];
var sum = 0;
for (var i = 0, l = arr.length; i < l; i++) {
    sum += arr[i];
}
//可以考虑替换为：
var arr = [1, 2, 3, 4, 5, 6, 7];
var sum = 0, l = arr.length;
while (l--) {
    sum += arr[l];
}


// 避免双重解释
var num = 0;
setTimeout('num++', 10);
//可以替换为：
var num = 0;
function addNum() {
    num++;
}
setTimeout(addNum, 10);

// 缩短否定检测
if (oTest != '#ff0000') {
    //do something
}
if (oTest != null) {
    //do something
}
if (oTest != false) {
    //do something
}
//虽然这些都正确，但用逻辑非操作符来操作也有同样的效果：
if (!oTest) {
    //do something
}


// 条件分支
if (a > b) {
    num = a;
} else {
    num = b;
}
//可以替换为：
num = a > b ? a : b;



// 置空dom对象
 function init() {
      var el = document.getElementById('MyElement');
      el.onclick = function () {
          //……
      }
  }
  init();
  //可以替换为：
  function init() {
      var el = document.getElementById('MyElement');
      el.onclick = function () {
          //……
      }
      el = null;
  }
  init();


// el置空，context中不包含对dom对象的引用，从而打断循环应用
function init() {
  var el = document.getElementById('MyElement');
  el.onclick = function () {
      //……
  }
  return el;
}
init();
//可以替换为：
function init() {
  var el = document.getElementById('MyElement');
  el.onclick = function () {
      //……
  }
  try {
      return el;
  } finally {
      el = null;
  }
}
init();



// 构造新的context
 function init() {
    var el = document.getElementById('MyElement');
    el.onclick = function () {
        //……
    }
}
init();
//可以替换为：
function elClickHandler() {
    //……
}
function init() {
    var el = document.getElementById('MyElement');
    el.onclick = elClickHandler;
}
init();



// 巧用||和&&布尔运算符
 function eventHandler(e) {
    if (!e) e = window.event;
}
//可以替换为：
function eventHandler(e) {
    e = e || window.event;
}

if (myobj) {
    doSomething(myobj);
}
//可以替换为：
myobj && doSomething(myobj);