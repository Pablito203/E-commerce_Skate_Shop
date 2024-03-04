import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
@Component({
  selector: 'favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent {

  constructor() {}

  FecharModal(): void {
    ModalService.FecharModal();
  }
}
