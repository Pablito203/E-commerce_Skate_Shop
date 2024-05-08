import { EventsService } from 'src/app/services/events/events.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  listaTipoEvento = [
    'Lancamento',
    'Destaque',
    'Lista'
  ]
  constructor(private http: HttpClient,
              private eventsService: EventsService) { }

  GetFavoritos() {
    return this.http.get(ApiService.url + 'Favoritos/' + UsuarioService.usuarioLogado?.usuarioID);
  }

  AdicionarFavorito(produtoID: number) {
    let objSalvarFavorito = {
      produtoID: produtoID,
      usuarioID: UsuarioService.usuarioLogado?.usuarioID
    }

    return this.http.post(ApiService.url + 'Favoritos', objSalvarFavorito);
  }

  RemoverFavorito(produtoID: number) {
    let objSalvarFavorito = {
      produtoID: produtoID,
      usuarioID: UsuarioService.usuarioLogado?.usuarioID
    }

    return this.http.put(ApiService.url + 'Favoritos', objSalvarFavorito);
  }

  ExecutarEventos(produtoID: number, Remover: boolean) {
    let prefixo = Remover ? 'RemoveFavorito' : 'AdicionaFavorito';

    for (let tipo of this.listaTipoEvento) {
      this.eventsService.publish(prefixo + tipo + produtoID);
    }
  }
}
