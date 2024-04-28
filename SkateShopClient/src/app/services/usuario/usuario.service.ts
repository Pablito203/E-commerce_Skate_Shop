import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  static usuarioLogado: usuario | null = null;

  constructor(private http: HttpClient,
              private storage: Storage,
  ) {
  }

  login(login: login) {
    return this.http.post(ApiService.url + 'Login', login);
  }

  setUsuarioLogado(usuario: usuario) {
    this.storage.set('usuario', usuario);
    UsuarioService.usuarioLogado = usuario;
  }

  AdicionarUsuario(cadastro: cadastro) {
    return this.http.post(ApiService.url + 'Usuario', cadastro);
  }
}

export interface usuario {
  usuarioID: number,
  nome: string,
  adiministrador: boolean
}

export interface login {
  email: string,
  senha: string
}

export interface cadastro {
  usuarioID: number | undefined,
  nome: string,
  cpf: string,
  email: string,
  senha: string
}
