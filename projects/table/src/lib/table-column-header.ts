import { Type } from '@angular/core';

export interface TableColumnHeader<T> {
    text: string;
    component?: Type<any>;
    data?: T;
    classes?: string;
}
