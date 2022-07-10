import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Login.vue'
import Main from '../components/Main'
import File from "../components/content/File";
import {
  Message
} from "element-ui";
import {get} from 'vue-cookies'
import Upload from "../components/content/Upload";
import Tag from "../components/content/Tag";
import Safe from "../components/content/Safe";
import Bin from "../components/content/Bin";
import Link from "../components/Link";
import axios from "axios";
import MyShare from "../components/content/MyShare";

Vue.use(Router)
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: "/s/:id",
      component: Link,
    },
    {
      path: "/main",
      component: Main,
      requireAuth:true,
      redirect: "/file",
      children : [
        {
          path:"/file",
          component: File,
          meta: {
            keepAlive: true
          }
        },
        {
          path:"/upload",
          component: Upload,
          meta: {
            keepAlive: true
          }
        },
        {
          path:"/tag",
          component:Tag
        },
        {
          path:"/safe",
          component: Safe
        },
        {
          path: "/bin",
          component: Bin
        },
        {
          path: "/my-share",
          component: MyShare
        }

      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  // 其他人浏览分享界面，放行
  if (to.path.startsWith("/s/")) {
  }else {
    let token = get('COOKIE-TOKEN')
    // console.log(token)
    if (!token && to.path !== '/') {
      // console.log(to.path)
      Message({
        message:'请先登录！',
        type: 'warning'
      })

      // console.log(' 未登录！')
      router.replace('/')

    } else if (token){
      // console.log('已登录')
    }
  }

  next()
})
//响应拦截器
axios.interceptors.response.use(
  response => {
    //当返回信息为未登录或者登录失效的时候重定向为登录页面

    if (response.data.code === 401) {
      Message({
        message:'登录失效，请重新登录',
        type: 'warning'
      })
      router.replace('/')
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)
export default router;
