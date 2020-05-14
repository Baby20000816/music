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
import { Swipe, SwipeItem } from 'vant'
import { Collapse, CollapseItem } from 'vant'
import { Picker } from 'vant'
import { Lazyload } from 'vant'
import { List } from 'vant'

Vue.use(List)
Vue.use(Lazyload)
Vue.use(Picker)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
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
    if (to.path !== '/' && to.path !== '/sign' && to.path !== '/backlogin') {
      return next({ path: '/backlogin' })
    } else {
      next()
    }
  } else {
    if (to.path === '/') {
      return next({ path: '/home' })
    }
    next()
  }
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
