export interface DropdownItem {
    label: string;
    path?: string;
    click?: Function;
    extra?: Array<string>;
    disabled?: boolean;
}
