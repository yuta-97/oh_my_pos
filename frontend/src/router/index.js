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
    path: '/ManMain',
    name: 'ManMain',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManMain.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/Pos',
    name: 'Pos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pos.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
