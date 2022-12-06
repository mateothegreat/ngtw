import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'ngtw-range',
    standalone: true,
    imports: [ CommonModule ],
    template: `
        <div class="flex justify-center text-center text-sm">

            <div class="w-20 text-center font-bold text-lg p-1 rounded mb-2"
                 [ngClass]="labelClasses">

                {{ input.value }}

            </div>

        </div>

        <input #input
               style="width: 100%"
               class="w-full accent-indigo-600"
               [ngClass]="inputClasses"
               type="range"
               [value]="value"
               [min]="min"
               [max]="max"
               [step]="step"

               (click)="onClick()"
               (input)="onChange(input.value)">

        <div class="flex text-center text-sm">

            <div [ngClass]="minClasses" class="">

                {{ min }}

            </div>

            <div [ngClass]="textClasses" class="flex-1">

                {{ text }}

            </div>

            <div [ngClass]="maxClasses" class="">

                {{ max }}

            </div>

        </div>
    `
})
export class RangeComponent implements OnInit {

    @Input() text: string;
    @Input() min: number;
    @Input() max: number;
    @Input() step: number;
    @Input() showMinMax: boolean;
    @Input() labelClasses: string;
    @Input() inputClasses: string;
    @Input() minClasses: string;
    @Input() textClasses: string;
    @Input() maxClasses: string;
    @Input() value$: Subject<number>;
    @Input() control: FormControl;

    @Input() public value: number;

    public constructor(private readonly changeDetectorRef: ChangeDetectorRef) {

    }

    public ngOnInit() {

        this.changeDetectorRef.detectChanges();
        
        if (this.control) {

            this.value = this.control.value;

        }

    }

    public onChange(value: string): void {

        this.value = Number.parseInt(value);

    }

    public onClick(): void {

        if (this.value$) {

            this.value$.next(this.value);

        }

        if (this.control) {

            this.control.setValue(this.value);

        }

    }

}
