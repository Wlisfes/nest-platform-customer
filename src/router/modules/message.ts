import { NameSpace } from '@/interface/instance.resolver'

export const routes = [
    {
        path: '/message/describe',
        name: 'MessageDescribe',
        meta: { title: '工作台', AUTH: 'AUTH', namespace: NameSpace.message },
        component: () => import('@/views/message/describe/describe.vue')
    }
]
