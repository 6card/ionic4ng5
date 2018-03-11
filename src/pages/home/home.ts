import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

import { BarcodeProvider } from '../../providers/barcode/barcode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedProduct: any;
  productFound:boolean = false;

  constructor(
    public navCtrl: NavController, 
    private barcodeScanner: BarcodeScanner, 
    private toast: Toast,
    public barcodeProvider: BarcodeProvider,
    private loadingCtrl: LoadingController
  ) {
    
  }

  test() {
    this.getNames(4601808013092);
  }

  scan() {
    this.productFound = false;
    this.barcodeScanner.scan({resultDisplayDuration: 300}).then((barcodeData) => {
      this.selectedProduct = barcodeData;
      if (!barcodeData.cancelled){
        this.getNames(barcodeData.text);
      }      
    }, (err) => {
      this.toast.show(err, '3000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  getNames(barcode: any) {
    
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.barcodeProvider.getNames(barcode)
      .subscribe( res => {
        let names: Array<string>;
        names = this.respondHandler(res);
        if (names) {
          this.productFound = true;
          this.selectedProduct.name = names[0];
        }
        else{
          this.toast.show(`Product not found`, '3000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
        loading.dismiss();
    },(error) => {
      this.toast.show(error, '3000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
      loading.dismiss();
    });
  }


  protected respondHandler(data: any) {
    if (data.status == 200) {
      return data.names;  
    }
    return false;  
          
}

}
