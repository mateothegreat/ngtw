import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Breadcrumb } from './breadcrumb';

@Component({
    standalone: true,
    selector: 'ngtw-breadcrumbs',
    imports: [ CommonModule, RouterLink, RouterLinkActive ],
    template: `
        <div class="flex" aria-label="Breadcrumb">
            <ol role="list" class="flex items-center space-x-1"
                [ngClass]="classes">
                <li *ngIf="home">
                    <div>
                        <a href="#" class="text-slate-400 hover:text-gray-500">
                            <!-- Heroicon name: mini/home -->
                            <svg class="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd"/>
                            </svg>
                            <span class="sr-only">Home</span>
                        </a>
                    </div>
                </li>

                <li *ngFor="let item of items">
                    <div class="flex items-center">
                        <svg class="h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/>
                        </svg>
                        <a [routerLink]="item.path"
                           routerLinkActive="text-violet-600 font-medium"
                           [ngClass]="item.active ? 'text-violet-600 font-medium' : 'text-gray-500 hover:text-gray-700'"
                           class="ml-1 text-slate-400 hover:text-gray-700">
                            {{ item.label }}
                        </a>
                    </div>
                </li>
            </ol>
        </div>
    `
})
export class BreadcrumbsComponent {
    @Input() public items: Breadcrumb[];
    @Input() public home: string;
    @Input() public classes: string = 'text-sm';
}
