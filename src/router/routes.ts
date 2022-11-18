import {lazy} from 'react'

const Home = lazy(() => import('@/pages/home'))
const Data = lazy(() => import('@/pages/data'))
const User = lazy(() => import('@/pages/user'))
const Login = lazy(() => import('@/pages/login'))

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
      title: '统计',
      needLogin: true,
    },
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '我的',
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
