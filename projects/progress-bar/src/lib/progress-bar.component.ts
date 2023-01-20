import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    imports: [ CommonModule ],
    selector: 'ngtw-progress-bar',
    template: `
        <div class="relative pt-1 w-full flex flex-col">
            <div *ngIf="header" class="mb-2">
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase" [ngClass]="[text, color, rounded]">
                    {{ header }}
                </span>
            </div>
            <div>
                <div *ngIf="legend" class="absolute mt-0.5 font-medium" [style.left]="align === 'left' ? '-36px' : ''" [style.right]="align === 'right' ? '-36px' : ''">{{ value }}%</div>
                <div class="flex-1 w-full overflow-hidden flex w-full items-center justify-between" [style.height]="height" [ngClass]="[background, rounded]">
                    <div class="absolute flex w-full items-center p-0.5 justify-between" [ngClass]="text">
                        <div class="mx-2">
                            {{ left }}
                        </div>
                        <div *ngIf="right" [ngClass]="text + ' invert text-opacity-50'" class="mx-2">
                            {{ right }}
                        </div>
                    </div>
                    <div class="w-full">
                        <div [style]="'width: ' + value + '%'" [style.height]="height" class="flex flex-col text-center whitespace-nowrap text-white justify-center" [ngClass]="color"></div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class ProgressBarComponent {
    @Input() label: string;
    @Input() align: 'left' | 'right' = 'right';
    @Input() header: string;
    @Input() value: number;
    @Input() height: string = '20px';
    @Input() rounded?: string = 'rounded-lg';
    @Input() color: string = 'bg-teal-600';
    @Input() text: string = 'text-white';
    @Input() background: string = 'bg-teal-300';
    @Input() left?: string;
    @Input() right?: string;
    @Input() legend: boolean = true;
}
