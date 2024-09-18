<script lang="tsx">
import { defineComponent } from 'vue'
import { useNotification, useLoadingBar, useDialog, useMessage } from 'naive-ui'

export default defineComponent({
    name: 'LayoutConfigMount',
    setup(props, { slots }) {
        window.$loadingBar = useLoadingBar()
        window.$message = useMessage()
        window.$notification = useNotification()
        window.$dialog = useDialog()

        return () => slots.default?.()
    }
})
</script>
