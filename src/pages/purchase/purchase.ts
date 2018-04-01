import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { PurchaseEditPage } from '../purchase-edit/purchase-edit';
import { PurchaseAddPage } from '../purchase-add/purchase-add';
import { ProductProvider } from '../../providers/product';

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {

  public purchases: any;
  loadingToast: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productProvider: ProductProvider,
    private loadingCtrl: LoadingController,
  ) {

  }

  loadingPresent(text: string) {
    this.loadingToast = this.loadingCtrl.create({
      content: text
    });
    this.loadingToast.present();
  }

  loadingHide() {
    this.loadingToast.dismiss();
  }

  ionViewWillEnter() {
    //console.log('ionViewWillEnter PurchasePage');
    this.loadPurchases();
  }

  loadPurchases() {
    this.loadingPresent('Please wait...');

    this.productProvider.getPurchases()
    .subscribe( res => {
        let data: any;
        data = this.respondHandlerPurchase(res);
        //console.log(data);
        this.purchases = data;

        this.loadingHide();
      },(error) => {
        console.log(error);

        this.loadingHide();
      });
  }

  purchaseSelect(id: number) {
    this.navCtrl.push(PurchaseEditPage, {index: id});
  }

  purchaseAdd() {
    this.navCtrl.push(PurchaseAddPage);
  }

  protected respondHandlerPurchase(data: any) {
    if (data.success == true) {
      return data.data;  
    }
    return false;          
  }

}
