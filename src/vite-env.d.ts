/// <reference types="vite/client" />
import { DefineComponent, VNode } from 'vue'
import { useMessage, useLoadingBar, useNotification, useDialog } from 'naive-ui'
import { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios'
import { RestResolver } from '@/interface/instance.resolver'

declare module '*.vue' {
    const Component: DefineComponent<{}, {}, any>
    export default Component
}

declare global {
    type Omix<T = Record<string, any>> = T & Record<string, any>

    interface AxiosRequest extends AxiosInstance {
        <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R & RestResolver<T>>
        <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R & RestResolver<T>>
    }

    interface Window {
        $message: ReturnType<typeof useMessage>
        $loadingBar: ReturnType<typeof useLoadingBar>
        $notification: ReturnType<typeof useNotification>
        $dialog: ReturnType<typeof useDialog>
    }
}
