import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarusuariosPageRoutingModule } from './editarusuarios-routing.module';

import { EditarusuariosPage } from './editarusuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarusuariosPageRoutingModule
  ],
  declarations: [EditarusuariosPage]
})
export class EditarusuariosPageModule {}
