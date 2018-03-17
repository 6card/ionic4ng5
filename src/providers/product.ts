import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductProvider {

  apiRoot = 'http://home.6card.mykeenetic.ru/test/product';

  constructor(public http: HttpClient) {
    console.log('Hello BarcodeProvider Provider');
  }

  getProductByBarcode(barcode: any): Observable<any> {
    const apiURL = `${this.apiRoot}/barcode/${barcode}`;

    return this.http.get(apiURL/*, httpOptions*/)
    .catch(res => {
        return Observable.throw(res.message); // default
    });
  }

}
