import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductProvider } from '../../providers/product';

@IonicPage()
@Component({
  selector: 'page-purchase-product-add',
  templateUrl: 'purchase-product-add.html',
})
export class PurchaseProductAddPage {

  product: any;
  purchase_id: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productProvider: ProductProvider,
  ) {
    this.product= this.navParams.get('product');
    this.purchase_id = this.navParams.get('purchase_id');
  }

  formUpdated(product) {
    this.productProvider.addPurchaseProduct(this.purchase_id, product.id, product.price, product.price_without_discount)
    .subscribe( res => {
        let data: any;
        data = this.respondHandlerProduct(res);
        console.log(data)
      },(error) => {
        console.log(error);
      });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PurchaseProductAddPage');
  }

  protected respondHandlerProduct(data: any) {
    if (data.success == true) {
      return data.data;  
    }
    return false;          
  }

}
