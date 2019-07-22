import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Welcome from '@/pages/Welcome'
import Home from '@/pages/Home'
import UserList from '@/pages/user/UserList'
import Role from '@/pages/role/Role'
import Right from '@/pages/role/Right'
import Goods from '@/pages/goods/Goods'
import Params from '@/pages/goods/Params'
import Categories from '@/pages/goods/Categories'
import ToAdd from '@/pages/goods/ToAdd'
import Report from '@/pages/report/Report'
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
      redirect: {
        path: '/users'
      },
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
        },
        {
          name: 'Goods',
          path: 'goods',
          component: Goods,
        },
        {
          name: 'Params',
          path: 'params',
          component: Params,
        },
        {
          name: 'Categories',
          path: 'categories',
          component: Categories,
        },
        {
          name: 'ToAdd',
          path: 'toadd',
          component: ToAdd,
        },
        {
          name: 'Report',
          path: 'reports',
          component: Report,
        }
      ]
    }

  ]
})
