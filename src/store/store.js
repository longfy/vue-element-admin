import Vue from 'vue'
import Vuex from 'vuex'
import { Promise, reject } from 'q';
import { resolve } from 'path';
import user from './modules/user'
import layout from './modules/layout'
import settings from './modules/settings'
import permission from './modules/permission'

Vue.use(Vuex)

/**
 * this.$store.state // 得到 store.state
 * computed(){ ...mapState('user', ['isLogin', 'userId']) }
 * methods(){ ...mapActions('user', ['changeUserState']) }
 */
export default new Vuex.Store({
  modules: {
    user, layout, settings, permission
  }
})