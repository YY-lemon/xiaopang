import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Welcome from '@/pages/Welcome'

Vue.use(Router)


export default new Router({
  routes: [{
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Welcome',
      path: '/welcome',
      component: Welcome,
    }
  ]
})
