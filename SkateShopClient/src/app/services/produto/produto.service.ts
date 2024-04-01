import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  GetDestaques() {
    let headers = new HttpHeaders();
    headers = headers.set('tipo', 'destaques');

    return this.GetRequisicao(headers);
  }

  GetRequisicao(headers: HttpHeaders) {
    const requestOptions = {
      headers: headers
    };

    return this.http.get(ApiService.url + 'Produto', requestOptions);
  }

  PostProduto(Produto: any) {
    return this.http.post(ApiService.url + 'Produto', Produto);
  }
}
