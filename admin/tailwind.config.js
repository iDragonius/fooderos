/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.container': {
                    maxWidth: '100%',
                    padding: '0px 16px',
                    '@screen md': {
                        padding: '0px 40px',
                    },
                    '@screen xl': {
                        maxWidth: '992px',
                        padding: 0,
                    },
                },
            })
        },
    ],
}
