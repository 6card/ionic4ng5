import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { PurchasePage } from '../pages/purchase/purchase';
import { PurchaseEditPage } from '../pages/purchase-edit/purchase-edit';
import { PurchaseAddPage } from '../pages/purchase-add/purchase-add';
import { PurchaseProductAddPage } from '../pages/purchase-product-add/purchase-product-add';

import { ProductAddPage } from '../pages/product-add/product-add';

import { ShopslistPage } from '../pages/shopslist/shopslist';
import { SettingsPage } from '../pages/settings/settings';
import { NamesListPage } from '../pages/names-list/names-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DatePicker } from '@ionic-native/date-picker';

import { BarcodeProvider } from '../providers/barcode';
import { ProductProvider } from '../providers/product';
import { HttpClientModule } from '@angular/common/http';
import { AppPreferences } from '@ionic-native/app-preferences';
import { AppVersion } from '@ionic-native/app-version';

import { AddForm } from "../components/add-form/add-form";
import { PurchaseForm } from "../components/purchase-form/purchase-form";
import { PurchaseProductForm } from "../components/purchase-product-form/purchase-product-form";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ShopslistPage,
    SettingsPage,
    NamesListPage,

    AddForm,    

    PurchasePage,
    PurchaseEditPage,
    PurchaseAddPage,
    PurchaseForm,
    PurchaseProductForm,
    PurchaseProductAddPage,

    ProductAddPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      //scrollPadding: false,
      scrollAssist: false
    }),
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
    NamesListPage,
    
    PurchasePage,
    PurchaseEditPage,
    PurchaseAddPage,
    PurchaseProductAddPage,

    ProductAddPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast,
    DatePicker,
    BarcodeProvider,
    ProductProvider,
    AppPreferences,
    AppVersion
  ]
})
export class AppModule {}
