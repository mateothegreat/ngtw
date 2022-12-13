import { Component } from '@angular/core';

import { Subject } from 'rxjs';

import { AccordionTab } from '../../projects/accordion/src/lib/accordion-tab';
import { DatetimePicker } from '../../projects/datetime-picker/src/lib/datetime-picker';
import { DatetimePickerMode } from '../../projects/datetime-picker/src/lib/datetime-picker-mode';
import { DatetimePickerTheme } from '../../projects/datetime-picker/src/lib/datetime-picker-theme';
import { AComponent } from './a/a.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public value$: Subject<number> = new Subject();

    public isDrawerOpen = false;

    public datetimePickerConfig: DatetimePicker = {
        mode: DatetimePickerMode.WEEK,
        theme: DatetimePickerTheme.DARK,
        value: new Date()
    };
    public testimonials = [
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        },
        {
            content: ' asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf asdf asd fasd fasd fasdf '
        }
    ];

    public tabs: Array<AccordionTab> = [
        {
            title: 'Example rendering a custom component!',
            component: AComponent
        },
        {
            title: 'Long paragraph..',
            content:
                'asdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdfasdf asdf asdfa sdf asd asdfa sd fa sdfa sdf a sdf a sdf asd f asd fa sdf as dfasdfasdfasdfasd f asd f asdf as dfasfd'
        },
        {
            title: 'Using custom tailwind classes!',
            titleClasses: 'text-purple-600 font-heavy',
            content: 'This uses a custom content class value as well.',
            contentClasses: 'text-green-600 text-center'
        }
    ];

    public constructor() {
        this.value$.subscribe((value) => {
            console.log(`new value: ${value}`);
        });
    }
}
