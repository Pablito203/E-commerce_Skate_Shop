import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent  implements OnInit {
  login: any = {}
  constructor(private usuarioService: UsuarioService,
              private storage: Storage,
              private alertaService: AlertaService) { }

  ngOnInit() {}

  FecharModal(): void {
    ModalService.FecharModal();
  }

  Acessar() {
    if (!this.login.login || !this.login.senha) {
      this.alertaService.CriarToastMensagem("login ou senha incorretos", true);
      return;
    }

    this.usuarioService.login(this.login).subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
      }
    });
  }
}
