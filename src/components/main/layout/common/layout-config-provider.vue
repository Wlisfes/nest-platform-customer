<script lang="tsx">
import { defineComponent } from 'vue'
import { dateZhCN, zhCN } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'LayoutConfigProvider',
    props: {
        globalStyle: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        const { themeStyle, themeOverrides } = useProvider()

        return () => (
            <n-config-provider
                abstract
                inline-theme-disabled
                locale={zhCN}
                date-locale={dateZhCN}
                theme={themeStyle.value}
                theme-overrides={themeOverrides.value}
            >
                {props.globalStyle && <n-global-style />}
                <n-loading-bar-provider>
                    <n-dialog-provider>
                        <n-notification-provider max={3}>
                            <n-message-provider>
                                <n-element class="w-full h-full overflow-hidden">{{ default: slots.default }}</n-element>
                            </n-message-provider>
                        </n-notification-provider>
                    </n-dialog-provider>
                </n-loading-bar-provider>
            </n-config-provider>
        )
    }
})
</script>
