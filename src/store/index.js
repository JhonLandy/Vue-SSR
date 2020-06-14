import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function createStore() {
  const store = new Vuex.Store({
    state: {
      userInfo: {
        name: 'ycl',
        sex: 'man'
      }
    },
    mutations: {
      changeUser(state, data) {
        state.userInfo = data;
      }
    },
    actions: {
        getData({commit}) {
          return new Promise((resolved, rejected) => {
              commit('changeUser')
              resolved()
          });
        }
    }
  });
  return store;
}
