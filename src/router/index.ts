import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: () => import('@/views/login/LoginView.vue') },
    {
      path: '/',
      component: () => import('@/layout/AdminLayout.vue'),
      redirect: '/home',
      children: [
        { path: 'home', name: 'home', component: () => import('@/views/home/HomeView.vue') },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const token = getToken()
  if (!token && to.path !== '/login') return '/login'
  if (token && to.path === '/login') return '/home'
  return true
})

export default router
