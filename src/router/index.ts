import { App, DefineComponent } from 'vue'
import { createRouter, createWebHistory, Router, useRoute } from 'vue-router'
import { useConfiger } from '@/store'

export type RouteOption = ReturnType<typeof useRoute>
export type RouteComponentOption = Omix<{ Component: Omix<DefineComponent>; route: RouteOption }>

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: []
})

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

/**路由守卫**/
export function setupGuardRouter(router: Router) {
    const { setAfterRouter } = useConfiger()

    router.beforeEach(async (to, from, next) => {
        window.$loadingBar.start()
        return next()
    })

    router.afterEach(async (to, from) => {
        if (to.meta.tagRouter ?? true) {
            await setAfterRouter(to)
        }
        window.$loadingBar.finish()
    })
}

export default router
