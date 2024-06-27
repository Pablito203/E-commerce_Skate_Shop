import { LoaderService } from './../../services/loader/loader.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FavoritosService } from './../../services/favoritos/favoritos.service';
import { ProdutoDetalheComponent } from './../produto-detalhe/produto-detalhe.component';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { EventsService } from 'src/app/services/events/events.service';
import { LoginRegisterComponent } from '../login-register/login-register.component';

@Component({
  selector: 'produto-catalogo',
  templateUrl: './produto-catalogo.component.html',
  styleUrls: ['./produto-catalogo.component.scss'],
})
export class ProdutoCatalogoComponent implements OnInit, OnDestroy {
  salvando = false;
  @Input() produto: any = {}
  @Input() tipo: string = 'Lista';
  usuarioLogado = UsuarioService.usuarioLogado;

  constructor(private modalService: ModalService,
              private favoritosService: FavoritosService,
              private events: EventsService,
              private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.events.subscribe('RemoveFavorito' + this.tipo + this.produto.produtoID, () => {
      this.produto.favorito = false;
    });

    this.events.subscribe('AdicionaFavorito' + this.tipo + this.produto.produtoID, () => {
      this.produto.favorito = true;
    });
  }

  ngOnDestroy(): void {
    this.events.destroy('RemoveFavorito' + this.tipo + this.produto.produtoID);
    this.events.destroy('AdicionaFavorito' + this.tipo + this.produto.produtoID);
  }

  Favorito() {
    if (this.salvando) {return;}
    this.salvando = true;

    if (!UsuarioService.usuarioLogado) {
      this.salvando = false;
      this.abrirModalLogin();
      return;
    }

    this.loaderService.criarLoader();
    const observer = this.criarObserverFavorito(this.produto.favorito);
    if (this.produto.favorito) {
      this.favoritosService.RemoverFavorito(this.produto.produtoID).subscribe(observer);
    } else {
      this.favoritosService.AdicionarFavorito(this.produto.produtoID).subscribe(observer);
    }
  }

  AbrirModalProdutoDetalhe() {
    if (this.salvando) {return;}
    this.salvando = true;

    this.modalService.CriarModal(ProdutoDetalheComponent, { ProdutoID: this.produto.produtoID }, "big");

    this.salvando = false;
  }

  criarObserverFavorito(RemoverFavorito: boolean) {
    let observer: any = {};
    observer.next = (data: any) => {
      this.favoritosService.ExecutarEventos(this.produto.produtoID, RemoverFavorito);
    };

    observer.complete = () => {
      this.loaderService.fecharLoader();
      this.salvando = false;
    }

    return observer;
  }

  abrirModalLogin() {
    if (this.salvando) {return;}
    this.salvando = true;

    this.modalService.CriarModal(LoginRegisterComponent);

    this.salvando = false;
  }
}
