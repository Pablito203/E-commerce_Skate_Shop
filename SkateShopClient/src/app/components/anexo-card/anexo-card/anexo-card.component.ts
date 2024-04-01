import { Component, Input } from '@angular/core';

@Component({
  selector: 'anexo-card',
  templateUrl: './anexo-card.component.html',
  styleUrls: ['./anexo-card.component.scss'],
})
export class AnexoCardComponent {

  @Input() src: string = "";

  constructor() { }

}
