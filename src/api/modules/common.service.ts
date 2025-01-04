import { request } from '@/utils/utils-request'

/**账号登录**/
export function httpCommonAuthorize(data: Omix) {
    return request({
        url: `/api/common/user/token/authorize`,
        method: 'POST',
        data
    })
}

/**获取账号基本信息**/
export function httpCommonBaseResolver() {
    return request({
        url: `/api/common/user/base/resolver`,
        method: 'GET'
    })
}
