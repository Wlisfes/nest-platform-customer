import { isNotEmpty } from 'class-validator'
import dayjs from 'dayjs'

/**dayjs实例**/
export const moment = dayjs

export function prevent(evt: Event, handler?: Function) {
    evt.preventDefault()
    return handler?.(evt)
}

export async function stop(evt: Event, handler?: Function) {
    evt.preventDefault()
    evt.stopPropagation()
    if (handler && typeof handler === 'function') {
        return await handler(evt)
    }
    return evt
}

/**回车事件**/
export function enter(e: KeyboardEvent, handler?: Function) {
    if (e.key === 'Enter') {
        typeof handler === 'function' && handler()
    }
}

/**根据条件返回不同参数**/
export function fetchWhere<T>(where: boolean, value: T, defaultValue?: T): T {
    return (where ? value : defaultValue) as T
}

/**延时方法**/
export function fetchDelay(delay = 100, handler?: Function) {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            handler?.()
            resolve(undefined)
            clearTimeout(timeout)
        }, delay)
    })
}

/**条件函数执行**/
export async function fetchHandler<T>(where: boolean | Function, scope: Omix<{ handler: Function; fallback?: Function }>): Promise<T> {
    if (typeof where === 'function') {
        where = await where()
    }
    if (where) {
        return await scope.handler()
    } else {
        return (await scope.fallback?.()) ?? undefined
    }
}

/**参数组合函数**/
export async function fetchParameter<T>(data: T) {
    return data
}

/**字节转换文字输出**/
export function fetchByte(byte: number, dec: number = 2) {
    if (byte === 0) return 'Byte'
    const k = 1024
    const dm = dec < 0 ? 0 : dec
    const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(byte) / Math.log(k))
    return parseFloat((byte / Math.pow(k, i)).toFixed(dm)) + sizes[i]
}
