import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(public http: HttpClient) { }

  GetLancamentos() {
    let headers = new HttpHeaders();
    headers = headers.set('tipo', 'lancamentos');

    return this.GetRequisicao(headers);
  }

  GetByID(produtoID : number) {
    let headers = new HttpHeaders();
    headers = headers.set('ListaID', produtoID.toString());

    return this.GetRequisicao(headers);
  }

  GetByListaID(lstProdutoID: number[]) {
    let headers = new HttpHeaders();
    headers = headers.set('ListaID', lstProdutoID.toString());

    return this.GetRequisicao(headers);
  }

  GetDestaques() {
    let headers = new HttpHeaders();
    headers = headers.set('tipo', 'destaques');

    return this.GetRequisicao(headers);
  }

  GetRequisicao(headers: HttpHeaders) {
    if (UsuarioService.usuarioLogado) {
      headers = headers.set('UsuarioID', UsuarioService.usuarioLogado.usuarioID.toString());
    }

    const requestOptions = {
      headers: headers
    };

    return this.http.get(ApiService.url + 'Produto', requestOptions);
  }

  PostProduto(Produto: any) {
    return this.http.post(ApiService.url + 'Produto', Produto);
  }

  PutProduto(Produto: any) {
    return this.http.put(ApiService.url + 'Produto', Produto);
  }

  DeleteProduto(produtoID: number) {
    return this.http.delete(ApiService.url + 'Produto/' + produtoID);
  }
}
