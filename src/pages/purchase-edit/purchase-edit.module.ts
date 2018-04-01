import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseEditPage } from './purchase-edit';

@NgModule({
  declarations: [
    PurchaseEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseEditPage),
  ],
})
export class PurchaseEditPageModule {}
