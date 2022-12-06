import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RangeComponent } from '../../projects/range/src/lib/range.component';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RangeComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
