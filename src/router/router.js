import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/Home.vue')
    }, {
      path: 'list',
      name: 'list',
      component: () => import('@/views/template/List.vue')
    }, {
      path: 'about',
      name: 'about',
      component: () => import('@/views/about/About.vue')
    }, {
      path: '*',
      name: 'page404',
      component: () => import('@/views/404/404.vue')
    }]
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  }, {
    path: '*',
    component: () => import('@/views/404/404.vue')
  }]
})

export default router
