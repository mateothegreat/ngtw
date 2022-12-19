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
        <div class="cursor-pointer relative"
             style="width: 50px">
            <input *ngIf="!control" type="checkbox"
                   [name]="name"
                   id="toggle1"
                   class="focus:outline-none checkbox rounded-full border-2 border-gray-300 bg-white absolute m-1 shadow-sm appearance-none cursor-pointer"
                   style="width: 26px; height: 26px; margin-top: -1px">
            <input *ngIf="control"
                   [formControl]="control"
                   type="checkbox"
                   [name]="name"
                   [id]="name"
                   class="focus:outline-none checkbox rounded-full border-2 border-gray-300 bg-white absolute shadow-sm appearance-none cursor-pointer"
                   style="width: 26px; height: 26px; margin-top: -1px">
            <label [for]="name"
                   [ngClass]="control.value ? checked : unchecked"
                   class="block overflow-hidden rounded-full border-2 border-slate-300 bg-gray-300 cursor-pointer"
                   style="width: 50px; height: 24px"></label>
        </div>
    `,
    styles: [
        `
            .checkbox:checked {
                right: 0;
            }
        `
    ]
})
export class ToggleComponent {
    @Input() public control: FormControl;
    @Input() public unchecked: string = 'bg-slate-200';
    @Input() public checked: string = 'bg-green-200 border-green-400';

    public name = Math.random().toString();

}
