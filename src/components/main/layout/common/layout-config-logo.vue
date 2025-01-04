<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutConfigLogo',
    setup(props, ctx) {
        return () => (
            <router-link to="/login" class="flex items-center gap-6 cursor-pointer">
                <n-icon size={48} color="var(--primary-color)" component={<local-nest-logo />}></n-icon>
                <n-icon size={40} color="var(--primary-color)" component={<local-nest-logo-name />}></n-icon>
            </router-link>
        )
    }
})
</script>
