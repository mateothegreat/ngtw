import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { createPopper, Instance } from '@popperjs/core';
import { DropdownGroup } from './dropdown-group';
import { DropdownItem } from './dropdown-item';

@Component({
    standalone: true,
    imports: [ CommonModule ],
    selector: 'ngtw-dropdown',
    template: `
        <div class="flex  flex-wrap">
            <button #button [ngClass]="extra" class="text-white font-bold text-sm transform active:scale-95 transition-transform px-5 py-3 rounded rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200 bg-gray-500 active:bg-gray-700 drop-shadow-xl">
                {{ label }}
            </button>
            <div class="ml-2 text-gray-500">
                Show State: <span class="bg-gray-100 p-2 rounded-lg font-bold text-blue-500">{{show}}</span>
            </div>
        </div>

        <div class="z-50" #popover>
            <div [ngClass]="show ? 'block' : 'hidden'" class="drop-shadow-2xl bg-gray-50 border border-gray-200 text-base z-50 rounded rounded-lg shadow-lg mt-1 animate-bound">
                <div *ngFor="let group of this._items; let i = index" [class.pb-2]="i + 1 === this._items.length" class="text-sm font-medium block w-full whitespace-nowrap">
                    <div *ngIf="group.label" (click)="onClick(group)" class="font-sm uppercase px-4 py-4 pb-2 text-slate-400 text-opacity-50">
                        {{ group.label }}
                    </div>
                    <div *ngFor="let item of group.items" class="cursor-pointer text-slate-600">
                        <div (click)="onClick(item)" [class.text-slate-200]="item.disabled" class="transform active:scale-95 transition-transform hover:text-blue-500 cursor-pointer text-sm py-2 px-4 w-full whitespace-nowrap" [ngClass]="item.extra">
                            {{ item.label }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class DropdownComponent implements AfterViewInit {
    @ViewChild('button', { static: false }) private buttonRef: ElementRef;
    @ViewChild('popover', { static: false }) private popoverRef: ElementRef;

    @Input() public label: string;
    @Input() public items: Array<DropdownGroup> | DropdownGroup;
    @Input() public show = false;
    @Input() public extra: Array<string> | string;

    private instance: Instance;

    public _items: Array<DropdownGroup> = [];

    public constructor(private readonly changeDetectorRef: ChangeDetectorRef,
                       private readonly router: Router) {

    }

    @HostListener('document:click', [ '$event' ])
    private onDocumentClick($event: MouseEvent) {
        if (!this.show && $event.target === this.buttonRef.nativeElement) {
            this.open();
        } else {
            this.close();
        }
    }

    public ngAfterViewInit() {
        if (Array.isArray(this.items)) {
            this._items = this.items;
        } else {
            this._items = [ this.items ];
        }

        this.instance = createPopper(this.buttonRef.nativeElement, this.popoverRef.nativeElement, {
            placement: 'bottom-end'
        });

        this.changeDetectorRef.detectChanges();
    }

    public open(): void {
        this.show = !this.show;
    }

    public close(event?: Event) {
        if (event) {
            event.preventDefault();
        }

        this.show = false;
    }

    public onClick(e: DropdownItem): void {
        if(!e.disabled) {
           if(e.click) {
               e.click(e);
           }
           if(e.path) {
               this.router.navigate([e.path]);
           }
        }
    }
}
