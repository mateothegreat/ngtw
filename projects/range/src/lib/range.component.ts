import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

        <div class="flex justify-between">

            <div *ngIf="minLabel || showMinMax" class="" [ngClass]="minClasses">

                {{ minLabel || min }}

            </div>

            <div [ngClass]="textClasses" class="" style="flex: 1">

                {{ text }}

            </div>

            <div *ngIf="maxLabel || showMinMax" class="=" [ngClass]="maxClasses">

                {{ maxLabel || max }}

            </div>

        </div>
    `
})
export class RangeComponent implements OnInit {

    @Input() public text: string;
    @Input() public min: number;
    @Input() public max: number;
    @Input() public step: number;
    @Input() public showMinMax: boolean;
    @Input() public labelClasses: string;
    @Input() public inputClasses: string;
    @Input() public minClasses: string;
    @Input() public minLabel: string;
    @Input() public textClasses: string;
    @Input() public maxClasses: string;
    @Input() public maxLabel: string;
    @Input() public value$: Subject<number>;
    @Input() public control: FormControl;
    @Input() public value: number;

    @Output() valueChange: EventEmitter<number> = new EventEmitter();

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

        this.valueChange.emit(this.value);

    }

}
