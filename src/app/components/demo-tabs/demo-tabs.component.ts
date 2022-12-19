import { Component } from '@angular/core';
import { Tab } from '../../../../projects/tabs/src/lib/tab';

@Component({
    selector: 'app-demo-tabs',
    template: `
        <div class="p-5 border rounded-xl m-5 shadow-lg">
            <ngtw-tabs [tabs]="tabs" [active]="tabs[1]"></ngtw-tabs>
        </div>
        <div class="p-5 border rounded-xl m-5 shadow-lg">
            <ngtw-tabs [stretch]="true"
                       [tabs]="tabs"
                       [active]="tabs[1]"
                       [theme]="{
                            border: {
                                width: '8px'
                            }
                       }"></ngtw-tabs>
        </div>
    `
})
export class DemoTabsComponent {
    public tabs: Tab[] = [
        {
            label: 'Overview'
        },
        {
            label: 'Cameras',
            badge: Math.round(Math.random() * 100)
        },
        {
            label: 'Settings'
        },
        {
            label: 'Delete..',
            disabled: true
        }
    ];
}
