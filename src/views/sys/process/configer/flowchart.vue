<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { router } from '@/router'

export default defineComponent({
    name: 'SysFlowchart',
    setup(props) {
        onMounted(() => {
            console.log(router.currentRoute.value.name, router.currentRoute.value.meta.title)
        })

        return () => (
            <div>
                <div>{router.currentRoute.value.meta.title}</div>
            </div>
        )
    }
})
</script>
