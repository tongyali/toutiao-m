import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/'
  transformResponse: [function (data) {
    return JSONbig.parse(data)
  }]
})
//请求拦截器
request.interceptors.request.use(config => {
  //判断是否有token
  const {
    user
  } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, err => {
  //请求出错的处理函数
  return Promise.reject(err)
})
export default request