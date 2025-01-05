<script lang="tsx">
import { defineComponent } from 'vue'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonReactContent',
    props: {
        showIcon: { type: Boolean, default: false },
        content: { type: String }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class="common-react-content flex flex-col overflow-hidden select-none">
                {slots.default ? (
                    slots.default()
                ) : (
                    <div class="flex flex-col" style={{ padding: utils.fetchWhere(props.showIcon, '10px 0 30px 0px', '10px 0 30px') }}>
                        <n-text depth={2} style={{ fontSize: '16px', lineHeight: '22px' }}>
                            {props.content}
                        </n-text>
                    </div>
                )}
            </n-element>
        )
    }
})
</script>
