import { App } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'BaseAuthorize',
            meta: { title: '登录', AUTH: 'AUTH_NONE' },
            component: () => import('@/views/main/login/login.vue')
        }
    ]
})

export function setupRouter(app: App<Element>, option: Omix<{ interceptor: boolean }>) {
    app.use(router)
    if (option.interceptor) {
        setupGuardRouter(router)
    }
}

/**路由守卫**/
export function setupGuardRouter(router: Router) {
    router.beforeEach(async (to, from, next) => {
        window.$loadingBar.start()
        return next()
    })

    router.afterEach(async (to, from) => {
        window.$loadingBar.finish()
    })
}

export default router
