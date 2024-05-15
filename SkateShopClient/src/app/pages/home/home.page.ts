import { lastValueFrom } from 'rxjs';
import { NavController } from '@ionic/angular';
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
  documentElement: any;
  math = Math;
  carregado = false;

  constructor(private produtoService: ProdutoService,
              private alertaService: AlertaService,
              private navController: NavController) { }

  ngOnInit() {
    this.documentElement = document.documentElement;
    let promises: any[] = [];
    promises.push(this.carregarLancamentos());
    promises.push(this.carregarDestaques());

    setTimeout(() => {
      Promise.all(promises).then(() => this.setCarregado())
    }, 100);
  }

  carregarLancamentos() {
    return lastValueFrom(this.produtoService.GetLancamentos()).then((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.lancamentos = data.result;
    });
  }

  carregarDestaques() {
    return lastValueFrom(this.produtoService.GetDestaques()).then((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.destaques = data.result;
    });
  }

  navigate(url: string) {
    this.navController.navigateForward(url);
  }

  setCarregado() {
    this.carregado = true;
  }
}
