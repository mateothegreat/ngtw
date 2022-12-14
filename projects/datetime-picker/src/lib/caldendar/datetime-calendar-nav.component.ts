import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';

import { DatetimePicker } from '../datetime-picker';
import { DatetimePickerDay } from '../datetime-picker-day';

@Component({
    standalone: true,
    imports: [ CommonModule ],
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

                    <div class="flex items-center text-gray-400 cursor-pointer hover:text-blue-400">

                        <div class="">

                            December

                        </div>

                        <div class="">

                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                <g fill="none">
                                    <path d="M7 10l5 5 5-5H7z" fill="currentColor"></path>
                                </g>
                            </svg>

                        </div>

                    </div>

                    <div class="flex cursor-pointer text-gray-400 hover:text-blue-400">

                        <div class="">

                            2022

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
    `,
    styles: []
})
export class DatetimeCalendarNavComponent<T> implements OnInit {
    @Input() config: DatetimePicker<T>;

    public selected: DatetimePickerDay<T>;

    public ngOnInit() {

    }

    public onDayClick(day: DatetimePickerDay<T>): void {

        this.selected = day;

    }

}
