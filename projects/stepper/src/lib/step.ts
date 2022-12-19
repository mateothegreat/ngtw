import { FormGroup } from '@angular/forms';

export class Step {
    public number?: string | number;
    public title: string;
    public subtitle?: string;
    public disabled?: boolean;
    public formGroup?: FormGroup;
    public previous?: {
        disabled?: boolean
    };
    public next?: {
        disabled?: boolean
    };
}
