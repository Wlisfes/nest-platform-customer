declare module 'vue3-keep-alive-component' {
    import { DefineComponent } from 'vue'
    import { useRoute } from 'vue-router'
    const useActivatedRoute: typeof useRoute
    const KeepAliveComponent: DefineComponent<{}, {}, any>
    export { KeepAliveComponent, useActivatedRoute }
}
