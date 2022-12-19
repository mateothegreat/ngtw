import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-demo-toggle',
    templateUrl: './demo-toggle.component.html',
    styleUrls: [ './demo-toggle.component.scss' ]
})
export class DemoToggleComponent {
    public control = new FormControl<boolean>(false);
    public control2 = new FormControl<boolean>(true);
}
