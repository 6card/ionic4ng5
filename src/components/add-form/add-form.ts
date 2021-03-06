import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'add-form',
    templateUrl: 'add-form.html'
})

export class AddForm {

    @Output() formResults: EventEmitter<any> = new EventEmitter();

    @Input() product: any;

    public addProduct() {
        this.formResults.emit(this.product);
    }

}