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
  },
  {
    path: '/daily',
    name: 'Daily',
    component: () => import('../views/Daily.vue')
  },
  {
    path: '/dj',
    name: 'Dj',
    component: () => import('../views/Dj.vue')
  },
  {
    path: '/dailylist',
    name: 'DailyList',
    component: () => import('../views/DailyList.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
