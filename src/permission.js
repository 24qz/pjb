import router, { MyRoutes } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/404'] // no redirect whitelist

 router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken =store.getters.token
  if (hasToken) {
    if (to.path == '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
         if (!store.getters.name) {
            let res =await store.dispatch('user/getInfo')
           let MyRoutesfilter = MyRoutes.filter(item => {
             return res.roles.menus.includes(item.name)
           })
           store.commit('user/setRoutes',MyRoutesfilter)
           router.addRoutes ([...MyRoutesfilter,{path:'*',name:'/404',hidden:true}])
          }
      next()
      
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
