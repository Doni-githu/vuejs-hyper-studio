import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, AboutView, LoginView, RegisterView, UserProfileView, UsersView, AddNewPostView, DetailPostView } from '../views/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: UserProfileView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/add',
      name: 'add',
      component: AddNewPostView
    },
    {
      path: '/chat',
      name: 'chat',
      component: import('../views/Chat.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPostView
    }
  ]
})

export default router
