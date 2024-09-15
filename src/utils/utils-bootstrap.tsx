import { createApp } from 'vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import App from '@/App.vue'

export function createBootstrap(props: Omix = {}) {
    const app = createApp(<App {...props} />)
    setupStore(app)
    setupRouter(app)
    return { app }
}
