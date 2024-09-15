<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { router } from '@/router'

export default defineComponent({
    name: 'CrmAuthorize',
    setup(props) {
        onMounted(() => {
            console.log(router.currentRoute.value.name, router.currentRoute.value.meta.title)
        })

        return () => <div>{router.currentRoute.value.meta.title}</div>
    }
})
</script>
