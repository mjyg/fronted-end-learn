const Styletron = require('styletron');
const { injectStyle } = require('styletron-utils');
const styletron = new Styletron();
const redButtons = injectStyle(styletron, {
  color: 'red',
  fontSize: '14px',
});

const blueButtons = injectStyle(styletron, {
  color: 'blue',
  fontSize: '14px',
});
console.log(redButtons, blueButtons);
console.log(styletron);
