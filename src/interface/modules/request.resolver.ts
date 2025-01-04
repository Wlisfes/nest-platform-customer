export type NoticeResolver = Omix & {
    message: string
}

export type RestResolver<T = Omix> = NoticeResolver & {
    data: T
    code: number
    timestamp: string
    method: string
    url: string
}

export type BodyColumn<T = Omix> = Omix<T> & {
    offset?: number
    limit?: number
    keyword?: string
}

export type RestColumn<T = Omix> = NoticeResolver & {
    page: number
    size: number
    total: number
    list: Array<T>
}
