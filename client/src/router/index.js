import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import SignUp from '@/components/SignUp.vue'
import SignIn from '@/components/SignIn.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: SignIn
    }
  ]
})
