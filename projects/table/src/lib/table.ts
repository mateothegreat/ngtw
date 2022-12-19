import { Observable } from 'rxjs';
import { TableColumn } from './table-column';
import { TableTheme } from './table-theme';
import { TableThemes } from './table-themes';

export class Table<T> {
    public columns: TableColumn<T>[];
    public data$: Observable<T[]>;
    public classes?: string;
    public theme?: TableTheme = TableThemes.COMFORTABLE;

    public constructor(table: Table<T>) {
        Object.assign(this, table);
    }
}
