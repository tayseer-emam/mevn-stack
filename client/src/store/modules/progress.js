const state = {
  progress: false
};

const getters = {
  progress: state => state.progress
};

const mutations = {
  'START_PROGRESS'(state) {
    state.progress = true;
  },
  'STOP_PROGRESS'(state) {
    state.progress = false;
  }
};

const actions = {
  startProgress({ commit }) {
    commit('START_PROGRESS');
  },
  stopProgress({ commit }) {
    setTimeout(() => {
      commit('STOP_PROGRESS');
    }, 1000);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}