import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PainPage } from './pain.page';

const routes: Routes = [
  {
    path: '',
    component: PainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PainPageRoutingModule {}
