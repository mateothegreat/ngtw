import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'ngtw-backdrop',
    template: `
        <div class="absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-red-500"></div>
    `,
})
export class BackdropComponent {

}
