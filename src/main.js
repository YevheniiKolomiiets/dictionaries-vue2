import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import HttpService from '@/services/HttpService';
import router from '@/router/router';
import store from '@/store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
// import './app.scss';

import App from '@/App';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$http = axios;
Vue.use(VueAxios, axios);

const persistedVuex = localStorage.getItem('vuex');
const token = JSON.parse(persistedVuex)?.auth?.accessToken;
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

HttpService.setupInterceptors();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
