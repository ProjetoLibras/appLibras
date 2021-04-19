import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarusuariosPage } from './editarusuarios.page';

const routes: Routes = [
  {
    path: '',
    component: EditarusuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarusuariosPageRoutingModule {}
