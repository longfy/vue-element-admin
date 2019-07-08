import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const baseRoute = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/Login.vue')
}];

const asyncRoute = [{
  path: '/',
  component: () => import('@/views/layout/Layout.vue'),
  redirect: '/home',
  children: [{
    path: 'home',
    name: 'home',
    component: () => import('@/views/home/Home.vue')
  }, {
    path: 'business/project',
    name: 'list',
    component: () => import('@/views/template/List.vue')
  }, {
    path: 'message',
    name: 'about',
    component: () => import('@/views/about/About.vue')
  }, {
    path: '/nopath',
    name: 'nopath',
    component: () => import('@/views/404/404.vue')
  }, {
    path: '*',
    name: 'page404',
    component: () => import('@/views/404/404.vue')
  }]
}];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...baseRoute, ...asyncRoute]
})

export default router
