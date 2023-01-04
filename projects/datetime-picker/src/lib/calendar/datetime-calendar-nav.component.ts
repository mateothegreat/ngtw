import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';
import { addMonths } from 'date-fns';
import { DropdownComponent, DropdownGroup } from 'projects/dropdown/src/public-api';
import { Subject } from 'rxjs';

import { DatetimePicker } from '../datetime-picker';
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
                <button (click)="previous()" class="fill-gray-300 cursor-pointer hover:fill-blue-400 transform active:scale-75 disabled:active:scale-100 transition-transform">
                    <svg class="w-8 h-8 rotate-90" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m12 17c-.5 0-1-.2-1.3-.6l-4.2-5.1c-.5-.7-.6-1.5-.3-2.2s.9-1.1 1.6-1.1h8.4c.7 0 1.3.4 1.6 1.1s.2 1.6-.3 2.2l-4.2 5.1c-.3.4-.8.6-1.3.6z"/>
                    </svg>
                </button>
                <div class="flex justify-around flex-1 flex text-md items-center justify-center uppercase font-medium">
                    <div #dropdownTarget class="flex cursor-pointer items-center text-gray-400 fill-gray-200 cursor-pointer ml-1 hover:text-blue-400 hover:fill-blue-400 transform active:scale-90 disabled:active:scale-100 transition-transform">
                        <div class="">
                            <div>
                                {{ selected.name }} {{ selected.year }}
                            </div>
                            <ngtw-dropdown [target]="dropdownTarget" [items]="dropdownGroups"></ngtw-dropdown>
                        </div>
                        <svg class="ml-1 w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m12 17c-.5 0-1-.2-1.3-.6l-4.2-5.1c-.5-.7-.6-1.5-.3-2.2s.9-1.1 1.6-1.1h8.4c.7 0 1.3.4 1.6 1.1s.2 1.6-.3 2.2l-4.2 5.1c-.3.4-.8.6-1.3.6z"/>
                        </svg>
                    </div>
                </div>
                <button (click)="next()" class="fill-gray-300 cursor-pointer hover:fill-blue-400 transform active:scale-75 disabled:active:scale-100 transition-transform">
                    <svg class="w-8 h-8 -rotate-90" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m12 17c-.5 0-1-.2-1.3-.6l-4.2-5.1c-.5-.7-.6-1.5-.3-2.2s.9-1.1 1.6-1.1h8.4c.7 0 1.3.4 1.6 1.1s.2 1.6-.3 2.2l-4.2 5.1c-.3.4-.8.6-1.3.6z"/>
                    </svg>
                </button>
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

    public previous(): void {

    }

    public next(): void {

    }

}
