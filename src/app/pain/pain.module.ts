import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PainPageRoutingModule } from './pain-routing.module';

import { PainPage } from './pain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PainPageRoutingModule
  ],
  declarations: [PainPage]
})
export class PainPageModule {}
