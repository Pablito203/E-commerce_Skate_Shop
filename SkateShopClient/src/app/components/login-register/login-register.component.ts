import { UsuarioService, login, cadastro } from 'src/app/services/usuario/usuario.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent  implements OnInit {
  login: login = {
    email: '',
    senha: ''
  }

  cadastro: cadastro = {
    usuarioID: undefined,
    nome: '',
    cpf: '',
    email: '',
    senha: ''
  }

  cadastrar: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private alertaService: AlertaService) { }

  ngOnInit() {}

  FecharModal(): void {
    ModalService.FecharModal();
  }

  Acessar() {
    if (!this.login.email || !this.login.senha) {
      this.alertaService.CriarToastMensagem("login ou senha incorretos", true);
      return;
    }

    this.usuarioService.login(this.login).subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.alertaService.CriarToastMensagem("Login realizado com sucesso");
      this.usuarioService.setUsuarioLogado(data.result);
    });
  }

  Cadastrar() {
    if (!this.cadastro.email || !this.cadastro.senha || !this.cadastro.cpf || !this.cadastro.nome) {
      this.alertaService.CriarToastMensagem("verifique seus dados e tente novamente", true);
      return;
    }

    this.usuarioService.AdicionarUsuario(this.cadastro).subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.alertaService.CriarToastMensagem("Cadastro realizado com sucesso");
      this.cadastro = {
        usuarioID: undefined,
        nome: '',
        cpf: '',
        email: '',
        senha: ''
      };
      this.toggleCadastrar();
    });
  }

  toggleCadastrar() {
    this.cadastrar = !this.cadastrar;
  }
}
