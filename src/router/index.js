import {createRouter, createWebHistory} from 'vue-router'
import {getRoutes} from "@/router/route-list";
import home from '@/views/home.vue'

/**
 * @type {[{path: string, component: *, name: string}]}
 */
const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    }
]

routes.push(...getRoutes())

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
