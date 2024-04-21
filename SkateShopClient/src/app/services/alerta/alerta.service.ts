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
      Alerta.present();
      AlertaService.AlertaAberto = Alerta;
    });
  }

  static FecharAlerta() {
    if (!AlertaService.AlertaAberto) { return; }
    AlertaService.AlertaAberto.dismiss();
    AlertaService.AlertaAberto = undefined;
  }

  CriarToast(options: ToastOptions) {
    if (Capacitor.getPlatform() === 'web') {
      options.cssClass = 'web';
      options.position = 'top';
    }
    options.duration = 1000;

    this.toastController.create(options).then(toast => toast.present());
  }
}
