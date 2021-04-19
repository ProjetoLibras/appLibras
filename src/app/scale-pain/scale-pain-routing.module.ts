import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScalePainPage } from './scale-pain.page';

const routes: Routes = [
  {
    path: '',
    component: ScalePainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScalePainPageRoutingModule {}
