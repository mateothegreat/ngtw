import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'ngtw-drawer',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.scss'],
    imports: [CommonModule]
})
export class DrawerComponent {

    @Input() isOpen = false;
    @Input() width: number = 400;
    @Input() position: 'left' | 'right' = 'right';
    @Input() isBlur = false;

    @Output() drawerClosed = new EventEmitter();

    close() {
        this.drawerClosed.emit();
    }

}
