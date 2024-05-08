import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pedido-card-lista',
  templateUrl: './pedido-card-lista.component.html',
  styleUrls: ['./pedido-card-lista.component.scss'],
})
export class PedidoCardListaComponent  implements OnInit {
  @Input() pedido: any = {};

  vencido = false;
  constructor() { }

  ngOnInit() {
    this.vencido = new Date(this.pedido.dataVencimento) <= new Date();
  }

  GetSituacao() {
    if (!this.pedido.pagamentoRealizado && this.vencido) {
      return 'Cancelado'
    }

    return this.pedido.pagamentoRealizado ? 'Pagamento recebido' : 'Aguardando pagamento'
  }
}
