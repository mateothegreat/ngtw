import { Component } from '@angular/core';
import { Breadcrumb } from '../../../../projects/breadcrumbs/src/lib/breadcrumb';

@Component({
    selector: 'app-demo-breadcrumbs',
    template: `
        <div class="flex flex-col gap-y-5">
            <ngtw-breadcrumbs [items]="items" classes="text-lg"></ngtw-breadcrumbs>
            <ngtw-breadcrumbs [items]="items" classes="text-md"></ngtw-breadcrumbs>
            <ngtw-breadcrumbs [items]="items" classes="text-sm"></ngtw-breadcrumbs>
        </div>
    `,
    styles: []
})
export class DemoBreadcrumbsComponent {
    public items: Breadcrumb[] = [
        {
            label: 'Home',
            path: '/home'
        },
        {
            label: 'Demos',
            path: '/demo'
        },
        {
            label: 'Breadcrumbs',
            path: '/demos/breadcrumbs'
        }
    ];
}
