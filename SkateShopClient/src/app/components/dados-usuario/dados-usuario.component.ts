import { LoaderService } from './../../services/loader/loader.service';
import { NavController } from '@ionic/angular';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { UsuarioService, cadastro, usuario } from 'src/app/services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'dados-usuario',
  templateUrl: './dados-usuario.component.html',
  styleUrls: ['./dados-usuario.component.scss'],
})
export class DadosUsuarioComponent implements OnInit {
  salvando = false;
  usuarioLogado: usuario | null = null;

  usuarioEdicao: cadastro = {
    usuarioID: 0,
    nome: '',
    cpf: '',
    email: '',
    senha: '',
  };

  constructor(private usuarioService: UsuarioService,
              private alertaService: AlertaService,
              private navController: NavController,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.usuarioLogado = UsuarioService.usuarioLogado;
    Object.assign(this.usuarioEdicao, this.usuarioLogado);
  }

  FecharModal(): void {
    ModalService.FecharModal();
  }

  Salvar() {
    if (this.salvando) {return;}
    this.salvando = true;

    this.loaderService.criarLoader();
    const observer = this.criarObserverSalvar();
    this.usuarioService.EditarUsuario(this.usuarioEdicao).subscribe(observer);
  }

  AbrirPedidos() {
    if (this.salvando) {return;}
    this.salvando = true;

    this.navController.navigateForward('/pedidos');
    this.FecharModal();

    this.salvando = false;
  }

  criarObserverSalvar() {
    let observer: any = {};
    observer.next = (data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      if (this.usuarioLogado) {
        this.usuarioLogado.nome = this.usuarioEdicao.nome;
        this.usuarioLogado.cpf = this.usuarioEdicao.cpf;
      }

      this.alertaService.CriarToastMensagem("Dados alterados com sucesso");
      this.usuarioService.setUsuarioLogado(this.usuarioLogado);
    };

    observer.complete = () => {
      this.loaderService.fecharLoader();
      this.salvando = false;
    }

    return observer;
  }
}
