import { AlertaService } from './../../services/alerta/alerta.service';
import { TamanhoService } from './../../services/tamanho/tamanho.service';
import { ImagemService } from './../../services/imagem/imagem.service';
import { AnexoLocalService } from './../../services/anexo-local/anexo-local.service';
import { NavController } from '@ionic/angular';
import { ProdutoService } from './../../services/produto/produto.service';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
})
export class AddProdutoPage {

  Produto: any = {
    TamanhoUnico: false
  }

  TamanhoEdit: any = {

  }
  Tamanhos: any[] = [];
  EditandoTamanho: boolean = false;

  Imagens: any[] = [];

  constructor(private produtoService: ProdutoService,
              private navController: NavController,
              private anexoLocalService: AnexoLocalService,
              private imagemService: ImagemService,
              private tamanhoService: TamanhoService,
              private alertaService: AlertaService) { }

  anexar() {
    this.anexoLocalService.Carregar().then((values: any[]) => {
      this.Imagens = values;
    });
  }

  addTamanho() {
    this.EditandoTamanho = true;
  }

  editTamanho(Tamanho: any) {
    this.TamanhoEdit = Tamanho;
    this.EditandoTamanho = true;
  }

  cancelarTamanho() {
    this.TamanhoEdit = {};
    this.EditandoTamanho = false;
  }

  salvarTamanho() {
    this.Tamanhos.push(this.TamanhoEdit);
    this.TamanhoEdit = {};
    this.EditandoTamanho = false;
  }

  salvar() {
    this.produtoService.PostProduto(this.Produto).subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      let promises: any = [];
      if (this.Imagens.length > 0) {
        this.Imagens.forEach(imagem => {
          imagem.ProdutoID = data.result.produtoID;
          promises.push(lastValueFrom(this.imagemService.PostImagem(imagem)))
        })
      }

      if (!this.Produto.TamanhoUnico && this.Tamanhos.length > 0) {
        this.Tamanhos.forEach(tamanho => {
          tamanho.ProdutoID = data.result.produtoID;
          promises.push(lastValueFrom(this.tamanhoService.PostTamanho(tamanho)))
        })
      }

      if (promises.length > 0) {
        Promise.all(promises).then((values) => {
          this.navController.navigateBack('/');
        })
      } else {
        this.navController.navigateBack('/');
      }
    });
  }

}
