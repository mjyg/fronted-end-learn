//1
alert(a); //function a
a(); //10
var a = 3;
function a() {
  alert(10);
}
alert(a); //3
a = 6;
a(); //a is not a function

var x = 1,
  y = 0,
  z = 0;
function add(x) {
  return (x = x + 1);
}
y = add(x);
console.log(y); //undefined
function add(x) {
  return (x = x + 3);
}
z = add(x);
console.log(z); //undefined

//2
this.a = 20;
function go() {
  console.log(this.a);
  this.a = 30;
}
go.prototype.a = 40;
var test = {
  a: 50,
  init: function(fn) {
    fn();
    console.log(this.a);
    return fn;
  },
};
console.log(new go().a); //40
test.init(go); //undefined 50
var p = test.init(go);
p(); //20

var num = 1;
function yideng() {
  'use strict';
  console.log(this.num++);
}
function yideng2() {
  console.log(++this.num);
}
(function() {
  'use strict';
  yideng2(); //error
})();
yideng(); //error

function C1(name) {
  if (name) this.name = name;
}
function C2(name) {
  this.name = name;
}
function C3(name) {
  this.name = name || 'fe';
}
C1.prototype.name = 'yideng';
C2.prototype.name = 'lao';
C3.prototype.name = 'yuan';
console.log(new C1().name + new C2().name + new C3().name); //yidenglaoyuan

//3.
/*
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li> `
</ul>
*/
var list_li = document.getElementsByTagName('li');
for (var i = 0; i < list_li.length; i++) {
  list_li[i].onclick = function() {
    console.log(i); // 6,6,6,6,6,6
  };
}

//方法1:var改成let
for (let i = 0; i < list_li.length; i++) {
  list_li[i].onclick = function() {
    console.log(i);
  };
}

//方法2：使用匿名函数
for (let i = 0; i < list_li.length; i++) {
  list_li[i].onclick = (function(a) {
    console.log(a);
  })(i);
}

//4
function test(m) {
  m = { v: 5 };
}
var m = { k: 30 };
test(m);
alert(m.v); //5 函数的参数非基本数据类型是按地址传值

//5
function yideng() {
  console.log(1);
}
(function() {
  if (false) {
    function yideng() {
      console.log(2);
    }
  }
  yideng(); //2   函数声明会提到最前
})();

//6
function f(arr) {
  console.log(
    arr.map(i => (i >= 90 ? '一等生' : i >= 80 ? '二等生' : i >= '60' ? '三等生' : '差生'))
  );
}

//7
var a = 'abc';
a.split('').map(i => console.log(i));

//8
//汽车是父类，Cruze是子类，父类有颜色、价格属性，售卖的方法。子类实现父类的颜色是红色，价格是14万，
//售卖方法实现如下：将红色的Cruze卖给了小王，价格是14万

//混合式继承
function Car(color, price) {
  this.color = color;
  this.price = price;
  this.sale = function() {};
}
const Cruze = new Car('红色', 140000);
const prototype = Object.create(Car.prototype);
Cruze.__proto__ = prototype;
Cruze.sale = function() {
  console.log('将' + this.color + '的车卖给了小王，价格是' + this.price);
};

//ES6继承
class Car {
  constructor(color, price) {
    this.color = color;
    this.price = price;
    this.sale = function() {};
  }
}

class Cruze extends Car {
  constructor() {
    super('红色', 140000); //调用父类构造函数
    this.sale = function() {
      console.log('将' + this.color + '的车卖给了小王，价格是' + this.price);
    };
  }
}
const c = new Cruze();
console.log(c.sale());

//9.用async, await;Promise.all优化多层嵌套异步执行代码
let flag = true;
let flag2 = true;
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (flag) {
      resolve('success');
    } else {
      reject('fail');
    }
  }, 3000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (flag2) {
      resolve('success2');
    } else {
      reject('fail2');
    }
  }, 6000);
});
// p1.then(data => {
//   p2.then(data2 => {
//     console.log(data2);
//   }).catch(err2 => {
//     console.log(err2);
//   });
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// });
async function fn() {
  console.time('fn1');
  await Promise.all([p1, p2]);
  console.timeEnd('fn1');
}
fn();

//10
var regex = /yideng/g;
console.log(regex.test('yideng'));
console.log(regex.test('yideng'));
console.log(regex.test('yideng'));
console.log(regex.test('yideng'));

//11
var yideng = function yideng() {
  yideng = 1;
  console.log(typeof yideng);
};
yideng = 1;
console.log(typeof yideng); //1

//12
var length = 10;
function fn() {
  console.log(this.length);
}
var yideng = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  },
};
yideng.method(fn, 1); //0 10
