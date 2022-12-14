import { DatetimePickerDay } from './datetime-picker-day';
import { DatetimePickerDayFormat } from './datetime-picker-day-format';
import { DatetimePickerMode } from './datetime-picker-mode';
import { DatetimePickerRange } from './datetime-picker-range';

import { DatetimePickerTheme } from './datetime-picker-theme';

export class DatetimePicker<T> {
    public mode?: DatetimePickerMode = DatetimePickerMode.MONTH;
    public theme?: DatetimePickerTheme = DatetimePickerTheme.LIGHT;
    public value: Date | DatetimePickerRange;
    public dayFormat?: DatetimePickerDayFormat = DatetimePickerDayFormat.SHORT;

    public constructor(obj: DatetimePicker<T>) {
        Object.assign(this, obj);
    }

    public getDays?(start: Date, end?: Date): Array<DatetimePickerDay<T>> {
        const days: Array<DatetimePickerDay<T>> = [];

        for (
            let arr = [], d = new Date(start);
            d <= new Date(end);
            d.setDate(d.getDate() + 1)
        ) {
            days.push(new DatetimePickerDay(new Date(d)));
        }

        return days;
    }
}
