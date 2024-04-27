import { AlertaService } from './../../../services/alerta/alerta.service';
import { SacolaService } from './../../../services/sacola/sacola.service';
import { Component, Input, OnInit } from '@angular/core';
import { ImagemService } from 'src/app/services/imagem/imagem.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { TamanhoService } from 'src/app/services/tamanho/tamanho.service';

@Component({
  selector: 'produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss'],
})
export class ProdutoDetalheComponent  implements OnInit {
  Produto: any = {};
  Imagens: any[] = [];
  Tamanhos: any[] = [];
  @Input() ProdutoID: number = 0;
  TamanhoSelecionadoID: number = 0;
  Sacola: any[] = [];

  constructor(private imagemService: ImagemService,
              private produtoService: ProdutoService,
              private tamanhoService: TamanhoService,
              private sacolaService: SacolaService,
              private AlertaService: AlertaService) { }

  ngOnInit() {
    this.sacolaService.getSacola().then((data) => {
      this.Sacola = data || [];
    });
    this.getProduto();
    this.getImagens();
    this.getTamanhos();
  }

  getProduto () {
    return this.produtoService.GetByID(this.ProdutoID).subscribe((value: any) => {
      this.Produto = value.result[0];
    })
  }

  getImagens() {
    return this.imagemService.Getimagens(this.ProdutoID).subscribe((value: any) => {
      this.Imagens = value.result;
    })
  }

  getTamanhos() {
    return this.tamanhoService.GetTamanho(this.ProdutoID).subscribe((value: any) => {
      this.Tamanhos = value.result;
      if (this.Tamanhos.length) {
        this.setTamanhoSelecionado(this.Tamanhos[0]);
      }
    })
  }

  setTamanhoSelecionado(tamanho: any) {
    this.TamanhoSelecionadoID = tamanho.tamanhoID;
  }

  FecharModal(): void {
    ModalService.FecharModal();
  }

  addSacola() {
    let ProdutoSacola: any;

    if (this.Sacola.length > 0) {
      if (this.TamanhoSelecionadoID) {
        ProdutoSacola = this.Sacola.find((value: any) => value.produtoID == this.ProdutoID && value.tamanhoID === this.TamanhoSelecionadoID);
      } else {
        ProdutoSacola = this.Sacola.find((value: any) => value.produtoID == this.ProdutoID);
      }
    }

    if (ProdutoSacola) {
      ProdutoSacola.Quantidade++;
      this.sacolaService.salvarSacola(this.Sacola);
      this.mostrarToast('Produto adicionado na sacola');
      return;
    }

    let Produto: any = {
      produtoID: this.ProdutoID,
      nome: this.Produto.nome,
      valor: this.Produto.valor,
      caminhoImagem: this.Produto.caminhoImagem,
      Quantidade: 1
    };

    if (this.TamanhoSelecionadoID) {
      let tamanho = this.Tamanhos.find((value: any) => value.tamanhoID === this.TamanhoSelecionadoID);
      Produto.tamanhoNome = tamanho.nome;
      Produto.tamanhoID = this.TamanhoSelecionadoID
    }

    this.Sacola.push(Produto);
    this.sacolaService.salvarSacola(this.Sacola);
    this.mostrarToast('Produto adicionado na sacola');
  }

  mostrarToast(message: string) {
    this.AlertaService.CriarToast({message});
  }
}
