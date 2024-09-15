<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <layout-provider>
                <layout-beforer>
                    <RouterView></RouterView>
                </layout-beforer>
            </layout-provider>
        )
    }
})
</script>
