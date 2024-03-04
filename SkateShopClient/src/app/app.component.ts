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
  constructor(private modalService: ModalService,
              private storage: Storage) {

    let sacola: any = [];

    sacola.push({
      Nome: 'Shape Maple Element',
      TamanhoNome: '8.0',
      CaminhoImagem: 'https://images.tcdn.com.br/img/img_prod/1013584/shape_element_section_805_1_62a06d7ff54a0f4c2ee0949781becdc0.jpg',
      Quantidade: 3
    });

    sacola.push({
      Nome: 'Shape Maple Element 2',
      TamanhoNome: '7.75',
      CaminhoImagem: 'https://images.tcdn.com.br/img/img_prod/1013584/shape_element_section_805_1_62a06d7ff54a0f4c2ee0949781becdc0.jpg',
      Quantidade: 1
    });

    this.storage.create().then(() => {
      // this.storage.set('sacola', sacola);
    });
  }

  AbrirModalFavoritos() {
    this.modalService.CriarModal(FavoritosComponent);
  }

  AbrirModalSacola() {
    this.modalService.CriarModal(SacolaComponent);
  }
}
