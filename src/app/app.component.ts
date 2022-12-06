import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

    public value$: Subject<number> = new Subject();

    public constructor() {

        this.value$.subscribe(value => {

            console.log(`new value: ${ value }`);

        });

    }

}
