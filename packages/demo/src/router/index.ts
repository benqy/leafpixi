import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicView from '../views/BasicView.vue'
import MapLibreView from '@/views/MapLibreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/demo/basic',
      name: 'basic',
      component: BasicView
    },
    {
      path: '/demo/maplibre',
      name: 'maplibre',
      component: MapLibreView
    }
  ]
})

export default router
