import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FavoritosService } from './../../services/favoritos/favoritos.service';
import { ProdutoDetalheComponent } from './../produto-detalhe/produto-detalhe.component';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'produto-catalogo',
  templateUrl: './produto-catalogo.component.html',
  styleUrls: ['./produto-catalogo.component.scss'],
})
export class ProdutoCatalogoComponent implements OnInit, OnDestroy {
  @Input() produto: any = {}
  @Input() tipo: string = 'Lista';

  constructor(private modalService: ModalService,
              private favoritosService: FavoritosService,
              private events: EventsService) { }

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
    if (this.produto.favorito) {
      this.favoritosService.RemoverFavorito(this.produto.produtoID).subscribe((data: any) => {
        this.favoritosService.ExecutarEventos(this.produto.produtoID, true);
      });
    } else {
      if (UsuarioService.usuarioLogado) {
        this.favoritosService.AdicionarFavorito(this.produto.produtoID).subscribe((data: any) => {
          this.favoritosService.ExecutarEventos(this.produto.produtoID, false);
        });
      }
    }
  }

  AbrirModalProdutoDetalhe() {
    this.modalService.CriarModal(ProdutoDetalheComponent, { ProdutoID: this.produto.produtoID }, "big");
  }
}
