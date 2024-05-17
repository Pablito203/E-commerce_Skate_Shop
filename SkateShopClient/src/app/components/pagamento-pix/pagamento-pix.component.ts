import { AlertaService } from './../../services/alerta/alerta.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'pagamento-pix',
  templateUrl: './pagamento-pix.component.html',
  styleUrls: ['./pagamento-pix.component.scss'],
})
export class PagamentoPixComponent {
  @Input() caminhoImagem = '';
  @Input() copiaCola = '';

  constructor(private alertaService: AlertaService) { }

  copiarPix() {
    navigator.clipboard.writeText(this.copiaCola);
    this.alertaService.CriarToastMensagem("Código pix copiado para a área de transferência");
  }
}
