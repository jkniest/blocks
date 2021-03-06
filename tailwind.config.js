module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts.jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
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
}
