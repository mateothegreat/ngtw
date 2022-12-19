export interface Tab {
    label: string;
    path?: string;
    badge?: string | number;
    disabled?: boolean;
    fn?: (tab: Tab) => void;
}
