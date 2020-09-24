//手写一个call或 apply
function myCall(sourceObj, targetObj, attr, param) {
  const value = source[attr];
  if (typeof value === 'function') return targetObj[attr](param);
  return source[attr];
}

Function.prototype.call2 = function(content = window) {
  content.fn = this;
  console.log('this', this);
  let args = [...arguments].slice(1);
  let result = this(...args);
  delete content.fn;
  return result;
};
let foo = {
  value: 1,
};
function bar(name, age) {
  console.log(name);
  console.log(this.value);
}
bar.call2(foo, 'black', '18'); // black 18 1

//手写一个Function.bind
