import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { AccordionTab } from '../../projects/accordion/src/lib/accordion-tab';
import { DatetimePicker } from '../../projects/datetime-picker/src/lib/datetime-picker';
import { DatetimePickerMode } from '../../projects/datetime-picker/src/lib/datetime-picker-mode';
import { DatetimePickerTheme } from '../../projects/datetime-picker/src/lib/datetime-picker-theme';
import { PopupService } from '../../projects/popup/src/lib/popup.service';
import { Step } from '../../projects/stepper/src/lib/step';
import { AComponent } from './a/a.component';
import { CustomObject } from './custom-object';
import { Icons } from './icons';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
    public icons = Icons;
    public value$: Subject<number> = new Subject();

    public formGroup = new FormGroup({
        name: new FormControl('example', [ Validators.required, Validators.minLength(3) ])
    });

    public steps: Step[] = [
        {
            title: 'Basic Information',
            subtitle: 'Optional subtitle goes here.',
            next: {
                disabled: true
            }
        },
        {
            number: '#2',
            title: 'Custom step number',
            subtitle: 'Optional subtitle goes here.'
        }
    ];

    public datetimePickerConfig: DatetimePicker<CustomObject> = {
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

    public constructor(public readonly popupService: PopupService) {
        this.value$.subscribe((value) => {
            console.log(`new value: ${ value }`);
        });
    }

    public openPopupStatic(): void {
        this.popupService.open({
            title: 'Example popup!',
            subtitle: 'This is an example popup!',
            classes: 'bg-gray-500',
            backdrop: true,
            component: AComponent

            // content: 'This is an example popup!This is an example popup!This is an example popup!This is an example popup!This is an example popup!This is an example popup!'
        });
    }

    public openPopupComponent(): void {
        this.popupService.open({
            title: 'Example popup!',
            subtitle: 'This is an example popup!',
            classes: 'bg-gray-500',
            component: AComponent,
            buttons: [
                {
                    label: 'Cancel',
                    classes: 'bg-gray-500 text-red-500',
                    action: () => {
                    }
                },
                {
                    label: 'Enable',
                    classes: 'bg-gray-500 text-red-500',
                    action: () => {
                    }
                }
            ]
        });
    }
}
