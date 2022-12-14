import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DatetimePicker } from '../datetime-picker';
import { DatetimePickerGroup } from '../datetime-picker-group';
import { DatetimeCalendarNavComponent } from './datetime-calendar-nav.component';

@Component({
    standalone: true,
    imports: [ CommonModule, DatetimeCalendarNavComponent ],
    selector: 'ngtw-datetime-calendar-month',
    template: `
        <ngtw-datetime-calendar-nav [config]="config"></ngtw-datetime-calendar-nav>
    `,
    styles: []
})
export class DatetimeCalendarMonthComponent<T> implements OnInit {
    @Input() config: DatetimePicker<T>;
    @Input() month: DatetimePickerGroup;

    public days: Array<{ number: number, long: string, short: string }> = [
        { number: 0, long: 'Sunday', short: 'Sun' },
        { number: 1, long: 'Monday', short: 'Mon' },
        { number: 2, long: 'Tuesday', short: 'Tue' },
        { number: 3, long: 'Wednesday', short: 'Wed' },
        { number: 4, long: 'Thursday', short: 'Thu' },
        { number: 5, long: 'Friday', short: 'Fri' },
        { number: 6, long: 'Saturday', short: 'Sat' }
    ];

    public ngOnInit() {

    }

}
