import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { router, RouteOption, APP_SKYLINE } from '@/router'

export interface ConfigState {
    activeName: string
    currentRoute: string
    include: Array<string>
    dataSource: Array<Omix>
}

export const useConfiger = defineStore('APP_SKYLINE_STORE_CONFIGER', () => {
    const { state, setState } = useState<ConfigState>({
        activeName: APP_SKYLINE.Manager,
        currentRoute: '/manager',
        include: [],
        dataSource: [
            {
                path: '/manager',
                fullPath: '/manager',
                name: 'BaseManager',
                meta: { title: '工作台', iframeName: APP_SKYLINE.Manager },
                close: false
            }
        ]
    })

    async function fetchDelInclude(name: string) {
        return await setState({ include: state.include.filter(keyName => keyName !== name) })
    }

    async function fetchSetInclude() {
        return await setState({
            include: state.dataSource.map(item => item.name)
        })
    }

    async function fetchCloseRouter(fullPath: string, evt?: MouseEvent) {
        if (evt) {
            evt.preventDefault()
            evt.stopPropagation()
        }
        const dataSource = state.dataSource.filter(item => item.fullPath !== fullPath)
        const include = dataSource.map(item => item.name)
        return await setState({ dataSource, include }).then(async response => {
            if (fullPath === state.currentRoute) {
                const item = dataSource[dataSource.length - 1]
                await router.push({ path: item.fullPath })
            }
            return response
        })
    }

    async function setAfterRouter(data: Omix<RouteOption>) {
        if (!state.dataSource.some(item => item.fullPath === data.fullPath)) {
            await state.dataSource.push({
                path: data.path,
                name: data.name,
                fullPath: data.fullPath,
                meta: data.meta,
                close: true
            })
        }
        await fetchSetInclude()
        return await setState({
            activeName: data.meta.iframeName as string,
            currentRoute: data.fullPath
        })
    }

    return { ...toRefs(state), setState, setAfterRouter, fetchCloseRouter, fetchSetInclude, fetchDelInclude }
})
