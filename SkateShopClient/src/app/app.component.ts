import { Component } from '@angular/core';
import { ModalService } from './services/modal/modal.service';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { SacolaComponent } from './components/sacola/sacola.component';
import { Storage } from "@ionic/storage-angular";
import { UsuarioService, usuario } from './services/usuario/usuario.service';
import { DadosUsuarioComponent } from './components/dados-usuario/dados-usuario.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuarioLogado: usuario | null = null;

  constructor(private modalService: ModalService,
              private storage: Storage,
              private usuarioService: UsuarioService)
  {
    this.storage.create();
    this.storage.get('usuario').then((value: usuario | null) => {
      UsuarioService.usuarioLogado = value;
      this.usuarioLogado = UsuarioService.usuarioLogado;
    });
  }

  AbrirModalFavoritos() {
    this.modalService.CriarModal(FavoritosComponent);
  }

  AbrirModalSacola() {
    this.modalService.CriarModal(SacolaComponent);
  }

  AbrirModalConta() {
    this.modalService.CriarModal(DadosUsuarioComponent);
  }

  Desconectar() {
    this.usuarioService.setUsuarioLogado(null);
  }
}
