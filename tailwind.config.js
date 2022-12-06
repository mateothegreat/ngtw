module.exports = {

    content: ["./src/**/*.{html,ts}", "./projects/**/*.ts"],

    theme: {

        extend: {

            animation: {

                'spin-slow': 'spin 3s linear infinite'

            }

        }

    },

    variants: {

        extend: {

            opacity: ['disabled']

        }

    },

    plugins: [

        require('@tailwindcss/forms')

    ]

};
