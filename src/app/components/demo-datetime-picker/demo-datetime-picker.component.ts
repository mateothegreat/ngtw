import { Component } from '@angular/core';
import { DatetimePickerResult } from '../../../../projects/datetime-picker/src/datetime-picker-result';
import { DatetimePicker } from '../../../../projects/datetime-picker/src/lib/datetime-picker';
import { DatetimePickerDayFormat } from '../../../../projects/datetime-picker/src/lib/datetime-picker-day-format';
import { DatetimePickerMode } from '../../../../projects/datetime-picker/src/lib/datetime-picker-mode';
import { DatetimePickerRange } from '../../../../projects/datetime-picker/src/lib/datetime-picker-range';
import { DatetimePickerTheme } from '../../../../projects/datetime-picker/src/lib/datetime-picker-theme';

@Component({
    selector: 'app-demo-datetime-picker',
    template: `
        <div class="flex">
            <div class="p-10">
                <ngtw-datetime-picker [config]="config"
                                      [range]="range"
                                      (selected)="onSelection($event)"></ngtw-datetime-picker>
            </div>
            <div class="p-10">
                <ngtw-datetime-picker [config]="config"
                                      [range]="range2"
                                      (selected)="onSelection($event)"></ngtw-datetime-picker>
            </div>
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
            date: new Date('2022-06-07 00:00:00'),
            selected: new Date('2022-06-08 00:00:00')
        },
        end: {
            date: new Date('2022-09-21 00:00:00'),
            selected: new Date('2022-09-15 00:00:00')
        }
    };
    public range2: DatetimePickerRange = {
        start: {
            date: new Date('2022-09-07 00:00:00'),
            selected: new Date('2022-11-08 00:00:00')
        },
        end: {
            date: new Date('2023-12-15 00:00:00'),
            selected: new Date('2022-12-15 00:00:00')
        }
    };

    public onSelection(result: DatetimePickerResult) {
        console.log(result);
        console.log(result.getDates());
    }
}
