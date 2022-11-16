import axios from 'axios'
import {Toast} from 'antd-mobile'

// 环境变量
const MODE = import.meta.env.MODE

// 默认配置
axios.defaults.baseURL = MODE === 'development' ? '/api' : '生产环境接口地址'
axios.defaults.withCredentials = true
axios.defaults.headers['Authorization'] = `${localStorage.getItem(
  'token'
)} || null`
axios.defaults.headers.post['Content-Type'] = 'application/json'

const request = axios.create()
// 拦截器
request.interceptors.response.use((res) => {
  console.log('api', res)

  if (typeof res.data !== 'object') {
    Toast.show('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.status !== 0) {
    if (res.data.message) Toast.show(res.data.message)
    if (res.data.code == 401) {
      window.location.href = '/login'
    }
    return Promise.reject(res.data)
  }
  return res.data.data
})

export default request
