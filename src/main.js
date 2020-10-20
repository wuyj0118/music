import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
Vue.use(Antd)


import LazyImg from '@/components/common/LazyImg.vue';
Vue.use({
  install:function(Vue) {
    Vue.component('LazyImg', LazyImg)
  }
})

router.beforeEach(({ meta: { title } }, from, next) => {
  document.title = '网抑云音乐' + (title ? ' - ' + title : '')
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
