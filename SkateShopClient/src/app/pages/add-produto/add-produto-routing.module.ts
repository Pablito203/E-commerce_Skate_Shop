import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProdutoPage } from './add-produto.page';

const routes: Routes = [
  {
    path: '',
    component: AddProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProdutoPageRoutingModule {}
