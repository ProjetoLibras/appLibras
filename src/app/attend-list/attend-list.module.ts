import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendListPageRoutingModule } from './attend-list-routing.module';

import { AttendListPage } from './attend-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendListPageRoutingModule
  ],
  declarations: [AttendListPage]
})
export class AttendListPageModule {}
