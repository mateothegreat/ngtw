import { ComponentRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Drawer } from './drawer';
import { DrawerEvent } from './drawer-event';
import { DrawerInstance } from './drawer-instance';

@Injectable({
    providedIn: 'root'
})
export class DrawerService {

    /**
     * Holds a list of instantiated components that are
     * active in the DOM.
     */
    public instances: Array<Drawer<any>> = [];

    public constructor() {

    }

    /**
     * Open a new drawer and work the magic.
     *
     * @param config
     *
     * @return {Observable<DrawerEvent>} Observable that emits new events like opened, closed, etc.
     */
    public open<T>(config: Drawer<T>): Observable<DrawerEvent> {

        //
        // Instantiate a new instance just in case the caller
        // passed in an object and not a class instance.
        //
        config = new Drawer(config);

        //
        // Create new component, etc etc..
        //
        const componentRef: ComponentRef<T> = null;

        const event$ = new Subject<DrawerEvent>();

        //
        // Create instance and set the event$ reference so
        // the drawer component itself can emit them.
        //
        // ..
        // instance.events$ = events$;
        // ..
        //

        return event$;

    }

    /**
     * Close a drawer by name or close the top most drawer
     * if no name is passed.
     *
     * @param name
     */
    public close(name?: string): void {

    }

}
