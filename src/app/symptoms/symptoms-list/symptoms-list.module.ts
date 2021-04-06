import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SymptomsListPageRoutingModule } from './symptoms-list-routing.module';

import { SymptomsListPage } from './symptoms-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SymptomsListPageRoutingModule
  ],
  declarations: [SymptomsListPage]
})
export class SymptomsListPageModule {}
