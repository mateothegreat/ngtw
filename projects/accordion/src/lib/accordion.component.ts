import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccordionTab } from './accordion-tab';
import { AccordionTabComponent } from './accordion-tab.component';

@Component({
    standalone: true,
    imports: [ CommonModule, AccordionTabComponent ],
    selector: 'ngtw-accordion',
    template: `

        <div *ngFor="let tab of tabs; let i = index"
             class="group outline-none accordion-section"
             [tabindex]="i + 1">

            <ngtw-accordion-tab [tab]="tab"></ngtw-accordion-tab>

        </div>

    `

})
export class AccordionComponent {

    @Input() tabs: Array<AccordionTab>;

}
