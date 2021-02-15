import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Homepage',
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
