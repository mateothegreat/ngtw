import { Type } from '@angular/core';
import { TableColumnHeader } from './table-column-header';

export interface TableColumn<T> {
    property?: keyof T | null;
    header: TableColumnHeader<T>;
    component?: Type<any>;
    classes?: string;
    fn?: (value: any) => any;
}
