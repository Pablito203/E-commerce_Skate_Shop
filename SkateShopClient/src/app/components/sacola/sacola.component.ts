import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'sacola',
  templateUrl: './sacola.component.html',
  styleUrls: ['./sacola.component.scss'],
})
export class SacolaComponent implements OnInit {
  Sacola = [];

  constructor(private Storage: Storage) {}

  ngOnInit(): void {
    this.Storage.get('sacola').then((data) => {
      this.Sacola = data;
    })
  }

  FecharModal(): void {
    this.Storage.set('sacola', this.Sacola);
    ModalService.FecharModal();
  }

  Excluir(index: number): void {
    this.Sacola.splice(index, 1);
    this.Salvar();
  }

  Salvar(): void {
    this.Storage.set('sacola', this.Sacola);
  }
}
