import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the BarcodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BarcodeProvider {

  apiRoot = 'https://barcodes.olegon.ru/api/card/name';

  constructor(public http: HttpClient) {
    console.log('Hello BarcodeProvider Provider');
  }

  getNames(barcode: any): Observable<any> {
    const apiURL = `${this.apiRoot}/${barcode}/B089134387468054496171910524556`;

    /*
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': "*"
      })
    };
    */
    return this.http.get(apiURL/*, httpOptions*/)
    .catch(res => {
        // Handle it here, on status code code
        if (res.status === 404) {
            return Observable.throw('Product not found');
        } // etc

        return Observable.throw(res.message); // default
    });
  }

}
