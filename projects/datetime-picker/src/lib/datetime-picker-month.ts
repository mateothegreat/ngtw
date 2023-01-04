import { DatetimePickerDay } from './datetime-picker-day';

export class DatetimePickerMonth<T> {
    public name?: string;
    public month?: number;
    public year?: number;
    public days?: Array<DatetimePickerDay<T>>;

    public constructor(month: number, year: number) {
        const daysInMonth = new Date(year, month, 0).getDate();
    }
}
