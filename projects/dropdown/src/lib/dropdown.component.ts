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
    template: `
        <div *ngIf="label" class="flex flex-wrap">
            <button #button [ngClass]="extra" class="text-white font-bold text-sm transform active:scale-95 transition-transform px-5 py-3 rounded rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200 bg-gray-500 active:bg-gray-700 drop-shadow-xl">
                {{ label }}
            </button>
        </div>

        <div [ngClass]="show ? 'block' : 'hidden'" class="absolute z-50" #popover>
            <div class="drop-shadow-2xl bg-gray-50 border border-gray-200 text-base z-50 rounded rounded-lg shadow-lg mt-1 animate-bound">
                <div *ngFor="let group of this._items; let i = index" [class.pb-2]="i + 1 === this._items.length" class="text-sm font-medium block w-full whitespace-nowrap">
                    <div *ngIf="group?.label" (click)="onClick(group)" class="font-sm uppercase px-4 py-4 pb-2 text-slate-400 text-opacity-50">
                        {{ group?.label }}
                    </div>
                    <div *ngFor="let item of group?.items" class="cursor-pointer text-slate-600">
                        <div (click)="onClick(item)" [class.text-slate-200]="item.disabled" class="transform active:scale-95 transition-transform hover:text-blue-500 cursor-pointer text-sm py-2 px-4 w-full whitespace-nowrap" [ngClass]="item.extra">
                            {{ item?.label }}
                        </div>
                    </div>
                </div>
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class DropdownComponent implements AfterViewInit {
    @ViewChild('button', { static: false }) private buttonRef: ElementRef;
    @ViewChild('popover', { static: false }) private popoverRef: ElementRef;

    @Input() public manual: boolean;
    @Input() public target: HTMLElement;
    @Input() public label: string;
    @Input() public items: Array<DropdownGroup> | DropdownGroup;
    @Input() public show = false;
    @Input() public extra: Array<string> | string;
    @Input() public placement: Placement = 'bottom-start';

    @Output() public clicked: EventEmitter<DropdownItem | DropdownGroup> = new EventEmitter();
    private instance: Instance;

    public _items: Array<DropdownGroup> = [];

    public constructor(private readonly changeDetectorRef: ChangeDetectorRef,
                       private readonly router: Router) {

    }

    @HostListener('document:click', [ '$event' ])
    private onDocumentClick($event: MouseEvent) {
        if (this.buttonRef) {
            if (!this.show && $event.target === this.buttonRef.nativeElement) {
                this.open();
            } else {
                this.close();
            }
        } else {
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

    public onClick(e: DropdownItem): void {
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
