import React, { 
  PureComponent, 
  useState, 
  // 类似于PureComponent， 函数的props做一个浅比较
  memo, 
  // 缓存函数
  useCallback,
  // 缓存值
  useMemo,
  useEffect,
  useReducer, 
  useContext,
  createContext,
  useRef
} from 'react';
import './App.css';
// 1. class component 代码量比较大，需要绑定this
// 2. function component 如果后续需要state了，非常不方便

// hooks：
// 1. function component可以定义state了
// 2. 可以模拟大部分的生命周期
// 3. 可以帮助我们让代码更简洁

// useReducer + useContext + createContext = redux

class App extends PureComponent {
  state = {
    count: 0
  }

  // shouldComponentUpdate(){}

  componentDidMount(){

  }

  UNSAFE_componentWillReceiveProps(){

  }

  componentDidUpdate(){

  }

  componentWillUnmount(){

  }

  changeCount = () => {
    let { count } = this.state 
    this.setState({
      count: ++count
    })
  }

  render() {
    let { count } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <h2>count{count}</h2>
          <button onClick={this.changeCount}>加1</button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Child  />
      </div>
    );
  }
}

// 16.0.0  16.8.0
// useState的逻辑分3部分：
// 1. 执行mountState
// 2. 执行dispatch 
// 3. 执行updateState =》 才把值更改了
const App1 = () => {
  const [count, setCount] = useState(0)
  // const [count, setCount] = useReducer((state) => state, initalState)
  const [name, setName] = useState('yideng')
  const ref = useRef(0)
  // 只有依赖变化时， 才会重新创建，否则就用之前的
  const changeCount = useCallback(() => {
    setCount(count+1);
    ref.current = 10;
  }, [count])

  // 缓存值的
  useMemo(() => {

  }, [])
  console.log('ref', ref.current)

  // 1. 依赖数组为空， componentDidMount/didUpdate
  // 就是在commitRoot阶段执行的
  useEffect(() => {
    // fetch('xxx').then(res => {
    //   setCount(res.count)
    // })
    // let timer = window.setInterval()
    // componentWillUnmount
    return () => {
      console.log('sss');
      // window.clearInterval(timer)
    }
  }, [])

  // 不写依赖是不行的
  useEffect(() => {
  }, [])

  // 依赖数组不为空，componentDidUpdate
  // setCount的function能不能解决 / ref
  // 1. ref
  // 原则上用到了哪些依赖，就要加到依赖数组，不然会导致拿到的值不正确
  useEffect(() => {
    fetch('xxx').then(res => {
      // setCount(count+1)
      setCount((count) => {
        return count+1
      })
    })
  }, [])

  // const [count1, setCount1] = useState()
  // useEffect(() => {
  //    xxx;
  //    setCount1();
  // }, [props.name])
  return (
    <div className="App" ref={ref}>
      <div className="App-header">
        <h2>count: {count}</h2>
        <h2>name: {name}</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <button onClick={changeName}>改名</button>
      <Child changeCount={changeCount} />
    </div>
  );
  
}

// memo + useCallback 
const Child  = memo(({changeCount}) => {
  console.log('Child render')
  return <div>
    <button onClick={changeCount}>增加</button>
  </div>
})

export default App1;

// 1. 为什么要用hooks？
// 2. memo + useCallback  ?? 
// 3. useEffect 包含3个生命周期
  // 3.1 容易出现死循环ref, setCount传function来解决
  // 3.2 依赖是用到了就要加，不然会出现取不到最新的值的情况
  // 3.3 useEffect不能不写依赖，每次都会重新执行一个callback

// 事件委托
// 1. 事件挂载在根组件， 的链表
// 2. 冒泡的方式，target，currentTarget 找到对应的callback
// 3. 执行对应的callback
// 执行onclick的callback前，会先执行interactiveUpdates
// onclick={() => {}}