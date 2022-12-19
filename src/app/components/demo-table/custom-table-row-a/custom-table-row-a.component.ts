import { Component } from '@angular/core';
import { DemoTableDataType } from '../demo-table-data-type';

@Component({
    selector: 'app-custom-table-row-a',
    templateUrl: './custom-table-row-a.component.html',
    styleUrls: [ './custom-table-row-a.component.scss' ]
})
export class CustomTableRowAComponent {
    public data: DemoTableDataType;
}
