import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendListPage } from './attend-list.page';

const routes: Routes = [
  {
    path: '',
    component: AttendListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendListPageRoutingModule {}
