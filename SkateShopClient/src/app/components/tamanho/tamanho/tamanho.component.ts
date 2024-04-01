import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tamanho',
  templateUrl: './tamanho.component.html',
  styleUrls: ['./tamanho.component.scss'],
})
export class TamanhoComponent {
  @Input() Tamanho: any = {}
  @Input() Disabled: boolean = false;

  constructor() { }

}
