import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { Toast } from './toast';
import { ToasterService } from './toaster.service';

@Component({
    standalone: true,
    imports: [
        CommonModule
    ],
    selector: 'ngtw-toast',
    template: `
        <div [style.width]="toast.width"
             [style.background]="theme.background"
             [style.color]="theme.color"
             class="px-4 py-2.5 text-gray-100 rounded-lg shadow-lg bg-opacity-90 transform active:scale-95 disabled:active:scale-100 transition-transform"
             style="opacity: 90%">
            <div class="flex items-center" style="margin-bottom: 10px">
                <div class="flex-1 text-md font-medium text-white">
                    <div class="pt-2">
                        {{ toast.title}}
                    </div>
                </div>
                <button (click)="toasterService.close(this.toast.title)"
                        class="transform active:scale-95 disabled:active:scale-100 transition-transform ml-auto -mx-1.5 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-600 text-gray-300 bg-gray-500 opacity-40"
                        style="opacity: 40%; padding: 4px;">
                    <span class="sr-only">Close</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <ng-container *ngIf="toast.component" #container></ng-container>
            <div *ngIf="toast.message" class="flex items-center">
                <div class="flex flex-col text-sm gap-y-2 w-full">
                    <div class="text-sm">
                        {{ toast.message }}
                    </div>
                    <div class="text-right text-xs text-gray-300">
                        {{ toast.timestamp }}
                    </div>
                </div>
            </div>
        </div>
    `
})
export class ToastComponent implements OnInit {
    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;
    @Input() public toast: Toast<any>;

    public theme: {
        background: string,
        color: string
    };

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService,
                       public readonly toasterService: ToasterService) {
    }

    public ngOnInit() {
        if (this.toast.component) {
            const component = this.dynamicComponentFactoryService.createInContainer(this.toast.title, this.container, this.toast.component);
            component.componentRef.instance.toast = this.toast;
        }

        if (this.toast.type == 'info') {
            this.theme = {
                background: '#3B82F6',
                color: '#ffffff'
            };
        } else if (this.toast.type == 'success') {
            this.theme = {
                background: '#10B981',
                color: '#ffffff'
            };
        } else if (this.toast.type == 'warning') {
            this.theme = {
                background: '#F59E0B',
                color: '#ffffff'
            };
        } else if (this.toast.type == 'error') {
            this.theme = {
                background: '#EF4444',
                color: '#ffffff'
            };
        }
    }

}
