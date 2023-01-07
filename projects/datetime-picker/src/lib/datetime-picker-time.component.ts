import { CommonModule } from '@angular/common';

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '@ngtw/dropdown';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { ButtonGroupComponent } from 'button-group';

import { DatetimePicker } from './datetime-picker';
import { DatetimePickerRange } from './datetime-picker-range';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ButtonGroupComponent,
        DropdownComponent,
        ReactiveFormsModule
    ],
    selector: 'ngtw-datetime-time-picker',
    template: `
        <div class="h-[365px] w-[420px] absolute flex items-center justify-center rounded-lg backdrop-blur-sm">
            <div class="flex flex-col items-end gap-y-2 bg-white rounded-lg p-4 shadow-xl border">
                <div class="text-gray-800 text-right">
                    Select <span class="text-green-500 font-bold">{{ mode }}</span> time:
                </div>

                <form [formGroup]="formGroup">
                    <div class="flex gap-x-2 items-center">
                        <div class="flex flex-col items-center text-2xl">
                            <button (click)="increment('hour')" class="fill-gray-300 cursor-pointer hover:fill-blue-400 transform active:scale-75 disabled:active:scale-100 transition-transform">
                                <svg class="w-10 h-10 rotate-180" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12 17c-.5 0-1-.2-1.3-.6l-4.2-5.1c-.5-.7-.6-1.5-.3-2.2s.9-1.1 1.6-1.1h8.4c.7 0 1.3.4 1.6 1.1s.2 1.6-.3 2.2l-4.2 5.1c-.3.4-.8.6-1.3.6z"/>
                                </svg>
                            </button>
                            <div class="">
                                <input #hour formControlName="hour" autofocus value="12" maxlength="2" class="w-16 text-center text-2xl border-0 border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none">
                            </div>
                            <div class="text-xs text-gray-300 pt-1">
                                HOUR
                            </div>
                            <button class="fill-gray-300 cursor-pointer hover:fill-blue-400 transform active:scale-75 disabled:active:scale-100 transition-transform">
                                <svg class="w-10 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12 17c-.5 0-1-.2-1.3-.6l-4.2-5.1c-.5-.7-.6-1.5-.3-2.2s.9-1.1 1.6-1.1h8.4c.7 0 1.3.4 1.6 1.1s.2 1.6-.3 2.2l-4.2 5.1c-.3.4-.8.6-1.3.6z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="text-lg text-gray-400">
                            :
                        </div>
                        <div class="flex flex-col items-center text-2xl">
                            <button (click)="increment('minute')" class="fill-gray-300 cursor-pointer hover:fill-blue-400 transform active:scale-75 disabled:active:scale-100 transition-transform">
                                <svg class="w-10 h-10 rotate-180" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12 17c-.5 0-1-.2-1.3-.6l-4.2-5.1c-.5-.7-.6-1.5-.3-2.2s.9-1.1 1.6-1.1h8.4c.7 0 1.3.4 1.6 1.1s.2 1.6-.3 2.2l-4.2 5.1c-.3.4-.8.6-1.3.6z"/>
                                </svg>
                            </button>
                            <div class="">
                                <input #minute formControlName="minute" value="00" maxlength="2" class="w-16 text-center text-2xl border-0 border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none">
                            </div>
                            <div class="text-xs text-gray-300 pt-1">
                                MINUTE
                            </div>
                            <button class="fill-gray-300 cursor-pointer hover:fill-blue-400 transform active:scale-75 disabled:active:scale-100 transition-transform">
                                <svg class="w-10 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12 17c-.5 0-1-.2-1.3-.6l-4.2-5.1c-.5-.7-.6-1.5-.3-2.2s.9-1.1 1.6-1.1h8.4c.7 0 1.3.4 1.6 1.1s.2 1.6-.3 2.2l-4.2 5.1c-.3.4-.8.6-1.3.6z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="text-lg text-gray-400">
                            :
                        </div>
                        <div class="flex flex-col items-center text-2xl">
                            <button (click)="increment('second')" class="fill-gray-300 cursor-pointer hover:fill-blue-400 transform active:scale-75 disabled:active:scale-100 transition-transform">
                                <svg class="w-10 h-10 rotate-180" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12 17c-.5 0-1-.2-1.3-.6l-4.2-5.1c-.5-.7-.6-1.5-.3-2.2s.9-1.1 1.6-1.1h8.4c.7 0 1.3.4 1.6 1.1s.2 1.6-.3 2.2l-4.2 5.1c-.3.4-.8.6-1.3.6z"/>
                                </svg>
                            </button>
                            <div class="">
                                <input #second formControlName="second" value="00" maxlength="2" class="w-16 text-center text-2xl border-0 border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none">
                            </div>
                            <div class="text-xs text-gray-300 pt-1">
                                SECOND
                            </div>
                            <button class="fill-gray-300 cursor-pointer hover:fill-blue-400 transform active:scale-75 disabled:active:scale-100 transition-transform">
                                <svg class="w-10 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12 17c-.5 0-1-.2-1.3-.6l-4.2-5.1c-.5-.7-.6-1.5-.3-2.2s.9-1.1 1.6-1.1h8.4c.7 0 1.3.4 1.6 1.1s.2 1.6-.3 2.2l-4.2 5.1c-.3.4-.8.6-1.3.6z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <ngtw-button-group [buttons]="['AM', 'PM']" [selected]="formGroup.value.period"></ngtw-button-group>
                    </div>
                    <div class="mt-4 w-full">
                        <div (click)="onSaveClick()"
                             class="w-full cursor-pointer inline-flex justify-center items-center rounded-md border border-transparent disabled:bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                             [class.bg-indigo-500]="formGroup.valid"
                             [class.bg-gray-400]="!formGroup.valid">
                            Save selection
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
})
export class DatetimePickerTimeComponent<T> implements AfterViewInit {
    @ViewChild('hour') hour: ElementRef<HTMLInputElement>;
    @ViewChild('minute') minute: ElementRef<HTMLInputElement>;
    @ViewChild('second') second: ElementRef<HTMLInputElement>;

    @Input() public formGroup: FormGroup;

    public mode: 'start' | 'end';
    private elements: {
        [key: string]: {
            element: ElementRef<HTMLInputElement>,
            min: number,
            max: number
        }
    };

    @Input() config: DatetimePicker<T>;
    @Input() range: DatetimePickerRange;

    @Output() rangeChange = new EventEmitter<DatetimePickerRange>();

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService) {

    }

    public ngAfterViewInit() {
        console.log(this.formGroup);
        console.log(this.hour.nativeElement.value);
        this.formGroup.valueChanges.subscribe((value) => {
            console.log(this.formGroup.valid);
            console.log(value);
        });
        this.elements = {
            hour: {
                element: this.hour,
                min: 1,
                max: 12
            },
            minute: {
                element: this.minute,
                min: 0,
                max: 59
            },
            second: {
                element: this.second,
                min: 0,
                max: 59
            }
        };
    }

    public increment(element: 'hour' | 'minute' | 'second'): void {

        const current = Number.parseInt(this.elements[element].element.nativeElement.value);

        if (current >= this.elements[element].min && current + 1 <= this.elements[element].max) {
            this.formGroup.controls[element].setValue(current + 1);
            this.elements[element].element.nativeElement.value = (current + 1).toString();
        } else {
            this.formGroup.controls[element].setValue(this.elements[element].min);
            this.elements[element].element.nativeElement.value = this.elements[element].min.toString();
        }

    }

    public onSaveClick(): void {
        this.dynamicComponentFactoryService.destroy('datetime-picker-time');
    }

}
