import { DadosUsuarioComponent } from './dados-usuario/dados-usuario.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from "./favoritos/favoritos.component";
import { SacolaComponent } from "./sacola/sacola.component";
import { ProdutoCardListaComponent } from "./produto-card-lista/produto-card-lista.component";
import { ProdutoCatalogoComponent } from "./produto-catalogo/produto-catalogo.component";
import { BannerComponent } from "./banner/banner.component";
import { AnexoCardComponent } from "./anexo-card/anexo-card.component";
import { TamanhoComponent } from "./tamanho/tamanho.component";
import { NoItensComponent } from './no-itens/no-itens.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { PedidoCardListaComponent } from './pedido-card-lista/pedido-card-lista.component';
import { EnderecoCadastroComponent } from './endereco-cadastro/endereco-cadastro.component';
import { PedidoDetalheComponent } from './pedido-detalhe/pedido-detalhe.component';
import { PagamentoPixComponent } from './pagamento-pix/pagamento-pix.component';
import { DirectivesModule } from '../directives/directives.module';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    ProdutoCardListaComponent,
    FavoritosComponent,
    SacolaComponent,
    ProdutoCatalogoComponent,
    BannerComponent,
    AnexoCardComponent,
    TamanhoComponent,
    ProdutoDetalheComponent,
    NoItensComponent,
    LoginRegisterComponent,
    DadosUsuarioComponent,
    PedidoCardListaComponent,
    EnderecoCadastroComponent,
    PedidoDetalheComponent,
    PagamentoPixComponent,
    LoaderComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,
    DirectivesModule
  ],
  exports: [
    ProdutoCardListaComponent,
    FavoritosComponent,
    SacolaComponent,
    ProdutoCatalogoComponent,
    BannerComponent,
    AnexoCardComponent,
    TamanhoComponent,
    ProdutoDetalheComponent,
    NoItensComponent,
    LoginRegisterComponent,
    DadosUsuarioComponent,
    PedidoCardListaComponent,
    EnderecoCadastroComponent,
    PedidoDetalheComponent,
    PagamentoPixComponent,
    LoaderComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [

  ],
})
export class ComponentsModule {}
