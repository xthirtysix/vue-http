import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';

Vue.prototype.$http = axios.create({
  baseURL: 'https://vue-http-1bc94.firebaseio.com/data.json',
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
