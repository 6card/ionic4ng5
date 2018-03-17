import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NamesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-names-list',
  templateUrl: 'names-list.html',
})
export class NamesListPage {

  names: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    //console.log('NamesListPage', navParams.get('names'));
    this.names = navParams.get('names');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NamesListPage');
    
  }

  dismiss(data?: string) {
    this.viewCtrl.dismiss(data);
  }

}
