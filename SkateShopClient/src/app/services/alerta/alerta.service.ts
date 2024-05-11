import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AlertController, AlertOptions } from '@ionic/angular';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  static AlertaAberto: HTMLIonAlertElement | undefined = undefined;

  constructor(private AlertController: AlertController,
              private toastController: ToastController) { }

  CriarAlerta(options: AlertOptions) {
    if (AlertaService.AlertaAberto) {
      this.AlertController.dismiss();
    }

    this.AlertController.create(options).then((Alerta: HTMLIonAlertElement) => {
      Alerta.onDidDismiss().then(() => {
        AlertaService.AlertaAberto = undefined;
      });

      Alerta.present();
      AlertaService.AlertaAberto = Alerta;
    });
  }

  static FecharAlerta() {
    if (!AlertaService.AlertaAberto) { return; }
    AlertaService.AlertaAberto.dismiss();
    AlertaService.AlertaAberto = undefined;
  }

  CriarToast(options: ToastOptions, erro: boolean = false) {
    options.cssClass = [];
    if (erro) {
      options.cssClass.push('erro');
    }

    if (Capacitor.getPlatform() === 'web') {
      options.cssClass.push('web');
    }
    options.position = 'top';

    if (!options.duration) {
      options.duration = 1000;
    }

    this.toastController.create(options).then(toast => toast.present());
  }

  CriarToastMensagem(message: string, erro: boolean = false) {
    this.CriarToast({message}, erro);
  }
}
