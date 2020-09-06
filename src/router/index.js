import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Manager from '@/components/Manager'
import State from '@/components/State'
import Resister from '@/components/Resister'
import Option from '@/components/Option'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '영업',
      component: Main
    },
    {
      path: '/manager',
      name: '관리메뉴',
      component: Manager
    },
    {
      path: '/state',
      name: '영업메뉴',
      component: State
    },
    {
      path: '/resister',
      name: '매출현황',
      component: Resister
    },
    {
      path: '/option',
      name: '현황',
      component: Option
    }
  ]
})
