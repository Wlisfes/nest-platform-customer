import { NameSpace } from '@/interface/instance.resolver'

export const routes = [
    {
        path: '/mail/describe',
        name: 'MailDescribe',
        meta: { title: '工作台', AUTH: 'AUTH', namespace: NameSpace.mail },
        component: () => import('@/views/mail/describe/describe.vue')
    }
]
