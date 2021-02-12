import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from '@/router/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters['auth/isLoggedIn']) {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
