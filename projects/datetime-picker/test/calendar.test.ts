import { describe, expect, test } from '@jest/globals';
import { DatetimePicker } from '../src/lib/datetime-picker';
import { DatetimePickerDayFormat } from '../src/lib/datetime-picker-day-format';
import { DatetimePickerMode } from '../src/lib/datetime-picker-mode';
import { DatetimePickerRange } from '../src/lib/datetime-picker-range';
import { DatetimePickerTheme } from '../src/lib/datetime-picker-theme';
import { DatetimePickerUtilities } from '../src/lib/datetime-picker-utilities';

const config: DatetimePicker<any> = {
    mode: DatetimePickerMode.MONTH,
    theme: DatetimePickerTheme.LIGHT,
    dayFormat: DatetimePickerDayFormat.SHORT
};
const range: DatetimePickerRange = {
    start: {
        date: new Date('2022-06-07 00:00:00'),
        selected: new Date('2022-06-08 00:00:00')
    },
    end: {
        date: new Date('2023-12-15 00:00:00'),
        selected: new Date('2022-06-11 00:00:00')
    }
};

const days = DatetimePickerUtilities.getDaysBetween(range.start.date, range.end.date);

describe('DatetimePickerComponent', () => {
    test('should reduce a range of days to a subset of days', () => {
        const reduced = DatetimePickerUtilities.reduce(range, range.start.selected, range.end.selected);
        expect(reduced.length).toEqual(4);
    });

    // test('should have matching number of days in range', () => {
    //     const selection = DatetimePickerUtilities.getSelectionWithinRange(range);
    // });

});
