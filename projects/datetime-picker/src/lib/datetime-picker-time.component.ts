import { CommonModule } from '@angular/common';

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonGroupComponent } from '@ngtw/button-group';
import { DropdownComponent } from '@ngtw/dropdown';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';

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
    templateUrl: './datetime-picker-time.component.html'
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
