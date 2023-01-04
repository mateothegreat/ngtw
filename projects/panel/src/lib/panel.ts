import { Type } from '@angular/core';
import { Subject } from 'rxjs';
import { PanelOptions } from './panel-options';

export class Panel<T> {

    public component?: Type<T>;
    public close$: Subject<boolean>;
    public options: PanelOptions;

    public constructor(panel: Panel<T>) {
        Object.assign(this, panel);
        this.options = new PanelOptions(this.options);
    }
}
