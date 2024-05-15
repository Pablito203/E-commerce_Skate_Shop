import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.scss'],
})
export class PedidoDetalheComponent  implements OnInit {
  @Input() pedido: any = {};

  produtos = [];
  vencido = false;
  situacao = '';
  usuarioLogado = UsuarioService.usuarioLogado;
  carregado = false;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.vencido = new Date(this.pedido.dataVencimento) <= new Date();
    this.setSituacao();
    this.carregarProdutos();
  }

  FecharModal() {
    ModalService.FecharModal();
  }

  carregarProdutos() {
    this.pedidoService.GetProdutosPedido(this.pedido.pedidoID).subscribe((data: any) => {
      this.produtos = data.result;
      this.setCarregado();
    });
  }

  setSituacao() {
    if (!this.pedido.pagamentoRealizado && this.vencido) {
      this.situacao = 'Cancelado';
      return;
    }

    this.situacao = this.pedido.pagamentoRealizado ? 'Pagamento recebido' : 'Aguardando pagamento'
  }

  setCarregado() {
    this.carregado = true;
  }
}
