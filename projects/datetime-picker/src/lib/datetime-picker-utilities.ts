import { DatetimePickerDay } from './datetime-picker-day';
import { DatetimePickerMode } from './datetime-picker-mode';
import { DatetimePickerMonth } from './datetime-picker-month';
import { DatetimePickerRange } from './datetime-picker-range';

export class DatetimePickerUtilities {
    public static readonly ONE_DAY = 1000 * 60 * 60 * 24;
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

    public static getNumberOfDaysInRange(start: DatetimePickerDay<any>, end: DatetimePickerDay<any>): number {
        return Math.round(Math.abs((start.date.getTime() - end.date.getTime()) / (this.ONE_DAY)));
    }

    public static getSelectionWithinRange(selection: DatetimePickerRange, start: Date, end?: Date): DatetimePickerDay<any>[] {
        return this.getDaysBetween(selection.start.date, selection.end.date).filter(day => day.date.getTime() >= selection.start.selected.getTime() && day.date.getTime() <= selection.end.selected.getTime());
    }

    public static reduce(currentMonth: DatetimePickerMonth<any>, selection: DatetimePickerRange, start: Date, end?: Date): DatetimePickerDay<any>[] {
        const last = new Date(currentMonth.year, currentMonth.month + 1, 0);
        const days = this.getDaysBetween(selection.start.date, selection.end.date);
        const build = [];
        for (let i = 0; i < days.length; i++) {
            if (days[i].date.getFullYear() === currentMonth.year && days[i].date.getMonth() === currentMonth.month) {
                build.push(days[i]);
                if (days[i].date.getDate() >= last.getDate()) {
                    break;
                }
            }
        }
        return build;
    }

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

    public static pad(n: number): string {
        return n < 10 ? '0' + n : n.toString();
    }
}
