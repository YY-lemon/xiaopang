import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Welcome from '@/pages/Welcome'
import Home from '@/pages/Home'
import UserList from '@/pages/user/UserList'

Vue.use(Router)


export default new Router({
  routes: [{
      name: 'Login',
      path: '/login',
      component: Login
    },

    {
      name: 'Home',
      path: '/',
      component: Home,
      children: [{
          name: 'Welcome',
          path: '/welcome',
          component: Welcome,
        },
        {
          name: 'UserList',
          path: 'user',
          component: UserList,
        }
      ]
    }

  ]
})
