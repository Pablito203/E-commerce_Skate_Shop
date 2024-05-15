import { LoginRegisterComponent } from './../login-register/login-register.component';
import { NavController } from '@ionic/angular';
import { SacolaService } from './../../services/sacola/sacola.service';
import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProdutoDetalheComponent } from '../produto-detalhe/produto-detalhe.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'sacola',
  templateUrl: './sacola.component.html',
  styleUrls: ['./sacola.component.scss'],
})
export class SacolaComponent implements OnInit {
  Sacola = [];
  carregado = false;

  constructor(private Storage: Storage,
              private sacolaService: SacolaService,
              private modalService: ModalService,
              private navController: NavController) {}

  ngOnInit(): void {
    this.sacolaService.getSacola().then((data) => {
      this.Sacola = data;
      this.setCarregado();
    });
  }

  FecharModal(): void {
    ModalService.FecharModal();
  }

  Excluir(index: number): void {
    this.Sacola.splice(index, 1);
    this.Salvar();
  }

  Salvar(): void {
    this.Storage.set('sacola', this.Sacola);
  }

  AbrirModalProdutoDetalhe(produto: any) {
    this.modalService.CriarModal(ProdutoDetalheComponent, { ProdutoID: produto.produtoID }, "big");
  }

  FecharPedido() {
    if (UsuarioService.usuarioLogado) {
      this.navController.navigateForward('/finalizar-pedido');
      ModalService.FecharModal();
    } else {
      this.modalService.CriarModal(LoginRegisterComponent);
    }
  }

  setCarregado() {
    this.carregado = true;
  }
}
