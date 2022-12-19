import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChildren, ViewContainerRef } from '@angular/core';
import { Table } from './table';
import { TableColumnComponent } from './table-column.component';
import { TableEventClick } from './table-event-click';

@Component({
    standalone: true,
    selector: 'ngtw-table',
    imports: [
        CommonModule,
        TableColumnComponent
    ],
    template: `
        <table [ngClass]="table.classes" class="w-full">
            <thead [ngClass]="table.theme?.header">
            <tr tabindex="0" class="focus:outline-none h-16 w-full text-sm leading-none text-gray-800">
                <th *ngFor="let column of table.columns" [ngClass]="column.header.classes + ' ' + column.classes" class="font-medium text-left">
                    {{ column.header.text }}
                </th>
            </tr>
            </thead>
            <tbody class="w-full">
            <tr *ngFor="let row of (table.data$ | async); let i = index" [ngClass]="table.theme.row" [tabindex]="i" class="focus:outline-none text-sm leading-none text-gray-800 hover:bg-gray-100 border-b border-t border-gray-100">
                <td *ngFor="let column of table.columns; let c = index" (click)="clicked.emit({ row: i, column, data: row[column.property] })" [ngClass]="column.classes">
                    <div *ngIf="!column.component"
                         class="flex items-center">
                        {{ column.fn ? column.fn(row[column.property]) : row[column.property] }}
                    </div>
                    <ngtw-table-column *ngIf="column.component" [column]="column" [data]="column.property ? row[column.property] : row"></ngtw-table-column>
                </td>
            </tr>
            </tbody>
        </table>
    `
})
export class TableComponent<T> implements OnInit, AfterViewInit {
    @ViewChildren('customColumn', { read: ViewContainerRef }) private customColumns: ViewContainerRef[];

    @Input() public table: Table<T>;
    @Output() public clicked: EventEmitter<TableEventClick<T>> = new EventEmitter();

    public data: any;

    public ngOnInit() {
        this.table = new Table<T>(this.table);

        this.table.data$.subscribe(data => {
            this.data = data;
        });
    }

    public ngAfterViewInit() {
        console.log(this.customColumns);
        this.customColumns.forEach((customColumn, i) => {
            console.log(i, customColumn);
            // customColumn.createComponent(this.table.columns[i].component);
        });
    }
}
