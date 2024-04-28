import { AlertaService } from './../../services/alerta/alerta.service';
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

  constructor(private produtoService: ProdutoService,
              private alertaService: AlertaService) { }

  ngOnInit() {
    this.produtoService.GetLancamentos().subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.lancamentos = data.result;
    });

    this.produtoService.GetDestaques().subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.destaques = data.result;
    });
  }
}
