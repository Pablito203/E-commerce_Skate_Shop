import { AlertaService } from './../../services/alerta/alerta.service';
import { TamanhoService } from './../../services/tamanho/tamanho.service';
import { ImagemService } from './../../services/imagem/imagem.service';
import { AnexoLocalService } from './../../services/anexo-local/anexo-local.service';
import { AlertOptions, NavController } from '@ionic/angular';
import { ProdutoService } from './../../services/produto/produto.service';
import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
})
export class AddProdutoPage implements OnInit {
  @Input() ProdutoID: number = 0;

  TiposRoupa = ProdutoService.TiposRoupa;
  TiposSkate = ProdutoService.TiposSkate;

  Produto: any = {
    tamanhoUnico: true
  }

  TamanhoEdit: any = {

  }
  Tamanhos: any[] = [];
  EditandoTamanho: boolean = false;

  Imagens: any[] = [];
  ImagensRemovidas: any[] = [];

  constructor(private produtoService: ProdutoService,
              private navController: NavController,
              private anexoLocalService: AnexoLocalService,
              private imagemService: ImagemService,
              private tamanhoService: TamanhoService,
              private alertaService: AlertaService,
              private route: ActivatedRoute) {
                route.params.subscribe((params: any) => this.ProdutoID = parseInt(params.id));
              }

  ngOnInit(): void {
    if (this.ProdutoID) {
      this.getProduto();
      this.getImagens();
      this.getTamanhos();
    }
  }

  getProduto () {
    return this.produtoService.GetByID(this.ProdutoID).subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.Produto = data.result[0];
    })
  }

  getImagens() {
    return this.imagemService.GetImagens(this.ProdutoID).subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.Imagens = data.result;
    })
  }

  getTamanhos() {
    return this.tamanhoService.GetTamanho(this.ProdutoID).subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.Tamanhos = data.result;
    })
  }

  anexar() {
    this.anexoLocalService.Carregar().then((values: any[]) => {
      this.Imagens = this.Imagens.concat(values);
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

  validarDadosSalvarTamanho() {
    if (!this.TamanhoEdit.nome) {
      this.alertaService.CriarToastMensagem("Informe o nome do tamanho", true);
      return false;
    }

    if (!this.TamanhoEdit.quantidade && this.TamanhoEdit.quantidade !== 0) {
      this.alertaService.CriarToastMensagem("Informe a quantidade do tamanho", true);
      return false;
    }

    return true;
  }

  salvarTamanho() {
    if (!this.validarDadosSalvarTamanho()) {
      return;
    }

    if (this.TamanhoEdit.tamanhoID) {
      this.TamanhoEdit.editado = true;
      this.TamanhoEdit = {};
      this.EditandoTamanho = false;
      return;
    }

    this.TamanhoEdit.salvo = true;
    this.Tamanhos.push(this.TamanhoEdit);
    this.TamanhoEdit = {};
    this.EditandoTamanho = false;
  }

  excluirTamanho() {
    const AlertaOptions: AlertOptions =  {};
    AlertaOptions.header = 'Excluir';
    AlertaOptions.message = 'Deseja excluir o tamanho?';
    AlertaOptions.buttons = [
      {
        text: 'Cancelar',
        handler: () => {}
      },
      {
        text: 'Excluir',
        handler: () => {
          this.TamanhoEdit.excluido = true;
          this.TamanhoEdit = {};
          this.EditandoTamanho = false;
        }
      }
    ]

    this.alertaService.CriarAlerta(AlertaOptions);
  }

  excluirImagem(imagemIndex: number) {
    this.ImagensRemovidas.push(this.Imagens[imagemIndex]);
    this.Imagens.splice(imagemIndex, 1);
  }

  validarDadosSalvar() {
    if (!this.Produto.nome) {
      this.alertaService.CriarToastMensagem("Informe o nome do produto", true);
      return false;
    }

    if (!this.Produto.valor) {
      this.alertaService.CriarToastMensagem("Informe o valor do produto", true);
      return false;
    }

    if (this.Produto.tamanhoUnico && !this.Produto.quantidadeEstoque && this.Produto.quantidadeEstoque !== 0) {
      this.alertaService.CriarToastMensagem("Informe a quantidade do produto", true);
      return false;
    }

    if (!this.Produto.tamanhoUnico && this.Tamanhos.length === 0) {
      this.alertaService.CriarToastMensagem("É necessário adicionar pelo menos um tamanho para produtos que não são de tamanho único", true);
      return false;
    }

    if (this.Imagens.length === 0) {
      this.alertaService.CriarToastMensagem("É necessário selecionar pelo menos uma imagem", true);
      return false;
    }

    return true;
  }

  salvar() {
    if (!this.validarDadosSalvar()) {
      return;
    }

    let request = this.ProdutoID ? this.produtoService.PutProduto(this.Produto) : this.produtoService.PostProduto(this.Produto)
    request.subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      let promises: Promise<any>[] = [];
      if (this.Imagens.length > 0) {
        this.Imagens.forEach(imagem => {
          if (!imagem.imagemID) {
            imagem.ProdutoID = data.result.produtoID;
            promises.push(lastValueFrom(this.imagemService.PostImagem(imagem)));
          }
        });
      }

      if (this.ImagensRemovidas.length > 0) {
        this.ImagensRemovidas.forEach(imagem => {
          if (imagem.imagemID) {
            promises.push(lastValueFrom(this.imagemService.DeleteImagem(imagem.imagemID)));
          }
        });
      }

      if (!this.Produto.TamanhoUnico && this.Tamanhos.length > 0) {
        this.Tamanhos.forEach(tamanho => {
          if (!tamanho.tamanhoID && !tamanho.excluido) {
            tamanho.ProdutoID = data.result.produtoID;
            promises.push(lastValueFrom(this.tamanhoService.PostTamanho(tamanho)));
          } else if (tamanho.editado && !tamanho.excluido) {
            promises.push(lastValueFrom(this.tamanhoService.PutTamanho(tamanho)));
          } else if (tamanho.excluido && tamanho.tamanhoID) {
            promises.push(lastValueFrom(this.tamanhoService.DeleteTamanho(tamanho.tamanhoID)));
          }
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

  excluir() {
    const AlertaOptions: AlertOptions =  {};
    AlertaOptions.header = 'Excluir';
    AlertaOptions.message = 'Deseja excluir o produto?';
    AlertaOptions.buttons = [
      {
        text: 'Cancelar',
        handler: () => {}
      },
      {
        text: 'Excluir',
        handler: () => {
          this.produtoService.DeleteProduto(this.ProdutoID).subscribe((data: any) => {
            if (data.mensagemErro) {
              this.alertaService.CriarToastMensagem(data.mensagemErro, true);
              return;
            }

            this.navController.navigateBack('/');
          });
        }
      }
    ]

    this.alertaService.CriarAlerta(AlertaOptions);
  }
}
