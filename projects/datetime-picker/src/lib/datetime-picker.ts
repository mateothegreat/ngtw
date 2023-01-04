import { DatetimePickerDayFormat } from './datetime-picker-day-format';
import { DatetimePickerMode } from './datetime-picker-mode';
import { DatetimePickerRange } from './datetime-picker-range';

import { DatetimePickerTheme } from './datetime-picker-theme';

export class DatetimePicker<T> {
    public mode?: DatetimePickerMode = DatetimePickerMode.MONTH;
    public theme?: DatetimePickerTheme = DatetimePickerTheme.LIGHT;
    public value?: Date | DatetimePickerRange;
    public dayFormat?: DatetimePickerDayFormat = DatetimePickerDayFormat.SHORT;

    public constructor(obj: DatetimePicker<T>) {
        Object.assign(this, obj);
    }
}
