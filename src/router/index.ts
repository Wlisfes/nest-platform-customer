import { App, DefineComponent } from 'vue'
import { createRouter, createWebHistory, Router, useRoute } from 'vue-router'
import { useConfiger } from '@/store'
import LayoutContainer from '@/components/layouts/layout-container.vue'
import LayoutRefresh from '@/components/layouts/layout-refresh.vue'
import LayoutRouter from '@/components/layouts/layout-router.vue'
import LayoutCrmContainer from '@/components/layouts/layout-crm-container.vue'
import LayoutSrmContainer from '@/components/layouts/layout-srm-container.vue'
import LayoutSysContainer from '@/components/layouts/layout-sys-container.vue'

export enum APP_SKYLINE {
    Manager = 'manager-platform',
    Crm = 'crm-platform',
    Srm = 'srm-platform',
    Sys = 'sys-platform'
}

export type RouteOption = ReturnType<typeof useRoute>
export type RouteComponentOption = Omix<{ Component: Omix<DefineComponent>; route: RouteOption }>

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/manager',
            name: LayoutContainer.name,
            meta: { title: 'Nest管理平台' },
            component: LayoutContainer,
            children: [
                {
                    path: '/manager',
                    name: 'BaseManager',
                    meta: { title: '工作台', iframeName: APP_SKYLINE.Manager },
                    component: () => import('@/views/base/manager/manager.vue')
                },
                {
                    path: '/crm',
                    redirect: '/crm/application',
                    name: LayoutCrmContainer.name,
                    meta: { title: '销售管理', iframeName: APP_SKYLINE.Crm },
                    component: LayoutCrmContainer,
                    children: [
                        {
                            path: '/crm/application',
                            name: 'CrmApplication',
                            meta: { title: '应用管理', iframeName: APP_SKYLINE.Crm },
                            component: () => import('@/views/crm/application/application.vue')
                        },
                        {
                            path: '/crm/authorize',
                            name: 'CrmAuthorize',
                            meta: { title: '认证审核', iframeName: APP_SKYLINE.Crm },
                            component: () => import('@/views/crm/authorize/authorize.vue')
                        },
                        {
                            path: '/crm/client',
                            redirect: '/crm/client/my-customer',
                            name: 'CrmClientRouter',
                            meta: { title: '客户管理', iframeName: APP_SKYLINE.Crm },
                            component: LayoutRouter,
                            children: [
                                {
                                    path: '/crm/client/my-customer',
                                    name: 'CrmMyCustomer',
                                    meta: { title: '我的客户', iframeName: APP_SKYLINE.Crm },
                                    component: () => import('@/views/crm/client/my-customer.vue')
                                },
                                {
                                    path: '/crm/client/seas-customer',
                                    name: 'CrmSeasCustomer',
                                    meta: { title: '公海客户', iframeName: APP_SKYLINE.Crm },
                                    component: () => import('@/views/crm/client/seas-customer.vue')
                                },
                                {
                                    path: '/crm/client/clue-customer',
                                    name: 'CrmClueCustomer',
                                    meta: { title: '客户线索', iframeName: APP_SKYLINE.Crm },
                                    component: () => import('@/views/crm/client/clue-customer.vue')
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/srm',
                    redirect: '/srm/channel',
                    name: LayoutSrmContainer.name,
                    meta: { title: '采购管理', iframeName: APP_SKYLINE.Srm },
                    component: LayoutSrmContainer,
                    children: [
                        {
                            path: '/srm/channel',
                            name: 'SrmChannel',
                            meta: { title: '通道管理', iframeName: APP_SKYLINE.Srm },
                            component: () => import('@/views/srm/channel/channel.vue')
                        },
                        {
                            path: '/srm/supplier',
                            redirect: '/srm/supplier/my-supplier',
                            name: 'SrmSupplierRouter',
                            meta: { title: '供应商管理', iframeName: APP_SKYLINE.Srm },
                            component: LayoutRouter,
                            children: [
                                {
                                    path: '/srm/supplier/my-supplier',
                                    name: 'SrmMySupplier',
                                    meta: { title: '我的供应商', iframeName: APP_SKYLINE.Srm },
                                    component: () => import('@/views/srm/supplier/my-supplier.vue')
                                },
                                {
                                    path: '/srm/supplier/seas-supplier',
                                    name: 'SrmSeasSupplier',
                                    meta: { title: '公海供应商', iframeName: APP_SKYLINE.Srm },
                                    component: () => import('@/views/srm/supplier/seas-supplier.vue')
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/sys',
                    redirect: '/sys/auth',
                    name: LayoutSysContainer.name,
                    meta: { title: '综合设置', iframeName: APP_SKYLINE.Sys },
                    component: LayoutSysContainer,
                    children: [
                        // {
                        //     path: '/sys/logs',
                        //     name: 'SysLogs',
                        //     meta: { title: '登录日志', iframeName: APP_SKYLINE.Sys },
                        //     component: () => import('@/views/sys/logs/logs.vue')
                        // },
                        {
                            path: '/sys/process',
                            redirect: '/sys/process/configer',
                            name: 'SysProcess',
                            meta: { title: '流程审批管理', iframeName: APP_SKYLINE.Sys },
                            component: LayoutRouter,
                            children: [
                                {
                                    path: '/sys/process/configer',
                                    redirect: '/sys/process/configer/flowchart',
                                    name: 'SysProcessConfiger',
                                    meta: { title: '流程配置', iframeName: APP_SKYLINE.Sys },
                                    component: LayoutRouter,
                                    children: [
                                        {
                                            path: '/sys/process/configer/flowchart',
                                            name: 'SysFlowchart',
                                            meta: { title: '流程图配置', iframeName: APP_SKYLINE.Sys, nextTick: true },
                                            component: () => import('@/views/sys/process/configer/flowchart.vue')
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: '/sys/auth',
                            redirect: '/sys/auth/user',
                            name: 'SysAuthRouter',
                            meta: { title: '权限管理', iframeName: APP_SKYLINE.Sys },
                            component: LayoutRouter,
                            children: [
                                {
                                    path: '/sys/auth/user',
                                    name: 'SysAuthUser',
                                    meta: { title: '用户管理', iframeName: APP_SKYLINE.Sys, nextTick: true },
                                    component: () => import('@/views/sys/auth/user.vue')
                                },
                                {
                                    path: '/sys/auth/role',
                                    name: 'SysAuthRole',
                                    meta: { title: '角色管理', iframeName: APP_SKYLINE.Sys, nextTick: true },
                                    component: () => import('@/views/sys/auth/role.vue')
                                },
                                {
                                    path: '/sys/auth/menu',
                                    name: 'SysAuthMenu',
                                    meta: { title: '菜单管理', iframeName: APP_SKYLINE.Sys },
                                    component: () => import('@/views/sys/auth/menu.vue')
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/refresh',
                    name: LayoutRefresh.name,
                    props: to => to.query,
                    meta: { tagRouter: false },
                    component: LayoutRefresh
                }
            ]
        }
    ]
})

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

/**路由守卫**/
export function setupGuardRouter(router: Router) {
    const { setAfterRouter } = useConfiger()

    router.beforeEach(async (to, from, next) => {
        window.$loadingBar.start()
        return next()
    })

    router.afterEach(async (to, from) => {
        if (to.meta.tagRouter ?? true) {
            await setAfterRouter(to)
        }
        window.$loadingBar.finish()
    })
}

export default router
