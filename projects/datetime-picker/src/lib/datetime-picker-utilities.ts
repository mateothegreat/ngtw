import { DatetimePickerDay } from './datetime-picker-day';
import { DatetimePickerMode } from './datetime-picker-mode';

export class DatetimePickerUtilities {
    public static readonly MONTHS: { number: number, name: string }[] = [
        { number: 0, name: 'January' },
        { number: 1, name: 'February' },
        { number: 2, name: 'March' },
        { number: 3, name: 'April' },
        { number: 4, name: 'May' },
        { number: 5, name: 'June' },
        { number: 6, name: 'July' },
        { number: 7, name: 'August' },
        { number: 8, name: 'September' },
        { number: 9, name: 'October' },
        { number: 10, name: 'November' },
        { number: 11, name: 'December' }
    ];

    public static getDaysBetween(start: Date, end?: Date): Array<DatetimePickerDay<any>> {
        const days: Array<DatetimePickerDay<any>> = [];

        for (let arr = [], d = new Date(start); d <= new Date(end); d.setDate(d.getDate() + 1)) {
            days.push(new DatetimePickerDay(new Date(d)));
        }

        return days;
    }

    public static getMonthsBetween(start: Date, end: Date) {
        return (end.getFullYear() * 12 + end.getMonth()) - (start.getFullYear() * 12 + start.getMonth());
    }

    public static groupBy(days: Array<DatetimePickerDay<any>>, mode: DatetimePickerMode): { [key: number]: Array<DatetimePickerDay<any>> } {
        const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
            array.reduce((acc, value, index, array) => {
                (acc[predicate(value, index, array)] ||= []).push(value);
                return acc;
            }, {} as { [key: string]: T[] });

        return groupBy(days, d => d[mode].toString());
    }
}
