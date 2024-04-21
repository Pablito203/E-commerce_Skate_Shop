import { Injectable } from '@angular/core';
import { ModalController  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  static ModalAberto: HTMLIonModalElement | undefined = undefined;

  constructor(private ModalController: ModalController) { }

  CriarModal(component: any, componentProps?: any, cssClass?: string) {
    if (ModalService.ModalAberto) {
      this.ModalController.dismiss();
    }

    this.ModalController.create({
      component,
      componentProps,
      cssClass,
      backdropDismiss: false,
    }).then((Modal: HTMLIonModalElement) => {
      Modal.present();
      ModalService.ModalAberto = Modal;
    });
  }

  static FecharModal() {
    if (!ModalService.ModalAberto) { return; }
    ModalService.ModalAberto.dismiss();
    ModalService.ModalAberto = undefined;
  }
}
