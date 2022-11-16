import Home from '@/pages/home/'
import User from '@/pages/user'
import Data from '@/pages/data'

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
]

export default routes
