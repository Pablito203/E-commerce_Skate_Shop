import { LoaderService } from './../../services/loader/loader.service';
import { UsuarioService, login, cadastro } from 'src/app/services/usuario/usuario.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { CpfDirective } from 'src/app/directives/cpf/cpf.directive';

@Component({
  selector: 'login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent {
  salvando = false;

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
              private alertaService: AlertaService,
              private loaderService: LoaderService) { }

  FecharModal(): void {
    ModalService.FecharModal();
  }

  Acessar() {
    if (this.salvando) {return;}
    this.salvando = true;

    if (!this.login.email || !this.ValidarEmail(this.login.email) || !this.login.senha) {
      this.alertaService.CriarToastMensagem("login ou senha incorretoss", true);
      this.salvando = false;
      return;
    }

    this.loaderService.criarLoader();
    const observer = this.criarObserverLogin();
    this.usuarioService.login(this.login).subscribe(observer);
  }

  Cadastrar() {
    if (this.salvando) {return;}
    this.salvando = true;

    if (!this.cadastro.email || !this.ValidarEmail(this.cadastro.email) || !this.cadastro.senha || !this.cadastro.cpf || !CpfDirective.ValidarCpf(this.cadastro.cpf) || !this.cadastro.nome) {
      this.alertaService.CriarToastMensagem("verifique seus dados e tente novamente", true);
      this.salvando = false;
      return;
    }

    this.loaderService.criarLoader();
    const observer = this.criarObserverCadatro();
    this.usuarioService.AdicionarUsuario(this.cadastro).subscribe(observer);
  }

  toggleCadastrar() {
    this.cadastrar = !this.cadastrar;
  }

  criarObserverLogin() {
    let observer: any = {};
    observer.next = (data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.alertaService.CriarToastMensagem("Login realizado com sucesso");
      let usuario = data.result;
      usuario.cpf = CpfDirective.convertToCpfCnpj(usuario.cpf)
      this.usuarioService.setUsuarioLogado(data.result);
    };

    observer.complete = () => {
      this.loaderService.fecharLoader();
      this.salvando = false;
    }

    return observer;
  }

  criarObserverCadatro() {
    let observer: any = {};
    observer.next = (data: any) => {
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
    };

    observer.complete = () => {
      this.loaderService.fecharLoader();
      this.salvando = false;
    }

    return observer;
  }

  ValidarEmail(email: string) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
}
