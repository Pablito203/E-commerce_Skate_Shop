import { ComponentsModule } from './components/components.module';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from './directives/directives.module';
import { UsuarioService } from './services/usuario/usuario.service';
registerLocaleData(localePT);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    CommonModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    DirectivesModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'pt-br'},
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [UsuarioService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function init_app(usuarioService: UsuarioService) {
  return async () => await usuarioService.IniciarUsuarioLogado();
}
