import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';

import { DatetimePicker } from './datetime-picker';
import { DatetimePickerDay } from './datetime-picker-day';
import { DatetimePickerGroup } from './datetime-picker-group';
import { DatetimePickerMode } from './datetime-picker-mode';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'ngtw-datetime-picker',
    template: `
        <div class="flex h-96 border-2 border-gray-400 rounded-lg overflow-hidden" style="width: 900px">

            <div class="w-36 p-4 border border-gray-100 ">

                <div *ngFor="let shortcut of shortcuts"
                     class="text-md text-blue-600 cursor-pointer font-bold hover:opacity-50 mb-3">

                    {{ shortcut.label }}

                </div>

                <div class="border border-gray-100 my-3"></div>

                <div *ngFor="let n of nav"
                     class="text-sm text-blue-600 cursor-pointer font-medium hover:opacity-50 mb-3">

                    {{ n.label }}

                </div>

            </div>

            <div class="flex justify-evenly flex-1 pt-2">

                <div class="flex flex-1 border border-gray-100 rounded bg-gray-400 bg-opacity-10">
                    <div class="flex">
                        <svg class="text-gray-600 cursor-pointer hover:opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" fill="currentColor"></path>
                            </g>
                        </svg>
                    </div>
                    <div class="flex-1 flex align-middle justify-center">
                        asdf
                    </div>
                    <div class="flex">
                        <svg class="text-gray-600 cursor-pointer hover:opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="currentColor"></path>
                            </g>
                        </svg>
                    </div>
                </div>

                <div class="flex flex-1 border border-gray-100 rounded">
                    <div class="flex">
                        <svg class="text-gray-600 cursor-pointer hover:opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" fill="currentColor"></path>
                            </g>
                        </svg>
                    </div>
                    <div class="flex-1 flex align-middle justify-center">
                        asdf
                    </div>
                    <div class="flex">
                        <svg class="text-gray-600 cursor-pointer hover:opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="currentColor"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

        </div>
    `,
    styles: []
})
export class DatetimePickerComponent implements OnInit {
    @Input() config: DatetimePicker;

    public shortcuts: Array<DatetimePickerGroup> = [];
    public nav: Array<DatetimePickerGroup> = [];

    public currentStart: DatetimePickerGroup;
    public currentEnd: DatetimePickerGroup;

    public groupBy(days: Array<DatetimePickerDay>, mode: DatetimePickerMode): { [key: number]: Array<DatetimePickerDay> } {

        const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
            array.reduce((acc, value, index, array) => {
                (acc[predicate(value, index, array)] ||= []).push(value);
                return acc;
            }, {} as { [key: string]: T[] });

        return groupBy(days, d => d[mode].toString());
    }

    public ngOnInit() {
        this.config = new DatetimePicker(this.config);

        const days = this.config.getDays(new Date('2020-02-01'), new Date('2020-05-10'));

        const groups: { [key: number]: Array<DatetimePickerDay> } = this.groupBy(days, DatetimePickerMode.MONTH);

        for (let group in groups) {

            console.log(group);

            this.nav.push({

                type: DatetimePickerMode.WEEK,
                label: `Week ${Number.parseInt(group) + 1}`

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

        // this.currentStart = groups[0];

    }

}
