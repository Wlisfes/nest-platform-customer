<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonImage',
    props: {
        src: { type: String }
    },
    setup(props, ctx) {
        return () => <n-image class="common-image" src={props.src}></n-image>
    }
})
</script>

<style lang="scss" scoped>
.common-image.n-image {
    position: relative;
    :deep(img) {
        display: block;
    }
}
</style>
