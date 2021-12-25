/*
 * @Author: 卓智锴
 * @Date: 2021-12-14 15:37:12
 * @LastEditTime: 2021-12-24 10:11:05
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\main.js
 * 衣带渐宽终不悔，bug寻得人憔悴
 */
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import axios from "axios";
Vue.prototype.$axios = axios

// const electronStore = window.require('electron-store');

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
