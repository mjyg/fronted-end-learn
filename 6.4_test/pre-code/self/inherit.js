function Car(price) {
  console.log('Car is execute');
  this.price = price;
}
Car.color = 'red';
Car.prototype.sale = function() {
  console.log(this.price);
};

function Cruze(price) {
  console.log('Cruze is execute');
  console.log('this', this);
  console.log('Cruze', Cruze); //注意，这里this和Cruze是不同的
  Car.call(this, price); //继承构造函数上的方法，调用Car的属性和方法
}

//继承原型上的方法
//第一种方法：子类原型直接等于父类原型
// Cruze.prototype = Car.prototype; //改变子类原型，父类原型也会跟着变
// Cruze.prototype.weight = 100;

//第二种方法：子类原型等于父类实例
Cruze.prototype = new Car(2000); //父类构造函数会执行两次

//第三种方法, 用Object.create
// Cruze.prototype = Object.create(Car.prototype);
// Cruze.prototype.constructor = Cruze;

//第四种方法

Cruze.prototype = Object.create(Car.prototype, {
  constructor: {
    value: Cruze,
    writable: false,
  },
});
var cruze = new Cruze(3000);
var car = new Car(1000);
console.log('cruze', cruze);
console.log('car', car);
