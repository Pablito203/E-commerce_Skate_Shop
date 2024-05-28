import { LoaderService } from './../../services/loader/loader.service';
import { ModalService } from './../../services/modal/modal.service';
import { lastValueFrom } from 'rxjs';
import { TamanhoService } from 'src/app/services/tamanho/tamanho.service';
import { NavController, ToastOptions } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SacolaService } from 'src/app/services/sacola/sacola.service';
import { EnderecoService } from 'src/app/services/endeco/endereco.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { EnderecoCadastroComponent } from 'src/app/components/endereco-cadastro/endereco-cadastro.component';
import { PedidoDetalheComponent } from 'src/app/components/pedido-detalhe/pedido-detalhe.component';

@Component({
  selector: 'finalizar-pedido',
  templateUrl: './finalizar-pedido.page.html',
  styleUrls: ['./finalizar-pedido.page.scss'],
})
export class FinalizarPedidoPage implements OnInit {
  salvando = false;
  Sacola: any[] = [];
  Enderecos: any[] = [];
  Total: number = 0;
  enderecoSelecionadoID: number = 0;
  mostrarAvisoItensAJustados = false;

  carregado = false;

  constructor(private sacolaService: SacolaService,
              private enderecoService: EnderecoService,
              private alertaService: AlertaService,
              private pedidoService: PedidoService,
              private navController: NavController,
              private tamanhoService: TamanhoService,
              private produtoService: ProdutoService,
              private ModalService: ModalService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.getDados();
  }

  getDados() {
    this.sacolaService.getSacola().then((data) => {
      this.Sacola = data || [];
      this.CalcularTotal();

      let promises: Promise<any>[] = [];
      promises.push(this.getEndereco());

      if (this.Sacola.length > 0) {
        let lstProdutoIDComTamanho: any[] = [];
        let lstProdutoIDSemTamanho: any[] = [];

        this.Sacola.forEach((produto: any) =>  {
          if (produto.tamanhoID) {
            if (!lstProdutoIDComTamanho.includes(produto.produtoID)) {
              lstProdutoIDComTamanho.push(produto.produtoID)
            }
          } else {
            if (!lstProdutoIDSemTamanho.includes(produto.produtoID)) {
              lstProdutoIDSemTamanho.push(produto.produtoID)
            }
          }
        });

        if (lstProdutoIDComTamanho.length) {
          promises.push(this.ajustarQuantidadeProdutoComTamanho(lstProdutoIDComTamanho));
        }

        if (lstProdutoIDSemTamanho.length) {
          promises.push(this.ajustarQuantidadeProdutoSemTamanho(lstProdutoIDSemTamanho));
        }
      }

      Promise.all(promises).then(() => {
        let sacolaNova = this.Sacola.filter((produto: any) => !produto.excluir);
        this.sacolaService.salvarSacola(sacolaNova);
        this.Sacola = sacolaNova;

        if (this.mostrarAvisoItensAJustados) {
          let options: ToastOptions = {
            message: "Os itens podem ter sido excluídos ou ajustados, devido a quantidade em nosso estoque",
            duration: 5000
          }
          this.alertaService.CriarToast(options, true);
        }

        this.setCarregado();
      });
    });
  }

  getEndereco() {
    return lastValueFrom(this.enderecoService.GetEnderecosUsuario(UsuarioService.usuarioLogado?.usuarioID)).then((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.Enderecos = data.result;
      if (this.Enderecos.length) {
        this.enderecoSelecionadoID = this.Enderecos[0].enderecoID;
      }
    });
  }

  CalcularTotal() {
    this.Total = this.Sacola.reduce((acumulado, produto) => acumulado + produto.valor * produto.quantidade, 0);
  }

  setEnderecoSelecionado(event: any) {
    this.enderecoSelecionadoID = event.detail.value;
  }

  Excluir(index: number): void {
    this.Sacola.splice(index, 1);
    this.SalvarSacola();
    this.CalcularTotal();
  }

  SalvarSacola(): void {
    this.sacolaService.salvarSacola(this.Sacola);
    this.CalcularTotal();
  }

  GetNomeEndereco(endereco: any) {
    return this.enderecoService.GetNomeEndereco(endereco);
  }

  FinalizarPedido() {
    if (this.salvando) {return;}
    this.salvando = true;

    if (!this.Total) {
      this.alertaService.CriarToastMensagem("Nenhum item na sacola", true);
      this.salvando = false;
      return;
    }

    if (!this.enderecoSelecionadoID) {
      this.alertaService.CriarToastMensagem("Nenhum endereço selecionado no pedido", true);
      this.salvando = false;
      return;
    }

    this.loaderService.criarLoader();

    const pedido = {
      usuarioID: UsuarioService.usuarioLogado?.usuarioID,
      enderecoID: this.enderecoSelecionadoID,
      listaProduto: this.Sacola
    }

    const observer = this.criarObserverFinalizar();
    this.pedidoService.CriarPedido(pedido).subscribe(observer);
  }

  ajustarQuantidadeProdutoSemTamanho(lstProdutoIDSemTamanho: number[]) {
    return lastValueFrom(this.produtoService.GetByListaID(lstProdutoIDSemTamanho)).then((data: any) => {
      data.result.forEach((produtoRetorno: any) => {
        let produto = this.Sacola.find((produto) => produto.produtoID == produtoRetorno.produtoID);

        if (produtoRetorno.quantidadeEstoque < produto.quantidade || !produtoRetorno.ativo) {
          this.mostrarAvisoItensAJustados = true;

          if (produtoRetorno.quantidadeEstoque == 0 || !produtoRetorno.ativo) {
            produto.excluir = true;
          } else {
            produto.quantidade = produtoRetorno.quantidadeEstoque;
          }
        }

        produto.quantidadeMaxima = produtoRetorno.quantidadeEstoque;
      });
    });
  }

  ajustarQuantidadeProdutoComTamanho(lstProdutoIDComTamanho: number[]) {
    let promises: Promise<any>[] = [];

    lstProdutoIDComTamanho.forEach((produtoID) => {
      promises.push(lastValueFrom(this.tamanhoService.GetTamanho(produtoID)).then((data: any) => {
        let lstProduto = this.Sacola.filter((produto) => produto.produtoID == produtoID);

        data.result.forEach((tamanho: any) => {
          lstProduto.forEach((produto) => {
            if (produto.tamanhoID == tamanho.tamanhoID) {
              if (tamanho.quantidade < produto.quantidade) {
                this.mostrarAvisoItensAJustados = true;

                if (tamanho.quantidade == 0) {
                  produto.excluir = true;
                } else {
                  produto.quantidade = tamanho.quantidade;
                }
              }

              produto.quantidadeMaxima = tamanho.quantidade;
            }
          });
        });
      }));
    });

    return Promise.all(promises)
  }

  novoEndereco() {
    if (this.salvando) {return;}
    this.salvando = true;

    const callback = (endereco: any) => {
      this.Enderecos.push(endereco);
      this.enderecoSelecionadoID = endereco.enderecoID;
    };
    this.ModalService.CriarModal(EnderecoCadastroComponent, {callback: callback});

    this.salvando = false;
  }

  setCarregado() {
    this.carregado = true;
  }

  criarObserverFinalizar() {
    let observer: any = {};
    observer.next = (data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }
      this.alertaService.CriarToastMensagem("Pedido Realizado com sucesso, aguardando pagamento")
      this.sacolaService.salvarSacola([]);
      this.navController.navigateBack('/pedidos');
      this.ModalService.CriarModal(PedidoDetalheComponent, { pedido: data.result })
    };
    observer.complete = () => {
      this.loaderService.fecharLoader();
      this.salvando = false;
    }

    return observer;
  }

}
