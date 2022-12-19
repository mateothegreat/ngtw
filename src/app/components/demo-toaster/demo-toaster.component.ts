import { Component } from '@angular/core';
import { ToasterService } from '../../../../projects/toaster/src/lib/toaster.service';

@Component({
    selector: 'app-demo-toaster',
    templateUrl: './demo-toaster.component.html',
    styleUrls: [ './demo-toaster.component.scss' ]
})
export class DemoToasterComponent {
    public constructor(public readonly toasterService: ToasterService) {
        toasterService.open({
            title: 'Toaster',
            message: 'After mashing the rhubarbs, season onion, cabbage and water with it in a saucepan. For an al dente fresh cake, add some triple sec and cumin.',
            type: 'info',
            width: '300px',
            time: 15000
        });
        toasterService.open({
            title: 'Toaster',
            message: 'After mashing the rhubarbs, season onion, cabbage and water with it in a saucepan. For an al dente fresh cake, add some triple sec and cumin.',
            type: 'success',
            width: '300px',
            time: 15000
        });
        toasterService.open({
            title: 'Toaster',
            message: 'After mashing the rhubarbs, season onion, cabbage and water with it in a saucepan. For an al dente fresh cake, add some triple sec and cumin.',
            type: 'warning',
            width: '300px',
            time: 15000
        });
        toasterService.open({
            title: 'Toaster 2',
            message: 'This is a toaster message.',
            delay: 3000,
            time: 5000,
            type: 'error',
            width: '500px'
        });
    }
}
