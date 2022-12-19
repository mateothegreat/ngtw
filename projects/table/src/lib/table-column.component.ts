import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { TableColumn } from './table-column';

@Component({
    standalone: true,
    selector: 'ngtw-table-column',
    imports: [ CommonModule ],
    template: `
        <ng-container #customColumn></ng-container>
    `
})
export class TableColumnComponent<T> implements AfterViewInit {
    @ViewChild('customColumn', { read: ViewContainerRef }) public customColumn: ViewContainerRef;

    @Input() column: TableColumn<T | any>;
    @Input() data: T;

    public constructor(private readonly changeDetectorRef: ChangeDetectorRef) {

    }

    public ngAfterViewInit() {
        const instance = this.customColumn.createComponent(this.column.component);
        instance.instance.data = this.data;

        this.changeDetectorRef.detectChanges();
    }
}
