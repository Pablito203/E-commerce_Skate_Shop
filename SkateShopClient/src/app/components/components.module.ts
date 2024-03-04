import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FavoritosComponent } from "./favoritos/favoritos.component";
import { SacolaComponent } from "./sacola/sacola.component";
import { ProdutoCardListaComponent } from "./produto-card-lista/produto-card-lista.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProdutoCardListaComponent,
    FavoritosComponent,
    SacolaComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ProdutoCardListaComponent,
    FavoritosComponent,
    SacolaComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [

  ],
})
export class ComponentsModule {}
