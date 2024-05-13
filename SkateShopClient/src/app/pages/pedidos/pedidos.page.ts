import { ModalService } from 'src/app/services/modal/modal.service';

import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidoDetalheComponent } from 'src/app/components/pedido-detalhe/pedido-detalhe.component';

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos = [];
  pedidosPorChunck = 15;
  quantidadeChunks = 0;
  chunckAtual = 0;
  lstChuncks: number[][]= [];

  constructor(private pedidoService: PedidoService,
              private modalService: ModalService) { }

  ngOnInit() {
    setTimeout(() => {
      this.pedidoService.GetPedidosID().subscribe((data: any) => {
        let lstPedidosID = data.result;
        this.quantidadeChunks = Math.ceil(lstPedidosID.length / this.pedidosPorChunck) - 1;
        for (var i = 0; i <= this.quantidadeChunks; i++) {
          this.lstChuncks.push(lstPedidosID.splice(0, this.pedidosPorChunck));
        }

        this.pedidoService.GetPedidos(this.lstChuncks[this.chunckAtual]).subscribe((data: any) => {
          this.pedidos = data.result;
        });
      })
    }, 100);
  }

  onIonInfinite(e: any) {
    if (this.chunckAtual >= this.quantidadeChunks) {
      e.target.disabled = true;
      e.target.complete();
      return;
    }

    setTimeout(() => {
      this.pedidoService.GetPedidos(this.lstChuncks[this.chunckAtual + 1]).subscribe((data: any) => {
        this.pedidos = this.pedidos.concat(data.result);
        this.chunckAtual += 1;

        if (this.chunckAtual >= this.quantidadeChunks) {
          e.target.disabled = true;
        }
        e.target.complete();
      });
    }, 100);
  }

  AbrirPedidoDetalhe(pedido: any) {
    this.modalService.CriarModal(PedidoDetalheComponent, { pedido: pedido });
  }
}
