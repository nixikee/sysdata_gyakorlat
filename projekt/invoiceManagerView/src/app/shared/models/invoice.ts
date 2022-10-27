import { User } from "./user";

export class Invoice {
    internalInvoiceId = 0;
    uploadDate!: Date;
    costCenter!: string;
    businessPartner!: string;
    contractor!: string;
    currency!: string;
    amount!: number;
    orderNumber!: string;
    supplierInvoiceId!: string;
    status = "";
    pdfBlob?: any;
}