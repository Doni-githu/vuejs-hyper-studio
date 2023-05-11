import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, UserProfileView, UsersView, AddNewPostView, DetailPostView, ChatView, EditView, VerifyView, SingView, OnlyChatView } from '../views/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sing',
      name: 'sing',
      component: SingView
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
      component: ChatView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPostView
    },
    {
      path: '/users/:id/verify',
      name: 'verify',
      component: VerifyView,
    },
    {
      path: '/editor/:id',
      name: 'edit',
      component: EditView
    },
    {
      path: '/only-chat',
      name: 'only-chat',
      component: OnlyChatView
    }
  ]
})

export default router
