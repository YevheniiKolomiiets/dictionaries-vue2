import Vue from 'vue';
import store from '@/store';

export default {
  setupInterceptors: () => {
    Vue.prototype.$http.interceptors.response.use(undefined, (err) => {
      return new Promise(() => {
        if (err.message === 'Request failed with status code 401' || err.response?.status === 401) {
          store.dispatch('auth/logout');
        }
        throw err;
      });
    });
  },
};
