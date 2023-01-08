const parser = require('node-html-parser');
const {readFileSync} = require('fs');
const glob = require('glob');

let classes = [];

const files = glob.sync("projects/datetime-picker/src/lib/**/*.html");
files.forEach(file => {
    const content = readFileSync(file);
    const root = parser.parse(content.toString());
    const elements = root.querySelectorAll('*');

    let c = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.classList.length > 0) {
            if (element.classList.value.length > 0) {
                c = [...c, ...element.classList.value];
            }
        }
    }
    classes = [...classes, ...c];
});
// console.log(classes);

module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "./projects/**/src/lib/**/*.{html,ts}"
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
    // purge: {
    //     options: {
    //         extractors: [
    //             {
    //                 extractor: content => {
    //                     console.log(content);
    //                 }
    //             }
    //         ]
    //     }
    // },
    // safelist: [...new Set(classes)]
    // safelist: [
    //     'flex',
    //     'border-2',
    //     'border-gray-200',
    //     'rounded-lg',
    //     'overflow-hidden',
    //     'w-44',
    //     'flex-col',
    //     'p-2',
    //     'border-r-2',
    //     'border-gray-100',
    //     '',
    //     'flex-1',
    //     'items-center',
    //     'justify-evenly',
    //     'gap-x-2',
    //     'text-md',
    //     'text-slate-500',
    //     'cursor-pointer',
    //     'font-semibold',
    //     'w-8',
    //     'h-8',
    //     'border',
    //     'border-gray-50',
    //     'my-3',
    //     'gap-y-2',
    //     'text-xs',
    //     'text-purple-500',
    //     'font-medium',
    //     'mb-3',
    //     'hover:font-bold',
    //     'text-blue-500',
    //     'font-bold',
    //     'hover:opacity-50',
    //     'mb-1.5',
    //     'text-sm',
    //     'bg-violet-300',
    //     'border-violet-400',
    //     'text-gray-600',
    //     'h-[490px]',
    //     'p-3',
    //     'border-b',
    //     'mb-4',
    //     'gap-x-1',
    //     'bg-slate-200',
    //     'border-gray-300',
    //     'px-2',
    //     'py-0.5',
    //     'mr-1',
    //     'hover:bg-indigo-200',
    //     'hover:border-gray-400',
    //     'transform',
    //     'active:scale-90',
    //     'disabled:active:scale-100',
    //     'transition-transform',
    //     'text-gray-400',
    //     'border-l-4',
    //     'bg-slate-50',
    //     'shadow-inner',
    //     'w-full',
    //     'inline-flex',
    //     'justify-center',
    //     'rounded-md',
    //     'border-transparent',
    //     'disabled:bg-gray-400',
    //     'py-1.5',
    //     'text-white',
    //     'shadow-md',
    //     'hover:bg-indigo-700',
    //     'focus:outline-none',
    //     'focus:ring-2',
    //     'focus:ring-indigo-500',
    //     'focus:ring-offset-2'
    // ]


};
