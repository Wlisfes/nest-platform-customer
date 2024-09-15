<script lang="tsx">
import { defineComponent, onBeforeMount } from 'vue'
import { router } from '@/router'

export default defineComponent({
    name: 'LayoutRefresh',
    props: {
        fullPath: { type: String, required: true }
    },
    setup(props) {
        onBeforeMount(async () => {
            if (props.fullPath) {
                return router.replace(props.fullPath)
            }
            return console.error('fullPath参数不可为空')
        })

        return () => (
            <div class="flex-1 flex-col">
                <div class="text-center p-24">
                    <n-spin size="large"></n-spin>
                </div>
            </div>
        )
    }
})
</script>
