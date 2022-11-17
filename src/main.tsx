import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import 'amfe-flexible'
import '@/assets/scss/index.scss'
import '@/assets/js/iconfont.js'
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
