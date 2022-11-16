import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ConfigProvider} from 'zarm'
import routes from '@/router'
import './App.css'

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
