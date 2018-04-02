import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'purchase-product-form',
    templateUrl: 'purchase-product-form.html'
})

export class PurchaseProductForm {

    @Output() formResults: EventEmitter<any> = new EventEmitter();

    @Input() product: any;

    public addPurchaseProduct() {
        this.formResults.emit(this.product);
    }

}