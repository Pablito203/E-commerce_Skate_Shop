import { NgModule } from '@angular/core';
import { CpfDirective } from './cpf/cpf.directive';

@NgModule({
  declarations: [CpfDirective],
  exports: [CpfDirective]
})
export class DirectivesModule { }
