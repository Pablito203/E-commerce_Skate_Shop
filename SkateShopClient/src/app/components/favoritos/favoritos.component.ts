import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UsuarioService, usuario } from 'src/app/services/usuario/usuario.service';
@Component({
  selector: 'favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {
  usuarioLogado: usuario | null = null;

  constructor() {}

  ngOnInit(): void {
    this.usuarioLogado = UsuarioService.usuarioLogado;
  }

  FecharModal(): void {
    ModalService.FecharModal();
  }
}
