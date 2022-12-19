import { TableTheme } from './table-theme';

export class TableThemes {
    public static readonly COMPACT: TableTheme = {
        row: 'h-10',
        spacing: 'px-1 py-1'
    };

    public static readonly COMFORTABLE: TableTheme = {
        header: 'bg-slate-100',
        row: 'h-16',
        spacing: 'px-4 py-2'
    };

    public static readonly COSY: TableTheme = {
        row: 'h-20',
        spacing: 'px-6 py-4'
    };
}
