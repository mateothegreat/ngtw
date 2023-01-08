import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'ngtw-button-group',
    imports: [ CommonModule ],
    template: `
        <div class="flex gap-x-2 items-center">
            <div *ngIf="label" [ngClass]="theme.label">
                {{ label }}
            </div>
            <div [ngClass]="theme?.container"
                 class="w-fit border rounded-lg overflow-hidden">
                <button *ngFor="let button of buttons; let i = index"
                        (click)="onSelect(button)"
                        [ngClass]="button === _selected ? theme?.selected : theme?.default"
                        [class.border-l]="i > 0"
                        class="inline-flex justify-evenly px-3 py-2 items-center border-gray-300 text-md font-medium text-gray-700">
                    {{ button }}
                </button>
            </div>
        </div>
    `
})
export class ButtonGroupComponent implements OnInit {
    @Input() public selected: string;
    @Input() public label: string;
    @Input() public buttons: Array<string> = [];
    @Input() public theme: {
        label?: string
        container?: string
        default?: string
        selected?: string
    } = {
        label: 'font-sm',
        container: 'border-gray-300',
        default: 'bg-gray-100 hover:bg-blue-200',
        selected: 'bg-blue-300'
    };
    @Output() public changed: EventEmitter<string> = new EventEmitter();

    public _selected: string;

    public ngOnInit() {
        if (this.selected) {
            this._selected = this.selected;
        }
    }

    public onSelect(value: string): void {
        this._selected = value;
        this.changed.emit(value);
    }
}
