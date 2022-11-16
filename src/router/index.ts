import Home from '@/pages/home/'
import User from '@/pages/user'
import Data from '@/pages/data'
import Login from '@/pages/login'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/data',
    component: Data,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/login',
    component: Login,
  },
]

export default routes
