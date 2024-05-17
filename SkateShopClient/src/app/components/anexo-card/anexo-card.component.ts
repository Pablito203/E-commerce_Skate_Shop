import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertOptions, IonicSlides } from '@ionic/angular';
import SwiperCore, { Navigation, Pagination, Scrollbar, Manipulation, Zoom, Swiper} from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, Manipulation, Zoom]);

@Component({
  selector: 'anexo-card',
  templateUrl: './anexo-card.component.html',
  styleUrls: ['./anexo-card.component.scss'],
})
export class AnexoCardComponent {
  salvando = false;
  @Input() Anexos: any[] = [];
  @Input() editavel: boolean = false;
  @Output() excluir: EventEmitter<any> = new EventEmitter();
  swiperModules = [IonicSlides]
  swiper: Swiper | null = null;

  constructor(private alertaService: AlertaService) { }

  onSwiper(swiper: Swiper) {
    this.swiper = swiper;
  }

  zoomChange(e: any) {
    if (!this.swiper) {return;}

    let scale = e[1];
    let nextArrow = this.swiper.navigation.nextEl;
    let prevArrow = this.swiper.navigation.prevEl;

    if (scale > 1) {
      if (!nextArrow.className.includes('swiper-button-disabled')) {
        nextArrow.className += ' swiper-button-disabled';
      }
      if (!prevArrow.className.includes('swiper-button-disabled')) {
        prevArrow.className += ' swiper-button-disabled';
      }
      this.swiper.allowSlidePrev = this.swiper.allowSlideNext = false;
    } else {
      if (nextArrow.className.includes('swiper-button-disabled') && this.swiper.activeIndex != this.Anexos.length - 1) {
        nextArrow.className = nextArrow.className.replace(' swiper-button-disabled', '');
      }
      if (prevArrow.className.includes('swiper-button-disabled') && this.swiper.activeIndex != 0) {
        prevArrow.className = prevArrow.className.replace(' swiper-button-disabled', '');
      }
      this.swiper.allowSlidePrev = this.swiper.allowSlideNext = true;
    }
  }

  excluirClick() {
    if (this.salvando) {return;}
    this.salvando = true;

    const AlertaOptions: AlertOptions =  {};
    AlertaOptions.header = 'Excluir';
    AlertaOptions.message = 'Deseja excluir a imagem?';
    AlertaOptions.buttons = [
      {
        text: 'Cancelar',
        handler: () => {this.salvando = false;}
      },
      {
        text: 'Excluir',
        handler: () => {
          let index = this.swiper?.activeIndex || 0;
          this.swiper?.slidePrev();
          this.excluir.emit(index);
          this.salvando = false;
        }
      }
    ]

    this.alertaService.CriarAlerta(AlertaOptions);
  }
}
