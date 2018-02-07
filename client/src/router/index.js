import Vue from 'vue'
import Router from 'vue-router'
import { ifNotAuth, ifAuth } from './router-auth'

const Home = () => import('@/components/Home.vue');
const SignUp = () => import('@/components/SignUp.vue');
const SignIn = () => import('@/components/SignIn.vue');
const Settings = () => import('@/components/settings/Settings.vue');
const PersonalInfo = () => import('@/components/settings/PersonalInfo.vue');
const Password = () => import('@/components/settings/Password.vue');

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
      component: Settings,
      beforeEnter: ifAuth,
      children: [
        {
          path: '',
          name: 'settings',
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
