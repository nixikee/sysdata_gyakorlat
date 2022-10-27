import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PdfService } from './../../../services/pdf.service';
import { InvoiceService } from './../../../services/invoice.service';
import { getAddInvoiceForm } from './../../../shared/form/add-invoice.form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  form!: FormGroup;

  currentUser: any;
  costCenterError = false;
  businessPartnerError = false;
  contractorError = false;
  orderNumberError = false;
  supplierInvoiceIdError = false;
  amountError = false;
  fileUploadError = false;

  selectedFiles?: any;
  currentFile: any;
  okey = true;
  message = '';

  accepted = false;

  constructor(private router: Router, private modalService: NgbModal, private storageService: StorageService, private invoiceService: InvoiceService, private pdfService: PdfService) { }

  
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
    this.form = getAddInvoiceForm();
  }

  saveInvoice(content: any){

    this.costCenterError = false;
    this.businessPartnerError = false;
    this.contractorError = false;
    this.orderNumberError = false;
    this.supplierInvoiceIdError = false;
    this.fileUploadError = false;

    if(this.form.valid) {

      if (this.form.value.costCenter.length > 0 && this.form.value.businessPartner.length > 0 && this.form.value.contractor.length > 0 &&
        this.form.value.orderNumber.length > 0 && this.form.value.supplierInvoiceId.length > 0) {
        
          this.modalService.open(content, {}).result.then((result) => {
            if(result == "Add click") {
              this.invoiceService.addInvoice(this.form.value).subscribe( data =>{
                this.router.navigate(['/list_invoice']);
              },
              error => console.log(error));
            }
          }, err => {
            console.warn(err);
          });

      } else if (this.form.value.costCenter.length == 0) {
        this.costCenterError = true;
      } else if (this.form.value.businessPartner.length == 0) {
        this.businessPartnerError = true;
      } else if (this.form.value.contractor.length == 0) {
        this.contractorError = true;
      } else if (this.form.value.orderNumber.length == 0) {
        this.orderNumberError = true;
      } else if (this.form.value.supplierInvoiceIdError.length == 0) {
        this.supplierInvoiceIdError = true;
      }
    } else {
      this.fileUploadError = true;
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.pdfService.upload(this.currentFile).subscribe({
          error: (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }
}