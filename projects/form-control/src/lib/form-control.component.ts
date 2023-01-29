import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'ngtw-form-control',
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    template: `
        <div class="space-y-2">
            <div class="flex justify-between mx-0.5">
                <div class="">
                    <div class="text-md font-medium">{{ title }}</div>
                    <div class="text-sm font-medium opacity-50">{{ subtitle }}</div>
                </div>
                <div class="flex items-center">
                    <div *ngIf="required" class="text-xs font-medium text-red-400">Required</div>
                    <div *ngIf="optional" class="text-xs font-medium opacity-50">Optional</div>
                </div>
            </div>
            <input *ngIf="rows === 1" [formControl]="control" class="p-2 rounded-lg w-full border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" [placeholder]="placeholder">
            <textarea *ngIf="rows > 1" [formControl]="control"
                      [rows]="rows"
                      class="p-2 rounded-lg w-full border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" [placeholder]="placeholder"></textarea>
        </div>
        <div class="text-xs font-medium text-red-400 mt-1 text-right" *ngIf="errors && control.invalid">
            <div *ngFor="let error of (control.errors | keyvalue)">
                <div>{{ errors[error.key] }}</div>
            </div>
        </div>
    `
})
export class FormControlComponent {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() placeholder: string = '';
    @Input() required: boolean;
    @Input() focus: boolean;
    @Input() rows: number = 1;
    @Input() optional: boolean;
    @Input() control: FormControl;
    @Input() errors: { [key: string]: string };
}
