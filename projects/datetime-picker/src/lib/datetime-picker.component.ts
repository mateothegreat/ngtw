import { CommonModule } from '@angular/common';

import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { subDays } from 'date-fns';
import { BackdropService } from 'projects/backdrop/src/public-api';
import { DropdownComponent } from 'projects/dropdown/src/public-api';
import { DatetimeCalendarMonthComponent } from './calendar/datetime-calendar-month.component';

import { DatetimePicker } from './datetime-picker';
import { DatetimePickerDay } from './datetime-picker-day';
import { DatetimePickerGroup } from './datetime-picker-group';
import { DatetimePickerMode } from './datetime-picker-mode';
import { DatetimePickerRange } from './datetime-picker-range';
import { DatetimePickerTimeComponent } from './datetime-picker-time.component';
import { DatetimePickerUtilities } from './datetime-picker-utilities';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        DatetimePickerComponent,
        DatetimePickerTimeComponent,
        DatetimeCalendarMonthComponent,
        DropdownComponent
    ],
    selector: 'ngtw-datetime-picker',
    template: `
        <div class="h-[490px] w-[600px]">
            <div class="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <div class="w-44 p-4 border-r-2 border-gray-100 ">
                    <div class="text-md text-blue-500 cursor-pointer font-bold hover:opacity-50 mb-1.5">
                        SHORCUTS
                    </div>
                    <div class="border border-gray-50 my-3"></div>
                    <div class="text-sm text-purple-500 cursor-pointer font-medium hover:opacity-50 mb-3">
                        Last 5 minutes
                    </div>
                    <div *ngFor="let shortcut of shortcuts"
                         class="text-md text-blue-500 cursor-pointer font-bold hover:opacity-50 mb-1.5">
                        {{ shortcut.label }}
                    </div>
                    <div class="border border-gray-50 my-3"></div>
                    <div *ngFor="let n of nav"
                         class="text-sm text-purple-500 cursor-pointer font-medium hover:opacity-50 mb-3">
                        {{ n.label }}
                    </div>
                </div>
                <div class="h-[490px] flex flex-1 flex-col p-3">
                    <ng-container #timeWrapperContainer></ng-container>
                    <ngtw-datetime-calendar-month [config]="config"
                                                  [range]="range"
                                                  [(selected)]="range"
                                                  [onSelected]="onSelected"
                                                  [timeWrapper]="timeWrapper"
                                                  [formGroup]="formGroup"
                                                  class="flex-1 border-b mb-4"></ngtw-datetime-calendar-month>
                    <div class="flex justify-end gap-x-1">
                        <div class="bg-slate-200 text-md border-2 border-gray-300 rounded-lg px-2 py-0.5">
                            <span class="font-medium mr-1">{{ formGroup.controls.start.value.date }}</span>
                        </div>
                        <div (click)="timeShow('start')" class="bg-slate-200 text-md border-2 border-gray-300 rounded-lg px-2 py-0.5 cursor-pointer hover:bg-indigo-200 hover:border-gray-400 transform active:scale-90 disabled:active:scale-100 transition-transform">
                           <span class="font-medium mr-1">
                               {{ formGroup.controls.start.value.time.hour }}:
                               {{ formGroup.controls.start.value.time.minute }}:
                               {{ formGroup.controls.start.value.time.seconds }}
                            </span>
                            <span class="text-sm">
                                {{ formGroup.controls.start.value.time.period }}
                            </span>
                        </div>
                        <div class="text-gray-400">
                            to
                        </div>
                        <div class="bg-slate-200 text-md border-2 border-gray-300 rounded-lg px-2 py-0.5">
                            <span class="font-medium mr-1">{{ formGroup.controls.end.value.date }}</span>
                        </div>
                        <div (click)="timeShow('end')" class="bg-slate-200 text-md border-2 border-gray-300 rounded-lg px-2 py-0.5 cursor-pointer hover:bg-indigo-200 hover:border-gray-400 transform active:scale-90 disabled:active:scale-100 transition-transform">
                            <span class="font-medium mr-1">
                                {{ formGroup.controls.end.value.time.hour }}:
                                {{ formGroup.controls.end.value.time.minute }}:
                                {{ formGroup.controls.end.value.time.seconds }}
                            </span>
                            <span class="text-sm">
                                {{ formGroup.controls.end.value.time.period }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class DatetimePickerComponent implements OnInit, AfterViewInit {
    @ViewChild('timeWrapperContainer', { read: ViewContainerRef }) public timeWrapper: ViewContainerRef;

    @Input() public config: DatetimePicker<any>;
    @Input() public range: DatetimePickerRange;
    @Input() public current: Date;

    @Output() public onSelected: EventEmitter<DatetimePickerRange> = new EventEmitter<DatetimePickerRange>();
    @Output() public selected: EventEmitter<DatetimePickerRange> = new EventEmitter<DatetimePickerRange>();

    public shortcuts: Array<DatetimePickerGroup> = [];
    public nav: Array<DatetimePickerGroup> = [];
    public currentEnd: DatetimePickerDay<any>;
    public formGroup = new FormGroup({
        start: new FormGroup({
            date: new FormControl(),
            time: new FormGroup({
                hour: new FormControl(),
                minute: new FormControl(),
                seconds: new FormControl(),
                period: new FormControl()
            })
        }),
        end: new FormGroup({
            date: new FormControl(),
            time: new FormGroup({
                hour: new FormControl(),
                minute: new FormControl(),
                seconds: new FormControl(),
                period: new FormControl()
            })
        })
    });

    public constructor(private readonly backdropService: BackdropService,
                       private readonly dynamicComponentFactoryService: DynamicComponentFactoryService,
                       private readonly changeDetectorRef: ChangeDetectorRef) {
        // backdropService.open();
        this.onSelected.subscribe(a => {
            this.selected.emit(a);
        });
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
                    minute: start.getMinutes() < 10 ? '0' + start.getMinutes() : start.getMinutes(),
                    seconds: start.getSeconds() < 10 ? '0' + start.getSeconds() : start.getSeconds(),
                    period: startPeriod
                }
            },
            end: {
                date: `${ end.getMonth() + 1 }/${ end.getDate() }/${ end.getFullYear() }`,
                time: {
                    hour: end.getHours() - 12,
                    minute: end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes(),
                    seconds: end.getSeconds() < 10 ? '0' + end.getSeconds() : end.getSeconds(),
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
            instance.componentRef.instance.formGroup = this.formGroup.controls[mode];
        }, 100);
    }
}
