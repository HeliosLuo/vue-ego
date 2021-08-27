import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/base.css'
import './assets/css/ionfont.css'
import api from './api'
import i18n from './lang/vuei18n.js'
//echarts插件
import echarts from './plugins/echarts'
Vue.use(echarts)
Vue.prototype.$api=api
Vue.config.productionTip = false
//判断是否登录
let userinfo=localStorage.getItem('userinfo')
if(userinfo){
  store.commit('loginModules/setStateLogin',JSON.parse(userinfo));
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
