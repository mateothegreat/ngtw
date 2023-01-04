export class DatetimePickerDay<T> {
    public date: Date;

    public day?: number;
    public week?: number;
    public month?: number;
    public year?: number;
    public row?: number;
    public data?: T;
    public inrange?: boolean;
    public inselection?: boolean;

    public constructor(date: Date, outofrange: boolean, inselection: boolean);
    public constructor(date: Date);

    public constructor(...args: any[]) {
        if (args.length === 3) {
            this.date = args[0];
            this.inrange = args[1];
            this.inselection = args[2];
        } else {
            Object.assign(this, Object.fromEntries(args.map(v => [ 'date', v ])));
        }

        // @ts-ignore
        this.week = Math.ceil((this.date.getDay() + 1 + Math.floor((this.date - new Date(this.date.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000))) / 7);
        this.month = this.date.getMonth();
        this.day = this.date.getDay();
        this.year = this.date.getFullYear();
    }

}
