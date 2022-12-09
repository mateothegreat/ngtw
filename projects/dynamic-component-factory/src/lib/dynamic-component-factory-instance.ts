import { ComponentRef, ViewContainerRef } from '@angular/core';

export class DynamicComponentFactoryInstance<T> {
    public name: string | number;

    /**
     * Hold a reference to the component created by the factory
     * resolver to be used for creation and destruction.
     *
     * @type {ComponentRef<T>}
     * @private
     */
    public componentRef: ComponentRef<T>;

    public viewContainerRef?: ViewContainerRef;

    public constructor(config: {
        name: string | number;
        componentRef: ComponentRef<T>;
    }) {
        Object.assign(this, config);
    }
}
