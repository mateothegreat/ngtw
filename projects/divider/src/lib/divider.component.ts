import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'ngtw-divider',
    imports: [ CommonModule ],
    styleUrls: [ './divider.component.scss' ],
    template: `
        <div class="mx-5 relative h-full">
            <div class="border-r h-full" [ngClass]="theme == 'dark' ? 'border-gray-900' : 'border-gray-100'"></div>
            <div class="absolute right-0 transform translate-x-5 top-1/2 -translate-y-5">
                <p [ngClass]="theme == 'dark' ? 'text-gray-900 bg-gray-600 ' : 'text-gray-400 bg-gray-50 '" class="font-bold rounded-full flex items-center justify-center text-sm rounded-b-full w-9 h-9">
                    <ng-content></ng-content>
                </p>
            </div>
        </div>
    `,
    styles: []
})
export class DividerComponent {
    @Input() public theme: 'light' | 'dark' = 'light';
    @Input() public direction: 'horizontal' | 'vertical'  = 'horizontal';
    @Input() public text: string='->';
    @Input() public line: boolean = true;
}
