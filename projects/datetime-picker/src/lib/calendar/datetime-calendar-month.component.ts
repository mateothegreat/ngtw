import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { isWithinInterval } from 'date-fns';
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
    imports: [
        CommonModule,
        DatetimeCalendarNavComponent
    ],
    selector: 'ngtw-datetime-calendar-month',
    template: `
        <ngtw-datetime-calendar-nav #nav
                                    [config]="config"
                                    [selected]="current"
                                    [range]="range"></ngtw-datetime-calendar-nav>
        <div class="p-2">
            <div class="grid grid-cols-7 text-center text-xs leading-6 text-gray-500 border-b pb-2">
                <div *ngFor="let day of days">
                    {{ day.short[0] }}
                </div>
            </div>
            <div class="mt-2 grid grid-cols-7 text-sm">
                <div *ngFor="let day of calendar; let i = index"
                     [class.range-start]="isSelected(day) && day.date.getDate() === start?.date.getDate()"
                     [class.range-between]="isSelected(day) && day.date.getDate()"
                     [class.range-end]="isSelected(day) && day.date.getDate() === end?.date.getDate()"
                     (click)="onClick(day)"
                     class="my-2  hover:bg-green-200 border-transparent border-b-4 text-green-600">
                    <button [class.text-gray-400]="!isInRange(day) || (!isSelected(day) && (day.date.getTime() < range.start.date.getTime() || day.date.getTime() > range.end.date.getTime()))"
                            class="mx-auto flex h-8 w-8 px-2 items-center justify-center rounded">
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
    @ViewChild('nav', { read: DatetimeCalendarNavComponent }) private nav: DatetimeCalendarNavComponent<DatetimePickerMonth<T>>;

    @Input() public config: DatetimePicker<T>;
    @Input() public month: DatetimePickerGroup;
    @Input() public range: DatetimePickerRange;
    @Input() public selected: DatetimePickerRange;
    @Input() public start: DatetimePickerDay<T>;
    @Input() public end: DatetimePickerDay<T>;
    @Input() public onSelected: EventEmitter<DatetimePickerRange> = new EventEmitter<DatetimePickerRange>();
    @Input() public timeWrapper: ViewContainerRef;
    @Input() public formGroup: FormGroup;

    @Output() public selectedChange: EventEmitter<DatetimePickerRange> = new EventEmitter<DatetimePickerRange>();

    public now = new Date();
    public current: DatetimePickerMonth<T>;
    public calendar: DatetimePickerDay<T>[];
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
        this.setup(new DatetimePickerMonth<T>(this.range.start.date));
    }

    public ngAfterViewInit() {
        this.nav.change$.subscribe(month => {
            if (isWithinInterval(month.date, { start: this.range.start.date, end: this.range.end.date })) {
                this.setup(month);
            }
        });
    }

    public setup(current?: DatetimePickerMonth<T>): boolean {
        if (!current) {
            current = new DatetimePickerMonth<T>(this.range.start.date.getMonth(), this.range.start.date.getFullYear());
        }
        const days = DatetimePickerUtilities.getDaysBetween(this.range.start.date, this.range.end.date);
        this.current = current;

        //
        // Spread out days that are in each month(s) within the range.start and range.end values.
        //
        const selected = DatetimePickerUtilities.reduce(this.current, this.range, this.range.start.selected, this.range.end.selected);
        if (selected.length === 0) {
            return false;
        }
        const padColumnsBefore = selected[0].date.getDay();
        const padColumnsAfter = 6 - selected[selected.length - 1].date.getDay();
        this.calendar = [
            ...Array.from({ length: padColumnsBefore }, (_, i) => new DatetimePickerDay<T>(new Date(selected[0].date.getFullYear(), selected[0].date.getMonth(), selected[0].date.getDate() - (padColumnsBefore - i)))),
            ...selected,
            ...Array.from({ length: padColumnsAfter }, (_, i) => new DatetimePickerDay<T>(new Date(selected[selected.length - 1].date.getFullYear(), selected[selected.length - 1].date.getMonth(), selected[selected.length - 1].date.getDate() + (i + 1))))
        ];
        return true;
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

    public isInRange(day: DatetimePickerDay<T>): boolean {
        return day.date.getTime() >= this.range.start.selected.getTime() && day.date.getTime() <= this.range.end.selected.getTime();
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
        console.log(this.formGroup.controls[mode]);
        setTimeout(() => {
            const instance = this.dynamicComponentFactoryService.createInContainer('datetime-picker-time', this.timeWrapper, DatetimePickerTimeComponent);
            instance.componentRef.instance.config = this.config;
            instance.componentRef.instance.mode = mode;
            // @ts-ignore
            instance.componentRef.instance.formGroup = this.formGroup.controls[mode]['controls']['time'] as FormGroup;
        }, 100);
    }
}
