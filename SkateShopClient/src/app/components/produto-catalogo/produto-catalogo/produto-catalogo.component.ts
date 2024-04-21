import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProdutoDetalheComponent } from '../../produto-detalhe/produto-detalhe/produto-detalhe.component';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'produto-catalogo',
  templateUrl: './produto-catalogo.component.html',
  styleUrls: ['./produto-catalogo.component.scss'],
})
export class ProdutoCatalogoComponent {

  @Input() Produto: any = {
    nome: 'Shape element 8.0',
    caminhoImagem: 'https://images.tcdn.com.br/img/img_prod/1013584/shape_element_section_805_1_62a06d7ff54a0f4c2ee0949781becdc0.jpg',
    valor: 300
  }

  @Output() FavoritoClick: EventEmitter<void> = new EventEmitter<void>

  favorito = false;
  constructor(private modalService: ModalService) { }

  Favorito() {
    this.FavoritoClick.emit();
  }

  Card() {
    this.FavoritoClick.emit();
  }

  AbrirModalProdutoDetalhe() {
    this.modalService.CriarModal(ProdutoDetalheComponent, { ProdutoID: this.Produto.produtoID }, "big");
  }
}
