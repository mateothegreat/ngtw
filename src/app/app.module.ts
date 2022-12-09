import { AComponent } from './a/a.component';

import { AccordionComponent } from '../../projects/accordion/src/lib/accordion.component';

import { BrowserModule } from '@angular/platform-browser';

import { HelperComponent } from '../../projects/helper/src/lib/helper.component';

import { NgModule } from '@angular/core';

import { RangeComponent } from '../../projects/range/src/lib/range.component';

import { SwiperModule } from 'swiper/angular';

import { TestimonialsHorizontalComponent } from '../../projects/testimonials-horizontal/src/lib/testimonials-horizontal.component';

import SwiperCore, { Navigation, Pagination } from 'swiper';

import { AppComponent } from './app.component';

SwiperCore.use([Pagination, Navigation]);

@NgModule({
    declarations: [AppComponent, AComponent],
    imports: [BrowserModule, AccordionComponent, HelperComponent, RangeComponent, SwiperModule, TestimonialsHorizontalComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
