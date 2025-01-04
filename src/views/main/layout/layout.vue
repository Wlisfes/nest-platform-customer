<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useConfiger, useStore } from '@/store'

export default defineComponent({
    name: 'BaseLayout',
    setup(props, ctx) {
        const { collapsed, setState } = useStore(useConfiger)

        return () => (
            <n-layout class="h-full" content-class="flex flex-col overflow-hidden">
                <n-layout-header class="h-60 p-inline-24 flex items-center gap-24" bordered>
                    <layout-config-logo></layout-config-logo>
                    <layout-config-navigate></layout-config-navigate>
                    <layout-config-user></layout-config-user>
                </n-layout-header>
                <n-layout class="flex-1" has-sider content-class="flex flex-col overflow-hidden">
                    <n-layout-sider
                        collapse-mode="width"
                        bordered
                        width={260}
                        native-scrollbar={false}
                        collapsed={collapsed.value}
                        collapsed-width={64}
                        show-trigger="bar"
                        on-update:collapsed={(value: boolean) => setState({ collapsed: value })}
                    ></n-layout-sider>
                    <n-layout content-class="flex flex-col overflow-hidden">
                        <n-layout-content
                            class="flex-1 overflow-hidden"
                            content-class="min-h-full flex flex-col"
                            native-scrollbar={false}
                            scrollbar-props={{ size: 100, trigger: 'none', xScrollable: true }}
                        >
                            <router-view></router-view>
                        </n-layout-content>
                    </n-layout>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
