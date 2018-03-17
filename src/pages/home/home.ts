import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, Platform } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

import { BarcodeProvider } from '../../providers/barcode/barcode';
import { NamesListPage } from '../names-list/names-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedProduct: any = { name: ''};
  productFound:boolean = false;
  loadingToast: any;


  constructor(
    public navCtrl: NavController, 
    private barcodeScanner: BarcodeScanner, 
    private toast: Toast,
    public barcodeProvider: BarcodeProvider,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private platform: Platform,
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

  presentNamesModal(names: Array<string>) {
    let namesModal = this.modalCtrl.create(NamesListPage, { names: names });

    namesModal.onDidDismiss(data => {
      if (data) {
        console.log(data);
        this.selectedProduct.name = data;
      }
    });

    namesModal.present();
  }
  

  test(barcode: number = 4690228004018) {
    //let barcode: number = 4601808013092;

    this.productFound = false;
    this.loadingPresent('Please wait...');
    
    this.barcodeProvider.getNames(barcode)
      .subscribe( res => {
        let names: Array<string>;

        names = this.respondHandler(res);
        if (names) {
          this.productFound = true;
          this.presentNamesModal(names);
          //this.selectedProduct.name = names[0];
        }
        
        else{
          if (this.platform.is('cordova')) {
            this.toast.show(`Product not found`, '3000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          }
        }

        this.loadingHide();
      },(error) => {

        if (this.platform.is('cordova')) {
          this.toast.show(error, '3000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }

        this.loadingHide();
      });
  }

  scan() {
    this.productFound = false;
    this.barcodeScanner.scan({resultDisplayDuration: 300}).then((barcodeData) => {
      this.selectedProduct = barcodeData;
      if (!barcodeData.cancelled){
        this.test(+barcodeData.text);
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
