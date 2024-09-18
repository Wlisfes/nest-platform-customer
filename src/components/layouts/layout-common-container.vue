<script lang="tsx">
import { defineComponent, createVNode, PropType } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { KeepAliveComponent } from 'vue3-keep-alive-component'
import { RouteComponentOption } from '@/router'
import { useConfiger, useStore } from '@/store'

export default defineComponent({
    name: 'LayoutCommonContainer',
    props: {
        menuOptions: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props) {
        const { dataSource, currentRoute, include, fetchCloseRouter } = useStore(useConfiger)

        /**渲染菜单组件**/
        function fetchMenuRender(item: Omix<{ key: string; label: string; children: Array<Omix> }>) {
            if (item.children && item.children.length > 0) {
                return <span class="text-14">{item.label}</span>
            } else {
                return (
                    <RouterLink to={item.key}>
                        <span class="text-14">{item.label}</span>
                    </RouterLink>
                )
            }
        }

        return () => (
            <n-layout class="flex-1" has-sider content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <n-layout-sider show-trigger="bar" collapse-mode="width" bordered width={280} collapsed-width={60}>
                    <n-menu
                        accordion
                        responsive
                        root-indent={24}
                        collapsed-width={80}
                        options={props.menuOptions}
                        v-model:value={currentRoute.value}
                        render-label={fetchMenuRender}
                    ></n-menu>
                </n-layout-sider>
                <n-layout content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <n-scrollbar class="h-50" x-scrollable trigger="none">
                        <div class="whitespace-nowrap flex items-center gap-10 p-inline-10 p-bs-5">
                            {dataSource.value.map(item => (
                                <RouterLink to={item.fullPath} key={item.fullPath}>
                                    <n-button secondary type={currentRoute.value === item.fullPath ? 'primary' : undefined}>
                                        <span>{item.meta.title}</span>
                                        {item.close && (
                                            <n-icon
                                                class="m-is-5"
                                                component={<ep-close-bold />}
                                                onClick={(evt: MouseEvent) => fetchCloseRouter(item.fullPath, evt)}
                                            ></n-icon>
                                        )}
                                    </n-button>
                                </RouterLink>
                            ))}
                        </div>
                    </n-scrollbar>
                    <n-layout-content
                        class="flex-1 overflow-hidden"
                        native-scrollbar={false}
                        scrollbar-props={{ size: 100, trigger: 'none', xScrollable: true }}
                    >
                        <RouterView
                            v-slots={{
                                default: ({ Component, route }: RouteComponentOption) => {
                                    return (
                                        <KeepAliveComponent
                                            include={['LayoutRouter', ...include.value]}
                                            exclude={['LayoutRefresh']}
                                            component={Component ? createVNode(Component, { key: route.fullPath }) : Component}
                                        ></KeepAliveComponent>
                                    )
                                }
                            }}
                        ></RouterView>
                    </n-layout-content>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
