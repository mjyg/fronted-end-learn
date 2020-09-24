import React, { 
  useState, // 定义state
  useEffect, // 生命周期
  useCallback, // 对你的函数做一个缓存
  useMemo, // 对值缓存
  useRef,  // ref功能
  useContext, // context api
  useReducer, // redux把它内置了
} from 'react'
import { render, unstable_batchedUpdates as batchedUpdates } from 'react-dom';
// 为什么需要react hooks？解决了什么问题？
// function component里可以使用state，其他生命周期
// class component   容器组件，可以设置state
// 可以使用state
// function component  只能用来当做ui组件  props传递
// 不支持state，生命周期

// scheduleWork() => render()会执行/App()
// ts + react/vue  =>  小程序/flutter dart
// r2x ts来写

// 面试的时候关于hooks的坑
// 1. react什么新特性？ hooks
// 3. 在用hooks的时候遇到哪些问题？
  // 3.1 capture value。是js的闭包导致的，不是react hooks产生的问题
  // 3.2 死循环  get,断掉多重依赖
  // 3.3 怎么避免子组件无意义的渲染 
    // function没有shouldComponentUpdate方法子组件
    // React.memo + useCallback包裹传递的function
  // 3.4 同时调setName， setAge，会render两次，怎么解决这个问题
  // 3.5 怎么完全分离 didMount 和 didUpdate?
// 1. 执行App()
// setAge()
// 执行App()

function App(props){
  const [name, setName] = useState('一灯');
  const [age, setAge] = useState(20);
  const [count, setCount] = useState(1);
  const isUpdate = useRef(false)
  const ageRef = useRef(20)
  // didMount + didUpdate + willUnMount 3个生命周期的结合
  useEffect(() => {
    // 只有第一次执行App()函数的时候才会执行
    const onScroll = () => {}
    window.addEventListener('scroll', onScroll)
    // didMount
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, []);
  // useEffect(() => {
  //   // 每次重新render的时候都会执行
  //   // 不建议这么写
  // });
  // useEffect(() => {
  //   // didMount + name变化，didUpdate
  //   // 只有第一次执行App()函数的时候才会执行
  //   // age变化的时候，回调才会执行
  //   // didUpdate
  // }, [name]);

  // useEffect(() => {
  //   // 只有第一次执行App()函数的时候才会执行
  //   // age变化的时候，回调才会执行
  //   // didUpdate
  // }, [age]);

  // const a = (name) => {
  //   setName(name);
  // }

  // 就死循环
  // const changeState = useCallback((name) => {
  //   // setName(name);
  //   fetch('xxx').then((res) => {
  //     setName(res.name);
  //   })
  // }, [name])

  // useEffect(() => {
  //   changeState(name);
  // }, [name]);
  // 1. changeState调了
  // 2. setName(res.name)
  // 3. name => useEffect回调执行
  // 4. 调changeState
  const addCount = useCallback(() => {
    // 既可以传值，也可以传函数
    batchedUpdates(() => {
      setCount(4545)
      setName('ddd')
    })
 }, [])

  // componentDidUpdate
  useEffect(() =>{
    if (!isUpdate.current) {
      isUpdate.current=true;
    } else {
      // ******
    }
  }, [count])

  return (<div>
    <div>name:{name}</div>
    <div>age:{age}</div>
    <div>count:{count}</div>
    <Child name={name} addCount={addCount} />
    <button onClick={() => {
      // setAge(30);
      ageRef.current = 30;
      setTimeout(() => {
        console.log(ageRef.current)
      }, 2000)
    }}>改变age</button>
  </div>)
}

// React.PureComponent
// React.memo
const Child = React.memo(({name}) => {
  return <div>{name}</div>
})

export default App