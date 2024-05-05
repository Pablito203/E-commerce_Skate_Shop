import { DadosUsuarioComponent } from './dados-usuario/dados-usuario/dados-usuario.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe/produto-detalhe.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from "./favoritos/favoritos.component";
import { SacolaComponent } from "./sacola/sacola.component";
import { ProdutoCardListaComponent } from "./produto-card-lista/produto-card-lista.component";
import { ProdutoCatalogoComponent } from "./produto-catalogo/produto-catalogo/produto-catalogo.component";
import { BannerComponent } from "./banner/banner/banner.component";
import { AnexoCardComponent } from "./anexo-card/anexo-card/anexo-card.component";
import { TamanhoComponent } from "./tamanho/tamanho/tamanho.component";
import { NoItensComponent } from './no-itens/no-itens/no-itens.component';
import { LoginRegisterComponent } from './login-register/login-register/login-register.component';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

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
    DadosUsuarioComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule
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
    DadosUsuarioComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [

  ],
})
export class ComponentsModule {}
