import Home from '@/pages/home/'
import User from '@/pages/user'
import Data from '@/pages/data'
import Login from '@/pages/login'

const routes = [
  {
    path: '/',
    meta: {
      title: '账单',
      needLogin: true,
    },
    component: Home,
  },
  {
    path: '/data',
    component: Data,
    meta: {
      title: '账单',
      needLogin: true,
    },
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '账单',
      needLogin: true,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
      needLogin: false,
    },
  },
]

export default routes
