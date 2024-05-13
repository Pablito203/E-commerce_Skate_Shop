import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  GetPedidos(lstPedidoID: number[]) {
    let headers = new HttpHeaders();
    headers = headers.set('ListaID', lstPedidoID.toString());

    const requestOptions = {
      headers: headers
    };

    return this.http.get(ApiService.url + 'Pedido', requestOptions);
  }

  GetPedidosID() {
    let headers = new HttpHeaders();
    if (UsuarioService.usuarioLogado?.administrador) {
      headers = headers.set('admin', 'true');
    }

    const requestOptions = {
      headers: headers
    };

    return this.http.get(ApiService.url + 'PedidoID/' + UsuarioService.usuarioLogado?.usuarioID, requestOptions);
  }

  CriarPedido(pedido: any) {
    return this.http.post(ApiService.url + 'Pedido', pedido);
  }

  GetProdutosPedido(pedidoID: number) {
    return this.http.get(ApiService.url + 'PedidoProduto/' + pedidoID);
  }
}
