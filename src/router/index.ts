import { App } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { isEmpty } from 'class-validator'
import { useManager, useStore } from '@/store'
import * as cookie from '@/utils/utils-cookie'

/**路由列表配置**/
export function fetchSetupRouter() {
    return [
        {
            path: '/manager',
            name: 'BaseManager',
            meta: { title: '工作台', AUTH: 'AUTH', menu: false },
            component: () => import('@/views/main/manager/manager.vue')
        }
    ]
}

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'BaseAuthorize',
            meta: { title: '登录', AUTH: 'AUTH_NONE' },
            component: () => import('@/views/main/login/login.vue')
        },
        {
            path: '/',
            redirect: '/manager',
            name: 'BaseLayout',
            meta: { title: '昆仑服务平台', AUTH: 'AUTH' },
            component: () => import('@/views/main/layout/layout.vue'),
            children: fetchSetupRouter()
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
    const { uid, fetchCommonBaseResolver } = useStore(useManager)
    router.beforeEach(async (to, from, next) => {
        window.$loadingBar.start()
        const token = cookie.getToken()
        if (isEmpty(token)) {
            if (to.meta.AUTH === 'AUTH_NONE') {
                return next()
            }
            return await cookie.delCompose().then(() => {
                return next({ replace: true, path: '/login' })
            })
        } else if (isEmpty(uid.value)) {
            try {
                await fetchCommonBaseResolver()
            } catch (err) {
                return await cookie.delCompose().then(() => {
                    return next({ replace: true, path: '/login' })
                })
            }
        }
        if (to.meta.AUTH === 'AUTH_NONE') {
            return next({ replace: true, path: '/' })
        } else {
            return next()
        }
    })

    router.afterEach(async (to, from) => {
        window.$loadingBar.finish()
    })
}

export default router
