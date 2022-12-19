import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-button-group',
    template: `
        <ngtw-button-group label="Change view:" [buttons]="['Table view', 'Grid view', 'Something else']"></ngtw-button-group>
    `,
    styles: []
})
export class DemoButtonGroupComponent {

}
