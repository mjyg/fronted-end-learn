1.store -> container

2.currentState -> \_value

3.action -> f 变形关系

4.reducer -> map

5.middleware -> IO functor （解决异步和脏操作）

applyMiddleware.js  //中间件（IO函子）
bindActionCreators.js  //产生action
combineReducers.js //合并reducer
compose.js  //函数组合
createStore.js  //创建store
index.js
utils
