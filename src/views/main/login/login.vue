<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useManager, useStore } from '@/store'
import { useForm } from '@/hooks/hook-form'
import { fetchUinitialize } from '@/plugins/modules/fluctuate'
import { CommonService } from '@/api/instance.service'
import { fetchNotice } from '@/utils/utils-component'
import * as cookie from '@/utils/utils-cookie'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'BaseAuthorize',
    setup(props, ctx) {
        const router = useRouter()
        const element = ref<HTMLElement>()
        const codexRef = ref<Omix<{ fetchRefresh: Function }>>()
        const { fetchCommonBaseResolver } = useStore(useManager)
        const { formRef, form, state, setState, fetchValidater } = useForm({
            callback: async () => await fetchUinitialize(element.value),
            option: { check: false },
            form: {
                account: '',
                password: '',
                code: ''
            },
            rules: {
                account: { required: true, trigger: 'blur', message: '请输入登录账号' },
                password: { required: true, trigger: 'blur', min: 6, max: 18, message: '请输入6~18位登录密码' },
                code: { required: true, trigger: 'blur', message: '请输入验证码' }
            }
        })

        async function onSubmit() {
            return await fetchValidater().then(async errors => {
                if (!errors) {
                    return await utils.fetchDelay(500).then(async () => {
                        return await setState({ loading: false, disabled: false })
                    })
                }
                try {
                    return await CommonService.httpCommonTokenAuthorize({
                        platform: 'client',
                        code: form.value.code,
                        account: form.value.account,
                        password: window.btoa(encodeURIComponent(form.value.password))
                    }).then(async ({ data }) => {
                        return await cookie.setCompose(data).then(async () => {
                            await fetchCommonBaseResolver()
                            return router.push({ path: '/', replace: true })
                        })
                    })
                } catch (err) {
                    return await fetchNotice({ type: 'error', content: err.message }).then(async () => {
                        await codexRef.value!.fetchRefresh(300)
                        return setState({ loading: false, disabled: false })
                    })
                }
            })
        }

        return () => (
            <n-element class="nest-element relative h-full p-24 flex justify-center items-center">
                <div ref={element} class="absolute inset-0"></div>
                <n-card
                    class="w-full h-full max-w-520 max-h-520 p-24"
                    style={{ boxShadow: 'var(--box-shadow-1)' }}
                    content-class="flex flex-col justify-center"
                >
                    <n-form
                        class="w-full max-w-375 m-inline-auto select-none p-be-30"
                        size="large"
                        show-label={false}
                        ref={formRef}
                        model={form.value}
                        rules={state.rules}
                        disabled={state.loading}
                        onSubmit={utils.prevent}
                    >
                        <div class="flex items-center justify-center gap-6 p-be-30">
                            <n-icon size={68} color="var(--primary-color)" component={<local-nest-logo />}></n-icon>
                            <n-icon size={56} color="var(--primary-color)" component={<local-nest-logo-name />}></n-icon>
                        </div>
                        <n-form-item path="account">
                            <n-input
                                maxlength={32}
                                type="text"
                                placeholder="请输入登录账号"
                                v-model:value={form.value.account}
                                input-props={{ autocomplete: 'on' }}
                                onKeydown={(evt: KeyboardEvent) => utils.enter(evt, onSubmit)}
                                v-slots={{ prefix: () => <n-icon size={22} component={<local-nest-user />}></n-icon> }}
                            ></n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                maxlength={32}
                                placeholder="请输入登录密码"
                                type={state.check ? 'text' : 'password'}
                                input-props={{ autocomplete: 'password' }}
                                style={{ '--input-password-right': '46px' }}
                                v-model:value={form.value.password}
                                onKeydown={(evt: KeyboardEvent) => utils.enter(evt, onSubmit)}
                            >
                                {{
                                    prefix: () => <n-icon size={22} component={<local-nest-ockes />}></n-icon>,
                                    suffix: () => (
                                        <n-button
                                            text
                                            focusable={false}
                                            disabled={state.loading}
                                            onClick={(evt: Event) => setState({ check: !state.check })}
                                        >
                                            <n-icon
                                                color="var(--text-color-3)"
                                                size={22}
                                                component={state.check ? <local-nest-eys /> : <local-nest-eye />}
                                            ></n-icon>
                                        </n-button>
                                    )
                                }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="code">
                            <n-flex class="w-full">
                                <n-input
                                    class="flex-1"
                                    type="text"
                                    placeholder="验证码"
                                    maxlength={4}
                                    v-model:value={form.value.code}
                                    onKeydown={(evt: KeyboardEvent) => utils.enter(evt, onSubmit)}
                                    v-slots={{ prefix: () => <n-icon size={22} component={<local-nest-codex />}></n-icon> }}
                                ></n-input>
                                <common-codex ref={codexRef} disabled={state.loading}></common-codex>
                            </n-flex>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                class="w-full"
                                type="primary"
                                focusable={false}
                                disabled={state.loading}
                                loading={state.loading}
                                onClick={onSubmit}
                            >
                                立即登录
                            </n-button>
                        </n-form-item>
                        <n-flex class="w-full" justify="space-between">
                            <n-button text focusable={false}>
                                忘记密码
                            </n-button>
                            <n-button text focusable={false}>
                                注册账号
                            </n-button>
                        </n-flex>
                    </n-form>
                </n-card>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.nest-element {
    overflow: hidden;
    box-sizing: border-box;
    transition: padding 0.3s var(--cubic-bezier-ease-in-out), background-color 0.3s var(--cubic-bezier-ease-in-out);
    background-image: url('@/assets/images/nest-element-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    :deep(.n-input) {
        --n-padding-left: 0;
        --n-padding-right: 0;
        --input-password-right: 14px;
        .n-input__prefix {
            position: absolute;
            z-index: 1;
            height: 100%;
            margin: 0;
            left: 14px;
        }
        .n-input__suffix {
            position: absolute;
            z-index: 1;
            height: 100%;
            margin: 0;
            right: 14px;
        }
        .n-input__placeholder,
        .n-input__input-el {
            padding-right: var(--input-password-right);
            padding-left: 46px;
        }
    }
}
</style>
