export class Step {
    public label: string;
    public disabled?: boolean;
    public previous?: {
        disabled?: boolean
    }
    public next?: {
        disabled?: boolean
    }
}
