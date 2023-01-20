import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [
        CommonModule
    ],
    selector: 'ngtw-notice',
    template: `
        <div class="bg-white shadow-md border border-gray-100 overflow-hidden rounded-lg">
            <div class="px-4 py-4 text-lg font-medium leading-6 text-slate-600">
                <app-icon [name]="icon" [width]="iconWidth">
                    <div class="w-full">
                        <div class="">{{ title }}</div>
                        <div class="mt-1 flex items-start justify-between">
                            <div class="max-w-xl text-sm text-slate-400">
                                <p *ngFor="let text of subtitle">
                                    {{ text }}
                                </p>
                                <ng-content></ng-content>
                            </div>
                            <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
                                <button (click)="onButtonClick()" [ngClass]="color" class="transform active:scale-95 disabled:active:scale-100 transition-transform inline-flex items-center rounded-md border border-transparent px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">
                                    {{ label }}
                                </button>
                            </div>
                        </div>
                    </div>
                </app-icon>
            </div>
        </div>
    `
})
export class NoticeComponent {

}
