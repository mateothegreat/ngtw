import { Type } from '@angular/core';
import { DrawerPosition } from './drawer-position';

/**
 * Drawer instance configuration and settings.
 */
export class Drawer<T> {
    /**
     * Component class itself i.e.: poisition: MyComponent,
     */
    public component: Type<T>;

    /**
     * Position the drawer on the left or right side of the screen.
     */
    public position: DrawerPosition = DrawerPosition.RIGHT;

    /**
     * Create a new drawer configuration.
     *
     * @param config
     */
    public constructor(config: Drawer<T>) {

        //
        // Use Object.assign to copy things and then
        // do something custom on the next few lines (tbd).
        //
        Object.assign(this, config);

    }
}
