<script lang="tsx">
import { defineComponent, createVNode } from 'vue'
import { RouterView } from 'vue-router'
import { KeepAliveComponent } from 'vue3-keep-alive-component'
import { RouteComponentOption } from '@/router'
import { useConfiger, useStore } from '@/store'

export default defineComponent({
    name: 'LayoutRouter',
    setup(props) {
        const { include } = useStore(useConfiger)

        return () => (
            <RouterView
                v-slots={{
                    default: ({ Component, route }: RouteComponentOption) => {
                        return (
                            <KeepAliveComponent
                                include={['Layout1Router', ...include.value]}
                                exclude={['LayoutRefresh']}
                                component={Component ? createVNode(Component, { key: route.fullPath }) : Component}
                            ></KeepAliveComponent>
                        )
                    }
                }}
            ></RouterView>
        )
    }
})
</script>
