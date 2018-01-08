const state = {
  user: {},
  isLoggedIn: !!localStorage.getItem('token'),
  token: ''
};

const getters = {
  
};

const mutations = {
  'SIGN_UP'(state, user) {
    state.user = user;
    state.token = user.token;
    state.isLoggedIn = true;
  },
  'SIGN_IN'(state, user) {
    state.user = user;
    state.token = user.token;
    state.isLoggedIn = true;
  },
  'SIGN_OUT'(state) {
    state.user = {};
    state.token = '';
    state.isLoggedIn = false;
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}