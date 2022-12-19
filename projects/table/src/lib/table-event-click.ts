import { TableColumn } from './table-column';

export interface TableEventClick<T> {
    row: number;
    column?: TableColumn<T>;
    data: T | any;
}
