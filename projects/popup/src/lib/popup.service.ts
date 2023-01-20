import { Injectable } from '@angular/core';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { Popup } from './popup';
import { PopupComponent } from './popup.component';

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    public instances: Popup<any>[] = [];

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService) {

    }

    public open(popup: Popup<any>): void {
        popup = new Popup(popup);
        const ref = this.dynamicComponentFactoryService.createInApplicationRoot<any>(popup.title, PopupComponent);
        ref.componentRef.instance.popup = popup;
    }

    public close(title: string): void {
        this.dynamicComponentFactoryService.destroy(title);

        this.instances = this.instances.filter((popup) => {
            return popup.title !== title;
        });
    }
}
