import { createStore } from "vuex";

export default createStore({
  // Состояние
  state: {
    likes: 2,
    isAuth: false,
  },
  // компьютед свойства, кэшируемые вычисляемые свойства,
  // должны что-то возвращать
  getters: {
    doubleLikes(state) {
      return state.likes * 2;
    },
  },
  // изменять состояние напрмую нельзя, только через мутации
  mutations: {
    increment(state) {
      state.likes += 1;
    },
    decrement(state) {
      state.likes -= 1;
    },
    auth(state) {
      state.isAuth = !state.isAuth;
    },
  },
  // функции, которые внутри используют мутации
  actions: {},
  // изолированное состояние со своими геттерами, мутациями и тд
  modules: {},
});
