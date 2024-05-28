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
  ) {}

  IniciarUsuarioLogado() {
    return this.storage.create().then(() => {
      return this.storage.get('usuario').then((value: usuario | null) => {
        UsuarioService.usuarioLogado = value;
      });
    })
  }

  login(login: login) {
    return this.http.post(ApiService.url + 'Login', login);
  }

  setUsuarioLogado(usuario: usuario | null) {
    this.storage.set('usuario', usuario).then(() => {
      globalThis.window.location.reload();
    });
  }

  AdicionarUsuario(cadastro: cadastro) {
    return this.http.post(ApiService.url + 'Usuario', cadastro);
  }

  EditarUsuario(cadastro: cadastro) {
    return this.http.put(ApiService.url + 'Usuario', cadastro);
  }
}

export interface usuario {
  usuarioID: number,
  nome: string,
  administrador: boolean
  cpf: string,
  email: string
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
