import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScalePainPageRoutingModule } from './scale-pain-routing.module';

import { ScalePainPage } from './scale-pain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScalePainPageRoutingModule
  ],
  declarations: [ScalePainPage]
})
export class ScalePainPageModule {}
