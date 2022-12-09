import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [ CommonModule ],
    selector: 'lib-modal',
    template: `
        <p>
            modal works!
        </p>
    `,
    styles: []
})
export class ModalComponent {

}
