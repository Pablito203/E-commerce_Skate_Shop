import { FavoritosService } from './../../services/favoritos/favoritos.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UsuarioService, usuario } from 'src/app/services/usuario/usuario.service';
import { ProdutoDetalheComponent } from '../produto-detalhe/produto-detalhe.component';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {
  usuarioLogado: usuario | null = null;
  favoritos: any[] = [];
  carregado = false;

  constructor(private favoritosService: FavoritosService,
              private modalService: ModalService,
              private events: EventsService) {}

  ngOnInit(): void {
    this.usuarioLogado = UsuarioService.usuarioLogado;
    if (!this.usuarioLogado) { return; }

    this.favoritosService.GetFavoritos().subscribe((data: any) => {
      this.favoritos = data.result;
      this.setCarregado();
    });
  }

  FecharModal(): void {
    ModalService.FecharModal();
  }

  AbrirModalProdutoDetalhe(produto: any) {
    this.modalService.CriarModal(ProdutoDetalheComponent, { ProdutoID: produto.produtoID }, "big");
  }

  Excluir(produto: any, index: number) {
    this.favoritosService.RemoverFavorito(produto.produtoID).subscribe((data: any) => {
      this.favoritos.splice(index, 1);
      this.favoritosService.ExecutarEventos(produto.produtoID, true);
    });
  }

  setCarregado() {
    this.carregado = true;
  }
}
