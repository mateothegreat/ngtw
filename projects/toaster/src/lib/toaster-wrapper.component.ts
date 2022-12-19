import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Toast } from './toast';
import { ToastComponent } from './toast.component';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ToastComponent
    ],
    selector: 'ngtw-toaster-wrapper',
    template: `
        <div class="absolute flex flex-col items-end" style="row-gap: 12px; right: 10px; top: 10px;">
            <ngtw-toast *ngFor="let toast of toasts" [toast]="toast"></ngtw-toast>
        </div>
    `
})
export class ToasterWrapperComponent {
    public toasts: Toast<any>[];
}
