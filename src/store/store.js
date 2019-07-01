import Vue from 'vue'
import Vuex from 'vuex'
import { Promise, reject } from 'q';
import { resolve } from 'path';

Vue.use(Vuex)

/**
 * this.$store.state // 得到 store.state
 * computed(){ ...mapState({isLogin, userId}) }
 * this.$store.dispatch('userId', 2) // 修改state中的数据
 */
export default new Vuex.Store({
  state: {
    isLogin: false,
    userId: null,
    projectId: null,
    openAside: false,
    isLoad: true,
    levelList: [{
      id: 1,
      pid: 0,
      name: '我的桌面',
      path: '/home',
      icon: 'el-icon-s-home',
      routeName: 'Home',
      hidden: false,
    }],
    tagsView: [{
      name: "home",
      path: "/home",
      affix: true
    }],
    asideMenu: [{
      id: 1,
      pid: 0,
      name: '我的桌面',
      path: '/home',
      icon: 'el-icon-s-platform',
      routeName: 'Home',
      hidden: false,
    }, {
      id: 2,
      pid: 0,
      name: '我的消息',
      path: '/message',
      icon: 'el-icon-s-comment',
      routeName: 'Message',
      hidden: false,
    }, {
      id: 3,
      pid: 0,
      name: '业务管理',
      path: '/business',
      icon: 'el-icon-s-flag',
      routeName: 'Business',
      redirect: '/business/project',
      hidden: false,
      children: [{
        id: 8,
        pid: 3,
        name: '项目管理',
        path: '/business/project',
        icon: false,
        routeName: 'BusinessProject',
        hidden: false
      }, {
        id: 9,
        pid: 3,
        name: '征地管理',
        path: '/business/land',
        icon: false,
        routeName: 'BusinessLand',
        redirect: '/business/land/survey',
        hidden: false,
        children: [{
          id: 13,
          pid: 9,
          name: '调查摸底',
          path: '/business/land/survey',
          icon: false,
          routeName: 'BusinessLandSurvey',
          hidden: false
        }, {
          id: 14,
          pid: 9,
          name: '摸底审核',
          path: '/business/land/audit',
          icon: false,
          routeName: 'BusinessLandAudit',
          hidden: false
        }, {
          id: 15,
          pid: 9,
          name: '摸底复合',
          path: '/business/land/review',
          icon: false,
          routeName: 'BusinessLandReview',
          hidden: false
        }]
      }, {
        id: 10,
        pid: 3,
        name: '拆迁管理',
        path: '/business/demolition',
        icon: false,
        routeName: 'BusinessDemolition',
        hidden: false
      }, {
        id: 11,
        pid: 3,
        name: '安置管理',
        path: '/business/place',
        icon: false,
        routeName: 'BusinessPlace',
        hidden: false
      }, {
        id: 12,
        pid: 3,
        name: '协议管理',
        path: '/business/agreement',
        icon: false,
        routeName: 'BusinessAgreement',
        hidden: false
      }]
    }, {
      id: 4,
      pid: 0,
      name: '房源管理',
      path: '/housing',
      icon: 'el-icon-s-home',
      routeName: 'Housing',
      redirect: '/housing/property',
      hidden: false,
      children: [{
        id: 16,
        pid: 4,
        name: '楼盘管理',
        path: '/housing/property',
        icon: false,
        routeName: 'BusinessProperty',
        hidden: false
      }, {
        id: 17,
        pid: 4,
        name: '户型管理',
        path: '/housing/houseType',
        icon: false,
        routeName: 'BusinessHouseType',
        hidden: false
      }, {
        id: 18,
        pid: 4,
        name: '房源管理',
        path: '/housing/resources',
        icon: false,
        routeName: 'BusinessResources',
        hidden: false
      }]
    }, {
      id: 5,
      pid: 0,
      name: '财务管理',
      path: '/finance',
      icon: 'el-icon-s-goods',
      routeName: 'Finance',
      hidden: false,
    }, {
      id: 6,
      pid: 0,
      name: '统计分析',
      path: '/statistics',
      icon: 'el-icon-s-marketing',
      routeName: 'Statistics',
      hidden: false,
    }, {
      id: 7,
      pid: 0,
      name: '系统管理',
      path: '/system',
      icon: 'el-icon-s-tools',
      routeName: 'System',
      hidden: false,
    }]
  },
  getters: {
    asyncRoute: state => {
      return state.asideMenu;
    }
  },
  mutations: {
    ['SET_IS_LOGIN'](state, value) {
      state.isLogin = value;
    },
    ['SET_USER_ID'](state, value) {
      state.userId = value;
    },
    ['SET_PROJECCT_ID'](state, value) {
      state.projectId = value;
    },
    ['SET_OPEN_ASIDE'](state, value) {
      state.openAside = value;
    },
    ['SET_IS_LOAD'](state, value) {
      state.isLoad = value;
    },
    ['SET_LEVEL_LIST'](state, value) {
      state.levelList = value;
    },
    ['SET_ASIDE_MENU'](state, value) {
      state.asideMenu = value;
    },
    ['SET_TAGS_VIEW'](state, value) {
      state.tagsView = value;
    }
  },
  actions: {
    setIsLogin({ commit }, value) {
      commit('SET_IS_LOGIN', value);
    },
    setUserId({ commit }, value) {
      commit('SET_USER_ID', value);
    },
    setProjectId({ commit }, value) {
      commit('SET_PROJECCT_ID', value);
    },
    setOpenAside({ commit }, value) {
      commit('SET_OPEN_ASIDE', value);
    },
    setIsLoad({ commit }, value) {
      return new Promise(resolve => {
        commit('SET_IS_LOAD', value);
        resolve();
      })
    },
    setLevelList({ commit }, value) {
      commit('SET_LEVEL_LIST', value);
    },
    setAsideMenu({ commit }, value) {
      commit('SET_ASIDE_MENU', value);
    },
    setTagsView({ commit }, value) {
      commit('SET_TAGS_VIEW', value);
    }
  }
})
