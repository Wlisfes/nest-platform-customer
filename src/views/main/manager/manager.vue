<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseManager',
    setup(props, ctx) {
        return () => <common-container class="p-inline-24 p-block-24">Manager</common-container>
    }
})
</script>
