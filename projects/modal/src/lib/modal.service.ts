import { Injectable } from '@angular/core';
import { ModalInstance } from './modal-instance';
import { ModalConfig } from './modal-config';
import { DynamicComponentFactoryService } from '@ngstudio/dynamic-component-factory';
import { ModalComponent } from './modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    public instances: Array<ModalInstance> = [];

    public constructor(private readonly dynamicComponentFactoryService: DynamicComponentFactoryService) {

    }

    public getLast(): ModalInstance {

        return this.instances[ this.instances.length - 1 ];

    }

    public closeLast(): void {

        const last = this.getLast();

        last.close();

    }

    public open(config: ModalConfig): ModalInstance {

        config = new ModalConfig(config);

        const instance = new ModalInstance(config, this);

        this.instances.push(instance);

        const ref = this.dynamicComponentFactoryService.createInApplicationRoot<ModalComponent>(instance.id, ModalComponent);

        ref.componentRef.instance.config = config;
        ref.componentRef.instance.instance = instance;

        return instance;

    }

    public close(id: string | number): void {

        this.dynamicComponentFactoryService.destroy(id);

        this.instances = this.instances.filter(instance => instance.id !== id);

    }

}
