import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PanelService } from '../../../../projects/panel/src/lib/panel.service';
import { InputPanelComponent } from '../../../../projects/panel/src/lib/panels/input-panel.component';

@Component({
    selector: 'app-demo-panel',
    template: `
        <p>
            demo-panel works!
        </p>
    `,
    styles: []
})
export class DemoPanelComponent {

    public constructor(private readonly panelService: PanelService) {
        const close$ = new Subject<boolean>();

        close$.subscribe(e => {
            console.log(e);
        });

        this.panelService.open({

            component: InputPanelComponent,
            close$,
            options: {
                title: 'Input',
                subtitle: 'Enter your name',
                control: new FormControl('asdf', Validators.minLength(6)),
                submitLabel: 'Signup'
            }

        });
    }
}
