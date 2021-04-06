import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SymptomsFormPageRoutingModule } from './symptoms-form-routing.module';

import { SymptomsFormPage } from './symptoms-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SymptomsFormPageRoutingModule
  ],
  declarations: [SymptomsFormPage]
})
export class SymptomsFormPageModule {}
