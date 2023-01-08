import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChildren, ViewContainerRef } from '@angular/core';
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
            <tr tabindex="0" class="focus:outline-none h-16 w-full leading-none">
                <th *ngFor="let column of table.columns" [ngClass]="column.header?.classes + ' ' + column.classes">
                    {{ column.header?.text }}
                </th>
            </tr>
            </thead>
            <tbody class="w-full">
            <tr *ngFor="let row of (table.data$ | async); let i = index" [ngClass]="table.theme.row" [tabindex]="i" class="focus:outline-none border-b border-t">
                <td *ngFor="let column of table.columns; let c = index" (click)="clicked.emit({ row: i, column, data: row[column.property] })" [ngClass]="column.classes">
                    <ng-container *ngTemplateOutlet="column.component ? component : text" class="flex items-center"></ng-container>

                    <ng-template #text class="flex items-center">
                        {{ column.fn ? column.fn(row[column.property]) : row[column.property] }}
                    </ng-template>
                    <ng-template #component>
                        <ngtw-table-column *ngIf="column.component" [column]="column" [data]="column.property ? row[column.property] : row"></ngtw-table-column>
                    </ng-template>
                </td>
            </tr>
            </tbody>
        </table>
    `
})
export class TableComponent<T> implements OnInit {
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
}
