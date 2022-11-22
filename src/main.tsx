import React, {Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import 'amfe-flexible'
import '@/assets/scss/index.scss'
import '@/assets/js/iconfont.js'
import {HashRouter as Router} from 'react-router-dom'
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <Suspense>
    <Router>
      <App />
    </Router>
  </Suspense>
)
