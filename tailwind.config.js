/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts.jsx,tsx}'],
    theme: {
        extend: {},
        fontFamily: {
            main: ['Poppins', 'sans-serif'],
            code: ['JetBrains Mono', 'monospace']
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
