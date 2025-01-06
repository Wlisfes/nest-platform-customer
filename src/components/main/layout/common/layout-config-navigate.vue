<script lang="tsx">
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import { useConfiger, useStore } from '@/store'
import { NameSpace } from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayoutConfigNavigate',
    setup(props, ctx) {
        const { namespace } = useStore(useConfiger)
        const { isFullscreen, toggle } = useFullscreen()
        const { state } = useState({
            activeName: '/manager',
            menuOptions: [
                { label: '控制台', key: '/manager', namespace: NameSpace.manager },
                { label: '短信', key: '/message/describe', namespace: NameSpace.message },
                { label: '邮件', key: '/mail/describe', namespace: NameSpace.mail }
            ]
        })

        return () => (
            <div class="flex flex-1 items-center gap-12 select-none">
                <div class="flex-1">
                    <n-menu
                        mode="horizontal"
                        key-field="namespace"
                        responsive
                        options={state.menuOptions}
                        v-model:value={namespace.value}
                        render-label={(data: Omix) => (
                            <router-link to={data.key}>
                                <span class="text-16">{data.label}</span>
                            </router-link>
                        )}
                    ></n-menu>
                </div>

                <div class="flex p-6 b-rd-4 cursor-pointer bg-action hover:bg-[var(--button-color-2-hover)]" onClick={toggle}>
                    <n-icon size={20} component={<local-nest-bell />}></n-icon>
                </div>
                <div class="flex p-6 b-rd-4 cursor-pointer bg-action hover:bg-[var(--button-color-2-hover)]" onClick={toggle}>
                    <n-icon size={20} component={isFullscreen.value ? <local-nest-minimize /> : <local-nest-maximize />}></n-icon>
                </div>
                <div class="flex p-6 b-rd-4 cursor-pointer bg-action hover:bg-[var(--button-color-2-hover)]">
                    <n-icon size={20} component={<local-nest-language />}></n-icon>
                </div>
                <div class="flex p-6 b-rd-4 cursor-pointer bg-action hover:bg-[var(--button-color-2-hover)]">
                    <n-icon size={20} component={<local-nest-settings />}></n-icon>
                </div>
            </div>
        )
    }
})
</script>
