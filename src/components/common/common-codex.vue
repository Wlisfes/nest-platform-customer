<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useState } from '@/hooks/hook-state'
import { fetchDelay } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonCodex',
    props: {
        /**是否禁用**/
        disabled: { type: Boolean },
        /**图形验证码地址**/
        baseURL: { type: String, default: '/api/common/user/system/codex' }
    },
    setup(props, { expose }) {
        const { state, setState } = useState({ initialize: true, loading: false, baseURL: '' })

        onMounted(async () => {
            await fetchRepeat()
            return await setState({ initialize: false })
        })

        async function fetchRepeat() {
            return await setState({ loading: true, baseURL: `${props.baseURL}?t=${Math.random()}` })
        }

        async function fetchState() {
            await fetchDelay(100)
            return await setState({ loading: false })
        }

        async function fetchRefresh(delay: number = 300) {
            await fetchDelay(delay)
            return await fetchRepeat()
        }

        expose({ fetchRefresh })

        return () => (
            <n-spin class="common-codex" size="small" content-class="flex flex-col" show={state.loading}>
                <n-button
                    class="p-0"
                    size="large"
                    secondary
                    disabled={state.initialize || state.loading || props.disabled}
                    onClick={fetchRepeat}
                >
                    <n-image class="flex flex-col" preview-disabled src={state.baseURL} on-load={fetchState} on-error={fetchState}>
                        {{
                            placeholder: () => (
                                <n-skeleton width={120} height={40} style={{ borderRadius: 'var(--n-border-radius)' }}></n-skeleton>
                            )
                        }}
                    </n-image>
                </n-button>
            </n-spin>
        )
    }
})
</script>
