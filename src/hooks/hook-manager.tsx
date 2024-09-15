import { nextTick } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { router } from '@/router'
import { useConfiger, useStore } from '@/store'

export function useManager() {
    const { currentRoute, fetchDelInclude } = useStore(useConfiger)

    async function fetchSeekRouter(path: string) {
        const { pathname } = new URL(path, window.location.origin)
        return router.getRoutes().find(item => item.path === pathname) as Omix<RouteRecordRaw>
    }

    async function fetchRefreshRouter(name: string, data: Omix<{ fullPath: string; nextTick?: boolean }>) {
        await fetchDelInclude(name)
        if (data.nextTick) {
            console.log('nextTick:', true)
            await new Promise(resolve => setTimeout(resolve, 0))
            // await nextTick()
            return await router.push({ replace: true, path: `/refresh`, query: { fullPath: data.fullPath } })
        } else {
            console.log('nextTick:', false)
            return await router.push({ replace: true, path: `/refresh`, query: { fullPath: data.fullPath } })
        }
    }

    async function fetchRefreshCurrentRouter(data: Omix<{ name?: string; fullPath?: string; nextTick?: boolean }> = {}) {
        if (data.name) {
            return await fetchRefreshRouter(data.name, {
                fullPath: data.fullPath ?? currentRoute.value,
                nextTick: data.nextTick
            })
        } else {
            const node = await fetchSeekRouter(data.fullPath ?? currentRoute.value)
            return await fetchRefreshRouter(node.name as string, {
                fullPath: data.fullPath ?? currentRoute.value,
                nextTick: data.nextTick ?? Boolean(node.meta?.nextTick)
            })
        }
    }

    return { router, fetchRefreshRouter, fetchRefreshCurrentRouter }
}
