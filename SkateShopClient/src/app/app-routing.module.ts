import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateUsuarioLogadoNaoAdmin, CanActivateUsuarioAdminLogado, CanActivateUsuarioLogado} from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'add-produto',
    loadChildren: () => import('./pages/add-produto/add-produto.module').then( m => m.AddProdutoPageModule),
    canActivate: [CanActivateUsuarioAdminLogado]
  },
  {
    path: 'add-produto/:id',
    loadChildren: () => import('./pages/add-produto/add-produto.module').then( m => m.AddProdutoPageModule),
    canActivate: [CanActivateUsuarioAdminLogado]
  },
  {
    path: 'finalizar-pedido',
    loadChildren: () => import('./pages/finalizar-pedido/finalizar-pedido.module').then( m => m.FinalizarPedidoPageModule),
    canActivate: [CanActivateUsuarioLogadoNaoAdmin]
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule),
    canActivate: [CanActivateUsuarioLogado]
  },
  {
    path: 'produtos/:tipo',
    loadChildren: () => import('./pages/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'produtos/:tipo/:subTipo',
    loadChildren: () => import('./pages/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: '**',
    redirectTo: '',
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
