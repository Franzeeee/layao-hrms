import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Rooms from '@/views/Rooms.vue'
import Book from '@/views/Book.vue'

import '../assets/css/main.css'
import RoomDetails from '@/views/RoomDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'LaYao Beach Resort - Home',
      },
      component: Home,
    },
    {
      path: '/rooms',
      name: 'rooms',
      meta: {
        title: 'LaYao Beach Resort - Rooms',
      },
      component: Rooms,
    },
    {
      path: '/rooms/:id',
      name: 'room-details',
      meta: {
        title: 'LaYao Beach Resort - Room Details',
      },
      component: RoomDetails,
    },
    {
      path: '/book',
      name: 'book',
      meta: {
        title: 'LaYao Beach Resort - Book',
      },
      component: Book,
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'Layao HRMS'
  next()
})

export default router
