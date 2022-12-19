module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "./projects/**/*.ts"
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 3s linear infinite'
            },
            screens: {
                sm: {'max': '400px'}
            }
        }

    },
    variants: {
        extend: {
            opacity: ['disabled']
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require("tailwindcss-animate"),
        require("tailwindcss-debug-screens")
    ]

};
