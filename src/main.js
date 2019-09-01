import Vue from 'vue'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './styles/global.css'
import './styles/element.css'
import App from './App.vue'
import router from './router'
import Mock from './mock'
import axios from './axios'
import DPlugin from './plugin'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(DPlugin)
// if (process.env.NODE_ENV === 'development') {
Mock.bootstrap()
// }

let app = new Vue({
    render: h => h(App),
    router: router,
    store: store
}).$mount('#app')

export default app