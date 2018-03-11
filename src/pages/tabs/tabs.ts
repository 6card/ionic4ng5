import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ShopslistPage } from '../shopslist/shopslist';

import { NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  index: string;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ShopslistPage;

  constructor(public navParams: NavParams) {
    this.index = navParams.get('index');
  }
}
