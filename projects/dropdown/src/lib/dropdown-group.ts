import { DropdownItem } from './dropdown-item';

export interface DropdownGroup<T> {
    label: string;
    items: Array<DropdownItem<T>>;
    extra?: Array<T>;
    disabled?: boolean;
}
