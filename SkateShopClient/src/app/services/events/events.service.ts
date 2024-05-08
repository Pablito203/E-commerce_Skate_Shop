import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventos: {[chave: string]: Subject<any>} = {}

  subscribe(chave: string, callback: (dados: any) => any): Subscription {
    if (!this.eventos[chave]) {
      this.eventos[chave] = new Subject<any>();
    }

    return this.eventos[chave].subscribe(callback);
  }

  publish(chave: string, dados?: any) {
    if (!this.eventos[chave]) return;

    this.eventos[chave].next(dados);
  }

  destroy(chave: string) {
    if (!this.eventos[chave]) return;

    this.eventos[chave].complete();
    delete this.eventos[chave];
  }

}
