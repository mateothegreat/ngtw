import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-button-group',
    template: `
        <ngtw-button-group (changed)="change($event)" label="Change view:" [buttons]="['Table view', 'Grid view', 'Something else']"></ngtw-button-group>
    `,
    styles: []
})
export class DemoButtonGroupComponent {
    public change(v: string): void {
        console.log(v);
    }
}
