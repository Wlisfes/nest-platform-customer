import { defineConfig, ConfigEnv, UserConfig } from 'vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import path from 'path'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    return {
        build: {
            outDir: 'dist',
            assetsDir: 'static'
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        plugins: [
            Vue(),
            VueJsx(),
            AutoImport({
                resolvers: [NaiveUiResolver(), IconsResolver()]
            }),
            Components({
                dts: true,
                deep: true,
                extensions: ['vue', 'tsx'],
                include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.tsx\?tsx/],
                dirs: ['src/components'],
                resolvers: [
                    NaiveUiResolver(),
                    IconsResolver({
                        prefix: false,
                        enabledCollections: ['local', 'ep']
                    })
                ]
            }),
            Icons({
                scale: 1,
                autoInstall: true,
                compiler: 'vue3',
                customCollections: {
                    local: FileSystemIconLoader('./src/assets/icons')
                }
            }),
            UnoCSS()
        ],
        server: {
            hmr: true,
            port: 4680,
            host: '0.0.0.0'
        }
    }
})
