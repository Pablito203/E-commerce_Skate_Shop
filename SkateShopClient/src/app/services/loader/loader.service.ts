import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  static loader: HTMLIonLoadingElement | null = null;

  constructor(private loaderController: LoadingController) { }

  criarLoader() {
    if (LoaderService.loader) {return;}
    this.loaderController.create({spinner: 'crescent'}).then(loader => {
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
