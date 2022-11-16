import {RouterProvider} from 'react-router-dom'
import './App.css'
import router from './router'
import {ConfigProvider} from 'zarm'

function App() {
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
