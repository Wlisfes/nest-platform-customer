<script lang="tsx">
import { defineComponent, PropType, VNode } from 'vue'
import { isObject } from 'class-validator'

export default defineComponent({
    name: 'CommonReactTitle',
    props: {
        icon: { type: [String, Object] as PropType<'warning' | VNode> },
        content: { type: String },
        closable: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class={{ 'common-react-title flex flex-1 gap-col-10 select-none overflow-hidden': true, 'p-ie-30': props.closable }}>
                {props.icon && isObject(props.icon) ? (
                    <div class="h-26 flex items-center">{props.icon}</div>
                ) : props.icon && ['warning'].includes(props.icon) ? (
                    <div class="h-26 flex items-center">
                        {props.icon === 'warning' ? (
                            <n-icon size={26} color="var(--warning-color)" component={<local-nest-warning />}></n-icon>
                        ) : null}
                    </div>
                ) : null}
                <div class="flex flex-col flex-1 overflow-hidden">
                    {slots.default ? (
                        slots.default()
                    ) : (
                        <n-text depth={1} class="text-20 line-height-26 font-500">
                            {props.content}
                        </n-text>
                    )}
                </div>
            </n-element>
        )
    }
})
</script>
