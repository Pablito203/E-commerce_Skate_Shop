import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from "../../components/components.module";
import { SwiperModule } from 'swiper/angular';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        ComponentsModule,
        SwiperModule,
        DirectivesModule
    ]
})
export class HomePageModule {}
