import { ProdutoService } from './../../services/produto/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  lancamentos: any = [];
  destaques: any = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtoService.GetLancamentos().subscribe((value: any) => {
      this.lancamentos = value.result;
    });

    this.produtoService.GetDestaques().subscribe((value: any) => {
      this.destaques = value.result;
    });
  }

}
