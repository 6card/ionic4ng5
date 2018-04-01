import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseAddPage } from './purchase-add';

@NgModule({
  declarations: [
    PurchaseAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseAddPage),
  ],
})
export class PurchaseAddPageModule {}
