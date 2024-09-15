<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { router } from '@/router'

export default defineComponent({
    name: 'SysAuthUser',
    setup(props) {
        onMounted(() => {
            console.log(router.currentRoute.value.name, router.currentRoute.value.meta.title)
        })

        return () => (
            <div>
                <div>{router.currentRoute.value.meta.title}</div>
                <div>
                    <router-link to={`/sys/auth/role?id=${Math.random()}`}>角色管理</router-link>
                </div>
            </div>
        )
    }
})
</script>
