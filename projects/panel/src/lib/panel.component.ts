import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { Panel } from './panel';

@Component({
    standalone: true,
    selector: 'ngtw-panel',
    imports: [ CommonModule ],
    template: `
        <div class="absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-opacity-50 bg-black">
            <div class="xl:w-5/12 w-11/12 mx-auto mb-4 my-6 md:w-2/3 shadow sm:px-10 sm:py-6 py-4 px-4 bg-white rounded-md">
                <ng-container #outlet></ng-container>
            </div>
        </div>
    `
})
export class PanelComponent implements AfterViewInit {
    @ViewChild('outlet', { read: ViewContainerRef }) public outlet: ViewContainerRef;
    public readonly panel: Panel<any>;

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService) {

    }

    public ngAfterViewInit() {
        const instance = this.dynamicComponentFactoryService.createInContainer('input', this.outlet, this.panel.component);
        instance.componentRef.instance.panel = this.panel;
    }
}
