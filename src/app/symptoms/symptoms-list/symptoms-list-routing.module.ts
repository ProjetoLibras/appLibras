import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymptomsListPage } from './symptoms-list.page';

const routes: Routes = [
  {
    path: '',
    component: SymptomsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SymptomsListPageRoutingModule {}
