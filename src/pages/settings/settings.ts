import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AppPreferences } from '@ionic-native/app-preferences';
import { Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  beep: any = false;
  title: string = '';
  loading: boolean = false;

  version: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appPreferences: AppPreferences,
    private platform: Platform,
    public toastCtrl: ToastController,
    private appVersion: AppVersion,
  ) {
  
  }

  async ionViewDidLoad() {
    if (this.platform.is('cordova')) {
      console.log('ionViewDidLoad SettingPage');
      this.title = await this.appPreferences.fetch('title');
      this.beep = await this.appPreferences.fetch('beep');
      await this.getVersion();
    }
  }

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    this.save();
  }

  async save() {
    this.loading = true;
    try {
      await this.appPreferences.store('title', this.title);
      await this.appPreferences.store('beep', this.beep);
    } catch (error) {
      const toast = this.toastCtrl.create({
        message: 'Save failed',
        duration: 3000,
      });
      toast.present();
      return console.log(error);
    }

    let res;
    /*
    try {
      await this.unblockApi.init();
      res = await this.unblockApi.check();
    } catch (error) {
      await this.appPreferences.store('is_set', '0');
      const toast = this.toastCtrl.create({
        message: 'The server info is not correct.',
        duration: 3000,
      });
      toast.present();
      this.events.publish('set', false);
      this.loading = false;
      return console.log(error);
    }
    */

    const toast = this.toastCtrl.create({
      message: 'Saved.',
      duration: 3000
    });
    toast.present();

    /*
    await this.appPreferences.store('is_set', '1');
    this.events.publish('set', true);
    */
    this.loading = false;
  }

  async getVersion() {
    this.version = await this.appVersion.getVersionNumber();
 }

}
