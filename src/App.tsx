import {Route, Routes, useLocation} from 'react-router-dom'
import {routes, RouteBeforeEach} from '@/router'
import NavBar from './components/navbar'
import './App.scss'
import {useEffect, useState} from 'react'

function App() {
  const {pathname} = useLocation()
  const needNav = ['/', '/data', '/user'] // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false) // 是否展示 Nav

  useEffect(() => {
    console.log(pathname)
    setShowNav(needNav.includes(pathname))
  }, [pathname])

  return (
    <div className='app'>
      <div className='body'>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <RouteBeforeEach route={route}>
                    <route.component />
                  </RouteBeforeEach>
                }
              />
            )
          })}
        </Routes>
      </div>

      <div className='bottom'>
        <NavBar showNav={showNav} />
      </div>
    </div>
  )
}

export default App
