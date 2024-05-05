import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TamanhoService {

  constructor(private http: HttpClient) { }

  GetTamanho(ProdutoID: number) {
    return this.http.get(ApiService.url + 'Tamanho/' + ProdutoID);
  }

  PostTamanho(tamanho: any) {
    return this.http.post(ApiService.url + 'Tamanho', tamanho);
  }

  PutTamanho(tamanho: any) {
    return this.http.put(ApiService.url + 'Tamanho', tamanho);
  }

  DeleteTamanho(tamanhoID: number) {
    return this.http.delete(ApiService.url + 'Tamanho/' + tamanhoID);
  }
}
