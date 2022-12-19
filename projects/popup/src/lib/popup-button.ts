export interface PopupButton {
    label: string;
    classes?: string;
    action: (button: PopupButton) => void;
}
