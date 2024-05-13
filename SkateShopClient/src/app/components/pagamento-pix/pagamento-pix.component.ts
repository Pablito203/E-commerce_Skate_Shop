import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'pagamento-pix',
  templateUrl: './pagamento-pix.component.html',
  styleUrls: ['./pagamento-pix.component.scss'],
})
export class PagamentoPixComponent  implements OnInit {
  @Input() caminhoImagem = '';
  @Input() copiaCola = '';

  constructor() { }

  ngOnInit() {}

}
