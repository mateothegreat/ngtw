import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { AccordionTab } from './accordion-tab';

@Component({
    standalone: true,
    imports: [ CommonModule ],
    selector: 'ngtw-accordion-tab',
    template: `

        <div class="group bg-gray-200 flex justify-between px-4 py-3 items-center text-gray-500 transition ease duration-500 cursor-pointer pr-10 relative">

            <div class="group-focus:text-gray-700 transition ease duration-500 font-medium group-focus:font-bold"
                 [ngClass]="tab.titleClasses">

                {{ tab.title }}

            </div>

            <div class="h-8 w-8 items-center inline-flex justify-center transform transition ease duration-500 group-focus:text-gray-300 group-focus:-rotate-180 absolute top-0 right-0 mb-auto ml-auto mt-2 mr-2">

                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">

                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>

                </svg>

            </div>

        </div>

        <div class="group-focus:max-h-screen max-h-0 bg-gray-100 ease duration-500 overflow-scroll"
             [style.height]="tab.height">

            <ng-container *ngIf="tab.component"
                          #content
                          [style.color]="tab.color || '#888'"></ng-container>

            <div *ngIf="!tab.component"
                 class="border-t-2 py-2 px-4 text-gray-600 text-justify break-words"
                 [ngClass]="tab.contentClasses">

                {{ tab.content }}

            </div>

        </div>

    `

})
export class AccordionTabComponent implements AfterViewInit {

    @ViewChild('content', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

    @Input() tab: AccordionTab;

    public ngAfterViewInit() {

        if (this.tab.component) {

            this.viewContainerRef.createComponent(this.tab.component);

        }

    }

}
