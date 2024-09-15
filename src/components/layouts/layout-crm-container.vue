<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayoutCrmContainer',
    setup(props) {
        const { state } = useState({
            menuOptions: [
                { label: '应用管理', key: '/crm/application' },
                { label: '认证审核', key: '/crm/authorize' },
                {
                    label: '客户管理',
                    key: '/crm/client',
                    children: [
                        { label: '我的客户', key: '/crm/client/my-customer' },
                        { label: '公海客户', key: '/crm/client/seas-customer' },
                        { label: '客户线索', key: '/crm/client/clue-customer' }
                    ]
                }
            ]
        })

        return () => <layout-common-container menu-options={state.menuOptions}></layout-common-container>
    }
})
</script>
