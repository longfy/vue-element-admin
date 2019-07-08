import router from '@/router/router'
import store from '@/store/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Util from './utils/util';
import { getNavMenu } from '@/api/api'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

let util = new Util();

const whiteList = ['/login']; // no redirect whitelist

const asyncWhiteList = ['/']; // 用户权限白名单

const asideMenu = [{
  id: 1,
  pid: 0,
  name: '我的桌面',
  path: '/home',
  icon: 'el-icon-s-platform',
  hidden: false,
}, {
  id: 2,
  pid: 0,
  name: '我的消息',
  path: '/message',
  icon: 'el-icon-s-comment',
  hidden: false,
}, {
  id: 3,
  pid: 0,
  name: '业务管理',
  path: '/business',
  icon: 'el-icon-s-flag',
  hidden: false,
  children: [{
    id: 6,
    pid: 3,
    name: '项目管理',
    path: '/business/project',
    icon: false,
    hidden: false
  }]
}, {
  id: 4,
  pid: 0,
  name: '统计分析',
  path: '/statistics',
  icon: 'el-icon-s-marketing',
  hidden: false,
}, {
  id: 5,
  pid: 0,
  name: '系统管理',
  path: '/system',
  icon: 'el-icon-s-tools',
  hidden: false,
}]

// 根据 token 获取用户对应的菜单
function setAsideMenu() {
  return new Promise((resolve, reject) => {
    getNavMenu().then(res => {
      store.dispatch('layout/changeLayoutState', {
        key: 'asideMenu',
        newValue: asideMenu
      });
      store.dispatch('layout/changeLayoutState', {
        key: 'tagsView',
        newValue: [asideMenu[0]]
      });
      store.dispatch('layout/changeLayoutState', {
        key: 'levelList',
        newValue: [asideMenu[0]]
      });
      asyncWhiteList.push(...getAsyncWhiteList(asideMenu));
      resolve(asyncWhiteList);
    }, err => {
      reject('get aside menu error ...');
    })
  })
}

// 根据用户权限，得到路由白名单
function getAsyncWhiteList(asideMenu) {
  let asyncWhiteList = [];
  deepFnc(asideMenu);
  function deepFnc(currArr) {
    currArr.forEach((item, index, arr) => {
      asyncWhiteList.push(item.path);
      if (item.children && item.children.length > 0) {
        deepFnc(item.children);
      }
    })
  }
  return asyncWhiteList;
}

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
      // 如果已经获取了asideMenu
      if (store.state.layout.asideMenu && store.state.layout.asideMenu.length > 0) {
        // 如果含有权限
        next();
      } else {
        setAsideMenu().then(asyncWhiteList => {
          if (asyncWhiteList.indexOf(to.path) !== -1) { // 在权限白名单，直接进入
            next();
          } else {
            next('/nopath'); // 否则全部重定向到nopath
          }
        })
      }
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
