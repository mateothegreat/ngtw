import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Tab } from './tab';

@Component({
    standalone: true,
    imports: [ CommonModule, RouterLinkActive, RouterLink ],
    selector: 'ngtw-tabs',
    template: `
        <div class="block sm:hidden md:block">
            <div [style.border-bottom-width]="theme?.border?.width || '4px'"
                 class="border-slate-200 text-sm">
                <nav class="flex overflow-scroll"
                     [style.margin-bottom]="'-' + (theme?.border?.width || '4px')">
                    <button *ngFor="let tab of tabs; let i = index"
                            [disabled]="tab.disabled"
                            [class.flex-1]="stretch"
                            [class.justify-center]="stretch"
                            [ngClass]="tab.label == active?.label ? 'border-indigo-600 hover:text-indigo-600 text-indigo-600' : 'text-gray-500'"
                            [style.border-bottom-width]="theme?.border?.width || '4px'"
                            (click)="clicked.emit(tab); active = tab"
                            [routerLink]="tab.path"
                            routerLinkActive="border-indigo-600 hover:text-indigo-600 text-indigo-600"
                            class="transform active:scale-95 disabled:active:scale-100 transition-transform flex items-center cursor-pointer text-slate-600 hover:text-indigo-600 hover:border-indigo-400 disabled:hover:border-transparent disabled:text-slate-300 flex px-4 py-4 font-medium">
                        {{ tab.label }}
                        <span *ngIf="tab.badge" class="bg-slate-200 text-indigo-700 py-1 px-2.5 rounded-full text-xs"
                              style="margin-left: 8px">
                            {{ tab.badge }}
                        </span>
                    </button>
                </nav>
            </div>
        </div>
        <div class="hidden sm:block">
            <select name="tabs" class="w-full rounded-md border-slate-300 sm:text-sm">
                <option *ngFor="let tab of tabs"
                        [disabled]="tab.disabled"
                        [selected]="active?.label == tab.label"
                        (click)="clicked.emit(tab); active = tab">
                    {{ tab.label }}
                    <ng-container *ngIf="tab.badge" class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ({{ tab.badge }})
                    </ng-container>
                </option>
            </select>
        </div>
    `
})
export class TabsComponent {
    @Input() public tabs: Tab[];
    @Input() public active: Tab;
    @Input() public stretch: boolean;
    @Input() public theme: {
        background?: string,
        active?: string,
        border?: {
            width?: string
        }
    };

    @Output() public clicked: EventEmitter<Tab> = new EventEmitter();
}
