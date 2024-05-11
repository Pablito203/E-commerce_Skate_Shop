import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  static TiposRoupa = [
    {
      nome: 'Camisetas',
      id: 1
    },
    {
      nome: 'Calças',
      id: 2
    },
    {
      nome: 'Moletons',
      id: 3
    },
    {
      nome: 'Acessórios',
      id: 4
    },
    {
      nome: 'Bermudas',
      id: 9
    },
    {
      nome: 'Tênis',
      id: 10
    }
  ];

  static TiposSkate = [
    {
      nome: 'Shapes',
      id: 5
    },
    {
      nome: 'Trucks',
      id: 6
    },
    {
      nome: 'Rodas',
      id: 7
    },
    {
      nome: 'Outros',
      id: 8
    }
  ];

  constructor(public http: HttpClient) { }

  GetProdutosID(tipo: string, tipoID?: number, pesquisa?: string) {
    let headers = new HttpHeaders();
    headers = headers.set('tipo', tipo);
    if (tipoID) {
      headers = headers.set('tipoID', tipoID.toString());
    }
    if (pesquisa) {
      headers = headers.set('pesquisa', pesquisa);
    }

    const requestOptions = {
      headers: headers
    };

    return this.http.get(ApiService.url + 'ProdutoID', requestOptions);
  }

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
