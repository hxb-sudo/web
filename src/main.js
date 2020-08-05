import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import VueAMap from 'vue-amap';
import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import './permission' // permission control
import './mock/index'
import './mock/les'


Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '8fa0ec3a2fa0866adb0707bfb5925661',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  uiVersion: '1.0', // ui库版本，不配置不加载,
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
