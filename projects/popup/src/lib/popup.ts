import { Type } from '@angular/core';
import { PopupButton } from './popup-button';

export class Popup<T> {
    public name?: string;
    public title: string;
    public subtitle?: string;
    public classes?: string;
    public content?: string;
    public component?: Type<T>;
    public close?: boolean;
    public closeable?: boolean = true;
    public escapable?: boolean = true;
    public backdrop?: boolean;
    public blurable?: boolean = true;
    public buttons?: PopupButton[] = [];

    public constructor(popup: Popup<T>) {
        Object.assign(this, popup);
    }
}
