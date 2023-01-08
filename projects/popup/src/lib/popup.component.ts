import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { Popup } from './popup';

@Component({
    standalone: true,
    selector: 'ngtw-popup',
    imports: [ CommonModule ],
    template: `
        <div [class.bg-gray-700]="popup.backdrop" class="blur-md absolute top-0 right-0 bottom-0 left-0 shadow-xl rounded-lg bg-gray-50">
            <div class="flex justify-center items-center h-full">
                <div [ngClass]="popup.classes" class="flex flex-col gap-y-5">
                    <div class="flex justify-between p-3 gap-x-10 items-start">
                        <div class="">
                            <p class="text-xl font-medium text-slate-800">{{ popup.title }}</p>
                            <p *ngIf="popup.subtitle" class="text-sm text-slate-500">{{ popup.subtitle }}</p>
                        </div>
                        <button (click)="close()">
                            <svg class="w-6 h-6 text-sm" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z" fill="#F9FAFB"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.28033 6.21967C6.98744 5.92678 6.51256 5.92678 6.21967 6.21967C5.92678 6.51256 5.92678 6.98744 6.21967 7.28033L10.9393 12L6.21967 16.7197C5.92678 17.0126 5.92678 17.4874 6.21967 17.7803C6.51256 18.0732 6.98744 18.0732 7.28033 17.7803L12 13.0607L16.7197 17.7803C17.0126 18.0732 17.4874 18.0732 17.7803 17.7803C18.0732 17.4874 18.0732 17.0126 17.7803 16.7197L13.0607 12L17.7803 7.28033C18.0732 6.98744 18.0732 6.51256 17.7803 6.21967C17.4874 5.92678 17.0126 5.92678 16.7197 6.21967L12 10.9393L7.28033 6.21967Z" fill="#1F2937"/>
                            </svg>
                        </button>
                    </div>
                    <div class="flex-1">
                        <ng-container #content></ng-container>
                        <div *ngIf="popup.content" class="px-3 pb-3 text-gray-700">
                            {{ popup.content }}
                        </div>
                    </div>
                    <div *ngIf="popup.buttons && popup.buttons.length > 0" class="px-3 pb-3 text-gray-700">
                        <div class="flex justify-end gap-x-3">
                            <button *ngFor="let button of popup.buttons"
                                    (click)="button.action(button)"
                                    class="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white ring-2 ring-indigo-300"
                                    [ngClass]="popup.classes">
                                <span class="relative">{{ button.label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class PopupComponent implements AfterViewInit {
    @ViewChild('content', { read: ViewContainerRef }) private content: ViewContainerRef;

    public popup: Popup<any>;

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService) {

    }

    public ngAfterViewInit() {
        if (this.popup.component) {
            this.dynamicComponentFactoryService.createInContainer('', this.content, this.popup.component);
        }
    }

    public close(): void {
        this.dynamicComponentFactoryService.destroy(this.popup.title);
    }
}
