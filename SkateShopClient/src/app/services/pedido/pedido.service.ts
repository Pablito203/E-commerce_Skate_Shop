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
    return this.http.get(ApiService.url + 'PedidoID/' + UsuarioService.usuarioLogado?.usuarioID);
  }

  CriarPedido(pedido: any) {
    return this.http.post(ApiService.url + 'Pedido', pedido);
  }
}
