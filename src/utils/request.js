import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from "vue-router";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization ='Bearer '+store.getters.token
      // config.headers.Authorization =null
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(

  response => {
    const res = response.data
  //  if(res instanceof Blob) return res
    if (res.code == 10000) {
      Message({
        message: res.message || 'success',
        type: 'success',
        duration: 5 * 1000
      })
      return response.data
    } 
  },
   error => {
    // token超时处理
    // console.dir(error,'错误') 
   if (error.response.status === 401) {
    Message({
      message: 'token超时了',
      type: 'error'
    })
     store.dispatch('user/logout')
      router.push('/login')
      // return Promise.reject(error)
}
    return Promise.reject(error)
  }
)

export default service
