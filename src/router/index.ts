import {createRouter, createWebHistory} from 'vue-router';
import Task1 from '../pages/Task1/index.vue';
import Task2 from '../pages/Task2/index.vue';
import HomePage from '../pages/HomePage/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/task-1',
    name: 'Task1',
    component: Task1,
  },
  {
    path: '/task-2',
    name: 'Task2',
    component: Task2,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
