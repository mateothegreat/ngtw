const parser = require('node-html-parser');
const {readFileSync} = require('fs');

const content = readFileSync('/Users/matthewdavis/workspace/ngtw/app/projects/datetime-picker/src/lib/datetime-picker.component.html');

const root = parser.parse(content.toString());

const elements = root.querySelectorAll('*');

let classes = [];

for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.classList.length > 0) {
        // console.log(element.classList);
        if (element.classList.value.length > 0) {
            console.log(element.classList.value);
            classes = [...classes, ...element.classList.value];
            // element.classList.forEach((c) => {
            //     console.log(c);
            // });
        }

        // classes = [...classes, ...element.classList];
    }
    // const classes = element.classNames;
    // console.log(classes);
}

console.log([...new Set(classes)]);
