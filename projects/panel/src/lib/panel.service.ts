import { Injectable } from '@angular/core';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { Panel } from './panel';
import { PanelComponent } from './panel.component';

@Injectable({
    providedIn: 'root'
})
export class PanelService {

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService) {

    }

    public open<T>(panel: Panel<T>): void {
        panel = new Panel(panel);
        const instance = this.dynamicComponentFactoryService.createInApplicationRoot<any>('panel', PanelComponent);
        instance.componentRef.instance.panel = panel;
    }
}
