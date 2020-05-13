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
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/sign',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  ,
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/backlogin',
    name: 'BackLogin',
    component: () => import('../views/BackLogin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
