import { NavigationExtras } from '@angular/router';

export interface DropdownItem {
    label: string;
    route?: { commands: any[], extras?: NavigationExtras };
    click?: Function;
    extra?: Array<string>;
    disabled?: boolean;
}
