<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { KeepAliveComponent } from 'vue3-keep-alive-component'
import { useState } from '@/hooks/hook-state'
import { useManager } from '@/hooks/hook-manager'
import { useConfiger, useStore } from '@/store'
import { APP_SKYLINE, RouteComponentOption, router } from '@/router'

export default defineComponent({
    name: 'LayoutContainer',
    setup(props) {
        const { activeName } = useStore(useConfiger)
        const { fetchRefreshCurrentRouter } = useManager()
        const { state } = useState({
            menuOptions: [
                { label: '工作台', key: '/manager', iframeName: APP_SKYLINE.Manager },
                { label: '销售管理', key: '/crm', iframeName: APP_SKYLINE.Crm },
                { label: '采购管理', key: '/srm', iframeName: APP_SKYLINE.Srm },
                { label: '综合设置', key: '/sys', iframeName: APP_SKYLINE.Sys }
            ]
        })

        /**渲染导航组件**/
        function fetchNavigateRender(item: Omix<{ key: string; label: string }>) {
            return (
                <RouterLink to={item.key}>
                    <span class="text-16">{item.label}</span>
                </RouterLink>
            )
        }

        return () => (
            <n-layout class="h-full" content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <n-layout-header class="h-50 p-inline-20 flex items-center" bordered>
                    <n-menu
                        mode="horizontal"
                        key-field="iframeName"
                        responsive
                        options={state.menuOptions}
                        v-model:value={activeName.value}
                        render-label={fetchNavigateRender}
                    ></n-menu>
                    <n-button onClick={() => fetchRefreshCurrentRouter({ fullPath: router.currentRoute.value.fullPath })}>刷新</n-button>
                </n-layout-header>
                <RouterView
                    v-slots={{
                        default: ({ Component, route }: RouteComponentOption) => {
                            return <KeepAliveComponent exclude={['LayoutRefresh']} component={Component}></KeepAliveComponent>
                        }
                    }}
                ></RouterView>
            </n-layout>
        )
    }
})
</script>
