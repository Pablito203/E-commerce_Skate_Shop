import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  GetEnderecosUsuario(usuarioID: number | undefined) {
    return this.http.get(ApiService.url + 'Endereco/' + usuarioID);
  }

  GetNomeEndereco(endereco: any) {
    return `${endereco.rua}, ${endereco.numero} ${endereco.complemento ? '- ' + endereco.complemento : ''} - ${endereco.bairro}, ${endereco.cidade} ${endereco.uf}`;
  }

  salvarEndereco(endereco: any) {
    return this.http.post(ApiService.url + 'Endereco', endereco);
  }
}
