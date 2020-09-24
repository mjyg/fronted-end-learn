function A() {
  this.text = "hello";
}
const a = new A();
console.log(a.text); //hello

const b = new A();
b.text = "new value";
console.log(a.text, b.text); //hello new value

var book = {
  year: 2004,
};

Object.defineProperty(book, "year", {
  get: function () {
    console.log('get')
    return this.year;
  },
  set: function (newValue) {
    console.log('set')
    return newValue;
  },
});

book.year = 2005;
