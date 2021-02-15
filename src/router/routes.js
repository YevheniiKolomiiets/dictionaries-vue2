import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    meta: {
      layout: 'BaseLayout',
    },
    component: () => import('../views/Homepage'),
    beforeEnter(to, from, next) {
      if (store.getters['auth/isLoggedIn']) {
        next('/admin');
      } else {
        next();
      }
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      requiresAuth: true,
      layout: 'BaseLayout',
    },
    component: () => import('../views/Admin'),
    beforeEnter(to, from, next) {
      if (store.getters['auth/isLoggedIn']) {
        next();
      } else {
        next('/');
      }
    },
  },
];

export default routes;
