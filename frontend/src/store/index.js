import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    store_name: '',
  },
  mutations: {
    reset (state){
      state.store_name = '';
    },
    setStorename (state, name){
      state.store_name = name;
    }
    
  },
  actions: {
  },
  modules: {
  }
})
