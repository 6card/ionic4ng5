import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'add-form',
    templateUrl: 'add-form.html'
})

export class AddForm {

    @Output() formResults: EventEmitter<any> = new EventEmitter();

    /*@Input() */productName: string = 'ЖУРНАЛ "ЗЯТЕК"';
    /*@Input() */productBarcode: number = 4602445000100;

    public addProduct() {
        this.formResults.emit([this.productName, this.productBarcode]);
    }

}