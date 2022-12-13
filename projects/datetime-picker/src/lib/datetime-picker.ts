import { DatetimePickerDay } from './datetime-picker-day';
import { DatetimePickerMode } from './datetime-picker-mode';
import { DatetimePickerRange } from './datetime-picker-range';

import { DatetimePickerTheme } from './datetime-picker-theme';

export class DatetimePicker {
    public mode?: DatetimePickerMode = DatetimePickerMode.MONTH;
    public theme?: DatetimePickerTheme = DatetimePickerTheme.LIGHT;
    public value: Date | DatetimePickerRange;

    public constructor(obj: DatetimePicker) {
        Object.assign(this, obj);
    }

    public getDays?(start: Date, end?: Date): Array<DatetimePickerDay> {
        const days: Array<DatetimePickerDay> = [];

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
