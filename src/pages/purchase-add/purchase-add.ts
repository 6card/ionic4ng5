import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ProductProvider } from '../../providers/product';

@IonicPage()
@Component({
  selector: 'page-purchase-add',
  templateUrl: 'purchase-add.html',
})
export class PurchaseAddPage {

  loadingToast: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public productProvider: ProductProvider
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

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PurchaseAddPage');
  }

  addPurchase(purchase) {
    this.loadingPresent('Please wait...');

    this.productProvider.postPurchase(purchase)
    .subscribe( res => {
      let data: any;
      data = this.respondHandlerPurchase(res);

      this.loadingHide();
      this.navCtrl.pop();
    },(error) => {
      console.error(error);

      this.loadingHide();
    });
    
  }

  protected respondHandlerPurchase(data: any) {
    if (data.success == true) {
      return data.data;  
    }
    return false;          
  }

}
