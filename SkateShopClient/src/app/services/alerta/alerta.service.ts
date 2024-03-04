import { Injectable } from '@angular/core';
import { AlertController, AlertOptions  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  static AlertaAberto: HTMLIonAlertElement | undefined = undefined;

  constructor(private AlertController: AlertController) { }

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
}
