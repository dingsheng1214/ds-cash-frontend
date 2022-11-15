import Home from '@/pages/home'
import About from '@/pages/about'
import {createBrowserRouter, RouteObject} from 'react-router-dom'
const routes: RouteObject[] = [
  {
    path: '/',
    element: Home(),
  },
  {
    path: '/about',
    element: About(),
  },
]

const router = createBrowserRouter(routes)
export default router
