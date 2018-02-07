import Vue from 'vue'
import Vuex from 'Vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import message from './modules/message'
import progress from './modules/progress'

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['user']
  })],
  modules: {
    user,
    message,
    progress
  }
});