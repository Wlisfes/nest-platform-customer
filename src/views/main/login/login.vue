<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'BaseAuthorize',
    setup(props, ctx) {
        return () => <n-element class="login-element h-full p-24 flex justify-center items-center">login</n-element>
    }
})
</script>
