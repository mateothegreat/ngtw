import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'ngtw-button-group',
    imports: [ CommonModule ],
    template: `
        <div class="flex gap-x-2 items-center">
            <div *ngIf="label" class="font-sm">
                {{ label }}
            </div>
            <div class="w-fit border rounded-lg overflow-hidden">
                <button *ngFor="let button of buttons; let i = index"
                        (click)="selectedChange.emit(button); selected = button"
                        [ngClass]="button === selected ? theme?.selected : theme?.default"
                        [class.border-l]="i > 0"
                        class="inline-flex items-center border-gray-300 px-5 py-3 text-sm font-medium text-gray-700">
                    {{ button }}
                </button>
            </div>
        </div>
    `
})
export class ButtonGroupComponent {
    @Input() public label: string;
    @Input() public buttons: Array<string> = [];
    @Input() public theme: {
        default?: string
        selected?: string
    } = {
        default: 'bg-gray-100 hover:bg-blue-200',
        selected: 'bg-blue-300'
    };
    @Output() public selectedChange: EventEmitter<string> = new EventEmitter();

    @Input() public selected: string;
}
