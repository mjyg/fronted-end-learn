export default function createStore(initState) {
  let state = initState;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
  }
  function getState() {
    return state;
  }
  function dispatch(newState) {
    state = newState;
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  return {
    subscribe,
    getState,
    dispatch,
  };
}
