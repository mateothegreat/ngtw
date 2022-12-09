import {
    ApplicationRef,
    ComponentFactory,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    Injectable,
    Injector,
    Type,
    ViewContainerRef
} from '@angular/core';
import { DynamicComponentFactoryInstance } from './dynamic-component-factory-instance';

@Injectable({
    providedIn: 'root'
})
export class DynamicComponentFactoryService {

    private instances: Array<DynamicComponentFactoryInstance<any>> = [];
    private componentFactory: ComponentFactory<any>;

    /**
     * Dependency injection via constructor.
     *
     * @param {Injector} injector Handles dependency injection such as managing providers.
     * @param {ApplicationRef} applicationRef Reference to the Angular application running on the page.
     * @param {ComponentFactoryResolver} componentFactoryResolver Registry that maps Components to generated ComponentFactory classes that can be used to create instances of components
     */
    public constructor(private readonly injector: Injector,
                       private readonly applicationRef: ApplicationRef,
                       private readonly componentFactoryResolver: ComponentFactoryResolver) {

    }

    public createComponentFactory<T>(componentType: Type<T>): ComponentFactory<T> {

        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

        return this.componentFactory;

    }

    public createComponentInstance<T>(name: string | number, componentFactory: ComponentFactory<T>, destroy?: Function): DynamicComponentFactoryInstance<T> {

        const componentRef = componentFactory.create(this.injector);

        const destroyFunction = destroy ? destroy : () => {

            console.log(name);
            componentRef.destroy();

            this.applicationRef.detachView(componentRef.hostView);
        };

        const instance = new DynamicComponentFactoryInstance({

            name,
            componentRef

        });

        this.instances.push(instance);

        return instance;

    }

    public createInApplicationRoot<T>(name: string | number, componentType: Type<T>): DynamicComponentFactoryInstance<T> {

        const instance = this.createComponentInstance<T>(name, this.createComponentFactory<T>(componentType));

        this.applicationRef.attachView(instance.componentRef.hostView);

        document.body.appendChild((instance.componentRef.hostView as EmbeddedViewRef<T>).rootNodes[0]);

        return instance;

    }

    public createInElementById<T>(name: string | number, elementId: string, componentType: Type<T>): DynamicComponentFactoryInstance<T> {

        const instance = this.createComponentInstance<T>(name, this.createComponentFactory<T>(componentType));

        this.applicationRef.attachView(instance.componentRef.hostView);

        document.getElementById(elementId).appendChild((instance.componentRef.hostView as EmbeddedViewRef<T>).rootNodes[0]);

        return instance;

    }

    public createInContainer<T>(name: string | number, viewContainerRef: ViewContainerRef, componentType: Type<T>): DynamicComponentFactoryInstance<T> {

        const instance = this.createComponentInstance<T>(name, this.createComponentFactory<T>(componentType));

        instance.viewContainerRef = viewContainerRef;

        setTimeout(() => {

            viewContainerRef.insert(instance.componentRef.hostView);

        });

        return instance;

    }

    public destroy(name: string | number): void {

        const instance = this.instances.find(instance => instance.name === name);

        if (instance.viewContainerRef) {

            instance.viewContainerRef.clear();

        } else {

            instance.componentRef.destroy();

        }

        this.instances = this.instances.filter(instance => instance.name !== name);

    }

    public destroyAll(): void {

        this.instances.forEach(instance => this.destroy(instance.name));

    }

}
