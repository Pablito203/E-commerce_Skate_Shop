import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  CriarPedido(pedido: any) {
    return this.http.post(ApiService.url + 'Pedido', pedido);
  }
}
