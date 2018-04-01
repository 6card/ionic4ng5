import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

import { SettingsPage } from '../pages/settings/settings';
import { PurchasePage } from '../pages/purchase/purchase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;  
  //rootPage:any = TabsPage;
  rootPage:any = PurchasePage;
  
  pages: Array<{title: string, component: any, index: string, icon_name: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Публикации', component: TabsPage, index: '0', icon_name: 'ios-paper-outline' },
      { title: 'Категории', component: TabsPage, index: '1', icon_name: 'ios-albums-outline' },
      { title: 'Авторы', component: TabsPage, index: '2', icon_name: 'ios-contacts-outline' },
      { title: 'Settings', component: SettingsPage, index: '3', icon_name: 'md-settings' }
    ];
  }

  openPage(page) {
    this.navCtrl.push(page.component, {index: page.index});
  }
}
