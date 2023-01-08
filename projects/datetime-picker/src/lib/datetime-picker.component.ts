import { CommonModule } from '@angular/common';

import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownComponent } from '@ngtw/dropdown';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { subDays } from 'date-fns';
import { DatetimeCalendarMonthComponent } from './calendar/datetime-calendar-month.component';

import { DatetimePicker } from './datetime-picker';
import { DatetimePickerDay } from './datetime-picker-day';
import { DatetimePickerGroup } from './datetime-picker-group';
import { DatetimePickerMode } from './datetime-picker-mode';
import { DatetimePickerRange } from './datetime-picker-range';
import { DatetimePickerResult } from './datetime-picker-result';
import { DatetimePickerTimeComponent } from './datetime-picker-time.component';
import { DatetimePickerUtilities } from './datetime-picker-utilities';

@Component({
    standalone: true,
    imports: [ CommonModule, DatetimePickerComponent, DatetimePickerTimeComponent, DatetimeCalendarMonthComponent, DropdownComponent ],
    selector: 'ngtw-datetime-picker',
    templateUrl: './datetime-picker.component.html'
})
export class DatetimePickerComponent implements OnInit, AfterViewInit {
    @ViewChild('timeWrapperContainer', { read: ViewContainerRef }) public timeWrapper: ViewContainerRef;

    @Input() public config: DatetimePicker<any>;
    @Input() public range: DatetimePickerRange;
    @Input() public current: Date;

    @Output() public onSelected: EventEmitter<DatetimePickerRange> = new EventEmitter<DatetimePickerRange>();
    @Output() public selected: EventEmitter<DatetimePickerResult> = new EventEmitter<DatetimePickerResult>();

    public shortcuts: Array<DatetimePickerGroup> = [];
    public nav: Array<DatetimePickerGroup> = [];
    public currentEnd: DatetimePickerDay<any>;
    public formGroup = new FormGroup({
        start: new FormGroup({
            date: new FormControl<string>('', [ Validators.required ]),
            time: new FormGroup({
                hour: new FormControl<number>(null, [ Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.minLength(1), Validators.min(1), Validators.max(12) ]),
                minute: new FormControl<number>(null, [ Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.minLength(1), Validators.min(0), Validators.max(59) ]),
                second: new FormControl<number>(null, [ Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.minLength(1), Validators.min(0), Validators.max(59) ]),
                period: new FormControl<string>(null, Validators.required)
            })
        }),
        end: new FormGroup({
            date: new FormControl<string>(''),
            time: new FormGroup({
                hour: new FormControl<number>(null, [ Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.minLength(1), Validators.min(1), Validators.max(12) ]),
                minute: new FormControl<number>(null, [ Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.minLength(1), Validators.min(0), Validators.max(59) ]),
                second: new FormControl<number>(null, [ Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.minLength(1), Validators.min(0), Validators.max(59) ]),
                period: new FormControl<string>(null, Validators.required)
            })
        })
    });

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService, private readonly changeDetectorRef: ChangeDetectorRef) {
        // backdropService.open();
    }

    public ngOnInit() {
        this.config = new DatetimePicker(this.config);

        const start = subDays(new Date(), 1);
        const startPeriod = start.getHours() >= 12 ? 'PM' : 'AM';
        const end = new Date();
        const endPeriod = end.getHours() >= 12 ? 'PM' : 'AM';

        this.formGroup.setValue({
            start: {
                date: `${ start.getMonth() + 1 }/${ start.getDate() }/${ start.getFullYear() }`,
                time: {
                    hour: start.getHours() - 12,
                    minute: start.getMinutes(),
                    second: start.getSeconds(),
                    period: startPeriod
                }
            },
            end: {
                date: `${ end.getMonth() + 1 }/${ end.getDate() }/${ end.getFullYear() }`,
                time: {
                    hour: end.getHours() - 12,
                    minute: end.getMinutes(),
                    second: end.getSeconds(),
                    period: endPeriod
                }
            }
        });
        const days = DatetimePickerUtilities.getDaysBetween(this.range.start.date, this.range.end.date);
        // const groups: { [key: number]: Array<DatetimePickerDay<any>> } = DatetimePickerUtilities.groupBy(days, DatetimePickerMode.MONTH);
        //
        // for (let group in groups) {
        //     this.nav.push({
        //         type: DatetimePickerMode.WEEK,
        //         label: `Week ${ Number.parseInt(group) + 1 }`
        //     });
        // }
        if (this.config.mode === DatetimePickerMode.WEEK) {
            this.shortcuts = [
                {
                    type: DatetimePickerMode.WEEK,
                    label: 'Today'
                },
                {
                    type: DatetimePickerMode.WEEK,
                    label: 'Yesterday'
                }
            ];
        }

        this.changeDetectorRef.detectChanges();
    }

    public ngAfterViewInit() {
    }

    public timeShow(mode: 'start' | 'end'): void {
        setTimeout(() => {
            const instance = this.dynamicComponentFactoryService.createInContainer('datetime-picker-time', this.timeWrapper, DatetimePickerTimeComponent);
            instance.componentRef.instance.config = this.config;
            instance.componentRef.instance.mode = mode;
            instance.componentRef.instance.formGroup = this.formGroup.controls[mode].controls.time;
        }, 100);
    }

    public pad(n: number): string {
        if (n > 0) {
            return n < 10 ? '0' + n : n.toString();
        } else {
            return '00';
        }
    }

    public onSaveClick(): void {
        this.selected.emit(new DatetimePickerResult(this.formGroup.value as DatetimePickerResult));
    }
}
