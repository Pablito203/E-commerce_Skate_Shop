import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[monetario]'
})
export class MonetarioDirective {
  input:any;
  static valorMaximo = 9999999999.99;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(){
    this.input = this.el.nativeElement;
  }

  @HostListener('focusout')
  onBlur() {
    let valor = MonetarioDirective.FormataValor(this.input.value);
    this.input.value = (typeof valor === 'number' && isNaN(valor)) || valor === 'NaN' ? '' : valor;
  }

  static FormataValor(valor: any): any {
    if (!valor) {
      return '';
    }

    if (typeof valor === 'string') {
      valor = parseFloat(valor.replace(/\./g, "").replace(',', '.'));
    }

    if (valor >= this.valorMaximo) {
      valor = this.valorMaximo;
    }

    const decimalAdjust = (value: any, exp: any) => {
      // If the exp is undefined or zero...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math.ceil(value);
      }

      value = +value;
      exp = +exp;
      // If the value is not a number or the exp is not an integer...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // Shift
      value = value.toString().split('e');
      value = Math.ceil(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Shift back
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    };

    // Decimal ceil
    const ceil10 = ((value: any, exp: any) => {
      return decimalAdjust(value, exp);
    });

    let p2: any = parseFloat(valor).toString().split(".")[1];
    let pri = "";
    if (p2 != undefined) {
      pri = p2.toString().substring(0, 1);
    }
    else {
      p2 = 0;
    }

    p2 = Math.round(p2 / 100).toString();

    if (pri == "0") {
      p2 = pri + p2;
    }
    let dec = p2.substring(2, 2 + 1);

    let formatter = Intl.NumberFormat('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    if (dec <= 5) {
      return formatter.format(valor);
    } else {
      return formatter.format(ceil10(valor, -2));
    }
  }
}
