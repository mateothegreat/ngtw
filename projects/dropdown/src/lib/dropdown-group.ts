import { DropdownItem } from './dropdown-item';

export interface DropdownGroup {
    label: string;
    items: Array<DropdownItem>;
    extra?: Array<string>;
    disabled?: boolean;
}
