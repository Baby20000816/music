import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Field } from 'vant'
import { NumberKeyboard } from 'vant'
import { PasswordInput } from 'vant'
Vue.use(VueAxios, axios)
Vue.use(PasswordInput)

Vue.use(NumberKeyboard)
Vue.use(Field)

Vue.use(Vant)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  let isLogin
  if (!token) {
    isLogin = false
  } else {
    isLogin = true
  }
  if (!isLogin) {
    if (to.path !== '/') {
      return next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/') {
      return next({ path: '/about' })
    }
    next()
  }
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
