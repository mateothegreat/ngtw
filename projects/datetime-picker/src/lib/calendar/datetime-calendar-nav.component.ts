import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';
import { DropdownComponent, DropdownGroup } from '@ngtw/dropdown';
import { addMonths, subMonths } from 'date-fns';
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
    templateUrl: './datetime-calendar-nav.component.html'
})
export class DatetimeCalendarNavComponent<T> implements OnInit {
    @Input() public config: DatetimePicker<T>;
    @Input() public range: DatetimePickerRange;
    @Input() public selected: DatetimePickerMonth<T>;

    public group: DropdownGroup<any>;
    public change$: Subject<DatetimePickerMonth<any>> = new Subject();
    public previousable: boolean;
    public nextable: boolean;
    public dropdownGroups: Array<DropdownGroup<any>> = [
        {
            label: 'AVAILABLE MONTHS',
            items: []
        }
    ];

    public ngOnInit() {
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

    public canPrevious(): boolean {
        return DatetimePickerUtilities.reduce(new DatetimePickerMonth<T>(subMonths(this.selected.date, 1)), this.range, this.range.start.selected, this.range.end.selected).length > 0;
    }

    public canNext(): boolean {
        return DatetimePickerUtilities.reduce(new DatetimePickerMonth<T>(addMonths(this.selected.date, 1)), this.range, this.range.start.selected, this.range.end.selected).length > 0;
    }

    public previous(): void {
        this.change$.next(new DatetimePickerMonth<T>(subMonths(this.selected.date, 1)));
    }

    public next(): void {
        this.change$.next(new DatetimePickerMonth<T>(addMonths(this.selected.date, 1)));
    }

}
