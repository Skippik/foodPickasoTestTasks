import {createRouter, createWebHistory} from 'vue-router';
import UserPage from '../pages/UsersPage/index.vue';
import HomePage from '../pages/HomePage/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/users',
    name: 'Users',
    component: UserPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
