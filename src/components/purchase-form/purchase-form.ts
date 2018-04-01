import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DatePicker } from '@ionic-native/date-picker';

@Component({
    selector: 'purchase-form',
    templateUrl: 'purchase-form.html'
})

export class PurchaseForm {

    @Output() formResults: EventEmitter<any> = new EventEmitter();

    @Input() purchase?: any;

    constructor(
        private datePicker: DatePicker,
    ) {
        if (!this.purchase)
            this.purchase = {
                date: new Date().toISOString()
            };
    }

    dpShow() {
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
          }).then(
            date => console.log('Got date: ', date),
            err => console.log('Error occurred while getting date: ', err)
        );
    }
    

    public pushPurchase() {
        let purchase = Object.assign({}, this.purchase);
        //console.log(purchase);
        //purchase.date = new Date(purchase.date);
        purchase.date = Math.floor(Date.parse(purchase.date)/1000);
        this.formResults.emit(purchase);
    }

}