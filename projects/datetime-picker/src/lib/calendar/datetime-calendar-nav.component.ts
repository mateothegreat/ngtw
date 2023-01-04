import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';
import { addMonths } from 'date-fns';
import { DropdownComponent, DropdownGroup } from 'projects/dropdown/src/public-api';
import { Subject } from 'rxjs';

import { DatetimePicker } from '../datetime-picker';
import { DatetimePickerDay } from '../datetime-picker-day';
import { DatetimePickerMonth } from '../datetime-picker-month';
import { DatetimePickerRange } from '../datetime-picker-range';
import { DatetimePickerUtilities } from '../datetime-picker-utilities';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        DropdownComponent
    ],
    selector: 'ngtw-datetime-calendar-nav',
    template: `
        <div class="flex justify-evenly flex-1 h-12 items-center">
            <div class="flex flex-1 border border-2 border-gray-100 rounded h-full">
                <div class="flex items-center hover:bg-gray-100 cursor-pointer p-2">
                    <svg class="text-gray-600 cursor-pointer hover:opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" fill="currentColor"></path>
                        </g>
                    </svg>
                </div>
                <div class="flex justify-around flex-1 flex text-md items-center justify-center uppercase font-medium">
                    <div #dropdownTarget class="flex cursor-pointer text-gray-400 hover:text-blue-400">
                        <div class="">
                            <div>{{ selected.name }}</div>
                            <ngtw-dropdown [target]="dropdownTarget" [items]="dropdownGroups"></ngtw-dropdown>
                        </div>
                        <div class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g fill="none">
                                    <path d="M7 10l5 5 5-5H7z" fill="currentColor"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="flex items-center hover:bg-gray-100 cursor-pointer p-2">
                    <svg class="text-gray-400 cursor-pointer hover:opacity-50" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <g fill="none">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="currentColor"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    `
})
export class DatetimeCalendarNavComponent<T> implements OnInit {
    @Input() public config: DatetimePicker<T>;
    @Input() public range: DatetimePickerRange;
    @Input() public selected: DatetimePickerMonth<T>;

    public group: DropdownGroup;
    public change$: Subject<DatetimePickerMonth<string>> = new Subject();
    public dropdownGroups: Array<DropdownGroup> = [
        {
            label: 'AVAILABLE MONTHS',
            items: []
        }
    ];

    public ngOnInit() {
        if (!this.selected) {
            this.selected = {
                name: DatetimePickerUtilities.MONTHS[this.range.start.date.getMonth()].name,
                month: this.range.start.date.getMonth(),
                year: this.range.start.date.getFullYear()
            };
        }

        const months = DatetimePickerUtilities.getMonthsBetween(this.range.start.date, this.range.end.date);
        for (let i = 1; i <= months; i++) {
            const month = addMonths(this.range.start.date, i);
            this.dropdownGroups[0].items.push({
                label: `${ month.getFullYear() } - ${ DatetimePickerUtilities.MONTHS[month.getMonth()].name }`,
                click: () => {
                    this.change$.next({
                        name: DatetimePickerUtilities.MONTHS[month.getMonth()].name,
                        month: month.getMonth(),
                        year: month.getFullYear()
                    });
                }

            });
        }
    }

    public onDayClick(day: DatetimePickerDay<T>): void {
        this.selected = day;
    }
}
