import { Type } from '@angular/core';
import { ModalButton } from './modal-button';
import { ModalButtonType } from './modal-button-type';
import { ModalTheme } from './modal-theme';
import { ModalThemes } from './modal-themes';

export class ModalConfig {

    public title?: string;
    public escapable?: boolean = true;
    public closeable?: boolean = true;
    public componentType: Type<any>;

    public showFooter?: boolean = true;
    public showOverlay?: boolean = true;

    public theme?: ModalTheme = ModalThemes.default;

    public leftButtons?: Array<ModalButton>;

    public rightButtons?: Array<ModalButton> = [

        new ModalButton({

            label: 'CANCEL',
            type: ModalButtonType.CANCEL,
            theme: ModalThemes.default.buttons.cancel

        }),

        new ModalButton({

            label: 'OK',
            type: ModalButtonType.SUCCESS,
            theme: ModalThemes.default.buttons.ok

        })

    ];

    public constructor(config: ModalConfig) {

        Object.assign(this, config);

        if (config.leftButtons) {

            this.leftButtons = config.leftButtons.map(button => new ModalButton(button));

        }

        if (config.rightButtons) {

            this.rightButtons = config.rightButtons.map(button => new ModalButton(button));

        }

    }

}
