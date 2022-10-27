import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage.service';
import { InvoiceService } from './../../../../app/services/invoice.service';
import { getAddInvoiceForm } from './../../../../app/shared/form/add-invoice.form';
import { Invoice } from './../../../../app/shared/models/invoice';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {

  currentUser: any;
  form!: FormGroup;
  id!: number;
  invoice: Invoice = new Invoice();

  constructor(private router: Router, private modalService: NgbModal, private storageService: StorageService, private route: ActivatedRoute, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser.role == "ROLE_ADMIN" || this.currentUser.role == "ROLE_FINANCIAL_CLERK") {
      this.initForm();
    } else if (this.currentUser.role != null) {
      this.storageService.home();
    } else {
      this.storageService.login();
    }

  }

  initForm(): void {
    this.id = this.route.snapshot.params['id'];

    this.invoiceService.getInvoiceById(this.id).subscribe(data => {
      this.invoice = data;
    }, error => console.log(error));
    this.form = getAddInvoiceForm();
  }

  getInvoice(id: number){
    this.router.navigate(['pdf_invoice', id]);
  }

  updateInvoice(content: any){

    if(this.form.value.costCenter.length == 0) {
        this.form.value.costCenter = this.invoice.costCenter;
    }

    if(this.form.value.businessPartner.length == 0) {
      this.form.value.businessPartner = this.invoice.businessPartner;
    }

    if(this.form.value.contractor.length == 0) {
      this.form.value.contractor = this.invoice.contractor;
    }

    if(this.form.value.orderNumber.length == 0) {
      this.form.value.orderNumber = this.invoice.orderNumber;
    }

    if(this.form.value.supplierInvoiceId.length == 0) {
      this.form.value.supplierInvoiceId = this.invoice.supplierInvoiceId;
    }

    if(this.form.value.currency.length == 0) {
      this.form.value.currency = this.invoice.currency;
    }

    if(this.form.value.amount.length == 0) {
      this.form.value.amount = this.invoice.amount;
    }

    this.modalService.open(content, {}).result.then((result) => {
      if(result == "Update click") {
        this.invoiceService.updateInvoice(this.id, this.form.value).subscribe( data =>{
          this.getInvoice(this.id);
        },
        error => console.log(error));
      }
    }, err => {
      console.warn(err);
    });

  }

}
