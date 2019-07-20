import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Welcome from '@/pages/Welcome'
import Home from '@/pages/Home'
import UserList from '@/pages/user/UserList'
import Role from '@/pages/role/Role'
import Right from '@/pages/role/Right'
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
          path: 'users',
          component: UserList,
        },
        {
          name: 'Role',
          path: 'roles',
          component: Role,
        },
        {
          name: 'Right',
          path: 'rights',
          component: Right,
        }
      ]
    }

  ]
})
