import { CommonModule } from '@angular/common';

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackdropService } from 'projects/backdrop/src/public-api';
import { DropdownComponent } from 'projects/dropdown/src/public-api';
import { DatetimeCalendarMonthComponent } from './calendar/datetime-calendar-month.component';

import { DatetimePicker } from './datetime-picker';
import { DatetimePickerDay } from './datetime-picker-day';
import { DatetimePickerGroup } from './datetime-picker-group';
import { DatetimePickerMode } from './datetime-picker-mode';
import { DatetimePickerMonth } from './datetime-picker-month';
import { DatetimePickerRange } from './datetime-picker-range';
import { DatetimePickerTimeComponent } from './datetime-picker-time.component';
import { DatetimePickerUtilities } from './datetime-picker-utilities';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        DatetimePickerComponent,
        DatetimePickerTimeComponent,
        DatetimeCalendarMonthComponent,
        DropdownComponent
    ],
    selector: 'ngtw-datetime-picker',
    template: `
        <div class="h-[400px] w-[500px]">
            <!--            <div class="absolute bg-black w-full h-full backdrop-blur-xl backdrop-filter backdrop-brightness-50 backdrop-saturate-150"></div>-->

            <div class="flex border-2 border-gray-200 rounded-lg overflow-hidden">
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
                <div class="flex justify-evenly space-x-2 p-3 w-96">
                    <ngtw-datetime-calendar-month [config]="config"
                                                  [range]="range"
                                                  [(selected)]="range"
                                                  [onSelected]="onSelected"
                                                  class="w-full"></ngtw-datetime-calendar-month>
                </div>
            </div>
        </div>
    `
})
export class DatetimePickerComponent implements OnInit, AfterViewInit {
    @Input() public config: DatetimePicker<any>;
    @Input() public range: DatetimePickerRange;

    @Output() public onSelected: EventEmitter<DatetimePickerRange> = new EventEmitter<DatetimePickerRange>();
    @Output() public selected: EventEmitter<DatetimePickerRange> = new EventEmitter<DatetimePickerRange>();

    public shortcuts: Array<DatetimePickerGroup> = [];
    public nav: Array<DatetimePickerGroup> = [];
    public currentStart: DatetimePickerDay<any>;
    public currentEnd: DatetimePickerDay<any>;

    public constructor(private readonly backdropService: BackdropService) {
        // backdropService.open();
        this.onSelected.subscribe(a => {
            this.selected.emit(a);
        });
    }


    public ngOnInit() {
        this.config = new DatetimePicker(this.config);

        const days = DatetimePickerUtilities.getDaysBetween(this.range.start.date, this.range.end.date);
        const groups: { [key: number]: Array<DatetimePickerDay<any>> } = DatetimePickerUtilities.groupBy(days, DatetimePickerMode.MONTH);

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

    public ngAfterViewInit() {

    }
}
