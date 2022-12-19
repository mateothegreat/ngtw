import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'ngtw-toggle',
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    template: `
        <div class="w-12 cursor-pointer relative">
            <input *ngIf="!control" type="checkbox" [name]="name" id="toggle1" class="focus:outline-none checkbox w-4 h-4 rounded-full border-2 border-gray-300 bg-white absolute m-1 shadow-sm appearance-none cursor-pointer">
            <input *ngIf="control" [formControl]="control" type="checkbox" [name]="name" [id]="name" class="focus:outline-none checkbox w-4 h-4 rounded-full border-2 border-gray-300 bg-white absolute m-1 shadow-sm appearance-none cursor-pointer">
            <label [for]="name" [ngClass]="control.value ? checked : unchecked" class="block w-12 h-6 overflow-hidden rounded-full border-2 border-slate-300 bg-gray-300 cursor-pointer"></label>
        </div>
    `,
    styles: [
        `
            .checkbox:checked {
                right: 0;
            }

            .checkbox:checked + .toggle-label {
                /*background-color: #909fff;*/
            }
        `
    ]
})
export class ToggleComponent {
    @Input() public control: FormControl;
    @Input() public unchecked: string = 'bg-slate-200';
    @Input() public checked: string = 'bg-green-200';

    public name = Math.random().toString();

}
