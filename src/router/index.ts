import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index.vue'),
  },
  {
    path: '/winnow',
    name: 'winnow',
    component: () => import('@/views/Winnow.vue'),
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('@/views/Discover.vue'),
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: () => import('@/views/Playlist.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
