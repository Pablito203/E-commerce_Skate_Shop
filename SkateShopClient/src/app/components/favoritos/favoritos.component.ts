import { LoaderService } from './../../services/loader/loader.service';
import { FavoritosService } from './../../services/favoritos/favoritos.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UsuarioService, usuario } from 'src/app/services/usuario/usuario.service';
import { ProdutoDetalheComponent } from '../produto-detalhe/produto-detalhe.component';

@Component({
  selector: 'favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {
  salvando = false;
  usuarioLogado: usuario | null = null;
  favoritos: any[] = [];
  carregado = false;

  constructor(private favoritosService: FavoritosService,
              private modalService: ModalService,
              private loaderService: LoaderService) {}

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
    if (this.salvando) {return;}
    this.salvando = true;

    this.modalService.CriarModal(ProdutoDetalheComponent, { ProdutoID: produto.produtoID }, "big");

    this.salvando = false;
  }

  Excluir(produto: any, index: number) {
    if (this.salvando) {return;}
    this.salvando = true;
    this.loaderService.criarLoader();

    let observer: any = {};
    observer.next = (data: any) => {
      this.favoritos.splice(index, 1);
      this.favoritosService.ExecutarEventos(produto.produtoID, true);
    };
    observer.complete = () => {
      this.loaderService.fecharLoader();
      this.salvando = false;
    };

    this.favoritosService.RemoverFavorito(produto.produtoID).subscribe(observer);
  }

  setCarregado() {
    this.carregado = true;
  }
}
