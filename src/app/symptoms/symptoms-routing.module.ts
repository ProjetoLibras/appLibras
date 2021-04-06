import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymptomsPage } from './symptoms.page';

const routes: Routes = [
  {
    path: '',
    component: SymptomsPage
  },
  {
    path: 'symptoms-list',
    loadChildren: () => import('./symptoms-list/symptoms-list.module').then( m => m.SymptomsListPageModule)
  },
  {
    path: 'symptoms-form',
    loadChildren: () => import('./symptoms-form/symptoms-form.module').then( m => m.SymptomsFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SymptomsPageRoutingModule {}
