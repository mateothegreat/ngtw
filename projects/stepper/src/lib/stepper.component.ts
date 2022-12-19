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
            <div *ngFor="let step of steps; let i = index"
                 [style.border-bottom-width]="'5px'"
                 [style.border-bottom-color]="step.title == current.title ? '#4d46ff' : '#ededed'" (click)="onLabelClick(step)"
                 class="transform active:scale-95 transition-transform flex gap-x-4 flex-1 cursor-pointer hover:bg-gray-50 border-b-4 rounded-t-md px-1 py-6">
                <p *ngIf="numbers" class="font-semibold leading-none ml-3 text-slate-600">{{ step.number || i + 1 }}</p>
                <div class="flex flex-col">
                    <span class="text-base font-medium leading-none text-slate-600">{{ step.title }}</span>
                    <div class="text-xs mt-2 leading-none text-slate-400">{{ step.subtitle }}</div>
                </div>
            </div>
        </div>
        <ng-content></ng-content>
        <div *ngIf="navigation" class="flex justify-end py-10 gap-x-3">
            <button (click)="previous()" class="bg-gray-300 font-medium px-4 py-2.5 rounded-md text-white hover:bg-indigo-500 w-32 duration-300">Previous</button>
            <button (click)="next()" class="bg-blue-700 font-medium px-4 py-2.5 rounded-md text-white hover:bg-indigo-500 w-32 duration-300">Continue</button>
        </div>
    `,
    styles: []
})
export class StepperComponent implements OnInit {

    @Input() public navigation: boolean;
    @Input() public current: Step;
    @Input() public steps: Step[];
    @Input() public active: number = 1;
    @Input() public numbers: boolean = true;

    @Output() public changed: EventEmitter<StepEvent> = new EventEmitter();

    public ngOnInit() {
        if (!this.current) {
            this.current = this.steps[0];
        }
    }

    public onLabelClick(step: Step): void {
        if (this.current.title !== step.title) {
            this.current = step;
            this.changed.emit({ step: this.current });
        }
    }

    public previous(): void {
        if (this.steps.indexOf(this.current) > this.steps.length - 1) {
            this.current = this.steps[this.steps.indexOf(this.current) - 1];
            this.changed.emit({ step: this.current });
        }
    }

    public next(): void {
        if (this.steps.indexOf(this.current) < this.steps.length - 1) {
            this.current = this.steps[this.steps.indexOf(this.current) + 1];
            this.changed.emit({ step: this.current });
        }
    }

}
