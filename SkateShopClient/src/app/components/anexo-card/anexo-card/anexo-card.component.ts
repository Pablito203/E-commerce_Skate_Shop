import { Component, Input } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'anexo-card',
  templateUrl: './anexo-card.component.html',
  styleUrls: ['./anexo-card.component.scss'],
})
export class AnexoCardComponent {
  @Input() Anexos: any[] = [];
  swiperModules = [IonicSlides]

  constructor() { }
}
