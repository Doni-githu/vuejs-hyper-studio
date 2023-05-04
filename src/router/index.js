import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, LoginView, RegisterView, UserProfileView, UsersView, AddNewPostView, DetailPostView, ChatView, DeleteView, EditView, ReallyEditView } from '../views/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      component: ChatView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPostView
    },
    {
      path: '/delete/:id',
      name: 'delete',
      component: DeleteView
    },
    {
      path: '/editor/:id',
      name: 'edit',
      component: EditView
    },
  ]
})

export default router
