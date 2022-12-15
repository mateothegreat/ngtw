import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { BackdropComponent } from './backdrop.component';

@Injectable({
  providedIn: 'root'
})
export class BackdropService {

    public constructor(private componentFactoryResolver: ComponentFactoryResolver,
                       private appRef: ApplicationRef,
                       private injector: Injector) {

    }

    public open(): void {

        const componentRef = this.componentFactoryResolver
                                 .resolveComponentFactory(BackdropComponent)
                                 .create(this.injector);

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        document.body.appendChild(domElem);

        console.log(domElem);
        // 5. Wait some time and remove it from the component tree and from the DOM
        // setTimeout(() => {
        //     this.appRef.detachView(componentRef.hostView);
        //     componentRef.destroy();
        // }, 3000);

    }

}
