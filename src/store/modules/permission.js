export default {
  namespaced: true,
  state: {
    asycnRoutes: []
  },
  getters: {
    asyncRoutes: (state, getters, rootState, rootGetters) => {
      return state.asycnRoutes;
    }
  },
  mutations: {
    ['SET_ASYNC_ROUTES'](state, value) {
      state.asycnRoutes = value;
    }
  },
  actions: {
    setAsyncRoutes({ dispatch, commit, getters, rootGetters }, value) {
      commit('SET_ASYNC_ROUTES', value);
    }
  }
}