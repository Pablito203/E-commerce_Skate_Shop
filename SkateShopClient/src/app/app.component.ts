import { Component } from '@angular/core';
import { ModalService } from './services/modal/modal.service';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { SacolaComponent } from './components/sacola/sacola.component';
import { Storage } from "@ionic/storage-angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private modalService: ModalService) {}

  AbrirModalFavoritos() {
    this.modalService.CriarModal(FavoritosComponent);
  }

  AbrirModalSacola() {
    this.modalService.CriarModal(SacolaComponent);
  }
}
