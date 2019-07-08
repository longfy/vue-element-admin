export default {
  namespaced: true,
  state: {
    isLoad: true,
    openAside: false,
    levelList: [],
    tagsView: [],
    asideMenu: []
  },
  getters: {
    asideMenu(state) {
      return state.asideMenu;
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
    changeLayoutState({ commit }, payload) {
      if (payload.key == 'setIsLoad') {
        return new Promise(resolve => {
          commit('CHANGE_STATE', payload);
          resolve();
        })
      }
      commit('CHANGE_STATE', payload);
    }
  }
}