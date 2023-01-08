import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Table } from '../../../../projects/table/src/lib/table';
import { TableEventClick } from '../../../../projects/table/src/lib/table-event-click';
import { CustomTableRowAComponent } from './custom-table-row-a/custom-table-row-a.component';
import { DemoTableDataType } from './demo-table-data-type';

@Component({
    selector: 'app-demo-table',
    templateUrl: './demo-table.component.html',
    styleUrls: [ './demo-table.component.scss' ]
})
export class DemoTableComponent {

    public data$: ReplaySubject<any> = new ReplaySubject();

    public table: Table<DemoTableDataType> = {
        columns: [
            {
                property: 'name',
                header: {
                    text: 'Name',
                    classes: 'text-blue-300 bg-gray-200 rounded-t-xl p-2'
                },
                classes: 'p-2'
            }, {
                property: 'address',
                header: {
                    text: 'Address'
                },
                classes: 'text-fuchsia-300'
            },
            {
                property: 'custom',
                component: CustomTableRowAComponent
            }
        ],
        data$: this.data$
    };

    public constructor() {
        this.data$.next([
            {
                name: 'John Doe',
                address: '123 Main St.',
                custom: {
                    foo: 'bar'
                }
            },
            {
                name: 'Jane Doe',
                address: '456 Main St.',
                custom: {
                    foo: '123'
                }
            }
        ]);
    }

    public onClick(e: TableEventClick<DemoTableDataType>): void {
        console.log(e);
    }
}
