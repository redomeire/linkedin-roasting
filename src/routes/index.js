import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home/index.vue"
import Login from '../pages/auth/login.vue'
import Register from '../pages/auth/register.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/auth/login', name: 'Login', component: Login },
        { path: '/auth/register', name: 'Register', component: Register }
    ]
})

// TODO: Add middleware
router.beforeEach((to, from) => {
  console.log(to, from)
})

export default router
