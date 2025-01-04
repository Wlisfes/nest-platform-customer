import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'

export const useConfiger = defineStore('APP_STORE_CONFIGER', () => {
    const { state, setState } = useState({
        theme: 'light',
        primaryColor: '#536dfe',
        collapsed: false
    })

    async function fetchThemeUpdate(theme: 'light' | 'dark') {
        return await setState({ theme })
    }

    return { ...toRefs(state), setState, fetchThemeUpdate }
})
