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
        themes: ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula'],
    },
}
