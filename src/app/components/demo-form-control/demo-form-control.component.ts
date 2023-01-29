import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-demo-form-control',
    template: `
        <div class="space-y-6 m-20">
            <div class="w-96 text-slate-400">
                <ngtw-form-control title="Project name"
                                   [required]="true"
                                   [control]="control"></ngtw-form-control>
            </div>
            <div class="w-96 text-slate-400">
                <ngtw-form-control title="Project name"
                                   subtitle="The name of your project"
                                   [control]="control"
                                   [required]="true"></ngtw-form-control>
            </div>
            <div class="w-96 text-slate-400">
                <ngtw-form-control title="Project name"
                                   subtitle="The name of your project"
                                   [control]="control"
                                   [optional]="true"></ngtw-form-control>
            </div>
            <div class="w-96 text-slate-400">
                <ngtw-form-control title="Project name"
                                   subtitle="The name of your project"
                                   [control]="control"
                                   [required]="true"
                                   [errors]="errors"></ngtw-form-control>
            </div>
            <div class="w-96 text-slate-400">
                <ngtw-form-control title="Project name"
                                   subtitle="The name of your project"
                                   [control]="control"
                                   [rows]="3"
                                   [required]="true"
                                   [errors]="errors"></ngtw-form-control>
            </div>
        </div>
    `
})
export class DemoFormControlComponent {
    public control = new FormControl('', [
        Validators.minLength(3)
    ]);
    public errors = {
        minlength: 'The name must be at least 3 characters long.'
    };
}
