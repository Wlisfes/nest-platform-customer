import { toRefs, computed } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { router } from '@/router'
import { fetchDiscover } from '@/utils/utils-component'
import { CommonService } from '@/api/instance.service'
import * as cookie from '@/utils/utils-cookie'
import * as utils from '@/utils/utils-common'

/**初始化基础用户配置**/
export function initState<T>(data: Omix<Partial<T>> = {}) {
    return Object.assign(data, {
        uid: data.uid ?? '',
        account: data.account ?? '',
        email: data.email ?? '',
        nickname: data.nickname ?? '',
        avatar: data.avatar ?? '',
        status: data.status ?? 'enable',
        system: data.system ?? false
    })
}

export const useManager = defineStore('APP_STORE_MANAGER', () => {
    const { state, setState } = useState(initState())

    /**获取账号基本信息**/
    async function fetchCommonBaseResolver() {
        return await CommonService.httpCommonBaseResolver().then(async ({ data }) => {
            return await setState({
                uid: data.uid,
                account: data.account,
                email: data.email,
                nickname: data.nickname,
                avatar: data.avatar,
                status: data.status,
                system: data.system
            })
        })
    }

    /**退出登录**/
    async function fetchCommonBaseDiscover() {
        return await fetchDiscover({
            icon: 'warning',
            title: '确定要登出吗？',
            negativeText: '取消',
            positiveText: '确定登出',
            content: `登出后会中断连接、并且无法接收和发送消息。`,
            onPositiveClick: async (evt, vm, done) => {
                return await done(true).then(async () => {
                    await utils.fetchDelay(500)
                    await cookie.delCompose()
                    await setState(initState())
                    return await router.push({ replace: true, path: '/login' }).then(() => {
                        return true
                    })
                })
            }
        })
    }

    return {
        state: computed(() => state),
        ...toRefs(state),
        setState,
        fetchCommonBaseResolver,
        fetchCommonBaseDiscover
    }
})
