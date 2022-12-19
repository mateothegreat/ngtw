import { Component, ViewChild } from '@angular/core';
import { DropdownComponent } from 'dropdown';
import { DropdownGroup } from '../../../../projects/dropdown/src/lib/dropdown-group';
import { DropdownItem } from '../../../../projects/dropdown/src/lib/dropdown-item';

@Component({
    selector: 'app-demo-dropdown',
    templateUrl: './demo-dropdown.component.html',
    styleUrls: [ './demo-dropdown.component.scss' ]
})
export class DemoDropdownComponent {
    @ViewChild('dropdownManual') private dropdownManual: DropdownComponent;

    public menu: Array<DropdownGroup> = [
        {
            label: 'Group A',
            items: [
                {
                    label: 'Item 1'
                },
                {
                    label: 'Item 3 (disabled)',
                    disabled: true
                },
                {
                    label: 'Item 2 and on..',
                    extra: [ 'text-red-500', 'font-bold' ],
                    click: (item: DropdownItem) => {
                        console.log(item);
                    }
                }
            ]
        }
    ];

    public onClick(): void {
        console.log(123);
        console.log(this.dropdownManual.open());
    }
}
