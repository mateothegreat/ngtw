import { Subject } from 'rxjs';
import { ModalButtonType } from './modal-button-type';
import { ModalEvent } from './modal-event';
import { ModalConfig } from './modal-config';
import { ModalService } from './modal.service';

export class ModalInstance {

    public id: number = Math.random() * 100;

    public clicks$: Subject<ModalButtonType> = new Subject();
    public events$: Subject<ModalEvent> = new Subject();

    public config: ModalConfig;

    public modalService: ModalService;

    public constructor(config: ModalConfig, modalService: ModalService) {

        this.config = config;

        this.modalService = modalService;

    }

    public close(): void {

        this.clicks$.complete();
        this.events$.complete();

        this.modalService.close(this.id);

    }

}
