import router from '@/router/router'
import store from '@/store/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Util from './utils/util';

NProgress.configure({ showSpinner: false }) // NProgress Configuration

let util = new Util();

const whiteList = ['/login'] // no redirect whitelist

// 给router配置导航守卫
// to: 去哪儿
// from: from 哪儿来
// next() :  next()：放行   next('/login') 去login组件
// 在登录成功以后，将 store 的 isLogin 改为 true
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (util.getCookie('isLogin')) { // 确认含有令牌
    // 含有令牌
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done()
    } else {
      next();
      NProgress.done()
    }
  } else {
    // 没有令牌
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
    NProgress.done()
  }
})
