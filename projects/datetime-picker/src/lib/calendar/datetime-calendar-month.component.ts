import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { addDays, subDays } from 'date-fns';
import { DatetimePicker } from '../datetime-picker';
import { DatetimePickerDay } from '../datetime-picker-day';
import { DatetimePickerGroup } from '../datetime-picker-group';
import { DatetimePickerMonth } from '../datetime-picker-month';
import { DatetimePickerRange } from '../datetime-picker-range';
import { DatetimePickerTimeComponent } from '../datetime-picker-time.component';
import { DatetimePickerUtilities } from '../datetime-picker-utilities';
import { DatetimeCalendarNavComponent } from './datetime-calendar-nav.component';

@Component({
    standalone: true,
    imports: [ CommonModule, DatetimeCalendarNavComponent ],
    selector: 'ngtw-datetime-calendar-month',
    template: `
        <ng-container #timeWrapper></ng-container>

        <ngtw-datetime-calendar-nav #nav
                                    [config]="config"
                                    [range]="range"></ngtw-datetime-calendar-nav>
        <div class="p-2">
            <div class="grid grid-cols-7 text-center text-xs leading-6 text-gray-500 border-b pb-2">
                <div *ngFor="let day of days">
                    {{ day.short[0] }}
                </div>
            </div>
            <div class="mt-2 grid grid-cols-7 text-sm">
                <div *ngFor="let day of out; let i = index"
                     [class.range-start]="isSelected(day) && day.date.getDate() === start?.date.getDate()"
                     [class.range-between]="isSelected(day) && day.date.getDate()"
                     [class.range-end]="isSelected(day) && day.date.getDate() === end?.date.getDate()"
                     (click)="onClick(day)"
                     class="my-2 border-green-500 hover:bg-green-200 border-transparent border-b-4">
                    <button [class.text-gray-300]="!isSelected(day) && (day.date.getTime() < range.start.date.getTime() || day.date.getTime() > range.end.date.getTime())"
                            class="mx-auto flex h-8 w-8 px-2 items-center justify-center rounded text-gray-600">
                        <time datetime="2022-01-21">
                            {{ day.date.getDate() }}
                        </time>
                    </button>
                </div>
            </div>
        </div>
    `,
    styles: [ `
        .range-start {
            border-left: 2px solid green;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background: lightgreen;
        }

        .range-between {
            border-top: 2px solid green;
            border-bottom: 2px solid green;
            background: lightgreen;
        }

        .range-end {
            border-right: 2px solid green;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            background: lightgreen;
        }
    ` ]
})
export class DatetimeCalendarMonthComponent<T> implements OnInit, AfterViewInit {
    @ViewChild('timeWrapper', { read: ViewContainerRef }) private timeWrapper: ViewContainerRef;
    @ViewChild('nav', { read: DatetimeCalendarNavComponent }) private nav: DatetimeCalendarNavComponent<DatetimePickerMonth<T>>;

    @Input() public config: DatetimePicker<T>;
    @Input() public month: DatetimePickerGroup;
    @Input() public range: DatetimePickerRange;
    @Input() public selected: DatetimePickerRange;
    @Input() public start: DatetimePickerDay<T>;
    @Input() public end: DatetimePickerDay<T>;
    @Input() public onSelected: EventEmitter<DatetimePickerRange> = new EventEmitter<DatetimePickerRange>();

    @Output() public selectedChange: EventEmitter<DatetimePickerRange> = new EventEmitter<DatetimePickerRange>();

    public now = new Date();
    public current: Date;
    public rows: [ DatetimePickerDay<T>[] ];
    public out: DatetimePickerDay<T>[] = [];
    public skipAfter: number;

    public days: Array<{ number: number, long: string, short: string }> = [
        { number: 0, long: 'Sunday', short: 'Sun' },
        { number: 1, long: 'Monday', short: 'Mon' },
        { number: 2, long: 'Tuesday', short: 'Tue' },
        { number: 3, long: 'Wednesday', short: 'Wed' },
        { number: 4, long: 'Thursday', short: 'Thu' },
        { number: 5, long: 'Friday', short: 'Fri' },
        { number: 6, long: 'Saturday', short: 'Sat' }
    ];

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService) {

    }

    public ngOnInit() {
        this.setup();
    }

    public ngAfterViewInit() {
        this.nav.change$.subscribe(month => {
            console.log(month);
        });
    }

    public setup() {
        const days = DatetimePickerUtilities.getDaysBetween(this.range.start.date, this.range.end.date);
        this.current = days[0].date;

        for (let i = days[0].day; i > 0; i--) {
            this.out.push(new DatetimePickerDay<T>(subDays(days[0].date, i)));
        }

        this.out = [ ...this.out, ...days ];

        const daysLeft = new Date(this.current.getFullYear(), this.current.getMonth(), 0).getDate() - days[days.length - 1].date.getDate();

        for (let i = 1; i <= daysLeft; i++) {
            this.out.push(new DatetimePickerDay<T>(addDays(days[days.length - 1].date, i)));
        }
    }

    public onClick(day: DatetimePickerDay<T>) {
        if (!this.start) {
            this.start = day;
            this.timeShow('start');
        } else {
            if (this.start && this.end) {
                this.start = day;
                this.end = null;
                this.timeShow('start');

            } else {
                if (day.date.getDate() > this.start.date.getDate()) {
                    this.end = day;
                    this.timeShow('end');
                    this.onSelected.emit({
                        start: {
                            date: this.range.start.date,
                            selected: this.start.date
                        },
                        end: {
                            date: this.range.end.date,
                            selected: this.end.date
                        }
                    });
                }
            }
        }
    }

    public isSelected(day: DatetimePickerDay<T>): boolean {
        if (this.start && this.end) {
            return day.date.getDate() >= this.start?.date.getDate() && day.date.getDate() <= this.end.date.getDate();
        } else {
            if (this.start && day.date.getDate() === this.start.date.getDate()) {
                return true;
            }
        }
        return false;
    }

    public timeShow(mode: 'start' | 'end'): void {
        setTimeout(() => {
            const instance = this.dynamicComponentFactoryService.createInContainer('datetime-picker-time', this.timeWrapper, DatetimePickerTimeComponent);
            instance.componentRef.instance.config = this.config;
            instance.componentRef.instance.mode = mode;
        }, 100);
    }
}
