import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routeNames from './routeNames'
import Home from '../views/Home/index.vue'
import NotFound from '../views/NotFound/index.vue'
import Rules from '../views/Rules/index.vue'
import SignUp from '../views/SignUp/index.vue'
import Login from '../views/Login/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routeNames.Home,
    component: Home
  },
  {
    path: '/signup',
    name: routeNames.SignUp,
    component: SignUp
  },
  {
    path: '/login',
    name: routeNames.Login,
    component: Login
  },
  {
    path: '/rules',
    name: routeNames.Rules,
    component: Rules
  },
  // Catch All Routes
  {
    path: '/not-found',
    name: routeNames.NotFound,
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: routeNames.NotFound
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
