import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetTagify from '@unocss/preset-tagify'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
    presets: [presetUno(), presetAttributify(), presetTagify(), presetRemToPx({ baseFontSize: 4 })],
    rules: [
        ['bg-primary', { 'background-color': 'var(--primary-color)', transition: 'background-color 0.3s var(--n-bezier)' }],
        ['bg-info', { 'background-color': 'var(--info-color)', transition: 'background-color 0.3s var(--n-bezier)' }],
        ['bg-success', { 'background-color': 'var(--success-color)', transition: 'background-color 0.3s var(--n-bezier)' }],
        ['bg-warning', { 'background-color': 'var(--warning-color)', transition: 'background-color 0.3s var(--n-bezier)' }],
        ['bg-error', { 'background-color': 'var(--error-color)', transition: 'background-color 0.3s var(--n-bezier)' }],
        ['bg-action', { 'background-color': 'var(--action-color)', transition: 'background-color 0.3s var(--n-bezier)' }],
        ['bg-transition', { transition: 'background-color 0.3s var(--n-bezier)' }],
        ['border-divider', { 'border-color': 'var(--divider-color)', transition: 'border-color 0.3s var(--n-bezier)' }]
    ]
})
