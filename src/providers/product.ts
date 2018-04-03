import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from '../shared/product';
import { PurchaseProduct } from '../shared/purchase-product';

@Injectable()
export class ProductProvider {

  apiRoot = 'http://home.6card.mykeenetic.ru/test';

  constructor(public http: HttpClient) {
    //console.log('Hello BarcodeProvider Provider');
  }

  getProductByBarcode(barcode: number): Observable<Product> {
    const apiURL = `${this.apiRoot}/product/barcode2/${barcode}`;

    return this.http.get<Product>(apiURL)
      .pipe(
        tap(_ => this.log(`get product barcode=${barcode}`)),
        /*
        catchError((err, caught) => {
          this.handleError<Product>('getProductByBarcode');
          return Observable.throw(err.message);
        })
        */
        catchError(this.handleError<Product>('getProductByBarcode'))
      );
  }

  addProduct(productName: string, productBarcode: number): Observable<Product> {
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

    return this.http.post<Product>(apiURL, body, httpOptions)
      .catch(res => {
        return Observable.throw(res.message); // default
      });
  }

  addPurchaseProduct(purchase_id: number, product_id: number, product_price: any, product_price_without_discount: any) {
    const apiURL = `${this.apiRoot}/purchase-product/products/${purchase_id}`;

    let headers = new HttpHeaders();    
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
    const httpOptions = { headers: headers };

    let body =  {
        product_id: product_id,
        price: product_price, 
        price_without_discount: product_price_without_discount
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


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('ProductProvider: ' + message);
  }

}
