import { NgModule } from '@angular/core';
import { CpfDirective } from './cpf/cpf.directive';
import { MonetarioDirective } from './monetario/monetario.directive';

@NgModule({
  declarations: [CpfDirective, MonetarioDirective],
  exports: [CpfDirective, MonetarioDirective]
})
export class DirectivesModule { }
