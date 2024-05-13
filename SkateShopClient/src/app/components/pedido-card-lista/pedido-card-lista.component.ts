import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pedido-card-lista',
  templateUrl: './pedido-card-lista.component.html',
  styleUrls: ['./pedido-card-lista.component.scss'],
})
export class PedidoCardListaComponent  implements OnInit {
  @Input() pedido: any = {};

  vencido = false;
  situacao = '';
  constructor() { }

  ngOnInit() {
    this.vencido = new Date(this.pedido.dataVencimento) <= new Date();
    this.setSituacao();
  }

  setSituacao() {
    if (!this.pedido.pagamentoRealizado && this.vencido) {
      this.situacao = 'Cancelado';
      return;
    }

    this.situacao = this.pedido.pagamentoRealizado ? 'Pagamento recebido' : 'Aguardando pagamento'
  }
}
