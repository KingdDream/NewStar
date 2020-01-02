import Vue from 'vue'
import App from './App'
import router from './router'
import Toast from './components/toast'
//cnpm i vue-bus --save
import VueBus from 'vue-bus'
//cnpm i echarts --save
//cnpm i echarts-gl --save
import Echarts from 'echarts'
import EchartsGL from 'echarts-gl'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
// 移动端base.css
import './assets/css/base.css'


Vue.prototype.$echarts = Echarts
Vue.use(Echarts)
Vue.use(VueBus)
Vue.use(Element);
Vue.use(Toast)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
