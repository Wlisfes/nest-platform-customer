<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayoutSysContainer',
    setup(props) {
        const { state } = useState({
            menuOptions: [
                { label: '登录日志', key: '/sys/logs' },
                {
                    key: '/sys/process',
                    label: '流程审批管理',
                    children: [
                        {
                            label: '流程配置',
                            key: '/sys/process/configer',
                            children: [{ label: '流程图配置', key: '/sys/process/configer/flowchart' }]
                        }
                    ]
                },
                {
                    key: '/sys/auth',
                    label: '权限管理',
                    children: [
                        { label: '用户管理', key: '/sys/auth/user' },
                        { label: '角色管理', key: '/sys/auth/role' },
                        { label: '菜单管理', key: '/sys/auth/menu' }
                    ]
                }
            ]
        })

        return () => <layout-common-container menu-options={state.menuOptions}></layout-common-container>
    }
})
</script>
