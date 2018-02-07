import router from '@/router/index'

const state = {
  user: {},
  isLoggedIn: false,
  token: ''
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  user: state => state.user
};

const mutations = {
  'SIGN_UP'(state, userPayload) {
    state.user = userPayload.user;
    state.token = userPayload.token;
    state.isLoggedIn = true;
  },
  'SIGN_IN'(state, userPayload) {
    state.user = userPayload.user;
    state.token = userPayload.token;
    state.isLoggedIn = true;
  },
  'SIGN_OUT'(state) {
    state.user = {};
    state.token = '';
    state.isLoggedIn = false;
  },
  'UPDATE_INFO'(state, userPayload) {
    state.user = userPayload.user;
  },
  'RESET_PASSWORD'(state, userPayload) {
    state.user = userPayload.user;
  }
};

const actions = {
  signUp({ commit }, user) {
    commit('SIGN_UP', user);
  },
  signIn({ commit }, user) {
    commit('SIGN_IN', user);
  },
  signOut({ commit }) {
    commit('SIGN_OUT');
    router.push('/login');
  },
  updateInfo({ commit }, userPayload) {
    commit('UPDATE_INFO', userPayload);
  },
  resetPassword({ commit }, userPayload) {
    commit('RESET_PASSWORD', userPayload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}