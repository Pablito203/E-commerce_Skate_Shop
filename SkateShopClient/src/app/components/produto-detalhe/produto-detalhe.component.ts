import { LoaderService } from './../../services/loader/loader.service';
import { lastValueFrom } from 'rxjs';
import { FavoritosService } from './../../services/favoritos/favoritos.service';
import { EventsService } from './../../services/events/events.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SacolaService } from 'src/app/services/sacola/sacola.service';
import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { ImagemService } from 'src/app/services/imagem/imagem.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { TamanhoService } from 'src/app/services/tamanho/tamanho.service';
import { UsuarioService, usuario } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss'],
})
export class ProdutoDetalheComponent implements OnInit {
  salvando = false;
  @Input() ProdutoID: number = 0;

  Produto: any = {};
  Imagens: any[] = [];
  Tamanhos: any[] = [];
  TamanhoSelecionadoID: number = 0;
  Sacola: any[] = [];
  usuarioLogado: usuario | null = null;
  carregado = false;

  constructor(private imagemService: ImagemService,
              private produtoService: ProdutoService,
              private tamanhoService: TamanhoService,
              private sacolaService: SacolaService,
              private alertaService: AlertaService,
              private navController: NavController,
              private events: EventsService,
              private favoritosService: FavoritosService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.usuarioLogado = UsuarioService.usuarioLogado;
    this.sacolaService.getSacola().then((data) => {
      this.Sacola = data || [];

      let promises: any[] = [];
      promises.push(this.getProduto());
      promises.push(this.getImagens());
      promises.push(this.getTamanhos());

      Promise.all(promises).then(() => this.setCarregado());
    });
  }

  getProduto () {
    return lastValueFrom(this.produtoService.GetByID(this.ProdutoID)).then((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.Produto = data.result[0];
    })
  }

  getImagens() {
    return lastValueFrom(this.imagemService.GetImagens(this.ProdutoID)).then((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.Imagens = data.result;
    })
  }

  getTamanhos() {
    return lastValueFrom(this.tamanhoService.GetTamanho(this.ProdutoID)).then((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.Tamanhos = data.result;
      if (this.Tamanhos.length) {
        let primeiroTamanhoComEstoque = this.Tamanhos.findIndex((tamanho) => tamanho.quantidade > 0);
        if (primeiroTamanhoComEstoque != -1) {
          this.setTamanhoSelecionado(this.Tamanhos[primeiroTamanhoComEstoque]);
        }
      }
    })
  }

  setTamanhoSelecionado(tamanho: any) {
    if (tamanho.quantidade == 0) {
      return;
    }
    this.TamanhoSelecionadoID = tamanho.tamanhoID;
  }

  FecharModal(): void {
    ModalService.FecharModal();
  }

  addFavoritos() {
    if (this.salvando) {return;}
    this.salvando = true;

    if (!UsuarioService.usuarioLogado) {
      this.alertaService.CriarToastMensagem('Acesse sua conta para adicionar aos favoritos', true);
      this.salvando = false;
      return;
    }

    this.loaderService.criarLoader();
    const observer = this.criarObserverFavorito(this.Produto.favorito);
    if (this.Produto.favorito) {
      this.favoritosService.RemoverFavorito(this.Produto.produtoID).subscribe(observer);
    } else {
      this.favoritosService.AdicionarFavorito(this.Produto.produtoID).subscribe(observer);
    }
  }

  addSacola() {
    if (this.salvando) {return;}
    this.salvando = true;

    let ProdutoSacola: any;

    if (this.Sacola.length > 0) {
      if (this.TamanhoSelecionadoID) {
        ProdutoSacola = this.Sacola.find((value: any) => value.produtoID == this.ProdutoID && value.tamanhoID === this.TamanhoSelecionadoID);
      } else {
        ProdutoSacola = this.Sacola.find((value: any) => value.produtoID == this.ProdutoID);
      }
    }

    if (ProdutoSacola) {
      if (this.TamanhoSelecionadoID) {
        let tamanho = this.Tamanhos.find((value: any) => value.tamanhoID === this.TamanhoSelecionadoID);
        ProdutoSacola.quantidadeMaxima = tamanho.quantidade;
      } else {
        ProdutoSacola.quantidadeMaxima = this.Produto.quantidadeEstoque;
      }

      if (ProdutoSacola.quantidade + 1 > ProdutoSacola.quantidadeMaxima) {
        this.alertaService.CriarToastMensagem('Quantidade de estoque insuficiente', true);
      } else {
        ProdutoSacola.quantidade++;
        this.alertaService.CriarToastMensagem('Produto adicionado na sacola');
      }
      this.sacolaService.salvarSacola(this.Sacola).finally(() => this.salvando = false);
      return;
    }

    let Produto: any = {
      produtoID: this.ProdutoID,
      nome: this.Produto.nome,
      valor: this.Produto.valor,
      caminhoImagem: this.Produto.caminhoImagem,
      quantidade: 1
    };

    if (this.TamanhoSelecionadoID) {
      let tamanho = this.Tamanhos.find((value: any) => value.tamanhoID === this.TamanhoSelecionadoID);
      Produto.tamanhoNome = tamanho.nome;
      Produto.tamanhoID = this.TamanhoSelecionadoID;
      Produto.quantidadeMaxima = tamanho.quantidade;
    } else {
      Produto.quantidadeMaxima = this.Produto.quantidadeEstoque;
    }

    this.Sacola.push(Produto);
    this.sacolaService.salvarSacola(this.Sacola).finally(() => this.salvando = false);
    this.alertaService.CriarToastMensagem('Produto adicionado na sacola');
  }

  EditarProduto() {
    if (this.salvando) {return;}
    this.salvando = true;

    this.navController.navigateForward('/add-produto/' + this.ProdutoID);
    this.FecharModal();

    this.salvando = false;
  }

  setCarregado() {
    this.carregado = true;
  }

  criarObserverFavorito(removerFavorito: boolean) {
    let observer: any = {};
    observer.next = (data: any) => {
      this.Produto.favorito = !removerFavorito;
      this.favoritosService.ExecutarEventos(this.Produto.produtoID, removerFavorito);

      if (removerFavorito) {
        this.events.publish('RemoveFavorito' + this.Produto.produtoID);
        this.alertaService.CriarToastMensagem('Produto removido dos favoritos');
      } else {
        this.alertaService.CriarToastMensagem('Produto adicionado aos favoritos');
      }
    };

    observer.complete = () => {
      this.loaderService.fecharLoader();
      this.salvando = false;
    }

    return observer;
  }
}
