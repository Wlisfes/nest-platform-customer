import { App } from 'vue'
import { createPinia, defineStore, storeToRefs } from 'pinia'
export { useConfiger } from '@/store/configer'
export { useManager } from '@/store/manager'
export const store = createPinia()

/**导出解构函数**/
export function useStore<T extends ReturnType<typeof defineStore>>(useDataStore: T) {
    const data = useDataStore() as ReturnType<T>
    const refs = storeToRefs(data)
    return { ...data, ...refs }
}

export function setupStore(app: App<Element>) {
    app.use(store)
}

export default store
