import { NavigationExtras } from '@angular/router';

export interface DropdownItem<T> {
    label: string;
    route?: { commands: any[], extras?: NavigationExtras };
    click?: Function;
    extra?: T;
    disabled?: boolean;
}
