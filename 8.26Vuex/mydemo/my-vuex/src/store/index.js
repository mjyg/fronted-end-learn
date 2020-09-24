import Vue from "vue";
import Vuex from "./my-vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    add(state) {
      return state.counter * 2;
    },
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 500);
    },
  },
  getters:{
    doubleCounter(state) {
      return state.counter*2
    }
  },
  modules: {},
});
