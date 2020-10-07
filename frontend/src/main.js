import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import vueMoment from 'vue-moment'

//Register BootstrapVue in entry point
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VModal, { dynamic: true })
Vue.use(vueMoment)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')