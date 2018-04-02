import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { ProductProvider } from '../../providers/product';
import { PurchaseProductAddPage } from '../purchase-product-add/purchase-product-add';


@IonicPage()
@Component({
  selector: 'page-product-add',
  templateUrl: 'product-add.html',
})
export class ProductAddPage {

  newProduct: any;
  purchase_id: number

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
  ) {
    this.newProduct = this.navParams.get('product');
    this.purchase_id = this.navParams.get('purchase_id');
  }

  formUpdated(product) {
    this.productProvider.addProduct(product.name, product.barcode)
    .subscribe( res => {
        let data: any;
        data = this.respondHandlerProduct(res);
        //console.log(data)
        if (data) {
          this.navCtrl
            .push(PurchaseProductAddPage, {purchase_id: this.purchase_id, product: data})
            .then(() => {
              const index = this.viewCtrl.index;
              this.navCtrl.remove(index);
            });
        }
      },(error) => {
        console.log(error);
      });
  }

  protected respondHandlerProduct(data: any) {
    if (data.success == true) {
      return data.data;  
    }
    return false;          
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductAddPage');
  }

}
