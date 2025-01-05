<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useManager, useConfiger, useStore } from '@/store'
import { useState } from '@/hooks/hook-state'
import { fetchDiscover } from '@/utils/utils-component'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'LayoutConfigUser',
    setup(props, ctx) {
        const { theme, fetchThemeUpdate } = useStore(useConfiger)
        const { avatar, uid, nickname, email, account, fetchCommonBaseDiscover } = useStore(useManager)
        const { state, setState } = useState({ visible: false, delay: false })

        /**异步关闭用户信息popover组件**/
        async function fetchClickoutside() {
            return await setState({ visible: false, delay: true }).then(async () => {
                await utils.fetchDelay(0)
                return await setState({ delay: false })
            })
        }

        /**异步开启用户信息popover组件**/
        async function fetchOpenCollapse(evt: MouseEvent) {
            await utils.stop(evt)
            return await utils.fetchHandler(!state.visible && !state.delay, {
                async handler() {
                    return await setState({ visible: true })
                }
            })
        }

        return () => (
            <n-popover
                placement="bottom-end"
                trigger="click"
                width={300}
                show={state.visible}
                style={{ padding: 0 }}
                onClickoutside={fetchClickoutside}
                v-slots={{
                    trigger: () => (
                        <div class="h-full flex items-center cursor-pointer" onClick={fetchOpenCollapse}>
                            <common-image
                                width={34}
                                height={34}
                                preview-disabled
                                class="b-rd-50% block overflow-hidden"
                                src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg"
                            ></common-image>
                        </div>
                    )
                }}
            >
                <n-element class="flex flex-col overflow-hidden">
                    <div class="flex items-center gap-10 p-16 select-none cursor-pointer border-b border-b-solid border-b-[var(--divider-color)]">
                        <common-image
                            width={44}
                            height={44}
                            preview-disabled
                            class="b-rd-50% block overflow-hidden"
                            src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg"
                        ></common-image>
                        <div class="flex flex-col flex-1">
                            <n-text depth={1} style={{ fontSize: '16px', lineHeight: '24px' }}>
                                <n-ellipsis tooltip={false}>{nickname.value}</n-ellipsis>
                            </n-text>
                            <n-text depth={3} style={{ lineHeight: '20px' }}>
                                <n-ellipsis tooltip={false}>{`UID：${uid.value}`}</n-ellipsis>
                            </n-text>
                        </div>
                    </div>
                    <n-list hoverable clickable show-divider={false} class="p-inline-10 p-block-10 select-none">
                        <n-list-item style={{ padding: 0 }}>
                            <div class="h-24 flex items-center gap-10 p-inline-10 p-block-10">
                                <n-icon size={24} component={<local-nest-settings />}></n-icon>
                                <n-text>账户设置</n-text>
                            </div>
                        </n-list-item>
                        <n-list-item style={{ padding: 0 }} onClick={() => fetchThemeUpdate(theme.value === 'dark' ? 'light' : 'dark')}>
                            <div class="h-24 flex items-center gap-10 p-inline-10 p-block-10">
                                {theme.value === 'dark' ? (
                                    <Fragment>
                                        <n-icon size={24} component={<local-nest-light />}></n-icon>
                                        <n-text>浅色模式</n-text>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <n-icon size={24} component={<local-nest-dark />}></n-icon>
                                        <n-text>深色模式</n-text>
                                    </Fragment>
                                )}
                            </div>
                        </n-list-item>
                    </n-list>
                    <div class="p-inline-10 p-block-10 flex flex-col p-bs-0">
                        <n-button
                            size="large"
                            focusable={false}
                            secondary
                            render-icon={() => <n-icon size={20} component={<local-nest-exit />}></n-icon>}
                            onClick={fetchCommonBaseDiscover}
                        >
                            退出登录
                        </n-button>
                    </div>
                </n-element>
            </n-popover>
        )
    }
})
</script>
