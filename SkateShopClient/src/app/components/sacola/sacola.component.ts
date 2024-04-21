import { SacolaService } from './../../services/sacola/sacola.service';
import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProdutoDetalheComponent } from '../produto-detalhe/produto-detalhe/produto-detalhe.component';

@Component({
  selector: 'sacola',
  templateUrl: './sacola.component.html',
  styleUrls: ['./sacola.component.scss'],
})
export class SacolaComponent implements OnInit {
  Sacola = [];

  constructor(private Storage: Storage,
              private sacolaService: SacolaService,
              private modalService: ModalService) {}

  ngOnInit(): void {
    this.sacolaService.getSacola().then((data) => {
      this.Sacola = data;
    })
  }

  FecharModal(): void {
    this.Storage.set('sacola', this.Sacola);
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
}
