import { createRouter, createWebHistory } from 'vue-router';
// import LoginView from '@/views/LoginView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/waring',
      name: 'waring',
      component: () => import('../views/WarningView.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../views/VideoView.vue')
    },
    {
      path: '/situation',
      name: 'situation',
      component: () => import('../views/SituationView.vue')
    }

  ]

})

export default router
