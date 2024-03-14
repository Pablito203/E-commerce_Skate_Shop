import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from "./favoritos/favoritos.component";
import { SacolaComponent } from "./sacola/sacola.component";
import { ProdutoCardListaComponent } from "./produto-card-lista/produto-card-lista.component";
import { ProdutoCatalogoComponent } from "./produto-catalogo/produto-catalogo/produto-catalogo.component";
import { BannerComponent } from "./banner/banner/banner.component";

@NgModule({
  declarations: [
    ProdutoCardListaComponent,
    FavoritosComponent,
    SacolaComponent,
    ProdutoCatalogoComponent,
    BannerComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ProdutoCardListaComponent,
    FavoritosComponent,
    SacolaComponent,
    ProdutoCatalogoComponent,
    BannerComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [

  ],
})
export class ComponentsModule {}
