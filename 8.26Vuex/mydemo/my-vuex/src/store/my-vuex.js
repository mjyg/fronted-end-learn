let Vue;

class Store {
  constructor(options) {
    const { getters, state, mutations, actions } = options;
    this._mutations = mutations;
    this._actions = actions;

    //对vuex的数据进行双向数据绑定
    this._vm = new Vue({
      data: {
        $$state: state,
      },
    });

    if (getters) {
      this.handleGetters();
    }

    //修正this
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  //获取Vuex的state
  get state() {
    return this._vm._data.$$state;
  }

  commit(type, payload) {
    const entry = this._mutions[type];
    if (entry) {
      entry(this.state, payload);
    }
  }

  //分发action
  dispatch(type, payload) {
    const entry = this._actions[type];
    if (entry) {
      entry(this, payload);
    }
  }

  handleGetters(getters) {
    this.getters = {};
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](this.state),
      });
    });
  }
}

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default {
  Store,
  install,
};
