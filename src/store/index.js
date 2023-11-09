import Vue from "vue";
import Vuex from "vuex";
import moviesStore from "./modules/movies";
import loaderStore from "./modules/loader";
import notificationStore from "./modules/notifications";

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { moviesStore, loaderStore, notificationStore },
});

export default store;
