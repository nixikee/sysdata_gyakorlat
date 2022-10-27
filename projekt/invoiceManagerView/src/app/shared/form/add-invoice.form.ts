import { FormControl, FormGroup } from "@angular/forms";

export function getAddInvoiceForm(): FormGroup {
    return new FormGroup({
        costCenter: new FormControl(''),
        businessPartner: new FormControl(''),
        contractor: new FormControl(''),
        currency: new FormControl(''),
        amount: new FormControl(''),
        orderNumber: new FormControl(''),
        supplierInvoiceId: new FormControl('')
      });
}