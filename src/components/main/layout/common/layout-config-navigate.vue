<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayoutConfigNavigate',
    setup(props, ctx) {
        const { state } = useState({
            activeName: '/manager',
            menuOptions: [
                { label: '工作台', key: '/manager' },
                { label: '销售管理', key: '/crm' },
                { label: '采购管理', key: '/srm' },
                { label: '综合设置', key: '/system/basic/simple' }
            ]
        })

        return () => <div class="flex flex-1"></div>
    }
})
</script>
