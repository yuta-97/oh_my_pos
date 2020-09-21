import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/ManStore',
    name: 'ManStore',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManStore.vue')
  },
  {
    path: '/ManCate',
    name: 'ManCate',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManCate.vue')
  },
  {
    path: '/ManGoods',
    name: 'ManGoods',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManGoods.vue')
  },
  {
    path: '/ManOption',
    name: 'ManOption',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManOption.vue')
  },
  {
    path: '/ManDiscount',
    name: 'ManDiscount',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManDiscount.vue')
  },
  {
    path: '/ManQR',
    name: 'ManQR',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManQR.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
