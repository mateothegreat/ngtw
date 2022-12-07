import { Type } from '@angular/core';

export interface AccordionTab {

    title: string;
    titleClasses?: string;
    content?: string;
    contentClasses?: string;
    component?: Type<any>;
    height?: string;
    color?: string;

}
