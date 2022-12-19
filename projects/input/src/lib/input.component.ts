import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'ngtw-input',
    imports: [ CommonModule, ReactiveFormsModule ],
    template: `
        <div *ngIf="title || subtitle" class="flex flex-col mb-3">
            <div *ngIf="subtitle" class="text-md font-medium text-gray-700">{{ title }}</div>
            <div *ngIf="subtitle" class="text-xs text-gray-400">{{ subtitle }}</div>
        </div>
        <div class="mt-1 flex rounded-md shadow-sm">
            <span *ngIf="left" class="inline-flex items-center rounded-l-lg border border-2 border-gray-200 bg-gray-100 px-2 text-gray-500 font-bold">{{ left }}</span>
            <input #input [placeholder]="placeholder" [formControl]="control" [class.border-x-2]="!left && !right" [class.rounded-lg]="!left && !right" [class.border-r-2]="left" [class.border-l-2]="right" class="placeholder-gray-300 p-3 block w-full flex-1 border-y-2 border-gray-200">
            <span *ngIf="right" class="inline-flex items-center rounded-r-lg border border-r-0 border-2 border-gray-200 bg-gray-100 px-2 text-gray-500 font-bold">{{ right }}</span>
        </div>
        <div *ngIf="helper" [ngClass]="helper.class" class="flex items-center justify-end text-sm text-gray-400 font-bold mt-1.5 mr-1">
            <svg *ngIf="helper.type === 'info'" class="w-5 h-5 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#21F363" d="M9.7 19.12c-.19.18-.45.29-.71.29 -.266 0-.52-.11-.71-.3L2.63 13.46c-.59-.59-.59-1.54 0-2.13l.7-.71c.58-.59 1.53-.59 2.12 0l3.52 3.52 9.525-9.525c.58-.59 1.53-.59 2.12 0l.7.7c.58.58.58 1.53 0 2.12Z"/>
                <path fill="#28E463" d="M4.414 10.2c-.39 0-.77.14-1.061.44l-.71.7c-.59.58-.59 1.53 0 2.12l5.646 5.64c.18.18.44.29.7.29 .266 0 .52-.11.7-.3l2.29-2.3v-5.66l-3 3 -3.53-3.53c-.3-.3-.68-.44-1.061-.44Z"/>
            </svg>
            <svg *ngIf="helper.type === 'error'" class="w-5 h-5 mr-1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FF6B6B" d="M471.929 480.979H40.07c-30.89 0-50.14-33.48-34.56-60.18L221.43 50.86c15.42-26.43 53.649-26.48 69.1 0L506.45 420.8c15.56 26.67-3.64 60.17-34.56 60.17Z"/>
                <path fill="#EE5253" d="M250.77 67.98L34.84 437.91c-2.37 4.04.53 9.09 5.22 9.09h431.855c4.68 0 7.59-5.05 5.22-9.1L261.208 67.96c-2.34-4.01-8.1-4.03-10.45-.001Z"/>
                <g fill="#E4EAF8">
                    <path d="M256.1 358.131c9.98 0 18.411 8.3 18.411 18.13 0 9.7-8.44 17.89-18.411 17.89 -10.28 0-18.63-8.03-18.63-17.9 0-9.83 8.53-18.14 18.62-18.14Z"/>
                    <path d="M256.1 330.134c-10.33 0-17.55-5.01-17.55-12.17v-101.15c0-5.99 7.05-12.41 17.54-12.41 9.46 0 17.76 5.79 17.76 12.4v101.14c0 7.04-7.47 12.16-17.77 12.16Z"/>
                </g>
                <path fill="#EE5253" d="M26.12 420.805L242.04 50.87c5.46-9.37 14.14-15.88 24.25-18.52 -16.85-4.41-35.36 2.23-44.86 18.52L5.5 420.805c-15.57 26.67 3.64 60.17 34.55 60.17h20.6c-30.89-.01-50.134-33.49-34.56-60.18Z"/>
                <path fill="#E24951" d="M55.45 437.922L266.3 76.68l-5.08-8.7c-2.35-4.02-8.11-4.02-10.45 0L34.84 437.92c-2.37 4.04.53 9.09 5.22 9.09h20.6c-4.69 0-7.6-5.05-5.23-9.1Z"/>
                <g fill="#D8DCE5">
                    <path d="M258.087 376.26c0-6.13 3.31-11.67 8.26-14.97 -2.95-2-6.49-3.17-10.25-3.17 -10.1 0-18.63 8.3-18.63 18.13 0 9.86 8.35 17.89 18.62 17.89 3.72 0 7.23-1.15 10.17-3.08 -4.95-3.23-8.2-8.66-8.2-14.82Z"/>
                    <path d="M259.17 317.96V216.81c0-3.7 2.69-7.55 7.21-9.96 -2.95-1.52-6.52-2.45-10.28-2.45 -10.5 0-17.55 6.41-17.55 12.4v101.14c0 7.16 7.21 12.16 17.54 12.16 3.93 0 7.44-.76 10.29-2.07 -4.51-2.12-7.24-5.7-7.24-10.1Z"/>
                </g>
            </svg>
            {{ helper.text }}
        </div>
    `,
    styles: []
})
export class InputComponent implements OnInit, AfterViewInit {
    @ViewChild('input', { read: ElementRef }) private input: ElementRef;

    @Input() public title: string;
    @Input() public subtitle: string;
    @Input() public left: string;
    @Input() public right: string;
    @Input() public focus: boolean;
    @Input() public placeholder: string;
    @Input() public helper: { class: string, text: string, type: 'info' | 'warning' | 'error' };
    @Input() public control: FormControl;

    public ngOnInit() {
        if (this.control) {
            this.control.valueChanges.subscribe((value) => {
                if (this.control.errors) {
                    this.helper = { type: 'error', class: 'text-red-500', text: 'Invalid' };
                } else {
                    this.helper = { type: 'info', class: 'text-green-500', text: 'Valid' };
                }
            });
        }
    }

    public ngAfterViewInit(): void {
        if (this.focus) {
            this.setFocus();
        }
    }

    public setFocus(): void {
        this.input.nativeElement.focus();
    }
}

