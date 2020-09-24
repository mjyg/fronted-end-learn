//webpack5动态引入js

//下面这样写不行
// let output;
//
// async function main(){
//   const dynmaic = await import('./data.js')
//   output = dynmaic + '🍊'
// }

// main()
// export {output}

//第一种写法
// const dynmaic = await import('./data.js')
// export const output = dynmaic.default + '🍊'  //外部数据🍊

//第二种写法
const dynmaic = import('./data.js')
export const output = (await dynmaic).default + '🍊'//外部数据🍊



