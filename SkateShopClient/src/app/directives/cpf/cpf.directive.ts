import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[cpf]'
})
export class CpfDirective {
    input:any;

    arrayNumber:any[] = ["0","1","2","3","4","5","6","7","8","9"];
    arrayFunction:any[] = [, "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]

    constructor(private el: ElementRef) {}

    ngAfterViewInit(){
      this.input = this.el.nativeElement;
    }

    @HostListener('input', ['$event']) onKeyUp(event: KeyboardEvent) {
      if (this.arrayFunction.indexOf(event.key) < 0)
        this.input.value = CpfDirective.convertToCpfCnpj(this.input.value);
    }

    static convertToCpfCnpj(num: any) {
      if (num) {
          num = num.toString();
          num = num.replace(/\D/g, "");

          switch (num.length) {
              case 4:
                  num = num.replace(/(\d+)(\d{3})/, "$1.$2");
                  break;
              case 5:
                  num = num.replace(/(\d+)(\d{3})/, "$1.$2");
                  break;
              case 6:
                  num = num.replace(/(\d+)(\d{3})/, "$1.$2");
                  break;
              case 7:
                  num = num.replace(/(\d+)(\d{3})(\d{3})/, "$1.$2.$3");
                  break;
              case 8:
                  num = num.replace(/(\d+)(\d{3})(\d{3})/, "$1.$2.$3");
                  break;
              case 9:
                  num = num.replace(/(\d+)(\d{3})(\d{3})/, "$1.$2.$3");
                  break;
              case 10:
                  num = num.replace(/(\d+)(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
                  break;
              case 11:
                  num = num.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
                  break;
              case 12:
                  num = num.replace(/(\d+)(\d{3})(\d{3})(\d{4})/, "$1.$2.$3/$4");
                  break;
              case 13:
                  num = num.replace(/(\d+)(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                  break;
              case 14:
                  num = num.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, "$1.$2.$3/$4-$5");
                  break;
          }
      }
      return num;
  }

  static ValidarCpf(cpf: string){
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r: any;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
  }
}
