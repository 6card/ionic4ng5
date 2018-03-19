import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'add-form',
    templateUrl: 'add-form.html'
})

export class AddForm {

    @Output() formResults: EventEmitter<any> = new EventEmitter();

    @Input() productName: string;
    @Input() productBarcode: number;

    public addProduct() {
        this.formResults.emit([this.productName, this.productBarcode]);
    }

}