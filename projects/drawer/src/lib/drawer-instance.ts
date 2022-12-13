import { ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Drawer } from './drawer';
import { DrawerEvent } from './drawer-event';

export interface DrawerInstance<T> {
    /**
     * Number of this drawer if it is stacked, else will always be 0.
     */
    index: number;

    /**
     * Class reference ({Type}) from @angular/core.
     */
    componentRef: ComponentRef<T>;

    /**
     * Configuration object passed from the caller to .open().
     */
    config: Drawer<T>;

    /**
     * {Subject} that is creaed during .open() for emitting events.
     */
    events$: Observable<DrawerEvent>;

}
