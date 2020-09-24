var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!',
  },
});

// console.log(_);
// _([56]).map(function () {
//   console.log(Math.random());
// });
// _([]).map([]);
// _.map('京程一灯', function () {
//   console.log(123);
// });
const { throttle } = _;
const btn = document.getElementById('js-btn');
btn.addEventListener(
  'click',
  throttle(() => {
    console.log(Math.random());
  })
);
