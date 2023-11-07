import Vue from "vue";
import Vuex from "vuex";
import moviesStore from "./modules/movies";
import loaderStore from "./loader";

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { moviesStore, loaderStore },
});
store.dispatch("initMoviesStore");

export default store;
