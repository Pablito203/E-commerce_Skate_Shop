import { Component } from '@angular/core';
import { ModalService } from './services/modal/modal.service';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { SacolaComponent } from './components/sacola/sacola.component';
import { Storage } from "@ionic/storage-angular";
import { LoginRegisterComponent } from './components/login-register/login-register/login-register.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private modalService: ModalService,
              private storage: Storage)
  {
    this.storage.create();
  }

  AbrirModalFavoritos() {
    this.modalService.CriarModal(FavoritosComponent);
  }

  AbrirModalSacola() {
    this.modalService.CriarModal(SacolaComponent);
  }

  AbrirModalConta() {
    this.modalService.CriarModal(LoginRegisterComponent);
  }
}
