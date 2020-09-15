import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Join from '@/components/Join'
import JoinSuccess from '@/components/JoinSuccess'
import Management from '@/components/Management'
import Pos from '@/components/Pos'
import Sidebar from '@/components/Sidebar'
import Menu1 from '@/components/menu1'
import Menu2 from '@/components/menu2'
import Menu3 from '@/components/Menu3'
import Menu4 from '@/components/Menu4'
import Menu5 from '@/components/Menu5'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/join',
      name: 'Join',
      component: Join
    },
    {
      path: '/JoinSuccess',
      name: 'JoinSuccess',
      component: JoinSuccess
    },
    {
      path: '/management',
      name: 'Management',
      component: Management
    },
    {
      path: '/pos',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/sidebar',
      name: 'Sidebar',
      component: Sidebar
    },
    {
      path: '/menu1',
      name: 'Menu1',
      component: Menu1
    },
    {
      path: '/Menu2',
      name: 'Menu2',
      component: Menu2
    },
    {
      path: '/Menu3',
      name: 'Menu3',
      component: Menu3
    },
    {
      path: '/Menu4',
      name: 'Menu4',
      component: Menu4
    },
    {
      path: '/Menu5',
      name: 'Menu5',
      component: Menu5
    }
  ]
})
