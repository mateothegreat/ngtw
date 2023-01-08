import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { createPopper, Instance, Placement } from '@popperjs/core';
import { DropdownGroup } from './dropdown-group';
import { DropdownItem } from './dropdown-item';

@Component({
    standalone: true,
    imports: [ CommonModule ],
    selector: 'ngtw-dropdown',
    templateUrl: './dropdown.component.html'
})
export class DropdownComponent<T> implements AfterViewInit {
    @ViewChild('button', { static: false }) private buttonRef: ElementRef;
    @ViewChild('popover', { static: false }) private popoverRef: ElementRef;

    @Input() public manual: boolean;
    @Input() public target: HTMLElement;
    @Input() public label: string;
    @Input() public items: Array<DropdownGroup<any>> | DropdownGroup<any>;
    @Input() public show = false;
    @Input() public extra: Array<string> | string;
    @Input() public placement: Placement = 'bottom-start';

    @Output() public clicked: EventEmitter<DropdownItem<T> | DropdownGroup<T>> = new EventEmitter();
    private instance: Instance;

    public _items: Array<DropdownGroup<T>> = [];

    public constructor(private readonly changeDetectorRef: ChangeDetectorRef,
                       private readonly router: Router) {

    }

    @HostListener('document:click', [ '$event' ])
    private onDocumentClick($event: MouseEvent) {
        console.log($event);
        if (this.buttonRef) {
            if (!this.show && $event.target === this.buttonRef.nativeElement) {
                this.open();
            } else {
                this.close();
            }
        } else {
            $event.preventDefault();
            $event.stopPropagation();

            if (!this.show && ($event.target === this.target || this.target.contains($event.target as HTMLElement))) {
                this.open();
            } else {
                this.close();
            }
        }
    }

    public ngAfterViewInit() {
        if (Array.isArray(this.items)) {
            this._items = this.items;
        } else {
            this._items = [ this.items ];
        }

        this.changeDetectorRef.detectChanges();
    }

    public open(): void {
        this.show = !this.show;
        console.log(this.show);
        if (this.show) {
            if (this.target) {
                this.instance = createPopper(this.target, this.popoverRef.nativeElement, {
                    placement: this.placement
                });
            } else {
                this.instance = createPopper(this.buttonRef.nativeElement, this.popoverRef.nativeElement, {
                    placement: this.placement
                });
            }
        }
    }

    public close(event?: Event) {
        if (event) {
            event.preventDefault();
        }

        this.show = false;
    }

    public onClick(e: DropdownItem<any>): void {
        this.clicked.emit(e);

        if (!e.disabled) {
            if (e.click) {
                e.click(e);
            }

            if (e.route) {
                this.router.navigate(e.route.commands, e.route.extras);
            }
        }
    }
}
