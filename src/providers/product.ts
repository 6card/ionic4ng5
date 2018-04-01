import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductProvider {

  apiRoot = 'http://home.6card.mykeenetic.ru/test';

  constructor(public http: HttpClient) {
    //console.log('Hello BarcodeProvider Provider');
  }

  getProductByBarcode(barcode: any): Observable<any> {
    const apiURL = `${this.apiRoot}/product/barcode/${barcode}`;

    return this.http.get(apiURL/*, httpOptions*/)
    .catch(res => {
        return Observable.throw(res.message); // default
    });
  }

  addProduct(productName: string, productBarcode: number) {
    const apiURL = `${this.apiRoot}/product`;

    let headers = new HttpHeaders();    
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
    const httpOptions = { headers: headers };

    let body =  {
        user_id: 1,
        barcode: productBarcode, 
        name: productName
    };

    return this.http.post(apiURL, body, httpOptions)
      .catch(res => {
        return Observable.throw(res.message); // default
      });
  }

  getPurchases(): Observable<any> {
    const apiURL = `${this.apiRoot}/purchase`;

    return this.http.get(apiURL/*, httpOptions*/)
    .catch(res => {
        return Observable.throw(res.message); // default
    });
  }

  getPurchase(id: number): Observable<any> {
    const apiURL = `${this.apiRoot}/purchase/${id}`;

    return this.http.get(apiURL/*, httpOptions*/)
    .catch(res => {
        return Observable.throw(res.message); // default
    });
  }

  putPurchase(purchase: any): Observable<any> {
    //console.log(purchase);
    const apiURL = `${this.apiRoot}/purchase/${purchase.id}`;

    let headers = new HttpHeaders();    
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
    const httpOptions = { headers: headers };

    let body =  {
      date: purchase.date,
    };

    return this.http.put(apiURL, body, httpOptions)
    .catch(res => {
        return Observable.throw(res.message); // default
    });
  }

  postPurchase(purchase: any): Observable<any> {
    //console.log(purchase);
    const apiURL = `${this.apiRoot}/purchase`;

    let headers = new HttpHeaders();    
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
    const httpOptions = { headers: headers };

    let body =  {
      date: purchase.date,
    };

    return this.http.post(apiURL, body, httpOptions)
    .catch(res => {
        return Observable.throw(res.message); // default
    });
  }

  getPurchaseProducts(id: number): Observable<any> {
    const apiURL = `${this.apiRoot}/purchase-product/products/${id}`;

    return this.http.get(apiURL/*, httpOptions*/)
    .catch(res => {
        return Observable.throw(res.message); // default
    });
  }

  deletePurchaseProduct(id: any): Observable<any> {
    const apiURL = `${this.apiRoot}/purchase-product/product/${id}`;

    return this.http.delete(apiURL/*, httpOptions*/)
    .catch(res => {
        return Observable.throw(res.message); // default
    });
  }

}
