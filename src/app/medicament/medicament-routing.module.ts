import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentPage } from './medicament.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentPageRoutingModule {}
