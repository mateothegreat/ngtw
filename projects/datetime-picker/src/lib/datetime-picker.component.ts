import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';
import { DatetimeCalendarMonthComponent } from './caldendar/datetime-calendar-month.component';

import { DatetimePicker } from './datetime-picker';
import { DatetimePickerDay } from './datetime-picker-day';
import { DatetimePickerGroup } from './datetime-picker-group';
import { DatetimePickerMode } from './datetime-picker-mode';
import { DatetimePickerMonth } from './datetime-picker-month';

@Component({
    standalone: true,
    imports: [ CommonModule, DatetimePickerComponent, DatetimeCalendarMonthComponent ],
    selector: 'ngtw-datetime-picker',
    template: `
        <div class="flex h-96 border-2 border-gray-200 rounded-lg overflow-hidden" style="width: 900px">

            <div class="w-36 p-4 border-r-2 border-gray-100 ">

                <div *ngFor="let shortcut of shortcuts"
                     class="text-md text-blue-500 cursor-pointer font-bold hover:opacity-50 mb-1.5">

                    {{ shortcut.label }}

                </div>

                <div class="border border-gray-50 my-3"></div>

                <div *ngFor="let n of nav"
                     class="text-sm text-purple-500 cursor-pointer font-medium hover:opacity-50 mb-3">

                    {{ n.label }}

                </div>

            </div>

            <div class="flex justify-evenly space-x-2 p-3 flex-1">

                <ngtw-datetime-calendar-month [config]="config" class="w-full"></ngtw-datetime-calendar-month>
                <ngtw-datetime-calendar-month [config]="config" class="w-full"></ngtw-datetime-calendar-month>

            </div>

        </div>

        <div class="">

        </div>
    `,
    styles: []
})
export class DatetimePickerComponent implements OnInit {
    @Input() config: DatetimePicker<any>;

    public shortcuts: Array<DatetimePickerGroup> = [];
    public nav: Array<DatetimePickerGroup> = [];

    public currentStart: DatetimePickerDay<any>;
    public currentEnd: DatetimePickerDay<any>;

    public groupBy(days: Array<DatetimePickerDay<any>>, mode: DatetimePickerMode): { [key: number]: Array<DatetimePickerDay<any>> } {

        const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
            array.reduce((acc, value, index, array) => {
                (acc[predicate(value, index, array)] ||= []).push(value);
                return acc;
            }, {} as { [key: string]: T[] });

        return groupBy(days, d => d[mode].toString());
    }

    public ngOnInit() {
        this.config = new DatetimePicker(this.config);

        const days = this.config.getDays(new Date('2020-01-01'), new Date('2022-12-31'));
        const groups: { [key: number]: Array<DatetimePickerDay<any>> } = this.groupBy(days, DatetimePickerMode.MONTH);

        for (let group in groups) {

            this.nav.push({

                type: DatetimePickerMode.WEEK,
                label: `Week ${ Number.parseInt(group) + 1 }`

            });

        }

        if (this.config.mode === DatetimePickerMode.WEEK) {

            this.shortcuts = [
                {
                    type: DatetimePickerMode.WEEK,
                    label: 'Today'
                },
                {
                    type: DatetimePickerMode.WEEK,
                    label: 'Yesterday'
                }
            ];

        }

        this.currentStart = groups[0][0];

        const month = new DatetimePickerMonth(2022, 12);

    }

}
