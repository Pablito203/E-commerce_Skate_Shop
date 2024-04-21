import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class SacolaService {

  constructor(private storage: Storage) { }

  getSacola() {
    return this.storage.get('sacola');
  }

  salvarSacola(sacola: any[]) {
    return this.storage.set('sacola', sacola);
  }
}
