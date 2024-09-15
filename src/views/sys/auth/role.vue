<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue'
import { router } from '@/router'

export default defineComponent({
    name: 'SysAuthRole',
    setup(props) {
        const text = ref()
        onMounted(() => {
            console.log(router.currentRoute.value.name, router.currentRoute.value.meta.title)
        })

        return () => (
            <div>
                <div>{router.currentRoute.value.meta.title}</div>
                <div>query: {router.currentRoute.value.query.id}</div>
                <n-input v-model:value={text.value}></n-input>
            </div>
        )
    }
})
</script>
