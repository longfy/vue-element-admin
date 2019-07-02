export default {
  namespaced: true,
  state: {
    isLogin: false,
    userId: null,
    projectId: null,
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    projectId(state) {
      return state.projectId;
    }
  },
  mutations: {
    CHANGE_STATE(state, { key, newValue }) {
      if (state.hasOwnProperty(key)) {
        state[key] = newValue;
      }
    }
  },
  actions: {
    changeUserState({ commit }, payload) {
      commit('CHANGE_STATE', payload);
    }
  }
}