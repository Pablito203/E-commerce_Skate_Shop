import { ProdutoService } from './../../services/produto/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  title: string = 'Produtos';
  tipo: string = 'roupas';
  tipoID: number | undefined = undefined;
  pesquisa: string = '';
  produtos = [];
  produtosPorChunck = 12;
  quantidadeChunks = 0;
  chunckAtual = 0;
  lstChuncks: number[][]= [];
  math = Math;
  carregado = false;

  constructor(private route: ActivatedRoute,
              private produtoService: ProdutoService) {
    route.params.subscribe((params: any) =>  {
      this.title = params.subTipo || params.tipo;
      this.tipo = params.tipo;
      if (!params.subTipo) { return; }

      if (this.tipo === 'search') {
        this.pesquisa = params.subTipo;
        this.title = `"${this.pesquisa}"`;
      } else {
        let tipos = this.tipo == 'roupas' ? ProdutoService.TiposRoupa : ProdutoService.TiposSkate;
        this.tipoID = tipos.find((tipo) => tipo.nome.toLowerCase() === this.title)?.id
      }
    });
  }

  ngOnInit() {
    this.produtoService.GetProdutosID(this.tipo, this.tipoID, this.pesquisa).subscribe((data: any) => {
      let lstProdutosID = data.result;
      if (!lstProdutosID.length) { return; }

      this.quantidadeChunks = Math.ceil(lstProdutosID.length / this.produtosPorChunck) - 1;

      for (var i = 0; i <= this.quantidadeChunks; i++) {
        this.lstChuncks.push(lstProdutosID.splice(0, this.produtosPorChunck));
      }

      this.produtoService.GetByListaID(this.lstChuncks[this.chunckAtual]).subscribe((value: any) => {
        this.produtos = value.result;
        this.setCarregado();
      });
    })
  }

  onIonInfinite(e: any) {
    if (this.chunckAtual >= this.quantidadeChunks) {
      e.target.disabled = true;
      e.target.complete();
      return;
    }

    setTimeout(() => {
      this.produtoService.GetByListaID(this.lstChuncks[this.chunckAtual + 1]).subscribe((data: any) => {
        this.produtos = this.produtos.concat(data.result);
        this.chunckAtual += 1;

        if (this.chunckAtual >= this.quantidadeChunks) {
          e.target.disabled = true;
        }
        e.target.complete();
      });
    }, 100);
  }

  setCarregado() {
    this.carregado = true;
  }
}
