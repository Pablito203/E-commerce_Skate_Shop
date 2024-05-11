import { MenuController, NavController } from '@ionic/angular';
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
  busca = '';

  constructor(private modalService: ModalService,
              private storage: Storage,
              private usuarioService: UsuarioService,
              private navController: NavController,
              private menuController: MenuController)
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

  navigate(url: string) {
    this.menuController.close();
    this.navController.navigateForward(url);
    this.busca = '';
  }

  keyPress(tecla: number) {
    if (tecla == 13 && this.busca) {
      this.buscarProduto();
    }
  }

  buscarProduto() {
    this.menuController.close();
    this.navController.navigateForward('/produtos/search/' + this.busca);
    this.busca = '';
  }
}
