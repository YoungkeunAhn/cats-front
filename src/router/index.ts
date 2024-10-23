import LoginPage from '@/views/LoginPage.vue'
import MainPage from '@/views/MainPage.vue'
import SignupPage from '@/views/SignupPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'Main',
    component: MainPage,
    meta: { requiresAuth: true }, // 로그인 필요
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
