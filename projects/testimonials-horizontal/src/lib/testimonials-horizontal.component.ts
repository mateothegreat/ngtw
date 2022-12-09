import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { SwiperModule } from 'swiper/angular';

SwiperCore.use([ Navigation ]);

@Component({
    standalone: true,
    imports: [ CommonModule, SwiperModule ],
    selector: 'ngtw-testimonials-horizontal',
    styleUrls: [ './testimonials-horizontal.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    template: `

        <div class="ngtw-testimonials-horizontal">

            <swiper [config]="config">

                <ng-template *ngFor="let block of blocks" swiperSlide class="swiper-slide">

                    <div class="flex jusitfy-center items-center flex-col" style="width: 300px;">

                        <div class="w-12 relative z-20"><img class="" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials_7_svg-1.svg" alt="apple"></div>

                        <div class="-mt-6  flex border h-96 rounded text-left border-gray-600 bg-black justify-between items-start flex-col px-4 md:px-6">

                            <p class="mt-10 text-base leading-normal text-gray-300">

                                {{ block.content }}

                            </p>

                            <div class="flex justify-end pb-6 space-y-11 items-end w-full flex-col h-28">

                                <div class="flex grow-0 w-6 ">

                                    <img class="" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials_7_svg-5_quotes.svg" alt="quotes">

                                </div>

                                <div class="w-full flex jusitfy-start items-center space-x-2">

                                    <div>

                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials_7_Ellipse%20113.png"
                                             alt="woman avatar">

                                    </div>

                                    <div class="flex justify-start items-start flex-col space-y-2">

                                        <p class="text-lg font-medium leading-none text-gray-200">Casy Camilari</p>
                                        <p class="text-sm leading-none text-gray-200">Digital Marketing Director</p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </ng-template>

            </swiper>

            <div class="flex justify-center mt-12  items-center space-x-5 w-full">

                <button aria-label="back" onclick="" class="swiper-button-prev">

                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-400" viewBox="0 0 31 31">

                        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>

                    </svg>

                </button>

                <button aria-label="back" onclick="" class="swiper-button-next">

                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-400" viewBox="0 0 31 31">

                        <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>

                    </svg>

                </button>

            </div>

        </div>

    `
})
export class TestimonialsHorizontalComponent {

    @Input() public blocks: Array<any>;

    public config: SwiperOptions = {

        loop: true,
        centeredSlides: true,

        navigation: {

            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'

        },

        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 16,
                slidesPerGroup: 1
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 16,
                slidesPerGroup: 1
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 24,
                slidesPerGroup: 1
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 32,
                slidesPerGroup: 1
            },
            1336: {
                slidesPerView: 4,
                spaceBetween: 32,
                slidesPerGroup: 1
            }
        }
    };

}
