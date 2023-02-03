import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewAdPageRoutingModule } from './add-new-ad-routing.module';

import { AddNewAdPage } from './add-new-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewAdPageRoutingModule
  ],
  declarations: [AddNewAdPage]
})
export class AddNewAdPageModule {}
