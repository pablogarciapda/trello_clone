import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import AuthView from '../views/AuthView.vue';

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/board',
    name: 'board',
    component: () =>
      import(/* webpackChunkName: "board" */ '../views/BoardView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'card/:id',
        name: 'card',
        component: () =>
          import(/* webpackChunkName: "card" */ '../views/CardView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../views/NotFoundView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = await store.dispatch('userModule/getUser');

  if (requiresAuth && !user) {
    next({ name: 'auth' });
  } else if (to.name === 'auth' && user) {
    next({ name: 'board' });
  } else {
    next();
  }
});

export default router;
