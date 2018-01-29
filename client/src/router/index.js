import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import SignUp from '@/components/SignUp.vue'
import SignIn from '@/components/SignIn.vue'
import Settings from '@/components/settings/Settings.vue'
import PersonalInfo from '@/components/settings/PersonalInfo.vue'
import Password from '@/components/settings/Password.vue'
import { ifNotAuth, ifAuth } from './router-auth'

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
      component: SignUp,
      beforeEnter: ifNotAuth
    },
    {
      path: '/login',
      name: 'login',
      component: SignIn,
      beforeEnter: ifNotAuth
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      beforeEnter: ifAuth,
      children: [
        {
          path: '',
          component: PersonalInfo
        },
        {
          path: 'password',
          component: Password
        }
      ]
    },
  ]
})
