import daisyui from 'daisyui'
import { plugin } from 'postcss'
/** @type {import('tailwindcss').Config} */

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['dark'],
    },
}
