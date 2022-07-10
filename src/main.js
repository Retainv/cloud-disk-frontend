// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import axios from 'axios'
import ElementUI from 'element-ui';
import VueCookie from 'vue-cookies'
import VueContextMenu from 'vue-contextmenu'
import Contextmenu from "vue-contextmenujs"
import * as loading from './tools/loading.js'
import VueRouter from 'vue-router'
import router from './router'
import {notifyError,notifySuccess, notifyWarning} from "./tools/notify";
import * as downloadDir from './tools/downloadDir'
Vue.use(Contextmenu);

Vue.use(VueContextMenu)
Vue.use(VueCookie)
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$loading = loading
Vue.prototype.$downloadDir = downloadDir
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.prototype.$bus = new Vue()
Vue.prototype.$notifyError = notifyError
Vue.prototype.$notifySuccess = notifySuccess
Vue.prototype.$notifyWarning = notifyWarning
// Vue.use(notifyError)
// Vue.use(notifySuccess)
// Vue.use(notifyWarning)


/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
export default vm
// globalRouter.beforeEach((to, from, next) => {
//   console.log(' 未登录！')
//   const token = localStorage.getItem('COOKIE_TOKEN')
//   if (!token && to.path !== '/login') {
//     console.log(' 未登录！')
//     next({
//       path: '/login',
//       query: {redirect: to.fullPath} // 将要跳转路由的path作为参数，传递到登录页面
//     })
//   } else {
//     console.log('已登录')
//     next()
//   }
// })
