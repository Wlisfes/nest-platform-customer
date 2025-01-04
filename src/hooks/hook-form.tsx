import { ref, Ref, toRefs, onMounted } from 'vue'
import { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import * as utils from '@/utils/utils-common'

export type FormState<R> = Omix & {
    initialize: boolean
    disabled: boolean
    visible: boolean
    loading: boolean
    rules: R
}
export type FormOption<T, R, U> = Partial<FormState<R>> & {
    mounted?: boolean
    option?: Omix<U>
    form: Omix<T>
    callback?: Function
}

/**自定义表单Hooks**/
export function useForm<T extends Omix, R extends FormRules, U extends Omix>(option: FormOption<T, R, U>) {
    const formRef = ref<FormInst>() as Ref<FormInst & Omix<{ $el: HTMLFormElement }>>
    const form = ref<typeof option.form>(option.form)
    const { state, setState } = useState({
        initialize: option.initialize ?? true,
        disabled: option.disabled ?? false,
        visible: option.visible ?? false,
        loading: option.loading ?? false,
        rules: option.rules ?? {},
        ...(option.option ?? {})
    } as FormState<R> & typeof option.option)

    onMounted(async () => {
        return await utils.fetchHandler(Boolean(option.mounted ?? true), {
            async handler() {
                return await setState({ visible: true } as never).then(() => {
                    return option.callback?.(state)
                })
            }
        })
    })

    async function setForm(data: Partial<T>) {
        return Object.assign(form.value as Omix<typeof option.form>, data)
    }

    /**验证表单**/
    function fetchValidater(formatter?: (e: Omix<FormItemRule>) => boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            return setState({ loading: true, disabled: true } as never).then(async () => {
                try {
                    return await formRef.value.validate(async err => {
                        return utils.fetchHandler(!err, {
                            handler: () => resolve(true)
                        })
                    }, formatter)
                } catch (err) {
                    return resolve(false)
                }
            })
        })
    }

    /**重置表单校验结果**/
    function fetchRestore() {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            return resolve(formRef.value.restoreValidation())
        })
    }

    return {
        form,
        formRef,
        state,
        ...toRefs(state),
        setState,
        setForm,
        fetchValidater,
        fetchRestore
    }
}
