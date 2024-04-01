import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TamanhoService {

  constructor(private http: HttpClient) { }

  PostTamanho(tamanho: any) {
    return this.http.post(ApiService.url + 'Tamanho', tamanho);
  }
}
