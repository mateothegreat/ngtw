export class DatetimePickerDay {
    public date: Date;

    public day?: number;
    public week?: number;
    public month?: number;
    public year?: number;

    public constructor(date: Date) {
        this.date = date;

        // @ts-ignore
        this.week = Math.ceil((date.getDay() + 1 + Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000))) / 7);
        this.month = date.getMonth();
        this.day = date.getDay();
        this.year = date.getFullYear();

    }

}
