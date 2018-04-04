import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { BarcodeProvider } from '../../providers/barcode';
import { ProductProvider } from '../../providers/product';
import { NamesListPage } from '../names-list/names-list';
import { ProductAddPage } from '../product-add/product-add';
import { PurchaseProductAddPage } from '../purchase-product-add/purchase-product-add';

import { Product } from '../../shared/product';
import { Purchase } from '../../shared/purchase';
import { Response, ResponseError } from '../../shared/response';

import 'rxjs/add/operator/finally';

@IonicPage()
@Component({
  selector: 'page-purchase-edit',
  templateUrl: 'purchase-edit.html',
})
export class PurchaseEditPage {

  purchase: any;
  loadingToast: any;

  purchaseProducts: any;
  newProduct: any = { name: '', barcode: '', price: '', price_without_dicount: ''};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public barcodeProvider: BarcodeProvider,
    private loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
  ) {
    
  }

  AddProduct(newProduct) {
    console.log('add');
    this.navCtrl.push(ProductAddPage, {purchase_id: this.purchase.id, product: newProduct});
  }

  scan() {
    this.barcodeScanner.scan({resultDisplayDuration: 300}).then((barcodeData) => {
      this.newProduct = barcodeData;
      if (!barcodeData.cancelled){
        this.searchProduct(+barcodeData.text);
      }      
    }, (error) => {
      console.error(error);
    });
  }

  searchProduct(barcode: number = 4260107450481) {
    this.newProduct.barcode = barcode;

    this.loadingPresent('Please wait...');

    this.productProvider.getProductByBarcode(barcode)
      .finally(() => this.loadingHide())
      .subscribe( res => {
        let data: Product | ResponseError;
        data = this.respondHandlerPurchase(res);
        if (data) {
          this.navCtrl.push(PurchaseProductAddPage, {purchase_id: this.purchase.id, product: data});
        }
        else {
          this.presentConfirm(barcode); 
        }
      });

  }

  presentConfirm(barcode: number) {
    let alert = this.alertCtrl.create({
      title: 'Product not found',
      message: 'Do you want to search product in global database?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Search',
          handler: () => {
            this.searchGlobal(barcode);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  searchGlobal(barcode: number = 4690228004018) {
    //let barcode: number = 4601808013092;

    
    this.loadingPresent('Please wait...');
    
    this.barcodeProvider.getNames(barcode)
      .subscribe( res => {
        let names: Array<string>;
        names = this.respondHandler(res);
        if (names) {
          //console.log(names);
          this.presentNamesModal(names);
          //this.selectedProduct.name = names[0];
        }

        this.loadingHide();
      },(error) => {
        console.error(error);
        this.loadingHide();
      });
  }

  presentNamesModal(names: Array<string>) {
    let namesModal = this.modalCtrl.create(NamesListPage, { names: names });

    namesModal.onDidDismiss(data => {
      if (data) {
        
        this.newProduct.name = data;
        this.AddProduct(this.newProduct);
      }
    });

    namesModal.present();
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
    if (data && data instanceof ResponseError) {
      return null;  
    }
    return data;      
  }

  protected respondHandler(data: any) {
    if (data.status == 200) {
      return data.names;  
    }
    return false;          
  }

}
