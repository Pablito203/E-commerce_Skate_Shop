import { PedidoService } from './../../../services/pedido/pedido.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    setTimeout(() => {
      this.pedidoService.GetPedidosID().subscribe((value: any) => {
        let lstPedidosID = value.result;
        this.quantidadeChunks = Math.ceil(lstPedidosID.length / this.pedidosPorChunck) - 1;
        for (var i = 0; i <= this.quantidadeChunks; i++) {
          this.lstChuncks.push(lstPedidosID.splice(0, this.pedidosPorChunck));
        }

        this.pedidoService.GetPedidos(this.lstChuncks[this.chunckAtual]).subscribe((value: any) => {
          this.pedidos = value.result;
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
      this.pedidoService.GetPedidos(this.lstChuncks[this.chunckAtual + 1]).subscribe((value: any) => {
        this.pedidos = this.pedidos.concat(value.result);
        this.chunckAtual += 1;

        if (this.chunckAtual >= this.quantidadeChunks) {
          e.target.disabled = true;
        }
        e.target.complete();
      });
    }, 100);
  }
}
