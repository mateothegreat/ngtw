import { DatetimePickerUtilities } from './datetime-picker-utilities';

export class DatetimePickerMonth<T> {
    public name?: string;
    public month?: number;
    public year?: number;
    public date?: Date;

    public constructor(date: Date);
    public constructor(month: number, year: number);
    public constructor(...args: any[]) {
        if (args.length === 1) {
            this.date = args[0];
        } else {
            this.date = new Date(args[1], args[0]);
        }
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
        this.name = DatetimePickerUtilities.MONTHS[this.month].name;
    }
}
