<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        /**纵向排列**/
        vertical: { type: Boolean, default: true }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class={{ 'common-container flex flex-1': true, 'flex-col': props.vertical }}>
                {slots.default && slots.default()}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-container {
    position: relative;
    background-color: var(--common-body-color);
    transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier), box-shadow 0.3s var(--n-bezier),
        border-color 0.3s var(--n-bezier);
}
</style>
