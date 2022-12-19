import { Injectable } from '@angular/core';
import { DynamicComponentFactoryService } from '@ngtw/dynamic-component-factory';
import { Toast } from './toast';
import { ToasterWrapperComponent } from './toaster-wrapper.component';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    public instances: Toast<any>[] = [];
    public componentRef: ToasterWrapperComponent;

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService) {

    }

    public open<T>(toast: Toast<T>): void {
        toast = new Toast<T>(toast);

        if (this.instances.length === 0) {
            this.componentRef = this.dynamicComponentFactoryService.createInApplicationRoot(toast.title, ToasterWrapperComponent).componentRef.instance;
            this.componentRef.toasts = this.instances;
        }

        this.instances.push(toast);

        if (toast.time) {
            setTimeout(() => this.close(toast.title), toast.time);
        }

    }

    public close(title: string): void {
        this.instances = this.instances.filter((popup) => {
            return popup.title !== title;
        });

        if (this.instances.length === 0) {
            this.dynamicComponentFactoryService.destroyAll();
        } else {
            this.componentRef.toasts = this.instances;
        }
    }
}
