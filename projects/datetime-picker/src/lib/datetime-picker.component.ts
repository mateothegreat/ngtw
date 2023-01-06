import { CommonModule } from '@angular/common';

import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { subDays } from 'date-fns';
import { BackdropService } from 'projects/backdrop/src/public-api';
import { DropdownComponent } from 'projects/dropdown/src/public-api';
import { DatetimePickerResult } from '../datetime-picker-result';
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
    imports: [ CommonModule, DatetimePickerComponent, DatetimePickerTimeComponent, DatetimeCalendarMonthComponent, DropdownComponent ],
    selector: 'ngtw-datetime-picker',
    template: `
        <div class="h-[490px] w-[820px]">
            <div class="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <div class="w-44 flex flex-col p-2 border-r-2 border-gray-100 ">
                    <div class="flex-1">
                        <div class="flex items-center justify-evenly gap-x-2 text-md text-slate-500 cursor-pointer font-semibold">
                            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">
                                <g id="Schedule">
                                    <polyline style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="&#10;&#9;&#9;372,332 372,372 412,372 &#9;"/>
                                    <circle style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" cx="372" cy="372" r="120"/>
                                    <polyline style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="&#10;&#9;&#9;179.999,380 20,380 20,60 460,60 460,196.703 &#9;"/>
                                    <line style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="380" y1="20" x2="380" y2="60"/>
                                    <line style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="240" y1="20" x2="240" y2="60"/>
                                    <line style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="20" x2="100" y2="60"/>
                                    <line style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="140" x2="140" y2="140"/>
                                    <line style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="220" y1="140" x2="260" y2="140"/>
                                    <line style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="340" y1="140" x2="380" y2="140"/>
                                    <line style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="220" y1="220" x2="260" y2="220"/>
                                    <line style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="220" x2="140" y2="220"/>
                                    <line style="fill:none;stroke:#000000;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="300" x2="140" y2="300"/>
                                </g>
                            </svg>
                            Select dates
                        </div>
                        <div class="border border-gray-50 my-3"></div>
                        <div class="flex flex-col gap-y-2 text-xs text-purple-500 font-medium mb-3">
                            <div class="cursor-pointer font-medium hover:font-bold">Last 5 minutes</div>
                            <div class="cursor-pointer font-medium hover:font-bold">Last 15 minutes</div>
                            <div class="cursor-pointer font-medium hover:font-bold">Last 60 minutes</div>
                            <div class="cursor-pointer font-medium hover:font-bold">Last hour</div>
                            <div class="cursor-pointer font-medium hover:font-bold">Past hour</div>
                        </div>
                        <div *ngFor="let shortcut of shortcuts" class="text-md text-blue-500 cursor-pointer font-bold hover:opacity-50 mb-1.5">
                            {{ shortcut.label }}
                        </div>
                        <div class="border border-gray-50 my-3"></div>
                        <div *ngFor="let n of nav" class="text-sm text-purple-500 cursor-pointer font-medium hover:opacity-50 mb-3">
                            {{ n.label }}
                        </div>
                    </div>
                    <div class="rounded-lg bg-violet-300 border border-violet-400 p-2 text-xs text-gray-600">
                        <p class="font-bold">Did you know?</p>
                        <p>
                            asdf asd f asd fas df as df asd fadfsadfadfasf asdfasdf s
                            asdf asd f asd fas df as df asd fadfsadfadfasf asdfasdf s
                        </p>
                    </div>
                </div>
                <div class="h-[490px] flex flex-1 flex-col p-3">
                    <ng-container #timeWrapperContainer></ng-container>
                    <ngtw-datetime-calendar-month [config]="config" [range]="range" [(selected)]="range" [onSelected]="onSelected" [timeWrapper]="timeWrapper" [formGroup]="formGroup" class="flex-1 border-b mb-4"></ngtw-datetime-calendar-month>
                    <div class="flex justify-evenly gap-x-1">
                        <div class="bg-slate-200 text-md border-2 border-gray-300 rounded-lg px-2 py-0.5">
                            <span class="font-medium mr-1">{{ formGroup.controls.start.value.date }}</span>
                        </div>
                        <div (click)="timeShow('start')" class="bg-slate-200 text-md border-2 border-gray-300 rounded-lg px-2 py-0.5 cursor-pointer hover:bg-indigo-200 hover:border-gray-400 transform active:scale-90 disabled:active:scale-100 transition-transform">
                            <span class="font-medium"> {{ formGroup.controls.start.value.time.hour }}:{{ pad(formGroup.controls.start.value.time.minute) }}:{{ pad(formGroup.controls.start.value.time.second) }} </span>
                            <span class="text-sm">
                                {{ formGroup.controls.start.value.time.period }}
                            </span>
                        </div>
                        <div class="text-gray-400">to</div>
                        <div class="bg-slate-200 text-md border-2 border-gray-300 rounded-lg px-2 py-0.5">
                            <span class="font-medium mr-1">{{ formGroup.controls.end.value.date }}</span>
                        </div>
                        <div (click)="timeShow('end')" class="bg-slate-200 text-md border-2 border-gray-300 rounded-lg px-2 py-0.5 cursor-pointer hover:bg-indigo-200 hover:border-gray-400 transform active:scale-90 disabled:active:scale-100 transition-transform">
                            <span class="font-medium"> {{ formGroup.controls.end.value.time.hour }}:{{ pad(formGroup.controls.end.value.time.minute) }}:{{ pad(formGroup.controls.end.value.time.second) }}</span>
                            <span class="text-sm">
                                {{ formGroup.controls.end.value.time.period }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="w-44 flex flex-col p-2 border-l-2 border-gray-100 ">
                    <div class=""></div>
                    <div class="flex-1"></div>
                    <div class="">
                        <div (click)="onSaveClick()" class="w-full cursor-pointer inline-flex justify-center items-center rounded-md border border-transparent disabled:bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" [class.bg-indigo-500]="formGroup.valid" [class.bg-gray-400]="!formGroup.valid">Save selection</div>
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

    public constructor(private readonly backdropService: BackdropService, private readonly dynamicComponentFactoryService: DynamicComponentFactoryService, private readonly changeDetectorRef: ChangeDetectorRef) {
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
