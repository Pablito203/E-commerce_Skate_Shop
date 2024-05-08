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
  @Input() ProdutoID: number = 0;

  Produto: any = {};
  Imagens: any[] = [];
  Tamanhos: any[] = [];
  TamanhoSelecionadoID: number = 0;
  Sacola: any[] = [];
  usuarioLogado: usuario | null = null;

  constructor(private imagemService: ImagemService,
              private produtoService: ProdutoService,
              private tamanhoService: TamanhoService,
              private sacolaService: SacolaService,
              private alertaService: AlertaService,
              private navController: NavController,
              private events: EventsService,
              private favoritosService: FavoritosService) { }

  ngOnInit() {
    this.usuarioLogado = UsuarioService.usuarioLogado;
    this.sacolaService.getSacola().then((data) => {
      this.Sacola = data || [];
    });
    this.getProduto();
    this.getImagens();
    this.getTamanhos();
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
    if (!UsuarioService.usuarioLogado) {
      this.alertaService.CriarToastMensagem('Acesse sua conta para adicionar aos favoritos', true);
      return;
    }

    if (this.Produto.favorito) {
      this.favoritosService.RemoverFavorito(this.Produto.produtoID).subscribe((data: any) => {
        this.events.publish('RemoveFavorito' + this.Produto.produtoID);
        this.favoritosService.ExecutarEventos(this.Produto.produtoID, true);
        this.Produto.favorito = false;
        this.alertaService.CriarToastMensagem('Produto removido dos favoritos');
      });
    } else {
      this.favoritosService.AdicionarFavorito(this.Produto.produtoID).subscribe((data: any) => {
        this.favoritosService.ExecutarEventos(this.Produto.produtoID, false);
        this.Produto.favorito = true;
        this.alertaService.CriarToastMensagem('Produto adicionado aos favoritos');
      });
    }
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
      this.sacolaService.salvarSacola(this.Sacola);
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
    this.sacolaService.salvarSacola(this.Sacola);
    this.alertaService.CriarToastMensagem('Produto adicionado na sacola');
  }

  EditarProduto() {
    this.navController.navigateForward('/add-produto/' + this.ProdutoID);
    this.FecharModal();
  }
}
