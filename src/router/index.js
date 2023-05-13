import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, UserProfileView, UsersView, AddNewPostView, DetailPostView, ChatView, EditView, VerifyView, SingView, OnlyChatView } from '../views/'

const router = createRouter({
  history: createWebHistory(),
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
      path: '/users/:id',
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
