export class DatetimePickerResult {
    public start: {
        date: string,
        time: {
            hour: number,
            minute: number,
            second: number
            period: string
        }
    };
    public end: {
        date: string,
        time: {
            hour: number,
            minute: number,
            second: number,
            period: string
        }
    };

    public constructor(obj: DatetimePickerResult) {
        this.start = obj.start;
        this.end = obj.end;
    }

    public getDates?(): { start: Date, end: Date } {
        return {
            start: new Date(this.start.date + ' ' + this.start.time.hour + ':' + this.start.time.minute + ':' + this.start.time.second + ' ' + this.start.time.period),
            end: new Date(this.end.date + ' ' + this.end.time.hour + ':' + this.end.time.minute + ':' + this.end.time.second + ' ' + this.end.time.period)
        };
    }
}
