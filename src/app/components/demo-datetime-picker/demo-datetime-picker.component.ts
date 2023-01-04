import { Component } from '@angular/core';
import { DatetimePicker } from '../../../../projects/datetime-picker/src/lib/datetime-picker';
import { DatetimePickerDayFormat } from '../../../../projects/datetime-picker/src/lib/datetime-picker-day-format';
import { DatetimePickerMode } from '../../../../projects/datetime-picker/src/lib/datetime-picker-mode';
import { DatetimePickerRange } from '../../../../projects/datetime-picker/src/lib/datetime-picker-range';
import { DatetimePickerTheme } from '../../../../projects/datetime-picker/src/lib/datetime-picker-theme';

@Component({
    selector: 'app-demo-datetime-picker',
    template: `
        <div class="p-10">
            <ngtw-datetime-picker [config]="config"
                                  [range]="range"
                                  (selected)="onSelection($event)"></ngtw-datetime-picker>
        </div>
    `
})
export class DemoDatetimePickerComponent {
    public config: DatetimePicker<any> = {
        mode: DatetimePickerMode.MONTH,
        theme: DatetimePickerTheme.LIGHT,
        dayFormat: DatetimePickerDayFormat.SHORT
    };
    public range: DatetimePickerRange = {
        start: {
            date: new Date('2022-07-08 00:00:00'),
            selected: new Date('2023-01-07 00:00:00')
        },
        end: {
            date: new Date('2023-01-15 00:00:00'),
            selected: new Date('2023-01-09 00:00:00')
        }
    };

    public onSelection(range: DatetimePickerRange) {
        console.log(range);
    }
}
