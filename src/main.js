/*
 * @Author: 卓智锴
 * @Date: 2021-12-14 15:37:12
 * @LastEditTime: 2021-12-21 15:10:34
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\main.js
 * 衣带渐宽终不悔，bug寻得人憔悴
 */
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

// const electronStore = window.require('electron-store');

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
