import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ProductProvider } from '../../providers/product';

@IonicPage()
@Component({
  selector: 'page-purchase-edit',
  templateUrl: 'purchase-edit.html',
})
export class PurchaseEditPage {

  purchase: any;
  loadingToast: any;

  purchaseProducts: any;

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

  loadPurchase() {
    let id = this.navParams.get('index');

    this.loadingPresent('Please wait...');

    this.productProvider.getPurchase(id)
    .subscribe( res => {
        let data: any;
        data = this.respondHandlerPurchase(res);
        //console.log(data);
        this.purchase = data;
        this.purchase.date = new Date(this.purchase.date * 1000).toISOString();

        this.loadingHide();

        this.loadPurchaseProducts(this.purchase.id);
      },(error) => {
        console.error(error);

        this.loadingHide();
      });
  }

  loadPurchaseProducts(id: number) {

    this.loadingPresent('Please wait...');

    this.productProvider.getPurchaseProducts(id)
    .subscribe( res => {
        let data: any;
        data = this.respondHandlerPurchase(res);
        //console.log(data);
        this.purchaseProducts = data;

        this.loadingHide();
      },(error) => {
        console.error(error);

        this.loadingHide();
      });
  }



  updatePurchase(purchase) {
    this.loadingPresent('Please wait...');

    this.productProvider.putPurchase(purchase)
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

  deletePurchaseProduct(pp) {

    this.loadingPresent('Please wait...');

    this.productProvider.deletePurchaseProduct(`${pp.purchase_id}-${pp.product_id}`)
    .subscribe( res => {
      let data: any;
      data = this.respondHandlerPurchase(res);

      this.loadingHide();
      this.loadPurchaseProducts(this.purchase.id);
    },(error) => {
      console.error(error);

      this.loadingHide();
    });

  }

  ionViewDidLoad() {
    //console.log('load edit');
    this.loadPurchase();
  }

  protected respondHandlerPurchase(data: any) {
    if (data.success == true) {
      return data.data;  
    }
    return false;          
  }

}
