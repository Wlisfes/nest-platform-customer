<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <layout-config-provider global-style>
                <layout-config-component>
                    <router-view />
                </layout-config-component>
            </layout-config-provider>
        )
    }
})
</script>
