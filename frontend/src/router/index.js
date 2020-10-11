import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Manage from '../views/Manage.vue'
import Pos from '../views/Pos.vue'
import Menu from '../views/Menu.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Manage',
        name: 'Manage',
        component: Manage
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Pos',
        name: 'Pos',
        component: Pos
    },
    // 동적 라우팅.
    {
        path: '/order/:storename/:num',
        name: 'Menu',
        component: Menu
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router