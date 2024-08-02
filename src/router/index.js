import { createRouter, createWebHistory } from 'vue-router';
import home from '../views/HomeView.vue';
import waring from '../views/WarningView.vue';
import video from '../views/VideoView.vue';
import situation from '../views/SituationView.vue';
import login from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/waring',
      name: 'waring',
      component: waring
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/situation',
      name: 'situation',
      component: situation
    }

  ]

})

export default router
