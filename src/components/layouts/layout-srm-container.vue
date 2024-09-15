<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayoutSrmContainer',
    setup(props) {
        const { state } = useState({
            menuOptions: [
                { label: '通道管理', key: '/srm/channel' },
                {
                    key: '/srm/supplier',
                    label: '供应商管理',
                    children: [
                        { label: '我的供应商', key: '/srm/supplier/my-supplier' },
                        { label: '公海供应商', key: '/srm/supplier/seas-supplier' }
                    ]
                }
            ]
        })

        return () => <layout-common-container menu-options={state.menuOptions}></layout-common-container>
    }
})
</script>
