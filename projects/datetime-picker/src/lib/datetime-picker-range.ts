export class DatetimePickerRange {
    public start: {
        date: Date,
        selected?: Date
    };
    public end: {
        date: Date,
        selected?: Date
    };

    public constructor(range: DatetimePickerRange) {
        Object.assign(this, range);
    }
}
