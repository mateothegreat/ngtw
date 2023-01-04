import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { Panel } from '../panel';

@Component({
    standalone: true,
    selector: 'ngtw-input-panel',
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    template: `
        <div class="flex justify-between items-start">
            <div class="">
                <h1 class="text-lg text-gray-800 font-semibold mb-1">
                    {{ panel.options.title }}
                </h1>
                <label for="email" class="text-sm text-gray-600 dark:text-gray-400 font-normal">
                    {{ panel.options.subtitle }}
                </label>
            </div>
            <button (click)="close()">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z" fill="#ffffff"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.28033 6.21967C6.98744 5.92678 6.51256 5.92678 6.21967 6.21967C5.92678 6.51256 5.92678 6.98744 6.21967 7.28033L10.9393 12L6.21967 16.7197C5.92678 17.0126 5.92678 17.4874 6.21967 17.7803C6.51256 18.0732 6.98744 18.0732 7.28033 17.7803L12 13.0607L16.7197 17.7803C17.0126 18.0732 17.4874 18.0732 17.7803 17.7803C18.0732 17.4874 18.0732 17.0126 17.7803 16.7197L13.0607 12L17.7803 7.28033C18.0732 6.98744 18.0732 6.51256 17.7803 6.21967C17.4874 5.92678 17.0126 5.92678 16.7197 6.21967L12 10.9393L7.28033 6.21967Z" fill="#999999"/>
                </svg>
            </button>
        </div>
        <div class="flex flex-col items-start mt-4">
            <div class="relative w-full sm:w-2/3">
                <div class="absolute text-gray-600 flex items-center px-4 border-r border-gray-300 h-full">
                    <div #svg></div>
                </div>
                <input [formControl]="panel.options.control" type="email" id="email" class="py-3 text-gray-600 bg-transparent focus:outline-none focus:border focus:border-indigo-700 font-normal w-full pl-16 text-sm border-gray-300 rounded border shadow" placeholder="youremail@example.com"/>
            </div>
        </div>
        <div *ngIf="panel.options.submitLabel" class="flex justify-end">
            <button (click)="onClicked()"
                    [disabled]="!panel.options.control.valid"
                    class="disabled:bg-gray-400 mt-4 sm:mt-0 sm:ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm">
                {{ panel.options.submitLabel }}
            </button>
        </div>
    `
})
export class InputPanelComponent implements AfterViewInit {
    @ViewChild('svg', { read: ViewContainerRef }) svg: ViewContainerRef;

    public readonly panel: Panel<any>;

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService) {

    }

    public ngAfterViewInit() {
        this.svg.element.nativeElement.innerHTML = this.panel.options.iconSVG;
    }

    public onClicked() {
        this.panel.close$.next(true);
        this.dynamicComponentFactoryService.destroy('panel');
    }

    public close() {
        this.panel.close$.next(false);
        this.dynamicComponentFactoryService.destroy('panel');
    }

}
