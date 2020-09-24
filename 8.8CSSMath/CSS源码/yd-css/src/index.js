// css in js
import home from './home.css';
console.log('🌈', home);
document.getElementById(
  'app'
).innerHTML = `<h1 class="${home['test']}">京程一灯</h1>`;
