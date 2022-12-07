import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionComponent } from '../../projects/accordion/src/lib/accordion.component';
import { RangeComponent } from '../../projects/range/src/lib/range.component';

import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';

@NgModule({
    declarations: [
        AppComponent,
        AComponent
    ],
    imports: [
        BrowserModule,
        AccordionComponent,
        RangeComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
