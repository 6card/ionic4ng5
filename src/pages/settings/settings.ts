import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppPreferences } from '@ionic-native/app-preferences';
import { Platform } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  beep: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appPreferences: AppPreferences,
    private platform: Platform
  ) {
      if (this.platform.is('cordova')) {
        this.appPreferences.fetch('beep').then((res) => {
          this.beep = res;
          console.log(res);
      });
    }    
  }

  updateBeep(beep) {
    this.appPreferences.store('beep', beep).then(
      (res) => { 
        console.log(res); 
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    
  }

}
