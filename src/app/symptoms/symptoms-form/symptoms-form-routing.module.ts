import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymptomsFormPage } from './symptoms-form.page';

const routes: Routes = [
  {
    path: '',
    component: SymptomsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SymptomsFormPageRoutingModule {}
