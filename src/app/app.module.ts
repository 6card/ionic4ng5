import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { ShopslistPage } from '../pages/shopslist/shopslist';
import { SettingsPage } from '../pages/settings/settings';
import { NamesListPage } from '../pages/names-list/names-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { BarcodeProvider } from '../providers/barcode/barcode';
import { HttpClientModule } from '@angular/common/http';
import { AppPreferences } from '@ionic-native/app-preferences';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ShopslistPage,
    SettingsPage,
    NamesListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ShopslistPage,
    SettingsPage,
    NamesListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast,
    BarcodeProvider,
    AppPreferences,
    AppVersion
  ]
})
export class AppModule {}
