import { LoaderService } from './../../services/loader/loader.service';
import { AlertaService } from './../../services/alerta/alerta.service';
import { EnderecoService } from 'src/app/services/endeco/endereco.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'endereco-cadastro',
  templateUrl: './endereco-cadastro.component.html',
  styleUrls: ['./endereco-cadastro.component.scss'],
})
export class EnderecoCadastroComponent {
  salvando = false;
  @Input() callback: (endereco: any) => void = () => {};

  endereco: any = {
    usuarioID: UsuarioService.usuarioLogado?.usuarioID
  };

  constructor(private enderecoService: EnderecoService,
              private alertaService: AlertaService,
              private loaderService: LoaderService) { }

  FecharModal(): void {
    ModalService.FecharModal();
  }

  Salvar() {
    if (this.salvando) {return;}
    this.salvando = true;

    this.loaderService.criarLoader();
    const observer = this.criarObserverSalvar();
    this.enderecoService.salvarEndereco(this.endereco).subscribe(observer);
  }

  criarObserverSalvar() {
    let observer: any = {};
    observer.next = (data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.callback(data.result);
      this.alertaService.CriarToastMensagem("Endereço cadastrado com sucesso");
      this.FecharModal();
    };

    observer.complete = () => {
      this.loaderService.fecharLoader();
      this.salvando = false;
    }

    return observer;
  }
}
