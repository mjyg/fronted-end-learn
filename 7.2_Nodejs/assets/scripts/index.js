
var app6 = new Vue({
  el:'#app-6',
  data:{
    message:'hello vue'
  }
})
console.log('1111',_)

_.map('京城一灯', function(){
  console.log(456)
});

// _('京城一灯').map('11',function(){
//   console.log(456)
// })

const { throttle} = _
const btn = document.getElementById('js-btn')
btn.addEventListener('click', throttle(()=>{
  console.log(Math.random())
}))