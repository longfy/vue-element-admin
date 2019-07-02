import variables from '@/styles/element-variables.scss'

export default {
  namespaced: true,
  state: {
    theme: variables.theme,
    showSettings: true,
    tagsView: true,
    fixedHeader: false,
    sidebarLogo: false
  },
  getters: {

  },
  mutations: {
    CHANGE_SETTING: (state, { key, newValue }) => {
      if (state.hasOwnProperty(key)) {
        state[key] = newValue
      }
    }
  },
  actions: {
    changeSettingState({ commit }, payload) {
      commit('CHANGE_SETTING', payload)
    }
  }
}