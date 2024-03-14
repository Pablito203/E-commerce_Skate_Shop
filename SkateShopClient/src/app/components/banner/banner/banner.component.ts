import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {

  @Input() titulo: string = '';
  @Input() src: string = '';
  @Input() cssTamanho: string = '';
  constructor() { }
}
