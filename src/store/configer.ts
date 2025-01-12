import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { NameSpace } from '@/interface/instance.resolver'
export const useConfiger = defineStore(
    'APP_STORE_CONFIGER',
    () => {
        const { state, setState } = useState({
            theme: 'light',
            primaryColor: '#536dfe',
            collapsed: false,
            width: 64,
            namespace: NameSpace.manager
        })

        async function fetchThemeUpdate(theme: 'light' | 'dark') {
            return await setState({ theme })
        }

        async function fetchNextRouter(to: Omix, from: Omix) {
            if (to.path === '/manager') {
                return await setState({ width: 0, collapsed: true })
            } else if (from.path === '/manager') {
                return await setState({ width: 64, collapsed: false })
            }
        }

        return { ...toRefs(state), setState, fetchThemeUpdate, fetchNextRouter }
    },
    { persist: true }
)
