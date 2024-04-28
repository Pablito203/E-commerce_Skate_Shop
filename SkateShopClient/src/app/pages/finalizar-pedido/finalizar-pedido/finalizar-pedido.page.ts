import { NavController } from '@ionic/angular';
import { PedidoService } from './../../../services/pedido/pedido.service';
import { AlertaService } from './../../../services/alerta/alerta.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SacolaService } from 'src/app/services/sacola/sacola.service';
import { ProdutoDetalheComponent } from 'src/app/components/produto-detalhe/produto-detalhe/produto-detalhe.component';
import { EnderecoService } from 'src/app/services/endeco/endereco.service';

@Component({
  selector: 'finalizar-pedido',
  templateUrl: './finalizar-pedido.page.html',
  styleUrls: ['./finalizar-pedido.page.scss'],
})
export class FinalizarPedidoPage implements OnInit {
  Sacola: any[] = [];
  Enderecos: any[] = [];
  Total: number = 0;
  enderecoSelecionadoID: number = 0;

  constructor(private sacolaService: SacolaService,
              private modalService: ModalService,
              private enderecoService: EnderecoService,
              private alertaService: AlertaService,
              private pedidoService: PedidoService,
              private navController: NavController) { }

  ngOnInit() {
    this.enderecoService.GetEnderecosUsuario(3).subscribe((data: any) => {
      this.Enderecos = data.result;
      this.enderecoSelecionadoID = this.Enderecos[0].enderecoID || 0;
    });

    this.sacolaService.getSacola().then((data) => {
      this.Sacola = data || [];
      this.CalcularTotal();
    });

  }

  CalcularTotal() {
    this.Total = this.Sacola.reduce((acumulado, produto) => acumulado + produto.valor * produto.Quantidade, 0);
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

  AbrirModalProdutoDetalhe(produto: any) {
    this.modalService.CriarModal(ProdutoDetalheComponent, { ProdutoID: produto.produtoID }, "big");
  }

  GetNomeEndereco(endereco: any) {
    return this.enderecoService.GetNomeEndereco(endereco);
  }

  FinalizarPedido() {
    if (!this.Total) {
      this.alertaService.CriarToastMensagem("Nenhum item na sacola", true);
      return;
    }

    if (!this.enderecoSelecionadoID) {
      this.alertaService.CriarToastMensagem("Nenhum endereço selecionado no pedido", true);
      return;
    }

    let pedido = {
      usuarioID: 3,
      enderecoID: this.enderecoSelecionadoID,
      listaProduto: this.Sacola
    }

    this.pedidoService.CriarPedido(pedido).subscribe((data: any) => {
      this.alertaService.CriarToastMensagem("Pedido Realizado com sucesso, aguardando pagamento")
      this.sacolaService.salvarSacola([]);
      this.navController.navigateBack('/')
    });
  }
}
