import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'add-produto',
    loadChildren: () => import('./pages/add-produto/add-produto.module').then( m => m.AddProdutoPageModule)
  },
  {
    path: 'add-produto/:id',
    loadChildren: () => import('./pages/add-produto/add-produto.module').then( m => m.AddProdutoPageModule)
  },
  {
    path: 'finalizar-pedido',
    loadChildren: () => import('./pages/finalizar-pedido/finalizar-pedido/finalizar-pedido.module').then( m => m.FinalizarPedidoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
