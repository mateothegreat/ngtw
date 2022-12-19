import { Type } from '@angular/core';

export class Toast<T> {
    public title?: string;
    public message?: string;
    public component?: Type<T>;
    public delay?: number;
    public type?: 'success' | 'error' | 'warning' | 'info' = 'info';
    public icon?: string;
    public time?: number = 5000;
    public data?: any;
    public timestamp?: string = 'a few seconds ago';
    public width?: string = '400px';

    public constructor(toast: Partial<Toast<T>>) {
        Object.assign(this, toast);
    }
}
