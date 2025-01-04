import JsCookie from 'js-cookie'

export enum APP_COOKIE {
    APP_TOKEN = 'APP_CLIENT_TOKEN',
    APP_TOKEN_SECRET = 'APP_CLIENT_TOKEN_SECRET',
    APP_TOKEN_EXPIRES = 'APP_CLIENT_TOKEN_EXPIRES',
    APP_LANGUAGE = 'APP_CLIENT_LANGUAGE'
}

export async function setCookie(key: keyof typeof APP_COOKIE, data: any, expires: number = 0) {
    if (expires && expires > 0) {
        return JsCookie.set(key, JSON.stringify(data), {
            expires: new Date(Date.now() + expires * 1000)
        })
    }
    return JsCookie.set(key, JSON.stringify(data))
}

export function getCookie<T>(key: keyof typeof APP_COOKIE, defaultValue?: T): T {
    try {
        const jsonStr = JsCookie.get(key)
        return jsonStr ? JSON.parse(jsonStr) : (defaultValue as T)
    } catch (err) {
        return defaultValue as T
    }
}

export async function delCookie(key: keyof typeof APP_COOKIE) {
    return JsCookie.remove(key)
}

export async function setToken(token: string, expires: number) {
    return JsCookie.set(APP_COOKIE.APP_TOKEN, token, {
        expires: new Date(Date.now() + expires * 1000)
    })
}

export function getToken(defaultValue?: string) {
    return JsCookie.get(APP_COOKIE.APP_TOKEN) ?? defaultValue
}

export function delToken() {
    return JsCookie.remove(APP_COOKIE.APP_TOKEN)
}

export async function setCompose(data: Omix<{ token: string; secret: string; expires: number }>) {
    await setToken(data.token, data.expires)
    await setCookie('APP_TOKEN_SECRET', data.secret, data.expires)
    return await setCookie('APP_TOKEN_EXPIRES', data.expires, data.expires).then(() => {
        return data
    })
}

export async function delCompose() {
    await delToken()
    await delCookie('APP_TOKEN_SECRET')
    return await delCookie('APP_TOKEN_EXPIRES')
}
