const state = {
  message: {}
};

const getters = {
  message: state => state.message
};

const mutations = {
  'SHOW'(state, messagePayload) {
    const {color = 'green',
      timeout = 6000,
      visible = true,
      top = false,
      left = false,
      right = false,
      bottom = true,
      text = '',
      close = false} = messagePayload;
    state.message = {
      color,
      timeout,
      visible,
      top,
      left,
      right,
      bottom,
      text,
      close
    }
  },
  'CLOSE'(state) {
    state.message.visible = false;
  }
};

const actions = {
  showMessage({ commit }, messagePayload) {
    commit('SHOW', messagePayload)
  },
  closeMessage({ commit }) {
    commit('CLOSE');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}