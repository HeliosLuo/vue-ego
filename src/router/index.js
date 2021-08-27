import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Login from '../views/Login'
import Goods from '../views/Goods'
import store from '../store'
Vue.use(VueRouter)
//按需加载组件
const Advert =   () =>import('../views/Advert')
const User =   () =>import('../views/User')
const Params =   () =>import('../views/Params')
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta:{
      isLogin:true
    },
    children:[
      {
        path:'/',
        name:'Goods',
        component:Goods
      },
      {
        path:'/params',
        name:'Params',
        component:Params 
      },
      {
        path:'/advert',
        name:'Advert',
        component:Advert
      },
      {
        path:'/user',
        name:'User',
        component:User
      },
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //判断是否登录
  if (to.matched.some(ele => ele.meta.isLogin)) {//需要登录
    //判断当前是否需要登录
    let token = store.state.loginModules.userinfo.token
    // console.log(token);
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {//不需要登录
    next()
  }
})
export default router
