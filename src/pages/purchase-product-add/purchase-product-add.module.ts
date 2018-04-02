import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseProductAddPage } from './purchase-product-add';

@NgModule({
  declarations: [
    PurchaseProductAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseProductAddPage),
  ],
})
export class PurchaseProductAddPageModule {}
