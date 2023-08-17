import { login, getInfo,getDepartment } from '@/api/user'
import { constantRoutes, resetRouter } from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    userdata: {},
    routes:constantRoutes
  }
}

const state = getDefaultState()
const mutations = {
  // 获取token存放到vuex， 调用封装方法本地存储token
  setToken(state,token) {
    state.token = token
    setToken(token)
    console.log(token,'token');
  },
  removeToken(state, token) {
    // 将vuex的token清除，赋值null， 调用封装方法清除本地token
    state.token = null
    removeToken()
  },
  setuserInfo(state, data) {
    // 获取用户资料存储到vuex
    state.userdata = data
    console.log(state.userdata,'资料');
  },
  
  //动态路由
  setRoutes(state,newRouter) {
    state.routes = [...constantRoutes, ...newRouter]
    console.log(state.routes,'12121212');
  }
}

const actions = {
  // 登录的异步函数，调封装的接口获取数据，赋值数据
 async login({ commit }, data) {
    let res =await login(data)
    // console.log(res,'login');
    commit('setToken',res.data)
  },
  // 获取用户资料的异步函数，调封装的接口获取数据，赋值数据
  async getInfo({ commit }, data) {
    let res = await getInfo()
    console.log(res);
    commit('setuserInfo', res.data)
    return res.data
},
// 退出登录，清空token，将用户资料也清空
 logout({ commit }) {
   commit('removeToken'),
     commit('setuserInfo', {}),
     resetRouter()
  },
 
 async getpartment({ commit}, data) {
   let res = await getDepartment()
   console.log(res.data.data);
   
  },
 
 
 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

