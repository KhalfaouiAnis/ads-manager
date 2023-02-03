import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewAdPage } from './add-new-ad.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewAdPageRoutingModule {}
