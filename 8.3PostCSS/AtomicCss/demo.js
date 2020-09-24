const Styletron = require('styletron')  //识别重复的原子css
const {injectStyle} = require('styletron-utils')

const styletron = new Styletron();
const redButtons = injectStyle(styletron, {
  color:'red',
  fontSize: '12px'
})

const blueButtons = injectStyle(styletron,{
  color:'blue',
  fontSize: '12px'
})

console.log(redButtons, blueButtons)
console.log(styletron)