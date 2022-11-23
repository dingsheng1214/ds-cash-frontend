import axios from 'axios'
import {Toast} from 'antd-mobile'

// 环境变量
const MODE = import.meta.env.MODE

// 默认配置
axios.defaults.baseURL =
  MODE === 'development' ? '/api' : 'http://119.3.214.158/ds-cash-prod/api'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'

const request = axios.create()

// 请求拦截
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config!.headers!['Authorization'] = `Bearer ${token}`
  }
  return config
})
// 响应拦截
request.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    Toast.show('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.status !== 0) {
    if (res.data.message) Toast.show(res.data.message)
    if (res.data.status == 10001) {
      localStorage.removeItem('token')
      // window.location.href = '/login'
    }
    return Promise.reject(res.data)
  }
  return res.data
})

export default request
