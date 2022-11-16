import {BrowserRouter, Route, Routes} from 'react-router-dom'
import routes from '@/router'
import NavBar from './components/navbar'
import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <div className='body'>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </div>

        <div className='bottom'>
          <NavBar />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
