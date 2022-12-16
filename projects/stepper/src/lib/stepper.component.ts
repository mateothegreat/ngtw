import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from './step';
import { StepEvent } from './step-event';

@Component({
    standalone: true,
    imports: [ CommonModule ],
    selector: 'ngtw-stepper',
    template: `
        <div class="flex gap-x-5">
            <div *ngFor="let step of steps; let i = index" [class.border-blue-600]="step.label == current.label" (click)="onLabelClick(step)" class="flex-1 cursor-pointer hover:bg-gray-100 border-b-4 px-4 py-6">
                <div class="flex">
                    <p class="text-base font-semibold leading-none text-slate-800">{{ i + 1 }}</p>
                    <span class="ml-3 text-base font-medium leading-none text-slate-800">{{ step.label }}</span>
                </div>
            </div>
        </div>
        <div class="flex justify-end py-10 gap-x-3">
            <button (click)="previous()" class="bg-gray-300 font-medium px-4 py-2.5 rounded-md text-white hover:bg-indigo-500 w-32 duration-300">Previous</button>
            <button (click)="next()" class="bg-blue-700 font-medium px-4 py-2.5 rounded-md text-white hover:bg-indigo-500 w-32 duration-300">Continue</button>
        </div>
    `,
    styles: []
})
export class StepperComponent implements OnInit {

    @Input() public current: Step;
    @Input() public steps: Step[];
    @Input() public active: number = 1;

    @Output() public changed: EventEmitter<StepEvent> = new EventEmitter();

    public ngOnInit() {
        if (!this.current) {
            this.current = this.steps[0];
        }
    }

    public onLabelClick(step: Step): void {
        this.current = step;
        this.changed.emit({ step: this.current });
    }

    public previous(): void {
        if (this.steps.indexOf(this.current) > this.steps.length - 1) {
            this.current = this.steps[this.steps.indexOf(this.current) - 1];
            this.changed.emit({ step: this.current });
        }
    }

    public next(): void {
        console.log(this.steps.indexOf(this.current));
        console.log(this.steps.length - 1);
        if (this.steps.indexOf(this.current) < this.steps.length - 1) {
            this.current = this.steps[this.steps.indexOf(this.current) + 1];
            this.changed.emit({ step: this.current });
        }
    }

}
