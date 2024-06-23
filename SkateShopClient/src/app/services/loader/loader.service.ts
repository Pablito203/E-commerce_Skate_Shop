import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  static loader: HTMLIonLoadingElement | null = null;
  static loaderAberto = false;

  constructor(private loaderController: LoadingController) { }

  criarLoader() {
    if (LoaderService.loaderAberto) { return Promise.resolve(); }
    LoaderService.loaderAberto = true;
    return this.loaderController.create({spinner: 'crescent', backdropDismiss: false}).then(loader => {
      if (!LoaderService.loaderAberto) {return;}
      loader.onDidDismiss().then(() => {
        LoaderService.loader = null;
      });

      LoaderService.loader = loader;
      loader.present();
    })
  }

  fecharLoader() {
    if (!LoaderService.loaderAberto) {return;}

    LoaderService.loader?.dismiss();
    LoaderService.loader = null;
    LoaderService.loaderAberto = false;
  }
}
