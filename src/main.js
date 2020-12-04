import Vue from 'vue'
import vant from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'
import store from './store/index'
import 'lib-flexible/flexible'
import 'vant/lib/index.css'
import 'swiper/css/swiper.css'
// import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'
// 动态title的插件
// import VueWechatTitle from 'vue-wechat-title'

// 引入插件  做一个IE浏览器兼容性处理
import 'babel-polyfill'
// import Es6Promise from 'es6-promise'
// Es6Promise.polyfill()

Vue.use(vant)
Vue.use(ElementUI)
Vue.use(VueLazyload)
Vue.use(VueAwesomeSwiper)
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.$store = store

// 运用这个更改动态title的插件
// Vue.use(VueWechatTitle)

// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    // console.log(binding);
    document.title = el.dataset.title

    // console.log(el.dataset.title); //${title}
  }
})


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')