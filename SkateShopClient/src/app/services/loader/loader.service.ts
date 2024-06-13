import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  static loader: HTMLIonLoadingElement | null = null;

  constructor(private loaderController: LoadingController) { }

  criarLoader() {
    if (LoaderService.loader) { return Promise.resolve(); }
    return this.loaderController.create({spinner: 'crescent', backdropDismiss: false}).then(loader => {
      loader.onDidDismiss().then(() => {
        LoaderService.loader = null;
      });

      LoaderService.loader = loader;
      loader.present();
    })
  }

  fecharLoader() {
    if (!LoaderService.loader) {return;}

    LoaderService.loader.dismiss();
    LoaderService.loader = null;
  }
}
