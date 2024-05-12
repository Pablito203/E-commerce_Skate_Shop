import { AlertaService } from './../../services/alerta/alerta.service';
import { EnderecoService } from 'src/app/services/endeco/endereco.service';
import { Component, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'endereco-cadastro',
  templateUrl: './endereco-cadastro.component.html',
  styleUrls: ['./endereco-cadastro.component.scss'],
})
export class EnderecoCadastroComponent  implements OnInit {
  endereco: any = {
    usuarioID: UsuarioService.usuarioLogado?.usuarioID
  };

  constructor(private enderecoService: EnderecoService,
              private alertaService: AlertaService) { }

  ngOnInit() {}

  FecharModal(): void {
    ModalService.FecharModal();
  }

  Salvar() {
    this.enderecoService.salvarEndereco(this.endereco).subscribe((data: any) => {
      if (data.mensagemErro) {
        this.alertaService.CriarToastMensagem(data.mensagemErro, true);
        return;
      }

      this.alertaService.CriarToastMensagem("Endereço cadastrado com sucesso");
      this.FecharModal();
    })
  }
}
