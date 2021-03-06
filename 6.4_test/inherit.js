//继承

//ES6的继承:可以继承静态属性
// class Car {
//   static color = 1;
//   constructor(price){
//     this.price = price
//   }
//   test(){
//     console.log(this.price)
//   }
// }
//
// class Cruze extends Car {
//   constructor(price){
//     super(price)
//   }
// }
//
// console.log(Cruze.color)  //1 继承静态属性
//
// const cruze = new Cruze(3000)
// console.log(cruze)
// cruze.test();  //3000


//ES5继承
'use strict'
function Car(price){
  this.price = price
}

//静态属性
Car.color = 'red'
// console.log(new Car(3000)) //{price:3000}


//原型上的方法
Car.prototype.test = function(){
  console.log(this.price)
}

function Cruze(price){
  Car.call(this, price)  //严格模式要加this，否则传window
}

var staticKeys = Object.entries(Car)
console.log(staticKeys) //[["color", "red"]] //取到静态属性

for(var i =0; i < staticKeys.length;i++){
  var key = staticKeys[i][0]
  var value = staticKeys[i][1]
  Cruze[key] = value
}


console.log(Cruze.color)  //red 继承静态属性

//继承原型链
// Cruze.prototype = Car.prototype  //错误，子类会污染父类
// Cruze.prototype = new Car()  //错误，父类构造函数会执行两遍

//正确，但不值钱的写法，烂大街的写法
Cruze.prototype = Object.create(Car.prototype)
Cruze.prototype.constructor = Cruze  //修正constructor

// Cruze.prototype = Object.create(Car.prototype, {  //直接修正contructor
//   constructor:{
//     value:Cruze,
//     writable: false,  //不让别人修正
//   },
//   test:{  //继承原型链上的test
//     value: function(){
//       console.log(this.price)
//     }
//   }
// })

// Cruze.prototype.constructor = {} // 严格模式下报错 cannot assign to read only property 'constructor' of object '#<Cruze>'

var cruze = new Cruze(3000)
console.log(cruze)
cruze.test()


