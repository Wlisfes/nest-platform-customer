/// <reference types="vite/client" />
import { DefineComponent, VNode } from 'vue'
import { useMessage, useLoadingBar, useNotification, useDialog } from 'naive-ui'
import { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios'

declare module '*.vue' {
    const Component: DefineComponent<{}, {}, any>
    export default Component
}

declare global {
    type Refer<K = string, T = any> = Record<K, T>
    type Omix<T = Refer> = T & Refer

    interface Window {
        $message: ReturnType<typeof useMessage>
        $loadingBar: ReturnType<typeof useLoadingBar>
        $notification: ReturnType<typeof useNotification>
        $dialog: ReturnType<typeof useDialog>
    }
}
